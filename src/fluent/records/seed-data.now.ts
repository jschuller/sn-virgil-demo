import { Record } from '@servicenow/sdk/core'
import '@servicenow/sdk/global'

// =============================================================================
// Virgil Seed Data — Fluent Record() declarations
// Converted from JSON seed files in servicenow-app/data/
// =============================================================================

// =============================================================================
// MINOS RULES (x_9418_virgil_minos_rule) — 35 records
// =============================================================================

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_S2P_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-S2P-001',
    x_9418_virgil_name: 'No Strategic Portfolio Management \u2014 High Operational Volume',
    x_9418_virgil_description: 'Instance has no SPM/ITBM but has significant change and incident volume, indicating operational complexity that would benefit from portfolio governance.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'SPM absent AND (500+ change requests OR 2000+ incidents) \u2014 operational complexity without portfolio oversight',
    x_9418_virgil_eval_json: '{"all": [{"node_absent": "spm"}, {"any": [{"table_gt": {"table": "change_request", "value": 500}}, {"table_gt": {"table": "incident", "value": 2000}}]}]}',
    x_9418_virgil_message_template: 'No SPM but {change_request_count} changes + {incident_count} incidents. Operational complexity without portfolio governance.',
    x_9418_virgil_recommendation: 'Enable Strategic Portfolio Management (SPM) to cover the Strategy to Portfolio (S2P) value stream. With {change_request_count} changes and {incident_count} incidents, this instance has significant operational complexity that needs demand management, portfolio prioritization, and investment planning to align IT delivery with business strategy.',
    x_9418_virgil_tags: '["S2P", "spm", "itbm", "portfolio"]',
    x_9418_virgil_recommended_nodes: '{"spm": "S2P coverage", "ppm": "S2P coverage"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 100,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_S2P_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-S2P-002',
    x_9418_virgil_name: 'No GRC \u2014 Multi-Product Instance Without Governance',
    x_9418_virgil_description: 'Instance runs multiple ServiceNow products but has no GRC capability. Multi-product footprints require governance and risk oversight.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'GRC absent AND 2+ products active (ITSM, CSM, HRSD, SecOps) \u2014 multi-product footprint without governance',
    x_9418_virgil_eval_json: '{"all": [{"node_absent": "grc"}, {"any": [{"node_active": "csm"}, {"node_active": "hrsd"}, {"node_active": "secops"}]}]}',
    x_9418_virgil_message_template: 'No GRC but multiple products active (ITSM + CSM/HRSD/SecOps). Multi-product footprint without governance oversight.',
    x_9418_virgil_recommendation: 'Enable GRC (Integrated Risk Management) to provide governance, risk assessment, and compliance monitoring. With multiple active products, this instance needs centralized risk and compliance oversight to ensure regulatory alignment across all workflows.',
    x_9418_virgil_tags: '["S2P", "grc", "compliance", "risk"]',
    x_9418_virgil_recommended_nodes: '{"grc": "S2P governance"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 110,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_R2D_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-R2D-001',
    x_9418_virgil_name: 'No Change Management \u2014 Active Operations Without Deployment Control',
    x_9418_virgil_description: 'Instance has significant incident volume but no Change Management, indicating active operations without controlled deployment processes.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'Change Management absent AND 500+ incidents \u2014 active operations without deployment control',
    x_9418_virgil_eval_json: '{"all": [{"node_absent": "change"}, {"table_gt": {"table": "incident", "value": 500}}]}',
    x_9418_virgil_message_template: 'No Change Management but {incident_count} incidents. Active operations without deployment control.',
    x_9418_virgil_recommendation: 'Enable Change Management to provide controlled release and deployment processes. With {incident_count} incidents, this instance has active operations that need deployment governance as part of the R2D value stream.',
    x_9418_virgil_tags: '["R2D", "change", "deployment"]',
    x_9418_virgil_recommended_nodes: '{"change": "R2D deployment control"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 120,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_R2D_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-R2D-002',
    x_9418_virgil_name: 'No CMDB for Configuration Tracking',
    x_9418_virgil_description: 'CMDB is not populated. R2D requires configuration item tracking for deployments.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'cmdb_ci table has fewer than 100 records or Discovery is not active',
    x_9418_virgil_eval_json: '{"all": [{"cmdb_below": {"field": "total_cis", "value": 100}}, {"cmdb_flag_false": "has_discovery"}]}',
    x_9418_virgil_message_template: 'CMDB has only {total_cis} CIs and no Discovery. R2D lacks configuration tracking.',
    x_9418_virgil_recommendation: 'Populate the CMDB via Discovery or Service Mapping to track configuration items that are affected by deployments. A well-maintained CMDB is critical for R2D.',
    x_9418_virgil_tags: '["R2D", "cmdb", "discovery", "configuration"]',
    x_9418_virgil_recommended_nodes: '{"discovery": "R2D config tracking", "service_mapping": "R2D service topology"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 130,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_R2F_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-R2F-001',
    x_9418_virgil_name: 'No Service Catalog \u2014 ITSM Active Without Structured Request Intake',
    x_9418_virgil_description: 'Instance has active ITSM operations but no Service Catalog, meaning requests arrive through unstructured channels (email, walk-ups, direct tickets).',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'Service Catalog absent AND ITSM active with 200+ incidents \u2014 request volume without structured intake',
    x_9418_virgil_eval_json: '{"all": [{"node_absent": "service_catalog"}, {"node_active": "itsm"}, {"table_gt": {"table": "incident", "value": 200}}]}',
    x_9418_virgil_message_template: 'ITSM active with {incident_count} incidents but no Service Catalog. Requests lack structured intake.',
    x_9418_virgil_recommendation: 'Enable Service Catalog to provide structured request intake. With {incident_count} incidents, this instance has significant ticket volume that would benefit from categorized request forms, approval workflows, and fulfillment automation.',
    x_9418_virgil_tags: '["R2F", "catalog", "request", "fulfillment"]',
    x_9418_virgil_recommended_nodes: '{"service_catalog": "R2F request intake"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 140,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_R2F_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-R2F-002',
    x_9418_virgil_name: 'No Self-Service Portal \u2014 Service Catalog Without User Channel',
    x_9418_virgil_description: 'Instance has Service Catalog but no portal for end-users to access it. Catalog items exist but users have no self-service front door.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'Service Catalog active but neither Service Portal nor Employee Center installed \u2014 catalog items exist without a user-facing channel',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "service_catalog"}, {"node_absent": "service_portal"}, {"node_absent": "employee_center"}]}',
    x_9418_virgil_message_template: 'Service Catalog active but no self-service portal. Users cannot browse or submit catalog requests.',
    x_9418_virgil_recommendation: 'Deploy Service Portal or Employee Center to provide end-users with a self-service channel. Your Service Catalog has items but no front door for users to browse and submit requests.',
    x_9418_virgil_tags: '["R2F", "portal", "self-service"]',
    x_9418_virgil_recommended_nodes: '{"service_portal": "R2F self-service"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 150,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_R2F_003'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-R2F-003',
    x_9418_virgil_name: 'No Knowledge Base for Self-Resolution',
    x_9418_virgil_description: 'Knowledge Base is not active. R2F benefits from self-resolution to reduce ticket volume.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'Knowledge plugin (com.glideapp.knowledge) is not installed or kb_knowledge table has fewer than 10 published articles',
    x_9418_virgil_eval_json: '{"any": [{"node_absent": "knowledge_base"}, {"table_between": {"table": "kb_knowledge", "min": 0, "below": 10}}]}',
    x_9418_virgil_message_template: 'Knowledge Base has {kb_knowledge_count} articles. Self-resolution limited.',
    x_9418_virgil_recommendation: 'Enable and populate the Knowledge Base to allow end-users to self-resolve common issues, reducing ticket volume in the R2F stream.',
    x_9418_virgil_tags: '["R2F", "knowledge", "self-service"]',
    x_9418_virgil_recommended_nodes: '{"knowledge_base": "R2F self-resolution"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 160,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_D2C_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-D2C-001',
    x_9418_virgil_name: 'No Problem Management \u2014 High Incident Volume',
    x_9418_virgil_description: 'Instance has significant incident volume but no Problem Management. Without root cause analysis, the same incidents recur.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'Problem Management absent AND 1000+ incidents \u2014 high ticket volume without root cause analysis loop',
    x_9418_virgil_eval_json: '{"all": [{"node_absent": "problem"}, {"table_gt": {"table": "incident", "value": 1000}}]}',
    x_9418_virgil_message_template: 'No Problem Management but {incident_count} incidents. High ticket volume without root cause analysis.',
    x_9418_virgil_recommendation: 'Enable Problem Management to perform root cause analysis and prevent recurring incidents. With {incident_count} incidents and no problem management, this instance lacks the reactive-to-proactive loop that the D2C value stream requires.',
    x_9418_virgil_tags: '["D2C", "problem", "root-cause"]',
    x_9418_virgil_recommended_nodes: '{"problem": "D2C root cause"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 170,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_D2C_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-D2C-002',
    x_9418_virgil_name: 'No Event Management \u2014 Reactive Operations at Scale',
    x_9418_virgil_description: 'Instance has high incident volume but no Event Management or monitoring integration, indicating purely reactive operations at significant scale.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'Event Management absent AND 5000+ incidents \u2014 reactive operations at scale without proactive monitoring',
    x_9418_virgil_eval_json: '{"all": [{"node_absent": "event_mgmt"}, {"table_gt": {"table": "incident", "value": 5000}}]}',
    x_9418_virgil_message_template: 'No Event Management but {incident_count} incidents. Reactive operations at scale \u2014 consider event-driven monitoring.',
    x_9418_virgil_recommendation: 'Enable ITOM Event Management or integrate with external monitoring tools. With {incident_count} incidents and no event correlation, this instance discovers problems only when users report them. Event-driven detection (per Jochen Geist\'s decision tree) provides real-time alerting and correlation to reduce MTTR and prevent incidents.',
    x_9418_virgil_tags: '["D2C", "event", "monitoring", "itom", "proactive", "event_driven"]',
    x_9418_virgil_recommended_nodes: '{"event_mgmt": "D2C proactive detection", "itom": "D2C operations"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 180,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_IT4IT_XS_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'IT4IT-XS-001',
    x_9418_virgil_name: 'Single Value Stream Coverage',
    x_9418_virgil_description: 'Instance only covers one IT4IT value stream. Mature organizations cover all four.',
    x_9418_virgil_source: 'it4it',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'it4it_coverage',
    x_9418_virgil_condition_desc: 'Active plugins only map to a single IT4IT value stream (S2P, R2D, R2F, or D2C)',
    x_9418_virgil_eval_json: '{"streams_covered_below": {"threshold": 2, "streams": {"S2P": {"any": [{"node_active": "spm"}, {"node_active": "grc"}]}, "R2D": {"any": [{"node_active": "change"}, {"table_gt": {"table": "change_request", "value": 0}}]}, "R2F": {"any": [{"node_active": "service_catalog"}, {"node_active": "service_portal"}]}, "D2C": {"any": [{"node_active": "incident"}, {"node_active": "event_mgmt"}]}}}}',
    x_9418_virgil_message_template: 'Only {covered_count} IT4IT value stream(s) covered: {covered_streams}.',
    x_9418_virgil_recommendation: 'Consider expanding ServiceNow usage across additional IT4IT value streams to maximize platform ROI and operational maturity.',
    x_9418_virgil_tags: '["S2P", "R2D", "R2F", "D2C", "maturity"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 190,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_PAT_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-PAT-001',
    x_9418_virgil_name: 'Heavy JDBC Usage \u2014 REST API Preferred',
    x_9418_virgil_description: 'Instance has multiple JDBC data sources. Per Jochen Geist\'s decision tree, Web Services (REST) are the preferred default for 80% of integrations. JDBC is a fallback pattern for legacy systems or bulk operations only.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: '3+ JDBC data sources found \u2014 significant reliance on JDBC fallback pattern',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sys_data_source", "value": 3}}]}',
    x_9418_virgil_message_template: '{sys_data_source_count} JDBC data sources detected. Heavy reliance on JDBC fallback pattern \u2014 review for REST API migration.',
    x_9418_virgil_recommendation: 'Prefer REST API (Scripted REST or Standard REST) over JDBC for real-time integrations. JDBC should only be used for bulk data operations where REST is not feasible. Per the Integration Pattern Decision Tree: REST is the default Web Service pattern; JDBC is a fallback solution.',
    x_9418_virgil_tags: '["web_service", "jdbc", "rest", "pattern_selection", "fallback"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 200,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_PAT_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-PAT-002',
    x_9418_virgil_name: 'SOAP When REST Available',
    x_9418_virgil_description: 'Instance uses SOAP web services where REST endpoints may be available.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'Active SOAP messages found \u2014 modern integrations should prefer REST',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sys_soap_message", "value": 0}}]}',
    x_9418_virgil_message_template: '{sys_soap_message_count} SOAP message configurations detected. Consider migrating to REST.',
    x_9418_virgil_recommendation: 'Migrate SOAP integrations to REST where the target system supports it. REST is lighter weight, easier to maintain, and the preferred pattern for modern ServiceNow integrations.',
    x_9418_virgil_tags: '["web_service", "soap", "rest", "modernization"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 210,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_PAT_003'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-PAT-003',
    x_9418_virgil_name: 'Custom Integrations Without Integration Hub',
    x_9418_virgil_description: 'Instance has significant custom REST message configurations but no Integration Hub. Per Jochen Geist: "OOTB first, always \u2014 check native integrations, spokes, and frameworks before custom development."',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: '5+ custom REST messages configured but Integration Hub is not installed \u2014 OOTB-first principle violated',
    x_9418_virgil_eval_json: '{"all": [{"node_absent": "integration_hub"}, {"table_gt": {"table": "sys_rest_message", "value": 5}}]}',
    x_9418_virgil_message_template: '{sys_rest_message_count} custom REST messages but no Integration Hub. OOTB-first principle violated \u2014 check available spokes.',
    x_9418_virgil_recommendation: 'Use Integration Hub spokes instead of custom scripted integrations. Spokes provide built-in error handling, retry logic, connection management, and are maintained by ServiceNow or spoke vendors. Per the Integration Design methodology: "Don\'t build what already exists."',
    x_9418_virgil_tags: '["integration_hub", "spokes", "custom_script", "ootb_first"]',
    x_9418_virgil_recommended_nodes: '{"integration_hub": "managed integrations"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 220,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_DIR_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-DIR-001',
    x_9418_virgil_name: 'Bidirectional Sync Without Conflict Resolution',
    x_9418_virgil_description: 'Two-way data sync detected \u2014 both inbound (import sets) and outbound (REST/SOAP messages) integrations exist, suggesting bidirectional sync.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'critical',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'Import sets and outbound REST/SOAP both exist, suggesting bidirectional sync without a clear data master',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sys_import_set", "value": 0}}, {"any": [{"table_gt": {"table": "sys_rest_message", "value": 0}}, {"table_gt": {"table": "sys_soap_message", "value": 0}}]}]}',
    x_9418_virgil_message_template: 'Bidirectional integration detected: {sys_import_set_count} import sets + outbound REST/SOAP messages. Verify conflict resolution strategy.',
    x_9418_virgil_recommendation: 'Define a clear system of record for each data entity. Use coalesce fields on import sets and implement conflict resolution rules. Bidirectional sync without a defined master leads to data inconsistencies.',
    x_9418_virgil_tags: '["data_persistence", "bidirectional", "conflict", "data_master"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 230,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_DIR_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-DIR-002',
    x_9418_virgil_name: 'Inbound Data Without Transform Maps',
    x_9418_virgil_description: 'Import sets exist without corresponding transform maps for data cleansing.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'sys_import_set records exist but sys_transform_map is empty',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sys_import_set", "value": 0}}, {"table_lte": {"table": "sys_transform_map", "value": 0}}]}',
    x_9418_virgil_message_template: '{sys_import_set_count} import sets found but no transform maps. Inbound data bypasses quality controls.',
    x_9418_virgil_recommendation: 'Always use transform maps with import sets to validate, cleanse, and map incoming data to target tables. Direct table imports bypass data quality controls.',
    x_9418_virgil_tags: '["data_persistence", "import_set", "transform", "data_quality"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 240,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_VOL_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-VOL-001',
    x_9418_virgil_name: 'Heavy Scheduled Job Usage (Potential Polling)',
    x_9418_virgil_description: 'Instance has a high number of scheduled script executions, suggesting polling-based integration patterns instead of event-driven.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'More than 50 scheduled scripts configured, suggesting polling patterns',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sysauto_script", "value": 50}}]}',
    x_9418_virgil_message_template: '{sysauto_script_count} scheduled scripts detected. Review for polling patterns that could be replaced with event-driven triggers.',
    x_9418_virgil_recommendation: 'Replace polling-based integrations with event-driven patterns where possible. Use Business Rules, Flow Designer triggers, or inbound webhooks to react to changes in real-time without unnecessary polling overhead.',
    x_9418_virgil_tags: '["event_driven", "polling", "webhook", "efficiency"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 250,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_ERR_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-ERR-001',
    x_9418_virgil_name: 'No MID Server for On-Premise Integration',
    x_9418_virgil_description: 'Instance integrates with on-premise systems without a MID Server.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'critical',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'Outbound integrations target private/internal IP ranges but no active MID Server is configured',
    x_9418_virgil_eval_json: '{"all": [{"mid_server_eq": 0}]}',
    x_9418_virgil_message_template: 'No active MID Servers detected. On-premise integrations have no secure channel.',
    x_9418_virgil_recommendation: 'Deploy a MID Server for all on-premise integrations. Direct connections from cloud to on-premise bypass security controls and are unreliable. MID Server provides secure, managed connectivity.',
    x_9418_virgil_tags: '["mid_server", "on_premise", "security", "connectivity"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 260,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_LEG_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-LEG-001',
    x_9418_virgil_name: 'Legacy Workflow Instead of Flow Designer',
    x_9418_virgil_description: 'Instance uses legacy Workflow Engine where Flow Designer should be used.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'Active legacy workflows (wf_workflow) found that could be migrated to Flow Designer',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "wf_workflow", "value": 0}}, {"any": [{"table_lte": {"table": "sys_hub_flow", "value": 0}}, {"table_exceeds": {"table": "wf_workflow", "other": "sys_hub_flow"}}]}]}',
    x_9418_virgil_message_template: 'Legacy Workflow Engine has {wf_workflow_count} workflows vs {sys_hub_flow_count} Flow Designer flows. Migration recommended.',
    x_9418_virgil_recommendation: 'Migrate legacy workflows to Flow Designer. Flow Designer provides better error handling, Integration Hub support, and is ServiceNow\'s strategic direction for process automation. Legacy Workflow is in maintenance mode.',
    x_9418_virgil_tags: '["legacy", "workflow", "flow_designer", "modernization"]',
    x_9418_virgil_recommended_nodes: '{"flow_designer": "modern automation"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 270,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_LEG_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-LEG-002',
    x_9418_virgil_name: 'Email-Based Integration',
    x_9418_virgil_description: 'Instance uses inbound email actions for integration, which is fragile and difficult to monitor compared to REST API or Import Sets.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'Inbound email actions exist for processing external data',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sysevent_email_action", "value": 0}}]}',
    x_9418_virgil_message_template: '{sysevent_email_action_count} inbound email actions detected. Consider replacing with REST API or Import Set integrations.',
    x_9418_virgil_recommendation: 'Email-based integration is a fallback pattern. Replace with REST API or Import Set integrations for reliable, structured data exchange. Email is fragile, difficult to monitor, and lacks transactional guarantees.',
    x_9418_virgil_tags: '["email", "fallback", "legacy", "reliability"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 280,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_T2_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-T2-001',
    x_9418_virgil_name: 'SOAP-Only Integration Stack \u2014 No REST Adoption',
    x_9418_virgil_description: 'Instance has SOAP integrations but zero REST message configurations. Per Jochen Geist\'s protocol hierarchy (REST > GraphQL > SOAP > ODBC), this represents a severely outdated integration stack.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'critical',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'SOAP messages present but no REST messages at all \u2014 entire integration stack is on a deprecated protocol',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sys_soap_message", "value": 0}}, {"table_lte": {"table": "sys_rest_message", "value": 0}}]}',
    x_9418_virgil_message_template: '{sys_soap_message_count} SOAP integrations but zero REST messages. Entire integration stack bypasses the preferred REST protocol.',
    x_9418_virgil_recommendation: 'Prioritize REST API adoption. Per the Integration Pattern Decision Tree, REST is the default protocol for 80% of integrations. SOAP should only remain for systems that offer no REST alternative. Establish a migration roadmap starting with the highest-traffic SOAP endpoints.',
    x_9418_virgil_tags: '["web_service", "soap", "rest", "modernization", "protocol"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 290,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_T2_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-T2-002',
    x_9418_virgil_name: 'Integration Sprawl Without Centralized Orchestration',
    x_9418_virgil_description: 'Instance has multiple active integration types (REST, SOAP, JDBC, import sets) but no Integration Hub for centralized governance. Per Jochen Geist\'s governance framework, this creates an unmanaged integration labyrinth.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'critical',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: '3+ distinct integration pattern types active without Integration Hub \u2014 integration sprawl with no central governance',
    x_9418_virgil_eval_json: '{"all": [{"node_absent": "integration_hub"}, {"table_gt": {"table": "sys_rest_message", "value": 0}}, {"table_gt": {"table": "sys_import_set", "value": 0}}, {"any": [{"table_gt": {"table": "sys_soap_message", "value": 0}}, {"table_gt": {"table": "sys_data_source", "value": 0}}]}]}',
    x_9418_virgil_message_template: 'Integration sprawl: REST + import sets + SOAP/JDBC all active without Integration Hub. No centralized orchestration or governance.',
    x_9418_virgil_recommendation: 'Deploy Integration Hub to centralize integration orchestration, monitoring, and error handling. Per Integration Governance principles: standardize integration intake, visualize dependencies, and align with enterprise architecture. Without centralized governance, each integration becomes an isolated technical debt item.',
    x_9418_virgil_tags: '["governance", "integration_hub", "sprawl", "orchestration"]',
    x_9418_virgil_recommended_nodes: '{"integration_hub": "integration governance"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 300,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_T2_003'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-T2-003',
    x_9418_virgil_name: 'JDBC Consolidation Opportunity \u2014 Zero Copy Candidate',
    x_9418_virgil_description: 'Instance has 5+ JDBC data sources, suggesting heavy reliance on direct database connectivity. Per Jochen Geist\'s decision tree, Zero Copy Connectors should be considered for data residency and high-volume access without duplicating data into ServiceNow.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: '5+ JDBC data sources \u2014 significant external database dependency that may benefit from Zero Copy Connectors',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sys_data_source", "value": 5}}]}',
    x_9418_virgil_message_template: '{sys_data_source_count} JDBC data sources. Heavy external DB dependency \u2014 evaluate Zero Copy Connectors to reduce replication overhead.',
    x_9418_virgil_recommendation: 'Evaluate Zero Copy Connectors (ZCC) for supported databases (SQL Server, Oracle, MySQL, PostgreSQL, Snowflake, SAP HANA, Redshift, BigQuery, Databricks). ZCC provides read access to external data without replication, reducing data staleness and platform load. Per the decision tree: Zero Copy is preferred when data residency, compliance, or volume constraints apply.',
    x_9418_virgil_tags: '["zero_copy", "jdbc", "data_residency", "consolidation", "fallback"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 310,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_T2_004'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-T2-004',
    x_9418_virgil_name: 'Polling Pattern Detected \u2014 Event-Driven Architecture Opportunity',
    x_9418_virgil_description: 'Instance has very high scheduled script count combined with high import set volume, suggesting batch/polling integration patterns. Per Jochen Geist\'s decision tree, event-driven architecture (Stream Connect, webhooks, Flow Designer triggers) should replace polling for real-time requirements.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: '100+ scheduled scripts AND 100+ import sets \u2014 strong signal of batch/polling integration architecture',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sysauto_script", "value": 100}}, {"table_gt": {"table": "sys_import_set", "value": 100}}]}',
    x_9418_virgil_message_template: '{sysauto_script_count} scheduled scripts + {sys_import_set_count} import sets. Polling/batch architecture \u2014 evaluate Stream Connect or event-driven patterns.',
    x_9418_virgil_recommendation: 'Replace polling-based integrations with event-driven patterns. Use Stream Connect (Apache Kafka) for high-volume real-time event streaming, or Flow Designer triggers and webhooks for lower-volume event processing. Per the decision tree: event-driven architecture provides decoupled, scalable communication that eliminates polling overhead and latency.',
    x_9418_virgil_tags: '["event_driven", "stream_connect", "polling", "batch", "modernization"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 320,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_T2_005'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-T2-005',
    x_9418_virgil_name: 'Potential Direct Table API Writes \u2014 Import Set API Preferred',
    x_9418_virgil_description: 'Instance has many REST message configurations but very few import sets or transform maps, suggesting inbound data may use direct Table API writes. Per Jochen Geist: Write operations preference is Import Set API > Scripted REST API > Direct Table API writes (Avoid).',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: '10+ REST messages but <= 3 import sets and <= 3 transform maps \u2014 inbound data likely bypasses Import Set API data quality controls',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sys_rest_message", "value": 10}}, {"table_lte": {"table": "sys_import_set", "value": 3}}, {"table_lte": {"table": "sys_transform_map", "value": 3}}]}',
    x_9418_virgil_message_template: '{sys_rest_message_count} REST messages but only {sys_import_set_count} import sets / {sys_transform_map_count} transform maps. Inbound writes may bypass Import Set data quality controls.',
    x_9418_virgil_recommendation: 'Use Import Set API with transform maps for all inbound data writes. Import Sets provide staging, validation, coalescing, and rollback capabilities. Direct Table API writes bypass these controls and risk data corruption. Per the Integration Design methodology: "Import Set API > Direct Table API writes."',
    x_9418_virgil_tags: '["data_persistence", "import_set", "table_api", "data_quality", "anti_pattern"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 330,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_T2_006'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-T2-006',
    x_9418_virgil_name: 'Scripted REST API Proliferation \u2014 Governance Risk',
    x_9418_virgil_description: 'Instance has many custom Scripted REST API operations, expanding the API surface area without standardized governance. Per Jochen Geist\'s governance framework: establish platform-wide standards and document integrations.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: '10+ scripted REST API operations \u2014 significant custom API surface area requiring governance',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "sys_ws_operation", "value": 10}}]}',
    x_9418_virgil_message_template: '{sys_ws_operation_count} custom Scripted REST API operations. Significant API surface area \u2014 establish governance and consolidation roadmap.',
    x_9418_virgil_recommendation: 'Audit custom Scripted REST APIs for consolidation and governance. Each custom API operation adds to the maintenance burden, security surface, and upgrade risk. Consider whether Integration Hub or standard Table/Import Set APIs could replace custom endpoints. Document all custom APIs and establish an integration intake process.',
    x_9418_virgil_tags: '["governance", "custom_api", "scripted_rest", "security", "documentation"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 340,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_INT_T2_007'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'INT-T2-007',
    x_9418_virgil_name: 'Integration Hub Present But Custom Scripts Dominate',
    x_9418_virgil_description: 'Integration Hub is installed but custom REST messages significantly outnumber IHub flows, indicating the OOTB-first investment is underutilized. Per Jochen Geist: "Reduced development time, lower maintenance burden, automatic updates, proven reliability" are the benefits of leveraging IHub spokes.',
    x_9418_virgil_source: 'integration',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'integration_pattern',
    x_9418_virgil_condition_desc: 'Integration Hub active but custom REST messages > 2x IHub flows \u2014 IHub investment underutilized',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "integration_hub"}, {"table_gt": {"table": "sys_rest_message", "value": 10}}, {"table_ratio_below": {"table": "sys_hub_flow", "other": "sys_rest_message", "ratio": 0.5}}]}',
    x_9418_virgil_message_template: 'Integration Hub active but {sys_rest_message_count} custom REST messages vs {sys_hub_flow_count} IHub flows. Custom scripts dominate \u2014 check available spokes.',
    x_9418_virgil_recommendation: 'Review custom REST integrations for IHub spoke replacements. ServiceNow maintains hundreds of pre-built spokes with automatic updates, built-in error handling, and connection management. Migrating custom integrations to spokes reduces maintenance burden and unlocks Integration Hub governance capabilities (monitoring, retry policies, execution history).',
    x_9418_virgil_tags: '["integration_hub", "ootb_first", "spokes", "modernization", "roi"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 350,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_HEALTH_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'HEALTH-001',
    x_9418_virgil_name: 'CMDB Not Populated by Automated Discovery',
    x_9418_virgil_description: 'CMDB has records but no Discovery or Service Mapping activity detected.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'health',
    x_9418_virgil_condition_desc: 'cmdb_ci has records but discovery_status table is empty or Discovery plugin is inactive',
    x_9418_virgil_eval_json: '{"all": [{"cmdb_gt": {"field": "total_cis", "value": 0}}, {"node_absent": "discovery"}]}',
    x_9418_virgil_message_template: 'CMDB has {total_cis} CIs but no automated Discovery. Data staleness risk.',
    x_9418_virgil_recommendation: 'CMDB data maintained manually becomes stale quickly. Enable Discovery and Service Mapping for automated population and ongoing maintenance.',
    x_9418_virgil_tags: '["cmdb", "discovery", "data_quality"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 360,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_HEALTH_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'HEALTH-002',
    x_9418_virgil_name: 'Customer Portal Connected to ITSM Directly',
    x_9418_virgil_description: 'Public-facing Customer Portal creates records in internal ITSM tables.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'critical',
    x_9418_virgil_category: 'health',
    x_9418_virgil_condition_desc: 'Customer Portal has catalog items or forms that create incident or sc_request records directly instead of CSM cases',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "csm"}, {"table_gt": {"table": "incident", "value": 0}}, {"table_lte": {"table": "sn_customerservice_case", "value": 0}}]}',
    x_9418_virgil_message_template: 'Customer Service plugin installed but no CSM cases \u2014 customers may be routed to ITSM directly.',
    x_9418_virgil_recommendation: 'Public/customer-facing requests should flow through CSM (Customer Service Management), not directly into ITSM. ITSM is for internal IT operations. CSM provides customer context, SLA management, and proper segregation.',
    x_9418_virgil_tags: '["segregation", "csm", "itsm", "portal", "anti_pattern"]',
    x_9418_virgil_recommended_nodes: '{"csm": "customer segregation", "case_mgmt": "customer cases"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 370,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_HEALTH_003'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'HEALTH-003',
    x_9418_virgil_name: 'Domain Separation Not Enabled',
    x_9418_virgil_description: 'Domain separation is not enabled. Multi-tenant or multi-BU instances require domain separation to enforce data isolation.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'high',
    x_9418_virgil_category: 'health',
    x_9418_virgil_condition_desc: 'glide.sys.domain.enabled property is not set to true',
    x_9418_virgil_eval_json: '{"all": [{"property_neq": {"property": "glide.sys.domain.enabled", "value": "true"}}]}',
    x_9418_virgil_message_template: 'Domain separation is not enabled. Data isolation between business units is not enforced.',
    x_9418_virgil_recommendation: 'Enable domain separation for multi-tenant environments to enforce data isolation between business units. Without it, data leakage across tenants is a significant risk.',
    x_9418_virgil_tags: '["domain_separation", "multi_tenant", "security"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 380,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_HEALTH_004'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'HEALTH-004',
    x_9418_virgil_name: 'No Agent Workspace \u2014 ITSM Agents on Classic UI',
    x_9418_virgil_description: 'Instance has active ITSM with significant ticket volume but agents use legacy list/form UI instead of Agent Workspace.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'health',
    x_9418_virgil_condition_desc: 'ITSM active with 500+ incidents but Agent Workspace not installed \u2014 agents processing significant volume without modern workspace',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "itsm"}, {"node_absent": "workspace"}, {"table_gt": {"table": "incident", "value": 500}}]}',
    x_9418_virgil_message_template: 'ITSM active with {incident_count} incidents but no Agent Workspace. Agents on classic UI.',
    x_9418_virgil_recommendation: 'Migrate agents to Agent Workspace for improved productivity. With {incident_count} incidents processed through classic UI, agents miss contextual side panels, AI-assisted resolution, and multi-tab workflows. Workspace is ServiceNow\'s strategic direction for agent experience.',
    x_9418_virgil_tags: '["workspace", "agent_experience", "modernization"]',
    x_9418_virgil_recommended_nodes: '{"workspace": "agent experience"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 390,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_HEALTH_005'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'HEALTH-005',
    x_9418_virgil_name: 'Legacy Workflow Engine Still Active',
    x_9418_virgil_description: 'Legacy Workflow Engine has active workflows that should be on Flow Designer.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'health',
    x_9418_virgil_condition_desc: 'wf_workflow table has active workflows created in the last 12 months',
    x_9418_virgil_eval_json: '{"all": [{"table_gt": {"table": "wf_workflow", "value": 10}}]}',
    x_9418_virgil_message_template: '{wf_workflow_count} legacy workflows still active. Flow Designer is the strategic direction.',
    x_9418_virgil_recommendation: 'New automation should use Flow Designer, not Legacy Workflow. Plan migration of active legacy workflows to Flow Designer for better maintainability and access to Integration Hub capabilities.',
    x_9418_virgil_tags: '["workflow", "flow_designer", "modernization", "technical_debt"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 400,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-001',
    x_9418_virgil_name: 'Incident Without Problem Management',
    x_9418_virgil_description: 'Incident Management is active but Problem Management is not used. The D2C value stream requires a root cause analysis loop.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'Incident table has records but Problem plugin is inactive or problem table has zero records',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "incident"}, {"node_absent": "problem"}]}',
    x_9418_virgil_message_template: 'Incident Management is active but Problem Management is not in use. No root cause analysis loop.',
    x_9418_virgil_recommendation: 'Enable Problem Management to close the reactive-to-proactive loop. Without root cause analysis, the same incidents recur. Problem Management is included in the ITSM license at no additional cost.',
    x_9418_virgil_tags: '["D2C", "itsm", "incident", "problem", "maturity"]',
    x_9418_virgil_recommended_nodes: '{"problem": "D2C root cause analysis"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 410,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-002',
    x_9418_virgil_name: 'ITSM Without Knowledge Management',
    x_9418_virgil_description: 'ITSM is active but Knowledge Base has fewer than 10 articles. Knowledge deflection is the highest-ROI self-service investment.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'ITSM plugins active and incident table has records, but Knowledge plugin is inactive or kb_knowledge has < 10 articles',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "itsm"}, {"any": [{"node_absent": "knowledge_base"}, {"table_between": {"table": "kb_knowledge", "min": 0, "below": 10}}]}]}',
    x_9418_virgil_message_template: 'ITSM is active but Knowledge Base has only {kb_knowledge_count} articles. Self-service deflection opportunity missed.',
    x_9418_virgil_recommendation: 'Build a Knowledge Base from resolved incidents. ServiceNow\'s Knowledge Management allows agents to create KB articles during incident resolution. Even 50 well-written articles can deflect 15-20% of ticket volume.',
    x_9418_virgil_tags: '["R2F", "D2C", "knowledge", "self_service", "deflection"]',
    x_9418_virgil_recommended_nodes: '{"knowledge_base": "R2F self-resolution"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 420,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_003'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-003',
    x_9418_virgil_name: 'Service Catalog Without Virtual Agent',
    x_9418_virgil_description: 'Service Catalog is active but Virtual Agent is not installed. VA provides conversational self-service for common requests.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'Service Catalog plugin is active and sc_cat_item has records, but Virtual Agent (com.glide.cs.chatbot) is not installed',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "service_catalog"}, {"node_absent": "virtual_agent"}]}',
    x_9418_virgil_message_template: 'Service Catalog is active but Virtual Agent is not installed. Conversational self-service not available.',
    x_9418_virgil_recommendation: 'Deploy Virtual Agent to guide users to the right catalog items conversationally. VA integrates with Service Catalog and Knowledge Base to deflect common requests before they become tickets.',
    x_9418_virgil_tags: '["R2F", "virtual_agent", "self_service", "catalog"]',
    x_9418_virgil_recommended_nodes: '{"virtual_agent": "R2F conversational self-service"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 430,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_004'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-004',
    x_9418_virgil_name: 'HRSD Without Employee Center',
    x_9418_virgil_description: 'HR Service Delivery is installed but Employee Center is not. Employees lack a unified portal for HR services.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'HRSD plugin (com.sn_hr_core) is installed but Employee Center (com.sn_employee_center) is not installed',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "hrsd"}, {"node_absent": "employee_center"}]}',
    x_9418_virgil_message_template: 'HRSD is installed but Employee Center is not. Employees lack a unified, personalized portal for HR services.',
    x_9418_virgil_recommendation: 'Deploy Employee Center to give employees a single front door for HR services, knowledge, and cases. Employee Center is ServiceNow\'s strategic replacement for Service Portal in HR workflows and provides personalized, department-specific content delivery.',
    x_9418_virgil_tags: '["R2F", "hrsd", "employee_center", "portal", "self_service"]',
    x_9418_virgil_recommended_nodes: '{"employee_center": "R2F employee self-service"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 440,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_005'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-005',
    x_9418_virgil_name: 'CSM Without Dedicated Customer Portal',
    x_9418_virgil_description: 'Customer Service Management is installed but no portal is configured for external customer self-service.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'CSM plugin (com.sn_customerservice) is installed but Service Portal (com.glide.service-portal) is not installed',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "csm"}, {"node_absent": "customer_portal"}]}',
    x_9418_virgil_message_template: 'CSM is installed but no Customer Portal for customer self-service. Cases can only be created by agents.',
    x_9418_virgil_recommendation: 'Deploy a Customer Portal (via Service Portal) to provide external customers with self-service case management, knowledge search, and request tracking. Without a portal, CSM cases can only be created by agents, losing the deflection benefits.',
    x_9418_virgil_tags: '["R2F", "csm", "customer_portal", "self_service"]',
    x_9418_virgil_recommended_nodes: '{"customer_portal": "R2F customer self-service"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 450,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_006'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-006',
    x_9418_virgil_name: 'Discovery Without Service Mapping',
    x_9418_virgil_description: 'Discovery is active but Service Mapping is not. Infrastructure CIs are discovered but service context is missing.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'Discovery plugin (com.snc.discovery) is installed but Service Mapping (com.snc.service_mapping) is not installed',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "discovery"}, {"node_absent": "service_mapping"}]}',
    x_9418_virgil_message_template: 'Discovery is active but Service Mapping is not. Infrastructure CIs are discovered but service-level topology is missing.',
    x_9418_virgil_recommendation: 'Add Service Mapping to Discovery to build application-level service maps. Discovery finds individual CIs but Service Mapping connects them into business services, enabling impact analysis during incidents and changes.',
    x_9418_virgil_tags: '["D2C", "R2D", "discovery", "service_mapping", "cmdb"]',
    x_9418_virgil_recommended_nodes: '{"service_mapping": "D2C service topology"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 460,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_007'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-007',
    x_9418_virgil_name: 'CMDB Without Asset Management',
    x_9418_virgil_description: 'CMDB is populated but Asset Management is not active. No lifecycle tracking for hardware and software assets.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'cmdb_ci has records but Asset Management plugin (com.snc.asset_management) is not installed',
    x_9418_virgil_eval_json: '{"all": [{"cmdb_gt": {"field": "total_cis", "value": 0}}, {"node_absent": "asset"}]}',
    x_9418_virgil_message_template: 'CMDB has {total_cis} CIs but Asset Management is not active. No lifecycle tracking for hardware and software assets.',
    x_9418_virgil_recommendation: 'Enable IT Asset Management (ITAM) to track asset lifecycle \u2014 procurement, deployment, maintenance, and retirement. CMDB tells you what you have; ITAM tells you what it costs and when to replace it. HAM and SAM provide hardware and software license compliance.',
    x_9418_virgil_tags: '["R2D", "D2C", "cmdb", "asset", "lifecycle"]',
    x_9418_virgil_recommended_nodes: '{"asset": "R2D asset lifecycle"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 470,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_008'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-008',
    x_9418_virgil_name: 'Security Incident Response Without Vulnerability Response',
    x_9418_virgil_description: 'SIR is installed but Vulnerability Response is not. Reactive-only security posture without proactive vulnerability management.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'Security Incident Response plugin (com.snc.sec_inc_response) is installed but Vulnerability Response (com.snc.vul_response) is not',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "sec_incident"}, {"node_absent": "vuln_response"}]}',
    x_9418_virgil_message_template: 'Security Incident Response is active but Vulnerability Response is not. Reactive-only security posture.',
    x_9418_virgil_recommendation: 'Add Vulnerability Response to shift from reactive (incident-only) to proactive security operations. VR integrates with scanners (Qualys, Tenable, Rapid7) to prioritize and track vulnerability remediation before exploitation.',
    x_9418_virgil_tags: '["D2C", "secops", "vulnerability", "proactive"]',
    x_9418_virgil_recommended_nodes: '{"vuln_response": "D2C proactive security"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 480,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_ADOPT_009'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'ADOPT-009',
    x_9418_virgil_name: 'SPM Without GRC',
    x_9418_virgil_description: 'Strategic Portfolio Management is active but GRC is not. Portfolio decisions lack governance and risk oversight.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'adoption_maturity',
    x_9418_virgil_condition_desc: 'SPM/ITBM plugin (com.snc.project_management) is installed but GRC plugins (com.sn_compliance, com.sn_risk) are not installed',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "spm"}, {"node_absent": "grc"}]}',
    x_9418_virgil_message_template: 'SPM is active but GRC is not. Portfolio decisions lack governance oversight.',
    x_9418_virgil_recommendation: 'Add Integrated Risk Management (GRC) alongside SPM to incorporate risk assessments and compliance requirements into portfolio decisions. This ensures investment priorities account for regulatory obligations.',
    x_9418_virgil_tags: '["S2P", "spm", "grc", "governance"]',
    x_9418_virgil_recommended_nodes: '{"grc": "S2P governance", "policy_compliance": "S2P compliance"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 490,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_SEC_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'SEC-001',
    x_9418_virgil_name: 'No SecOps on Instance With Sensitive Data',
    x_9418_virgil_description: 'Instance processes sensitive data (ITSM/CSM/HRSD) but has no Security Operations capability for threat detection and response.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'medium',
    x_9418_virgil_category: 'security',
    x_9418_virgil_condition_desc: 'Instance has ITSM, CSM, or HRSD active (processing PII/sensitive data) but neither Security Incident Response nor Vulnerability Response is installed',
    x_9418_virgil_eval_json: '{"all": [{"any": [{"node_active": "itsm"}, {"node_active": "csm"}, {"node_active": "hrsd"}]}, {"node_absent": "secops"}]}',
    x_9418_virgil_message_template: 'Instance processes sensitive data (ITSM/CSM/HRSD) but has no Security Operations capability.',
    x_9418_virgil_recommendation: 'Consider Security Operations (SecOps) to protect the ServiceNow instance and its data. SIR provides security incident workflows, and VR enables proactive vulnerability management. Both integrate with SIEM/SOAR tools.',
    x_9418_virgil_tags: '["security", "secops", "data_protection"]',
    x_9418_virgil_recommended_nodes: '{"secops": "security operations", "sec_incident": "security incident response"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 500,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_EFF_001'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'EFF-001',
    x_9418_virgil_name: 'Potential Shelfware \u2014 HRSD Installed But No HR Cases',
    x_9418_virgil_description: 'HR Service Delivery plugin is installed but hr_core_case table has zero records. License may be underutilized.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'efficiency',
    x_9418_virgil_condition_desc: 'HRSD plugin (com.sn_hr_core) is installed but sn_hr_core_case table has zero records',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "hrsd"}, {"table_eq": {"table": "sn_hr_core_case", "value": 0}}]}',
    x_9418_virgil_message_template: 'HRSD is active but sn_hr_core_case has zero records. License may be underutilized.',
    x_9418_virgil_recommendation: 'HRSD is licensed but not producing HR cases. Either onboard HR teams to use the platform, or evaluate whether the license is needed. Unused licenses represent significant annual cost with zero ROI.',
    x_9418_virgil_tags: '["efficiency", "shelfware", "hrsd", "roi"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 510,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_EFF_002'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'EFF-002',
    x_9418_virgil_name: 'Potential Shelfware \u2014 CSM Installed But No Cases',
    x_9418_virgil_description: 'Customer Service Management plugin is installed but case table has zero records. License may be underutilized.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'efficiency',
    x_9418_virgil_condition_desc: 'CSM plugin (com.sn_customerservice) is installed but sn_customerservice_case table has zero records',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "csm"}, {"table_eq": {"table": "sn_customerservice_case", "value": 0}}]}',
    x_9418_virgil_message_template: 'CSM is active but sn_customerservice_case has zero records. License may be underutilized.',
    x_9418_virgil_recommendation: 'CSM is licensed but not producing customer cases. Either complete the CSM implementation (portal, assignment rules, SLAs) or evaluate whether the license is still needed.',
    x_9418_virgil_tags: '["efficiency", "shelfware", "csm", "roi"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 520,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_EFF_003'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'EFF-003',
    x_9418_virgil_name: 'Potential Shelfware \u2014 SecOps Installed But No Incidents',
    x_9418_virgil_description: 'Security Incident Response plugin is installed but SIR table has zero records. Security automation not operational.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'efficiency',
    x_9418_virgil_condition_desc: 'SIR plugin (com.snc.sec_inc_response) is installed but sn_si_incident table has zero records',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "sec_incident"}, {"table_eq": {"table": "sn_si_incident", "value": 0}}]}',
    x_9418_virgil_message_template: 'Security Incident Response is active but sn_si_incident has zero records. SIEM integration not connected.',
    x_9418_virgil_recommendation: 'Security Incident Response is licensed but not ingesting security events. Connect SIR to your SIEM (Splunk, Sentinel, etc.) to automate security incident creation and response workflows.',
    x_9418_virgil_tags: '["efficiency", "shelfware", "secops", "siem"]',
    x_9418_virgil_recommended_nodes: '{}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 530,
  },
})

