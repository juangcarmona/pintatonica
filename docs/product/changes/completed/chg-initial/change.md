---
id: CHG-INITIAL
type: product-change
title: 'Initial Pintatónica product definition'
status: applied
base-revision: '0000000'
operations:
  add:
    - ACT-VISITOR
    - ACT-MEMBER
    - BC-PINTATONICA
    - TERM-BAND
    - TERM-MEMBER
    - TERM-VISITOR
    - TERM-AVAILABILITY
    - TERM-RECURRING-AVAILABILITY
    - TERM-DATE-OVERRIDE
    - TERM-TIME-SLOT
    - TERM-PLANNING-HORIZON
    - TERM-REHEARSAL-OPPORTUNITY
    - TERM-CONFIRMED-REHEARSAL
    - TERM-SONG
    - TERM-REPERTOIRE
    - TERM-SONG-RESOURCE
    - TERM-SETLIST
    - TERM-GIG
    - TERM-PUBLIC-CONTENT
    - UC-PUBLIC
    - UC-ACCESS
    - UC-AVAILABILITY
    - UC-OPPORTUNITIES
    - UC-CONFIRM
    - UC-PREPARE
    - UC-REPERTOIRE
    - UC-SETLIST
    - BR-MEMBERSHIP
    - BR-AVAILABILITY
    - BR-OPPORTUNITY
    - BR-PARTIAL-AVAILABILITY
    - BR-REHEARSAL-CONFIRMATION
    - BR-PUBLIC-SELECTION
    - JRN-DISCOVER
    - JRN-NEXT-REHEARSAL
    - JRN-PREPARE-REHEARSAL
    - JRN-USE-REPERTOIRE
    - JRN-PREPARE-GIG
    - CON-SINGLE-BAND
    - FR-PUBLIC
    - FR-ACCESS
    - FR-AVAILABILITY
    - FR-SCHEDULING
    - FR-PREPARATION
    - FR-REPERTOIRE
    - QR-COST-OPERATIONS
    - QR-USABILITY
    - QR-SECURITY
    - QR-MAINTAINABILITY
    - QR-VERIFICATION
    - SB-NON-MEMBER-DENIED
    - SB-MEMBER-IDENTIFIED
    - SB-DATE-EXCEPTION
    - SB-OPPORTUNITY
    - SB-PARTIAL-WINDOW
  modify: []
  remove: []
---

## Problem

Pintatónica has no accepted Product Definition in this repository. Known context needs to become an explicitly reviewed initial definition through interaction with Juan.

## Intended Product Outcome

A small Pintatónica product with a polished public band website and a Google-authenticated private member area for rehearsal coordination, repertoire and lightweight rehearsal/gig preparation. This is a proposed baseline candidate derived from Juan's supplied intent, not an accepted product definition. All 55 added artifacts remain draft. The private member-facing application surface is /band.

## Rationale

Establish product intent once, before architecture, design decisions, delivery planning or implementation. Exercise the full Product Change workflow from the first baseline rather than authoring directly in the accepted model.

Juan instructed: "Build the strongest coherent initial proposal from known evidence, mark unresolved points explicitly, and then use refinement to ask Juan only the decisions that materially affect the product model."

Juan then clarified: "productshape has ways of doing this, refine I'd say". This sitting uses ProductShape's installed refine-product skill, preserving the same CHG-INITIAL. The supplied intent is the evidence for this population batch; no interview answer has been invented. Working memory, ranked relationship review and selected verbatim evidence are in [proposal.md](proposal.md) and [evidence/juan-intent.md](evidence/juan-intent.md).

Juan's current decisions are recorded verbatim in [evidence/mvp-decisions.md](evidence/mvp-decisions.md), with the proportional consumer review in [proposal.md](proposal.md). They supersede the earlier optional partial-display wording and unresolved MVP policies. The current refinement makes /band explicit; adds shared focus updates; requires zero recurring infrastructure charge excluding optional external domains; fixes all-active membership, two-hour duration and six-week horizon; requires separate partial windows with at least two but fewer than all active members; allows any active member to explicitly confirm full/partial candidates and edit shared repertoire/focus/setlists; and defines editorial public selection and explicit deferrals. No administrator role, granular permissions, vendor or delivery backlog is introduced.

## Affected Product Areas

The proposed model covers:

- Visitor and Band Member; no invented administrator role.
- Five journeys: public discovery, agreeing the next rehearsal, rehearsal preparation, repertoire use and setlist/gig preparation.
- Public home, introduction, selected repertoire, media, upcoming gigs and contact.
- Membership-gated private dashboard and recognised member identity after Google sign-in.
- Recurring availability, date exceptions, multiple intervals, Madrid time, rolling six-week view, overlap and full-group week highlighting.
- Full-group opportunities across all active members for at least two continuous hours. Mandatory partial windows contain at least two but fewer than all active members, are presented separately with participants/duration and preference for higher participation/longer duration, and never become primary opportunities. Any active member may explicitly confirm either candidate type; expected/available members and full/partial attendance remain visible.
- Shared editable song metadata, linked musical resources, rehearsal-specific selected songs and lightweight editable notes/focus, and ordered setlists. Any active member may edit these shared materials; members edit only their own availability.
- Small single-band scope; zero recurring infrastructure charges under expected normal usage, excluding optional external domain purchase; responsive mobile-first usability; security, type safety, maintainability, automated verification and deployment.

Current roster evidence is Guille, Juan, Will and Pablo. Membership is modelled independently of a fixed four-person count. Google Docs, Drive, YouTube and repository resources are possible material locations; large media need not be copied into Git.

Partial read-only evidence from the existing scheduling prototype is recorded in [evidence/calendar.md](evidence/calendar.md). Observed behaviour is a discussion input, not an accepted requirement.

## Open Questions

No unresolved product-policy decision blocks approval of this MVP candidate. Each rehearsal still requires actual agreement on whether everyone attends, with expected/available members explicitly shown at confirmation; that is runtime band coordination, not an unresolved global policy.

Architecture must establish expected normal-use assumptions and verify free-tier fit. Exact public song selection, gig/media content and resource inventory remain editorial inputs; manual membership provisioning is operational. These do not require an administrator role, fixed public song list or further MVP scope. Explicit future capabilities are listed under Out of Scope.

## Product Acceptance

Juan explicitly approves the validated proposed baseline before any application. Structural validation and semantic readiness do not constitute approval. The candidate is semantically ready after these supplied decisions; all artifacts and this change remain draft until the separate acceptance action. Nothing is approved, applied or archived by this refinement.

## Out of Scope

Architecture selection, design-system generation, backlog creation, implementation, deployment and delivery status. Technology candidates are not product requirements. Logo descriptions and approximate colours are design evidence, not product semantics. The prototype implementation and shared-secret/name-selection access mechanism are not retained as the target.

No generic multi-tenant SaaS, social network, messaging or WhatsApp replacement, Drive replacement, full calendar platform, ticketing, streaming, project management or complex editorial CMS. Explicitly deferred beyond the MVP: Google Calendar synchronization, notifications, messaging/chat, automated membership administration, granular roles/permissions, configurable planning horizon, configurable rehearsal-duration policy, generic multi-band/multi-tenant support, advanced gig/event management, media hosting and replacement of Google Drive/Docs. Membership provisioning is manual outside normal member-facing flows. Public repertoire is editorially selected; its exact song list is not prescribed. The accepted model remains empty.
