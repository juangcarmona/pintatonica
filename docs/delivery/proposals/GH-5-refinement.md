# GH-5 — Agree the next rehearsal

## Problem, actor and priority

An active member (ACT-MEMBER) needs to turn a candidate agreed with the band into a shared upcoming rehearsal. This is slice 5 in Juan's order; GH-4 supplies distinct candidates, GH-2 enforces membership.

## Acceptance criteria and scope

UC-CONFIRM, BR-REHEARSAL-CONFIRMATION, JRN-NEXT-REHEARSAL and the confirmation portion of FR-SCHEDULING govern the outcome. An active member explicitly confirms candidate timing and expected/available participants after external agreement. Full and partial attendance remain distinguishable. Saved rehearsals are shared and survive reload, separately from candidates; detection never writes a rehearsal. Nonmembers/inactive members cannot confirm at the data layer. Failed/pending writes never appear confirmed. Mobile/desktop, security/cost/design/verification obligations remain binding.

No voting, RSVP, cancellation/rescheduling policy, calendar synchronization, chat, notifications or new role. All required members remain dynamic; attendance is settled explicitly for this rehearsal rather than assumed from detection. No semantic question blocks refinement.

## Ready

All lifecycle dimensions satisfied: concrete title/problem/actor, approved priority, merged predecessors, observable criteria/scope/product rules, named affected behaviour, applicable quality artifacts, meaningful full/partial persistence/failure/denial test impact, existing static/Firebase/design decisions and resolved policy risks. No attachments needed. Earlier retrospective debt is nonblocking.

## Lifecycle

Ready under Juan's explicit sequential FF-through-9 authorization. Durable plan: docs/delivery/plans/GH-5.md; one branch/PR. GitHub closes only after integration. No fabricated approval or bypass.
