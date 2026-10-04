---
name: build-static-shells-with-astro
description: Build the public and member-area shells as static Astro assets on the existing Cloudflare Worker.
status: Accepted
date: 2026-10-04
deciders: [Juan]
tags: [web, hosting]
---

# ADR-0001: Build static shells with Astro

## Context

GH-1 needs an executable build/deployment path for the accepted public/member surfaces. The existing Cloudflare Worker has a native Git build connection. Design tokens, brand assets and a browser Firebase client already exist. Juan approved the Astro shell plan and continuous verified delivery/deployment.

## Decision

We will build static shells with Astro and publish dist through the existing Cloudflare Worker static-assets facility. Firebase initializes only behind a browser/configuration guard. Executable configuration and helpers stay in src/; root Wrangler JSON is declarative hosting metadata discoverable by native Builds. Use the toolkit default docs/adr/ for decision records.

## Consequences

- **Positive:** No custom server or additional deployment service; existing tokens, hooks and native hosting are preserved.
- **Negative:** Static HTML cannot enforce membership; later private features must prove data-layer access control.
- **Neutral:** Full data editing/persistence decisions remain for their vertical slices. Node >=22.12 and compatible Astro/TypeScript tooling are required.

## Alternatives considered

- **Server rendering/adapter:** rejected for this slice because empty shells require no server behavior.
- **UI framework starter:** rejected because two static surfaces need no additional framework or generated demo features.
- **New Pages project or Actions deployment:** rejected because an existing Worker native connection owns hosting.

## References

- [GH-1](https://github.com/juangcarmona/pintatonica/issues/1)
- [Delivery plan](../delivery/completed/GH-1.md)
- [Astro manual installation](https://docs.astro.build/en/install-and-setup/)
- [Cloudflare static assets](https://developers.cloudflare.com/workers/static-assets/)
