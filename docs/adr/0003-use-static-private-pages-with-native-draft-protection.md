---
name: use-static-private-pages-with-native-draft-protection
description: Use separate static private area documents with per-document admission and native unsaved-leave protection.
status: Accepted
date: 2026-10-06
deciders: [Juan (delegated engineering decisions), Codex]
tags: [navigation, security, lifecycle]
---

# ADR-0003: Use static private pages with native draft protection

## Context

Accepted FR-NAVIGATION requires five private pages, meaningful direct entry/history and a deliberate unsaved-edit leave choice. Existing Astro static hosting and Google/active-membership data boundaries already operate. Editors hold local dirty revisions and report committed/conflicting/failed saves; Inicio's scheduling summaries currently depend on mounted availability presentation.

## Decision

We emit separate static Astro access shells, recheck membership in every document and mount only its selected area. Shared read-only availability observation and the existing pure scheduling calculation will serve Inicio and Ensayos. Ordinary links use browser history; a native beforeunload guard reads explicit editor dirty/pending state, allowing continued editing or deliberate loss without introducing a router, private draft store or application dialog.

## Consequences

- **Positive:** Direct URLs and focused areas fit static hosting; every entry retains independent admission and rule enforcement. Existing browser mechanisms cover leave/refresh/history, and failed saves remain protected.
- **Negative:** Each document resolves its session/membership and reloads its readers; deliberately leaving discards local unsaved edits. Native leave wording and availability depend on browser/user activation.
- **Neutral:** Successful saves clear protection; identity loss still clears private data. Runtime journeys must navigate actual pages and distinguish native leave prompts from existing in-area discard confirmations.

## Alternatives considered

- Client router with persistent mounted editors: rejected because it adds a routing/state lifecycle and hidden unrelated views when ordinary static documents already satisfy accepted intent.
- Automatic private draft persistence: rejected because it adds storage/recovery semantics not required by the accepted continue-or-deliberately-leave choice.
- New reusable application dialog: rejected because the native browser prompt covers document departure and the current product requires no new application dialog.

## References

- [GH-30 plan](../delivery/completed/GH-30.md), [FR-NAVIGATION](../product/model/requirements/functional/fr-navigation.md), [FR-ACCESS](../product/model/requirements/functional/fr-access.md)
- [ADR-0001](0001-build-static-shells-with-astro.md), [runtime](../architecture/06-runtime-view.md), [security](../architecture/08-crosscutting-concepts.md)

Accepted within Juan’s explicit FF authorization for GH-30 engineering decisions. Validation uses actual five-page and native leave-choice journeys; this does not assert a separate human review or GitHub vote.
