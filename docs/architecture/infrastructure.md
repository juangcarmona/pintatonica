# Infrastructure

Provisioned 2026-10-04. Architecture status: Firebase Authentication, Firestore and Cloudflare were accepted by Juan on 2026-10-04 for the MVP; the architecture README unresolved-decisions table should be reconciled with a formal decision record. The accepted ProductShape model owns product intent; the data model below remains implementation scaffolding.

## Firebase

| Item | Value |
| --- | --- |
| Project ID / name | `pintatonica-band` / Pintatonica |
| Project number | 978430624729 |
| Web App | Pintatónica Web, `1:978430624729:web:03b418d63f95397de5cfc8` |
| Firestore database | `(default)`, Standard edition, Firestore Native, delete protection on |
| Region | `europe-southwest1` (Madrid) |
| Billing | None attached (free tier; no Blaze) |
| Not provisioned | Hosting, Functions, Storage, Realtime Database, Analytics, service-account keys |

A stray empty Google Cloud project `pintatonica` was created by a first attempt and is unused.

## Authentication and membership

Google sign-in, plus an active membership record: `Google user + members/{uid}.active == true = private access` (BR-MEMBERSHIP, FR-ACCESS). Authentication alone grants nothing. Members are provisioned out of band (Console or Admin tooling); clients cannot write `members`. No administrator role is modelled, as the product does not define one.

## Firestore model (provisional)

```text
members/{uid}                       name, active; optional private email metadata
availability/{uid}                  weekly: [{day, start, end}]  (several intervals per day)
availability/{uid}/overrides/{date} intervals: [...]             (empty = unavailable)
rehearsals/{id}
setlists/{id}
```

Public content is repository-managed; repertoire metadata editing/persistence must be evaluated during GH-6 rather than assumed to follow this scaffold. Rules: [src/firebase/firestore.rules](../../src/firebase/firestore.rules), deny by default. The access mechanism is documented in [08](08-crosscutting-concepts.md); provisioning and configuration procedures live in the [member-access runbook](../operations/member-access.md). Rules are deployed with `pnpm exec firebase deploy --only firestore:rules --project pintatonica-band`.

## Local development

- `pnpm firebase:emulators` runs Auth (9099) and Firestore (8080) under the `demo-pintatonica` project, which cannot touch production.
- `pnpm firebase:rules:test` runs emulator-backed rules tests in `src/tests/firebase/`. Needs JDK 21+.
- Client initialisation is only in [src/firebase/client.ts](../../src/firebase/client.ts). Emulators connect only in dev builds with `PUBLIC_FIREBASE_USE_EMULATORS=true`.

## Environment variables

[.env.example](../../.env.example) contains names and placeholders only. Firebase browser configuration is public, including the browser API key; it is not backend authorization. [Client initialization](../../src/firebase/client.ts) consumes `PUBLIC_` variables through `import.meta.env`; Astro now supports this convention through a guarded browser entry. GitHub validation does not initialize the browser client and needs none of these values.

### Configuration contract

Classifications below are public application configuration, local-only configuration, CI secret, deployment-platform configuration or unnecessary. Public application values belong in the existing Cloudflare project's ordinary build environment settings, separately reviewed for production and preview, and in ignored developer-local configuration when needed. They do not belong in GitHub Secrets or Variables for the current checks. Never put a private value in a `PUBLIC_` variable.

