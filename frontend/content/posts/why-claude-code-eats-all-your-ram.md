---
title: "Why Claude Code Eats All Your RAM (And How to Fix It)"
excerpt: "Ghostty showing 207GB on a 32GB Mac. 129GB memory leaks on Linux. It's not just bad habits — there are real technical culprits hiding in your system. Here's what's actually going on."
publishedAt: 2026-02-17
lang: en
tags:
  - Claude Code
  - AI
  - developer tools
  - performance
  - productivity
---

A tweet went viral this week: a developer showing Ghostty using **207GB of RAM** on a 32GB Mac. The culprit? Claude Code.

The replies were predictable: "Switch to Warp," "Use iTerm," "Ghostty is the problem."

My first take was that it's about bad habits — not managing your context window, not running `/clear`, letting sessions run for hours. And that's partly true. But after digging deeper into the GitHub issues, Reddit threads, and my own system, the picture is more complex than I initially thought.

**There are at least four separate things that can eat your RAM, and only one of them is your fault.**

## The Four Culprits

### 1. Bloated Session Logs (The Silent Killer)

This is the one that surprised me most. Claude Code stores session logs as JSONL files in `~/.claude/projects/`. These files record every conversation, every file read, every tool output.

The problem? **They can quietly grow to 1-10GB per project.**

One developer on GitHub reported that Claude Code was trying to process these massive JSONL files on startup, freezing their entire system. Deleting the large files immediately fixed the issue.

Worse: if you're using MCP servers like Playwright, screenshots get stored as base64 data inside these JSONL files. Every screenshot. Every session. One developer found their logs stuffed with hundreds of base64-encoded screenshots — gigabytes of image data sitting in a log file that Claude tries to load into memory.

**Check yours right now:**

```bash
find ~/.claude -name "*.jsonl" -size +100M -exec ls -lh {} \;
```

If you see files over 100MB, that's likely your problem. You can safely delete old session logs.

### 2. MCP Servers and Hooks

MCP (Model Context Protocol) servers extend Claude Code's capabilities. But they run as separate processes, and they can leak memory independently.

One Reddit user spent days debugging what they thought was a Claude Code memory leak. Turns out their **custom hook** — a macOS audio notification that played a sound when Claude finished a task — was calling `coreaudiod` every time, and `coreaudiod` was leaking memory. Not Claude's fault at all.

Other reported culprits:

- **Playwright MCP** storing screenshots in session logs
- **Filesystem MCP** watching too many files
- **Custom hooks** spawning processes that don't clean up
- **Multiple MCP servers** running concurrently, each consuming resources

Check what MCP servers you have configured:

```bash
cat ~/.claude/settings.json | grep -A 20 "mcpServers"
```

Every MCP server is a process that stays alive during your session. Audit them.

### 3. The Ghostty Bug (Fixed)

Ghostty had a real memory leak, and Claude Code triggered it hard. Mitchell Hashimoto, Ghostty's creator, [wrote about it in detail](https://mitchellh.com/writing/ghostty-memory-leak-fix). The short version:

- Ghostty uses mmap-allocated memory pages for scrollback
- When handling heavy Unicode content (markdown, code blocks, special characters), it allocates "non-standard pages"
- **The bug:** When pruning old scrollback, these non-standard pages were returned to a memory pool instead of being properly freed with `munmap()`
- Classic memory leak. Claude Code just stepped on it harder and faster than normal usage

This is fixed in Ghostty nightly and will ship in version 1.3.

But the Ghostty bug alone doesn't explain 129GB. That brings us to the fourth culprit.

### 4. Claude Code's Own Memory Management

