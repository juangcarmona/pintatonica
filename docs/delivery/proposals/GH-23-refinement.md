# GH-23 — Editorial inventory and Ready evaluation

Issue [#23](https://github.com/juangcarmona/pintatonica/issues/23), evaluated 2026-10-06 after PRs #24/#25/#26 integrated GH-20/GH-21/GH-22. The full issue, comments, accepted public journey, publication rule, current code and production inventory were read. Early read-only discovery proceeded alongside GH-22 as Juan authorized; it did not block that structural delivery. No application or production data is changed by this record.

## Verified inventory

The inventory replaces assumptions in the issue's initial examples. Static state comes from [content.ts](../../../src/public-site/content.ts), public rendering from [index.astro](../../../src/pages/index.astro) and [browser.ts](../../../src/public-site/browser.ts). [Sanitized operational evidence](../evidence/GH-23/private-inventory.json) records the read-only observation at 06:32 UTC; [anonymous public evidence](../evidence/GH-23/public-inventory.json) records production at 12:26 UTC after GH-22 integration.

| Content | Actual production state | Intended outcome | Source / required approval |
| --- | --- | --- | --- |
| Introduction | Existing minimal approved text: “Pintatónica es una pequeña banda de música.” | A short factual introduction specific to the band | Band-approved copy; candidate below awaits Juan |
| Logo/wordmark | Existing approved logo, unchanged by GH-20/GH-22 | Retain authoritative asset | Already available; no source modification |
| Public members | Static editorial array empty; no public roster requests | Explicitly approved public names and musical roles; optional fields absent unless approved | Band input required; private membership is not publication approval |
| Repertoire | Private songs and publicSongs both empty | Only deliberately selected real songs, or an honest empty state until supplied | Real song data and explicit selection through existing Backstage mechanism |
| Media | Static media array empty; no public song media entries | Approved public media, or honest absence | Band-approved links/assets and publication permission; no filler |
| Concerts | Private gigs and publicGigs both empty | Only real deliberately published gigs; currently honest absence | Confirmed event details and explicit selection; no fake future dates |
| Contact | Static contact null | Explicit band public channel, or honest absence | Deliberate approval; never reuse login/private contact |
| Private membership | One record, zero obvious synthetic candidates | Keep intentionally provisioned membership private | Operational identity is not editorial input; no additional provisioning requested |
| Backstage fixtures | Availability, rehearsals, songs, setlists and gigs empty; overrides collection group empty | No development fixtures presented as real data | No verified contamination and no justified deletion scope |
| Motto/tagline | None approved or published | Remain absent | No motto requested or invented |

One nonempty top-level collection was discovered and covered; no unknown collection was observed. The overrides collection group was counted, including potential orphaned records. Evidence retains only counts/categories/coverage limits, never identities, IDs, private field contents or credentials. Heuristic absence of obvious fixture markers does not establish the single member record's provenance or public approval. Empty unknown collections cannot be discovered. These are point-in-time observations, not a permanent contamination guarantee. No production writes, deletions, authentication changes or infrastructure changes occurred.

## Editorial input ready for review

Candidate introduction derived only from the factual history stated in issue #23:

> Pintatónica empezó con una idea sencilla: tocar juntos, construir un repertorio y, con el tiempo, llevarlo al directo.

This is **unapproved draft copy**, not a motto or committed public content. Juan may approve or revise it. Supply the current names and musical roles explicitly approved for public display; the issue expects four entries where approved, but the existing presentation and membership remain flexible. No name/role is inferred from chat, tests or private records. Descriptions, images and personal links stay absent unless deliberately supplied and approved. Media, gigs and contact may remain empty; no optional input is demanded merely to fill the layout.

## Product, architecture and delivery context

Governing accepted intent: ACT-VISITOR, [UC-PUBLIC](../../product/model/use-cases/uc-public.md), [BR-PUBLIC-SELECTION](../../product/model/business-rules/br-public-selection.md), [JRN-DISCOVER](../../product/model/journeys/jrn-discover.md), FR-PUBLIC, FR-REPERTOIRE, QR-SECURITY and QR-USABILITY. Editorial completion uses existing surfaces and deliberate selection. No Product Change is required: no new content type, CMS, profile editor, approval workflow or automatic publication is requested. A genuinely new semantic request would return to Product Change.

GH-20 established the evolved visual language, GH-21 improved implemented member journeys, and GH-22 supplied the public structure and exact-approved-field privacy guard. GH-23 now completes real content and approvals, rather than rebuilding those capabilities. [Crosscutting concepts](../../architecture/08-crosscutting-concepts.md), [infrastructure preview boundary](../../architecture/infrastructure.md), [design patterns](../../design/patterns.md) and [public-content operations](../../operations/public-content.md) apply. Existing static editorial entries are independent of private membership. Public Firebase projections expose only selected whitelists, never rehearsal material or internal preparation.

Current preview builds use production Firebase configuration; they are not an isolated test database. Existing seeding harnesses use explicit demo-pintatonica endpoints at 127.0.0.1 and refuse remote origins. Editorial fixture harnesses restore exact source and refuse concurrent changes. Production/preview observations use anonymous read-only checks. No fixture script may be run against a preview or production store, and no rule weakening, new Firebase project, credentials or paid environment is required. Existing runtime and five focused guard tests already prove populated synthetic presentation and private-data denial without live personal accounts.

## Reconciled acceptance boundary

- Published introduction and names/roles match explicitly approved inputs; no motto, biography, private chat or inferred personal data appears.
- Songs/gigs use only real deliberately selected records through existing publication boundaries. Empty current collections require no artificial population.
- Media/contact/descriptions/images remain absent with truthful states unless explicitly approved content is supplied.
- Verified production fixtures, if subsequently identified, have a concrete operational review before removal; current inventory justifies no cleanup.
- Deterministic synthetic tests and emulator fixtures remain isolated; previews sharing production Firebase receive no fixture writes.
- Full current functional/security checks, approved editorial static-shell guard and mobile/desktop production rendering remain green; real-account OAuth is not required for automated tests.

## Definition of Ready

| Adopted dimension | Evaluation |
| --- | --- |
| Title | Met: concrete editorial completion outcome |
| Description | Met: full issue and verified inventory distinguish actual state from assumed fixtures |
| Actor / stakeholder | Met: ACT-VISITOR; band members approve their public editorial information; Juan owns delivery review |
| Priority | Met: Juan's sequence GH-20 → GH-21 → GH-22 → GH-23 |
| Dependencies | Structural prerequisites met; genuine external editorial approval/input remains outstanding |
| Acceptance criteria | Observable criteria reconciled above; copy/name/role approval cannot be assumed |
| Scope | Met: existing content surfaces and hygiene; no CMS, provisioning expansion, fabricated content or infrastructure change |
| Product rules | Met: accepted public-selection and privacy boundary; no semantic gap found |
| Affected behaviour | Met: visitor discovery and deliberately provisioned private data, without new journeys |
| Quality expectations | Met: truthful content, privacy, responsive accessibility, existing cost/security boundaries |
| Test impact | Met: approved production rendering, private leakage rejection, public-selection denial and fixture isolation |
| Existing decisions | Met: accepted baseline, arc42/design/operations and integrated GH-20/21/22 |
| Unknowns / risks | **Unmet for editorial publication:** approved replacement introduction and public names/roles are not supplied. Juan/band decide; no engineering inference can substitute |

Verdict: inventory/hygiene assessment complete; **publication remains blocked on external editorial input/approval**. The existing approved minimal introduction and empty states remain safe. No Ready/Planned/Done claim is made for completing the required real-member publication. After input is supplied, reconcile this record, then proceed with propose → implement → verify → independent audits → integrate → review under Juan's existing authorization. Issue stays OPEN. No production deletion is proposed.

Review debt: GH-20/21/22 entries are recorded; earlier GH-1–GH-9 review debt remains disclosed and does not block this item. GH-22 postmerge documents are separately committed carryover on this branch. No measured effort telemetry is available.
