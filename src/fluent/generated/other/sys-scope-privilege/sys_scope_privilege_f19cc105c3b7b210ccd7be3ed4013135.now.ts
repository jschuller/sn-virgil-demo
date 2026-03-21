import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['f19cc105c3b7b210ccd7be3ed4013135'],
    operation: 'read',
    status: 'allowed',
    targetName: 'sys_audit_delete',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
