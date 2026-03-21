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

### Step 1: Clone into ServiceNow IDE
1. Open `https://YOUR_INSTANCE.service-now.com/sn_glider_app/ide`
2. `Cmd+Shift+P` > `Git: Set IDE Git credentials` > Basic auth
   - Git repository URL: `https://github.com/jschuller/sn-virgil-demo.git`
   - Username: your GitHub username
   - PAT: your token
3. `Cmd+Shift+P` > `Git: Clone` > enter the repo URL
4. Open the cloned workspace

### Step 2: Build and Install
Click **Build and Install** in the IDE status bar. This deploys all tables, ACLs, roles, Script Includes, REST API endpoints, and BYOUI pages.

### Step 3: Set System Properties (post-deploy)
These are set on the instance, NOT in source code:

| Property | Value | Type |
|----------|-------|------|
| `x_9418_virgil.anthropic_api_key` | Your `sk-ant-...` key | `password2` (encrypted) |
| `x_9418_virgil.claude_model` | `claude-sonnet-4-6-20250620` | `string` |
| `x_9418_virgil.thinking_budget` | `8000` | `integer` |

Set via MCP `create_record` on `sys_properties` or directly in the instance UI at `sys_properties.list`.

### Step 4: Load Seed Data (optional)
Virgil includes 159 seed records (Minos rules, ontology graph, WDF rate card). Load from the companion repo:
```bash
git clone https://github.com/jschuller/project-virgil.git
cd project-virgil
cp .env.example .env  # fill in instance URL, credentials, scope prefix
python3 servicenow-app/seed_loader.py
```

### Step 5: Create Demo User (optional)
Create a user with the `x_9418_virgil.admin` role to run scans and use Chat.

## Known Limitations

- **Scope prefix is hardcoded**: This repo uses scope `x_9418_virgil` with `scopeId: 5b7456f4c37f3210ccd7be3ed40131f8`. On a fresh PDI, the IDE may assign a different scope prefix and sys_id. The `set-scope.sh` script in the companion repo handles prefix updates. ScopeId behavior on fresh instances needs testing.
- **Server-side code**: The Script Includes (VirgilChat, MinosScanner, PlutusScanner, etc.) were originally deployed from the companion [project-virgil](https://github.com/jschuller/project-virgil) repo via `now-sdk install`. They may need to be synced separately if not present in this workspace.
- **API key is NOT in source**: The `anthropic_api_key` property uses `password2` type with `@fluent-disable-sync`. The value must be set post-deploy and will never appear in version control.

## Architecture

```
ServiceNow Instance
├── 8 Custom Tables (Minos scans/findings/rules, Ontology nodes/edges, WDF scans/lines/rate card)
├── 7 Script Includes (VirgilChat, MinosScanner, PlutusScanner, MinosOntology, MinosRuleEngine, VirgilUtils, VirgilAjax)
├── 5 Scripted REST API endpoints (Minos scan/history, Plutus scan/history, Virgil chat)
├── 4 BYOUI React Pages (Home, Minos, Plutus, Chat)
├── 32 ACLs + 32 Cross-scope privileges
├── 2 Roles (admin, user)
└── 3 System Properties (API key, model, thinking budget)
```

## Development

This app was built using **Claude Code + ServiceNow SDK** as the primary development workflow:
- Server-side logic: Claude Code editing `.server.js` files locally
- Fluent definitions: Claude Code editing `.now.ts` files locally
- BYOUI pages: Build Agent (initial generation) + manual IDE edits
- Deployment: `now-sdk install` from local + IDE Build & Install

For the full development toolkit including deploy scripts, seed data, and documentation, see [project-virgil](https://github.com/jschuller/project-virgil).

## Built With

- [ServiceNow SDK (Fluent)](https://www.servicenow.com/docs/r/application-development/servicenow-sdk) — Application metadata as code
- [Claude Code](https://claude.com/claude-code) — AI-powered development
- [Anthropic Claude API](https://docs.anthropic.com) — Powers Virgil Chat
- ServiceNow IDE + Build Agent — BYOUI page generation

## License

This project is for demonstration purposes.
