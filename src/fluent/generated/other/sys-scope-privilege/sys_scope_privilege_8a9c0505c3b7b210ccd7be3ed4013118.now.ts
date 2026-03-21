import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['8a9c0505c3b7b210ccd7be3ed4013118'],
    operation: 'read',
    status: 'allowed',
    targetName: 'wf_workflow',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
