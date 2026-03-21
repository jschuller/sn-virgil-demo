import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['3d9c8105c3b7b210ccd7be3ed401318e'],
    operation: 'read',
    status: 'allowed',
    targetName: 'cmdb_ci_service',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