| Name | Consumer | Classification | Secret? | Where it lives | How provisioned |
| --- | --- | --- | --- | --- | --- |
| `PUBLIC_FIREBASE_API_KEY` | Client `config.apiKey` | Public application configuration | No | Cloudflare build environment; ignored local environment; example placeholder | Existing Firebase web app's public SDK configuration |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | Client `config.authDomain` | Public application configuration | No | Same public build/local locations | Existing Firebase web app configuration |
| `PUBLIC_FIREBASE_PROJECT_ID` | Client `config.projectId` | Public application configuration | No | Same public build/local locations | Existing `pintatonica-band` project |
| `PUBLIC_FIREBASE_APP_ID` | Client `config.appId` | Public application configuration | No | Same public build/local locations | Existing Firebase web app configuration |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | Client SDK configuration; no Storage consumer | Unnecessary for current Auth/Firestore use | No | Optional example placeholder; platform value only if a real consumer needs it | Existing public SDK metadata; do not provision Storage to fill this field |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Client SDK configuration; no Messaging consumer | Unnecessary for current Auth/Firestore use | No | Optional example placeholder; platform value only if a real consumer needs it | Existing public SDK metadata; do not provision Messaging |
| `PUBLIC_FIREBASE_USE_EMULATORS` | Client emulator guard | Local-only configuration | No | Ignored local environment; example `false`; Cloudflare absent or `false` | Developer opt-in with `true`; production and preview must not opt in |
| `import.meta.env.DEV` | Client emulator guard | Public application configuration | No | Build-generated flag, not manually configured | Eventual build tool; never a GitHub secret |
| Firebase default project alias | Firebase CLI | Deployment-platform configuration | No | [.firebaserc](../../.firebaserc) | Existing project mapping; not CLI authentication |
| Firestore database, location, rules and indexes | Firebase CLI | Deployment-platform configuration | No | [firebase.json](../../firebase.json) and referenced manifests | Existing resources and repository paths |
| `demo-pintatonica` | Emulator scripts and rules tests | Local-only configuration | No | Repository scripts and tests | Test-only demo identifier; no cloud project or credentials |
| Auth port `9099`, Firestore port `8080`, host `127.0.0.1` | Local emulators and tests | Local-only configuration | No | Emulator manifest and test/client code | Ephemeral workstation/runner processes |
| Node `24`, Java `21`, pnpm `10.34.6` | CI validation | Deployment-platform configuration | No | Workflow and package metadata | Pinned setup actions; pnpm frozen installation; local Java selection stays on workstation |
| Gitleaks `8.30.1` and archive SHA-256 hashes | Secret scanner | Deployment-platform configuration | No | [Scanner helper](../../src/tooling/security/check-secrets.mjs) | Public release download; pinned checksum checked before extraction |
| Cloudflare account/project IDs and Git repository binding | Native deployment integration | Deployment-platform configuration | No | Existing Cloudflare project settings | Existing platform connection; do not duplicate it |
| Cloudflare production branch and preview policy | Native deployment integration | Deployment-platform configuration | No | Existing Cloudflare project settings | Preserve existing integration; audit actual settings before changes |
| Cloudflare root, build command and output directory | Native build | Deployment-platform configuration | No | Existing Cloudflare project settings | Inspect actual build; no invented framework/build/output settings |
| `NODE_VERSION` if required by Cloudflare's existing build | Cloudflare build runtime | Deployment-platform configuration | No | Cloudflare build settings, not GitHub Variables | Set supported Node 24 only if the actual build requires it |
| `GITHUB_TOKEN` | GitHub checkout | CI secret | Yes | Ephemeral GitHub runner; read-only, not persisted in checkout | Automatically issued by GitHub, not a repository Secret created by us |
| Firebase/gcloud local authenticated sessions | Manual operator commands | Local-only configuration | Yes | Existing CLI-managed workstation identity | Operator login only; never inspect or export session contents |
| Browser cookies, private keys and credential-store contents | No repository consumer | Unnecessary | Yes | Never copied into repository or CI | Not accessed or provisioned by this work |
| `FIREBASE_TOKEN` | No current pipeline consumer | Unnecessary | Yes | Nowhere in repository or CI | Not created or copied |
| `GOOGLE_APPLICATION_CREDENTIALS` / service-account JSON | No server/Admin or CI consumer | Unnecessary | Yes | Nowhere in repository or CI | No keys created or exported |
| OAuth client secrets / Firebase Admin credentials | No current consumer | Unnecessary | Yes | Nowhere in repository or CI | Not introduced |
| `CLOUDFLARE_API_TOKEN` | No direct API pipeline consumer | Unnecessary | Yes | Nowhere in repository or CI | Native Git deployment needs no new API token |

