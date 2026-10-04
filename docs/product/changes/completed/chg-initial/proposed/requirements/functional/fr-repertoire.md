---
id: "FR-REPERTOIRE"
type: "functional-requirement"
title: "Organised songs and accessible resources"
status: "draft"
derived-from: ["UC-REPERTOIRE","BR-PUBLIC-SELECTION","CON-SINGLE-BAND"]
verification: [{"scenario": "An active member opens a song, reads recorded musical metadata and resource links, updates shared metadata, and another member sees the saved change."}, {"scenario": "Songs link sheet music, lyrics/chords, reference audio and rehearsal recordings without requiring media hosting or large-file duplication."}, {"scenario": "A public song listing exposes selected title/artist and suitable public media, while private notes, rehearsal resources and working links remain protected."}, {"scenario": "External Google Drive permissions remain enforced when members follow resource links."}]
---

## Requirement

The product MUST organise Pintatónica repertoire and song details. Song metadata may include title, original artist, status, key, tempo, structure/arrangement and band notes, public/private visibility and resources. Resource kinds include sheet music, lyrics, chords, original/reference recordings, rehearsal recordings, videos and Google Docs/Drive links. Stable metadata is expected to be repository-managed where practical; storage selection remains an architectural decision. The product MUST organise and link resources without unnecessary large-media duplication. Any active member may edit shared repertoire metadata and links. Songs have explicit public/private selection; only editorially selected songs and suitable public content are exposed, with internal resources remaining protected. Existing material is linked for the MVP; replacing Google Drive/Docs or hosting media is deferred. The exact public song list is editorial, not a fixed product requirement.

## Rationale

Provide an organised musical home while respecting existing resource ownership and permissions.

