import { Property } from '@servicenow/sdk/core'

Property({
    $id: Now.ID['a6dbcd41c3b7b210ccd7be3ed4013126'],
    name: 'x_9418_virgil.thinking_budget',
    value: '8000',
    description: 'Legacy: thinking token budget, only used when claude_model is a pre-4.6/date-suffixed model (or haiku-4-5/sonnet-4-5). Ignored for Claude 4.6+/5 models — use x_9418_virgil.effort instead',
    type: 'integer',
})