Ignored `.env.local` is the developer-local home for sensitive configuration if a future legitimate consumer requires it; none is currently required. No real-secret environment file is created by this work. The placeholder-only example is the sole allowed environment template. Standard scanning includes ignored environment files and logs, not only committed files.

Preview deployments are not automatically a separate Firebase environment. If they use the production public configuration they address the same Firebase project/data and remain subject to the same rules. Review that choice before enabling private workflows in previews; do not provision another project or change authorized auth domains merely to complete this inventory.

## Deployment and CI

- Juan confirmed on 2026-10-04 that Cloudflare native Git integration is already connected. Preserve its production and preview deployment ownership; no GitHub Actions deployment or Cloudflare API token is introduced. Actual branch, build/output settings and variable scopes still need a platform check; there is no deployable application build in this repository.
- [GitHub Actions](../../.github/workflows/verify.yml) validates PRs and pushes to `main`: frozen install, redacted standard secret scanning, then `pnpm verify` for design, typecheck, security tests, ProductShape and Firestore rules. Emulator tests run once under `demo-pintatonica`, without production credentials. Build, application lint and formatting gates are deferred until real application tooling exists.
- Firebase rule deployment remains an explicit manual operator action. No Firebase Admin credentials or CI deployment identity are required. If automatic deployment becomes required later, prefer GitHub OIDC with Google Workload Identity Federation, not service-account keys; it is not implemented now.
- GitHub Secrets created: **none**. GitHub Variables created: **none**. Neither current CI nor the emulator tests need public browser values. The automatic read-only runner token is not a created repository Secret.
- Native Cloudflare deployment is not proven to wait for GitHub CI. Branch protection and platform deployment gating are separate settings; do not claim an ordering guarantee from workflow YAML.

### Inspection evidence and limits

Read-only inspection on 2026-10-04 confirmed the active Firebase project and web app through supported Firebase CLI commands. GitHub reports a public repository, default branch `main`, no remote branches, no repository Secrets/Variables, no rulesets, no open secret-scanning alerts, and enabled secret scanning/push protection. These are observed metadata, not proof of application deployment, rules correctness or comprehensive secret absence.

Cloudflare's initial OAuth attempt timed out; Juan authorized a retry, which successfully established a local Wrangler operator session. The subsequent Pages listing returned no projects, and `whoami` reported missing `account:read` scope without an account listing. This does not establish that the connection is absent: it may be a Worker/native Builds integration or belong to another account. No token was extracted, no auth state was copied, and no platform configuration or variables were changed. **Cloudflare variable names/values/scopes and build settings remain unverified.** Inspect the correct account/resource in the existing dashboard or authorize the necessary local read scope; never export the session or create a pipeline API token to bypass that gap.

The repository currently has no commits, so history scanning is N/A. Redacted Gitleaks scans cover the staged index and working tree, including untracked/ignored environment and log files, excluding only Git internals and dependency directories. No report or emulator log is uploaded as a CI artifact. Scanner tests create a random synthetic token in a temporary directory, prove detection and redaction, and remove the directory. No real secret is used as a fixture.

Never copy workstation Firebase/gcloud refresh/access/OAuth tokens, CLI sessions, browser cookies, private keys, OS/browser credential stores, service-account JSON, Firebase deploy tokens, Admin credentials or Cloudflare API tokens into repository files or GitHub. No such credentials were copied by this change.

### Local verification, 2026-10-04

