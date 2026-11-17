---
title: "iPhone Flaw Let Apps Keep Recording the Microphone After You Tapped 'Don't Allow'"
description: "Researchers have detailed a now-fixed iOS bug that let installed apps record audio after users refused microphone access. Here is who is affected and how to stay safe."
date: 2026-11-17T21:04:00+05:30
category: cybersecurity
image: /images/iphone-15-front-and-back.jpg
imageAlt: "Four iPhone models of different sizes standing side by side on a black background, each screen showing its model name"
imageCredit: "The iPhone 15 range. Image: Ka Kit Pang / Wikimedia Commons (public domain)"
tags: ["Apple", "iPhone", "Privacy", "Cybersecurity", "iOS Update", "Smartphones"]
---

Researchers have published details of a flaw in Apple's software that allowed apps to record from an iPhone's microphone even after the user had refused permission by tapping "Don't Allow".

Apple has already fixed it. Anyone who has installed recent updates is protected, and there is no report that the flaw was used in real attacks.

## Key points

- The bug, CVE-2026-65339, was in the iPhone's audio system.
- An app already installed on the phone could keep recording in the background, even after the screen locked.
- On one early test version, the orange dot that warns you the microphone is on could stay off.
- It was found separately by Nik Tsytsarkin of Meta's Red Team X and the security engineer Mustafa Calap.

## Which updates fix it

| Device | Fixed in |
|---|---|
| iPhone and iPad (current) | iOS and iPadOS 26.6.1, released 17 August |
| Older iPhones (XS, XS Max, XR) and 7th-generation iPad | iOS and iPadOS 18.7.11, released 26 October |
| Mac | macOS Tahoe 26.6.2 or Sequoia 15.8 |
| Apple TV, Watch, Vision Pro | Version 27 |

The US Cybersecurity and Infrastructure Security Agency rates the flaw 5.0 out of 10, a medium score, and has not listed it as exploited.

## Why this matters even though it is fixed

Phone permissions are a promise. When you tap "Don't Allow", you expect that answer to hold. This flaw broke that promise silently: the app did not need to trick you, and you had no way to tell.

The limits matter too. An attacker could not use it remotely. The app had to be on your phone already, so the risk came from apps you chose to install. And researchers describe no way to find out, after the fact, whether any app used it.

## What to do

1. **Update your iPhone.** Go to Settings, then General, then Software Update. This is the only fix. No setting blocks the flaw on an unpatched phone.
2. **Turn on automatic updates** in the same menu, so future fixes install without you having to remember.
3. **Review microphone access.** Settings, then Privacy & Security, then Microphone shows every app that has asked. Switch off any that do not need it.
4. **Delete apps you no longer use.** Every installed app is a possible route in.
5. **Watch the indicators.** An orange dot at the top of the screen means the microphone is in use, and a green dot means the camera.

## For businesses

Companies that let staff use iPhones for work should check that devices are updated, ideally through mobile device management software that can enforce a minimum iOS version. Conversations in meetings, client calls and boardrooms are exactly what a recording bug would capture.

Privacy controls on phones and computers are tightening for a related reason: AI tools that need wide access to personal data. Apple has just announced [stricter app permissions on the Mac](/tech/apple-macos-app-permissions-ai-agents/) for that purpose.

*This article draws on details published by the researchers and on Apple's security notes, as reported by The Hacker News. It is general information, not advice on a specific device.*
