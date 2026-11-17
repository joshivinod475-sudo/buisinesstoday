---
title: "Oracle Patches 11 Java Flaws: Which Versions Are Affected and What IT Teams Should Do"
description: "Oracle is releasing fixes for 11 Java SE vulnerabilities that can be exploited over a network without a password. Here are the affected versions and a patching checklist."
date: 2026-11-17T21:00:00+05:30
category: cybersecurity
image: /images/code-on-computer-monitor.jpg
imageAlt: "Lines of colourful program code on a dark computer screen, photographed at an angle with part of the screen out of focus"
imageCredit: "Photo: Markus Spiske / Unsplash via Wikimedia Commons (CC0)"
tags: ["Oracle", "Java", "Cybersecurity", "Patch Management", "Vulnerabilities", "Enterprise IT"]
---

Oracle is releasing security updates on Tuesday, 17 November, for 11 vulnerabilities in Java SE, the software platform that runs a large share of the world's business applications, from banking systems to government portals.

In an advance notice, Oracle said the flaws "may be exploited over a network without requiring credentials". It has not yet published the technical details.

## Key points

- The highest severity score among the 11 flaws is 8.1 out of 10, which counts as high.
- Supported versions of Java 8, 11, 17, 21, 25 and 27 are affected, along with GraalVM and JavaFX.
- Oracle has not said what each flaw allows an attacker to do. "No credentials needed" does not by itself mean an attacker can take over a system.
- Separate reports of a critical flaw in OpenJDK, the open-source version of Java, have not been confirmed.

## Affected versions

According to Oracle's notice, the following releases need updating:

| Product | Affected versions |
|---|---|
| Java SE | 8u511, 11.0.33, 17.0.21, 21.0.13, 25.0.5, 27.0.1 |
| GraalVM for JDK | 17.0.21, 21.0.13 |
| GraalVM Enterprise Edition | 21.3.20.0.3 |
| JavaFX | 21.0.13, 25.0.5, 27.0.1 |

Earlier versions in each line are also likely to be exposed, because fixes are not added to old releases.

## The unconfirmed OpenJDK report

Alongside Oracle's notice, reports circulated of a separate flaw in OpenJDK, labelled CVE-2026-114938, with a critical score of 9.2. The security firm watchTowr said the technical details were unconfirmed. The official record for that number contains no description yet, and no link to Oracle's 11 flaws has been established.

Until the OpenJDK project publishes an advisory, treat it as unverified. Do not ignore it either: many companies run OpenJDK builds from Amazon, Microsoft, Red Hat and others, and those vendors set their own patch schedules.

## Why Java patches are hard to roll out

Most people never see Java, which is exactly the problem. It sits inside other software: accounting packages, core banking systems, ERP suites, build servers, payment gateways. A company may have dozens of copies without knowing where they all are.

Updating it can also break the applications that depend on it, so teams test before they patch. That delay is the window attackers use.

## A checklist for IT teams

1. **Find every copy.** Inventory Java runtimes across servers, desktops and containers, including those bundled inside vendor products.
2. **Start with what faces the internet.** Applications reachable from outside are the priority.
3. **Check which distribution you use.** Oracle's notice covers Oracle's builds. For OpenJDK from other vendors, watch their advisories.
4. **Test, then deploy.** Move to the new builds Oracle has scheduled for each version line once they are released.
5. **Ask your software vendors.** If a product ships its own Java, the vendor must issue the update.
6. **Retire what is unsupported.** Very old Java versions get no fixes at all.

## Why it matters in India

India's banks, insurers, IT services firms and government departments run heavily on Java. The country's cyber agency, CERT-In, regularly issues advisories on Oracle's updates, and regulated entities such as banks are expected to patch critical systems promptly under the Reserve Bank of India's cyber security rules.

For IT services companies, client contracts often set deadlines for applying security fixes. A quick inventory now saves an emergency later.

Recent technology failures in the US, from [a bank software bug](/markets/us-bank-outage-chase-software-bug-zelle/) to [an airline system outage](/world/united-airlines-outage-weight-system-flights-delayed/), were not attacks, but they show how much depends on software layers that few people look at. Our guide to [choosing identity verification software](/tech/how-to-choose-identity-verification-kyc-software/) covers a related question: what to demand from the vendors whose code you run.

*This article draws on Oracle's advance security notice as reported by The Hacker News. Oracle had not published full details of the flaws at the time of writing. It is general information, not security advice for a specific system.*
