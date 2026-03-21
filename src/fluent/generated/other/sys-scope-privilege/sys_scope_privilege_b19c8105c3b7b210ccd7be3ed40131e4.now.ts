import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['b19c8105c3b7b210ccd7be3ed40131e4'],
    operation: 'read',
    status: 'allowed',
    targetName: 'sys_user_has_role',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
