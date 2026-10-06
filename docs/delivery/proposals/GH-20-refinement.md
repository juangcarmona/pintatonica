# GH-20 — Ready evaluation

Issue [#20](https://github.com/juangcarmona/pintatonica/issues/20), refined 2026-10-06 against current main and Juan's explicit autonomous sequence authorization.

All applicable Ready dimensions are satisfied: title/problem/outcome and scope are in the issue; actors are ACT-VISITOR and ACT-MEMBER; pickup order is 20–23; dependencies are the accepted baseline and existing visual system; observable criteria remain the issue's criteria with the reconciliation below. Product references are FR-PUBLIC, UC-PUBLIC, JRN-DISCOVER, QR-USABILITY, QR-MAINTAINABILITY and QR-VERIFICATION. Existing decisions are design foundations/components/patterns, ADR-0001/0002 and the current arc42 views. Test impact covers contrasting controls/focus, mobile and desktop public/member presentation and existing security/product regressions. No unresolved input invalidates planning. No Product Change.

## Reconciled scope and criteria

- Evolve the current design system, including previously documented blue actions and solid-block accents. Preserve the authoritative logo bytes exactly; technical variants are permitted only for a demonstrated necessary format. None is currently needed.
- Shared public/private typography, surfaces, buttons, form fields, native checkboxes, panels, navigation, states and reusable four-bar primitives look intentional. Public/private density may differ.
- Keep token values solely in src/styles/tokens.css. Document roles, accessible combinations, destructive/positive/warning distinctions and restrained motif usage.
- Verify actual existing controls and native confirmation interactions. No custom or reusable dialog is required; remove that expectation rather than add UI.
- Retain all product behaviour, writes, authorization, editorial copy and journey structure. Individual page redesign belongs to GH-21/22.
- Desktop/mobile evidence must show public and admitted member components, visible focus, state presentation, removal controls and no overflow; full existing verification passes.

GH-23 discovery starts early but implementation remains last. Repository evidence establishes minimal copy and missing approved contact/media, not production fixture contamination. Approved public names/roles and a motto are unavailable; do not infer them or publish private conversation material. The production inventory needs operator observations in GH-23.

Review debt: GH-1–GH-9 have no review-log entry. This is observable, nonblocking debt.
