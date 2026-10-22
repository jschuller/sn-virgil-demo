var VIRGIL_FIELD_PREFIX = 'x_9418_virgil_';
var VIRGIL_TABLE_PREFIX = 'x_9418_virgil_';
var FP = VIRGIL_FIELD_PREFIX;
var TP = VIRGIL_TABLE_PREFIX;

var MinosOntology = Class.create();
MinosOntology.prototype = {
    initialize: function() {
        this.nodes = {};
        this.edges = [];
        this._loadFromTables();
        this._buildIndexes();
    },

    // ──────────────────────────────────────────────────────────────────────
    // Load graph from x_snc_virgil_ontology_node and x_snc_virgil_ontology_edge
    // ──────────────────────────────────────────────────────────────────────

    _loadFromTables: function() {
        // Load nodes
        var gr = new GlideRecord(TP + 'ontology_node');
        gr.addQuery(FP + 'active', 'true');
        gr.orderBy(FP + 'order');
        gr.query();
        while (gr.next()) {
            var nid = gr.getValue(FP + 'node_id');
            // Rhino treats __proto__ specially on every object; an empty id cannot be referenced.
            if (!nid || nid === '__proto__') {
                gs.warn('MinosOntology: skipping ontology node ' + gr.getUniqueValue() + ' with unusable node_id "' + (nid || '') + '"');
                continue;
            }
            this.nodes[nid] = {
                id: nid,
                name: gr.getValue(FP + 'name') || '',
                node_type: gr.getValue(FP + 'node_type') || '',
                aliases: this._parseJSON(gr.getValue(FP + 'aliases'), []),
                tables: this._parseJSON(gr.getValue(FP + 'tables'), []),
                plugins: this._parseJSON(gr.getValue(FP + 'plugins'), []),
                layer: gr.getValue(FP + 'layer') || '',
                it4it_streams: this._parseJSON(gr.getValue(FP + 'it4it_streams'), [])
            };
        }

        // Load edges
        var eg = new GlideRecord(TP + 'ontology_edge');
        eg.addQuery(FP + 'active', 'true');
        eg.query();
        while (eg.next()) {
            var source = eg.getValue(FP + 'source_node') || '';
            var target = eg.getValue(FP + 'target_node') || '';
            if (!source || !target || source === '__proto__' || target === '__proto__') {
                gs.warn('MinosOntology: skipping ontology edge ' + eg.getUniqueValue() + ' with unusable node "' +
                        source + '" -> "' + target + '"');
                continue;
            }
            this.edges.push({
                source: source,
                target: target,
                rel_type: eg.getValue(FP + 'rel_type') || '',
                constraint: eg.getValue(FP + 'constraint') || ''
            });
        }

        gs.debug('MinosOntology: Loaded ' + Object.keys(this.nodes).length +
                 ' nodes, ' + this.edges.length + ' edges from tables');
    },

    /** Own-key membership: ids, plugins and tables named like Object.prototype members (toString, constructor) are ordinary keys. */
    _has: function(map, key) {
        return Object.prototype.hasOwnProperty.call(map, key);
    },

    _parseJSON: function(str, fallback) {
        if (!str) return fallback;
        try { return JSON.parse(str); } catch (e) { return fallback; }
    },

    _buildIndexes: function() {
        this._pluginToNodes = {};
        this._tableToNodes = {};
        this._productModules = {};

        for (var nid in this.nodes) {
            var node = this.nodes[nid];
            for (var p = 0; p < node.plugins.length; p++) {
                var pid = node.plugins[p];
                if (!this._has(this._pluginToNodes, pid)) this._pluginToNodes[pid] = [];
                this._pluginToNodes[pid].push(nid);
            }
            for (var t = 0; t < node.tables.length; t++) {
                var tbl = node.tables[t];
                if (!this._has(this._tableToNodes, tbl)) this._tableToNodes[tbl] = [];
                this._tableToNodes[tbl].push(nid);
            }
        }

        for (var ei = 0; ei < this.edges.length; ei++) {
            var edge = this.edges[ei];
            if (edge.rel_type === 'depends_on') {
                if (!this._has(this._productModules, edge.source)) this._productModules[edge.source] = [];
                this._productModules[edge.source].push(edge.target);
            }
        }
    },

    // ──────────────────────────────────────────────────────────────────────
    // Instance → Ontology Mapping
    // ──────────────────────────────────────────────────────────────────────

    /**
     * Map installed plugins and table activity to active ontology nodes.
     * @param {Object} model - Instance model from MinosScanner
     * @returns {Object} {active_node_ids: [], active_nodes: []}
     */
    mapInstanceToNodes: function(model) {
        var activeIds = {};

        // 1. Plugin presence
        for (var pid in model.installed_plugins) {
            if (this._has(this._pluginToNodes, pid)) {
                var pNodes = this._pluginToNodes[pid];
                for (var pn = 0; pn < pNodes.length; pn++) {
                    activeIds[pNodes[pn]] = true;
                }
            }
        }

        // 2. Table activity (record count > 0)
        for (var tbl in model.active_tables) {
            if (tbl.indexOf('_') === 0) continue; // skip meta keys like _custom_tables
            var count = model.active_tables[tbl];
            if (count > 0 && this._has(this._tableToNodes, tbl)) {
                var tNodes = this._tableToNodes[tbl];
                for (var tn = 0; tn < tNodes.length; tn++) {
                    activeIds[tNodes[tn]] = true;
                }
            }
        }

        // 3. Promote: if a module is active, its parent product is also active
        for (var prod in this._productModules) {
            var modules = this._productModules[prod];
            for (var m = 0; m < modules.length; m++) {
                if (this._has(activeIds, modules[m])) {
                    activeIds[prod] = true;
                    break;
                }
            }
        }

        // 4. Foundational nodes active if any application is active
        var hasAnyApp = false;
        for (var nid in activeIds) {
            var node = this._has(this.nodes, nid) ? this.nodes[nid] : null;
            if (node && node.layer === 'application') {
                hasAnyApp = true;
                break;
            }
        }
        if (hasAnyApp) {
            var foundational = ['cmdb', 'user_mgmt', 'knowledge_base', 'audit', 'platform'];
            for (var fi = 0; fi < foundational.length; fi++) {
                activeIds[foundational[fi]] = true;
            }
        }

        // Build result arrays
        var activeIdList = [];
        var activeNodeList = [];
        for (var aid in activeIds) {
            activeIdList.push(aid);
            if (this._has(this.nodes, aid)) {
                activeNodeList.push({
                    id: aid,
                    name: this.nodes[aid].name,
                    layer: this.nodes[aid].layer,
                    it4it_streams: this.nodes[aid].it4it_streams
                });
            }
        }

        return {
            active_node_ids: activeIdList,
            active_nodes: activeNodeList
        };
    },

    // ──────────────────────────────────────────────────────────────────────
    // Helpers
    // ──────────────────────────────────────────────────────────────────────

    getAllNodes: function() {
        return this.nodes;
    },

    getAllReferencedTables: function() {
        var tables = [];
        var seen = {};
        for (var nid in this.nodes) {
            var nodeTables = this.nodes[nid].tables;
            for (var t = 0; t < nodeTables.length; t++) {
                if (!seen[nodeTables[t]]) {
                    tables.push(nodeTables[t]);
                    seen[nodeTables[t]] = true;
                }
            }
        }
        return tables;
    },

    /**
     * Generate a Mermaid diagram from active nodes.
     * @param {Array} activeNodeIds
     * @param {string} mode - 'as_is' or 'recommended'
     * @param {Object} [recommendedNodes] - {nodeId: reason} from rule engine
     * @returns {string} Mermaid diagram source
     */
    generateMermaid: function(activeNodeIds, mode, recommendedNodes) {
        recommendedNodes = recommendedNodes || {};
        var lines = ['graph TB'];

        // Layer subgraphs
        var layers = {
            'platform': 'Platform',
            'data': 'Data Layer',
            'application': 'Applications',
            'orchestration': 'Orchestration',
            'ui': 'User Interface',
            'external': 'External'
        };

        // Node IDs and names come from the ontology tables: emit safe IDs and quoted, escaped labels.
        // Every ontology id already safe for Mermaid is reserved first, so it keeps its own name.
        var ids = { byNode: {}, used: {} };
        for (var sid in this.nodes) {
            if (this._isMermaidSafeId(sid)) ids.used['$' + sid] = true;
        }
        for (var se = 0; se < this.edges.length; se++) {
            if (this._isMermaidSafeId(this.edges[se].source)) ids.used['$' + this.edges[se].source] = true;
            if (this._isMermaidSafeId(this.edges[se].target)) ids.used['$' + this.edges[se].target] = true;
        }
        var self = this;
        var idFor = function(nodeId) { return self._mermaidId(ids, nodeId); };

        var activeSet = {};
        for (var a = 0; a < activeNodeIds.length; a++) {
            activeSet[activeNodeIds[a]] = true;
        }

        for (var layerId in layers) {
            var layerNodes = [];
            for (var nid in this.nodes) {
                var node = this.nodes[nid];
                if (node.layer !== layerId) continue;

                var isActive = this._has(activeSet, nid);
                var isRecommended = this._has(recommendedNodes, nid) && !!recommendedNodes[nid];

                if (mode === 'as_is' && !isActive) continue;
                if (mode === 'recommended' && !isActive && !isRecommended) continue;

                if (isRecommended && !isActive) {
                    layerNodes.push('    ' + idFor(nid) + '[' + this._mermaidLabel(node.name, nid, ' ⭐') + ']:::recommended');
                } else {
                    layerNodes.push('    ' + idFor(nid) + '[' + this._mermaidLabel(node.name, nid, '') + ']');
                }
            }

            if (layerNodes.length > 0) {
                lines.push('  subgraph ' + layers[layerId]);
                for (var ln = 0; ln < layerNodes.length; ln++) {
                    lines.push(layerNodes[ln]);
                }
                lines.push('  end');
            }
        }

        // Edges between active (and recommended) nodes
        var allRelevant = {};
        for (var key in activeSet) allRelevant[key] = true;
        if (mode === 'recommended') {
            for (var rn in recommendedNodes) allRelevant[rn] = true;
        }

        for (var ei = 0; ei < this.edges.length; ei++) {
            var edge = this.edges[ei];
            if (this._has(allRelevant, edge.source) && this._has(allRelevant, edge.target)) {
                if (edge.rel_type !== 'extends' && edge.rel_type !== 'segregated_from') {
                    lines.push('  ' + idFor(edge.source) + ' --> ' + idFor(edge.target));
                }
            }
        }

        // Style classes
        lines.push('  classDef recommended fill:#fef3c7,stroke:#f59e0b,stroke-width:2px');

        return lines.join('\n');
    },

    /** True when an ontology id can be a Mermaid node ID as it is: a letter, then letters, digits, _. */
    _isMermaidSafeId: function(nodeId) {
        // Words Mermaid's flowchart grammar reserves; a node ID equal to one of them breaks the diagram.
        var reserved = /^(end|graph|flowchart|subgraph|direction|style|classdef|class|click|call|href|linkstyle|interpolate|default|acctitle|accdescr)$/i;
        return /^[A-Za-z][A-Za-z0-9_]*$/.test(nodeId) && !reserved.test(nodeId);
    },

    /**
     * The Mermaid node ID for an ontology node id within one diagram (`ids` is per generateMermaid
     * call). A safe id is used as it is. Any other id becomes letters, digits and underscores with an
     * n_ prefix where needed, plus a numeric suffix if that name is taken, so ids that differ only in
     * punctuation stay separate nodes and never take a safe id's name.
     */
    _mermaidId: function(ids, nodeId) {
        var key = '$' + nodeId; // keys are prefixed, so an id like "hasOwnProperty" is an ordinary key
        if (ids.byNode.hasOwnProperty(key)) return ids.byNode[key];
        var unique = String(nodeId);
        if (!this._isMermaidSafeId(unique)) {
            var base = unique.replace(/[^A-Za-z0-9_]/g, '_');
            if (!this._isMermaidSafeId(base)) base = 'n_' + base;
            unique = base;
            for (var n = 2; ids.used.hasOwnProperty('$' + unique); n++) unique = base + '_' + n;
        }
        ids.used['$' + unique] = true;
        ids.byNode[key] = unique;
        return unique;
    },

    /**
     * A quoted Mermaid label for a node name, followed by `suffix`. Mermaid entity codes (#quot; #35;
     * #37; …) stand in for every character that could end the quoted string, start an entity, a
     * markdown string or a %% comment or %%{init}%% directive (Mermaid finds those even inside quotes),
     * or read as HTML; line breaks become spaces. A blank name falls back to the node id, so a label
     * is never empty (Mermaid rejects [""]).
     */
    _mermaidLabel: function(name, nodeId, suffix) {
        var text = String(name || '').replace(/[\r\n\t\u2028\u2029]+/g, ' ').trim();
        if (!text) text = String(nodeId || '').replace(/[\r\n\t\u2028\u2029]+/g, ' ').trim() || '(unnamed)';
        var escaped = (text + (suffix || ''))
            .replace(/#/g, '#35;')
            .replace(/%/g, '#37;')
            .replace(/"/g, '#quot;')
            .replace(/&/g, '#amp;')
            .replace(/</g, '#lt;')
            .replace(/>/g, '#gt;')
            .replace(/`/g, '#96;');
        return '"' + escaped + '"';
    },

    type: 'MinosOntology'
};
