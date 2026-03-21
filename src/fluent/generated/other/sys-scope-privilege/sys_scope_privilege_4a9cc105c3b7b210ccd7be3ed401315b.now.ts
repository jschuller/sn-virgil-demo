import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['4a9cc105c3b7b210ccd7be3ed401315b'],
    operation: 'read',
    status: 'allowed',
    targetName: 'incident_task',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
