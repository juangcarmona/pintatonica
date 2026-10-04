---
name: inspect-ci-result
description: "Return the continuous integration result for a branch or pull request: outcome, failing job, and log excerpts. Use when checking whether CI passed or diagnosing why it did not."
---

One responsibility: report what CI actually did for a branch or pull request.

## Contract

| | |
| --- | --- |
| **Input** | A branch name or a pull request identifier. |
| **Output** | Per required check: its name, conclusion, and: where it failed: the failing job and a log excerpt. Plus one overall verdict. |
| **Writes** | Nothing. Read-only. |
| **Confirmation** | Not required, no external write. |

**Guarantees to the caller**

- Three states are distinguished and never collapsed: passed, failed, and **not yet run**.
- A check with no run for the current head is reported as having no result, never as passing.
- The set of checks reported is the set the branch protection **requires**, not merely those that happen to have run.

**Never**

- Treat a queued or in-progress run as a passing one.
- Report an empty result set as success, no checks having run is not the same as nothing failing.
- Re-run or cancel anything.

## Workflow

1. Resolve exact PR head SHA or branch revision and target. Read branch protection and applicable rulesets for required checks; read the current workflow definitions for expected evidence. Done when required and expected populations, or inability to read either, are explicit.
2. Inspect gh pr view statusCheckRollup and gh run list for the exact commit; paginate as needed. Reject older green revisions and distinguish PR merge-ref execution explicitly. Done when every relevant result is bound to the reviewed revision.
3. Return per-check passed, failed, pending or not-yet-run; for failures read gh run view logs and report job/excerpt. No published workflow or empty check set means no remote result, never success. Done when the overall verdict names unreadable/missing checks without rerunning or cancelling anything.

## Reference

Adaptation reference: [github.md](references/github.md). Project conventions and gates live in "docs/engineering-lifecycle.md".
