// scan() returns { status, message, total_credits, capabilities_detected, lines }. Each line uses the
// /plutus/history names: capability_id, capability_label, detected, usage_value, meter_unit,
// credits_per_unit, credits_consumed, evidence (see PlutusLine in src/client/services/VirgilService.js).
var PlutusScanner = Class.create();
PlutusScanner.prototype = {
    initialize: function() {},
    scan: function() {
        return {
            status: 'stub',
            message: 'PlutusScanner is not included in the demo. See project-virgil for the full implementation.',
            total_credits: 0,
            capabilities_detected: 0,
            lines: []
        };
    },
    type: 'PlutusScanner'
};
