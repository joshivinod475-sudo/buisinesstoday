---
title: "Apple Tightens Mac App Permissions as AI Agents Ask for More Access"
description: "A macOS 27.3 beta gives Mac users finer control over what apps, including AI agents, can see and control. Here is what changes for users and developers."
date: 2026-11-17T21:08:00+05:30
category: cybersecurity
image: /images/macbook-pro-14-keyboard.jpg
imageAlt: "A close-up of a dark laptop keyboard showing the command and option keys, lit by a purple glow from the screen above"
imageCredit: "The keyboard of a 14-inch MacBook Pro. Photo: Gyasi Linje / Wikimedia Commons (CC BY 3.0)"
tags: ["Apple", "macOS", "AI Agents", "Privacy", "Cybersecurity", "Software Development"]
---

Apple is changing how Mac apps are granted access to a user's files and to control of the computer, in a move aimed at the growing number of AI "agents" that ask for broad permissions to act on a user's behalf.

The changes appear in the second test version of macOS 27.3 and are not yet final, The Hacker News reported. Apple warned that granting such access "puts all of the data on their Mac at risk".

## Key points

- Users can grant access to specific apps or folders instead of the whole Mac.
- Apps can be set to ask every time they need access.
- A new indicator shows when one app is controlling another.
- Permissions already granted stay in place, and Apple says known apps are unaffected for now.

## What is changing

The update reorganises some of the most powerful permissions on a Mac:

| Permission | What it allows | What changes |
|---|---|---|
| Full Disk Access | Reading almost every file on the Mac | Can be limited to specific folders |
| Accessibility | Reading the screen and controlling other apps | Split into separate settings, with more visibility |
| System & App Protection Override | One app driving another | Shows an indicator while in use |

Users grant permissions by picking the requesting app from a list, and are encouraged to allow only what a task needs.

## Why AI agents raise the stakes

An AI agent is software that does tasks for you: reading your email, filling in forms, moving files, clicking through websites. To do that it needs the same powers as you. On a Mac, that has meant Full Disk Access and Accessibility, permissions originally designed for backup tools and assistive software for people with disabilities.

The risk is that an agent with those powers can be misdirected. A malicious web page or document can contain hidden instructions that the AI follows, a technique called prompt injection. If the agent can read every file and control every app, one bad instruction can expose everything.

Narrower permissions limit the damage. An agent that can reach only one project folder cannot leak your tax documents.

This follows earlier steps by Apple in September and October to tighten Full Disk Access over the same concern.

## What it means for users

1. **Review what you have already allowed.** Existing permissions are not removed automatically. In System Settings, under Privacy & Security, check Full Disk Access and Accessibility and remove apps that do not need them.
2. **Grant the minimum.** When the new options arrive, give AI tools access to a specific folder, not the whole disk.
3. **Choose "ask every time"** for tools you use occasionally.
4. **Watch for the new indicator** showing one app controlling another, and stop any you did not start.

## What it means for developers

Apps that onboard users by asking for broad access will need to handle partial permissions gracefully. Backup and accessibility tools can request special entitlements for new installations. Apple says more detail on entitlements will follow.

## Why it matters in India

Indian startups are among the many building AI assistants and agents, and Mac users include a large share of professionals and developers. Under India's Digital Personal Data Protection Act, a business that handles personal data must take reasonable security safeguards. An internal AI tool with access to every file on employees' laptops is difficult to defend under that standard.

The question of how much access to give AI tools is also changing how work gets done, as we described in our report on [AI "workslop"](/tech/ai-workslop-hidden-cost-at-work/). On phones, a separate flaw showed why permission prompts need to mean what they say: an [iPhone bug let apps record after users tapped "Don't Allow"](/tech/iphone-microphone-flaw-recorded-after-dont-allow/).

*This article draws on Apple's announcement as reported by The Hacker News. The changes are in a beta version of macOS and may differ in the final release.*
