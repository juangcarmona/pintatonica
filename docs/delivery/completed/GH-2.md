# GH-2 — Recognised member access

Issue: [GH-2](https://github.com/juangcarmona/pintatonica/issues/2). Product authority: `docs/product/model`; refinement: [GH-2-refinement.md](../proposals/GH-2-refinement.md).

## Proposal

Turn the existing `/band` shell into a Google-authenticated, active-membership-gated entry and minimal recognised-member dashboard. Deliver only UC-ACCESS, the access portion of FR-ACCESS, BR-MEMBERSHIP, SB-MEMBER-IDENTIFIED and SB-NON-MEMBER-DENIED, under existing QR-SECURITY, QR-USABILITY, QR-COST-OPERATIONS, QR-MAINTAINABILITY and QR-VERIFICATION.

Exclude scheduling, repertoire, setlists, granular roles, administrator UI, public-site polish and ProductShape changes. Juan is the initial live tester; his address remains outside committed documents and application allowlists.

Juan authorized the GH-2 FF loop on 2026-10-05: refine, plan, implement, verify, independent audit, integration and deployment where possible without another routine approval pause. This is scoped authorization, not a fabricated GitHub review or a waiver of security/verification. Native plan mode is unavailable; this durable plan records the approach before implementation. No branch protection may be bypassed.

## Design

Preserve static Astro pages and the existing Firebase/Cloudflare topology. `/band` delivers only public access UI markup; no member information is rendered at build time. A browser access controller observes Firebase identity and the user's membership document. Every identity transition clears prior member information immediately; stale asynchronous results cannot restore it. Membership changes/revocation update the view through a live document listener. Sign-out clears the private view immediately and never reports successful sign-out if it fails.

Use the Firebase SDK Google popup flow from an explicit user action, keeping the existing Firebase auth domain. Redirect sign-in is not selected because cross-origin storage restrictions would require additional hosting/proxy work. Verify popup operation and usable errors on desktop/mobile; an interactive Google-account action remains Juan-owned.

Firestore independently requires a Google sign-in provider claim and `members/{uid}.active == true`. Only that Google identity may read its own membership status; active members may read the roster. Clients cannot provision membership. Display the manually provisioned name with a safe authenticated-display-name fallback; never use HTML injection or a roster name picker.

The default is denial: missing Firebase configuration, auth failure, absent/inactive membership, unsupported provider, failed membership lookup and pending checks withhold private content. Accessible status text distinguishes loading, signed-out, denied and failure. Preserve existing design tokens and all public routes.

Initialize/enable the existing project's Firebase Authentication through the installed Firebase CLI's supported provisioning flow if possible; no billing upgrade. Add only required auth domains while preserving the existing list. Use existing public web configuration and local authenticated operator sessions. Provision Juan's membership only against a verified Firebase identity, not a guessed UID. Production OAuth completion cannot be impersonated. Preview authentication targets the same existing project and only explicitly authorized stable preview origins; do not authorize wildcard domains.

## Tasks

- [x] Record refined criteria and Ready disposition on GH-2; publish this plan in its single draft PR.
- [x] Add meaningful failing controller/state and Google-provider rules tests before implementation.
- [x] Implement browser controller, Firebase adapter and accessible `/band` access/dashboard states.
- [x] Enforce Google plus active membership in rules without weakening existing ownership/provisioning checks.
- [x] Reconcile affected runtime/security architecture and operational provisioning docs; preserve accepted model.
- [x] Verify frozen install, security scan, full CI checks and browser/emulator allowed/denied/revocation/sign-out evidence.
- [x] Configure the existing live Google provider/domains and verify public build configuration where permitted; provision verified member identity or report interactive blocker explicitly.
- [ ] Obtain the required independent Done audit, resolve findings, publish finished PR, and integrate only with current-head checks and scoped authorization.
- [x] Reconcile affected architecture/operations and archive this delivery plan before integration; no ProductShape semantic delta.
- [ ] Deploy/observe production and close out with actual results; offer the optional review after integration.

## Test plan

Unit tests exercise real access-controller transitions via a narrow injected identity/membership port: signed-out, pending, active Google member, non-member, inactive member, wrong provider, lookup failure, auth failure, revocation, stale identity callbacks and sign-out failure. Emulator tests prove direct allowed/denied reads/writes, including non-Google identity with active record and immutable membership. Preserve all existing suites; build tests assert no member data in static markup.

Browser runtime evidence covers mobile/desktop, keyboard, missing configuration, Google-emulator sign-in, recognised identity, denied/non-member state, membership revocation and sign-out. The emulator harness uses only `demo-pintatonica`, synthetic identities and local emulator endpoints. Live preview/production evidence separates successful deployment from real Google sign-in, which needs Juan if no authenticated interactive surface is available.

Definition of Done: acceptance and plan completeness, meaningful tests, CI-derived quality checks, data-layer security, architecture/design consistency, current documentation and ProductShape validation, linked evidence, independent audit, human-owned judgements under Juan's scoped FF authorization, and explicit limitations. Unrunnable checks never pass. Runtime evidence is required for this user-facing change; no personal addresses, auth tokens or credentials in committed logs/screenshots.

## Progress and deviations

Planning started from updated main `0517f31`. The original rules lacked provider enforcement; the new direct non-Google test reproduced the unintended access before the fix. Authentication originally returned `CONFIGURATION_NOT_FOUND`; the existing project's supported CLI provisioning flow enabled Google on 2026-10-05 while billing remained disabled. The first provisioning attempt duplicated an automatically added redirect URI; retry without that redundant field succeeded. Rules were deployed after emulator tests passed.

Native-build deviation: the verified Firebase web app's public identifiers are now repository-owned defaults, with complete environment overrides supported and partial overrides denied. This makes native Cloudflare deployment reproducible without inaccessible dashboard build settings. API restrictions were inspected; the browser key is public identification, not authorization. Gitleaks requires an exact-key exception limited to its Google/generic key detectors; a real-scanner regression proves other Google keys and ignored synthetic GitHub secrets remain blocked. No credential, token, member email or service-account key is committed.

Runtime evidence observed Google-emulator popup sign-in, non-member denial, recognition after manual provisioning, revocation and sign-out on desktop/mobile. Initial rules tests: 9 passing; controller tests: 12 passing. Screenshots were inspected. A runtime-harness observation initially referenced an unexported app handle; using the actual Auth app handle fixed the harness. Its explicit demo/project guard remains enforced.

GH-2 preview was published for the initial tester. After Juan's real Google sign-in, the matching Google-linked, email-verified Firebase identity was observed and its membership was provisioned against the verified UID. A first write attempt exposed array query-parameter encoding in the CLI helper; an atomic Firestore write mask correctly provisioned only active/name fields. Neither email nor UID was stored in repository artifacts. Juan explicitly confirmed the preview shows the recognised greeting and that sign-out returns to the signed-out state (2026-10-05, “Yes, both work”). This live confirmation is separate from synthetic emulator evidence. No product gap requires a Product Change. Earlier merged PR review-log debt (#10/#11) remains non-blocking.

Verification observed before final publication: frozen install, full `pnpm verify` with 58 tests, security scan, 17 current architecture citations and two current plan citations. Markdown validation uses the existing architecture Markdown configuration; the unconfigured default 80-column style check initially reported line-length-only issues in repository-style prose, while the project configuration reported zero issues. Full verification is repeated before final integration. Browser evidence and verification transcript are linked from `docs/delivery/evidence/GH-2/README.md`.

Independent audit identified a back/forward-cache lifecycle defect: pagehide stopped observation permanently while preserving the member DOM. The session now clears identity on suspension and creates fresh observers on persisted restoration. A regression test and demo browser lifecycle-event exercise cover revocation while suspended and subsequent re-admission. This is a security-state lifecycle correction, not a product change. Actual BFCache eligibility across browser engines is not claimed. The new shell process inherited Java 17; the already installed Temurin 21 was selected only for verification processes, without repository paths or machine configuration changes.

Known limitation: the SDK bundle emits Vite's existing 500 kB chunk warning; builds still succeed, and no server/UI framework was added. The basic dashboard delivers access only; musical workflows and GH-9 visual feedback remain explicitly out of scope. Popup operation was observed in local mobile-size/desktop browsers and confirmed with Juan's real account; no claim is made for every mobile browser engine.

Integration handoff: commit `38d44c08eca74e14ed746bff9a2bf0a3bd898c5e` passed GitHub CI and native Cloudflare preview. Anonymous preview entry assets match the verified local build. The independent audit confirmed the lifecycle fix and linked evidence, with no remaining code blocker; its pending remote-evidence gap is closed by the linked published-check record. Juan's GH-2 FF authorization applies to the stated Done judgement dimensions and verified scope, without an agent granting human approval. The archived final head must still pass its own checks and fresh independent audit before merge. Integration, production and optional review are post-handoff outcomes recorded in PR #12 / issue #2; unchecked tasks above are not claimed complete prematurely.

<!-- pdac:cite id="BR-MEMBERSHIP" digest="sha256:409b040a33d66b37f725e3cc707f503832341a2f52c3504ee3fea3c851a5cd45" -->

<!-- pdac:cite id="QR-SECURITY" digest="sha256:cc17a6ca5aa934716df56692e158d82384992152e4f3fdfd57bc1a83ff1ca9e9" -->
