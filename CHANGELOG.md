# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow semver.

## [Unreleased]

### Security
- The Virgil REST API requires `x_9418_virgil.user` or `x_9418_virgil.admin` through a
  REST endpoint ACL. It used the platform default, which only requires a login, and the
  route scripts' GlideRecord calls skip the table ACLs.
- Removed `VirgilAjax`, an unused client-callable GlideAjax processor that ran scans and
  chat with no role check.
- Chat output is sanitized with DOMPurify after markdown parsing, without images, forms
  or styles; user messages render as text; mermaid runs with `securityLevel: 'strict'`.
- marked and DOMPurify are exact-pinned npm dependencies bundled into the page; mermaid
  is pinned to 12.1.0 on jsDelivr with a sha384 integrity hash (it was "latest", no SRI).
- History endpoints clamp `?limit` to 1–100.

### Fixed
- Minos findings sort critical first (critical used to sort last).
- The Plutus page reads the field names that `/plutus/history` and the
  `wdf_scan_line` table use (`capability_label`, `evidence`, `meter_unit`; it read
  `cap_label`, `scan_evidence`, `usage_unit`), and shows the scanner's message when
  the scan is the demo stub. `/plutus/history` lines now include `evidence`. A test
  checks the page, the route and the table against each other.
- The README quickstart uses `npm ci`, `npm run build`, `npm run deploy -- --auth
  <alias>` and `npx now-sdk auth --add … --alias <alias>` instead of a global
  `now-sdk`, which `npm install` does not provide, and explains where the alias comes from.

### Added
- `npm test` (node --test, Node 22+) and a CI workflow running build and tests.
- Tests for the Minos rule engine (`tests/minos-rule-engine.test.mjs`): every check
  type, the `all`/`any`/`streams_covered_below` combinators, `_formatMessage`,
  `_loadRulesFromTable`, and each seeded rule in `seed-data.now.ts` (valid
  `eval_json` with known checks only, message placeholders the rule can fill, an
  evaluation without unknown-check warnings). Tests for `VirgilChat._parseResponse`
  and `_sanitizeMermaid` (`tests/virgil-chat-parse.test.mjs`). Both load the Script
  Includes in a Node vm with stubbed Glide globals.


### Changed
- **Claude integration migrated to the Claude 5 family.** Default model is now
  `claude-sonnet-5` (was `claude-sonnet-4-20250514`). Requests use adaptive
  thinking (`thinking: {type: 'adaptive'}`) with `output_config.effort` —
  4.6+/5-family models reject the old `budget_tokens` payload with HTTP 400.
- **Toolchain upgraded**: `@servicenow/sdk` 4.4.0 → 4.11.2,
  `@servicenow/glide` → 27.0.5, `@servicenow/eslint-plugin-sdk-app-plugin` →
  4.11.2, `eslint` → 8.57.1. SDK 4.11 bundles BYOUI pages per-page (the shared
  `client.jsdbx` chunk is retired) and emits explicit per-field dictionary
  records; deployed behavior is unchanged.
- `max_tokens` default lowered from a hardcoded 16000 to a property-controlled
  8000, keeping responses inside ServiceNow's ~60s synchronous outbound REST
  window (the app uses a 55s timeout; no streaming is possible server-side).

### Added
- System property `x_9418_virgil.effort` (default `low`) — reasoning effort
  for current Claude models (`low` | `medium` | `high`; higher risks the 55s
  timeout).
- System property `x_9418_virgil.max_tokens` (default `8000`).
- Legacy compatibility branch: pointing `claude_model` at a date-suffixed
  model, `claude-haiku-4-5`, or `claude-sonnet-4-5` still sends
  `budget_tokens` (clamped below `max_tokens`; API minimum 1024).
- `package-lock.json` is now committed for reproducible builds.
- `.github/dependabot.yml` — weekly npm version updates, `@servicenow/*`
  grouped.
- `engines.node >= 20.18.0` in package.json (the SDK toolchain floor).

### Security
- Removed the committed password2 ciphertext from the generated api-key
  property file and marked the property `isPrivate: true`. Without that flag,
  every `now-sdk install` overwrites the instance-side key with the source
  value; with it, the instance key survives redeploys (verified).
  `@fluent-disable-sync` alone only prevents instance→source sync — it does
  not protect installs.
- SECURITY.md now claims only verifiably enabled practices; Dependabot
  version updates are configured to back the automated-updates claim.

### Deprecated
- `x_9418_virgil.thinking_budget` — used only by the legacy model branch.
  Use `x_9418_virgil.effort` for current models.

### Deferred (known, intentional)
- React 18 → 19 (SDK 4.11.2 declares no React constraint; client code is
  already React-19-safe — deferred as zero user value this round).
- eslint 9/10 flat-config migration (the ServiceNow eslint plugin publishes
  no flat-config evidence; `now-sdk build` lints with its own bundled eslint
  regardless).

## [1.0.0] — 2026-03

Initial public release: Minos architecture scanner, Plutus WDF credit sizing
(stub), Virgil Chat (Claude-powered analysis), 8 tables, 7 Script Includes,
5 REST endpoints, 4 BYOUI React pages, seed data — one-command deploy via
`now-sdk install`.
