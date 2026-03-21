import { CrossScopePrivilege } from '@servicenow/sdk/core'

CrossScopePrivilege({
    $id: Now.ID['c29c0505c3b7b210ccd7be3ed4013172'],
    operation: 'read',
    status: 'allowed',
    targetName: 'sys_soap_message',
    targetScope: 'global',
    targetType: 'sys_db_object',
})
