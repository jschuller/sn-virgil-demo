import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['virgil_utils_si'],
    name: 'VirgilUtils',
    description: 'Utility functions — record counts, table existence, plugin detection, CMDB stats',
    active: true,
    clientCallable: false,
    script: Now.include('../../server/VirgilUtils.server.js'),
    apiName: 'x_9418_virgil.VirgilUtils',
    mobileCallable: false,
    sandboxCallable: false,
})

ScriptInclude({
    $id: Now.ID['minos_ontology_si'],
    name: 'MinosOntology',
    description:
        'Architecture ontology graph — loads nodes/edges from tables, maps instance to nodes, generates Mermaid diagrams',
    active: true,
    clientCallable: false,
    script: Now.include('../../server/MinosOntology.server.js'),
    apiName: 'x_9418_virgil.MinosOntology',
    mobileCallable: false,
    sandboxCallable: false,
})

ScriptInclude({
    $id: Now.ID['minos_rule_engine_si'],
    name: 'MinosRuleEngine',
    description: 'Generic rule engine — loads rules from table, evaluates against instance model, produces findings',
    active: true,
    clientCallable: false,
    script: Now.include('../../server/MinosRuleEngine.server.js'),
    apiName: 'x_9418_virgil.MinosRuleEngine',
    mobileCallable: false,
    sandboxCallable: false,
})

ScriptInclude({
    $id: Now.ID['minos_scanner_si'],
    name: 'MinosScanner',
    description:
        'Full architecture scan — plugins, tables, ontology mapping, rule evaluation, diagram generation, persistence',
    active: true,
    clientCallable: false,
    script: Now.include('../../server/MinosScanner.server.js'),
    apiName: 'x_9418_virgil.MinosScanner',
    mobileCallable: false,
    sandboxCallable: false,
})

ScriptInclude({
    $id: Now.ID['plutus_scanner_si'],
    name: 'PlutusScanner',
    description: 'WDF credit sizing scan — rate card loading, capability detection, credit calculation, persistence',
    active: true,
    clientCallable: false,
    script: Now.include('../../server/PlutusScanner.server.js'),
    apiName: 'x_9418_virgil.PlutusScanner',
    mobileCallable: false,
    sandboxCallable: false,
})

ScriptInclude({
    $id: Now.ID['virgil_ajax_si'],
    name: 'VirgilAjax',
    description:
        'Client-callable GlideAjax wrapper for triggering Minos and Plutus scans and LLM chat from workspace UI',
    active: true,
    clientCallable: true,
    script: Now.include('../../server/VirgilAjax.server.js'),
    apiName: 'x_9418_virgil.VirgilAjax',
    mobileCallable: false,
    sandboxCallable: false,
})

ScriptInclude({
    $id: Now.ID['virgil_chat_si'],
    name: 'VirgilChat',
    description:
        'LLM bridge — calls Claude API with extended thinking for architecture analysis, diagram generation, and recommendations',
    active: true,
    clientCallable: false,
    script: Now.include('../../server/VirgilChat.server.js'),
    apiName: 'x_9418_virgil.VirgilChat',
    mobileCallable: false,
    sandboxCallable: false,
})
