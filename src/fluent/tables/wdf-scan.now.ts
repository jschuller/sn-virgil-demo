import { Table, StringColumn, IntegerColumn, DecimalColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_9418_virgil_wdf_scan = Table({
    name: 'x_9418_virgil_wdf_scan',
    label: 'WDF Scan',
    accessibleFrom: 'public',
    allowWebServiceAccess: true,
    actions: ['read', 'update', 'delete', 'create'],
    callerAccess: 'none',
    schema: {
        x_9418_virgil_scan_date: DateTimeColumn({ label: 'Scan Date' }),
        x_9418_virgil_instance_url: StringColumn({ label: 'Instance URL', maxLength: 200 }),
        x_9418_virgil_status: StringColumn({ label: 'Status', maxLength: 20 }),
        x_9418_virgil_duration_seconds: DecimalColumn({ label: 'Duration (seconds)' }),
        x_9418_virgil_total_credits: DecimalColumn({ label: 'Total Credits' }),
        x_9418_virgil_capabilities_detected: IntegerColumn({ label: 'Capabilities Detected' }),
        x_9418_virgil_capabilities_total: IntegerColumn({ label: 'Capabilities Total' }),
        x_9418_virgil_summary_json: StringColumn({ label: 'Summary JSON', maxLength: 8000 }),
    },
})
