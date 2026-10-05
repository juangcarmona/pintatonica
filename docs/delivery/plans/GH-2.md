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

- [ ] Record refined criteria and Ready disposition on GH-2; publish this plan in its single draft PR.
- [ ] Add meaningful failing controller/state and Google-provider rules tests before implementation.
- [ ] Implement browser controller, Firebase adapter and accessible `/band` access/dashboard states.
- [ ] Enforce Google plus active membership in rules without weakening existing ownership/provisioning checks.
- [ ] Reconcile affected runtime/security architecture and operational provisioning docs; preserve accepted model.
- [ ] Verify frozen install, security scan, full CI checks and browser/emulator allowed/denied/revocation/sign-out evidence.
- [ ] Configure the existing live Google provider/domains and verify public build configuration where permitted; provision verified member identity or report interactive blocker explicitly.
- [ ] Obtain the required independent Done audit, resolve findings, publish finished PR, and integrate only with current-head checks and scoped authorization.
- [ ] Deploy/observe production and close out with actual results; archive plan and record review entry.

## Test plan

Unit tests exercise real access-controller transitions via a narrow injected identity/membership port: signed-out, pending, active Google member, non-member, inactive member, wrong provider, lookup failure, auth failure, revocation, stale identity callbacks and sign-out failure. Emulator tests prove direct allowed/denied reads/writes, including non-Google identity with active record and immutable membership. Preserve all existing suites; build tests assert no member data in static markup.

Browser runtime evidence covers mobile/desktop, keyboard, missing configuration, Google-emulator sign-in, recognised identity, denied/non-member state, membership revocation and sign-out. The emulator harness uses only `demo-pintatonica`, synthetic identities and local emulator endpoints. Live preview/production evidence separates successful deployment from real Google sign-in, which needs Juan if no authenticated interactive surface is available.

Definition of Done: acceptance and plan completeness, meaningful tests, CI-derived quality checks, data-layer security, architecture/design consistency, current documentation and ProductShape validation, linked evidence, independent audit, human-owned judgements under Juan's scoped FF authorization, and explicit limitations. Unrunnable checks never pass. Runtime evidence is required for this user-facing change; no personal addresses, auth tokens or credentials in committed logs/screenshots.

## Progress and deviations

Planning started from updated main `0517f31`. Existing rules lack provider enforcement; Authentication configuration is absent (`CONFIGURATION_NOT_FOUND`). Operational setup is part of this slice; no product gap requires a Product Change. Earlier merged PR review-log debt (#10/#11) remains non-blocking.
