---
id: "UC-PUBLIC"
type: "use-case"
title: "Discover the band"
status: "draft"
primary-actor: "ACT-VISITOR"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-PUBLIC-SELECTION"]
uses-terms: ["TERM-PUBLIC-CONTENT","TERM-REPERTOIRE","TERM-GIG","TERM-AREA"]
---

## Goal

Understand Pintatónica and find its music, gigs and contact route.

## Trigger

A visitor opens the public site.

## Preconditions

Public information has been deliberately selected for publication.

## Main Flow

1. View Inicio and recognise the band's identity.
2. Navigate to La banda, Repertorio or Media to browse approved introduction, selected songs and photos/videos.
3. Navigate to Conciertos or Contacto for published upcoming gigs and contact information.
4. Identify the currently presented public area through navigation.

These public areas are sections of one scrolling page. Navigation updates the current-area indication as the visitor scrolls or activates a section link.

## Alternative Flows

Visitors can enter directly at music, media or gig information. Empty or unavailable content must not be presented as a private-data source.

Visitors can share a section link and use browser back/forward to return to the intended public section.

Backstage is a distinct member-only login/entry action under UC-ACCESS. Visiting public areas does not require sign-in or grant band membership.

## Failure Conditions

Unavailable linked media does not grant access to private resources.

## Postconditions

The visitor can discover the band's identity and published information; private material remains inaccessible.
