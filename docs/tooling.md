# Tooling and adoption

## Authoritative sources inspected

- [ProductShape repository](https://github.com/juangcarmona/productshape), CLI README and existing-repository/greenfield adoption guides.
- [Agent Toolkit repository](https://github.com/juangcarmona/agent-toolkit), distribution guide, `agentic-sdlc` package README and adoption skill.
- [Product Definition as Code](https://pdac.dev), methodology and reference implementation information.

Inspected on 2026-10-04. Use released CLI behaviour rather than assuming unreleased repository changes are available. ProductShape's documented published baseline is `@prodshape/cli@0.22.0` (Node.js >=22); installed Node.js is 24.11.1. pnpm is the canonical package manager for repository tooling, without selecting an application framework.

`package.json` pins pnpm 10.34.6; `pnpm-lock.yaml` is the only package lockfile. Enable pnpm through Corepack before installation. Firebase Emulator Suite requires Java >=21 (Temurin 21 preferred). Ensure both `java` and `javac` resolve that version; restart terminals after changing PATH/JAVA_HOME. Machine-specific Java paths belong in the workstation environment, never repository scripts. CI installs with `pnpm install --frozen-lockfile` and explicitly supplies Temurin 21.

## Phase 0 verification

Check the authority boundaries, explicit unresolved architecture and design placeholders, reserved source directories, valid package metadata, preservation of existing user files, and absence of application features and backlog before installing ProductShape. ProductShape creates `docs/product/`; this scaffold does not author its managed directories.

## Installation plan

Use the documented local exact dev dependency installation, followed by `prodshape init --ai codex --sdd none --gitignore`. Use the official `change create CHG-INITIAL` command after tools are verified. Keep proposed future-state artifacts inside the active change and the accepted model empty.

Install `juangcarmona/agent-toolkit/packages/agentic-sdlc` through APM's `agent-skills` target. APM locks resolved dependencies; do not compile over hand-authored `AGENTS.md` or copy the upstream repository into this project.

## Local use

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm exec prodshape change list
pnpm exec prodshape template actor
pnpm exec prodshape schema actor
pnpm exec prodshape change validate CHG-INITIAL
pnpm exec prodshape integration update --check
uv tool run --from apm-cli==0.33.0 apm install --target agent-skills --frozen
uv tool run --from apm-cli==0.33.0 apm audit --ci --no-policy
```

APM 0.33.0 is invoked in an isolated uv environment; the pre-existing machine APM 0.21.0 reported replay drift for the upstream three-skill subset after a successful install. Version 0.33.0 reduces the discrepancy to four files for `adr`, `git-worktrees` and `rebase-safely`, reported as orphaned during replay even though deployed-file presence, content integrity, subset selection and lock consistency pass. Frozen reinstall and explicit declaration of those three shared skills did not resolve the full audit. **The full APM audit remains failing; retain this tooling limitation and diagnose the replay/ownership discrepancy.** Do not disable drift checks to present a passing full audit. Keep the exact tool version when reproducing checks.

The `agent-skills` target provides callable lifecycle skills in `.agents/skills/`; it does not supply harness-specific slash commands or agent registrations. Package command and agent definitions remain in the installed dependency. Configure the target harness and project roles during interactive adoption, including the separate Done-gate auditor before implementation.

`prodshape citations verify` is the future consumer gate, but no consumer specifications exist yet. Its default `openspec` root is not used as a passing check here. Configure actual consumer roots when delivery documents exist; OpenSpec has not been installed. `pnpm verify` checks tooling and draft structure, not product completeness, application build or runtime behaviour.

The repository has no commits yet; the official change creator used `base-revision: '0000000'`. Establish a real working revision and recheck the change base before eventual application. No commit or push has been made by this scaffold task.

## Dependency finding

The initial npm-based bootstrap audit reported four high-severity affected packages along one development-tool dependency chain: ProductShape â†’ fast-glob â†’ micromatch â†’ braces. The advisory is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), stack exhaustion from deeply nested patterns. That audit reported no available fix for the documented CLI baseline. This is historical bootstrap evidence; use `pnpm audit` for a current dependency report. Keep the upstream finding recorded for the next supported update.

## CI and secret scanning

[The single validation workflow](../.github/workflows/verify.yml) runs on pull requests and pushes to main. It installs with the frozen pnpm lock, then runs `pnpm security:check` and `pnpm verify`. The latter includes design checks/tests, the Firebase client typecheck, security-helper tests, ProductShape checks and Firestore emulator tests exactly once. It does not pretend to build an application or run nonexistent application lint/format tooling. Setup/checkout actions use immutable commit pins, checkout does not retain credentials, runner permissions are read-only, concurrent superseded runs are cancelled, and jobs have a bounded timeout.

`pnpm security:check` uses standard Gitleaks 8.30.1, not a custom regex detector. The [helper](../src/tooling/security/check-secrets.mjs) downloads the public Windows/Linux x64 release to a temporary directory, verifies its pinned SHA-256 before extraction using system `tar`, scans all reachable history plus staged changes and the working tree with full redaction, then removes the tool directory. Internet access to the public release is required; download/checksum/execution failures block success. Other platforms fail explicitly rather than silently skipping scanning. No GitHub Secret, paid scanner-action license or platform API token is required. [Configuration](../.gitleaks.toml) retains the standard rules and excludes only dependency directories and Git internals; ignored environment files, logs and generated application outputs remain scanned. Do not add broad API-key exemptions or suppress findings without reviewing their actual consumer.

`pnpm security:test` tests integrity/failure behavior and proves a temporary ignored synthetic token is detected without appearing in console/report output. It also verifies the subprocess environment allowlist: OS/runtime paths are retained, CI/platform credentials and scanner overrides are not inherited. It runs inside `verify:fast`; temporary fixtures and tool files are removed after the test. No raw secret reports, emulator logs, local environment files or workstation auth state are published as CI artifacts. Public Firebase SDK values are not privileged credentials; [.env.example](../.env.example) nevertheless contains placeholders only, as required by the configuration contract.

GitHub metadata inspection on 2026-10-04 confirmed secret scanning and push protection enabled, no open secret-scanning alerts, no repository Secrets/Variables and no rulesets. The default branch is named main but no remote branch is published. Required checks must be configured against the actual successful status after authorized initial publication; no initial commit, push, approval or branch-protection bypass is performed by this work. CI and Cloudflare native deployment are separate: configuration ownership and unverified platform settings are documented in [infrastructure](architecture/infrastructure.md).

## Lifecycle names and configuration

The root toolkit selection also includes `architecture-docs`, installed through APM's `agent-skills` target. Its generated `.agents/skills/architecture-docs/` projection is ignored and restored from the manifest/lock alongside the other selected shared skills. Project-owned architecture documents are the twelve arc42 sections under `docs/architecture/`; the skill's canonical content remains upstream, not copied into those documents.

To change the root skill selection, preserve the existing entries: `uv tool run --from apm-cli==0.33.0 apm install juangcarmona/agent-toolkit --skill adr --skill git-worktrees --skill rebase-safely --skill architecture-docs --target agent-skills`. Normal restoration continues to use the frozen manifest/lock installation above.

The toolkit's commands are `adopt`, `refine`, `propose`, `implement`, `integrate`, `review` and `status`. Planning is `propose`. Verification skills include `verify-done`, `verify-like-ci` and `verify-runtime`. Shared skills include `adr`, `rebase-safely` and `git-worktrees`.

Juan approved and adopted [docs/engineering-lifecycle.md](engineering-lifecycle.md) on 2026-10-04. It defines GitHub Issues, native plan mode, durable Markdown delivery plans, Ready/Done gates, human approval and independent audit. Fifteen project-owned role skills are installed under `.agents/skills/`; their contract sections are preserved from toolkit templates. Four plan-role implementations and the native OPEN/CLOSED adapter are authored for this project; the other roles adapt shipped GitHub/branch references. These local sources and their adaptation references belong in version control and are not regenerated by APM.

No SDD framework or custom tracker states are installed. Delivery plans will live under `docs/delivery/plans/` and completed plans under `docs/delivery/completed/`, created only for actual delivery items. ProductShape is not a delivery-plan provider. Remote workflow publication and the initial remote branch are pending; local passing checks are not evidence of a GitHub CI run. Reconcile the lifecycle after GitHub CI and protections are configured.

## Ownership

ProductShape configuration, installation lock, templates and managed integrations are committed. `.product/generated/` and `.product/cache/` are ignored. Accepted semantics belong to `docs/product/model/`; proposed semantics belong to active Product Changes. Generated integration content is refreshed through `prodshape integration update` and checked through `prodshape integration update --check` and `prodshape doctor`.

APM's manifest and lock are committed. Downloaded `apm_modules/` and APM-generated consumer projections are restored by `apm install --target agent-skills`; they are not canonical skill sources. ProductShape-generated files under `.agents/` follow ProductShape's commit and installation-lock convention. Future linting must exclude generated capability content.

## Product acceptance gate

Juan explicitly approves the proposed baseline before its status becomes approved. Validate the overlay, inspect `change apply CHG-INITIAL --dry-run`, and apply explicitly on a working branch. Applying materializes the candidate baseline; the documented human pull-request merge accepts it. Neither application nor merge proves implementation.

## Executable shell (GH-1)

Astro 7.3.5, @astrojs/check 0.9.10 and TypeScript 6.0.2 are pinned; the checker does not support the previous TypeScript 7 pin. Wrangler 4.147.0 consumes root declarative metadata; application/executable configuration stays in src/. Commands and runtime setup are in the root README. pnpm verify adds build and eight web assertions while retaining existing checks. Playwright is a browser-driving library for explicit runtime evidence, not a new application framework. A Chromium download timed out locally; installed Edge successfully drove the same harness.

The authoritative scanner now pins Gitleaks 8.29.1, verifies official SHA-256 checksums, extracts Windows ZIPs with fflate and reuses a version/hash-checked user-local cache; earlier scanner prose above is historical bootstrap evidence. GH-1 changes no scanner logic. Frozen APM restoration in the isolated worktree encountered a Windows activation Access Denied error; the previously restored canonical auditor payload in the main checkout remains available for the independent audit. This is not a passing full APM audit.
