---
id: FR-NAVIGATION
type: functional-requirement
title: Oriented public and member area navigation
status: draft
derived-from: [UC-PUBLIC, UC-ACCESS, CON-SINGLE-BAND]
verification:
  - scenario: A visitor scrolls or activates section links on the single public page and navigation identifies the currently visible area accurately on mobile and desktop.
  - scenario: A visitor opens a shared public section link or uses browser back/forward and reaches the intended section with an accurate current-area indication.
  - scenario: An active member moves between separate Inicio, Ensayos, Repertorio, Setlists and Conciertos pages through secondary navigation identifying the current area.
  - scenario: A member opens a private area address directly, refreshes it and uses browser back/forward while retaining area context and undergoing the same membership gate.
  - scenario: An unauthenticated, non-member or inactive person opens a private area address and receives only login or access status, with private information and operations denied.
  - scenario: A member with unsaved edits can continue editing or deliberately leave without saving rather than silently losing work through area navigation.
---

## Requirement

The product MUST provide named public and private areas as defined by TERM-AREA and MUST accurately identify the currently presented area in its navigation. Public navigation serves anonymous discovery; private secondary navigation is available only after active membership is confirmed.

Public Inicio, La banda, Repertorio, Media, Conciertos and Contacto MUST remain sections of one scrolling page. Public navigation MUST identify the currently visible section accurately after scrolling or activating section links. Section links MUST be shareable, support direct entry and preserve useful browser-history navigation.

Private Inicio, Ensayos, Repertorio, Setlists and Conciertos MUST have separate pages. Ensayos contains existing availability, opportunity inspection, confirmation and preparation. Inicio retains the existing member summary and access to the relevant musical areas. An area does not introduce new musical capabilities or change publication selection.

People MUST be able to enter an area directly, refresh and use browser back/forward with meaningful current-area context. Every private entry remains subject to BR-MEMBERSHIP independently of navigation. Unsaved edits MUST NOT be silently discarded by area navigation: the member can continue editing or deliberately leave without saving. Specific mechanisms and addresses belong to design and architecture.

## Rationale

Replace uncertain position and long private-page traversal with focused, identifiable destinations while preserving existing information, editing and access boundaries.
