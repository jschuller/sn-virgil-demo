import { ApplicationMenu, Record } from '@servicenow/sdk/core'

export const virgilAppMenu = ApplicationMenu({
    $id: Now.ID['virgil_app_menu'],
    title: 'Virgil',
    active: true,
    order: 100,
    description: 'Presales intelligence — Architecture Scan, WDF Sizing, AI Advisor',
    category: '',
})

// ── Minos modules ────────────────────────────────────────────────────────────

Record({
    $id: Now.ID['minos_scans_module'],
    table: 'sys_app_module',
    data: {
        title: 'Minos Scans',
        name: 'x_9418_virgil_minos_scan',
        application: virgilAppMenu,
        link_type: 'LIST',
        active: true,
        order: 100,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
})

Record({
    $id: Now.ID['minos_findings_module'],
    table: 'sys_app_module',
    data: {
        title: 'Minos Findings',
        name: 'x_9418_virgil_minos_finding',
        application: virgilAppMenu,
        link_type: 'LIST',
        active: true,
        order: 200,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
})

Record({
    $id: Now.ID['minos_rules_module'],
    table: 'sys_app_module',
    data: {
        title: 'Minos Rules',
        name: 'x_9418_virgil_minos_rule',
        application: virgilAppMenu,
        link_type: 'LIST',
        active: true,
        order: 300,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
})

// ── Ontology modules ─────────────────────────────────────────────────────────

Record({
    $id: Now.ID['ontology_nodes_module'],
    table: 'sys_app_module',
    data: {
        title: 'Ontology Nodes',
        name: 'x_9418_virgil_ontology_node',
        application: virgilAppMenu,
        link_type: 'LIST',
        active: true,
        order: 400,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
})

Record({
    $id: Now.ID['ontology_edges_module'],
    table: 'sys_app_module',
    data: {
        title: 'Ontology Edges',
        name: 'x_9418_virgil_ontology_edge',
        application: virgilAppMenu,
        link_type: 'LIST',
        active: true,
        order: 500,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
})

// ── Plutus/WDF modules ──────────────────────────────────────────────────────

Record({
    $id: Now.ID['wdf_scans_module'],
    table: 'sys_app_module',
    data: {
        title: 'WDF Scans',
        name: 'x_9418_virgil_wdf_scan',
        application: virgilAppMenu,
        link_type: 'LIST',
        active: true,
        order: 600,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
})

Record({
    $id: Now.ID['wdf_rate_card_module'],
    table: 'sys_app_module',
    data: {
        title: 'WDF Rate Card',
        name: 'x_9418_virgil_wdf_rate_card',
        application: virgilAppMenu,
        link_type: 'LIST',
        active: true,
        order: 700,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
})
