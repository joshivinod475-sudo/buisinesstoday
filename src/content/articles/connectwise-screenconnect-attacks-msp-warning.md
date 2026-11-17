---
title: "ConnectWise Warns ScreenConnect Attacks Are Continuing: What IT Service Providers Must Check"
description: "Attackers are targeting on-premises ScreenConnect remote-support servers through a critical flaw and third-party add-ons. Here is the fix and how to check for intrusion."
date: 2026-11-17T21:10:00+05:30
category: cybersecurity
image: /images/server-racks-in-server-room.jpg
imageAlt: "Open black equipment racks filled with servers and network switches with yellow cables, in an office server room with boxes on a table beside them"
imageCredit: "An office server room. The image is illustrative. Photo: Carl Lender / Wikimedia Commons (CC BY 2.0)"
tags: ["Cybersecurity", "ConnectWise", "ScreenConnect", "Managed Service Providers", "Remote Access", "Supply Chain Attacks"]
---

ConnectWise, which makes the widely used remote-support software ScreenConnect, has warned that attacks on its customers' self-hosted servers are continuing, even though its own investigation into the intrusions is complete.

The attacks matter beyond the companies hit first. ScreenConnect is used heavily by managed service providers, the IT firms that run computers for many other businesses. Compromising one provider can open a path into all of its clients.

## Key points

- A critical flaw, CVE-2026-84869, scored 9.9 out of 10, can let files be sent and run through a remote session without the user confirming it.
- The fix is version 26.6.5 or later of the technician client.
- ConnectWise has disabled five third-party add-ons across about 400 partner environments.
- The security firm Huntress reported a spike in attacks on 13 November affecting 205 computers in 41 organisations, The Hacker News reported.

## What is happening

Attackers are using a toolkit researchers call SCKit. One of its modules is designed to spread from an infected customer's computer back to the technician connecting to it, and from there to other customers. The Hacker News reported no evidence that this spreading succeeded in the latest wave.

Researchers at Huntress and Blackpoint Cyber suspect that an authentication flaw in a third-party add-on, versions 1.0.31 and 1.0.32 of a tool called RMM+, is being exploited. That has not been confirmed as the official cause.

The add-ons ConnectWise has disabled are Labtech Plus, RMM Plus, RMM+, RMM Plus Password Link and RMM+ Password Link. Partners have been told not to re-enable them until ConnectWise issues further guidance.

## Why remote-support tools are such a target

Remote-support software is built to do what attackers want: take control of a computer from far away, with administrator rights, through a connection the firewall already allows. A stolen technician account is effectively a master key.

That is why criminal groups, including ransomware gangs, have repeatedly targeted ScreenConnect and similar products. It is also why attacks on service providers are counted as supply-chain attacks: the victim is breached through a supplier it trusts.

## What to do now

ConnectWise warned that disabling add-ons and updating software "do not remove unauthorized access or persistence already established". Updating is necessary but not sufficient.

1. **Update the technician client** to version 26.6.5 or later.
2. **Keep the listed add-ons disabled** until ConnectWise says otherwise.
3. **Look for signs of intrusion.** One reported indicator is a service named "Windows Update Agent" running a program called UpdateConnect.ClientService.exe from a ProgramData folder. Genuine Windows updates do not run that way.
4. **Check for unfamiliar ScreenConnect clients** and connections to unknown servers.
5. **Rotate technician passwords and enforce multi-factor authentication.**
6. **Tell your clients** if you find evidence of compromise. They may have obligations to report.

## For businesses that use an IT provider

You may run ScreenConnect without knowing it, if your IT is outsourced. Ask your provider three questions: Do you use ScreenConnect or a similar tool on our systems? Have you applied the latest update? Have you checked for signs of intrusion?

In India, organisations must report cyber incidents to CERT-In within six hours of noticing them, and that duty does not disappear because the breach came through a supplier. Contracts with IT providers should say who reports and how fast.

Other attacks disclosed this week also worked by abusing trusted tools, including [spy software hidden in GitHub and Microsoft 365 traffic](/tech/gitdoor-graphdoor-backdoors-github-microsoft-graph-governments/). Our guide to [choosing identity verification software](/tech/how-to-choose-identity-verification-kyc-software/) covers what to demand from security vendors in contracts.

*This article draws on ConnectWise's advisory and on research by Huntress and Blackpoint Cyber, as reported by The Hacker News. The cause of the add-on compromise has not been officially confirmed.*
