import { RestApi } from '@servicenow/sdk/core'
import { virgilApiAcl } from '../acls/virgil-rest-acls.now'

RestApi({
    $id: Now.ID['virgil_api'],
    name: 'Virgil API',
    serviceId: 'virgil_api',
    enforceAcl: [virgilApiAcl],
    routes: [
        // ── Minos endpoints ──────────────────────────────────────────────
        {
            $id: Now.ID['minos_scan_endpoint'],
            name: 'Minos Scan',
            path: '/minos/scan',
            method: 'POST',
            script: `
    (function process(request, response) {
        var scanner = new MinosScanner();
        var result = scanner.scan();
        response.setStatus(200);
        response.setBody(result);
    })(request, response);
    `,
            consumes: 'application/json,application/xml,text/xml',
            produces: 'application/json,application/xml,text/xml',
            enforceAcl: [virgilApiAcl],
        },
        {
            $id: Now.ID['minos_history_endpoint'],
            name: 'Minos History',
            path: '/minos/history',
            method: 'GET',
            script: `
    (function process(request, response) {
        var limit = Math.min(Math.max(parseInt(request.queryParams.limit, 10) || 10, 1), 100);
        var scans = [];
        var gr = new GlideRecord('x_9418_virgil_minos_scan');
        gr.orderByDesc('x_9418_virgil_scan_date');
        gr.setLimit(limit);
        gr.query();
        while (gr.next()) {
            scans.push({
                sys_id: gr.getUniqueValue(),
                scan_date: gr.getValue('x_9418_virgil_scan_date'),
                status: gr.getValue('x_9418_virgil_status'),
                plugins_scanned: parseInt(gr.getValue('x_9418_virgil_plugins_scanned')) || 0,
                tables_scanned: parseInt(gr.getValue('x_9418_virgil_tables_scanned')) || 0,
                active_nodes: parseInt(gr.getValue('x_9418_virgil_active_nodes')) || 0,
                total_findings: parseInt(gr.getValue('x_9418_virgil_total_findings')) || 0,
                recommended_additions: parseInt(gr.getValue('x_9418_virgil_recommended_additions')) || 0
            });
        }
        response.setStatus(200);
        response.setBody({ scans: scans });
    })(request, response);
    `,
            consumes: 'application/json,application/xml,text/xml',
            produces: 'application/json,application/xml,text/xml',
            enforceAcl: [virgilApiAcl],
        },
        // ── Plutus endpoints ─────────────────────────────────────────────
        {
            $id: Now.ID['plutus_scan_endpoint'],
            name: 'Plutus Scan',
            path: '/plutus/scan',
            method: 'POST',
            script: `
    (function process(request, response) {
        var body = request.body ? request.body.data : {};
        var overrides = body.user_overrides || {};
        var scanner = new PlutusScanner();
        var result = scanner.scan({user_overrides: overrides});
        response.setStatus(200);
        response.setBody(result);
    })(request, response);
    `,
            consumes: 'application/json,application/xml,text/xml',
            produces: 'application/json,application/xml,text/xml',
            enforceAcl: [virgilApiAcl],
        },
        // ── Virgil Chat endpoint ────────────────────────────────────────
        {
            $id: Now.ID['virgil_chat_endpoint'],
            name: 'Virgil Chat',
            path: '/virgil/chat',
            method: 'POST',
            script: `
    (function process(request, response) {
        var body = request.body ? request.body.data : {};
        var query = body.query || '';
        var thinking = body.thinking !== false;
        if (!query) {
            response.setStatus(400);
            response.setBody({ error: 'Missing required field: query' });
            return;
        }
        var chat = new VirgilChat();
        var result = chat.analyze(query, { thinking: thinking });
        var status = result.status === 'error' ? 500 : 200;
        response.setStatus(status);
        response.setBody(result);
    })(request, response);
    `,
            consumes: 'application/json,application/xml,text/xml',
            produces: 'application/json,application/xml,text/xml',
            enforceAcl: [virgilApiAcl],
        },
        {
            $id: Now.ID['plutus_history_endpoint'],
            name: 'Plutus History',
            path: '/plutus/history',
            method: 'GET',
            script: `
    (function process(request, response) {
        var limit = Math.min(Math.max(parseInt(request.queryParams.limit, 10) || 10, 1), 100);
        var scans = [];
        var gr = new GlideRecord('x_9418_virgil_wdf_scan');
        gr.orderByDesc('x_9418_virgil_scan_date');
        gr.setLimit(limit);
        gr.query();
        while (gr.next()) {
            var scanId = gr.getUniqueValue();
            var lines = [];
            var lg = new GlideRecord('x_9418_virgil_wdf_scan_line');
            lg.addQuery('x_9418_virgil_scan', scanId);
            lg.query();
            while (lg.next()) {
                lines.push({
                    capability_id: lg.getValue('x_9418_virgil_capability_id'),
                    capability_label: lg.getValue('x_9418_virgil_capability_label'),
                    detected: lg.getValue('x_9418_virgil_detected') == 'true',
                    usage_value: parseFloat(lg.getValue('x_9418_virgil_usage_value')) || 0,
                    meter_unit: lg.getValue('x_9418_virgil_meter_unit'),
                    credits_per_unit: parseFloat(lg.getValue('x_9418_virgil_credits_per_unit')) || 0,
                    credits_consumed: parseFloat(lg.getValue('x_9418_virgil_credits_consumed')) || 0
                });
            }
            scans.push({
                sys_id: scanId,
                scan_date: gr.getValue('x_9418_virgil_scan_date'),
                status: gr.getValue('x_9418_virgil_status'),
                total_credits: parseFloat(gr.getValue('x_9418_virgil_total_credits')) || 0,
                capabilities_detected: parseInt(gr.getValue('x_9418_virgil_capabilities_detected')) || 0,
                lines: lines
            });
        }
        response.setStatus(200);
        response.setBody({ scans: scans });
    })(request, response);
    `,
            consumes: 'application/json,application/xml,text/xml',
            produces: 'application/json,application/xml,text/xml',
            enforceAcl: [virgilApiAcl],
        },
    ],
})
