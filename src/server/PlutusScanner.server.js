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
