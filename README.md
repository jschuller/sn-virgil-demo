# Virgil — ServiceNow Architecture & Pricing Intelligence Platform

A scoped ServiceNow application built with the ServiceNow IDE, SDK Fluent, and Claude Code. Virgil scans your ServiceNow instance and provides architecture analysis, WDF credit sizing, and AI-powered consulting — all from within ServiceNow.

**Validated:** One-command deployment to a fresh PDI via `now-sdk install` — no Build Agent required.

## Pages

| Page | Description |
|------|-------------|
| **Virgil Home** | Launchpad with navigation cards |
| **Minos Scanner** | Architecture scan — analyzes plugins, tables, IT4IT coverage, generates mermaid diagrams |
| **Plutus Scanner** | WDF credit sizing — detects capabilities and estimates credit consumption |
| **Virgil Chat** | AI advisor — Claude-powered architecture guidance with markdown + mermaid rendering |

## Deploy to a Fresh PDI

### Prerequisites
- ServiceNow PDI (Xanadu or later)
- Node.js 20+ and npm
- Anthropic API key for Virgil Chat
- (Optional) GitHub PAT for IDE git integration

### Option A: Deploy via now-sdk (recommended — validated on fresh PDI)
```bash
git clone https://github.com/jschuller/sn-virgil-demo.git
cd sn-virgil-demo
npm install
now-sdk auth --add YOUR_INSTANCE --type basic   # configure instance credentials
npm run build                                    # compiles JSX → .jsdbx, validates Fluent
now-sdk install --auth YOUR_ALIAS               # deploys everything to instance
```

This single command deploys: 8 tables, 7 Script Includes, 5 REST endpoints, 4 BYOUI pages, 32 ACLs, 32 cross-scope privileges, 2 roles, 159 seed records, and 5 system properties.

### Option B: Clone via ServiceNow IDE
1. Open `https://YOUR_INSTANCE.service-now.com/sn_glider_app/ide`
2. Create a workspace → Click **Clone Git Repository**
3. Enter: `https://github.com/jschuller/sn-virgil-demo.git` + GitHub credentials
4. Click **Build and Install** in the IDE status bar

Both options produce identical results. Option B also gives you an IDE workspace for editing code and using Build Agent.

### Option C: Deploy via now-sdk, then connect IDE (best of both worlds)
1. Deploy via Option A (fast, scriptable)
2. Open IDE → Create workspace → Clone Git Repository (same repo URL)
3. IDE connects to the already-deployed app — no conflicts

### Post-Deploy: Set API Key (required for Virgil Chat)

The API key is NOT in source code — set it post-deploy:

| Property | Value | Type |
|----------|-------|------|
| `x_9418_virgil.anthropic_api_key` | Your `sk-ant-...` key | `password2` (encrypted) |
| `x_9418_virgil.claude_model` | `claude-sonnet-5` | `string` (auto-set) |
| `x_9418_virgil.effort` | `low` (`low`\|`medium`\|`high` — higher risks the 55s outbound REST timeout) | `string` (auto-set) |
| `x_9418_virgil.max_tokens` | `8000` | `integer` (auto-set) |
| `x_9418_virgil.thinking_budget` | `8000` — legacy, only used for pre-4.6/date-suffixed models | `integer` (auto-set) |

> **Upgrading an existing install?** `now-sdk install` applies the source-defined property values on update, so `claude_model` and friends update automatically. The API key is declared `isPrivate: true` in Fluent — its instance-side value survives redeploys (verified). Without that flag, every install would overwrite the key.
>
> **Legacy models**: pointing `claude_model` at a date-suffixed model or `claude-haiku-4-5` uses the legacy `budget_tokens` thinking API. Note haiku tends to generate to the `max_tokens` cap and can exceed the 55s synchronous REST window — lower `max_tokens` (e.g. 4000) if you use it.

Set via instance UI (`sys_properties.list`), MCP, or:
```bash
# Via ServiceNow REST API
curl -u admin:password https://YOUR_INSTANCE.service-now.com/api/now/table/sys_properties \
  -H 'Content-Type: application/json' \
  -d '{"name":"x_9418_virgil.anthropic_api_key","value":"sk-ant-...","type":"password2"}'
```

### Post-Deploy: Create Demo User (optional)
Create a user with the `x_9418_virgil.admin` role to run scans and use Chat.

