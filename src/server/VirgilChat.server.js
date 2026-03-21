/**
 * VirgilChat — LLM bridge for ServiceNow architecture analysis.
 *
 * Calls the Anthropic Messages API via sn_ws.RESTMessageV2 with optional
 * extended thinking.  Ported from Python llm_service.py + architecture_validator.py.
 *
 * System properties used:
 *   x_9418_virgil.anthropic_api_key   — sk-ant-api03-… (required)
 *   x_9418_virgil.claude_model        — default claude-sonnet-4-20250514
 *   x_9418_virgil.thinking_budget     — default 8000 (0 to disable)
 */
var VIRGIL_FIELD_PREFIX = 'x_9418_virgil_';
var VIRGIL_TABLE_PREFIX = 'x_9418_virgil_';
var FP = VIRGIL_FIELD_PREFIX;
var TP = VIRGIL_TABLE_PREFIX;

var VirgilChat = Class.create();
VirgilChat.prototype = {
    initialize: function() {
        this.utils = new VirgilUtils();
    },

    // ─── Public API ────────────────────────────────────────────────────

    /**
     * Run a full architecture analysis.
     * @param {string} query - User's architecture question
     * @param {Object} [options]
     * @param {boolean} [options.thinking=true] - Enable extended thinking
     * @returns {Object} {status, analysis, recommendations, mermaid_diagram, implementation_notes, error}
     */
    analyze: function(query, options) {
        options = options || {};
        var thinking = options.thinking !== false; // default true

        var apiKey = gs.getProperty('x_9418_virgil.anthropic_api_key', '');
        if (!apiKey) {
            return { status: 'error', error: 'Missing system property x_9418_virgil.anthropic_api_key' };
        }

        try {
            // 1. Gather instance context
            var context = this._gatherContext();

            // 2. Get latest Minos findings
            var findings = this._getLatestFindings();

            // 3. Detect query type
            var queryTypes = this._detectQueryTypes(query);

            // 4. Build prompts
            var systemPrompt = this._buildSystemPrompt(context, findings, queryTypes);
            var userPrompt = this._buildUserPrompt(query, context, queryTypes);

            // 5. Call Claude API
            var model = gs.getProperty('x_9418_virgil.claude_model', 'claude-sonnet-4-20250514');
            var budgetStr = gs.getProperty('x_9418_virgil.thinking_budget', '8000');
            var thinkingBudget = thinking ? parseInt(budgetStr, 10) || 8000 : 0;

            var raw = this._callClaude(apiKey, model, systemPrompt, userPrompt, thinkingBudget);

            // 6. Parse response
            var parsed = this._parseResponse(raw);

            // 7. Sanitize Mermaid diagram
            if (parsed.mermaid_diagram) {
                parsed.mermaid_diagram = this._sanitizeMermaid(parsed.mermaid_diagram);
            }

            parsed.status = 'completed';
            parsed.query_types = queryTypes;
            return parsed;

        } catch (e) {
            gs.error('VirgilChat.analyze error: ' + e);
            return { status: 'error', error: '' + e };
        }
    },

    // ─── Claude API Call ───────────────────────────────────────────────

    /**
     * Call Anthropic Messages API via RESTMessageV2.
     * @returns {Object} Raw response body parsed as JSON
     */
    _callClaude: function(apiKey, model, systemPrompt, userPrompt, thinkingBudget) {
        var rm = new sn_ws.RESTMessageV2();
        rm.setEndpoint('https://api.anthropic.com/v1/messages');
        rm.setHttpMethod('POST');
        rm.setRequestHeader('Content-Type', 'application/json');
        rm.setRequestHeader('x-api-key', apiKey);
        rm.setRequestHeader('anthropic-version', '2023-06-01');
        rm.setHttpTimeout(55000); // 55s — below SN 60s limit

        var payload = {
            model: model,
            max_tokens: 16000,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }]
        };

        if (thinkingBudget > 0) {
            payload.thinking = { type: 'enabled', budget_tokens: thinkingBudget };
        }

        rm.setRequestBody(JSON.stringify(payload));
        var response = rm.execute();
        var httpStatus = response.getStatusCode();
        var body = response.getBody();

        if (httpStatus < 200 || httpStatus >= 300) {
            throw 'Claude API returned HTTP ' + httpStatus + ': ' + (body || '').substring(0, 500);
        }

        return JSON.parse(body);
    },

    // ─── Response Parsing ──────────────────────────────────────────────

    /**
     * Extract text blocks from Claude response (skip thinking blocks).
     * Then parse as JSON, falling back to raw text.
     */
    _parseResponse: function(apiResponse) {
        var contentBlocks = apiResponse.content || [];
        var textParts = [];

        for (var i = 0; i < contentBlocks.length; i++) {
            if (contentBlocks[i].type === 'text') {
                textParts.push(contentBlocks[i].text);
            }
        }

        var rawText = textParts.join('');

        // Strip markdown code fences if present
        if (rawText.indexOf('```json') !== -1) {
            rawText = rawText.replace(/```json\s*/g, '').replace(/```/g, '');
        } else if (rawText.indexOf('```') !== -1) {
            rawText = rawText.replace(/```/g, '');
        }
        rawText = rawText.trim();

        // Try JSON parse
        try {
            var parsed = JSON.parse(rawText);
            return {
                analysis: parsed.analysis || '',
                recommendations: parsed.recommendations || [],
                mermaid_diagram: parsed.mermaid_diagram || '',
                implementation_notes: parsed.implementation_notes || ''
            };
        } catch (e) {
            // JSON parse failed — try to extract JSON from within text
            var jsonStart = rawText.indexOf('{');
            var jsonEnd = rawText.lastIndexOf('}');
            if (jsonStart >= 0 && jsonEnd > jsonStart) {
                try {
                    var extracted = JSON.parse(rawText.substring(jsonStart, jsonEnd + 1));
                    return {
                        analysis: extracted.analysis || '',
                        recommendations: extracted.recommendations || [],
                        mermaid_diagram: extracted.mermaid_diagram || '',
                        implementation_notes: extracted.implementation_notes || ''
                    };
                } catch (e2) {
                    // fall through
                }
            }

            // Return raw text as analysis
            return {
                analysis: rawText,
                recommendations: [],
                mermaid_diagram: '',
                implementation_notes: ''
            };
        }
    },

    // ─── Instance Context ──────────────────────────────────────────────

    _gatherContext: function() {
        var context = {
            apps: [],
            cmdb: {},
            appNames: []
        };

        try {
            context.apps = this.utils.getInstalledApps();
            context.appNames = [];
            for (var i = 0; i < context.apps.length && i < 20; i++) {
                if (context.apps[i].name) {
                    context.appNames.push(context.apps[i].name);
                }
            }
        } catch (e) {
            gs.debug('VirgilChat: failed to get apps: ' + e);
        }

        try {
            context.cmdb = this.utils.getCMDBStats();
        } catch (e) {
            gs.debug('VirgilChat: failed to get CMDB stats: ' + e);
        }

        return context;
    },

    _getLatestFindings: function() {
        var findings = [];
        try {
            // Get latest completed scan
            var scanGr = new GlideRecord(TP + 'minos_scan');
            scanGr.addQuery(FP + 'status', 'completed');
            scanGr.orderByDesc(FP + 'scan_date');
            scanGr.setLimit(1);
            scanGr.query();

            if (scanGr.next()) {
                var scanId = scanGr.getUniqueValue();

                var fGr = new GlideRecord(TP + 'minos_finding');
                fGr.addQuery(FP + 'scan', scanId);
                fGr.orderBy(FP + 'severity');
                fGr.query();

                while (fGr.next()) {
                    findings.push({
                        rule_name: fGr.getValue(FP + 'rule_name') || '',
                        severity: fGr.getValue(FP + 'severity') || '',
                        message: fGr.getValue(FP + 'message') || '',
                        recommendation: fGr.getValue(FP + 'recommendation') || '',
                        category: fGr.getValue(FP + 'category') || ''
                    });
                }
            }
        } catch (e) {
            gs.debug('VirgilChat: failed to get findings: ' + e);
        }
        return findings;
    },

    // ─── Query Type Detection ──────────────────────────────────────────

    _detectQueryTypes: function(query) {
        var q = query.toLowerCase();
        var types = [];

        var patterns = {
            itsm: /\b(itsm|incident|problem|change|service desk|itil)\b/,
            csm: /\b(csm|customer service|case management|customer portal)\b/,
            hrsd: /\b(hrsd|hr service|employee|onboarding|employee center)\b/,
            itom: /\b(itom|discovery|service mapping|event management|cloud management|visibility)\b/,
            secops: /\b(secops|security operations|sir|vulnerability|threat)\b/,
            grc: /\b(grc|governance|risk|compliance|audit|policy)\b/,
            spm: /\b(spm|strategic portfolio|demand|project portfolio|ppm)\b/,
            integration: /\b(integrat|api|rest|soap|mid server|flow designer|integration hub)\b/,
            cmdb: /\b(cmdb|configuration management|ci|asset management|hardware asset)\b/,
            compliance: /\b(fedramp|spp|fed|government|compliance|domain separation|hipaa|pci)\b/
        };

        for (var type in patterns) {
            if (patterns[type].test(q)) {
                types.push(type);
            }
        }

        if (types.length === 0) {
            types.push('general');
        }
        return types;
    },

    // ─── Prompt Engineering ────────────────────────────────────────────

    _buildSystemPrompt: function(context, findings, queryTypes) {
        var prompt = 'You are an expert ServiceNow technical architect and solution consultant with deep knowledge of:\n';
        prompt += '- ServiceNow platform architecture and best practices\n';
        prompt += '- Integration patterns and data flows\n';
        prompt += '- IT4IT v3 reference architecture\n';
        prompt += '- All ServiceNow product lines (ITSM, CSM, HRSD, ITOM, SecOps, GRC, SPM)\n\n';

        prompt += 'CRITICAL SERVICENOW ARCHITECTURAL RULES:\n';
        prompt += '1. CMDB (Configuration Management Database) is ALWAYS foundational — it cannot depend on other components\n';
        prompt += '2. User Management is ALWAYS foundational — required for all authentication\n';
        prompt += '3. Knowledge Base is consumed BY other components (Incident, Case, Portal) — it does NOT consume them\n';
        prompt += '4. Service Portals and Customer Portals sit at the UI layer — they consume services, not provide them\n';
        prompt += '5. Integration Hub and Flow Designer are orchestration layers — they connect components but are not foundational\n\n';

        // Query-type specific guidance
        prompt += this._getQueryGuidance(queryTypes);

        // Instance context
        if (context.appNames.length > 0) {
            prompt += '\nINSTANCE CONTEXT:\n';
            prompt += 'Installed applications: ' + context.appNames.join(', ') + '\n';
        }

        if (context.cmdb && context.cmdb.total_cis > 0) {
            prompt += '\nCMDB Statistics:\n';
            prompt += '- Total CIs: ' + context.cmdb.total_cis + '\n';
            prompt += '- CI Classes: ' + context.cmdb.ci_classes + '\n';
            prompt += '- Has Discovery: ' + (context.cmdb.has_discovery ? 'Yes' : 'No') + '\n';
            prompt += '- Has Service Mapping: ' + (context.cmdb.has_service_mapping ? 'Yes' : 'No') + '\n';
            prompt += '- Relationships: ' + context.cmdb.relationships + '\n';
        }

        // Inject Minos findings
        if (findings.length > 0) {
            prompt += '\nVERIFIED INSTANCE FINDINGS (from Minos assessment scan):\n';
            prompt += 'These are real, evidence-backed findings from this instance. Reference them in your analysis.\n';
            for (var i = 0; i < findings.length; i++) {
                var f = findings[i];
                prompt += '- [' + f.severity.toUpperCase() + '] ' + f.rule_name + ': ' + f.message + '\n';
                if (f.recommendation) {
                    prompt += '  Recommendation: ' + f.recommendation + '\n';
                }
            }
        }

        // Analysis depth
        prompt += '\nANALYSIS DEPTH REQUIREMENTS:\n';
        prompt += 'Your analysis must be thorough but CONCISE. Keep under 1500 words.\n';
        prompt += 'For each capability area, address: current state, target state, gap analysis, trade-offs, dependencies.\n';
        prompt += 'When multiple products are involved, address shared components, data segregation, workflow crossover, and UX separation.\n\n';

        // Mermaid constraints
        prompt += 'MERMAID DIAGRAM HARD LIMITS:\n';
        prompt += '- MAXIMUM 15 arrows total. MAXIMUM 10 nodes. MAXIMUM 4 subgraphs. MAXIMUM 3 outgoing per node.\n';
        prompt += '- Start with "graph TD". Use --> arrows. Node format: ID[Label Text].\n';
        prompt += '- Subgraph names MUST NOT be quoted.\n\n';

        prompt += 'ALLOWED RELATIONSHIP LABELS (use ONLY these on arrows):\n';
        prompt += '"runs on", "creates", "creates cases", "creates tickets", "creates requests", ';
        prompt += '"references", "resolves using", "accesses", "authenticates via", "consumes", ';
        prompt += '"populates", "integrates with", "connects to", "depends on"\n\n';

        prompt += 'DO NOT USE vague labels like "leverages", "manages", "uses", "utilizes", "supports".\n\n';

        prompt += 'REQUIRED RELATIONSHIPS:\n';
        prompt += '- Every application (ITSM, CSM, HRSD) MUST have "runs on" --> Platform\n';
        prompt += '- Every portal MUST have "authenticates via" --> User Management\n';
        prompt += '- CMDB, Platform, Knowledge Base, User Management are FOUNDATIONAL (bottom layer)\n\n';

        // Response format
        prompt += 'Provide 4-8 specific, actionable recommendations. Each must explain WHY, WHAT, and HOW.\n';
        prompt += 'Reference actual ServiceNow tables, plugins, and configurations.\n';

        return prompt;
    },

    _getQueryGuidance: function(queryTypes) {
        var guidance = '';

        for (var i = 0; i < queryTypes.length; i++) {
            var qt = queryTypes[i];
            switch (qt) {
                case 'itsm':
                    guidance += 'ITSM GUIDANCE: Address Incident/Problem/Change workflows, SLA management, assignment groups, CMDB integration, Knowledge Base for resolution.\n';
                    break;
                case 'csm':
                    guidance += 'CSM GUIDANCE: Address Account-Contact-Case model, customer portal (sn_csm_portal), agent workspace, entitlements, CSM-specific tables.\n';
                    break;
                case 'hrsd':
                    guidance += 'HRSD GUIDANCE: Address Employee Center, HR case types, lifecycle events, document management, onboarding workflows.\n';
                    break;
                case 'itom':
                    guidance += 'ITOM GUIDANCE: Address Discovery, Service Mapping, Event Management, Cloud Management, Visibility. MID Server requirements.\n';
                    break;
                case 'secops':
                    guidance += 'SECOPS GUIDANCE: Address Security Incident Response (SIR), Vulnerability Response (VR), threat intelligence feeds, CMDB enrichment.\n';
                    break;
                case 'grc':
                    guidance += 'GRC GUIDANCE: Address Policy & Compliance, Risk Management, Audit Management. Data segregation from operational data.\n';
                    break;
                case 'spm':
                    guidance += 'SPM GUIDANCE: Address Demand Management, Project Portfolio, Resource Management. Integration with ITSM change pipeline.\n';
                    break;
                case 'integration':
                    guidance += 'INTEGRATION GUIDANCE: Address Integration Hub vs custom scripts, MID Server placement, Flow Designer, REST vs SOAP, error handling.\n';
                    break;
                case 'cmdb':
                    guidance += 'CMDB GUIDANCE: Address CI class hierarchy, Discovery/Service Mapping, reconciliation, CMDB Health, relationship types.\n';
                    break;
                case 'compliance':
                    guidance += 'COMPLIANCE GUIDANCE: Address domain separation, ACL strategy, encryption, audit logging, MID Server placement, user/portal segregation.\n';
                    break;
            }
        }

        // Cross-domain guidance
        if (queryTypes.length > 1) {
            guidance += '\nCROSS-DOMAIN: Multiple domains detected. Address shared foundations (CMDB, User Mgmt, KB), data segregation, and workflow crossover points.\n';
        }

        return guidance;
    },

    _buildUserPrompt: function(query, context, queryTypes) {
        var prompt = 'User Query: ' + query + '\n\n';

        if (context.appNames.length > 0) {
            prompt += 'Installed Applications (top 20): ' + context.appNames.join(', ') + '\n';
            prompt += 'Total applications: ' + context.apps.length + '\n\n';
        }

        prompt += this._buildAnalysisGuidance(queryTypes);

        prompt += '\nFormat your response as JSON with this structure:\n';
        prompt += '{\n';
        prompt += '    "analysis": "markdown-formatted analysis with ## headings",\n';
        prompt += '    "recommendations": [\n';
        prompt += '        {\n';
        prompt += '            "title": "clear actionable title",\n';
        prompt += '            "description": "description with WHY, WHAT, and HOW",\n';
        prompt += '            "servicenow_components": ["product_or_table_1", "product_or_table_2"],\n';
        prompt += '            "priority": "high|medium|low"\n';
        prompt += '        }\n';
        prompt += '    ],\n';
        prompt += '    "mermaid_diagram": "graph TD\\n    A[Component] -->|runs on| B[Platform]",\n';
        prompt += '    "implementation_notes": "phasing, dependencies, migration steps"\n';
        prompt += '}\n\n';
        prompt += 'CRITICAL: Escape all double quotes inside JSON string values with a backslash.\n';

        return prompt;
    },

    _buildAnalysisGuidance: function(queryTypes) {
        var guidance = 'FORMAT YOUR ANALYSIS using markdown headings:\n';
        guidance += '## Current State Assessment\n## Proposed Architecture\n## Key Architectural Decisions\n## Data Flow\n## Risks and Mitigations\n\n';

        guidance += 'For RECOMMENDATIONS, provide 4-8 specific items. Each must explain:\n';
        guidance += '- WHY it is needed (the problem or gap)\n';
        guidance += '- WHAT to implement (specific ServiceNow product, plugin, or table)\n';
        guidance += '- HOW to implement it (configuration approach)\n';

        return guidance;
    },

    // ─── Mermaid Sanitization (ported from Python) ─────────────────────

    _sanitizeMermaid: function(mermaid) {
        if (!mermaid || mermaid.length < 10) {
            return mermaid;
        }

        var fixed = mermaid.trim();

        // Remove markdown code blocks
        if (fixed.indexOf('```') !== -1) {
            fixed = fixed.replace(/```mermaid/g, '').replace(/```/g, '').trim();
        }

        // Ensure starts with graph
        if (fixed.indexOf('graph') !== 0) {
            fixed = 'graph TD\n' + fixed;
        }

        // Fix labels: collapse whitespace inside [...]
        fixed = fixed.replace(/\[([^\]]+)\]/g, function(match, inner) {
            return '[' + inner.replace(/\s+/g, ' ').trim() + ']';
        });

        // Process line by line
        var lines = fixed.split('\n');
        var cleaned = [];

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var stripped = line.trim();
            if (!stripped) continue;

            // Fix subgraph names
            if (stripped.indexOf('subgraph ') === 0) {
                var sgName = stripped.substring(9);
                sgName = sgName.replace(/&/g, 'and').replace(/\//g, ' ').replace(/"/g, '');
                sgName = sgName.replace(/\([^)]*\)/g, '');      // remove parenthesized text
                sgName = sgName.replace(/^\d+\.\s*/, '');        // remove leading "1. "
                sgName = sgName.replace(/\s+/g, ' ').trim();
                var indent = line.substring(0, line.length - line.trimStart().length);
                line = indent + 'subgraph ' + sgName;
            }

            // Fix edge labels |text|
            if (line.indexOf('|') !== -1) {
                line = line.replace(/\|([^|]+)\|/g, function(match, lbl) {
                    lbl = lbl.replace(/\//g, ' ').replace(/&/g, 'and');
                    lbl = lbl.replace(/\([^)]*\)/g, '');
                    lbl = lbl.replace(/\s+/g, ' ').trim();

                    // Apply label replacements (vague -> standard)
                    var lower = lbl.toLowerCase();
                    var replacements = {
                        'leverages': 'references', 'manages': 'depends on',
                        'utilizes': 'references', 'feeds': 'creates',
                        'provides': 'references', 'supports': 'runs on',
                        'uses': 'references', 'interacts with': 'accesses',
                        'connects': 'connects to', 'handles': 'creates',
                        'triggers': 'creates', 'sends to': 'creates',
                        'links to': 'references', 'powered by': 'runs on',
                        'built on': 'runs on', 'hosted on': 'runs on',
                        'relies on': 'depends on', 'queries': 'references',
                        'reads from': 'references', 'writes to': 'creates',
                        'calls': 'accesses', 'invokes': 'accesses',
                        'talks to': 'accesses', 'fetches from': 'references',
                        'stores in': 'creates', 'logs to': 'creates',
                        'monitors': 'references', 'tracks': 'references',
                        'enables': 'runs on', 'drives': 'creates',
                        'orchestrates': 'depends on', 'automates': 'depends on'
                    };

                    if (replacements[lower]) {
                        lbl = replacements[lower];
                    }

                    return '|' + lbl + '|';
                });
            }

            // Fix node labels [text]
            if (line.indexOf('[') !== -1 && line.indexOf(']') !== -1) {
                line = line.replace(/\[([^\]]+)\]/g, function(match, label) {
                    var cl = label.replace(/\n/g, ' ').replace(/\r/g, ' ');
                    cl = cl.replace(/\//g, ' ').replace(/&/g, 'and');
                    cl = cl.replace(/\\/g, '').replace(/"/g, '').replace(/'/g, '');
                    cl = cl.replace(/\(/g, '- ').replace(/\)/g, '');
                    cl = cl.replace(/\s+/g, ' ').trim();
                    return '[' + cl + ']';
                });
            }

            cleaned.push(line);
        }

        fixed = cleaned.join('\n');

        // Validate at least one arrow
        if (fixed.indexOf('-->') === -1 && fixed.indexOf('---') === -1) {
            gs.debug('VirgilChat: sanitized Mermaid has no arrows, returning original');
            return mermaid;
        }

        // Enforce arrow limit (max 15)
        var arrowLines = [];
        var nonArrowLines = [];
        var resultLines = fixed.split('\n');

        for (var j = 0; j < resultLines.length; j++) {
            if (resultLines[j].indexOf('-->') !== -1) {
                arrowLines.push(resultLines[j]);
            } else {
                nonArrowLines.push(resultLines[j]);
            }
        }

        if (arrowLines.length > 15) {
            gs.info('VirgilChat: pruning arrows from ' + arrowLines.length + ' to 15');
            arrowLines = arrowLines.slice(0, 15);
        }

        // Rebuild: put arrows after non-arrows (simple approach)
        var finalLines = [];
        var arrowIdx = 0;
        var allLines = fixed.split('\n');
        for (var k = 0; k < allLines.length; k++) {
            if (allLines[k].indexOf('-->') !== -1) {
                if (arrowIdx < arrowLines.length) {
                    finalLines.push(arrowLines[arrowIdx]);
                    arrowIdx++;
                }
                // else skip (pruned)
            } else {
                finalLines.push(allLines[k]);
            }
        }

        return finalLines.join('\n');
    },

    // ─── Confidence Tagging ────────────────────────────────────────────

    /**
     * Tag recommendations with confidence level based on backing evidence.
     * @param {Array} recommendations
     * @param {Array} findings - Minos findings
     * @returns {Array} recommendations with confidence field added
     */
    _tagConfidence: function(recommendations, findings) {
        var ruleNames = {};
        for (var i = 0; i < findings.length; i++) {
            ruleNames[findings[i].rule_name.toLowerCase()] = true;
        }

        for (var j = 0; j < recommendations.length; j++) {
            var rec = recommendations[j];
            var title = (rec.title || '').toLowerCase();
            var matched = false;

            for (var name in ruleNames) {
                if (title.indexOf(name) !== -1 || name.indexOf(title.substring(0, 15)) !== -1) {
                    rec.confidence = 'rule-backed';
                    rec.confidence_detail = 'Backed by Minos assessment finding: ' + name;
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                rec.confidence = 'llm-generated';
                rec.confidence_detail = 'Generated by LLM analysis — not directly backed by assessment finding';
            }
        }

        return recommendations;
    },

    type: 'VirgilChat'
};
