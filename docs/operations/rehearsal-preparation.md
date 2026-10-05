# Shared rehearsal preparation

Active members open a confirmed rehearsal in /band, select repertoire songs and save lightweight focus notes. Reload or another member shows the shared preparation. Linked musical resources retain their original provider permissions; no material is uploaded here.

Unsaved changes remain local. A competing shared edit rejects the stale save and preserves the draft; explicitly reload the saved preparation before retrying. Failed saves never claim success. Only preparation fields are updated, preserving the confirmed time and attendance. No task-management workflow is introduced.

Verification uses local Auth/Firestore emulators with demo-pintatonica, existing pnpm dev demo configuration, and node src/tooling/web/verify-preparation-runtime.mjs. Synthetic fixtures never target production. Existing member rules already protect preparation; this slice adds a direct permission regression without changing deployment topology.
