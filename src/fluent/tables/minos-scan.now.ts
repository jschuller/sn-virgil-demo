import { Table, StringColumn, IntegerColumn, DecimalColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_9418_virgil_minos_scan = Table({
    name: 'x_9418_virgil_minos_scan',
    label: 'Minos Scan',
    accessibleFrom: 'public',
    allowWebServiceAccess: true,
    actions: ['read', 'update', 'delete', 'create'],
    callerAccess: 'none',
    schema: {
        x_9418_virgil_scan_date: DateTimeColumn({ label: 'Scan Date' }),
        x_9418_virgil_instance_url: StringColumn({ label: 'Instance URL', maxLength: 200 }),
        x_9418_virgil_status: StringColumn({ label: 'Status', maxLength: 20 }),
        x_9418_virgil_duration_seconds: DecimalColumn({ label: 'Duration (seconds)' }),
        x_9418_virgil_plugins_scanned: IntegerColumn({ label: 'Plugins Scanned' }),
        x_9418_virgil_tables_scanned: IntegerColumn({ label: 'Tables Scanned' }),
        x_9418_virgil_active_nodes: IntegerColumn({ label: 'Active Nodes' }),
        x_9418_virgil_total_findings: IntegerColumn({ label: 'Total Findings' }),
        x_9418_virgil_recommended_additions: IntegerColumn({ label: 'Recommended Additions' }),
        x_9418_virgil_it4it_coverage: StringColumn({ label: 'IT4IT Coverage (JSON)', maxLength: 8000 }),
        x_9418_virgil_active_node_ids: StringColumn({ label: 'Active Node IDs (JSON)', maxLength: 4000 }),
        x_9418_virgil_as_is_diagram: StringColumn({ label: 'As-Is Diagram (Mermaid)', maxLength: 16000 }),
        x_9418_virgil_recommended_diagram: StringColumn({ label: 'Recommended Diagram (Mermaid)', maxLength: 16000 }),
        x_9418_virgil_instance_model: StringColumn({ label: 'Instance Model (JSON)', maxLength: 16000 }),
    },
})
