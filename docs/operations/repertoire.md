# Repertoire operations

Members create/edit real songs in /band/repertorio/. Shared data is protected in songs; publicSongs is an atomic whitelist of explicitly selected public title/artist/media. Selecting a song does not publish internal notes or resources. External Drive/Docs access is still controlled by its provider. Large media files are linked, not uploaded to Git.

Current editable metadata lives in Firestore; repository-managed schema/rules/tests and the rationale are in [ADR-0002](../adr/0002-store-shared-songs-with-safe-public-projections.md). Do not commit private material or export it automatically. Any future operational repository snapshot needs a deliberate content review; it is not a second product-definition source.

Rules deploy through the existing authenticated Firebase operator session: `pnpm exec firebase deploy --only firestore:rules --project pintatonica-band`. No service-account key or credential environment file is needed. Use only demo-pintatonica for tests. Start the demo emulators and dev override before `node src/tooling/web/verify-repertoire-runtime.mjs`; it resets the guarded local demo database and uses synthetic songs/members. No production fixture writes.
