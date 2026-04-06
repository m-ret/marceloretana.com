---
name: marceloretana-com
description: Develops the marceloretana.com Next.js frontend (Bun, Biome, PSEO JSON, blog markdown, market pages). Use when editing frontend/, adding posts, or changing programmatic SEO or market landing data.
paths:
  - "frontend/**"
---

# marceloretana.com — development skill

## First step

Open **`AGENTS.md`** at the repository root for full structure, safety rules, and content conventions. This skill is a **shortcut**; it does not replace that file.

## Commands (from `frontend/`)

1. After substantive code edits: `bun run validate` (typecheck + lint + format check).
2. After `content/market-pages/` edits: `bun run validate:market` (Zod + slug graph).
3. Local preview: `bun run dev`.

Use **Bun**, not npm/yarn, unless the user specifies otherwise.

## Layout (mental model)

- **`app/`** — routes and special files (`llms.txt` route, layouts).
- **`components/`** — UI; **`components/ui/`** — shadcn-style building blocks.
- **`lib/`** — TypeScript helpers (posts, PSEO, Strapi, etc.).
- **`content/posts/`** — blog markdown + frontmatter (`lang`, `alternate`, dates).
- **`content/pseo/**/*.json`** — structured SEO pages; keep JSON valid and consistent with siblings.
- **`content/market-pages/`** — TS datasets; must pass `validate:market`.

## Editing rules

- Prefer **small, reviewable diffs**; do not refactor unrelated areas.
- Never commit secrets; `.env*.local` is gitignored.
- Do not hand-edit **`.next/`** or build output.
- Blog/PSEO/market changes: preserve existing field names and linking patterns; grep for slug usage before renames.

## Optional deep dives

- Deployment and Strapi: root **`README.md`**.
- Internal SEO plans: **`docs/superpowers/`** (planning only).
