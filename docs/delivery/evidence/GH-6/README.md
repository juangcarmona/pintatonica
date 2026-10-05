# GH-6 evidence

[Plan](../../plans/GH-6.md), [checks](checks.txt), [runtime](runtime.json), [source hashes](source-manifest.json), [mobile](mobile.png), [desktop](desktop.png).

Frozen install, security and full verification pass: 70 tests (9 design, 18 security, 32 web/domain, 11 rules). The real demo-only browser harness creates/edits/reloads synthetic songs, opens protected working links as external URLs, verifies anonymous public-only fields and private denial, second-member shared changes, revision conflicts preserving drafts, executable URL rejection and atomic unpublication. External provider permissions are not bypassed or claimed tested by synthetic links. No actual song/media content is fabricated in production.

Rules tests independently reject public private-field injection, nonmember writes and unmatched/stale projection states. The browser save-status race now has a retained regression. All source hashes bind current verification across archive-only changes. Screenshots contain synthetic private notes/resources only. Current-head remote results and actual rules/main/native release outcomes are recorded in PR/issue after occurrence. Existing SDK bundle warning, selected browser coverage and anonymous-only production observation remain limitations.
