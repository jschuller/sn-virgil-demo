import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['029c0505c3b7b210ccd7be3ed401311d'],
    operation: 'read',
    status: 'allowed',
    targetName: 'wf_workflow_version',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
