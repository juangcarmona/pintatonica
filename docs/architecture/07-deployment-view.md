---
title: Deployment View
arc42-section: "07"
description: Runtime infrastructure and the mapping of software building blocks onto it.
---

# Deployment View

## Infrastructure Level 1

### Overview

No application hosting deployment is evidenced by build artifacts in this repository. Juan confirmed the existing Cloudflare native Git connection on 2026-10-04; it owns production/preview deployment, not GitHub Actions. Firebase project/web-app metadata was verified through supported CLI commands. A local Wrangler OAuth session was established, but account discovery scope/resource identity remain unresolved and Cloudflare project/build/environment settings are unverified. [Infrastructure notes](infrastructure.md) own configuration inventory and operational evidence; this section records topology and evidence limits.

[.firebaserc](../../.firebaserc) maps the Firebase project. [firebase.json](../../firebase.json) now maps Firestore rules/index files and local Auth/Firestore emulators. Rule/client scaffolding exists under src/firebase/. Production rule deployment is reported in infrastructure notes, not independently verified here. The notes list enabling Google sign-in as a remaining manual step, so Google login is not claimed operational.

### Topology Rationale

Firestore and Firebase Auth are the reported platform direction; Cloudflare's native Git integration owns hosting deployment, while framework/build mapping is unselected in this repository. GitHub Actions validates only and has no production deployment identity. Firebase rules remain manually deployed through operator identity; no Admin credentials or service-account keys are introduced. Local emulators use a demo project distinct from the configured production alias. See [04](04-solution-strategy.md) and [09](09-architecture-decisions.md) for the decision-recording gap.

### Building Block Mapping

| Building block or artifact | Infrastructure element | Environment |
| --- | --- | --- |
| Repository verification support | Local Node runtime | Developer workstation |
| Repository validation and secret scanning | Read-only GitHub runner specified by file; publication/execution unverified | PR and main validation |
| Firebase client and rules | Configured Firebase project / reported Firestore provisioning | Production state reported, not independently verified |
| Firebase rule verification | Local Auth/Firestore emulator configuration with demo project | Developer/CI test environment |
| Application UI | Existing Cloudflare native Git connection confirmed by Juan; build and variable scopes unverified | Production/preview policy requires platform inspection |

Infrastructure notes report the Madrid region and a free, unbilled Firebase project. These are reported inventory facts, not verified cost or performance guarantees. Native deployment is not proven to wait for CI, and preview builds using production Firebase configuration would share its data boundary. Build mapping and end-to-end environment separation remain unresolved; the observed access boundary is described in [08](08-crosscutting-concepts.md).
