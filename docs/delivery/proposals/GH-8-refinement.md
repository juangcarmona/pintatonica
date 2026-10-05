# GH-8 — Ready evaluation

Members need ordered musical plans and basic gig information, not event administration. Issue #8 derives from UC-SETLIST, FR-PREPARATION (setlists), FR-PUBLIC (gigs), BR-MEMBERSHIP, BR-PUBLIC-SELECTION, JRN-PREPARE-GIG, TERM-GIG and TERM-SETLIST. Dependencies GH-5–GH-7 are delivered. No product gap or blocking question.

| Ready dimension | Verdict |
| --- | --- |
| Title, description | Shared setlists/basic gigs, concrete user outcome |
| Actor | ACT-MEMBER; public gig viewers ACT-VISITOR |
| Priority | Juan sequential FF order |
| Dependencies | Shared repertoire and confirmed rehearsals |
| Acceptance criteria | Create/edit ordered songs, approximate duration and performance notes; associate rehearsal/gig; reload/another member sees saved order; deliberately public gig data excludes private preparation |
| Scope | Lightweight setlists and basic gig information only |
| Product rules | All active members edit; explicit safe public selection |
| Affected behaviour | Musical preparation and public gig data |
| Quality | Existing privacy, responsive usability, free-tier operations, automated verification |
| Test impact | Ordering/validation, shared persistence/conflict, gig publication/unpublication, anonymous private denial |
| Existing decisions | Existing Firestore and ADR-0002 atomic projection mechanism; current tokens |
| Unknowns / risks | Concurrent edits and stale projections; no event-management policy invented |

Ready under Juan's explicit FF-through-9 authorization. No real production songs/gigs are invented or seeded. Retrospective debt remains non-blocking.
