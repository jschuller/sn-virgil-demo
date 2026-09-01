import { Property } from '@servicenow/sdk/core'

Property({
    $id: Now.ID['virgil_effort_prop'],
    name: 'x_9418_virgil.effort',
    value: 'low',
    description:
        'Claude reasoning effort for Virgil Chat on 4.6+/5-family models: low | medium | high. Higher effort risks the 55s ServiceNow outbound REST timeout',
})

Property({
    $id: Now.ID['virgil_max_tokens_prop'],
    name: 'x_9418_virgil.max_tokens',
    value: '8000',
    description: 'max_tokens for the Claude Messages API call in Virgil Chat',
    type: 'integer',
})
