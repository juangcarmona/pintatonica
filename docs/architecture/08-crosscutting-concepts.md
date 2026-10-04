---
title: Crosscutting Concepts
arc42-section: "08"
description: Shared architectural mechanisms applied across multiple building blocks.
---

# Crosscutting Concepts

## Visual Token Consistency

### Scope

The repository has a framework-neutral visual foundation and enforcement mechanism shared by future UI implementation and existing design verification. Its design meaning and acceptance status belong to [docs/design](../design/README.md).

### Mechanism

CSS custom properties provide one canonical token-value source. The source checker enforces token usage across eligible UI files rather than repeating values in components. Design assertions test the shared foundation. The authoritative policy, scope and exceptions are owned by the [design enforcement documentation](../design/enforcement.md); this section describes the mechanism, not brand values or component behaviour.

### Evidence

[tokens.css](../../src/styles/tokens.css), [checker configuration](../../src/tooling/design/config.mjs), [checker](../../src/tooling/design/check-design.mjs) and [tests](../../src/tests/design/) establish the current mechanism. Zero eligible application files are currently scanned; no application surface exists to prove adoption in actual components.

## Firebase Identity and Data Access

### Scope

The current mechanism spans the SDK client and Firestore security boundary. Its technical shape is observable; the accepted product baseline remains absent, and no accepted product citation can be emitted yet.

### Mechanism

[client.ts](../../src/firebase/client.ts) initializes a shared Firebase app with public build configuration, exporting Auth and Firestore handles. Development-only emulator opt-in isolates local requests from production configuration. [firestore.rules](../../src/firebase/firestore.rules) checks request authentication plus an active membership document, permits members to read availability and to mutate only their own availability/overrides, and prevents client membership writes. Unmatched collections are denied.

Current rules let an authenticated identity read its own membership record, including non-active membership status, and let any active member mutate rehearsals/setlists. These are observed permissions, not newly accepted product policies. The rule predicate does not itself inspect the sign-in provider; Google-only enforcement depends on provider configuration or a later rule decision and is unverified. Membership provisioning is reported as out of band in [infrastructure notes](infrastructure.md).

### Evidence

The client, rules, [firebase.json](../../firebase.json) and [emulator-backed tests](../../src/tests/firebase/firestore.rules.test.mjs) establish the scaffolding. The tests include denied unauthenticated/non-member/deactivated access, member-owned writes and protected membership mutation. Execution and production deployment are not claimed by this source inspection. Scheduling, time handling and application error presentation remain unimplemented.