## What's Included

This repo is a **complete, self-contained** ServiceNow app deployment:

```
src/
├── server/              # 7 Script Includes (business logic)
│   ├── VirgilChat.server.js       # Claude API bridge with adaptive thinking
│   ├── MinosScanner.server.js     # Full architecture scan orchestrator
│   ├── PlutusScanner.server.js    # WDF credit sizing (stub in demo)
│   ├── MinosOntology.server.js    # IT4IT ontology graph + mermaid generation
│   ├── MinosRuleEngine.server.js  # 45 deterministic architecture rules
│   ├── VirgilUtils.server.js      # Platform utilities
│   └── VirgilAjax.server.js       # GlideAjax wrapper
├── client/              # 4 BYOUI React pages
│   ├── home.html/jsx              # Launchpad
│   ├── minos.html/jsx             # Architecture scan + mermaid diagrams
│   ├── plutus.html/jsx            # WDF credit sizing
│   ├── chat.html/jsx              # AI chat with markdown + mermaid rendering
│   ├── components/                # HomeApp, MinosApp (React + CSS)
│   └── services/VirgilService.js  # REST API client (fetch + g_ck CSRF token)
└── fluent/              # SDK Fluent metadata-as-code
    ├── tables/          # 8 custom tables
    ├── acls/            # 32 ACLs (8 tables × 4 operations)
    ├── roles/           # admin + user roles
    ├── script-includes/ # ScriptInclude declarations (Now.include pattern)
    ├── rest-api/        # Scripted REST API (5 endpoints)
    ├── navigation/      # App menu + 8 navigation modules
    ├── privileges/      # 32 cross-scope privileges
    ├── ui-pages/        # 4 UiPage definitions (BYOUI entry points)
    └── records/         # 159 seed records via Record() API
```

## Development Workflow

This app demonstrates the **Claude Code + now-sdk** pattern for ServiceNow development:

```
LOCAL (Claude Code + now-sdk)              SERVICENOW INSTANCE
─────────────────────────────              ───────────────────
src/server/*.server.js  ← Claude Code      Tables, ACLs, Roles
src/client/*.jsx        ← Claude Code      BYOUI Pages (.do URLs)
src/fluent/*.now.ts     ← Claude Code      REST API, Properties
        │                                        ▲
        └── npm run build → now-sdk install ─────┘
                                                  │
GITHUB (sn-virgil-demo)                           │
────────────────────────                          │
git push ← local commits                         │
         ← IDE git push ── ServiceNow IDE ────────┘
                            (Clone Git Repo)
```

**Why this pattern beats Build Agent for real development:**
- **Unlimited AI prompts** — Claude Max vs 10/month on PDI
- **Full codebase context** — Claude Code sees all files, not single-conversation
- **Local IDE** — search, refactor, version control from day one
- **One-command deploy** — `now-sdk install` deploys everything
- **CI/CD ready** — `npm run build` in any pipeline

Build Agent is still useful for quick prototyping (10 free prompts/month). Use it to explore patterns, then implement with Claude Code.

## Known Limitations

- **Scope prefix is hardcoded**: Uses `x_9418_virgil`. A different PDI may assign a different vendor code. Use `set-scope.sh` from the [companion repo](https://github.com/jschuller/project-virgil) to update.
- **scopeId is instance-specific**: `now.config.json` contains a scopeId from the original instance. On a fresh PDI, `now-sdk install` creates a new scope with this ID — tested and validated.
- **PlutusScanner is a stub**: Full logic is confidential. Demo returns placeholder data.
- **API key is NOT in source**: Uses `password2` type with `@fluent-disable-sync`. Must be set post-deploy.
- **IDE workspace not auto-created**: `now-sdk install` deploys the app but doesn't create an IDE workspace. Clone this repo in the IDE to get a workspace (Option C above).

## Built With

- [ServiceNow SDK (Fluent)](https://www.servicenow.com/docs/r/application-development/servicenow-sdk) — Application metadata as code
- [Claude Code](https://claude.com/claude-code) — AI-powered development (Anthropic)
- [Anthropic Claude API](https://docs.anthropic.com) — Powers Virgil Chat with adaptive thinking
- [ServiceNow MCP Server](https://github.com/ServiceNow/mcp-server-servicenow) — Instance automation from Claude Code

## License

This project is for demonstration purposes.
