---
title: Crosscutting Concepts
arc42-section: "08"
description: Shared architectural mechanisms applied across multiple building blocks.
---

# Crosscutting Concepts

## Shared metadata and public projections

Private shared metadata is mutable only by admitted members. Browser transactions read revisions, reject stale drafts, and write private records plus explicitly selected public whitelists (or delete those whitelists when unselected). Rules validate both projected after-states, including absence on unpublish; read security is document-level, never simulated by hiding fields in UI. Public readers reach publicSongs (title, artist, separate public media URL) and publicGigs (name, date/time, venue, public information). Internal links, focus, setlists and preparation notes never enter those projections. Safe link validation rejects executable schemes and embedded credentials; following a link does not alter external provider permissions.

Schema, rules and tests remain repository-managed; current mutable repertoire lives in Firestore under [ADR-0002](../adr/0002-store-shared-songs-with-safe-public-projections.md). Source: [validation](../../src/band/repertoire.ts), [transactions](../../src/band/repertoire-store.ts), [rules](../../src/firebase/firestore.rules). Atomic rule validation uses the official [Firestore after-state primitives](https://firebase.google.com/docs/reference/rules/rules.firestore).

Private rehearsal preparation updates only song/focus fields with its own revision, retaining confirmed attendance/time. Setlists refer to repertoire and either a rehearsal or gig; transaction reads ensure references still exist before saving. Native shared editors keep dirty drafts during snapshots and require explicit reload after conflict. Source: [preparation](../../src/band/preparation-view.ts), [setlists](../../src/band/setlists-view.ts), [gigs](../../src/band/gigs-view.ts). This extends the existing consistency mechanism; it adds no service or topology.

<!-- pdac:cite id="FR-PREPARATION" digest="sha256:0bc5dae67dd450f814bafba786a9bcb657ecba07acada44b3c9f3113ee70b50f" -->

## Confirmation persistence

The admitted workspace composes a live rehearsal collection view alongside availability. Explicit client writes snapshot civil date/clock values, required/available/expected UIDs and display names, and the confirming UID. Separate attendance validation and Madrid-time upcoming selection are pure transformations in [rehearsals.ts](../../src/band/rehearsals.ts); [rehearsals-view.ts](../../src/band/rehearsals-view.ts) owns Firestore interaction and DOM lifecycle. The random document identity is retained across a failed attempt/retry; pending controls stay disabled, and only server-confirmed collection snapshots populate shared saved rehearsals. Submission rechecks the clock, and a disposable minute timer removes finished rehearsals even without data changes; unchanged visible IDs avoid unnecessary timer rerenders. Existing membership rules protect both read and write. No calculation persists a rehearsal, no external calendar integration is introduced, and loss of admission disposes both views/listeners/timers.

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

The [emulator-backed rules tests](../../src/tests/firebase/firestore.rules.test.mjs) exercise direct denied unauthenticated/non-member/inactive/non-Google requests, permitted member-owned writes and protected membership mutation. The [access tests](../../src/tests/web/access.test.mjs) and [runtime harness](../../src/tooling/web/verify-access-runtime.mjs) prove the separate UI gate. Current scheduling, confirmation, repertoire, preparation and setlist harnesses prove permitted saves and security-layer denial. Public browser queries read only strict publicSongs/publicGigs projections; private notes and resource lists are never copied into those projections. Deployment and live-account evidence is recorded in the GH-2 delivery evidence, not inferred from source inspection.

<!-- pdac:cite id="BR-MEMBERSHIP" digest="sha256:409b040a33d66b37f725e3cc707f503832341a2f52c3504ee3fea3c851a5cd45" -->

<!-- pdac:cite id="QR-SECURITY" digest="sha256:cc17a6ca5aa934716df56692e158d82384992152e4f3fdfd57bc1a83ff1ca9e9" -->

<!-- pdac:cite id="BR-AVAILABILITY" digest="sha256:3846c5660be556161069445fe1cf8c8e96bb2fe5df0cc36121a5d8a2def914b3" -->

<!-- pdac:cite id="BR-REHEARSAL-CONFIRMATION" digest="sha256:2522bd383ef243a1aced24f77f917fced2c7c03178d6f077717a56b4be9c5ef0" -->

<!-- pdac:cite id="BR-PUBLIC-SELECTION" digest="sha256:573557a2468714b35e9fdbd01c58bd6822d12d6f66998c818c0eac96f35b4807" -->

## Private document and draft lifecycle

The shared static BandPage contains only access-status markup. Canonical area paths address separate documents; the browser membership controller creates secondary navigation and the selected private view after admission. Every document/history restoration independently resolves its session and server-confirmed membership; security rules remain the data boundary.

Views expose their existing dirty/pending state as form attributes. The common native departure guard consults only connected private forms, so accepted discard/success clears the relevant form while failures remain protected. Page suspension and identity loss dispose private observers and DOM; this mechanism creates no draft storage, router or application dialog. The durable choice is recorded in [ADR-0003](../adr/0003-use-static-private-pages-with-native-draft-protection.md).

<!-- pdac:cite id="FR-NAVIGATION" digest="sha256:90a7bf2a42e9cb61493b32b073abc81808c63958725f0ae29def2cdeaa297dc6" -->
