import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['b59c8105c3b7b210ccd7be3ed401318a'],
    operation: 'read',
    status: 'allowed',
    targetName: 'cmdb_ci_server',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
