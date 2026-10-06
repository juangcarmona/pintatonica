---
title: Building Block View
arc42-section: "05"
description: Static decomposition, responsibilities, interfaces, and dependencies.
---

# Building Block View

## Availability workspace

The browser access entry mounts [availability-view.ts](../../src/band/availability-view.ts) only for an admitted UID and disposes its listeners and DOM on loss of admission. [availability.ts](../../src/band/availability.ts) owns civil-date/interval transformations independently of Firebase and DOM. The view composes native labelled forms, dynamic active-roster listeners and a read-only band overview. Persistence ownership is documented in [08](08-crosscutting-concepts.md).

[opportunities.ts](../../src/band/opportunities.ts) sweeps effective interval boundaries as a pure calculation; [opportunities-view.ts](../../src/band/opportunities-view.ts) presents its distinct outputs. The workspace supplies only fully loaded, server-confirmed active-roster data and disposes calculation presentation with the rest of the private view. No scheduling data is published publicly or persisted merely by inspecting calculated windows.

## Whitebox Overall System

The admitted browser entry also composes [repertoire-view.ts](../../src/band/repertoire-view.ts), separating pure metadata/link validation from [transactional persistence](../../src/band/repertoire-store.ts). Repertoire collection reads never enter public pages. The safe public projection and consistency boundary are owned by [section 08](08-crosscutting-concepts.md) and justified by [ADR-0002](../adr/0002-store-shared-songs-with-safe-public-projections.md).

```mermaid
flowchart LR
    Pages["Astro pages / and /band"] --> Layout["Shared shell layout"]
    Layout --> Tokens["Canonical CSS tokens and brand asset"]
    Layout --> Guard["Browser configuration guard"]
    Guard --> SDK["Existing Firebase SDK client"]
    Pages --> Access["Band browser access controller"]
    Access --> SDK
    SDK --> Rules["Firestore security boundary"]
    Build["Astro static build"] --> Assets["dist HTML CSS JS and logo"]
    Assets --> Host["Existing Cloudflare Worker static assets"]
```

| Building block | Responsibility | Source |
| --- | --- | --- |
| Public/member entry pages | Static public markup; /band starts the browser access flow | [pages](../../src/pages/) |
| Band access controller/adapter | Identity observation, membership listener and safe dashboard state | [access.ts](../../src/band/access.ts); [adapter](../../src/band/firebase-access.ts) |
| Shared layout/styles | Navigation, skip link, token-based responsive presentation | [Shell.astro](../../src/layouts/Shell.astro); [shell.css](../../src/styles/shell.css) |
| Browser guard | Avoid SDK startup in server evaluation or with incomplete explicit configuration | [browser.ts](../../src/firebase/browser.ts); [public configuration](../../src/firebase/configuration.ts) |
| Firebase boundary | Singleton Auth/Firestore and DEV-only emulator connections | [client.ts](../../src/firebase/client.ts) |
| Data security | Google identity, active membership and ownership enforcement; see [08](08-crosscutting-concepts.md) | [rules](../../src/firebase/firestore.rules) |
| Delivery support | ProductShape, toolkit, design/security checks, emulator and shell verification | [package.json](../../package.json); [lifecycle](../engineering-lifecycle.md) |

Astro configuration is executable source under src/. Root Wrangler JSON is declarative hosting metadata for native build discovery, not an application module. Output/dependency/cache directories are ignored. The overlap engine is a browser-local pure module; no UI framework or server API is introduced.

<!-- pdac:cite id="BR-MEMBERSHIP" digest="sha256:409b040a33d66b37f725e3cc707f503832341a2f52c3504ee3fea3c851a5cd45" -->

<!-- pdac:cite id="QR-SECURITY" digest="sha256:cc17a6ca5aa934716df56692e158d82384992152e4f3fdfd57bc1a83ff1ca9e9" -->

<!-- pdac:cite id="BR-OPPORTUNITY" digest="sha256:cc00716d47bbf9de4c555b4f9aa4fb723b5e0f35b20f1e7b5b76612760708cbc" -->

## Public content and member navigation

[src/public-site](../../src/public-site/) owns typed repository editorial content, guarded public links, Madrid upcoming-gig selection and anonymous reads of whitelisted public collections. Static Astro sections remain usable when data loading fails. Current Backstage navigation links to mounted feature sections without recreating editors or discarding drafts. Separate private page decomposition is deferred to GH-30; this view describes the existing composition. Publication enforcement remains owned by [08](08-crosscutting-concepts.md).

The static public profile also carries editorial member cards, separate from membership records. Astro composes their text and guarded optional images; no public roster read is introduced. Header/footer utilities and event/music card hierarchy remain presentation within the same static hosting and public-projection boundary. Editorial approval inputs are tracked by GH-23, not represented as a new application workflow.

<!-- pdac:cite id="FR-PUBLIC" digest="sha256:5c70258017dd04a564f3a07ee727c1507b93efc0ea6c80f40617948aef48839b" -->

The admitted [member home](../../src/band/home-view.ts) composes existing rehearsal/song/gig/setlist state; [home derivation](../../src/band/home.ts) reuses existing Madrid-time selection. Rehearsal planning contains availability. The opportunity renderer supplies a concise full/partial summary from its existing calculation output. Native editor disclosures separate readable saved detail from editing while retaining mounted drafts. Observer and revocation ownership is documented in [06](06-runtime-view.md).

<!-- pdac:cite id="FR-PREPARATION" digest="sha256:0bc5dae67dd450f814bafba786a9bcb657ecba07acada44b3c9f3113ee70b50f" -->

<!-- pdac:cite id="QR-USABILITY" digest="sha256:c92d80381f9db69175e40c2ca07e2ac246565fd241c5907b56ea5a22e9192753" -->

Public [navigation.ts](../../src/public-site/navigation.ts) owns compact-menu interactions and browser-local current-section/history state; [current-section.ts](../../src/public-site/current-section.ts) selects visible geometry without Firebase dependencies. No new data or authentication responsibility is introduced.

<!-- pdac:cite id="FR-NAVIGATION" digest="sha256:90a7bf2a42e9cb61493b32b073abc81808c63958725f0ae29def2cdeaa297dc6" -->
