---
title: "How I 10x My Coding Speed with Claude Code (And My Open Source Setup)"
excerpt: "After months of refining my AI-powered development workflow, I'm sharing the exact configuration that turned Claude Code into my most productive coding partner."
publishedAt: 2025-01-26
lang: en
tags:
  - AI
  - Claude Code
  - productivity
  - open source
  - developer tools
---

Six months ago, I started using Claude Code. Today, I can't imagine coding without it.

But here's the thing — **out of the box, it's good. With the right configuration, it's transformative.**

After hundreds of hours refining my setup, I've open-sourced everything. This post walks you through why this matters, how it works, and how you can set it up in minutes.

## The Problem: AI Without Context is Just Autocomplete

When I first started using Claude Code, I noticed something frustrating:

- It would ask me the same questions every session
- It didn't remember my project's conventions
- It would suggest code that didn't match my patterns
- Git commits sometimes had the wrong email (disaster for work projects)

Sound familiar?

The issue isn't Claude's intelligence — it's **context**. Without proper configuration, every session starts from zero.

## The Solution: A Self-Improving AI Coding Partner

What if Claude could:

- Know your coding conventions before you tell it?
- Automatically verify git identity per project?
- Detect repetitive patterns and suggest automation?
- Remember your project structure and tech stack?

That's exactly what my configuration does.

## What's in the Setup?

I've organized everything into a clean structure:

```
~/.claude/
├── CLAUDE.md              # Global rules (your coding DNA)
├── commands/              # Reusable workflows
│   ├── focus.md           # Deep work sessions
│   ├── quick-commit.md    # Safe git commits
│   └── session-end.md     # Capture learnings
└── skills/
    ├── init-project/      # Auto-setup new projects
    └── suggest-automation/# Pattern detection
```

Plus project templates for Node.js, Next.js, and Python.

## The Key Features

### 1. Git Identity Protection

This one has saved me countless headaches:

```markdown
### Git Identity - NEVER IGNORE
| Project | Email |
|---------|-------|
| ~/Work/company/** | work@company.com |
| **ALL other projects** | personal@email.com |

Before ANY git commit: verify email first!
```

Claude checks this **before every commit**. No more "wrong email" commits to client repos.

### 2. Self-Improving Through Pattern Detection

This is where it gets interesting. Claude actively watches for patterns:

- Run the same command 3+ times? It suggests creating a shortcut
- Explain the same concept twice? It offers to document it
- Fix the same type of bug? It proposes a convention

```markdown
When pattern detected, ask:
"I noticed you've [pattern] multiple times.
Want me to create a [command/skill] for this?"
```

The AI literally improves itself based on how you work.

### 3. Project Auto-Detection

When you open a new project, Claude:

1. Detects the tech stack (package.json, requirements.txt, etc.)
2. Creates a project-specific `CLAUDE.md`
3. Sets up git identity correctly
4. Summarizes the structure

No manual setup. Just start coding.

### 4. Session Management

Context pollution kills productivity. The config enforces:

- One task per session focus
- Automatic `/clear` suggestions between tasks
- `/compact` when context grows too large

## The Commands

### `/focus` - Deep Work Mode

Starts a focused session with:
- Clear goal definition
- Distraction blocking
- Progress tracking

### `/quick-commit` - Safe Commits

Never worry about git identity again:
1. Verifies correct email
2. Shows diff summary
3. Uses conventional commit format
4. Never auto-commits without review

### `/session-end` - Capture Learnings

At the end of each session:
- Summarizes what was accomplished
- Notes any patterns detected
- Suggests config improvements

## The Pros and Cons

### Pros

- **Immediate productivity boost** — Claude knows your patterns from day one
- **Prevents costly mistakes** — Git identity, destructive commands, all protected
- **Self-improving** — Gets better the more you use it
- **Open source** — Customize everything, own your config
- **Project templates** — Start new projects in seconds

### Cons

- **Initial setup time** — 10-15 minutes to customize for your workflow
- **Learning curve** — Understanding all the features takes time
- **Opinionated defaults** — You might disagree with some conventions (but can change them)

## Quick Start (5 Minutes)

### 1. Clone the repo

```bash
git clone https://github.com/m-ret/awesome-claude-code.git
cd awesome-claude-code
```

### 2. Copy global configuration

**Option A: Run the install script**

```bash
./install.sh
```

**Option B: Manual installation**

```bash
mkdir -p ~/.claude
cp global/CLAUDE.md ~/.claude/CLAUDE.md
cp -r global/commands ~/.claude/
cp -r global/skills ~/.claude/
```

### 3. Personalize

Edit `~/.claude/CLAUDE.md`:
- Update your name and email
- Add your git identity rules
- Customize any behaviors

### 4. Start using it

Open any project with Claude Code. It will:
- Read your global config
- Offer to initialize project-specific config
- Start working with full context

## Real Results

Since implementing this setup:

- **50% fewer context-setting conversations** — Claude already knows
- **Zero git identity mistakes** — In 6+ months
- **12 custom commands created** — From pattern detection
- **Faster onboarding** — New projects ready in seconds

## The Philosophy

This isn't about making Claude do everything automatically. It's about:

1. **Reducing friction** — Less repetition, more creation
2. **Preventing mistakes** — Guardrails that don't slow you down
3. **Continuous improvement** — The system evolves with you
4. **Staying in control** — You approve everything, Claude assists

## Get the Setup

Everything is open source and free:

**Repository:** [github.com/m-ret/awesome-claude-code](https://github.com/m-ret/awesome-claude-code)

Includes:
- Global configuration template
- Commands for common workflows
- Skills for automation
- Project templates (Node.js, Next.js, Python)
- Customization guide

---

## What's Next?

I'm continuously improving this setup. Coming soon:

- More project templates (Go, Rust, mobile)
- Team collaboration patterns
- CI/CD integration guides

Star the repo to stay updated.

---

**Questions or suggestions?** [Let's talk](https://cal.com/marcelo-retana) — I'm always looking to improve the workflow.

If you found this useful, share it with another developer who could benefit. The more people contribute, the better it gets for everyone.
