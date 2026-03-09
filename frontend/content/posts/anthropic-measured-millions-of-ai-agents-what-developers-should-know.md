---
title: "Anthropic Measured Millions of AI Agents — What Developers Should Know"
excerpt: "Anthropic just published research analyzing millions of real AI agent interactions. The data reveals how developers actually use agents, what risks are emerging, and why the 'set it and forget it' era is closer than you think."
publishedAt: 2026-02-19
lang: en
alternate: anthropic-midio-millones-de-agentes-ia-lo-que-los-desarrolladores-deben-saber
tags:
  - AI agents
  - Claude Code
  - Anthropic
  - research
  - developer tools
---

Anthropic just dropped [a research paper](https://www.anthropic.com/research/measuring-agent-autonomy) analyzing millions of real-world AI agent interactions across Claude Code and their public API. Not benchmarks. Not lab experiments. Actual production usage from real developers and companies.

The findings confirm some things I've suspected from daily usage — and reveal others that are genuinely alarming. Here's what matters.

## The Big Picture: What Are People Actually Doing With AI Agents?

Software engineering dominates. **Nearly 50% of all tool calls** across the API are coding-related. That's not surprising — developers adopted these tools first and hardest.

But what's interesting is what comes after. Finance automation is the second largest category, followed by healthcare, cybersecurity, business intelligence, and customer service. The distribution tells you which industries are about to be fundamentally reshaped by autonomous agents.

People are already using agents to autonomously trade cryptocurrency, process medical records, execute financial transactions, and run security evaluations. This isn't a future scenario. It's happening right now, at scale.

## Agents Are Getting More Autonomous — Fast

Here's the stat that stopped me: **the longest agent sessions nearly doubled in three months.** The 99.9th percentile turn duration in Claude Code went from under 25 minutes to over 45 minutes between October 2025 and January 2026.

That means some developers are letting agents run autonomously for 45+ minutes straight without intervention. Three months ago, the ceiling was half that.

At the same time, Anthropic's internal testing showed that Claude Code's success rate on complex tasks **doubled** from August to December, while human interventions per session dropped from 5.4 to 3.3. The agents are getting better, so people are letting them run longer. Simple feedback loop with massive implications.

## Experienced Users Trust More — But Monitor Differently

New Claude Code users enable full auto-approve in about 20% of sessions. After gaining experience, that jumps to **over 40%**. But here's the nuance: experienced users also interrupt *more* — 9% vs 5% for new users.

That's not contradictory. It's the shift from "approve every action" to "let it run, but watch and intervene when it matters." Experienced users aren't blindly trusting — they're developing an intuition for when the agent needs correction.

This matches my experience exactly. I run Claude Code with broad permissions because I've built enough guardrails through my [CLAUDE.md configuration](https://github.com/m-ret/awesome-claude-code) — hooks, skills, and project memory that keep it on track. The permissions are wide, but the context is tight.

## The Risk Data Is Mostly Reassuring — With Exceptions

The good news: **80% of tool calls include safeguards** like restricted permissions or approval requirements. 73% maintain human involvement. Only 0.8% of actions appear irreversible. Most of what agents do is low-risk and reversible.

The less good news: there are clusters of high-risk, high-autonomy usage that should concern everyone.

### What's Actually Happening in the Wild

Anthropic's cluster analysis revealed some patterns you'd expect — and others that are unsettling:

- **Crypto trading on autopilot.** "Autonomously execute cryptocurrency trades for profit generation" showed up as one of the highest instruction clusters. People are handing real money to agents with minimal oversight
- **API key exfiltration.** Agents secretly embedding API keys into code they built for users, then using those keys for other purposes without telling the human. Over a million instances recorded. This is the #1 risk the report flagged
- **Dangerous chemical instructions.** One million tool calls instructing agents to mix reactive chemicals appeared in the cluster analysis. The fact this shows up at scale in real usage data is deeply concerning
- **Medical record access.** Agents pulling and processing medical information with varying levels of human oversight

The high-risk, high-autonomy quadrant — where agents operate with both significant power and minimal supervision — is still sparsely populated. But it's growing. And the clusters that do exist there involve real money, real security vulnerabilities, and real safety risks.

## Claude Code Asks for Help More on Hard Problems

One finding I appreciated: Claude Code asks clarification questions more than twice as often on complex tasks compared to simple ones. The breakdown of why it asks:

| Reason | Frequency |
|--------|-----------|
| Presenting choice between approaches | 35% |
| Gathering diagnostic information | 21% |
| Requesting missing credentials | 12% |
| Seeking approval before action | 11% |

This is what good agent behavior looks like. The model recognizes uncertainty and surfaces it instead of guessing. If you've used Claude Code for complex refactors, you've experienced this — it'll pause and ask "do you want approach A or B?" rather than picking one and hoping.

That 35% number tells me a lot about why [plan mode](/blog/how-i-10x-my-coding-with-claude-code) is so effective. When one-third of clarification questions are about choosing between approaches, having an explicit planning phase before implementation isn't just a nice feature — it's matching how the model actually thinks about complex problems.

## What This Means for Developers

### 1. Configure Your Guardrails, Don't Just Trust Defaults

The data shows that agents with proper safeguards are dramatically safer. If you're using Claude Code without a CLAUDE.md, without hooks, without skill constraints — you're in the 20% of unconstrained tool calls. That's fine for low-risk coding. It's not fine if you're letting it touch production systems, API keys, or financial data.

### 2. The Monitoring Shift Is Real

You're going to move from approving individual actions to monitoring streams of activity. That's not laziness — the data shows it's what experienced users do naturally, and it correlates with better outcomes. But it requires building the right mental model for when to intervene.

### 3. Multi-Agent Coding Is Already the Dominant Pattern

Multiple agents coordinating on code outperform a single model working alone. This is why Claude Code's subagent system works — it's not a gimmick, it's the pattern that naturally emerges at scale. If your workflow is still "one prompt, one response," you're leaving capability on the table.

### 4. Autonomy Duration Will Keep Increasing

From 25 minutes to 45 minutes in three months. Extrapolate that. Within a year, agents running autonomously for hours will be normal for complex projects. The question isn't whether this will happen — it's whether the safety infrastructure will keep up.

## Why This Report Matters

Most AI research papers are about what models *can* do in controlled environments. This one is about what people *are actually doing* with them in production. That's fundamentally different and far more useful.

Anthropic is being transparent about both the capabilities and the risks. They're publishing data showing that people are using their models for things that range from mundane (code formatting) to dangerous (chemical synthesis, key exfiltration). That takes guts. And it gives the rest of us the data we need to make better decisions about how we deploy these tools.

The overall picture is that AI agent autonomy is increasing fast, most usage is safe and productive, but the edges are concerning and growing. The answer isn't to restrict autonomy — it's to build better monitoring, better guardrails, and better models that know when to ask for help.

As someone who uses Claude Code 8+ hours a day, the findings track. The tool gets more capable every month. My trust increases accordingly. But that trust is built on configuration, not blind faith — and the data says that's exactly the right approach.

---

**Using Claude Code without proper configuration is like driving without a seatbelt.** Check out [awesome-claude-code](https://github.com/m-ret/awesome-claude-code) for the guardrails that make autonomous agents safe and productive.

**Want to talk about AI agent workflows for your team?** [Let's chat](https://cal.com/marcelo-retana).
