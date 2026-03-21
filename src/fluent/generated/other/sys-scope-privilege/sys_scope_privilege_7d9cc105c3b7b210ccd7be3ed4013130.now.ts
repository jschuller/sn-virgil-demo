import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['7d9cc105c3b7b210ccd7be3ed4013130'],
    operation: 'read',
    status: 'allowed',
    targetName: 'sys_audit',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
