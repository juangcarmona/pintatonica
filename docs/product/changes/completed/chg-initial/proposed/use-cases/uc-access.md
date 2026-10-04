---
id: "UC-ACCESS"
type: "use-case"
title: "Enter the private band area"
status: "draft"
primary-actor: "ACT-MEMBER"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-MEMBERSHIP"]
uses-terms: ["TERM-MEMBER","TERM-BAND"]
---

## Goal

Reach /band, the member-facing application surface distinct from the public website, with access limited to active members.

## Trigger

A person requests /band or private data.

## Preconditions

The person can attempt Google sign-in; active membership is checked independently and manually provisioned outside normal product flows.

## Main Flow

1. Authenticate with Google.
2. Check the active Pintatónica membership record for that identity.
3. Allow the active member to enter the /band dashboard with their identity already known.

## Alternative Flows

An authenticated non-member or inactive member is denied private access. A member never needs to select their own name after login.

## Failure Conditions

Failed authentication or absent/inactive membership denies private reads and writes at the data/security boundary, including direct requests bypassing the UI.

## Postconditions

An active member sees private band information in /band; other identities do not.
