---
title: Solution Strategy
arc42-section: "04"
description: Fundamental approaches that shape the architecture and realize its drivers.
---

# Solution Strategy

| Driver | Strategy | Detailed view or source |
| --- | --- | --- |
| Low operations/cost (QR-COST-OPERATIONS) | Build static Astro pages; serve existing Cloudflare Worker static assets without custom runtime compute | [ADR-0001](../adr/0001-build-static-shells-with-astro.md); [07](07-deployment-view.md) |
| Maintainable delivery (QR-MAINTAINABILITY, QR-VERIFICATION) | Pinned pnpm tooling, Astro/TypeScript checking, built-route tests and retained CI/security/emulator suites | [05](05-building-block-view.md); [lifecycle](../engineering-lifecycle.md) |
| Usability (QR-USABILITY) | Reuse existing logo and canonical design tokens; inspect responsive/keyboard browser evidence | [08](08-crosscutting-concepts.md); [design](../design/README.md) |
| Security (QR-SECURITY) | Keep member data out of static output; browser membership gate plus independent Google-provider/active-membership enforcement in Firestore | [06](06-runtime-view.md); [08](08-crosscutting-concepts.md) |

Storage/editing boundaries for musical features and scheduling architecture remain later decisions. Static HTML is not an authorization boundary; the GH-2 access mechanism is documented in [08](08-crosscutting-concepts.md).

<!-- pdac:cite id="QR-COST-OPERATIONS" digest="sha256:18df4d28e10c2b4f64596df6196e2fc404334d4854653a6c53abc424c790230c" -->

<!-- pdac:cite id="QR-MAINTAINABILITY" digest="sha256:40a7ffe79142cd37afaf6d04a8edcc62d666a539ad54de1c0357acc8244dc362" -->

<!-- pdac:cite id="QR-VERIFICATION" digest="sha256:1a0f617f80f103442dddf61fc11a360e4ca9e023d6f18bcace259ffa3fa0e73e" -->

<!-- pdac:cite id="QR-USABILITY" digest="sha256:bdeb7fc494fdad4f94d8c8b1ca67a0289ae7f31d39afab9a5a0250537c6e6f7b" -->

<!-- pdac:cite id="QR-SECURITY" digest="sha256:cc17a6ca5aa934716df56692e158d82384992152e4f3fdfd57bc1a83ff1ca9e9" -->
