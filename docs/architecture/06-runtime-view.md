---
title: Runtime View
arc42-section: "06"
description: Architecturally significant runtime scenarios and building-block interactions.
---

# Runtime View

## Shell request and browser startup

```mermaid
sequenceDiagram
    participant Browser
    participant Host as Cloudflare static assets
    participant Guard as Browser entry
    participant SDK as Firebase SDK
    Browser->>Host: GET / or /band/
    Host-->>Browser: Static branded HTML and assets
    Browser->>Guard: Run client script
    alt Required public configuration present
        Guard->>SDK: Dynamic import existing singleton
        Note over SDK: Development emulator connections require DEV and explicit opt-in
    else Missing or placeholder configuration
        Guard-->>Browser: Keep shell usable without SDK startup
    end
```

Build evaluation never imports the eager SDK client. Initialization failure reports a diagnostic code while the static shell remains usable. No sign-in, membership lookup, private read or write occurs in this slice. Production cannot activate development emulators.

## Verification

[Package scripts](../../package.json) compose source/design/security checks, production build, HTTP route/asset tests, ProductShape validation and Firestore emulator tests. Runtime verification drives both shells in a browser at mobile/desktop sizes, tests keyboard skip navigation and records page errors/private requests. Evidence is recorded in the [GH-1 delivery plan](../delivery/plans/GH-1.md).
