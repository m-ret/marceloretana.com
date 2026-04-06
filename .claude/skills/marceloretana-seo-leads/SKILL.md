---
name: marceloretana-seo-leads
description: Plans and implements SEO, programmatic pages, Costa Rica market landings, vertical pages, and lead capture for marceloretana.com. Use for audits, hreflang, schema, sitemap, PSEO JSON, market datasets, or quote-form conversion paths.
paths:
  - "frontend/content/market-pages/**"
  - "frontend/content/pseo/**"
  - "frontend/lib/market-seo.ts"
  - "frontend/lib/market-pages.ts"
  - "frontend/lib/market-page-types.ts"
  - "frontend/next-sitemap.config.js"
  - "docs/superpowers/**"
---

# SEO & lead generation — marceloretana.com

## Canonical references

1. **[AGENTS.md](../../../AGENTS.md)** (repo root) — commands (`bun run validate`, `bun run validate:market`), content boundaries.
2. **Internal plans/specs** (execution backlogs):
   - [SEO recovery plan](../../../docs/superpowers/plans/2026-04-02-marceloretana-seo-recovery-plan.md)
   - [SEO restructuring design](../../../docs/superpowers/specs/2026-04-02-seo-restructuring-design.md)

## Architecture snapshot

| Layer | Location | Role |
|-------|----------|------|
| Money pages (ES) | `frontend/content/market-pages/es-cr.ts` | Hub `/es`, verticals (constructoras, clínicas, turismo), pricing, quote intent |
| Money pages (EN) | `frontend/content/market-pages/en-cr.ts` | Hub `/costa-rica`, verticals (real-estate, healthcare, tourism), quote |
| Metadata + JSON-LD | `frontend/lib/market-seo.ts` | `buildMarketMetadata`, FAQ + breadcrumb + WebPage/ProfessionalService |
| Routing | `frontend/app/(es)/es/**`, `frontend/app/(default)/costa-rica/**` | App Router pages consume datasets |
| PSEO library | `frontend/content/pseo/**` | Comparisons, stacks, resources, checklists (JSON) |
| Sitemap | `frontend/next-sitemap.config.js` | Priorities, `additionalPaths` for market routes |
| Lead capture | `frontend/components/sections/contact-form.tsx`, `frontend/lib/lead-form.ts` | `sourcePage` attribution; POST `/api/contact` |

## After changing market or PSEO data

From `frontend/`:

```bash
bun run validate:market   # market-pages only
bun run validate        # full gate
```

New or renamed slugs: update **redirects** in `frontend/next.config.ts` if URLs move; keep **hreflang pairs** in sync via `getAlternateMarketEntry` / dataset `alternate` fields.

## SEO execution priorities (default order)

1. **Intent & cannibalization** — Each URL owns one primary query class; merge or redirect duplicates (see recovery plan Task 3).
2. **Copy depth** — Hubs and money pages need distinct headlines, objections, FAQ, proof (recovery plan Task 4); avoid identical proof/FAQ blocks site-wide.
3. **Internal links** — Hub → verticals → quote; blog/library → commercial hubs with contextual anchors.
4. **Schema** — FAQ + breadcrumbs already on market pages; consider **LocalBusiness** / **Service** refinements if targeting map pack or specific cities.
5. **CRO** — Forms already on market pages, blog, compare, resources, learn; preserve `sourcePage` for attribution; add analytics events if measuring campaigns.

## What not to do

- Add indexable thin doors (empty vertical stubs).
- Break JSON schemas in `content/pseo` without checking siblings and types in `lib/pseo*.ts`.
- Ship new market slugs without sitemap coverage and redirects from old URLs.
