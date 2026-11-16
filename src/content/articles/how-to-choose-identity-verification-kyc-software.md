---
title: "How to Choose Identity Verification Software: What to Test Before You Sign a KYC Contract"
description: "Vendors of digital KYC all claim high accuracy. Here are the standards that matter, the numbers to ask for and a seven-part test to run on your own customers first."
date: 2026-11-16T20:48:00+05:30
category: cybersecurity
image: /images/indian-passport-cover.jpg
imageAlt: "A dark blue Indian passport with the national emblem and a biometric chip symbol in gold on its cover, lying on a wooden table"
imageCredit: "An Indian biometric passport. Photo: Gpkp / Wikimedia Commons (CC BY-SA 4.0)"
tags: ["KYC", "Identity Verification", "Fintech", "Fraud Prevention", "Deepfakes", "Compliance"]
---

Any business that opens accounts online, from a bank or a lending app to a crypto exchange or a gaming platform, has to answer one question about every new customer: is this person who they say they are?

Most buy the answer from a specialist. Identity verification software checks a photograph of an identity document, compares it with a selfie or a short video, and decides in seconds whether to let the customer in.

Every vendor claims to be fast and accurate. The claims are hard to compare, and the cost of choosing badly is high: fraud losses if the system is too lenient, lost customers if it is too strict, and regulatory trouble either way. This guide sets out what to test.

## Key points

- Test vendors on your own customers and documents. A vendor's demonstration proves little.
- Ask for results against published standards, and for the name of the laboratory that did the testing.
- Deepfakes have changed the threat. A system must detect fake video fed directly into the app, as well as a photo held up to the camera.
- Read the contract as carefully as the technical report.

## The two ways these systems fail

**Letting the wrong person in.** A fraudster passes with a stolen or forged document, or with a synthetic face. The business takes the loss and may face penalties.

**Keeping the right person out.** A genuine customer is rejected because of poor lighting, an older phone or an unfamiliar document. They give up and go to a competitor.

Tightening one usually worsens the other. A good evaluation measures both.

## The standards worth knowing

A buyer does not need to read these documents, but should know what they cover.

**NIST SP 800-63A.** The US National Institute of Standards and Technology publishes guidance on identity proofing that is widely used as a benchmark. [Its current version](https://pages.nist.gov/800-63-4/sp800-63a.html) sets out measurable thresholds, including:

| Measure | Threshold in the NIST guidance |
|---|---|
| Face matching: wrongly matching two different people | No more than 1 in 10,000 |
| Face matching: wrongly rejecting the same person | No more than 1 in 100 |
| Fake-presentation attacks accepted | Less than 7% |
| Forged documents accepted | No more than 10% |
| Difference in performance between demographic groups | No more than 25% worse than the overall rate |

The guidance also requires controls to detect virtual cameras, emulated devices and manipulated media, and it bars the use of knowledge-based questions, such as "what was your first school", as a means of verifying identity.

**ISO/IEC 30107-3.** This is the international standard for testing whether a system can tell a live person from a photograph, mask or screen. Two cautions apply. It does not cover injection attacks, in which fake video is fed straight into the software. And "ISO compliant" means little unless the vendor names the laboratory, the date and the result.

## A seven-part test

Score each vendor from 1 to 5 on each part, weight the parts by what matters to your business, and run the test on a few hundred real verifications before signing.

1. **Accuracy on your users.** Measure how many genuine customers pass at the first attempt, and how many test fraud attempts get through. Break the results down by document type, phone model and region. An average hides the group that is failing.

2. **Defence against spoofing.** Try the attacks yourself: a printed photo, a video played on a second screen, an edited identity document. Ask specifically how the system detects injected video and AI-generated faces.

3. **Coverage.** Check that it reads the documents your customers hold, in the scripts they use. A system tuned for European passports may struggle elsewhere.

4. **Customer experience.** Time the process from start to decision. See what a customer is told when something fails, and whether they can switch from laptop to phone without starting again.

5. **Control.** Find out whether your own team can adjust thresholds, add a manual review step or create a lighter process for low-risk customers without paying for development work.

6. **Compliance and records.** You must be able to show a regulator why each decision was made. Check the audit trail, where data is stored, how long it is kept and whether records can be exported.

7. **The contract.** Establish what counts as a billable check, including failed and repeated attempts. Look at minimum volumes, price rises on renewal, penalties if the service is down, and your right to take your data with you if you leave.

Ask each finalist for two customers in your own industry and put one question to them: what surprised you after you went live?

## Warning signs

- A single accuracy figure with no explanation of how it was measured.
- "Certified" with no named laboratory.
- Reluctance to allow a trial on your own data.
- Results reported only as an overall average.
- A price that rises sharply once volumes pass a threshold.

## For Indian businesses

India has its own rules, and they come first.

**Regulated entities.** Banks, non-bank lenders and payment companies must follow the Reserve Bank of India's KYC directions. These allow remote onboarding through a video-based customer identification process, which must be a live session conducted by a trained official of the regulated entity, with checks that the customer is physically in India and that the face is live. The directions have been amended several times, so work from the current text on the RBI's website and not from a vendor's summary.

**Indian documents.** Aadhaar, PAN, voter identity cards and driving licences issued by different states vary widely in format. Test with the documents your customers actually use, including older and worn ones.

**Verification at source.** Where the law permits, checking a document directly against the issuing database, for example through DigiLocker or Aadhaar-based e-KYC, is stronger than analysing a photograph of it.

**Data protection.** The Digital Personal Data Protection Act places duties on any business handling personal data, and biometric information is among the most sensitive. Establish where the vendor stores data, who else can access it and how it is deleted.

**Marketing is not approval.** A vendor describing itself as compliant with a regulator's rules has not been approved by that regulator. Responsibility stays with the regulated business.

## The deepfake problem

Tools for generating convincing fake faces and video are now cheap. That has moved the weak point. Earlier systems asked a user to blink or turn their head to prove they were real. A modern attack bypasses the camera altogether and feeds a synthetic video into the app.

This is why the current NIST guidance asks for detection of virtual cameras and emulators, analysis of media for signs of manipulation, and unpredictable prompts during live sessions. When assessing a vendor, ask how often its detection is updated and whether it has been tested by an independent team trying to break it.

The same shift is affecting ordinary users, as scams built on cloned voices and faces spread. Our report on [how to check whether an unfamiliar piece of software is real](/tech/dh58goh9-7-software-does-not-exist/) covers the basic habits that still work.

*This article is general information and not legal or compliance advice. Regulated businesses should rely on the current text of the applicable rules and on qualified advisers. It draws on NIST Special Publication 800-63A and on publicly available descriptions of ISO/IEC 30107-3 and the Reserve Bank of India's KYC framework.*
