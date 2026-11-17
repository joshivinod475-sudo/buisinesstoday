---
title: "GitDoor and GraphDoor: Spy Tools Hide Their Traffic in GitHub and Microsoft 365"
description: "Kaspersky has found two backdoors aimed at governments in Asia and Africa that take orders through GitHub and Microsoft Graph, making them hard to spot."
date: 2026-11-17T21:06:00+05:30
category: cybersecurity
image: /images/server-racks-national-archives.jpg
imageAlt: "A long aisle between rows of black computer server cabinets lit by small green and blue lights, with cable trays on the ceiling"
imageCredit: "A server room at The National Archives in the UK. The image is illustrative. Photo: The National Archives (UK) / Wikimedia Commons (CC BY 3.0)"
tags: ["Cybersecurity", "Cyber Espionage", "Microsoft 365", "GitHub", "Government Security", "Cloud Security"]
---

Security researchers at Kaspersky have found two pieces of spying software, which they call GitDoor and GraphDoor, aimed at government organisations in Asia and Africa. Their most notable feature is how they receive orders: through GitHub and Microsoft's cloud services, which most organisations use every day and rarely block.

Kaspersky calls the campaign Operation ShadowCloud. It was identified in early 2026, and the first victim found was an organisation in Taiwan, The Hacker News reported.

## Key points

- Both tools are "backdoors": hidden programs that give attackers ongoing remote control of a computer.
- GitDoor reads commands from a public GitHub repository and uploads stolen results to a private one.
- GraphDoor uses Microsoft Graph and SharePoint, the systems behind Microsoft 365.
- Kaspersky has not identified who is responsible. It sees overlaps with groups linked to China, with low to moderate confidence.

## What they can do

GitDoor supports 26 commands. They include recording keystrokes, taking screenshots, stealing browser cookies, extracting stored passwords, managing files and creating user accounts.

GraphDoor offers similar spying functions through add-on modules, plus a proxy that lets attackers route other traffic through the infected machine.

Both load new capabilities directly into memory, so they can be upgraded without writing new files to disk, which is where security software usually looks.

The infection begins with a legitimate remote-management tool called MeshCentral, which is then used to load the malicious components.

## Why hiding in trusted services works

Traditional malware contacts a server the attacker controls. Security teams can block that address once they find it.

These tools instead talk to GitHub and Microsoft, which an organisation cannot block without stopping its own work. To a network monitor, the traffic looks like an employee using normal cloud software. Kaspersky said this lets the campaign evade many network-based defences.

The approach also required patience. The GitHub accounts used were probably created in late 2024, more than a year before the campaign was found.

## On attribution

Kaspersky noted that the activity shares infrastructure and timing with a group that the security company Sophos tracks as Bronze Sandcastle, and has tactical similarities with groups known as FamousSparrow and BlackTech. It said these links do "not prove a direct link", and suggested a Chinese-speaking group may be developing or using the tools.

Attribution in cyber espionage is rarely certain. Shared tools and methods can be borrowed or deliberately imitated.

## What defenders can do

The research did not include specific recommendations. Standard practice for this kind of threat includes:

1. **Watch for unusual use of legitimate services,** such as a server that has no reason to contact GitHub, or a new application registered in Microsoft 365.
2. **Review approved apps in Microsoft 365** regularly, and restrict who can grant new apps access to company data.
3. **Control remote-management tools.** Allow only those the IT team uses, and alert on any new installation.
4. **Use endpoint detection that inspects memory and behaviour,** not only files on disk.
5. **Limit administrative rights,** so a single compromised account cannot create new users or dump passwords.

## Why it matters in India

Indian government bodies and companies use the same cloud platforms, and India has been a frequent target of state-backed espionage. CERT-In requires organisations to report cyber incidents within six hours of noticing them, which is only possible if unusual activity is detected in the first place.

The broader lesson applies to any business: trusted platforms are now a hiding place, so "allowed" traffic cannot be assumed safe. A separate campaign this week, [using fake job offers to target developers](/tech/trigram-fake-job-offers-developers-north-korea-malware/), also abused GitHub.

*This article draws on research by Kaspersky as reported by The Hacker News. Kaspersky's attribution is a low-to-moderate confidence assessment and has not been confirmed by any government.*
