---
title: "Did AI Solve the Riemann Hypothesis? What Anthropic's Claude Actually Proved, Explained"
description: "Claude did not prove the Riemann hypothesis, but it raised a key bound on zeta zeros from 41.6% to 67.2%. Here is what that means, how it was checked and why mathematicians are still cautious."
date: 2026-11-23T21:00:00+05:30
category: tech
image: /images/georg-friedrich-bernhard-riemann-portrait.jpg
imageAlt: "An engraved black-and-white portrait of the bearded 19th-century mathematician Bernhard Riemann in a dark coat and bow tie"
imageCredit: "Bernhard Riemann (1826–1866), who proposed the hypothesis in 1859. Image: Wikimedia Commons (public domain)"
tags: ["Riemann Hypothesis", "Anthropic", "Claude", "Artificial Intelligence", "Mathematics", "Research"]
---

Headlines suggesting that artificial intelligence has "cracked" the Riemann hypothesis, one of the most famous unsolved problems in mathematics, are wrong. What an Anthropic research model did is still remarkable: it substantially improved a result that mathematicians had pushed forward only slowly over several decades.

According to [Anthropic's research write-up](https://www.anthropic.com/research/riemann-zeta), an unreleased Claude model proved that at least 67.2% of the non-trivial zeros of the Riemann zeta function lie on the "critical line". The best previous proven figure was about 41.6%. The Riemann hypothesis says the true figure is 100%.

## Key points

- **Not a proof of the hypothesis.** Claude raised a lower bound. The hypothesis itself remains unproven.
- **A big jump.** From about 41.6% to 67.2% of zeros proven to lie on the critical line.
- **Machine-checked.** The model also produced a formal proof in Lean, a programming language that lets computers verify every logical step.
- **Expert review.** Number theorists Brian Conrey and Dan Goldston reviewed the paper, according to Anthropic.
- **Limits acknowledged.** Anthropic itself says these techniques will not lead to a full proof of the Riemann hypothesis.

## What is the Riemann hypothesis?

In 1859, the German mathematician Bernhard Riemann studied a function, now called the zeta function, that is closely linked to how prime numbers are spread out. He suggested that all of its "non-trivial zeros", the points where it equals zero, lie on a single vertical line in the complex plane, known as the critical line.

If true, the hypothesis would give mathematicians precise control over the distribution of prime numbers. It is one of the seven [Millennium Prize Problems](https://www.claymath.org/millennium-problems/), and the Clay Mathematics Institute offers $1 million for a proof.

Computers have checked trillions of zeros, and every one lies on the line. But checking examples can never prove a statement about infinitely many zeros. A single exception anywhere would disprove it.

## What Claude proved

Since the 1940s, mathematicians have tried to prove that at least some fixed share of the zeros lie on the critical line:

| Milestone | Proven share of zeros on the critical line |
|---|---|
| Selberg (1940s) | A small positive proportion |
| Levinson (1974) | About one third |
| Conrey (1989) | More than 40% |
| Later refinements | About 41.6% |
| Claude research model (2026) | 67.2% |

Each earlier step took years of specialist work. Moving the figure by more than 25 percentage points in one go is why the result attracted attention.

According to Anthropic, the work started as a side project. A staff member without a maths background asked Claude to attempt the problem. The model coordinated about 60 copies of itself, called sub-agents, over a day and a half. The key idea was a new way of handling a mathematical space with both positive and negative parts at the same time, instead of separately.

## Why mathematicians are cautious

Experts have welcomed the result but warned against overstating it. Scientific American headlined its coverage "No, AI didn't just solve the thorniest problem in math". The mathematician James Maynard, a Fields Medal winner, told the magazine he doubted that these approaches could reach the full hypothesis.

The reason is that the hypothesis is all-or-nothing. Even a proof that 99.99% of zeros lie on the line would not settle it. An entirely different idea is probably needed.

The work is also still going through normal academic scrutiny. Formal verification in Lean confirms that the logic is correct, but the mathematical community will judge its importance and originality over time.

## Why it matters beyond maths

**For AI.** The result is one of the strongest examples yet of an AI system producing original, verifiable research in pure mathematics, rather than solving textbook problems. It strengthens the case that AI can act as a research collaborator.

**For business.** Claims of research ability help AI companies justify enormous valuations. Anthropic recently completed the [largest stock market listing on record](/markets/anthropic-ipo-prices-83-record-81-billion/), and its share price is now tested on whether its models deliver real-world value. Investors have been volatile, as shown by the [selloff in its first week of trading](/markets/anthropic-ipo-debut-nasdaq-worst-week-venture-capital/).

**For India.** India has a strong tradition in number theory, from Srinivasa Ramanujan to modern research groups at institutions such as TIFR and the Indian Statistical Institute. Formal-proof tools and AI assistants could change how such research is done, and how students learn to check their own proofs.

**For computer security.** Some people worry that progress on primes could break encryption. It will not. The RSA encryption used in banking relies on the difficulty of factoring large numbers, which this result does not affect.

## Frequently asked questions

**Has the Riemann hypothesis been solved?**
No. It remains unproven. Claude improved a partial result about how many zeros lie on the critical line.

**What did Claude prove?**
That at least 67.2% of the non-trivial zeros of the Riemann zeta function lie on the critical line, up from about 41.6%.

**Will Anthropic win the $1 million prize?**
No. The prize is for a full proof or disproof of the hypothesis.

**How do we know the proof is correct?**
It was formalised in the Lean proof assistant, which checks each step mechanically, and reviewed by independent mathematicians.

*This article is based on Anthropic's published research summary and on coverage by Scientific American, TechCrunch and USA Today.*
