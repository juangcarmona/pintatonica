# Existing scheduling prototype evidence

Read-only inspection on 2026-10-04 of the existing [Pinta Tónica calendar](https://calendario-pinta-tonica.pablo-fs515861.chatgpt.site/). The supplied group link was used only as context; no availability, scheduling data or other remote state was changed. The group-link credential is not copied into repository files.

The HTML and served client bundle were accessible. This is a partial inspection of visible UI text and client behaviour, not an end-to-end runtime verification or review of private group records.

## Observed ideas to discuss

- A rehearsal calendar using Madrid time.
- Member-name selection for entering availability. UI text states that the group link grants access and a name is not a password.
- Habitual weekly availability with several time intervals and selected weekdays.
- Changes for one date, with UI text explaining their precedence over habitual availability and punctual intervals.
- A way to restore habitual availability for a date.
- Confirmation before removing a weekly schedule, with messaging that punctual date entries remain.
- A six-week horizon mentioned in the weekly rule editor.
- Availability overlap information described as rehearsal opportunities; it does not reserve rehearsals.
- Sharing the group link with a reminder to keep it within the group.

These are existing product/design evidence, not accepted Pintatónica requirements. Juan must confirm what is useful, what is missing and what should change. Implementation architecture and access mechanics are not inherited from this prototype.
