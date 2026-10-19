import { Acl } from '@servicenow/sdk/core'

// ── Virgil API ───────────────────────────────────────────────────────────────
// Scans write records and chat spends Anthropic credits, and the route scripts use
// GlideRecord, which does not apply the table ACLs. This ACL replaces the platform's
// "Scripted REST External Default", which only requires a logged-in user.

export const virgilApiAcl = Acl({
    $id: Now.ID['virgil_api_execute_acl'],
    type: 'rest_endpoint',
    name: 'x_9418_virgil.virgil_api',
    operation: 'execute',
    roles: ['x_9418_virgil.user', 'x_9418_virgil.admin'],
    active: true,
})
