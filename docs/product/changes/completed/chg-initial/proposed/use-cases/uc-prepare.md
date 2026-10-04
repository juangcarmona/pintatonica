---
id: "UC-PREPARE"
type: "use-case"
title: "Prepare an upcoming rehearsal"
status: "draft"
primary-actor: "ACT-MEMBER"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-MEMBERSHIP","BR-REHEARSAL-CONFIRMATION"]
uses-terms: ["TERM-CONFIRMED-REHEARSAL","TERM-SONG","TERM-SONG-RESOURCE","TERM-SETLIST"]
---

## Goal

Know and update when, with whom, which songs and what specifically needs work for a confirmed rehearsal.

## Trigger

An active member opens an upcoming confirmed rehearsal in /band.

## Preconditions

A rehearsal is confirmed and the member has active private access.

## Main Flow

1. Inspect timing and expected/available members.
2. Inspect the songs to work on and lightweight notes/focus.
3. Add or update the selected songs and rehearsal-specific notes/focus.
4. Save the shared preparation so other active members can view and update it.
5. Open song details/resources and use an ordered rehearsal setlist where useful.

## Alternative Flows

Any active member may edit focus or setlists. Preparation can link existing external resources without migrating them. Incomplete focus can be completed later.

## Failure Conditions

Failed or unsaved edits must not be represented as saved shared focus. Inaccessible external resources must not be presented as available or used to expose protected material.

## Postconditions

Members can view and update shared musical preparation without task/project-management machinery.
