# GH-2 — Recognised member access

Refinement draft for [issue #2](https://github.com/juangcarmona/pintatonica/issues/2), selected by Juan on 2026-10-05. Product authority: `docs/product/model`. No product model changes or implementation in this refinement.

## Problem, actor and priority

ACT-MEMBER needs to enter `/band` with a recognised Google identity and active Pintatónica membership. The deployed GH-1 shell currently contains no authentication or membership flow. Juan selected this as the next slice; no numeric priority is required.

## Scope and product references

Deliver sign-in/out, membership evaluation and a minimal recognised-member dashboard. References: UC-ACCESS, FR-ACCESS (access portion), BR-MEMBERSHIP, QR-SECURITY, SB-MEMBER-IDENTIFIED, SB-NON-MEMBER-DENIED. QR-USABILITY, QR-COST-OPERATIONS, QR-MAINTAINABILITY and QR-VERIFICATION remain applicable.

Exclude musical features, availability editing, administration UI, automated membership provisioning, granular roles and unrelated public-site changes. Shared editing obligations in FR-ACCESS remain for their later slices. Keep the existing static Astro/Cloudflare and Firebase architecture.

## Acceptance criteria

1. A signed-out visitor requesting `/band` can initiate Google sign-in; private dashboard data is withheld. Public pages remain accessible.
2. An authenticated Google identity with active membership reaches the member dashboard and is recognised without selecting a member name (SB-MEMBER-IDENTIFIED). Membership is not hard-coded to the four currently known people.
3. Authenticated non-members and inactive members are denied private dashboard access and direct private reads/writes (SB-NON-MEMBER-DENIED and FR-ACCESS). UI bypass does not change the result.
4. A non-Google authenticated identity cannot gain private access merely by having an active membership record (BR-MEMBERSHIP). Enforce the Google identity and active-membership conditions at the data boundary.
5. Sign-out withholds private dashboard information and returns to the signed-out state. Pending, cancelled/failed sign-in and failed membership checks do not reveal private data or imply access was granted.
6. Membership provisioning remains manual and outside member-facing flows; clients cannot create or alter membership records. Member identity comes from the authenticated identity and its membership association.
7. Access states and actions are usable by keyboard and on mobile/desktop, use existing design tokens, and preserve the zero-cost/security constraints. Current full verification, meaningful access/rules tests and runtime evidence demonstrate both allowed and denied paths.

## Dependencies, operational inputs and risks

GH-1 is merged and deployed. Existing Firebase client, rules and emulator tests are available. Existing rules check active membership but not the Google provider claim; closing this is an implementation consistency fix, not new product intent.

Juan confirmed that he is the initial live member/tester, using the Google identity supplied privately in the conversation. Do not commit his email address or put it into application environment variables as an authorization allowlist. Manually provision the membership against the verified Firebase user ID outside the member-facing flow.

Read-only checks on 2026-10-05 against `pintatonica-band` returned HTTP 404 for both the Google provider and Authentication project configuration; the latter diagnostic was `CONFIGURATION_NOT_FOUND`. Authentication initialization and Google provider setup are therefore pending operational prerequisites. No remote configuration was changed. Before production acceptance, initialize Authentication, enable Google sign-in, and verify required authentication domains and public Firebase build configuration. No secret/token or service-account key is requested. Emulator verification can proceed independently of production provisioning.

Preview deployments may address production Firebase; their authentication/data policy must be checked before live private-access testing. No additional project/service is assumed. The provisional architecture data shape includes a role field, but this slice must not use it to introduce administrator or granular product permissions.

## Affected behaviour, test impact and existing decisions

New behaviour: Google sign-in/out, identity recognition, membership-gated dashboard and security-layer denial. Existing architecture: `docs/architecture/infrastructure.md`, `docs/adr/0001-build-static-shells-with-astro.md`; design: `docs/design/components.md`, `docs/design/patterns.md`, canonical `src/styles/tokens.css`.

Verify SB-MEMBER-IDENTIFIED, SB-NON-MEMBER-DENIED, inactive membership and non-Google active-record denial. Test client state transitions including errors/sign-out and direct data requests independently of hidden UI. Exact implementation and test design belong to propose.

## Definition of Ready evaluation

| Dimension | Evaluation |
| --- | --- |
| Title | Met: recognised member access |
| Description | Met: deployed shell lacks access flow |
| Actor / stakeholder | Met: ACT-MEMBER; Juan confirmed as initial live tester |
| Priority | Met: Juan selected slice 2 |
| Dependencies | Identified: GH-1 complete; production auth/provisioning requires operational verification |
| Acceptance criteria | Met: derived from accepted intent; Juan authorized the scoped FF loop |
| Scope | Met: access only; exclusions explicit |
| Product rules | Met: canonical references and access portion identified |
| Affected behaviour | Met: access lifecycle and data-layer protection |
| Quality expectations | Met: existing security/usability/cost/verification obligations |
| Test impact | Met: allowed and denied paths plus client states |
| Existing decisions | Met: existing architecture/design referenced |
| Unknowns / risks | Named: live auth configuration, initial identity/provisioning and preview data safety |
| Additional project prerequisites | Met: accepted baseline, architecture and design established |

Ready: product intent is defined; operational setup is a named delivery task and live acceptance dependency, not an invented product decision. Juan authorized the scoped FF loop on 2026-10-05; the separate GH-2 plan records approach and implementation boundaries. No Done verdict is asserted. Review-log entries for merged PRs #10 and #11 remain outstanding and do not block refinement.
