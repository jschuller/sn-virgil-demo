import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['b19c8105c3b7b210ccd7be3ed4013193'],
    operation: 'read',
    status: 'allowed',
    targetName: 'cmdb_ci_app_server',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
