---
title: Crosscutting Concepts
arc42-section: "08"
description: Shared architectural mechanisms applied across multiple building blocks.
---

# Crosscutting Concepts

## Availability persistence and time representation

GH-3 realizes BR-AVAILABILITY through the existing UID-owned Firestore paths. Weekly rows contain weekday numbers (Sunday 0), start/end clock strings; override document IDs are civil YYYY-MM-DD dates with replacement interval arrays. An empty replacement and absence of a document stay distinct. The pure transformer uses UTC only as a civil-date arithmetic carrier; current date is derived explicitly with Europe/Madrid, so client timezone and DST cannot shift calendar dates.

The client validates and normalizes interval unions before writes. Server acknowledgements, not local pending snapshots, supply saved state. Active roster and each member's weekly/override records use live subscriptions; form actions write only the authenticated UID's paths. Existing rules enforce ownership and membership independently. No backend process, new service, index or paid capacity is needed. Source and regression evidence: [availability](../../src/band/availability.ts), [workspace](../../src/band/availability-view.ts), [tests](../../src/tests/web/availability.test.mjs).

## Visual Token Consistency

### Scope

The repository has a framework-neutral visual foundation and enforcement mechanism shared by future UI implementation and existing design verification. Its design meaning and acceptance status belong to [docs/design](../design/README.md).

### Mechanism

CSS custom properties provide one canonical token-value source. The source checker enforces token usage across eligible UI files rather than repeating values in components. Design assertions test the shared foundation. The authoritative policy, scope and exceptions are owned by the [design enforcement documentation](../design/enforcement.md); this section describes the mechanism, not brand values or component behaviour.

### Evidence

[tokens.css](../../src/styles/tokens.css), [checker configuration](../../src/tooling/design/config.mjs), [checker](../../src/tooling/design/check-design.mjs) and [tests](../../src/tests/design/) establish the mechanism. The checker scans the implemented public shell and member access UI; actual counts are recorded by each verification run.

## Firebase Identity and Data Access

### Scope

The mechanism spans the browser access controller, SDK and Firestore security boundary. Accepted intent belongs to ProductShape; this section explains its realization.

### Mechanism

[client.ts](../../src/firebase/client.ts) initializes shared Auth/Firestore handles. The existing app's [public web configuration](../../src/firebase/public-config.ts) is the reproducible native-build default; a complete explicit build override may replace it. Partial overrides fail closed instead of mixing project identities. The SDK never initializes during static build evaluation. Development-only emulator opt-in requires a demo project identifier; production never connects to local emulators.

[firestore.rules](../../src/firebase/firestore.rules) independently checks the token's Google sign-in provider and a server-side active membership record. A Google identity can read its own membership status; active members may read the roster and permitted private collections. Ownership checks still restrict availability writes; clients cannot write membership records. Unmatched collections remain denied. Membership provisioning uses the verified Firebase UID outside the member-facing flow; procedures belong to the [membership runbook](../operations/member-access.md).

### Evidence

The [emulator-backed rules tests](../../src/tests/firebase/firestore.rules.test.mjs) exercise direct denied unauthenticated/non-member/inactive/non-Google requests, permitted member-owned writes and protected membership mutation. The [access tests](../../src/tests/web/access.test.mjs) and [runtime harness](../../src/tooling/web/verify-access-runtime.mjs) prove the separate UI gate. Scheduling and musical features remain later slices. Deployment and live-account evidence is recorded in the GH-2 delivery evidence, not inferred from source inspection.

<!-- pdac:cite id="BR-MEMBERSHIP" digest="sha256:409b040a33d66b37f725e3cc707f503832341a2f52c3504ee3fea3c851a5cd45" -->

<!-- pdac:cite id="QR-SECURITY" digest="sha256:cc17a6ca5aa934716df56692e158d82384992152e4f3fdfd57bc1a83ff1ca9e9" -->

<!-- pdac:cite id="BR-AVAILABILITY" digest="sha256:3846c5660be556161069445fe1cf8c8e96bb2fe5df0cc36121a5d8a2def914b3" -->
