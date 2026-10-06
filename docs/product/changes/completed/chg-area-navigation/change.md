---
id: CHG-AREA-NAVIGATION
type: product-change
title: Oriented public and Backstage areas with member-only entry
status: applied
base-revision: '93e1162124b10b203bedcb696b29fe5115c127b9'
operations:
  add: [TERM-AREA, FR-NAVIGATION]
  modify: [UC-PUBLIC, UC-ACCESS, FR-PUBLIC, FR-ACCESS, QR-USABILITY, JRN-DISCOVER]
  remove: []
---

## Problem

The existing definition supports public discovery and member-only musical work but does not establish a clear current-area orientation or a private page-per-area experience. A person cannot reliably tell which public section is being viewed, and the private workspace requires traversing a long combined page. The public Backstage entry does not clearly express the member-only login intent.

## Intended Product Outcome

Visitors navigate Inicio, La banda, Repertorio, Media, Conciertos and Contacto as sections of one public scrolling page. Navigation accurately indicates the currently visible section after scrolling or activating a section link. Section links are shareable and direct entry and browser history retain useful context. These areas remain available without authentication and expose only deliberately public information.

Backstage is a clear member-only login/entry action. Signed-out people can deliberately start Google sign-in; authenticated active members enter the private workspace. Sign-in does not enrol anyone or grant band membership. Membership remains an independently provisioned, revocable permission.

Admitted members navigate separate pages for Inicio, Ensayos, Repertorio, Setlists and Conciertos through a secondary navigation identifying the current private area. Ensayos includes existing availability, opportunities, confirmation and preparation; no additional feature or permission is introduced. Direct addresses, refresh and browser history retain meaningful area context and undergo the same access checks. Navigating away from edits does not silently lose unsaved work.

## Rationale

Visible orientation and focused destinations make the existing public discovery and musical coordination journeys easier to use. Public and private repertoire/concerts serve different audiences and retain their existing information boundaries. “Area” names a user-facing destination, not a new business context, tenant or permission role.

The current short public content suits one continuous band introduction, while focused private pages suit members' distinct musical tasks. Public and private navigation therefore use different presentation structures with the same obligation to identify the current area.

Google authentication and active membership are already separate in the accepted definition. Retain the existing manually provisioned active-membership model and its revocation mechanism. No approved-email list, automatic enrolment or new membership policy is introduced. Juan explicitly chose these two product directions on 2026-10-06.

## Affected Product Areas

Public discovery, private entry, member musical workspace navigation and responsive usability. Existing scheduling, repertoire, preparation, publication selection and private data protection continue to govern the information and actions in each area.

## Open Questions

None.

## Product Acceptance

The proposed definition names the public and private areas, explains accurate current-area orientation and requires separate private pages without adding musical capabilities. Backstage clearly means member-only sign-in/entry; authenticated non-members and inactive members remain denied private information and operations at the security boundary. Direct entry, refresh, browser history and leaving unsaved edits have observable expectations. Public selected information remains available without membership and private material cannot leak into public areas.

The public interaction model is one scrolling page with visible-section tracking; private areas use separate pages. Existing Google identity plus manually provisioned active membership remains the authorization model. The proposed artifacts are future intent until the complete Product Change is explicitly approved, applied and accepted as a baseline.

## Out of Scope

Delivery tasks, application implementation, URL spelling, routing/framework selection, storage or identity-provider redesign, email-list implementation, administrator or invitation UI, new roles, automatic band enrolment, public editorial approvals, publishing member identities, content inventory, provisioning real members, paid infrastructure, musical workflow changes and changes to the logo or visual foundation.