Record({
  $id: Now.ID['seed_minos_rule_EFF_004'],
  table: 'x_9418_virgil_minos_rule',
  data: {
    x_9418_virgil_rule_id: 'EFF-004',
    x_9418_virgil_name: 'Flow Designer Underutilized',
    x_9418_virgil_description: 'Flow Designer is installed but has fewer flows than legacy workflows. Modern automation capabilities are underutilized.',
    x_9418_virgil_source: 'best_practice',
    x_9418_virgil_severity: 'low',
    x_9418_virgil_category: 'efficiency',
    x_9418_virgil_condition_desc: 'Flow Designer plugin is active but sys_hub_flow count is less than half of wf_workflow count',
    x_9418_virgil_eval_json: '{"all": [{"node_active": "flow_designer"}, {"table_gt": {"table": "sys_hub_flow", "value": 0}}, {"table_gt": {"table": "wf_workflow", "value": 0}}, {"table_ratio_below": {"table": "sys_hub_flow", "other": "wf_workflow", "ratio": 0.5}}]}',
    x_9418_virgil_message_template: 'Flow Designer has {sys_hub_flow_count} flows vs {wf_workflow_count} legacy workflows. Modern automation underutilized.',
    x_9418_virgil_recommendation: 'Prioritize new automations in Flow Designer over Legacy Workflow. Flow Designer supports Integration Hub actions, error policies, and parallel execution. Plan a migration roadmap for legacy workflows starting with the most frequently triggered ones.',
    x_9418_virgil_tags: '["efficiency", "flow_designer", "workflow", "modernization"]',
    x_9418_virgil_recommended_nodes: '{"flow_designer": "modern automation"}',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 540,
  },
})

