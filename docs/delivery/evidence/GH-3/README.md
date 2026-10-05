# GH-3 evidence

[Plan](../../plans/GH-3.md), [issue #3](https://github.com/juangcarmona/pintatonica/issues/3), [PR #13](https://github.com/juangcarmona/pintatonica/pull/13).

[CI-derived transcript](checks.txt): frozen install, redacted security scan and full pnpm verify pass. 61 tests: 9 design, 18 security, 25 web/domain and 9 Firestore rules. Typecheck has zero diagnostics; two static pages build; 55 accepted ProductShape artifacts validate unchanged. Design checks and documentation lint pass; official architecture/plan citations are current. SDK bundle-size warning remains disclosed, not suppressed.

[Runtime observations](runtime.json) use only demo-pintatonica and synthetic members. Mobile/desktop prove weekly multi-interval save/reload, replacement without mutating the habit, empty exception, habit restoration, invalid save without persisted mutation, dynamic other-member reads and direct cross-member write denial. Six weeks, no horizontal overflow or page errors. The harness resets only the explicitly guarded local demo database between viewport scenarios. Real Google access was already observed in GH-2; these scenarios exercise the emulator popup and actual workspace, not production fixture writes.

Screenshots were inspected for labelled controls, distinct save actions, readable band view and no overflow. [Mobile editor](mobile-editor.png), [desktop editor](desktop-editor.png), [mobile full view](mobile-availability.png), [desktop full view](desktop-availability.png). These synthetic screenshots are embedded in the PR description.

The first browser run exposed save-status acknowledgement being overwritten by a subsequent snapshot. Initialization status is now set only once; the runtime saved-status/reload assertions guard the defect. Another harness run incorrectly imported a second SDK module URL, producing an invalid-instance error instead of the intended ownership check; the harness now resolves the actual Vite module URL and requires permission-denied. Popup initialization is awaited before entering the synthetic account. These failures are resolved, not skipped.

Native preview/current-head CI, independent audits, merge and production observations are separately recorded in PR #13 / issue #3 after actual completion. Product intent and later-slice exclusions are preserved. Same-day time controls require end after start; overnight spans are represented on their respective dates rather than an invented cross-date policy. No deployment, audit or finished-change approval is inferred from local tests.
