# Juan's supplied intent

Source: Juan's instruction in this repository session on 2026-10-04. The following selected excerpts are verbatim, with Markdown presentation normalised. They are evidence for the proposed population batch, not approval of artifacts. Existing prototype evidence is in [calendar.md](calendar.md).

## Product and actors

> Pintatónica is a small music band.
>
> The product has two faces:
>
> 1. a public-facing band website;
> 2. a private authenticated area for actual band members.
>
> The private area is intended to help the band coordinate rehearsals, manage repertoire, prepare rehearsals and gigs, and keep relevant musical material accessible.
>
> The product should remain small, pragmatic and zero-cost or effectively zero-cost for normal band usage.
>
> Do not turn it into a general SaaS product for arbitrary bands.

> Current known members from the existing scheduling prototype:
>
> - Guille
> - Juan
> - Will
> - Pablo
>
> Treat these as current evidence, not as immutable product constraints.
>
> The system should conceptually support a band membership model rather than hard-coding exactly four people.

> At minimum consider:
>
> - Visitor
> - Band Member
>
> Add Band Administrator only if a distinct permission model is actually needed.

## Public presence

> Known intended capabilities:
>
> - band home page
> - band introduction / who we are
> - public repertoire or selected repertoire
> - photos and/or videos
> - upcoming gigs
> - contact information
>
> The site should feel like a music-band site, not an admin product or SaaS dashboard.
>
> Public content should be visually polished and compatible with the Pintatónica visual identity.

## Private activity

> Known intended capabilities:
>
> - member dashboard
> - rehearsal availability
> - recurring weekly availability
> - one-off availability overrides
> - automatic rehearsal opportunity detection
> - confirmed rehearsals
> - upcoming rehearsal visibility
> - repertoire
> - song details
> - links to sheet music
> - lyrics/chords references
> - original/reference recordings
> - rehearsal recordings
> - rehearsal focus / what to work on
> - setlists
> - basic preparation for gigs
>
> Do not assume all of these must be implemented in the very first slice, but they belong to the intended MVP/product scope unless later refined out.

## Identity and authorisation

> Target direction:
>
> - Google sign-in
> - authentication is not equivalent to band membership
> - only explicitly authorized band members may access private data
> - an authenticated Google user who is not a band member must still be denied private access
> - authorization must be enforced at the data/security layer, not only by hiding UI
> - members should not need to select their own name after login if identity is already known
>
> The current shared-secret URL approach is legacy/prototype behaviour and should not become the accepted target model.

## Scheduling evidence and unresolved policy

> - Members can define a recurring weekly availability pattern.
> - Members can add date-specific availability/overrides.
> - Multiple time intervals per day are supported.
> - The application shows a rolling six-week view.
> - The application calculates overlap between members.
> - Weeks with full-group availability are highlighted.
> - A rehearsal opportunity exists when all current members overlap for at least two hours.
> - An opportunity is not the same thing as a confirmed rehearsal.
> - Users can inspect availability by day and by member.
> - Timezone is Madrid.

> A member can add an exception for a particular date without changing the recurring weekly pattern.

> Current prototype rule:
>
> - all current members overlap
> - for at least two hours
>
> Treat this as an existing business-rule candidate.
>
> Do not silently generalize it.

> The product should eventually support converting/confirming an opportunity into a rehearsal.

> A confirmed rehearsal should eventually be able to answer:
>
> - when are we rehearsing?
> - who is expected?
> - which songs are we working on?
> - what specifically needs work?
>
> Keep this lightweight.

## Repertoire, resources and setlists

> A song may have:
>
> - title
> - original artist
> - status
> - key
> - tempo
> - structure/arrangement notes
> - band-specific notes
> - public/private visibility
> - links/resources
>
> Resources may include:
>
> - sheet music
> - lyrics
> - chords
> - reference/original track
> - rehearsal recording
> - video
> - Google Docs / Drive resources
>
> Stable repertoire metadata is expected to be repository-managed where practical.
>
> Do not assume large media files should live in Git.

> The product should support lightweight setlists for gigs or rehearsals.
>
> Likely useful information:
>
> - ordered songs
> - approximate duration
> - key notes / performance notes
>
> Do not build advanced event-management features.

> Existing and future materials may live in:
>
> - Google Docs
> - Google Drive
> - YouTube
> - repository files
>
> The product should organize and link these resources rather than duplicating large media assets unnecessarily.

## Quality and exclusions

> Capture quality requirements around:
>
> - zero recurring infrastructure cost under normal Pintatónica usage
> - mobile-first/responsive use
> - good usability on desktop
> - simple operational model
> - no custom server operations if avoidable
> - private data protected at the data layer
> - no secrets committed
> - type-safe implementation
> - automated verification
> - automated deployment
> - maintainable by agents and humans
> - minimal accidental complexity
>
> Do not prematurely encode specific technologies as product requirements.

> Do not scope the MVP as:
>
> - a generic multi-tenant band SaaS
> - a social network
> - a messaging platform
> - a replacement for WhatsApp
> - a replacement for Google Drive
> - a full calendar platform
> - a ticketing platform
> - a streaming platform
> - a project-management tool
> - a CMS requiring complex editorial workflows

## Open questions supplied by Juan

> 1. Must every rehearsal opportunity require all band members, or should partial attendance be useful?
> 2. Is the minimum useful rehearsal duration always two hours?
> 3. Who can confirm a rehearsal?
> 4. Can every member edit rehearsal focus/setlists, or are some actions restricted?
> 5. How much of the repertoire should be public?
> 6. Which existing Google Docs/Drive materials should be migrated versus linked?
> 7. Should confirmed rehearsals integrate with Google Calendar later?
> 8. What should be included in the first MVP versus a later increment?
> 9. How should gigs be managed beyond simple public display/setlists?
> 10. Whether the rolling six-week planning horizon remains fixed or configurable.

## Refinement instruction

> Build the strongest coherent initial proposal from known evidence, mark unresolved points explicitly, and then use refinement to ask Juan only the decisions that materially affect the product model.

> productshape has ways of doing this, refine I'd say