// =============================================================================
// ONTOLOGY NODES (x_9418_virgil_ontology_node) — 40 records
// =============================================================================

Record({
  $id: Now.ID['seed_ontology_node_platform'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'platform',
    x_9418_virgil_name: 'ServiceNow Platform',
    x_9418_virgil_node_type: 'platform',
    x_9418_virgil_aliases: '["Platform", "Now Platform", "ServiceNow"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'platform',
    x_9418_virgil_it4it_streams: '["S2P", "R2D", "R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 100,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_cmdb'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'cmdb',
    x_9418_virgil_name: 'CMDB',
    x_9418_virgil_node_type: 'data',
    x_9418_virgil_aliases: '["Configuration Management Database", "CMDB", "Configuration Management"]',
    x_9418_virgil_tables: '["cmdb_ci", "cmdb_ci_server", "cmdb_ci_service", "cmdb_ci_app_server", "cmdb_ci_database", "cmdb_ci_hardware", "cmdb_ci_netgear", "cmdb_ci_vm", "cmdb_ci_linux_server", "cmdb_ci_win_server"]',
    x_9418_virgil_plugins: '["com.snc.cmdb"]',
    x_9418_virgil_layer: 'data',
    x_9418_virgil_it4it_streams: '["R2D", "R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 110,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_user_mgmt'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'user_mgmt',
    x_9418_virgil_name: 'User Management',
    x_9418_virgil_node_type: 'data',
    x_9418_virgil_aliases: '["User Management", "Users", "Authentication", "Identity"]',
    x_9418_virgil_tables: '["sys_user", "sys_user_group", "sys_user_role", "sys_user_has_role", "sys_user_grmember"]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'data',
    x_9418_virgil_it4it_streams: '["R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 120,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_knowledge_base'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'knowledge_base',
    x_9418_virgil_name: 'Knowledge Base',
    x_9418_virgil_node_type: 'data',
    x_9418_virgil_aliases: '["Knowledge Base", "KB", "Knowledge Management", "Knowledge"]',
    x_9418_virgil_tables: '["kb_knowledge", "kb_knowledge_base", "kb_category", "kb_use"]',
    x_9418_virgil_plugins: '["com.glideapp.knowledge"]',
    x_9418_virgil_layer: 'data',
    x_9418_virgil_it4it_streams: '["R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 130,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_audit'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'audit',
    x_9418_virgil_name: 'Audit Logging',
    x_9418_virgil_node_type: 'data',
    x_9418_virgil_aliases: '["Audit", "Audit Logs", "System Logs"]',
    x_9418_virgil_tables: '["sys_audit", "sys_audit_delete", "syslog"]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'data',
    x_9418_virgil_it4it_streams: '["S2P", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 140,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_task'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'task',
    x_9418_virgil_name: 'Task',
    x_9418_virgil_node_type: 'table',
    x_9418_virgil_aliases: '["Task", "Work Item"]',
    x_9418_virgil_tables: '["task"]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'data',
    x_9418_virgil_it4it_streams: '[]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 150,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_itsm'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'itsm',
    x_9418_virgil_name: 'ITSM',
    x_9418_virgil_node_type: 'product',
    x_9418_virgil_aliases: '["IT Service Management", "ITSM", "IT Service"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '["com.snc.itsm", "com.snc.itsm.workspace"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 160,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_incident'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'incident',
    x_9418_virgil_name: 'Incident Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Incident", "Incident Management"]',
    x_9418_virgil_tables: '["incident", "incident_task"]',
    x_9418_virgil_plugins: '["com.snc.incident"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 170,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_problem'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'problem',
    x_9418_virgil_name: 'Problem Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Problem", "Problem Management"]',
    x_9418_virgil_tables: '["problem", "problem_task"]',
    x_9418_virgil_plugins: '["com.snc.problem"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 180,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_change'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'change',
    x_9418_virgil_name: 'Change Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Change", "Change Management", "Change Request"]',
    x_9418_virgil_tables: '["change_request", "change_task"]',
    x_9418_virgil_plugins: '["com.snc.change_management", "com.snc.change_management.standard_change_catalog"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2D"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 190,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_service_catalog'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'service_catalog',
    x_9418_virgil_name: 'Service Catalog',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Service Catalog", "Catalog", "Request Management"]',
    x_9418_virgil_tables: '["sc_catalog", "sc_cat_item", "sc_request", "sc_req_item", "sc_task"]',
    x_9418_virgil_plugins: '["com.glideapp.servicecatalog"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 200,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_asset'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'asset',
    x_9418_virgil_name: 'Asset Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Asset", "Asset Management", "IT Asset Management", "ITAM", "HAM", "SAM"]',
    x_9418_virgil_tables: '["alm_asset", "alm_hardware", "alm_license"]',
    x_9418_virgil_plugins: '["com.snc.asset_management", "com.snc.ham", "com.snc.sam"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2D", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 210,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_csm'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'csm',
    x_9418_virgil_name: 'CSM',
    x_9418_virgil_node_type: 'product',
    x_9418_virgil_aliases: '["Customer Service Management", "CSM", "Customer Service"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '["com.sn_customerservice"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 220,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_case_mgmt'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'case_mgmt',
    x_9418_virgil_name: 'Case Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Case Management", "Case", "CSM Case"]',
    x_9418_virgil_tables: '["sn_customerservice_case", "sn_customerservice_task"]',
    x_9418_virgil_plugins: '["com.sn_customerservice"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 230,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_customer_accounts'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'customer_accounts',
    x_9418_virgil_name: 'Customer Accounts',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Customer Accounts", "CSM Accounts"]',
    x_9418_virgil_tables: '["customer_account", "customer_contact", "csm_consumer"]',
    x_9418_virgil_plugins: '["com.sn_customerservice"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 240,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_hrsd'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'hrsd',
    x_9418_virgil_name: 'HR Service Delivery',
    x_9418_virgil_node_type: 'product',
    x_9418_virgil_aliases: '["HRSD", "HR Service Delivery", "HR", "Human Resources"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '["com.sn_hr_core"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 250,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_hr_case'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'hr_case',
    x_9418_virgil_name: 'HR Case Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["HR Case", "HR Case Management"]',
    x_9418_virgil_tables: '["sn_hr_core_case", "sn_hr_core_task"]',
    x_9418_virgil_plugins: '["com.sn_hr_core"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 260,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_itom'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'itom',
    x_9418_virgil_name: 'ITOM',
    x_9418_virgil_node_type: 'product',
    x_9418_virgil_aliases: '["IT Operations Management", "ITOM"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 270,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_discovery'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'discovery',
    x_9418_virgil_name: 'Discovery',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Discovery", "Network Discovery"]',
    x_9418_virgil_tables: '["discovery_status"]',
    x_9418_virgil_plugins: '["com.snc.discovery", "com.snc.itom.discovery"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 280,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_service_mapping'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'service_mapping',
    x_9418_virgil_name: 'Service Mapping',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Service Mapping"]',
    x_9418_virgil_tables: '["svc_ci_assoc"]',
    x_9418_virgil_plugins: '["com.snc.service_mapping", "com.snc.service-mapping"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 290,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_event_mgmt'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'event_mgmt',
    x_9418_virgil_name: 'Event Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Event Management", "Event"]',
    x_9418_virgil_tables: '["em_event", "em_alert"]',
    x_9418_virgil_plugins: '["com.glide.itom.em"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 300,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_secops'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'secops',
    x_9418_virgil_name: 'Security Operations',
    x_9418_virgil_node_type: 'product',
    x_9418_virgil_aliases: '["SecOps", "Security Operations"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 310,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_sec_incident'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'sec_incident',
    x_9418_virgil_name: 'Security Incident Response',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Security Incident", "SIR"]',
    x_9418_virgil_tables: '["sn_si_incident", "sn_si_task"]',
    x_9418_virgil_plugins: '["com.snc.sec_inc_response"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 320,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_vuln_response'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'vuln_response',
    x_9418_virgil_name: 'Vulnerability Response',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Vulnerability Response", "VR"]',
    x_9418_virgil_tables: '["sn_vul_vulnerability", "sn_vul_entry"]',
    x_9418_virgil_plugins: '["com.snc.vul_response"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 330,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_grc'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'grc',
    x_9418_virgil_name: 'GRC',
    x_9418_virgil_node_type: 'product',
    x_9418_virgil_aliases: '["Governance Risk Compliance", "GRC", "Risk Management", "Integrated Risk Management", "IRM"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '["com.sn_grc", "com.sn_audit"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["S2P"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 340,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_policy_compliance'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'policy_compliance',
    x_9418_virgil_name: 'Policy and Compliance',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Policy", "Compliance"]',
    x_9418_virgil_tables: '["sn_compliance_policy", "sn_compliance_policy_statement"]',
    x_9418_virgil_plugins: '["com.sn_compliance"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["S2P"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 350,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_risk_mgmt'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'risk_mgmt',
    x_9418_virgil_name: 'Risk Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["Risk"]',
    x_9418_virgil_tables: '["sn_risk_risk", "sn_risk_definition"]',
    x_9418_virgil_plugins: '["com.sn_risk"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["S2P"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 360,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_spm'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'spm',
    x_9418_virgil_name: 'Strategic Portfolio Management',
    x_9418_virgil_node_type: 'product',
    x_9418_virgil_aliases: '["SPM", "ITBM", "IT Business Management", "Portfolio Management"]',
    x_9418_virgil_tables: '["pm_project", "pm_portfolio", "planned_task"]',
    x_9418_virgil_plugins: '["com.snc.it_business_management", "com.snc.financial_planning_pmo", "com.snc.alignment", "com.snc.sdlc"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["S2P"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 370,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_ppm'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'ppm',
    x_9418_virgil_name: 'Project Portfolio Management',
    x_9418_virgil_node_type: 'module',
    x_9418_virgil_aliases: '["PPM", "Project Management"]',
    x_9418_virgil_tables: '["pm_project", "pm_portfolio", "pm_project_task", "pm_program"]',
    x_9418_virgil_plugins: '["com.snc.project_management", "com.snc.it_business_management"]',
    x_9418_virgil_layer: 'application',
    x_9418_virgil_it4it_streams: '["S2P"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 380,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_integration_hub'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'integration_hub',
    x_9418_virgil_name: 'Integration Hub',
    x_9418_virgil_node_type: 'orchestration',
    x_9418_virgil_aliases: '["Integration Hub", "IntegrationHub", "Spokes"]',
    x_9418_virgil_tables: '["sys_hub_flow", "sys_hub_action_type_definition"]',
    x_9418_virgil_plugins: '["com.glide.hub.integration_hub"]',
    x_9418_virgil_layer: 'orchestration',
    x_9418_virgil_it4it_streams: '["R2D", "R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 390,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_flow_designer'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'flow_designer',
    x_9418_virgil_name: 'Flow Designer',
    x_9418_virgil_node_type: 'orchestration',
    x_9418_virgil_aliases: '["Flow Designer", "Flows", "Subflows"]',
    x_9418_virgil_tables: '["sys_hub_flow"]',
    x_9418_virgil_plugins: '["com.glide.hub.flow_designer"]',
    x_9418_virgil_layer: 'orchestration',
    x_9418_virgil_it4it_streams: '["R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 400,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_workflow'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'workflow',
    x_9418_virgil_name: 'Workflow Engine',
    x_9418_virgil_node_type: 'orchestration',
    x_9418_virgil_aliases: '["Workflow", "Workflow Engine", "Legacy Workflow"]',
    x_9418_virgil_tables: '["wf_workflow", "wf_workflow_version", "wf_activity"]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'orchestration',
    x_9418_virgil_it4it_streams: '["R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 410,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_virtual_agent'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'virtual_agent',
    x_9418_virgil_name: 'Virtual Agent',
    x_9418_virgil_node_type: 'orchestration',
    x_9418_virgil_aliases: '["Virtual Agent", "VA", "Chatbot"]',
    x_9418_virgil_tables: '["cb_topic", "cb_topic_goal"]',
    x_9418_virgil_plugins: '["com.glide.cs.chatbot"]',
    x_9418_virgil_layer: 'orchestration',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 420,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_notifications'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'notifications',
    x_9418_virgil_name: 'Notifications',
    x_9418_virgil_node_type: 'orchestration',
    x_9418_virgil_aliases: '["Notifications", "Email", "Push Notifications"]',
    x_9418_virgil_tables: '["sysevent_email_action", "sys_email"]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'orchestration',
    x_9418_virgil_it4it_streams: '["R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 430,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_service_portal'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'service_portal',
    x_9418_virgil_name: 'Service Portal',
    x_9418_virgil_node_type: 'ui',
    x_9418_virgil_aliases: '["Service Portal", "Employee Portal", "Internal Portal", "SP"]',
    x_9418_virgil_tables: '["sp_portal", "sp_page", "sp_widget"]',
    x_9418_virgil_plugins: '["com.glide.service-portal"]',
    x_9418_virgil_layer: 'ui',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 440,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_customer_portal'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'customer_portal',
    x_9418_virgil_name: 'Customer Portal',
    x_9418_virgil_node_type: 'ui',
    x_9418_virgil_aliases: '["Customer Portal", "Customer Service Portal", "Public Portal", "CSP"]',
    x_9418_virgil_tables: '["sp_portal"]',
    x_9418_virgil_plugins: '["com.sn_customerservice"]',
    x_9418_virgil_layer: 'ui',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 450,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_employee_center'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'employee_center',
    x_9418_virgil_name: 'Employee Center',
    x_9418_virgil_node_type: 'ui',
    x_9418_virgil_aliases: '["Employee Center", "EC"]',
    x_9418_virgil_tables: '["sn_ec_content", "sn_ec_taxonomy_topic"]',
    x_9418_virgil_plugins: '["com.sn_employee_center"]',
    x_9418_virgil_layer: 'ui',
    x_9418_virgil_it4it_streams: '["R2F"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 460,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_now_mobile'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'now_mobile',
    x_9418_virgil_name: 'Now Mobile',
    x_9418_virgil_node_type: 'ui',
    x_9418_virgil_aliases: '["Now Mobile", "Mobile", "Mobile App"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'ui',
    x_9418_virgil_it4it_streams: '["R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 470,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_workspace'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'workspace',
    x_9418_virgil_name: 'Agent Workspace',
    x_9418_virgil_node_type: 'ui',
    x_9418_virgil_aliases: '["Agent Workspace", "Workspace", "CSM Workspace", "ITSM Workspace"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'ui',
    x_9418_virgil_it4it_streams: '["R2F", "D2C"]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 480,
  },
})

Record({
  $id: Now.ID['seed_ontology_node_external'],
  table: 'x_9418_virgil_ontology_node',
  data: {
    x_9418_virgil_node_id: 'external',
    x_9418_virgil_name: 'External Systems',
    x_9418_virgil_node_type: 'external',
    x_9418_virgil_aliases: '["External Systems", "Third Party", "External"]',
    x_9418_virgil_tables: '[]',
    x_9418_virgil_plugins: '[]',
    x_9418_virgil_layer: 'external',
    x_9418_virgil_it4it_streams: '[]',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 490,
  },
})

// =============================================================================
// ONTOLOGY EDGES (x_9418_virgil_ontology_edge) — 65 records
// =============================================================================

Record({
  $id: Now.ID['seed_ontology_edge_incident_task_extends'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'incident',
    x_9418_virgil_target_node: 'task',
    x_9418_virgil_rel_type: 'extends',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_problem_task_extends'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'problem',
    x_9418_virgil_target_node: 'task',
    x_9418_virgil_rel_type: 'extends',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_change_task_extends'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'change',
    x_9418_virgil_target_node: 'task',
    x_9418_virgil_rel_type: 'extends',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_case_mgmt_task_extends'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'case_mgmt',
    x_9418_virgil_target_node: 'task',
    x_9418_virgil_rel_type: 'extends',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_hr_case_task_extends'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'hr_case',
    x_9418_virgil_target_node: 'task',
    x_9418_virgil_rel_type: 'extends',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_sec_incident_task_extends'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'sec_incident',
    x_9418_virgil_target_node: 'task',
    x_9418_virgil_rel_type: 'extends',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_catalog_task_extends'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_catalog',
    x_9418_virgil_target_node: 'task',
    x_9418_virgil_rel_type: 'extends',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itsm_incident_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itsm',
    x_9418_virgil_target_node: 'incident',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itsm_problem_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itsm',
    x_9418_virgil_target_node: 'problem',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itsm_change_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itsm',
    x_9418_virgil_target_node: 'change',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itsm_service_catalog_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itsm',
    x_9418_virgil_target_node: 'service_catalog',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_csm_case_mgmt_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'csm',
    x_9418_virgil_target_node: 'case_mgmt',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_csm_customer_accounts_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'csm',
    x_9418_virgil_target_node: 'customer_accounts',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_hrsd_hr_case_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'hrsd',
    x_9418_virgil_target_node: 'hr_case',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itom_discovery_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itom',
    x_9418_virgil_target_node: 'discovery',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itom_service_mapping_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itom',
    x_9418_virgil_target_node: 'service_mapping',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itom_event_mgmt_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itom',
    x_9418_virgil_target_node: 'event_mgmt',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_secops_sec_incident_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'secops',
    x_9418_virgil_target_node: 'sec_incident',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_secops_vuln_response_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'secops',
    x_9418_virgil_target_node: 'vuln_response',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_grc_policy_compliance_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'grc',
    x_9418_virgil_target_node: 'policy_compliance',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_grc_risk_mgmt_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'grc',
    x_9418_virgil_target_node: 'risk_mgmt',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_spm_ppm_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'spm',
    x_9418_virgil_target_node: 'ppm',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itsm_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itsm',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_csm_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'csm',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_hrsd_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'hrsd',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_itom_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'itom',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_secops_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'secops',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_grc_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'grc',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_spm_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'spm',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_portal_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_portal',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_customer_portal_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'customer_portal',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_employee_center_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'employee_center',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_incident_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'incident',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_problem_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'problem',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_change_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'change',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_case_mgmt_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'case_mgmt',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_asset_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'asset',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_discovery_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'discovery',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_mapping_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_mapping',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_event_mgmt_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'event_mgmt',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_sec_incident_cmdb_references'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'sec_incident',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'references',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_incident_knowledge_base_resolves_using'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'incident',
    x_9418_virgil_target_node: 'knowledge_base',
    x_9418_virgil_rel_type: 'resolves_using',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_problem_knowledge_base_resolves_using'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'problem',
    x_9418_virgil_target_node: 'knowledge_base',
    x_9418_virgil_rel_type: 'resolves_using',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_case_mgmt_knowledge_base_resolves_using'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'case_mgmt',
    x_9418_virgil_target_node: 'knowledge_base',
    x_9418_virgil_rel_type: 'resolves_using',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_hr_case_knowledge_base_resolves_using'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'hr_case',
    x_9418_virgil_target_node: 'knowledge_base',
    x_9418_virgil_rel_type: 'resolves_using',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_portal_knowledge_base_consumes'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_portal',
    x_9418_virgil_target_node: 'knowledge_base',
    x_9418_virgil_rel_type: 'consumes',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_customer_portal_knowledge_base_consumes'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'customer_portal',
    x_9418_virgil_target_node: 'knowledge_base',
    x_9418_virgil_rel_type: 'consumes',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_employee_center_knowledge_base_consumes'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'employee_center',
    x_9418_virgil_target_node: 'knowledge_base',
    x_9418_virgil_rel_type: 'consumes',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_customer_portal_csm_creates'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'customer_portal',
    x_9418_virgil_target_node: 'csm',
    x_9418_virgil_rel_type: 'creates',
    x_9418_virgil_constraint: 'Portal creates cases in CSM',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_portal_itsm_creates'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_portal',
    x_9418_virgil_target_node: 'itsm',
    x_9418_virgil_rel_type: 'creates',
    x_9418_virgil_constraint: 'Portal creates tickets in ITSM',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_portal_service_catalog_creates'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_portal',
    x_9418_virgil_target_node: 'service_catalog',
    x_9418_virgil_rel_type: 'creates',
    x_9418_virgil_constraint: 'Portal creates catalog requests',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_employee_center_hrsd_creates'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'employee_center',
    x_9418_virgil_target_node: 'hrsd',
    x_9418_virgil_rel_type: 'creates',
    x_9418_virgil_constraint: 'Employee Center creates HR cases',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_portal_user_mgmt_authenticates_via'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_portal',
    x_9418_virgil_target_node: 'user_mgmt',
    x_9418_virgil_rel_type: 'authenticates_via',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_customer_portal_user_mgmt_authenticates_via'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'customer_portal',
    x_9418_virgil_target_node: 'user_mgmt',
    x_9418_virgil_rel_type: 'authenticates_via',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_employee_center_user_mgmt_authenticates_via'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'employee_center',
    x_9418_virgil_target_node: 'user_mgmt',
    x_9418_virgil_rel_type: 'authenticates_via',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_now_mobile_user_mgmt_authenticates_via'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'now_mobile',
    x_9418_virgil_target_node: 'user_mgmt',
    x_9418_virgil_rel_type: 'authenticates_via',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_flow_designer_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'flow_designer',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_integration_hub_platform_runs_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'integration_hub',
    x_9418_virgil_target_node: 'platform',
    x_9418_virgil_rel_type: 'runs_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_flow_designer_integration_hub_depends_on'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'flow_designer',
    x_9418_virgil_target_node: 'integration_hub',
    x_9418_virgil_rel_type: 'depends_on',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_integration_hub_external_creates'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'integration_hub',
    x_9418_virgil_target_node: 'external',
    x_9418_virgil_rel_type: 'creates',
    x_9418_virgil_constraint: 'Connects to external systems',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_virtual_agent_knowledge_base_consumes'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'virtual_agent',
    x_9418_virgil_target_node: 'knowledge_base',
    x_9418_virgil_rel_type: 'consumes',
    x_9418_virgil_constraint: '',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_discovery_cmdb_creates'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'discovery',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'creates',
    x_9418_virgil_constraint: 'Discovery populates CMDB',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_mapping_cmdb_creates'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_mapping',
    x_9418_virgil_target_node: 'cmdb',
    x_9418_virgil_rel_type: 'creates',
    x_9418_virgil_constraint: 'Service Mapping maps services in CMDB',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_customer_portal_itsm_segregated_from'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'customer_portal',
    x_9418_virgil_target_node: 'itsm',
    x_9418_virgil_rel_type: 'segregated_from',
    x_9418_virgil_constraint: 'Public portal must not connect to internal ITSM',
    x_9418_virgil_active: true,
  },
})

Record({
  $id: Now.ID['seed_ontology_edge_service_portal_csm_segregated_from'],
  table: 'x_9418_virgil_ontology_edge',
  data: {
    x_9418_virgil_source_node: 'service_portal',
    x_9418_virgil_target_node: 'csm',
    x_9418_virgil_rel_type: 'segregated_from',
    x_9418_virgil_constraint: 'Internal portal must not connect to external CSM',
    x_9418_virgil_active: true,
  },
})

// =============================================================================
// WDF RATE CARDS (x_9418_virgil_wdf_rate_card) — 9 records
// =============================================================================

Record({
  $id: Now.ID['seed_wdf_rate_card_integration_hub'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'integration_hub',
    x_9418_virgil_label: 'Integration Hub',
    x_9418_virgil_meter_unit: 'Data fabric transaction',
    x_9418_virgil_credits: 1,
    x_9418_virgil_pro_only: false,
    x_9418_virgil_measurable: true,
    x_9418_virgil_detect_logic: 'Counts actual outbound HTTP executions from IHub flow steps',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 100,
  },
})

Record({
  $id: Now.ID['seed_wdf_rate_card_api_access_volume'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'api_access_volume',
    x_9418_virgil_label: 'API Access Volume',
    x_9418_virgil_meter_unit: 'MB',
    x_9418_virgil_credits: 1,
    x_9418_virgil_pro_only: false,
    x_9418_virgil_measurable: true,
    x_9418_virgil_detect_logic: 'Estimates MB from sampled outbound HTTP payload sizes \u00d7 total call count',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 110,
  },
})

Record({
  $id: Now.ID['seed_wdf_rate_card_rpa_hub'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'rpa_hub',
    x_9418_virgil_label: 'RPA Bots',
    x_9418_virgil_meter_unit: 'Minute',
    x_9418_virgil_credits: 5,
    x_9418_virgil_pro_only: false,
    x_9418_virgil_measurable: true,
    x_9418_virgil_detect_logic: 'Counts actual RPA execution records for runtime minutes',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 120,
  },
})

Record({
  $id: Now.ID['seed_wdf_rate_card_zero_copy_connectors'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'zero_copy_connectors',
    x_9418_virgil_label: 'Zero Copy Connectors (SQL)',
    x_9418_virgil_meter_unit: 'MB',
    x_9418_virgil_credits: 1,
    x_9418_virgil_pro_only: true,
    x_9418_virgil_measurable: true,
    x_9418_virgil_detect_logic: 'Detects JDBC data sources and REST/IHub calls to ZCC-supported databases',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 130,
  },
})

Record({
  $id: Now.ID['seed_wdf_rate_card_zero_copy_connectors_erp'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'zero_copy_connectors_erp',
    x_9418_virgil_label: 'Zero Copy Connectors for ERP',
    x_9418_virgil_meter_unit: 'MB',
    x_9418_virgil_credits: 1,
    x_9418_virgil_pro_only: true,
    x_9418_virgil_measurable: false,
    x_9418_virgil_detect_logic: 'ZCC ERP volume is metered at the platform level',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 140,
  },
})

Record({
  $id: Now.ID['seed_wdf_rate_card_stream_connect'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'stream_connect',
    x_9418_virgil_label: 'Stream Connect for Apache Kafka',
    x_9418_virgil_meter_unit: 'MB',
    x_9418_virgil_credits: 1,
    x_9418_virgil_pro_only: true,
    x_9418_virgil_measurable: true,
    x_9418_virgil_detect_logic: 'Detects high-frequency IHub messages and batch imports as Kafka/Stream Connect indicators',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 150,
  },
})

Record({
  $id: Now.ID['seed_wdf_rate_card_data_catalog'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'data_catalog',
    x_9418_virgil_label: 'Data Catalog',
    x_9418_virgil_meter_unit: 'Data Asset',
    x_9418_virgil_credits: 1,
    x_9418_virgil_pro_only: true,
    x_9418_virgil_measurable: false,
    x_9418_virgil_detect_logic: 'Data Catalog is a new capability \u2014 asset count is not accessible via REST',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 160,
  },
})

Record({
  $id: Now.ID['seed_wdf_rate_card_ai_data_explorer'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'ai_data_explorer',
    x_9418_virgil_label: 'AI Data Explorer',
    x_9418_virgil_meter_unit: 'Exploration',
    x_9418_virgil_credits: 10,
    x_9418_virgil_pro_only: false,
    x_9418_virgil_measurable: true,
    x_9418_virgil_detect_logic: 'Detects high report count as indicator for AI Data Explorer adoption',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 170,
  },
})

Record({
  $id: Now.ID['seed_wdf_rate_card_external_content_connectors'],
  table: 'x_9418_virgil_wdf_rate_card',
  data: {
    x_9418_virgil_cap_id: 'external_content_connectors',
    x_9418_virgil_label: 'External Content Connectors',
    x_9418_virgil_meter_unit: 'Document indexed',
    x_9418_virgil_credits: 1,
    x_9418_virgil_pro_only: false,
    x_9418_virgil_measurable: false,
    x_9418_virgil_detect_logic: 'Document indexing count is not accessible via REST API',
    x_9418_virgil_active: true,
    x_9418_virgil_order: 180,
  },
})
