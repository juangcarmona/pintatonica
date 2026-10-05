# GH-9 — Public presence and final MVP polish

## Proposal

Deliver [Ready outcome](../proposals/GH-9-refinement.md), issue #9: UC-PUBLIC, FR-PUBLIC, BR-PUBLIC-SELECTION, JRN-DISCOVER and applicable accepted quality constraints. Product intent stays unchanged. Durable plan precedes code; native plan mode unavailable. Juan explicitly authorized audited FF-through-9 including engineering/test decisions and merge/deployment.

## Design

Static editorial sections use a small typed repository-owned public-content file with factual known introduction and optional approved contact/media; missing input remains explicitly empty. Visitors read only the publicSongs/publicGigs whitelists, never private collections. Browser rendering uses textContent and guarded external links, with separate empty/error states and Madrid upcoming-gig selection. No anonymous publication form, CMS or new service. Existing asset remains byte-identical.

Apply Juan's recorded feedback: document title only Pintatónica, Backstage private entry in ink, remove invented motto and terminal decorative wordmark dot, fixed navigation with four horizontal brand-colour menu lines. Accessible mobile toggle, Escape/link dismissal, resize and keyboard skip; desktop navigation and public anchors. Private section navigation offers direct access to rehearsals, availability, repertoire, setlists and gigs without remounting drafts. Existing tokens remain canonical; derived navigation geometry uses tokens. Reconcile design and affected arc42 quality/runtime/read boundaries; document expected free-tier workload with provider sources and truthful observed billing limits.

## Tasks

- [ ] TDD public safe-data/upcoming/brand regressions and typed editorial surface.
- [ ] Public sections/selected music-media-gigs, honest content/error states, fixed accessible branded navigation and Backstage section navigation.
- [ ] Actual anonymous/mobile/desktop/keyboard/public isolation browser checks; rerun predecessor access/scheduling/confirmation/repertoire/preparation/setlist journeys and inspect screenshots.
- [ ] Free-tier/operations evidence and documentation reconciliation; full current CI-derived checks and independent implementation audit.
- [ ] Fresh integration audit; fold/archive/final-head checks/audit, ready screenshot PR, authorized merge and native production observation.

## Test plan and Done

Built-page regressions assert approved title/wordmark/tone/navigation/sections, immutable logo, absence of private account/names/data and guarded member dashboard. Pure public-data tests reject unsafe links and sort/filter Madrid gigs. Browser demo seeds selected/unselected songs/gigs, private material and past events, then anonymously proves only intended fields, public discovery and real denied private reads; menu keyboard/Escape/resize/navigation and configured editorial contact/media rendering are exercised without publishing fixtures. All earlier browser suites rerun against current source. Frozen install/security/full pnpm verify, design/citations/Markdown/diff checks, source identity, inspected screenshots, exact-head CI/native checks and independent audits satisfy all applicable Done dimensions under Juan's recorded authorization. Report pending real contact/media, provider access, SDK warning/browser coverage and quota assumptions honestly; do not claim measured production traffic or new paid infrastructure.
