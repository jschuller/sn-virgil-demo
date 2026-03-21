import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['1e9c4505c3b7b210ccd7be3ed4013158'],
    operation: 'read',
    status: 'allowed',
    targetName: 'sys_report',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
