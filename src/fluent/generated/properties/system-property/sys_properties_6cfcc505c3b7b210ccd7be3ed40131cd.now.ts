import { Property } from '@servicenow/sdk/core'

// @fluent-disable-sync — the key is set on the instance post-deploy and must
// never be synced back into source or overwritten by an install.
Property({
    $id: Now.ID['6cfcc505c3b7b210ccd7be3ed40131cd'],
    name: 'x_9418_virgil.anthropic_api_key',
    type: 'password2',
    isPrivate: true,
    description: 'Anthropic API key for Virgil Chat LLM bridge (set post-deploy; never stored in source)',
})
