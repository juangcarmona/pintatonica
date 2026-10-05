# Executable web shell

Published as [GH-1](https://github.com/juangcarmona/pintatonica/issues/1). Selected as slice 1 in the [delivery map](../README.md).

## Description

There is no executable web application or pnpm build, so the existing Cloudflare connection has no application output to deploy. Establish the smallest branded Pintatónica shell that runs locally, builds and can be deployed. This is delivery enablement for accepted public/member experiences, not implementation of their feature requirements.

## Actor / stakeholder

Juan and the implementation maintainer need an executable delivery path. ACT-VISITOR and ACT-MEMBER are the future audiences for the / and /band surfaces; member access itself is delivered in slice 2.

## Priority

First, explicitly selected by Juan. No numerical priority or new status label.

## Product references

Direct quality/constraint scope: QR-VERIFICATION, QR-MAINTAINABILITY, QR-USABILITY, QR-SECURITY, QR-COST-OPERATIONS, CON-SINGLE-BAND. Partial foundation only: FR-PUBLIC and FR-ACCESS. Product behaviour remains in docs/product/model; do not claim Google membership access or complete public content from this shell.

## Scope

Astro scaffold; existing tokens and src/public/brand/logo.png; minimal public and /band shells; existing Firebase client wiring; pnpm dev/build and meaningful shell tests; existing verification remains green. Application code/assets/tests/helpers stay within src/. Root contains metadata/configuration only.

Excluded: Google login/member authorization UI, private data queries or writes, rehearsals/availability/opportunities, repertoire, rehearsal focus, setlists, actual public editorial content, media hosting and new deployment pipelines. The /band shell is non-sensitive scaffolding, never an exposed member dashboard containing private data.

## Acceptance criteria

1. Frozen pnpm installation and pnpm dev produce reachable / and /band shells locally, using the existing tokens and logo without new visual identity or fabricated band content.
2. pnpm build produces deployable output; direct requests for both routes and the logo work in the built application, with no runtime server required for these shells.
3. The built output is compatible with the already-connected Cloudflare resource's verified build/output settings. Reuse native deployment ownership; do not create a parallel pipeline or require paid infrastructure. Capture preview evidence where the connection supports it; report actual deployment separately from local build success.
4. Existing Firebase client is wired only into browser code. With valid public configuration it initializes without build/server evaluation errors; the public shell performs no private data access. Missing configuration does not crash either empty shell or require CI credentials. Development emulator opt-in remains effective; production never connects to local emulators.
5. pnpm verify remains green, retaining security tests, Firestore emulator tests, design checks, ProductShape validation/integrity/doctor and type safety. New Astro/source checks and build/shell tests run in CI; Husky is retained.
6. Shells are usable by keyboard and on mobile/desktop, follow existing design guardrails and contain no secrets or private member data. The test command, if introduced, runs meaningful shell assertions and collects existing expected suites rather than silently passing zero tests.

## Dependencies and risks

Accepted baseline and existing design/tooling/Firebase scaffolds exist. Juan specified Astro for this slice. Cloudflare's connection exists per Juan; inspect its actual resource, branches, output and public environment variables before mapping a deployment. Astro Node and TypeScript compatibility must be checked before selecting pinned packages. Native plan mode is unavailable in this session; planning is saved for human review, not auto-approved.

No product dependency blocks this slice. Formal architecture rationale and stale bootstrap documentation require reconciliation during the slice. Missing Cloudflare account/resource access would block deployed evidence; it must not be replaced by guessed settings or a new token/pipeline.

## Affected behaviour and test impact

New runtime/build behaviour only: route/asset serving, browser initialization and source/build checks. Existing product scenarios remain unchanged and unimplemented here. Add meaningful shell integration assertions and browser runtime evidence; rerun existing suites to prove preservation.

## Existing decisions and quality expectations

Use docs/architecture/02-constraints.md and infrastructure.md; docs/design/foundations.md, tokens.md, components.md, patterns.md and enforcement.md. Juan's current instruction selects Astro and the first-slice boundary; it supersedes stale framework-candidate prose. No paid runtime, custom domain requirement, new visual values or weakening of private-data protection.

## Lifecycle / Ready evaluation

| Definition of Ready dimension | Verdict and evidence |
| --- | --- |
| Title | Met: executable web shell outcome |
| Description | Met: missing runtime/build/deployment path above |
| Actor / stakeholder | Met: maintainer and referenced future audiences |
| Priority | Met: Juan explicitly selected first |
| Dependencies | Met: scaffold exists; deployment mapping inspection is a named task/risk |
| Acceptance criteria | Met: observable boundaries above derive from Juan's explicit first-slice instruction; plan approval remains human |
| Scope | Met: shells/client/build only; feature exclusions explicit |
| Product rules | Met: accepted quality/constraint IDs; no semantic change |
| Affected behaviour | Met: new route/build/runtime scaffolding; no claim of business behaviour |
| Quality expectations | Met: cost/security/design/type safety/verification boundaries explicit |
| Test impact | Met: shell integration and browser evidence plus retained suites |
| Existing decisions | Met: provided references and explicit Astro instruction; no complete feature architecture required for this enabler |
| Unknowns / risks | Met: pinned tooling compatibility, hosting resource mapping and documentation drift surfaced; no invented solution to missing platform access |
| Additional project prerequisites | Met for this enabling boundary: accepted baseline/design/scaffold present; no unresolved product decision prevents shell planning |

Ready for solution review on the defined shell scope. No GitHub native state transition, Planned approval or Done verdict is asserted. GH-1 is now completed via merged PR #10; this file preserves the initial Ready evaluation. The Ready evaluation above is historical; current completion and verification evidence lives in [the completed plan](../completed/GH-1.md).

## ProductShape citations

<!-- pdac:cite id="ACT-MEMBER" digest="sha256:046bad46f7bea155aeb54f4a8c0d80dc1ec695474b202d37ed958c6deafbc43b" -->

<!-- pdac:cite id="ACT-VISITOR" digest="sha256:116dc0f3129b5cec87560365a655c96b944bd4852b90b61d9e028b9274504d9e" -->

<!-- pdac:cite id="CON-SINGLE-BAND" digest="sha256:59e879c69ee07f61737be895e059ea3b1be35d6f3a82236715821277082dfabb" -->

<!-- pdac:cite id="FR-ACCESS" digest="sha256:d204efca1c924cd6c70f21eea5b7d0c82d16f3ebbac6dd698e52d910a7db7c14" -->

<!-- pdac:cite id="FR-PUBLIC" digest="sha256:46aabeb5bd38ee43137c55e7fe8b7e108de20cd2b4d318c250de46c2494095c3" -->

<!-- pdac:cite id="QR-COST-OPERATIONS" digest="sha256:18df4d28e10c2b4f64596df6196e2fc404334d4854653a6c53abc424c790230c" -->

<!-- pdac:cite id="QR-MAINTAINABILITY" digest="sha256:40a7ffe79142cd37afaf6d04a8edcc62d666a539ad54de1c0357acc8244dc362" -->

<!-- pdac:cite id="QR-SECURITY" digest="sha256:cc17a6ca5aa934716df56692e158d82384992152e4f3fdfd57bc1a83ff1ca9e9" -->

<!-- pdac:cite id="QR-USABILITY" digest="sha256:bdeb7fc494fdad4f94d8c8b1ca67a0289ae7f31d39afab9a5a0250537c6e6f7b" -->

<!-- pdac:cite id="QR-VERIFICATION" digest="sha256:1a0f617f80f103442dddf61fc11a360e4ca9e023d6f18bcace259ffa3fa0e73e" -->