The Claude Code process itself has documented memory issues. [GitHub issue #11315](https://github.com/anthropics/claude-code/issues/11315) shows a Claude process with:

```
VmPeak:    135,508,316 kB  (129 GB!)
VmSize:     75,721,528 kB  (72 GB)
VmRSS:         425,416 kB  (415 MB resident)
```

129GB of virtual memory on a 16GB system. The process consumed all physical RAM in 30 minutes, froze the system, and required a hard reboot. No OOM killer, no warnings — just a lockup.

The virtual memory number is inflated (it includes reserved address space, not just physical RAM), but VmRSS growing from ~2GB to ~12GB in 30 minutes with no other applications running is a real leak.

Potential causes from community investigation:

- **Unbounded ANSI escape sequence accumulation** in terminal rendering
- **Stream resources not being cleaned** after shell commands
- **Subagent memory not being freed** after task completion
- **Context accumulation** without proper garbage collection

This is a bug in Claude Code. Anthropic has tagged the issue with `perf:memory` and `bug`. As users, we can't fix it — but we can work around it.

## The Fixes (By Culprit)

### Fix Session Log Bloat

```bash
# Find large session logs
find ~/.claude -name "*.jsonl" -size +100M -exec ls -lh {} \;

# Delete old/large session logs (safe — it's just history)
find ~/.claude -name "*.jsonl" -size +500M -delete

# Monitor growth over time
du -sh ~/.claude/projects/*/
```

Make this a habit. Check weekly, or set up a cron job.

### Audit MCP Servers and Hooks

Disable MCP servers you're not actively using. Check your hooks for processes that might leak. If you're using Playwright MCP or anything that generates images/screenshots, know that the data is accumulating in your session logs.

### Update Ghostty

If you're on Ghostty, update to nightly. The mmap leak fix is significant. But remember — the terminal is only one piece of the puzzle.

### Manage Your Sessions

This is the part that IS about your habits:

**Use `/clear` between tasks.** When you finish a task, clear the session. One task, one session.

**Use `/compact` for long sessions.** If you can't clear, `/compact` summarizes the context to reduce size.

**Use TASKS.md for persistent memory.** The reason people avoid `/clear` is fear of losing context. Give Claude a file to save state:

```markdown
## Current Work
- [x] Fixed auth bug in login flow
- [ ] Need to update API rate limiting
- [ ] Blocked: waiting on DB migration

## Notes
- Auth tokens expire after 24h (not 1h like docs say)
- Rate limiter config is in /config/limits.yaml
```

Before clearing, ask Claude to update TASKS.md. After clearing, Claude reads it and picks up where it left off. `/clear` stops meaning "start over" and starts meaning "start fresh."

**Restart after marathon sessions.** If you've been at it for 3+ hours, restart. Your terminal has accumulated massive scrollback, and Claude's process memory has grown. A fresh start takes 10 seconds.

**Limit concurrent instances.** Keep it to 1-2 active sessions. Each one maintains its own context, process memory, and terminal output.

## It's Not About the Terminal

When this topic went viral, I saw people suggesting "just switch to Warp, it's written in Rust." That's 100% wrong.

I switched from Warp to Ghostty two weeks ago. The memory issue followed me — because it was never about the terminal. Ghostty, Warp, iTerm, Alacritty — they all store scrollback in memory. If you dump 200,000 lines of Claude Code output into any terminal, it's going to use a lot of RAM.

Ghostty had a real bug that made it worse, and that's been fixed. But the underlying issues — bloated session logs, leaky MCP servers, Claude Code's own memory management — are terminal-agnostic.

## The Bigger Picture

This is a new category of problem. We've never had developer tools that:

- Generate thousands of lines of terminal output per minute
- Maintain persistent conversation state in memory
- Spawn subprocesses (MCP servers) that run alongside them
- Store every interaction in append-only log files
- Try to reload entire session histories on startup

Our terminals, our memory management expectations, and our workflow habits weren't designed for this.

The fix isn't one thing. It's a combination:

- **Anthropic** needs to fix the process memory leaks and implement log rotation
- **Terminal authors** need to handle heavy output more efficiently (Ghostty already fixed their part)
- **We** need to manage sessions, audit our MCP servers, and clean up our logs

The tool is powerful. But right now, using it well means understanding these sharp edges.

---

**Running into this yourself?** Check out my [Claude Code configuration setup](https://github.com/m-ret/awesome-claude-code) — it includes session management commands, TASKS.md templates, and the exact workflow that keeps my system stable.
