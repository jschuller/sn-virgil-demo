import { CrossScopePrivilege } from '@servicenow/sdk/core'

// Allow all scopes (REST API / Table API / MCP / deploy.py) to CRUD all Virgil tables.
// Without these, the Table API returns 403 for scoped app tables from global scope.

const VIRGIL_SCOPE = 'x_9418_virgil'

// 8 tables × 4 operations = 32 cross-scope privileges

export const csp_ontology_node_read = CrossScopePrivilege({ $id: Now.ID['csp_ontology_node_read'], targetName: 'x_9418_virgil_ontology_node', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'read', status: 'allowed' })
export const csp_ontology_node_create = CrossScopePrivilege({ $id: Now.ID['csp_ontology_node_create'], targetName: 'x_9418_virgil_ontology_node', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'create', status: 'allowed' })
export const csp_ontology_node_write = CrossScopePrivilege({ $id: Now.ID['csp_ontology_node_write'], targetName: 'x_9418_virgil_ontology_node', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'write', status: 'allowed' })
export const csp_ontology_node_delete = CrossScopePrivilege({ $id: Now.ID['csp_ontology_node_delete'], targetName: 'x_9418_virgil_ontology_node', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'delete', status: 'allowed' })

export const csp_ontology_edge_read = CrossScopePrivilege({ $id: Now.ID['csp_ontology_edge_read'], targetName: 'x_9418_virgil_ontology_edge', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'read', status: 'allowed' })
export const csp_ontology_edge_create = CrossScopePrivilege({ $id: Now.ID['csp_ontology_edge_create'], targetName: 'x_9418_virgil_ontology_edge', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'create', status: 'allowed' })
export const csp_ontology_edge_write = CrossScopePrivilege({ $id: Now.ID['csp_ontology_edge_write'], targetName: 'x_9418_virgil_ontology_edge', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'write', status: 'allowed' })
export const csp_ontology_edge_delete = CrossScopePrivilege({ $id: Now.ID['csp_ontology_edge_delete'], targetName: 'x_9418_virgil_ontology_edge', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'delete', status: 'allowed' })

export const csp_minos_rule_read = CrossScopePrivilege({ $id: Now.ID['csp_minos_rule_read'], targetName: 'x_9418_virgil_minos_rule', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'read', status: 'allowed' })
export const csp_minos_rule_create = CrossScopePrivilege({ $id: Now.ID['csp_minos_rule_create'], targetName: 'x_9418_virgil_minos_rule', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'create', status: 'allowed' })
export const csp_minos_rule_write = CrossScopePrivilege({ $id: Now.ID['csp_minos_rule_write'], targetName: 'x_9418_virgil_minos_rule', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'write', status: 'allowed' })
export const csp_minos_rule_delete = CrossScopePrivilege({ $id: Now.ID['csp_minos_rule_delete'], targetName: 'x_9418_virgil_minos_rule', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'delete', status: 'allowed' })

export const csp_minos_scan_read = CrossScopePrivilege({ $id: Now.ID['csp_minos_scan_read'], targetName: 'x_9418_virgil_minos_scan', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'read', status: 'allowed' })
export const csp_minos_scan_create = CrossScopePrivilege({ $id: Now.ID['csp_minos_scan_create'], targetName: 'x_9418_virgil_minos_scan', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'create', status: 'allowed' })
export const csp_minos_scan_write = CrossScopePrivilege({ $id: Now.ID['csp_minos_scan_write'], targetName: 'x_9418_virgil_minos_scan', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'write', status: 'allowed' })
export const csp_minos_scan_delete = CrossScopePrivilege({ $id: Now.ID['csp_minos_scan_delete'], targetName: 'x_9418_virgil_minos_scan', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'delete', status: 'allowed' })

export const csp_minos_finding_read = CrossScopePrivilege({ $id: Now.ID['csp_minos_finding_read'], targetName: 'x_9418_virgil_minos_finding', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'read', status: 'allowed' })
export const csp_minos_finding_create = CrossScopePrivilege({ $id: Now.ID['csp_minos_finding_create'], targetName: 'x_9418_virgil_minos_finding', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'create', status: 'allowed' })
export const csp_minos_finding_write = CrossScopePrivilege({ $id: Now.ID['csp_minos_finding_write'], targetName: 'x_9418_virgil_minos_finding', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'write', status: 'allowed' })
export const csp_minos_finding_delete = CrossScopePrivilege({ $id: Now.ID['csp_minos_finding_delete'], targetName: 'x_9418_virgil_minos_finding', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'delete', status: 'allowed' })

export const csp_wdf_rate_card_read = CrossScopePrivilege({ $id: Now.ID['csp_wdf_rate_card_read'], targetName: 'x_9418_virgil_wdf_rate_card', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'read', status: 'allowed' })
export const csp_wdf_rate_card_create = CrossScopePrivilege({ $id: Now.ID['csp_wdf_rate_card_create'], targetName: 'x_9418_virgil_wdf_rate_card', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'create', status: 'allowed' })
export const csp_wdf_rate_card_write = CrossScopePrivilege({ $id: Now.ID['csp_wdf_rate_card_write'], targetName: 'x_9418_virgil_wdf_rate_card', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'write', status: 'allowed' })
export const csp_wdf_rate_card_delete = CrossScopePrivilege({ $id: Now.ID['csp_wdf_rate_card_delete'], targetName: 'x_9418_virgil_wdf_rate_card', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'delete', status: 'allowed' })

export const csp_wdf_scan_read = CrossScopePrivilege({ $id: Now.ID['csp_wdf_scan_read'], targetName: 'x_9418_virgil_wdf_scan', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'read', status: 'allowed' })
export const csp_wdf_scan_create = CrossScopePrivilege({ $id: Now.ID['csp_wdf_scan_create'], targetName: 'x_9418_virgil_wdf_scan', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'create', status: 'allowed' })
export const csp_wdf_scan_write = CrossScopePrivilege({ $id: Now.ID['csp_wdf_scan_write'], targetName: 'x_9418_virgil_wdf_scan', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'write', status: 'allowed' })
export const csp_wdf_scan_delete = CrossScopePrivilege({ $id: Now.ID['csp_wdf_scan_delete'], targetName: 'x_9418_virgil_wdf_scan', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'delete', status: 'allowed' })

export const csp_wdf_scan_line_read = CrossScopePrivilege({ $id: Now.ID['csp_wdf_scan_line_read'], targetName: 'x_9418_virgil_wdf_scan_line', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'read', status: 'allowed' })
export const csp_wdf_scan_line_create = CrossScopePrivilege({ $id: Now.ID['csp_wdf_scan_line_create'], targetName: 'x_9418_virgil_wdf_scan_line', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'create', status: 'allowed' })
export const csp_wdf_scan_line_write = CrossScopePrivilege({ $id: Now.ID['csp_wdf_scan_line_write'], targetName: 'x_9418_virgil_wdf_scan_line', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'write', status: 'allowed' })
export const csp_wdf_scan_line_delete = CrossScopePrivilege({ $id: Now.ID['csp_wdf_scan_line_delete'], targetName: 'x_9418_virgil_wdf_scan_line', targetScope: VIRGIL_SCOPE, targetType: 'sys_db_object', operation: 'delete', status: 'allowed' })
