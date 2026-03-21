import { Table, StringColumn, DecimalColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_9418_virgil_wdf_rate_card = Table({
    name: 'x_9418_virgil_wdf_rate_card',
    label: 'WDF Rate Card',
    accessibleFrom: 'public',
    allowWebServiceAccess: true,
    actions: ['read', 'update', 'delete', 'create'],
    callerAccess: 'none',
    schema: {
        x_9418_virgil_active: BooleanColumn({ label: 'Active' }),
        x_9418_virgil_cap_id: StringColumn({ label: 'Capability ID', maxLength: 40, mandatory: true }),
        x_9418_virgil_label: StringColumn({ label: 'Label', maxLength: 200, mandatory: true }),
        x_9418_virgil_meter_unit: StringColumn({ label: 'Meter Unit', maxLength: 100 }),
        x_9418_virgil_credits: DecimalColumn({ label: 'Credits Per Unit' }),
        x_9418_virgil_measurable: BooleanColumn({ label: 'Auto-Measurable' }),
        x_9418_virgil_pro_only: BooleanColumn({ label: 'Pro Only' }),
        x_9418_virgil_detect_logic: StringColumn({ label: 'Detect Logic', maxLength: 4000 }),
        x_9418_virgil_tier: StringColumn({ label: 'Tier', maxLength: 20 }),
        x_9418_virgil_order: DecimalColumn({ label: 'Order' }),
    },
})
