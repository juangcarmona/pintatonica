# GH-7 evidence

[Plan](../../completed/GH-7.md) and [PR #17](https://github.com/juangcarmona/pintatonica/pull/17). Accepted product unchanged. Pure selected-song test ran red before implementation; green after. Existing Firestore member rules are exercised by a new direct preparation write/denial regression.

[Checks](checks.txt) record frozen installation, security and full workflow-derived verification: 72 tests (9 design, 18 security, 33 web, 12 rules). [Runtime](runtime.json) and inspected [mobile](mobile.png)/[desktop](desktop.png) show actual synthetic saved reload, timing/attendance retained, resource links, another member's changes, preserved dirty/conflicting drafts and a denied commit never reporting saved. No overflow or page errors.

The initial denied-save harness interception missed the SDK's query-string URL. Its retained regex now covers the real commit endpoint; no test was skipped. Stable keyed cards avoid replacing editors on shared snapshots. Source hashes bind evidence to the current implementation. External provider authorization is not claimed tested; existing SDK warning and single browser-engine coverage remain limitations. Final audits, current-head CI/native checks and actual merge/production observation are subsequent PR/issue records.
