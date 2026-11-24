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
| `frontend/content/work/` | Bilingual build stories (one folder per project: TS module + WebP images + `og.jpg`); validated by script. |
| `frontend/tests/` | Shared fixtures for unit tests (`*.test.ts(x)` files sit next to the code they test). |
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
| `bun run validate` | **Preferred gate:** `typecheck` + `lint` + `format:check` + `validate:work` + `test:coverage`. Run before concluding a task. |
| `bun run typecheck` | `tsc --noEmit` for the app, then for the tests (`tsconfig.test.json`). |
| `bun run test` / `bun run test:coverage` | Unit tests with `bun test` (Jest-style API). `test:coverage` fails if any file the tests load is below 100% of lines or functions. |
| `bun run lint` | Biome lint + oxlint. |
| `bun run lint:fix` / `bun run format` | Auto-fix (use when appropriate). |
| `bun run validate:market` | Zod validation + slug integrity for `content/market-pages/`. **Reciprocal `alternatePath`:** if set, peer entry must exist and point back; omit when there is no real locale pair. **Run after editing market pages.** |
| `bun run validate:work` | Zod + banned-pattern self-test for `content/work/`. **Run after editing `content/work/`.** |

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

### Build stories (`frontend/content/work/`)

First-person case studies at `/work/<slug>` (EN) and `/es/casos/<slug>` (ES). The same seven projects are published as company case studies on gexpsoftware.com (`/work/<slug>`, `/cr/casos/<slug>`), written in a different voice so the two sites never carry the same text. Each story links to its company version (`caseStudyUrl` in `lib/work.ts`), and gexpsoftware.com links back here.

- **One folder per project:** `index.ts` (a `BuildStorySource`), `hero.webp`, the figures the copy refers to by key, and `og.jpg` (1200×630). The registry order lives in `content/work/index.ts` and in `EXPECTED_SLUGS` in `scripts/work/validate.ts`; keep both in step.
- **Cross-links, defined once per story:** `relatedStories` (two slugs) feeds the "Keep reading" cards. `relatedPages` (English market paths, at most 3, each with a Spanish twin through `alternatePath`) feeds the story's "Related services" list **and** the "Related projects" section on those service pages, in both languages. Service pages need no field of their own.
- **Public repo:** commit only page code, story modules and images. Never commit fact sheets, briefs, client details, prices, emails or phone numbers; the validator rejects currency, contact details and hype words.
- **Claims:** every figure in a story must be checkable on the live site or in the project's repo. Do not add numbers that are not already supported.
- Run `bun run validate:work` after editing a story, and `bun run validate:market` after changing the market pages a story points to.

### Tests

- Tests are `*.test.ts(x)` files next to the code, run with `bun test` (Jest-style `describe` / `it` / `expect` / `mock`), and are excluded from the app's `tsconfig.json` so they can never affect `next build`; `tsconfig.test.json` type-checks them.
- Mock only leaf modules (`@/content/work`, `@/lib/market-pages`, `@/lib/posts`, `next/image`, `next/link`) with the shared fakes in `frontend/tests/fixtures/`, and use the same fakes in every file: `mock.module` is process-wide, so tests must not depend on file order.
- New logic ships with tests that bring every file they load to 100% (`bun run test:coverage` enforces it). Put new logic in small modules instead of inside large components.
- Tests of client components and hooks need a DOM: call `installDom()` from `frontend/tests/dom.ts` at the top of the file (and `removeDom` in `afterAll`) before importing React DOM; the file also has controllable fakes for `matchMedia`, `IntersectionObserver` and idle callbacks. Real browser behavior (focus, inertness, top layer) is checked in a browser, not in these tests.

### Front-end conventions (Chrome's Modern Web Guidance)

Look guidance up with `npx modern-web-guidance@latest search "<topic>"` (then `retrieve <id>`) before writing UI, and check the result in a real browser; a rule is not done because the code follows the guide.

- **Overlays and menus:** use a native `<dialog>` opened with `showModal()` (`components/sections/nav.tsx`). Do not add `role`, `aria-modal`, a focus trap, `inert` toggling or an Escape handler; the browser provides them. Do not hide an overlay by moving it off-screen: it stays in the tab order and the accessibility tree.
- **Motion:** every infinite or spatial animation and every `scroll-behavior: smooth` lives inside `@media (prefers-reduced-motion: no-preference)`. Keep the final state: text that an animation reveals must still be visible without it (see `.animate-hero-fade-up`). WebGL scenes use `useSceneActivity`, which starts them when the page is idle, pauses them out of view and shows one still frame under reduced motion. It also checks once for a GPU (`hasHardwareWebGL`) and never creates a scene where the browser draws WebGL on the CPU or has none: there an animated scene left the page's main thread free about three times a second. Test scene changes with a real GPU in mind; headless Chrome here draws on the CPU, so a spoofed renderer name is how the GPU path is exercised.
- **Theme:** change it only through `lib/theme.ts` (the provider and the inline script in `<head>` both use it): it keeps `data-theme`, `<meta name="color-scheme">` and `<meta name="theme-color">` together, and the inline script applies the saved theme before the first paint. Save a theme only on a deliberate choice, never as a default.
- **Text colors:** use `text-accent-fg`, `text-success-fg`, `text-warning-fg` and `text-danger-fg` for text. They keep 4.5:1 contrast in both themes; the raw accent (`text-accent`) is only 3.7:1 on white, and Tailwind's `text-red-500`, `text-green-500` and `text-yellow-500` fail on white too. Text on the always-dark navigation pill is white.
- **Names:** an accessible name must contain the visible text (WCAG 2.5.3). Scrollable regions (`overflow-x-auto` code blocks) need `tabIndex={0}`.

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
