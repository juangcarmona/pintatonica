---
id: "UC-ACCESS"
type: "use-case"
title: "Enter the private band area"
status: "draft"
primary-actor: "ACT-MEMBER"
bounded-context: "BC-PINTATONICA"
governed-by: ["BR-MEMBERSHIP"]
uses-terms: ["TERM-MEMBER","TERM-BAND","TERM-AREA"]
---

## Goal

Reach /band, the member-facing application surface distinct from the public website, with access limited to active members.

## Trigger

A person activates the Backstage login/entry action, requests a private area address under /band or requests private data.

## Preconditions

The person can attempt Google sign-in; active membership is checked independently and manually provisioned outside normal product flows.

## Main Flow

1. Deliberately start Google sign-in through the member-only Backstage entry when signed out.
2. Check the active Pintatónica membership record for that identity.
3. Allow the active member to enter the /band dashboard or directly requested private area with their identity already known.
4. Offer secondary navigation between separate Inicio, Ensayos, Repertorio, Setlists and Conciertos pages, identifying the current area.

## Alternative Flows

An authenticated non-member or inactive member is denied private access. A member never needs to select their own name after login.

An already authenticated active member can use the Backstage entry without repeated sign-in. Each directly requested private area requires the same membership decision. Sign-out or membership revocation removes private content and access; public navigation remains available. No Backstage entry creates membership.

## Failure Conditions

Failed authentication or absent/inactive membership denies private reads and writes at the data/security boundary, including direct requests bypassing the UI.

## Postconditions

An active member sees private band information in /band; other identities do not.
