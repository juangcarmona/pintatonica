# MVP delivery map

Derived delivery state from the accepted [ProductShape model](../product/model/), not another source of product intent. Slice numbers below are ordering references, not GitHub issue identifiers or new lifecycle states. Slices 1–7 are merged and deployed; slice 8 is active. Juan authorized sequential FF delivery through slice 9 on 2026-10-05. Slice 9 is prepared but remains unstarted; each receives its own plan, verification, independent audit and PR before integration.

The canonical lifecycle remains [engineering-lifecycle.md](../engineering-lifecycle.md): refine → propose → human Planned gate → implement → verify/audit → integrate → review. No SDD framework or technical-layer backlog is introduced.

## Ordered slices

| Order | Slice and user/product outcome | ProductShape traceability | Dependencies | Acceptance boundary | Explicit exclusions |
| --- | --- | --- | --- | --- | --- |
| 1 | **[Executable web shell](https://github.com/juangcarmona/pintatonica/issues/1)** — Pintatónica has a runnable, buildable branded web entry point and /band shell deployable through the existing Cloudflare connection. | QR-VERIFICATION, QR-MAINTAINABILITY, QR-USABILITY, QR-COST-OPERATIONS, QR-SECURITY, CON-SINGLE-BAND; foundations for FR-PUBLIC and FR-ACCESS only | Current scaffold; confirmed Cloudflare connection; existing tokens/assets and Firebase client | Local dev, production build, both empty branded shells, browser-only Firebase wiring, unchanged existing checks plus shell verification | Login, membership flows, private data reads/writes, scheduling, repertoire, focus, setlists, complete public content; does not claim FR-PUBLIC or FR-ACCESS delivered |
| 2 | **[Recognised member access](https://github.com/juangcarmona/pintatonica/issues/2)** — active members enter /band through Google; others cannot access private data. | ACT-MEMBER, UC-ACCESS, FR-ACCESS, BR-MEMBERSHIP, QR-SECURITY, SB-MEMBER-IDENTIFIED, SB-NON-MEMBER-DENIED | 1; Google provider enabled; manually provisioned membership and matching data rules | Sign-in/out and identity recognition; active/inactive/non-member direct-access checks; safe member dashboard | Administrator UI, automated provisioning, granular roles, musical feature pages |
| 3 | **[Keep rehearsal availability current](https://github.com/juangcarmona/pintatonica/issues/3)** — members save weekly habits and date overrides, inspect the next six weeks and others' saved availability. | UC-AVAILABILITY, FR-AVAILABILITY, BR-AVAILABILITY, BR-MEMBERSHIP, TERM-PLANNING-HORIZON, SB-DATE-EXCEPTION | 2 | Persistent own edits, multiple intervals, empty-date overrides/restoration, Madrid-time six-week inspection, permitted band reads and denied cross-member writes | Opportunity detection, confirmation, duration/horizon configuration, additional punctual-merge policy |
| 4 | **[Find full-group and partial windows](https://github.com/juangcarmona/pintatonica/issues/4)** — the band sees useful possibilities without manually comparing schedules. | UC-OPPORTUNITIES, scheduling portion of FR-SCHEDULING, BR-OPPORTUNITY, BR-PARTIAL-AVAILABILITY, SB-OPPORTUNITY, SB-PARTIAL-WINDOW | 3 | Existing scheduling scenarios for dynamic all-active membership, continuous two-hour threshold, full-group highlighting, separate mandatory partial windows with participants/duration and presentation preference | Confirmation, notifications, settings, automatic agreement |
| 5 | **[Agree the next rehearsal](https://github.com/juangcarmona/pintatonica/issues/5)** — any active member explicitly confirms a full or partial candidate; the shared upcoming rehearsal shows intended attendance. | UC-CONFIRM, confirmation portion of FR-SCHEDULING, BR-REHEARSAL-CONFIRMATION, JRN-NEXT-REHEARSAL | 4 | Explicit full/partial confirmation, saved time and expected/available members, upcoming visibility, distinguishable attendance, no automatic creation | Calendar sync, chat, RSVP/voting machinery, cancellation/rescheduling policies not established in the baseline |
| 6 | **[Use and maintain repertoire](https://github.com/juangcarmona/pintatonica/issues/6)** — members find song information/resources and update shared metadata safely. | UC-REPERTOIRE, FR-REPERTOIRE, BR-MEMBERSHIP, BR-PUBLIC-SELECTION, JRN-USE-REPERTOIRE, TERM-SONG-RESOURCE | 2; delivered after 5 to complete scheduling first | Song browse/details and active-member edits; external resource links; explicit public/private selection; protected internal resources | Media hosting, Drive replacement/migration, complex CMS; public presentation completed in 9 |
| 7 | **[Prepare a confirmed rehearsal](https://github.com/juangcarmona/pintatonica/issues/7)** — members view and update its selected songs and lightweight musical focus. | UC-PREPARE, rehearsal-focus portion of FR-PREPARATION, BR-MEMBERSHIP, BR-REHEARSAL-CONFIRMATION, JRN-PREPARE-REHEARSAL | 5 and 6 | Rehearsal time/attendance plus shared editable songs/focus/notes and resource access; saved changes visible to other members | Task/project-management machinery; optional ordered rehearsal setlist lands in 8 |
| 8 | **[Prepare setlists and basic gigs](https://github.com/juangcarmona/pintatonica/issues/8)** — members share ordered musical plans for rehearsals/performances and basic publishable gig information. | UC-SETLIST, setlist portion of FR-PREPARATION, gig portion of FR-PUBLIC, BR-MEMBERSHIP, BR-PUBLIC-SELECTION, JRN-PREPARE-GIG, TERM-GIG, TERM-SETLIST | 6; 5 for rehearsal association; follows 7 | Shared song ordering, approximate duration/performance notes, rehearsal/gig association; basic public gig data separated from private preparation | Booking, ticketing, advanced events, media hosting, notifications |
| 9 | **[Complete the public band presence and MVP journey polish](https://github.com/juangcarmona/pintatonica/issues/9)** — visitors discover Pintatónica, selected repertoire/media, upcoming gigs and contact; members use the complete MVP comfortably on mobile/desktop. | UC-PUBLIC, FR-PUBLIC, BR-PUBLIC-SELECTION, JRN-DISCOVER, QR-USABILITY, QR-SECURITY, QR-COST-OPERATIONS, QR-VERIFICATION | 6 and 8; final full-journey check across 2–8; Juan-supplied public content/assets | All public content areas and explicit editorial selection; responsive, accessible band tone; complete journey/security/cost/deployment evidence | Invented biographies/contact/gigs, unlicensed assets, generic SaaS, advanced editorial workflow, new features hidden under polish |

## Why this order

The shell resolves today's absence of executable build/deployment output. Access precedes every private-data workflow. Saved availability precedes calculation; calculation precedes confirmation. Repertoire precedes song-based preparation and setlists; confirmed rehearsals precede their focus. Setlists and basic gigs provide the final public site's real content. Public polish comes last, but every slice must already meet applicable design, usability, security and verification expectations—quality is not deferred to slice 9.

QR-SECURITY, QR-USABILITY, QR-MAINTAINABILITY, QR-COST-OPERATIONS, QR-VERIFICATION and CON-SINGLE-BAND govern every applicable slice. References to a broad artifact do not claim its whole delivery early: the table explicitly partitions FR-SCHEDULING and FR-PREPARATION. The first slice is a requested delivery enabler, not a completed product journey.

## Selected work and lifecycle handoff

- [Executable web shell — refined issue draft](proposals/executable-web-shell-issue.md).
- [Completed GH-1 implementation plan](completed/GH-1.md) and [merged PR #10](https://github.com/juangcarmona/pintatonica/pull/10).
- [Archived GH-2 access plan](completed/GH-2.md) and [PR #12](https://github.com/juangcarmona/pintatonica/pull/12) record recognised access.
- [Archived GH-3 availability plan](completed/GH-3.md) and [merged PR #13](https://github.com/juangcarmona/pintatonica/pull/13) record saved availability.
- GitHub issues #1–#9 are published. GH-1–GH-7 are closed, merged and deployed. [Remaining-slice readiness](proposals/remaining-slices-readiness.md) records questions/inputs; [Archived GH-4 plan](completed/GH-4.md) records opportunity inspection; [Archived GH-5 plan](completed/GH-5.md) records confirmation; [Archived GH-6 plan](completed/GH-6.md) records repertoire; [Archived GH-7 plan](completed/GH-7.md) records shared focus; [GH-8 plan](completed/GH-8.md) is current. Slice 9 remains unstarted.

## Product gaps and delivery risks

No genuine product semantic gap or contradiction was found that requires a Product Change. Baseline artifacts remain untouched. Editorial public content and actual member identities are supplied operational inputs, not new product policy. Repository-managed repertoire versus browser editing needs an architectural solution when slice 6 is planned; it is not permission to weaken shared editing or create a CMS feature.

The accepted model is present and validates with 55 artifacts. Its individual frontmatter statuses remain draft after official application; this delivery map relies on Juan's explicit baseline acceptance and the applied change, and does not mutate those statuses. GH-1 reconciled affected architecture and lifecycle documentation and verified the existing Cloudflare deployment. See [completed plan](completed/GH-1.md) and [deployment evidence](evidence/GH-1/README.md) for actual outcomes and limitations.

## ProductShape citations

The CLI-generated citations below bind the map's artifact references to current baseline content. They support delivery traceability, not a new requirement set.
<!-- pdac:cite id="ACT-MEMBER" digest="sha256:046bad46f7bea155aeb54f4a8c0d80dc1ec695474b202d37ed958c6deafbc43b" -->

<!-- pdac:cite id="BR-AVAILABILITY" digest="sha256:3846c5660be556161069445fe1cf8c8e96bb2fe5df0cc36121a5d8a2def914b3" -->

<!-- pdac:cite id="BR-MEMBERSHIP" digest="sha256:409b040a33d66b37f725e3cc707f503832341a2f52c3504ee3fea3c851a5cd45" -->

<!-- pdac:cite id="BR-OPPORTUNITY" digest="sha256:cc00716d47bbf9de4c555b4f9aa4fb723b5e0f35b20f1e7b5b76612760708cbc" -->

<!-- pdac:cite id="BR-PARTIAL-AVAILABILITY" digest="sha256:4dcaed9a79b26c7c14a9ba566caccd46d0ac83e8722b3234324921f685eb6168" -->

<!-- pdac:cite id="BR-PUBLIC-SELECTION" digest="sha256:573557a2468714b35e9fdbd01c58bd6822d12d6f66998c818c0eac96f35b4807" -->

<!-- pdac:cite id="BR-REHEARSAL-CONFIRMATION" digest="sha256:2522bd383ef243a1aced24f77f917fced2c7c03178d6f077717a56b4be9c5ef0" -->

<!-- pdac:cite id="CON-SINGLE-BAND" digest="sha256:59e879c69ee07f61737be895e059ea3b1be35d6f3a82236715821277082dfabb" -->

<!-- pdac:cite id="FR-ACCESS" digest="sha256:d204efca1c924cd6c70f21eea5b7d0c82d16f3ebbac6dd698e52d910a7db7c14" -->

<!-- pdac:cite id="FR-AVAILABILITY" digest="sha256:76b84c21229736ace1a172389d896eb8472a17b0869c25ddf4e87d6becdf9a85" -->

<!-- pdac:cite id="FR-PREPARATION" digest="sha256:0bc5dae67dd450f814bafba786a9bcb657ecba07acada44b3c9f3113ee70b50f" -->

<!-- pdac:cite id="FR-PUBLIC" digest="sha256:46aabeb5bd38ee43137c55e7fe8b7e108de20cd2b4d318c250de46c2494095c3" -->

<!-- pdac:cite id="FR-REPERTOIRE" digest="sha256:19c0f3e6a2bf99f8ce11f96b382d0d029570459ab8638cd6fa0cdef6073689f4" -->

<!-- pdac:cite id="FR-SCHEDULING" digest="sha256:d8c50417079fc3b286eb9a0164ac4ec6d53f8163b5d79a5761b2f7d3dc1f1a3f" -->

<!-- pdac:cite id="JRN-DISCOVER" digest="sha256:361a772c191ae0dd81d07c686255053a0c064ca865f4e8f0e5186de9170f360a" -->

<!-- pdac:cite id="JRN-NEXT-REHEARSAL" digest="sha256:2d387a217db7638b5dbe82d379e2d862a0af7a098d65b34cb27af88b8494a3ea" -->

<!-- pdac:cite id="JRN-PREPARE-GIG" digest="sha256:f9da46949405bd727621e743bb131ce4d573164ef3a3e9aebebe9d6d5f7d526c" -->

<!-- pdac:cite id="JRN-PREPARE-REHEARSAL" digest="sha256:d55f97d6944140ffca39b9da70ce7fdf79a301791ffee6fe084636feaf60f24c" -->

<!-- pdac:cite id="JRN-USE-REPERTOIRE" digest="sha256:565f2d9a9da3cc0cded6ea30560d48eb85db0910e6f52d2a1acc21fd33bba92e" -->

<!-- pdac:cite id="QR-COST-OPERATIONS" digest="sha256:18df4d28e10c2b4f64596df6196e2fc404334d4854653a6c53abc424c790230c" -->

<!-- pdac:cite id="QR-MAINTAINABILITY" digest="sha256:40a7ffe79142cd37afaf6d04a8edcc62d666a539ad54de1c0357acc8244dc362" -->

<!-- pdac:cite id="QR-SECURITY" digest="sha256:cc17a6ca5aa934716df56692e158d82384992152e4f3fdfd57bc1a83ff1ca9e9" -->

<!-- pdac:cite id="QR-USABILITY" digest="sha256:bdeb7fc494fdad4f94d8c8b1ca67a0289ae7f31d39afab9a5a0250537c6e6f7b" -->

<!-- pdac:cite id="QR-VERIFICATION" digest="sha256:1a0f617f80f103442dddf61fc11a360e4ca9e023d6f18bcace259ffa3fa0e73e" -->

<!-- pdac:cite id="SB-DATE-EXCEPTION" digest="sha256:2875bb29b41188545f74c6da1e404bfc681cd719751a43c9b3bc3cf252e2684b" -->

<!-- pdac:cite id="SB-MEMBER-IDENTIFIED" digest="sha256:0e2d4f3706e01162576b656db4e4961675377bcfab11ed29c859b3d960d5c633" -->

<!-- pdac:cite id="SB-NON-MEMBER-DENIED" digest="sha256:bccc135a30a24d09353eb35e9d30f533a19c7b30d8475fd59ccc9974296c38bd" -->

<!-- pdac:cite id="SB-OPPORTUNITY" digest="sha256:9c3c657d528309762beb60720758c82b8744035453b13818c9154889d16abe49" -->

<!-- pdac:cite id="SB-PARTIAL-WINDOW" digest="sha256:2c1bc3f5d9b3017fd26c06845c07d38747d92e7ef9dd77b1fe723f470c5fab4e" -->

<!-- pdac:cite id="TERM-GIG" digest="sha256:a5760a9d82a26494ac2fac013112f2f931b211008b6d423188e63ef3371c8a83" -->

<!-- pdac:cite id="TERM-PLANNING-HORIZON" digest="sha256:f29bed5a3f27a9d12168125820dcbb9a94b93a3ef715433a8ad3a1fcdbdac823" -->

<!-- pdac:cite id="TERM-SETLIST" digest="sha256:da37acd0070ccbe70cf632a7ad003fff7867c946877a75ee7e1ea6132a86a345" -->

<!-- pdac:cite id="TERM-SONG-RESOURCE" digest="sha256:0985b37dc50bb506b97e12fd123e849b669aae5191e23580c5b9f1493757eea4" -->

<!-- pdac:cite id="UC-ACCESS" digest="sha256:314f550728dff6142bcf2e1706bd29a33f371d4e88df014dba8b47cb815201de" -->

<!-- pdac:cite id="UC-AVAILABILITY" digest="sha256:4a1ed60fdab4541a8d111290ff21a5ab9184878bb543a9c4a6babc7ff0bb091e" -->

<!-- pdac:cite id="UC-CONFIRM" digest="sha256:7589c31d90efe8412da334802ddbab2034180844929815870de50bf77f85a46d" -->

<!-- pdac:cite id="UC-OPPORTUNITIES" digest="sha256:8d9ed168916cdbc801d1966c6c31d15285a61d014e7d24b704f28a44f42c4919" -->

<!-- pdac:cite id="UC-PREPARE" digest="sha256:b88c6b68b7d051a041d94118c79e2c1929b40681a7be22f79820a8a3e8fd768a" -->

<!-- pdac:cite id="UC-PUBLIC" digest="sha256:4ed19e5a08ae69b1f3008e32f3afeacffd4a50ccfed9bc181507eb12067e9ce8" -->

<!-- pdac:cite id="UC-REPERTOIRE" digest="sha256:718e20283024d4a35875a1c3f7f28783b3e2bd8e7c696b9d4992d5a41ed38f27" -->

<!-- pdac:cite id="UC-SETLIST" digest="sha256:fb25b1351f4cc5aef0e68ae3783dcb303d03317814d4c89fbb2dd0d68eb58fc6" -->
