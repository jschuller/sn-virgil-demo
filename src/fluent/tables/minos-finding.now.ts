import { Table, StringColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_9418_virgil_minos_finding = Table({
    name: 'x_9418_virgil_minos_finding',
    label: 'Minos Finding',
    accessibleFrom: 'public',
    allowWebServiceAccess: true,
    actions: ['read', 'update', 'delete', 'create'],
    callerAccess: 'none',
    schema: {
        x_9418_virgil_scan: ReferenceColumn({
            label: 'Scan',
            referenceTable: 'x_9418_virgil_minos_scan',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        x_9418_virgil_rule: ReferenceColumn({
            label: 'Rule',
            referenceTable: 'x_9418_virgil_minos_rule',
            attributes: {
                encode_utf8: false,
            },
        }),
        x_9418_virgil_rule_id: StringColumn({ label: 'Rule ID', maxLength: 40 }),
        x_9418_virgil_rule_name: StringColumn({ label: 'Rule Name', maxLength: 200 }),
        x_9418_virgil_severity: StringColumn({ label: 'Severity', maxLength: 20 }),
        x_9418_virgil_source: StringColumn({ label: 'Source', maxLength: 40 }),
        x_9418_virgil_category: StringColumn({ label: 'Category', maxLength: 40 }),
        x_9418_virgil_message: StringColumn({ label: 'Message', maxLength: 4000 }),
        x_9418_virgil_recommendation: StringColumn({ label: 'Recommendation', maxLength: 4000 }),
        x_9418_virgil_evidence_json: StringColumn({ label: 'Evidence (JSON)', maxLength: 4000 }),
        x_9418_virgil_tags: StringColumn({ label: 'Tags (JSON)', maxLength: 1000 }),
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'x_9418_virgil_rule',
        },
        {
            name: 'index2',
            unique: false,
            element: 'x_9418_virgil_scan',
        },
    ],
})
