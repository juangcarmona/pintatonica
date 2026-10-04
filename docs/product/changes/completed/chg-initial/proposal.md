# CHG-INITIAL refinement working memory

## Sitting scope and authority

Juan explicitly supplied the MVP decisions recorded verbatim in [evidence/mvp-decisions.md](evidence/mvp-decisions.md). Update this same draft proposal and its acceptance behaviours; do not approve, apply or archive. These decisions supersede the earlier optional partial-display wording and unresolved membership, duration, permissions, public selection, horizon and MVP-boundary policies.

## ProductShape host context

Manifest: change.md. Proposed future state: proposed/. Accepted intent: docs/product/model/, intentionally empty. The released CLI has no overlay graph option; inspect/impact resolve only accepted artifacts. This proportional review uses declared proposal edges checked by `prodshape change validate CHG-INITIAL`, not a fabricated accepted graph. Baseline validation is `prodshape validate --format json`.

## Evidence

- [Initial supplied intent](evidence/juan-intent.md).
- [Prototype observation](evidence/calendar.md), evidence rather than inherited architecture/security.
- [Current verbatim decisions](evidence/mvp-decisions.md), authoritative for this refinement batch.
- The historical attendance answer below remains provenance; current decisions supersede its optional/configurable details.

## Proportional relationship review

| Changed node | Neighbours / declared relationship | Polarity | Outcome |
| --- | --- | --- | --- |
| BR-MEMBERSHIP | ACT-MEMBER; UC-ACCESS and private UCs governed-by; FR-ACCESS derived-from; member/denial scenarios illustrate | Incoming consumers | Affected: active records, /band, own availability, shared editing, manual provisioning; no administrator role |
| BR-OPPORTUNITY / BR-PARTIAL-AVAILABILITY | UC-OPPORTUNITIES governed-by; FR-SCHEDULING derived-from; SB-OPPORTUNITY / SB-PARTIAL-WINDOW illustrate; opportunity/horizon terms | Incoming consumers | Affected: all active members, fixed two hours/six weeks, mandatory separate partial windows with two-member minimum and presentation preference |
| BR-REHEARSAL-CONFIRMATION | UC-CONFIRM / UC-PREPARE governed-by; FR-SCHEDULING derived-from; next-rehearsal journey steps | Incoming consumers | Affected: any active member explicitly confirms full or partial candidates; attendance is shown and remains a per-rehearsal choice |
| UC-PREPARE / UC-SETLIST | FR-PREPARATION derived-from; rehearsal/gig journeys steps | Incoming consumers | Affected: view and update shared songs/focus/notes, any active member editing, no task machinery |
| BR-PUBLIC-SELECTION | UC-PUBLIC / UC-REPERTOIRE / UC-SETLIST governed-by; FR-PUBLIC / FR-REPERTOIRE derived-from | Incoming consumers | Affected: explicit editorial selection and protected internal resources; exact song list excluded from policy |
| CON-SINGLE-BAND | Public, repertoire and preparation FRs derived-from | Incoming consumers | Affected: explicit initial MVP and deferrals; no technical backlog |
| QR-COST-OPERATIONS | BC-PINTATONICA applies-to | Outgoing scope | Affected: zero recurring infrastructure charges, free-tier fit verified in architecture; optional external domain excluded |
| BR-AVAILABILITY / FR-AVAILABILITY / SB-DATE-EXCEPTION | UC-AVAILABILITY governed-by / derived-from / illustrates | Incoming consumers | Checked and unchanged: date overrides replace that date's habit, multiple intervals, Madrid time; own-edit rights supplied by membership rule |
| Visitor/public-discovery, resource/ song/setlist terms, remaining quality requirements | Existing journey/term/scope edges | Both | Checked: retain public band identity, resource linking, mobile-first, type safety/security/automation without extra product scope |

## Remaining questions and conscious deferrals

No material product-policy decision remains blocking approval in this sitting. Whether everyone attends is resolved for each explicitly confirmed rehearsal through its expected/available member list, not by a new global attendance policy.

Architecture must document expected normal band usage and verify free-tier fit; no vendor or fabricated workload quota is inserted into product intent. Exact public songs, gig/media content and existing document inventory are editorial/content inputs. Manual membership provisioning is an operational concern. Required metadata details and device coverage can be elaborated during delivery without expanding scope.

Google Calendar sync, notifications, chat/messaging, automated membership administration, granular roles, horizon/duration configurability, generic tenancy, advanced events, media hosting and replacement of Drive/Docs are explicitly deferred. Separate punctual-interval merging is not an additional promised capability: the MVP supports date overrides and multiple intervals. No architecture/design/backlog is created here.

## Verbatim decisions and provenance

The current complete answer is preserved verbatim in [evidence/mvp-decisions.md](evidence/mvp-decisions.md). Each affected row above maps to its corresponding answer section. No answer was invented.

## Historical interview answer


### 2026-10-04 — attendance hierarchy

Question: show only full-group opportunities, or also show partial-group windows separately?

Juan's complete answer, verbatim:

> I'd say:
> Also show partial-group windows separately.
> But with a very clear hierarchy:
> - Full-group opportunity = all required members are available simultaneously for at least 2 hours.
> - Partial-group window = a relevant subset overlaps, but it doesn't count as a primary group rehearsal opportunity.
> I wouldn't mix the two in a single list, as that would break the semantics the prototype already has.
> The rule would be better phrased like this:
> BR-OPPORTUNITY
>
> A full-group rehearsal opportunity exists when all required active members
> share a continuous availability window of at least the configured minimum duration.
>
> Partial-group overlaps may be surfaced separately as coordination hints,
> but they are not classified as full-group rehearsal opportunities.
>
> And I would add a separate decision:
> BR-PARTIAL-AVAILABILITY
>
> The product may display partial-group overlap windows to help coordination,
> including the participating members and duration.
>
> Partial-group windows must be visually and semantically distinct from
> full-group rehearsal opportunities.
>
> This gives you more utility without undermining the core concept. If someone is missing tomorrow because they can't make it, the system remains useful; yet a 3/4 scenario never appears as if it were equivalent to a 4/4 one.

Edits traced to this answer: BR-OPPORTUNITY and TERM-REHEARSAL-OPPORTUNITY now define primary full-group semantics; BR-PARTIAL-AVAILABILITY independently governs hints; UC-OPPORTUNITIES and FR-SCHEDULING separate the outputs; SB-OPPORTUNITY makes the required set and configured two-hour example explicit; SB-PARTIAL-WINDOW verifies three-of-four never becomes a full-group opportunity, week highlight or confirmed rehearsal. The manifest lists both additions. No membership role, required-set selection policy or partial-hint threshold has been added.


## Readiness conclusion

The existing 55-artifact draft is semantically ready for explicit human approval with final overlay validation reporting zero errors and zero warnings: MVP boundary, access, scheduling, partial presentation, confirmation, shared editing, public selection and cost policy are settled. Acceptance scenarios cover fixed-policy thresholds, required separation, partial confirmation, focus updates, public-data protection and free-tier cost assessment. Approval remains a separate human action. Nothing is approved, applied or archived, and the accepted model remains empty.

Final checks: `prodshape change validate CHG-INITIAL --format json` and `prodshape validate --format json` both passed with empty diagnostics, zero errors and zero warnings. Accepted artifacts: 0; live changes: 1. No files in the accepted model were edited.
