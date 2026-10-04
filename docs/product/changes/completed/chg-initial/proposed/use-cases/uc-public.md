---
id: "UC-PUBLIC"
type: "use-case"
title: "Discover the band"
status: "draft"
primary-actor: "ACT-VISITOR"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-PUBLIC-SELECTION"]
uses-terms: ["TERM-PUBLIC-CONTENT","TERM-REPERTOIRE","TERM-GIG"]
---

## Goal

Understand Pintatónica and find its music, gigs and contact route.

## Trigger

A visitor opens the public site.

## Preconditions

Public information has been deliberately selected for publication.

## Main Flow

1. View the band home page and introduction.
2. Browse public or selected repertoire and photos or videos.
3. Inspect upcoming gigs and contact information.

## Alternative Flows

Visitors can enter directly at music, media or gig information. Empty or unavailable content must not be presented as a private-data source.

## Failure Conditions

Unavailable linked media does not grant access to private resources.

## Postconditions

The visitor can discover the band's identity and published information; private material remains inaccessible.

