# Public content and free-tier operations

## Editorial content

[src/public-site/content.ts](../../src/public-site/content.ts) holds approved introduction, optional public contact and selected external media. Current introduction uses known band context only; contact is null and additional media is empty pending Juan's approved material. Do not publish the operational Google-login email by inference. Add licensed photo/video links with meaningful labels; large media stays external. Rebuild through the normal PR/native hosting flow after editorial changes.

Its editorial member array is empty until public names/roles are explicitly approved. Optional descriptions/images need the same editorial input. It is separate from Firebase membership and never populated by roster reads. GH-23 owns the inventory and approvals. The shell guard allows only exact matching approved card fields and continues rejecting private identities elsewhere and throughout the unadmitted Backstage shell. Private collection/auth references cannot be approved away.

Active members explicitly select songs and gigs for publication in Backstage. Security rules require matching, strictly whitelisted public projections; anonymous pages read only publicSongs/publicGigs. Private notes, sheet music and working resources are not public content. Upcoming gigs are selected in Madrid time. Empty/unavailable sections are visible and honest. No CMS, media-hosting service or production test fixtures are required.

## Expected cost envelope

This is an engineering estimate for normal small-band use, not a new product limit or a measured traffic report. Illustrative assumptions: eight active members, 100 private songs, 20 gigs, 20 setlists, six upcoming rehearsals, up to 42 date overrides per member, eight private sessions/day and 200 public visits/day reading 20 public songs plus ten gigs. Membership is not hard-coded to eight or four people.

Public reads are approximately 6,000 documents/day. Allow 9,000 more for private views, multiple song listeners, availability queries, membership-dependent security reads and updates: approximately 15,000 reads/day. Budget 100 writes/deletes per day and under 10 MiB metadata; at average 1 KiB/public document, public transfer is approximately 176 MiB/month before protocol overhead. These assumptions leave room below the documented [Firestore free quota](https://firebase.google.com/docs/firestore/quotas): 50,000 reads/day, 20,000 writes/day, 20,000 deletes/day, 1 GiB storage and 10 GiB/month outbound. Real listeners/reconnections and index/security reads must be observed; the estimate is not a guarantee under arbitrary traffic.

The app serves static assets without a Worker script or paid compute. [Cloudflare static asset requests/storage](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) are free. The [Workers Builds free allowance](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/) is 3,000 minutes/month: even 30 two-minute builds use about 60 minutes. These are provider allowances, not an assertion about any unrelated account subscription. Google sign-in uses the existing provider, without phone/SMS, custom server or paid authentication feature. Firebase billing was observed disabled during GH-2; recheck provider state before changing infrastructure rather than assuming it never changes.

## Monitoring and limits

Inspect Firebase billing status and Firestore Usage (reads/writes/storage/transfer), and Cloudflare build-minute usage after real band activity and unusual public traffic. Keep the existing no-billing/free-tier setup; quota exhaustion is an availability risk, not permission to silently enable paid capacity. Investigate excess listener reloads or public reads before proposing architectural changes. Scheduled backups, TTL and paid storage/compute are not enabled. This workload estimate excludes externally purchased optional custom domains, and the existing workers.dev address works without buying one.

## Verification boundary

Demo browser fixtures exercise populated public content, private-read denial, configured contact/photo rendering, mobile/desktop/keyboard navigation and earlier member journeys. Fixtures never seed production. Exact-head native deployment and anonymous production observations are recorded with each delivery item; CI alone does not prove hosting or real Google OAuth. Actual editorial material and real traffic remain operational inputs.

The public design harness temporarily supplies synthetic editorial members/media/contact in the local Astro source and restores exact content in `finally`, refusing concurrent changes. Keep source changes and fixture harnesses sequential. Wait for lazy images to load before recording successful rendering; merely finding the image element does not prove its content loaded. Never commit the temporary configuration or run fixture writes against preview/production Firebase.