| Check | Observed result | Evidence scope |
| --- | --- | --- |
| `pnpm install --frozen-lockfile` | Exit 0 | pnpm 10.34.6, existing lock, no new package dependency |
| `pnpm verify` | Exit 0 | Node 24.11.1, process-local Temurin 21; 9 design, 8 security and 8 Firestore tests; typecheck and all ProductShape checks passed |
| `pnpm security:check` | Exit 0 | Standard redacted staged-index/worktree scan, including ignored environment/log files; no leaks found; no commits to scan |
| Actionlint 1.7.12 | Exit 0 | Existing workflow syntax; checksum-verified temporary validator; not a remote Actions run |
| Markdownlint-cli2 0.20.0 | Exit 0 | Four changed documents using the existing architecture no-hard-wrap/scoped-heading configuration |
| `pnpm exec prodshape citations verify docs/architecture --format json` | Exit 0 | Zero citations, zero diagnostics; not proof of accepted product intent |

These are local results on the shared working tree, not current-head remote CI evidence or a human Done approval. Changes by another agent after verification require rechecking the affected commands. Known APM replay/dependency findings remain recorded in [tooling](../tooling.md); this operational change does not waive them.

## Historical provisioning steps (before GH-1)

1. Firebase Console → Authentication → Get started → Sign-in method → Google → Enable → Save (set a support email).
2. Inspect the already-connected Cloudflare project's production/preview branch policy, build settings and public Firebase variable scopes. Add only missing public configuration needed by its actual build; never create a deployment token or duplicate integration.
3. Create member documents `members/{uid}` after each member first signs in.
4. After authorized initial publication and a successful current-head CI run, configure the verified `productshape` check as required on `main`, respecting human review requirements. No remote branch exists yet, so this task does not create a protection that could lock bootstrap publication. No commit or push is performed here.

## GH-1 hosting mapping

Wrangler deployment listing on 2026-10-04 confirmed the existing pintatonica Worker in account 2c0c4073a19c3990ea0ad6f6f9f0150a, obtained from its published Workers Builds check link. Root wrangler.jsonc owns build/static-assets mapping and is discoverable by the existing native deployment command. Its custom build runs pnpm build, so a native deploy with no preceding build still obtains dist. Static assets use explicit 404 handling. No new Worker, account, token, binding or paid service is created. Public environment scopes remain uninspected; missing values are safe for this non-sensitive shell. Published version/URL evidence will be appended after deployment.

Published shell: [Pintatonica shell](https://pintatonica.jgcarmona-pro.workers.dev) (initial version e75907c6-15fe-412b-b435-41caa7a6ac82). Both public and /band surfaces were driven in a real browser, including mobile/desktop and keyboard checks. The existing native build job failed; its documented Builds API returned Forbidden (12004) with the current operator session. No new scope/token was created. Native job diagnosis remains an explicit limitation; pnpm run deploy is the verified manual fallback.

## Post-integration production result

PR #10 merged as 0dc8daa9c64380cd915f5d9975552f5e1d8b0b1b. The main-branch native Cloudflare production build succeeded: [build 1b0da9dd](https://dash.cloudflare.com/2c0c4073a19c3990ea0ad6f6f9f0150a/workers/services/view/pintatonica/production/builds/1b0da9dd-7680-4b96-9d29-9144d45e838c). GitHub verification and product snapshot publication also passed for that merged commit.

The native integration deployed version 2c86fbab-278a-42ee-9ed8-aa24b0d9dc7f after the manual merged-main fallback. [Production public shell](https://pintatonica.jgcarmona-pro.workers.dev) and [/band shell](https://pintatonica.jgcarmona-pro.workers.dev/band/) were driven again at mobile/desktop sizes with working keyboard navigation, no overflow, no private requests and no page errors. This establishes Git-driven production deployment, not only manual deployability.

Earlier failed Workers Builds statuses belonged to PR/non-production builds. Their diagnostic API remains inaccessible, and no claim is made that preview automation has been repaired. The production build is now green. Local main was fast-forwarded without staging concurrent workflow edits; a stale unmanaged npm-era cookie directory was removed from node_modules, after which its build and eight web tests passed. No application change was needed for that local cache repair.
