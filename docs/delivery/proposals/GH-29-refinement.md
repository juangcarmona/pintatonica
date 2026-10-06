# GH-29 Ready reconciliation

2026-10-06. Read full issue, accepted UC-ACCESS/FR-ACCESS/BR-MEMBERSHIP/QR-SECURITY, current static shell and band page, access controller/Firebase adapter/rules, browser harnesses, design patterns, arc42 runtime/security/quality and member-access operations. GH-27 accepted intent and GH-28 merged public orientation are current; no Product Change is needed.

| Adopted Ready dimension | Finding |
| --- | --- |
| Title | Met: clear restricted Backstage login/entry |
| Description | Met: current utility label does not explain entry; existing authorization already protects data |
| Actor / stakeholder | Met: member and person attempting entry; Juan |
| Priority | Met: explicit FF #28 → #29 → #30 |
| Dependencies | Met: GH-27 accepted and GH-28 merged; #30 follows this slice |
| Acceptance criteria | Met: deliberate Google action, returning-member entry, honest checking/denied/error/admitted states, no pre-admission navigation, sign-out/revocation and independent denial |
| Scope | Met: entry presentation and existing admission journey; no provider/permission/provisioning/editorial/private-page change |
| Product rules | Met: Google identity plus manually provisioned active UID membership; no self-enrolment |
| Affected behaviour | Met: public entry and existing access-status shell |
| Quality expectations | Met: responsive keyboard/touch, accurate states, anonymous discovery and privacy |
| Test impact | Met: static entry semantics, actual emulator popup/cancellation/denial/admission/return session/revocation, direct security boundary and remote anonymous shell |
| Existing decisions | Met: quiet Backstage utility, agreed Backstage · Entrar direction, explicit Google button, native controls and canonical tokens |
| Unknowns / risks | Met: popup must originate in deliberate button activation; no unresolved semantic input |

Ready. Existing issue criteria need no semantic addition. FF authorization replaces ordinary stage pauses without inventing votes or waiving independent/verification gates. Earlier GH-1–GH-9 review debt is disclosed and nonblocking; GH-28 postmerge closeout is documentation-only carryover. No wiki pair is configured.
