---
id: "UC-SETLIST"
type: "use-case"
title: "Prepare a setlist and gig"
status: "draft"
primary-actor: "ACT-MEMBER"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-MEMBERSHIP","BR-PUBLIC-SELECTION"]
uses-terms: ["TERM-SETLIST","TERM-GIG","TERM-SONG"]
---

## Goal

Prepare a lightweight musical running order for a gig or rehearsal.

## Trigger

A member prepares an upcoming performance or rehearsal.

## Preconditions

Repertoire exists and the member has active private access. Any active member may edit shared setlists.

## Main Flow

1. Select and order songs.
2. Record approximate duration and useful musical or performance notes.
3. Associate the setlist with the rehearsal or gig preparation.
4. Keep deliberately public upcoming gig information separate from private preparation.

## Alternative Flows

Setlists may support a rehearsal or gig. All active members may edit them; gig management is limited to basic public information and musical preparation in the MVP.

## Failure Conditions

Private preparation must not become public merely because the gig has a public listing.

## Postconditions

The band can use an ordered musical plan without advanced event-management features.

