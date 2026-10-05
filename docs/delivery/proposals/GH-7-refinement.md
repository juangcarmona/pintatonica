# GH-7 — Ready evaluation

Member outcome: prepare an upcoming confirmed rehearsal with shared songs and lightweight focus, using existing repertoire resources. Accepted UC-PREPARE, FR-PREPARATION (focus only), BR-MEMBERSHIP, BR-REHEARSAL-CONFIRMATION and JRN-PREPARE-REHEARSAL govern this slice. GH-5/GH-6 are its prerequisites. No semantic gap or blocking question.

| Ready dimension | Verdict |
| --- | --- |
| Title, description | Concrete shared musical preparation outcome, issue #7 |
| Actor | ACT-MEMBER |
| Priority | Juan's sequential FF-through-9 order |
| Dependencies | Confirmed rehearsals and shared repertoire delivered |
| Acceptance criteria | Save selected existing songs and focus; reload and another member see them beside timing/attendance; open linked resources; failed/unsaved edits never claim saved |
| Scope | Shared rehearsal focus; no tasks, roles, notifications or setlists (GH-8) |
| Product rules | Accepted artifacts above; members edit shared preparation |
| Affected behaviour | Upcoming rehearsal details and resource access |
| Quality | Existing security, responsive usability, verification and cost constraints |
| Test impact | Selected-song validation, member/denied writes, saved reload, conflict and failure preservation |
| Existing decisions | Existing Astro/browser Firestore, tokens and ADR-0002; no new provider |
| Unknowns / risks | Concurrent shared drafts need protection; external resources keep provider permissions |

Ready. Juan explicitly delegated bounded planning and verified integration; normal tracker state stays OPEN. Retrospective entries for prior slices remain outstanding and non-blocking.
