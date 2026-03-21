# Virgil — ServiceNow Architecture & Pricing Intelligence Platform

A scoped ServiceNow application built with the ServiceNow IDE, SDK Fluent, and Claude Code. Virgil scans your ServiceNow instance and provides architecture analysis, WDF credit sizing, and AI-powered consulting — all from within ServiceNow.

## Pages

| Page | Description |
|------|-------------|
| **Virgil Home** | Launchpad with navigation cards |
| **Minos Scanner** | Architecture scan — analyzes plugins, tables, IT4IT coverage, generates mermaid diagrams |
| **Plutus Scanner** | WDF credit sizing — detects capabilities and estimates credit consumption |
| **Virgil Chat** | AI advisor — Claude-powered architecture guidance with markdown + mermaid rendering |

## Deploy to a Fresh PDI

### Prerequisites
- ServiceNow PDI (Xanadu or later) with IDE enabled
- GitHub account with a Personal Access Token (repo scope)
- Anthropic API key for Virgil Chat

### Option A: Clone via ServiceNow IDE
1. Open `https://YOUR_INSTANCE.service-now.com/sn_glider_app/ide`
2. `Cmd+Shift+P` > `Git: Set IDE Git credentials` > Basic auth
   - Git repository URL: `https://github.com/jschuller/sn-virgil-demo.git`
   - Username: your GitHub username
   - PAT: your token
3. `Cmd+Shift+P` > `Git: Clone` > enter the repo URL
4. Open the cloned workspace
5. Click **Build and Install** in the IDE status bar

### Option B: Deploy via now-sdk (recommended)
```bash
git clone https://github.com/jschuller/sn-virgil-demo.git
cd sn-virgil-demo
npm install
npm run build        # Compiles JSX → .jsdbx, validates Fluent
now-sdk install      # Deploys to target instance
```

Both options deploy all tables, ACLs, roles, Script Includes, REST API endpoints, BYOUI pages, and 159 seed records automatically.

### Post-Deploy: Set System Properties
These are set on the instance, NOT in source code:

| Property | Value | Type |
|----------|-------|------|
| `x_9418_virgil.anthropic_api_key` | Your `sk-ant-...` key | `password2` (encrypted) |
| `x_9418_virgil.claude_model` | `claude-sonnet-4-6-20250620` | `string` |
| `x_9418_virgil.thinking_budget` | `8000` | `integer` |

Set via MCP `create_record` on `sys_properties` or directly in the instance UI at `sys_properties.list`.

### Post-Deploy: Create Demo User (optional)
Create a user with the `x_9418_virgil.admin` role to run scans and use Chat.

## What's Included

This repo is a **complete, self-contained** Virgil deployment:

```
src/
├── server/              # 7 Script Includes (business logic)
│   ├── VirgilChat.server.js       # Claude API bridge with extended thinking
│   ├── MinosScanner.server.js     # Full architecture scan orchestrator
│   ├── PlutusScanner.server.js    # WDF credit sizing (stub in demo)
│   ├── MinosOntology.server.js    # Ontology graph management
│   ├── MinosRuleEngine.server.js  # Rule evaluation engine
│   ├── VirgilUtils.server.js      # Utility functions
│   └── VirgilAjax.server.js       # GlideAjax wrapper
├── client/              # 4 BYOUI React pages
│   ├── home.html/jsx, chat.html/jsx, minos.html/jsx, plutus.html/jsx
│   ├── components/      # HomeApp, MinosApp (React components + CSS)
│   └── services/        # VirgilService.js (REST API client using fetch + g_ck)
└── fluent/              # SDK Fluent metadata (tables, ACLs, roles, etc.)
    ├── tables/          # 8 custom tables
    ├── acls/            # 32 ACLs (8 tables x 4 ops)
    ├── roles/           # admin + user roles
    ├── script-includes/ # Script Include declarations
    ├── rest-api/        # 4 Scripted REST endpoints
    ├── navigation/      # App menu + modules
    ├── privileges/      # 32 cross-scope privileges
    ├── ui-pages/        # 4 UiPage definitions (BYOUI entry points)
    └── records/         # 159 seed records (rules, ontology, rate cards)
```

## Known Limitations

- **Scope prefix is hardcoded**: This repo uses scope `x_9418_virgil`. On a fresh PDI, the IDE may assign a different scope prefix. Use `set-scope.sh` from the companion repo to update all references.
- **PlutusScanner is a stub**: The full PlutusScanner logic is confidential. This demo includes a stub that returns placeholder data.
- **API key is NOT in source**: The `anthropic_api_key` property uses `password2` type with `@fluent-disable-sync`. Set post-deploy.

## Development Workflow

This app demonstrates the **Claude Code + now-sdk** workflow for ServiceNow app development:

```
LOCAL (Claude Code + now-sdk)          SERVICENOW INSTANCE
─────────────────────────────          ───────────────────
src/server/*.server.js  ←Claude Code   Tables, ACLs, Roles
src/client/*.jsx        ←Claude Code   BYOUI Pages
src/fluent/*.now.ts     ←Claude Code   REST API, Properties
        │                                     ▲
        └── npm run build → now-sdk install ──┘
```

**Advantages over Build Agent:**
- Unlimited Claude prompts (vs 10/month on PDI)
- Full codebase context across all files
- Local IDE with search, refactor, version control
- CI/CD ready from day one

For the full development toolkit, deploy scripts, and documentation, see [project-virgil](https://github.com/jschuller/project-virgil).

## Built With

- [ServiceNow SDK (Fluent)](https://www.servicenow.com/docs/r/application-development/servicenow-sdk) — Application metadata as code
- [Claude Code](https://claude.com/claude-code) — AI-powered development
- [Anthropic Claude API](https://docs.anthropic.com) — Powers Virgil Chat

## License

This project is for demonstration purposes.
