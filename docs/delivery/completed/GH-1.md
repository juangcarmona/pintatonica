# Executable web shell â€” implementation plan

Work item: [GH-1 â€” Executable web shell](https://github.com/juangcarmona/pintatonica/issues/1). Branch: work/GH-1-executable-web-shell. Only this slice is selected.

Planning mode was unavailable during proposal. Juan subsequently approved the saved plan and explicitly authorized verified implementation, integration and deployment without a further approval pause. Ready evaluation remains recorded in GH-1.

## Proposal

Establish the first executable path from the current repository to an Astro-built branded public shell and non-sensitive /band shell on the existing Cloudflare connection. Reuse design assets, Firebase wiring, pnpm and verification. This realizes a delivery foundation for FR-PUBLIC/FR-ACCESS and part of QR-VERIFICATION, not complete product behaviour. QR-MAINTAINABILITY, QR-USABILITY, QR-SECURITY, QR-COST-OPERATIONS and CON-SINGLE-BAND constrain the work.

Included/excluded scope and acceptance criteria are owned by the linked refined item; the [ordered GitHub delivery backlog](https://github.com/juangcarmona/pintatonica/issues?q=is%3Aissue) names later feature slices. Nothing here changes docs/product/model or creates a Product Change.

## Design

### Runtime and build approach

Use Astro's static output for both shell routes, with srcDir pointing at src/ and publicDir at src/public/. Keep configuration in src/astro.config.mjs and pass its explicit path from package scripts, so executable JavaScript remains under src/; keep package manifests and repository metadata at root. Output is ignored dist/. Keep existing src/firebase, styles, tooling and tests in place. No template generator may replace the repository, tokens, assets, hooks or workflows.

Proposed application additions: src/pages/index.astro, src/pages/band/index.astro, a small shared layout under src/layouts/, minimal token-based shell styles under src/styles/, and a browser-only entry module under src/ for existing Firebase initialization. Reuse src/public/brand/logo.png at /brand/logo.png; do not duplicate design token values or add a new font/UI framework.

Build public and /band shell HTML without importing Firebase during server/build evaluation. Load the existing Firebase client from browser-only code when required PUBLIC_ configuration is valid; when configuration is absent, render the empty shell without initializing the SDK or private data requests. Do not add a Firebase status panel to product UI. Preserve the existing singleton and DEV-only emulator opt-in; no sign-in, membership lookup or Firestore reads/writes belong in this slice.

Static hosting is a low-cost fit for an empty shell and leaves client-side Firebase behaviour for later slices. It does not pretend that static HTML itself enforces member authorization; slice 2 implements the access UX and data-layer checks before private features exist. No React/Vue/Svelte integration, server adapter, Cloud Functions or custom API server is needed for this slice.

### Commands and verification integration

Select exact compatible Astro and source-checking package releases during implementation after inspecting their current documented Node/TypeScript requirements; update only the pnpm lockfile. Do not guess package versions in this proposal. Preserve Node >=22, pnpm pin, Java >=21 and Husky. If Astro requires a higher Node patch than the existing declared floor, document and enforce that compatibility change instead of falsely claiming all Node 22 installations work.

Add pnpm dev and pnpm build using the explicit src/ configuration path. Add pnpm test:web for Node-based built-route/asset HTTP smoke assertions under src/tests/web/, with any serving/test helpers under src/tooling/web/. Proposed pnpm test aggregates existing design/security tests with the shell suite; firebase:rules:test retains its emulator-specific command and remains in pnpm verify. Expand typecheck to cover Astro application source as well as the current Firebase code. Make pnpm verify build before built-output smoke tests; make verify:fast retain its fast suites/source checking. No duplicate emulator suite or bypassed check.

Read the actual verify and snapshot workflows when implementing. Preserve snapshot publication and existing security:check; add build/test enforcement to the canonical package scripts rather than duplicating logic in YAML/hooks. Frozen-lock installation and existing Java setup remain. Ensure shell tests collect actual assertions and fail on missing output rather than skipping. Browser initialization still needs real runtime evidence, because static HTML tests cannot prove it.

### Cloudflare deployment mapping

Juan reports the existing connection is present; old arc42 prose says otherwise. Inspect the correct connected resource before modifying its configuration. Reuse its native Git integration and free tier. Set the build command to pnpm build and its static output to dist according to the verified host type; if the resource is Workers static assets rather than Pages, use that resource's documented static-assets mapping. Do not guess a Pages project name, create a second resource, provision a new account or add deployment pipelines/tokens.

Only necessary PUBLIC_FIREBASE_* configuration belongs in ordinary build variables/ignored local configuration; no Admin credentials, service accounts or private values. CI's shell build must work without production credentials/configuration. Do not enable private data calls in previews as a consequence of sharing production public Firebase configuration. Confirm direct navigation to /band works without an assumed SPA fallback. Deployability and actual published runtime evidence are separate claims; capture native preview evidence where supported and identify any remaining post-merge production verification.

### Architecture impact, drift and trade-offs

Astro/build and browser Firebase wiring affect arc42 strategy, building-block, runtime and deployment views; update those through architecture-docs during implementation and cite accepted intent. A lasting framework/static-shell decision needs an ADR through the installed process; resolve the records location before creating it, since docs/adr does not yet exist. Do not invent full MVP storage/editing architecture during the shell.

Observed drift: AGENTS current gate still forbids application delivery; lifecycle describes an empty accepted model, unborn main and missing workflows; architecture links the now-completed change at obsolete active paths and describes Cloudflare as unconnected. The current accepted baseline, existing remote main/CI and Juan's explicit delivery instruction supersede those historical claims. Reconcile only affected documentation when the shell is implemented; this planning task does not rewrite architecture or product intent.

Choose a minimal manual Astro scaffold over a generated demo app to preserve the greenfield scaffold and design. Choose static shells over SSR because no server behaviour is required yet. Choose built-route smoke tests plus real browser checks over a new broad E2E framework for two empty surfaces; add further automation when later behaviour warrants it. Keep Cloudflare native delivery ownership rather than constructing a parallel deployment system.

## Tasks

1. Re-read the ready item, current source/workflows and branch protection; inspect the connected Cloudflare resource and public build settings. Confirm package compatibility, records location and precise static-output mapping. Record findings; never silently invent access or configuration.
2. Pin and install the minimal Astro/source-check dependencies with pnpm. Add explicit src/ config, src-local TypeScript/Astro configuration and commands. Preserve existing suites, pnpm lock, hooks and CI/snapshot semantics.
3. Add the shared token-based layout, / and /band non-sensitive shells and existing logo references. Keep application source/assets/helpers/tests inside src/ and avoid fabricated band content or new identity values.
4. Wire Firebase from a guarded browser-only entry. Preserve singleton and development emulator behaviour. Prove missing configuration leaves the shells usable, configured browser initialization works, and no private data query/login workflow is added.
5. Add built-output HTTP route/asset smoke tests and command aggregation, plus application-wide source checking. Integrate build/tests into canonical verification and ensure clean/frozen installs reproduce the result.
6. Reconcile affected repository/arc42/operations documentation and record the framework/static-shell rationale through the ADR process. Verify official ProductShape citations, update dev/build/configuration instructions and preserve source-of-truth boundaries.
7. Match the existing Cloudflare integration to the verified build output without adding a deployment pipeline or paid service. Capture available native build/preview logs and both-route runtime evidence; name any platform-access blocker or remaining production verification.
8. Run the full current CI-derived verification, security:check and runtime checks. Have the lifecycle's independent Done auditor reconcile approved tasks with the diff, then present evidence to Juan. Stop for human review; integrate only through the existing lifecycle.

These are implementation steps inside the selected slice, not additional backlog items. Completion evidence is recorded below.

## Test plan

| Evidence | Observable assertion | Definition of Done coverage |
| --- | --- | --- |
| Frozen pnpm install + source checking | Clean environment installs deterministically; Astro and Firebase application source pass checks | Quality checks, reproducibility, maintainability |
| pnpm dev runtime | / and /band load locally; logo/styles work; keyboard/mobile/desktop use is sound | Acceptance, runtime evidence, design/usability |
| pnpm build + pnpm test:web | Built server serves both routes and logo; missing output or broken URLs fails tests | Implementation completeness, automated tests, deployability |
| Real browser checks with absent and valid public configuration | Shells do not crash without config; configured client initializes only in browser; no private-data traffic or login feature | Runtime evidence, security, architecture |
| Emulator/production configuration checks | Explicit dev opt-in uses local emulators; production output never selects them | Security, regression preservation |
| Existing design, security and Firestore suites | Expected suites/test counts collected and pass; real scanner detects/redacts synthetic secret; access-denial rules unchanged | Tests, security, retained safeguards |
| Current CI commands plus added build/shell tests | security:check and verify pass on the reviewed tree; snapshot workflow still works | Deterministic verification, evidence |
| Cloudflare native build/output inspection and available preview runtime | Verified resource can consume the build; both routes/assets work on a preview if available; no paid runtime/new deployment pipeline | Deployment quality, cost/operations |
| Documentation and ProductShape citations | Accepted model unchanged, citations current, affected instructions reflect actual build | Documentation, product/spec consistency |
| Independent task/diff audit and Juan review | Every task evidenced or explicitly dropped, deliberate limits identified, no self-approved Done | Human review, completeness, known limitations |

At Done, list current-head command results and runtime evidence, not merely earlier scaffold checks. A missing check or inaccessible deployment evidence is reported explicitly. The independent auditor reports findings; Juan approves the approach and final change. The initial proposal did not assert implementation; the completed implementation and checks are evidenced below.

## Delivery handoff

Juan approved publication of the nine delivery issues and this plan-only draft PR. GH-1 passed Ready and Juan approved Planned. GH-2 through GH-9 remain unrefined and unstarted. Implementation continued on this branch under explicit continuous-delivery authorization.

## ProductShape citations

<!-- pdac:cite id="CON-SINGLE-BAND" digest="sha256:59e879c69ee07f61737be895e059ea3b1be35d6f3a82236715821277082dfabb" -->

<!-- pdac:cite id="FR-ACCESS" digest="sha256:d204efca1c924cd6c70f21eea5b7d0c82d16f3ebbac6dd698e52d910a7db7c14" -->

<!-- pdac:cite id="FR-PUBLIC" digest="sha256:46aabeb5bd38ee43137c55e7fe8b7e108de20cd2b4d318c250de46c2494095c3" -->

<!-- pdac:cite id="QR-COST-OPERATIONS" digest="sha256:18df4d28e10c2b4f64596df6196e2fc404334d4854653a6c53abc424c790230c" -->

<!-- pdac:cite id="QR-MAINTAINABILITY" digest="sha256:40a7ffe79142cd37afaf6d04a8edcc62d666a539ad54de1c0357acc8244dc362" -->

<!-- pdac:cite id="QR-SECURITY" digest="sha256:cc17a6ca5aa934716df56692e158d82384992152e4f3fdfd57bc1a83ff1ca9e9" -->

<!-- pdac:cite id="QR-USABILITY" digest="sha256:bdeb7fc494fdad4f94d8c8b1ca67a0289ae7f31d39afab9a5a0250537c6e6f7b" -->

<!-- pdac:cite id="QR-VERIFICATION" digest="sha256:1a0f617f80f103442dddf61fc11a360e4ca9e023d6f18bcace259ffa3fa0e73e" -->

## Implementation progress and scoped authorization

Juan approved this plan and directed continuous implementation, verification, integration and Cloudflare deployment without another approval pause on 2026-10-04. This is GH-1-specific authorization, not a fabricated GitHub approval vote or a lifecycle change for other issues.

Completed: compatible pinned tooling; src-local Astro/config/layout/pages/styles; guarded Firebase browser entry; built-route/configuration tests; browser evidence for absent config, configured development emulators, and configured production with emulator opt-in ignored; affected architecture/contributor documentation and ADR-0001.

Recorded implementation choices: Node floor is 22.12; TypeScript 6.0.2 replaces 7.0.2 for Astro checker compatibility. Root wrangler.jsonc is declarative metadata required for existing native build discovery; all executable files remain under src/. The default ADR location docs/adr/ is selected under the greenfield delivery authorization. Playwright's library drives repeatable runtime evidence without a broad E2E framework. Failed Chromium download was replaced with installed Edge; test fixture encoding was corrected to UTF-8 and the dev toolbar was disabled to keep shell observations explicit.

Remaining at this checkpoint: final verification, independent audit, current-head CI, deployment evidence and integration/archival.

## Verification and delivery reconciliation

[Durable command/runtime evidence](../evidence/GH-1/README.md) links each test lane, all three Firebase configuration modes, inspected screenshots and the actual Cloudflare deployment. GitHub verification passed on implementation head 885f600; the final head is checked separately.

Tasks 1–6 have implementation/documentation evidence. Task 7 has verified static-output mapping, Wrangler dry-run/deployment and live browser evidence. Inspection/repair of the native Build job is unfulfilled: the Builds API returns Forbidden and no dashboard browser is enabled. The repository/application build and manual deployment work; native automation is not claimed fixed. Task 8 has full verification and an independent audit; final-head audit/integration follows. This limitation is recorded, not silently dropped or presented as a passed native check.

Initial audit corrections: repaired Windows encoding, removed obsolete present-tense proposal claims, updated source-check scope and persisted separate runtime/command evidence. No product semantics were changed.

## Final independent audit and integration handoff

A fresh independent audit of head a90bce29b395a579cab219942703973a3e4f29e2 found no blocking application defect and judged AC1–AC6 evidenced for the authorized executable-shell scope. It identified native Builds inspection/repair as a disclosed operational limitation, not a green native job. Juan's scoped continuous-delivery instruction supplies the human-pause waiver; no review vote is fabricated.

Current-head GitHub verification passed: [run 37193955852](https://github.com/juangcarmona/pintatonica/actions/runs/37193955852). Actual deployment and runtime evidence are linked in the evidence directory. Affected architecture/design/operations documentation has been reconciled before archival; design tokens and product intent were unchanged.

All shell implementation tasks are supported. Native build diagnostic/repair remains an explicit unmet operational subtask because the documented Builds API requires Workers CI permissions unavailable in the current session and no dashboard browser is enabled. Do not claim Git-driven automation repaired. No additional pipeline or credentials are added to work around that access boundary.
