import { Role } from '@servicenow/sdk/core'

Role({
    name: 'x_9418_virgil.admin',
    description: 'Full access to all Virgil engines — Minos, Plutus, Advisor',
})

Role({
    name: 'x_9418_virgil.user',
    description: 'Run scans and view results',
})
