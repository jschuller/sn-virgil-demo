var VirgilAjax = Class.create();
/* eslint-disable-next-line no-unsupported-node-builtins -- `global` here is the ServiceNow global scope, not Node's */
VirgilAjax.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    runMinosScan: function() {
        var scanner = new MinosScanner();
        var result = scanner.scan();
        return JSON.stringify(result);
    },

    runPlutusScan: function() {
        var scanner = new PlutusScanner();
        var result = scanner.scan();
        return JSON.stringify(result);
    },

    askVirgil: function() {
        var query = this.getParameter('sysparm_query');
        var thinking = this.getParameter('sysparm_thinking') === 'true';
        var chat = new VirgilChat();
        var result = chat.analyze(query, { thinking: thinking });
        return JSON.stringify(result);
    },

    type: 'VirgilAjax'
});
