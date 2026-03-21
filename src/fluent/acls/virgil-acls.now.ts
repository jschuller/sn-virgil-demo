import { Acl } from '@servicenow/sdk/core'

// ── Minos Scan ───────────────────────────────────────────────────────────────

Acl({
    $id: Now.ID['minos_scan_read_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_scan',
    operation: 'read',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_scan_write_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_scan',
    operation: 'write',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_scan_create_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_scan',
    operation: 'create',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_scan_delete_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_scan',
    operation: 'delete',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

// ── Minos Finding ────────────────────────────────────────────────────────────

Acl({
    $id: Now.ID['minos_finding_read_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_finding',
    operation: 'read',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_finding_write_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_finding',
    operation: 'write',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_finding_create_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_finding',
    operation: 'create',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_finding_delete_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_finding',
    operation: 'delete',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

// ── Minos Rule ───────────────────────────────────────────────────────────────

Acl({
    $id: Now.ID['minos_rule_read_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_rule',
    operation: 'read',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_rule_write_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_rule',
    operation: 'write',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_rule_create_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_rule',
    operation: 'create',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['minos_rule_delete_acl'],
    type: 'record',
    table: 'x_9418_virgil_minos_rule',
    operation: 'delete',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

// ── Ontology Node ────────────────────────────────────────────────────────────

Acl({
    $id: Now.ID['ontology_node_read_acl'],
    type: 'record',
    table: 'x_9418_virgil_ontology_node',
    operation: 'read',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['ontology_node_write_acl'],
    type: 'record',
    table: 'x_9418_virgil_ontology_node',
    operation: 'write',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['ontology_node_create_acl'],
    type: 'record',
    table: 'x_9418_virgil_ontology_node',
    operation: 'create',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['ontology_node_delete_acl'],
    type: 'record',
    table: 'x_9418_virgil_ontology_node',
    operation: 'delete',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

// ── Ontology Edge ────────────────────────────────────────────────────────────

Acl({
    $id: Now.ID['ontology_edge_read_acl'],
    type: 'record',
    table: 'x_9418_virgil_ontology_edge',
    operation: 'read',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['ontology_edge_write_acl'],
    type: 'record',
    table: 'x_9418_virgil_ontology_edge',
    operation: 'write',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['ontology_edge_create_acl'],
    type: 'record',
    table: 'x_9418_virgil_ontology_edge',
    operation: 'create',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['ontology_edge_delete_acl'],
    type: 'record',
    table: 'x_9418_virgil_ontology_edge',
    operation: 'delete',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

// ── WDF Rate Card ────────────────────────────────────────────────────────────

Acl({
    $id: Now.ID['wdf_rate_card_read_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_rate_card',
    operation: 'read',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_rate_card_write_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_rate_card',
    operation: 'write',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_rate_card_create_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_rate_card',
    operation: 'create',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_rate_card_delete_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_rate_card',
    operation: 'delete',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

// ── WDF Scan ─────────────────────────────────────────────────────────────────

Acl({
    $id: Now.ID['wdf_scan_read_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_scan',
    operation: 'read',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_scan_write_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_scan',
    operation: 'write',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_scan_create_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_scan',
    operation: 'create',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_scan_delete_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_scan',
    operation: 'delete',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

// ── WDF Scan Line ────────────────────────────────────────────────────────────

Acl({
    $id: Now.ID['wdf_scan_line_read_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_scan_line',
    operation: 'read',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_scan_line_write_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_scan_line',
    operation: 'write',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_scan_line_create_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_scan_line',
    operation: 'create',
    roles: ['x_9418_virgil.admin'],
    active: true,
})

Acl({
    $id: Now.ID['wdf_scan_line_delete_acl'],
    type: 'record',
    table: 'x_9418_virgil_wdf_scan_line',
    operation: 'delete',
    roles: ['x_9418_virgil.admin'],
    active: true,
})
