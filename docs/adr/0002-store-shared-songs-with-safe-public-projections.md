---
name: store-shared-songs-with-safe-public-projections
description: Store editable repertoire in existing Firestore with atomically matched public whitelists.
status: Accepted
date: 2026-10-05
deciders: [Juan]
tags: [persistence, security]
---

# ADR-0002: Store shared songs with safe public projections

## Context

FR-REPERTOIRE requires shared member editing while expecting repository-managed stable metadata where practical. BR-PUBLIC-SELECTION separates internal working material from selected public content. The existing client/rules/hosting path has no custom server; repository-only edits would require members to operate Git or a privileged publishing service.

## Decision

We will keep editable song records in the existing private Firestore collection and publish an atomic, rule-validated whitelist to publicSongs. Revisions guard shared-edit conflicts. Only deliberately supplied public fields enter the projection; private resources/notes remain private. Schema, validation, rules and optional export documentation are repository-managed. Public pages remain static assets with browser reads of the safe projection.

Juan's explicit FF-through-9 delegation authorizes this bounded engineering decision and its tests; this record does not claim a separate GitHub approval vote. Product intent is unchanged.

## Consequences

- Positive: ordinary members edit together without Git access, a server or additional paid service; rules enforce the public trust boundary.
- Negative: current editable metadata is not itself Git-versioned. Free-tier database reads/writes apply and require economical listeners; concurrent edits need visible revision-conflict handling.
- Neutral: a future operational export can preserve stable content in Git, without introducing automatic migration or CMS scope now. Public cache/offline data cannot promise immediate deletion of content already read by a visitor.

## Alternatives considered

- Repository-only metadata: would weaken normal shared member editing or require a new privileged delivery service.
- Public/private fields in one publicly readable document: field-level read filtering is not a safe boundary.
- Server-generated projection: adds compute/operations unnecessary for this small band; existing atomic writes and rules enforce consistency.

## References

- [GH-6 plan](../delivery/plans/GH-6.md)
- [FR-REPERTOIRE](../product/model/requirements/functional/fr-repertoire.md)
- [BR-PUBLIC-SELECTION](../product/model/business-rules/br-public-selection.md)
- [Existing static topology](0001-build-static-shells-with-astro.md)

<!-- pdac:cite id="FR-REPERTOIRE" digest="sha256:19c0f3e6a2bf99f8ce11f96b382d0d029570459ab8638cd6fa0cdef6073689f4" -->
