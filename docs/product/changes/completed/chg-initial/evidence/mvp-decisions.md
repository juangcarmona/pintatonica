# Juan's MVP refinement decisions

Source: Juan's explicit instruction in this repository session. The decision text below is verbatim. It authorises updating the proposed artifacts, not approving, applying or archiving CHG-INITIAL.

### Missing intent

- **Private area path:** make `/band` the intended private application surface. This is product intent, not merely routing detail, because it distinguishes public and member-facing experiences.
- **Rehearsal preparation:** members must be able not only to view but also to update rehearsal focus: songs to work on plus lightweight notes/focus for that rehearsal. Do not turn this into task/project management.
- **Cost:** strengthen `QR-COST-OPERATIONS`. The MVP MUST operate with no recurring infrastructure charge under normal Pintatónica usage. A custom domain is explicitly outside that constraint because it is optional and externally purchased.

### Partial availability

Separate partial-group windows are **mandatory in the MVP**.

Rules:

- A **full-group opportunity** is an overlap containing all required active members for at least the minimum rehearsal duration.
- A **partial-group window** is an overlap containing at least 2 required active members but fewer than all of them.
- Partial windows must be displayed separately and must never be classified or presented as full-group opportunities.
- Prefer higher participation and longer duration when presenting partial windows.
- Partial windows are coordination information, not confirmed rehearsals.

Update `BR-PARTIAL-AVAILABILITY`, `FR-SCHEDULING`, `UC-OPPORTUNITIES` and `SB-PARTIAL-WINDOW` so this is mandatory rather than optional.

### Required member set and duration

For the MVP:

- The required member set is all **active Pintatónica members**.
- Current known members are Guille, Juan, Will and Pablo, but do not hard-code four members into the domain rule.
- Default minimum rehearsal duration is **2 continuous hours**.
- Treat 2 hours as the MVP policy.
- Do not expose user configurability in the MVP.
- The model may leave room for this policy to become configurable later.

### Rehearsal confirmation

For the MVP:

- Any active member may confirm a rehearsal.
- Confirmation turns a candidate time into a shared confirmed rehearsal.
- Confirmation is explicit; an opportunity never becomes a rehearsal automatically.
- A partial-group window **may be confirmed as a rehearsal**, but the confirmation must explicitly show which members are expected/available.
- Full-group and partial-attendance rehearsals remain distinguishable.

Update `JRN-NEXT-REHEARSAL` so the unresolved point is specifically whether everyone attends, not whether partial windows are shown.

### Membership and editing

Do **not** introduce an administrator product role in the MVP.

Membership provisioning is an operational/manual concern for now.

Product rules:

- Google authentication alone does not grant access.
- Private access requires an active membership record.
- Membership creation/removal is manually provisioned outside the normal member-facing product flow for the MVP.
- Members may edit their own availability.
- Any active member may edit shared repertoire metadata, rehearsal focus and setlists.
- Do not introduce granular permissions in the MVP.

### Public repertoire

Public repertoire is editorially selected.

For the MVP:

- songs may explicitly be marked public/private;
- only songs explicitly selected for public display are exposed;
- public data may include title, original artist and suitable public-facing media/content;
- private notes, rehearsal material, sheet music, working links and internal resources must not become public automatically.

Do not attempt to specify the exact public song list in the product model.

### Planning horizon

Keep the existing **six-week rolling horizon** for the MVP.

It is fixed for now.

Explicitly defer horizon configurability.

### MVP boundary

Include in the initial MVP:

- public Pintatónica website;
- Google authentication + explicit membership;
- member `/band` area;
- recurring weekly availability;
- date-specific availability overrides;
- multiple intervals per day;
- six-week planning horizon;
- full-group opportunities;
- separate partial-group windows;
- rehearsal confirmation;
- upcoming rehearsals;
- repertoire and song resources;
- rehearsal focus/preparation;
- setlists;
- basic gig/public information.

Explicitly defer:

- Google Calendar synchronization;
- notifications;
- messaging/chat;
- automated membership administration;
- granular roles/permissions;
- configurable planning horizon;
- configurable rehearsal-duration policy;
- generic multi-band/multi-tenant support;
- advanced gig/event management;
- media hosting;
- replacement of Google Drive/Docs.

### Cost quality requirement

Use a verifiable formulation equivalent to:

> Under normal Pintatónica usage, the production application MUST operate without recurring infrastructure charges using the selected providers' free tiers. Optional costs such as purchasing a custom domain are excluded. The architecture MUST avoid requiring paid compute, storage, authentication or database capacity for expected band usage.

Do not encode specific vendors into the product requirement.

### Final action

Apply these decisions to the proposed artifacts, remove obsolete unresolved wording, and ensure scenarios/verification reflect the decisions.

Then run ProductShape validation again and report:

1. changed artifact IDs;
2. remaining genuinely unresolved decisions;
3. validation result;
4. whether `CHG-INITIAL` is now semantically ready for approval.

Do not apply/archive `CHG-INITIAL` yet.
