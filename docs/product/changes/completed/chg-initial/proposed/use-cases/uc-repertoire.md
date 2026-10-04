---
id: "UC-REPERTOIRE"
type: "use-case"
title: "Browse and organise repertoire"
status: "draft"
primary-actor: "ACT-MEMBER"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-MEMBERSHIP","BR-PUBLIC-SELECTION"]
uses-terms: ["TERM-REPERTOIRE","TERM-SONG","TERM-SONG-RESOURCE"]
---

## Goal

Use an organised home for repertoire and musical references.

## Trigger

A member browses a song or maintains band song information.

## Preconditions

The member has active private access. Any active member may edit shared repertoire metadata.

## Main Flow

1. Browse the band's repertoire and open a song.
2. Read available title, original artist, status, key, tempo, arrangement and band notes.
3. Inspect visibility and linked resources.
4. Update shared repertoire metadata and resource links as an active member, preserving explicit public/private selection and protected internal resources.

## Alternative Flows

Resources may be sheet music, lyrics, chords, reference or rehearsal audio, video, Google Docs/Drive or repository files. Public viewers see only deliberate public selections.

## Failure Conditions

Unavailable or unauthorised external resources remain subject to their own permissions; the product does not promise to bypass them.

## Postconditions

Musical metadata and resources are organised without requiring large-media duplication.

