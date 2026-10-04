---
name: transition-work-item
description: "Apply exactly one workflow transition to one work item, chosen from those valid from its current state. Use when a stage advances an item."
---

One responsibility: move one work item through exactly one state transition.

## Contract

| | |
| --- | --- |
| **Input** | A work item identifier, and the target state or transition name. |
| **Output** | The item's new state, and the transition actually applied. |
| **Writes** | The work item's state in the tracker. |
| **Confirmation** | **Required.** Confirm before applying. |

**Guarantees to the caller**

- The transition applied was fetched from the item's **current** state, never assumed from a mapping table.
- Exactly one transition per invocation.
- A transition unavailable from the current state is reported together with the list of what is available.

**Never**

- Chain several transitions to reach a target state.
- Fire a transition the lifecycle configuration marks human-only.
- Reverse a human-only transition found already applied: report it as a signal instead.

## Workflow

1. Read the lifecycle mapping and the issue's current native state immediately before acting. This repository uses only OPEN/CLOSED; milestone names are body/plan evidence, not tracker states. Done when requested transition and actual state are known.
2. OPEN-to-OPEN stage mappings are no-ops: report unchanged state and delegate any evidence-body update to update-work-item. Never invent a status label. Done when the no-op is explicit.
3. Only integration permits OPEN-to-CLOSED after verified merge, Done and human approval. GitHub may already have closed it through the PR keyword; report that existing closure rather than repeat it. Otherwise show and confirm the close, then use `gh issue close N --repo juangcarmona/pintatonica --reason completed`. Done when one permitted transition has been applied and re-read.
4. Reopening, rejection or human cancellation is not agent-controlled. Report those states without reversing them. For unsupported transitions list the permitted integration closure and human-only transitions. Done when no invalid transition was attempted.

## Provenance

Authored against the toolkit contract for this project's native GitHub OPEN/CLOSED mapping; no status-label adapter has been copied.
