---
name: inspect-pull-request
description: "Return a pull request's review state: status, reviewer votes, comment threads, merge readiness. Use when checking whether a pull request is approved or why it cannot merge."
---

One responsibility: report where one pull request stands with its reviewers.

## Contract

| | |
| --- | --- |
| **Input** | A pull request identifier. |
| **Output** | Draft state, reviewer votes, unresolved comment threads, required-check status, and merge readiness. |
| **Writes** | Nothing. Read-only. |
| **Confirmation** | Not required, no external write. |

**Guarantees to the caller**

- Approval is reported as of **now**, not as of an earlier read: votes reset when new commits land.
- Unresolved threads are listed with their content, so the caller knows what is actually blocking.

**Never**

- Approve, vote, or resolve a thread.
- Report a draft pull request as merge-ready.

## Workflow

1. Resolve the PR and inspect current draft/state/head SHA, reviews, review decision, check rollup and merge state using gh pr view. Done when facts refer to the current revision.
2. Read reviewThreads through the reference GraphQL query, paginating all threads; report unresolved non-outdated threads and their content. Done when no thread is hidden by pagination.
3. Read the actual target's protection and applicable rulesets to establish required checks/reviews. Permission failure is unknown, not no protection. Empty reviewDecision is not approval; report separately any explicit Juan gate decision tied to the reviewed SHA. Done when merge readiness identifies every unmet or unreadable condition without casting votes or resolving threads.

## Reference

Adaptation reference: [github.md](references/github.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
