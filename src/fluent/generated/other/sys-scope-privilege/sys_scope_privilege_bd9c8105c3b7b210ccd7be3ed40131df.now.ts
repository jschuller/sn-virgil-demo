import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['bd9c8105c3b7b210ccd7be3ed40131df'],
    operation: 'read',
    status: 'allowed',
    targetName: 'sys_user_role',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
