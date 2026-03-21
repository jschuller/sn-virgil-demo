import { Table, StringColumn, DecimalColumn, BooleanColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_9418_virgil_wdf_scan_line = Table({
    name: 'x_9418_virgil_wdf_scan_line',
    label: 'WDF Scan Line',
    accessibleFrom: 'public',
    allowWebServiceAccess: true,
    actions: ['read', 'update', 'delete', 'create'],
    callerAccess: 'none',
    schema: {
        x_9418_virgil_scan: ReferenceColumn({
            label: 'Scan',
            referenceTable: 'x_9418_virgil_wdf_scan',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        x_9418_virgil_capability_id: StringColumn({ label: 'Capability ID', maxLength: 40 }),
        x_9418_virgil_capability_label: StringColumn({ label: 'Capability Label', maxLength: 200 }),
        x_9418_virgil_detected: BooleanColumn({ label: 'Detected' }),
        x_9418_virgil_usage_value: DecimalColumn({ label: 'Usage Value' }),
        x_9418_virgil_meter_unit: StringColumn({ label: 'Meter Unit', maxLength: 100 }),
        x_9418_virgil_credits_per_unit: DecimalColumn({ label: 'Credits Per Unit' }),
        x_9418_virgil_credits_consumed: DecimalColumn({ label: 'Credits Consumed' }),
        x_9418_virgil_annualized_usage: DecimalColumn({ label: 'Annualized Usage' }),
        x_9418_virgil_is_estimated: BooleanColumn({ label: 'Is Estimated' }),
        x_9418_virgil_excluded: BooleanColumn({ label: 'Excluded' }),
        x_9418_virgil_evidence: StringColumn({ label: 'Evidence', maxLength: 4000 }),
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'x_9418_virgil_scan',
        },
    ],
})
