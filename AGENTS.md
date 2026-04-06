# Agent guide — marceloretana.com

This file is the **canonical** onboarding document for AI coding agents (Claude Code, Cursor, Codex, Copilot, and similar). Human contributors should read [`README.md`](./README.md) for deployment, Strapi, and environment setup; agents should start here for **how to change the repo safely**.

## Repository map

| Path | Role |
|------|------|
| `frontend/` | **Primary app** — Next.js (App Router), TypeScript, Tailwind v4, Biome + oxlint. Vercel root directory. |
| `frontend/app/` | Routes, layouts, API-style routes (e.g. `llms.txt`). |
| `frontend/components/` | React UI; `ui/` is shadcn-style primitives. |
| `frontend/lib/` | Shared TS utilities (posts, PSEO, Strapi client, etc.). |
| `frontend/content/posts/` | Blog markdown; consumed by `lib/posts.ts` (gray-matter frontmatter). |
| `frontend/content/pseo/` | Programmatic SEO JSON (comparisons, stacks, resources, checklists, taxonomy). |
| `frontend/content/market-pages/` | Typed market landing datasets (`en-cr.ts`, `es-cr.ts`); validated by script. |
| `cms/` | Strapi 5 project (when present). Not required for most **frontend-only** tasks. |
| `docs/superpowers/` | Internal planning/specs (SEO, etc.). Not executed by the build. |

The repo root `package.json` is minimal; **almost all commands run from `frontend/`**.

## Commands (always use Bun)

From `frontend/`:

| Command | Purpose |
|---------|---------|
| `bun install` | Install dependencies. |
| `bun run dev` | Local dev server (default: http://localhost:3000). |
| `bun run build` | Production build (+ `postbuild` sitemap). |
| `bun run validate` | **Preferred gate:** `typecheck` + `lint` + `format:check`. Run before concluding a task. |
| `bun run typecheck` | `tsc --noEmit`. |
| `bun run lint` | Biome lint + oxlint. |
| `bun run lint:fix` / `bun run format` | Auto-fix (use when appropriate). |
| `bun run validate:market` | Zod validation + slug integrity for `content/market-pages/`. **Reciprocal `alternatePath`:** if set, peer entry must exist and point back; omit when there is no real locale pair. **Run after editing market pages.** |

Do **not** assume `npm`/`pnpm` unless the user asks; this project standardizes on **Bun**.

## Code style and quality

- **Formatter/linter:** Biome is authoritative; oxlint runs alongside `bun run lint`.
- **TypeScript:** Prefer strict, explicit types at boundaries (API handlers, `lib/`, props).
- **React/Next.js:** App Router conventions; prefer server components unless client interactivity is required (`"use client"`).
- **Imports:** Match existing patterns (`@/` alias as used in `frontend/`).
- **Scope:** Make focused diffs. Do not refactor unrelated modules or rename public routes without explicit instruction.

## Content rules

### Blog posts (`frontend/content/posts/`)

- Files: `*.md` or `*.mdx`; slug = filename without extension.
- Frontmatter (typical): `title`, `excerpt`, `publishedAt` (or `date`), `lang` (`en` \| `es`), optional `tags`, `featuredImage`/`image`, optional `alternate` (other-language slug).
- After adding or reordering posts, consider whether `frontend/app/llms.txt/route.ts` still reflects important positioning (it lists posts for LLM consumers).

### PSEO JSON (`frontend/content/pseo/`)

- Large structured datasets; preserve valid JSON and existing schema shapes.
- Taxonomy and slugs are interconnected; grep for references before renaming slugs.
- If unsure of schema, inspect nearby files of the same type and any types under `frontend/lib/pseo-types.ts` / related modules.

### Market pages (`frontend/content/market-pages/`)

- Data is TypeScript, validated by `bun run validate:market`.
- Hub + page objects must stay internally consistent (`relatedSlugs` must exist, no duplicate `slug` per dataset).
- Run `bun run validate:market` after edits.

#### Spanish-first market pages

- **Default dataset:** add new money verticals in **`es-cr.ts`**. Promote to **`en-cr.ts`** only when earned (spec ladder: meaningful English demand in GSC or inbound, qualified conversion on the ES page, or a strategic English-buyer vertical — not for EN/ES symmetry alone).
- **`alternatePath`:** set only when a real sibling page exists in the other locale; **never** invent a pair or placeholder path for hreflang.
- **Ship gate:** a new ES vertical is not done until the **`/es` hub** links to it **and** there are **≥2** contextual internal links elsewhere (`featuredLinks`, `relatedSlugs`, narrative in-copy links — use what the template provides).
- **Post-ship checks:** **Rich Results Test** for each **new template variant**; **Google Search Console** with filters split **`/es/`** vs **`/costa-rica/`**; after large layout changes, optional **Lighthouse** on the ES hub plus one vertical.

## Strapi / CMS

- Optional for local work: frontend can target Strapi Cloud via env vars (see `README.md`).
- `frontend/lib/strapi.ts` — API client; do not commit secrets. `.env*.local` is gitignored.
- If `cms/` is missing in a clone, treat the site as **file-based content + Strapi remote** per README.

## Things to avoid

- Committing `.env`, tokens, or Strapi admin credentials.
- Editing generated output under `frontend/.next/`, `frontend/out/`, or Vercel artifacts.
- Broad search-and-replace across `content/pseo` without validating JSON and internal links.
- Skipping `bun run validate` (and `validate:market` when relevant) before claiming work is done.

## Cursor / Claude / other tools

- **Cursor:** Project rules live in `.cursor/rules/`.
- **Claude Code:** Read [`CLAUDE.md`](./CLAUDE.md); project skills: `.claude/skills/marceloretana-com/SKILL.md` (`/marceloretana-com`), `.claude/skills/marceloretana-seo-leads/SKILL.md` (`/marceloretana-seo-leads` for SEO, market pages, PSEO, lead capture).
- **GitHub Copilot:** See `.github/copilot-instructions.md`.

When instructions conflict, prefer **this file** for repo-specific truth, then `README.md` for hosting and credentials workflow.
