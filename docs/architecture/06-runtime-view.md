---
title: Runtime View
arc42-section: "06"
description: Architecturally significant runtime scenarios and building-block interactions.
---

# Runtime View

## Local Repository Verification

The only executable interaction documented here is bootstrap verification. [package.json](../../package.json) composes the design checker/tests and ProductShape checks. Those participants are the support blocks in [05](05-building-block-view.md). The [pre-commit hook](../../.husky/pre-commit) selects the fast subset; the [local workflow file](../../.github/workflows/verify.yml) selects the full chain. Exact commands belong to [tooling](../tooling.md), not a second runbook here.

### Notable Interactions

Design rules inspect eligible source files while tests verify the checker and canonical token properties. ProductShape validates the empty accepted model, active-change overlay and managed integration integrity. Passing validation does not accept product semantics.

### Failure Behavior

A failing command prevents the chained verification from being reported as successful. No scanned application files is limited scope, not evidence that a future UI meets its quality obligations. Missing remote execution is not a passing GitHub result; the lifecycle's verification roles preserve that distinction.

## Application Runtime

SDK startup creates or reuses the Firebase app and exports Auth/Firestore clients. Emulator connections occur only when both a development build and the explicit emulator opt-in are present. A Firestore request is evaluated against the current identity/membership and ownership rules described in [08](08-crosscutting-concepts.md); a denied request does not depend on hiding UI.

The [rules tests](../../src/tests/firebase/firestore.rules.test.mjs) exercise direct data operations with authenticated and unauthenticated contexts in a demo project. Their existence is not evidence of a test run in this documentation task. No sign-in screen, overlap engine or rehearsal-confirmation interaction has been implemented. Proposed behaviour remains in [CHG-INITIAL](../product/changes/active/chg-initial/change.md); full user-facing runtime sequences await the application design.
