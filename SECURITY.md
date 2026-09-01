# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it via [GitHub Security Advisories](https://github.com/jschuller/sn-virgil-demo/security/advisories/new) (preferred) or email.

- **Response time:** Acknowledgment within 48 hours, assessment within 1 week
- **Please do not** open a public issue for security vulnerabilities

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | Yes       |

## Security Practices

- Dependencies exact-pinned in package.json with a committed package-lock.json
- Dependabot alerts, security updates, and weekly version updates (`.github/dependabot.yml`)
- Secret scanning with push protection enabled
- The Anthropic API key lives only in an instance-side `password2` system property marked `isPrivate` — never in source, never overwritten by deploys
