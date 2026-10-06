# GH-28 Ready reconciliation

2026-10-06. Read full issue, accepted GH-27 change/model, actual public shell/navigation/styles, public/privacy tests and runtime harnesses, arc42 05/06/08/10 and design patterns. Main abec922 accepts the navigation intent. No Product Change or external input is needed.

| Adopted Ready dimension | Finding |
| --- | --- |
| Title | Met: accurate visitor location |
| Description | Met: Inicio is falsely current outside the hero |
| Actor / stakeholder | Met: ACT-VISITOR, Juan |
| Priority | Met: explicit FF order #28 then #29 then #30; #390 does not exist |
| Dependencies | Met: GH-27 accepted; editorial input independent |
| Acceptance criteria | Met: scroll/link/shared entry/refresh/history, visual/programmatic orientation, responsive keyboard/privacy preservation |
| Scope | Met: public page only; no private routing/login/content invention |
| Product rules | Met: FR-NAVIGATION, TERM-AREA, UC-PUBLIC, FR-PUBLIC, JRN-DISCOVER, BR-PUBLIC-SELECTION, QR-USABILITY, QR-SECURITY |
| Affected behaviour | Met: current public section and shareable context |
| Quality expectations | Met: keyboard/mobile/desktop, unchanged privacy/public projection boundaries |
| Test impact | Met: geometry/history/menu/focus/direct entry and public regressions |
| Existing decisions | Met: one scrolling page, existing assets/tokens/native links and static hosting |
| Unknowns / risks | Met: short bottom sections, async content and header geometry need verification; no unresolved semantic choice |

Verdict: Ready. User explicitly authorizes FF lifecycle without ordinary approval pauses; this does not invent a GitHub vote or waive checks/audits. Existing docs correctly identify section tracking as undelivered. No wiki pair configured. GH-27 closeout is disclosed documentation-only carryover commit 68014f6.
