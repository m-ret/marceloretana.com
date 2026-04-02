# MarceloRetana.com SEO Recovery Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `marceloretana.com` into a Costa Rica service-led organic lead machine that captures form submissions from local Spanish buyers and English-speaking foreign-owned businesses without confusing Google or visitors about what the site is for.

**Architecture:** Keep a dual-market service machine under `/cr` and `/costa-rica`, but reduce route overlap, strengthen localization, and make the homepage plus nav feed those clusters directly. Treat developer resources and AI/dev blog content as a secondary authority layer, not as equal top-level identity.

**Tech Stack:** Next.js App Router, static market-content datasets in `frontend/content/market-pages`, route metadata in `frontend/lib/market-seo.ts`, sitemap generation in `frontend/next-sitemap.config.js`, and the shared lead form in `frontend/components/sections/contact-form.tsx`.

---

## File Map

**Core files to modify**
- `frontend/app/layout.tsx`
- `frontend/app/page.tsx`
- `frontend/components/sections/nav.tsx`
- `frontend/components/market-pages/market-landing-page.tsx`
- `frontend/lib/market-seo.ts`
- `frontend/lib/market-pages.ts`
- `frontend/content/market-pages/es-cr.ts`
- `frontend/content/market-pages/en-cr.ts`
- `frontend/next-sitemap.config.js`
- `frontend/app/blog/page.tsx`
- `frontend/app/resources/page.tsx`

**New files likely needed**
- `frontend/components/sections/costa-rica-lanes.tsx`
- `frontend/components/sections/case-proof.tsx`
- `frontend/content/case-proofs/*.md` or `frontend/content/case-proofs.ts`
- `frontend/lib/seo/market-keywords.ts`
- `frontend/app/(optional new route group for proof pages if needed)`

**Outputs this plan should produce**
- fewer, stronger money pages
- route-level clarity between Spanish CR demand and English CR demand
- cleaner site identity
- stronger internal linking and localization
- real proof blocks instead of generic proof placeholders

---

### Task 1: Lock the Site Role

**Files:**
- Modify: `frontend/app/page.tsx`
- Modify: `frontend/components/sections/nav.tsx`
- Review: `frontend/components/sections/hero.tsx`
- Review: `frontend/components/sections/contact.tsx`

- [ ] Define the site’s primary role in one sentence:
`Personal authority site that routes qualified Costa Rica website/app buyers into a quote flow.`

- [ ] Remove the idea that `marceloretana.com` is equally:
  - a portfolio
  - a dev-resources site
  - an AI engineering blog
  - a Costa Rica business website service site

- [ ] Change homepage structure so it explicitly sends users into two lanes:
  - `Para negocios en Costa Rica`
  - `For foreign-owned businesses in Costa Rica`

- [ ] Add contextual homepage links into `/cr` and `/costa-rica` above the fold and again near proof/contact.

- [ ] Keep `Blog` and `Resources` accessible, but do not let them compete with commercial lanes in primary navigation.

- [ ] Commit:
```bash
git add frontend/app/page.tsx frontend/components/sections/nav.tsx
git commit -m "fix(ia): make marceloretana service-led"
```

### Task 2: Fix Localization and Language Signals

**Files:**
- Modify: `frontend/app/layout.tsx`
- Modify: `frontend/lib/market-seo.ts`
- Review: `frontend/app/cr/[slug]/page.tsx`
- Review: `frontend/app/costa-rica/[slug]/page.tsx`

- [ ] Make the root `<html lang>` route-aware so Spanish pages stop shipping `lang="en"`.

- [ ] Ensure paired pages emit reciprocal alternates:
  - Spanish page points to English pair
  - English page points to Spanish pair
  - hubs point to each other

- [ ] Add `x-default` at least for hub-level market pages if appropriate.

- [ ] Decide which pages are true pairs and which are intentionally standalone. Do not fake alternates where the intent is materially different.

- [ ] Re-check live HTML on:
  - `/cr`
  - `/cr/paginas-web-costa-rica`
  - `/costa-rica`
  - `/costa-rica/web-development`

- [ ] Commit:
```bash
git add frontend/app/layout.tsx frontend/lib/market-seo.ts
git commit -m "fix(seo): correct language and hreflang signals"
```

### Task 3: Reduce Cannibalization in the Market Machine

**Files:**
- Modify: `frontend/content/market-pages/es-cr.ts`
- Modify: `frontend/content/market-pages/en-cr.ts`
- Modify: `frontend/lib/market-pages.ts`

- [ ] Keep the strongest Spanish money pages:
  - `/cr`
  - `/cr/paginas-web-costa-rica`
  - `/cr/diseno-web-costa-rica`
  - `/cr/desarrollo-web-costa-rica`
  - `/cr/seo-costa-rica`
  - `/cr/cuanto-cuesta-pagina-web`
  - `/cr/por-que-necesita-sitio-web`
  - `/cr/sitio-web-que-genere-clientes`
  - `/cr/cotizacion`
  - `/cr/constructoras`
  - `/cr/clinicas`
  - `/cr/turismo`

- [ ] Review weaker or overlapping Spanish pages for merge, redirect, or noindex:
  - `/cr/servicios`
  - `/cr/negocios-servicios`
  - `/cr/consultorios`
  - `/cr/rediseno-sitio-web`
  - `/cr/portafolio`
  - `/cr/casos`
  - `/cr/proceso`

- [ ] Keep the strongest English money pages:
  - `/costa-rica`
  - `/costa-rica/web-development`
  - `/costa-rica/web-development-agency`
  - `/costa-rica/web-design`
  - `/costa-rica/request-a-quote`
  - `/costa-rica/website-cost-costa-rica`
  - `/costa-rica/expat-business-web-development`
  - `/costa-rica/nearshore-web-development`

- [ ] Reassess these English pages for merge or demotion:
  - `/costa-rica/software-development`
  - `/costa-rica/why-costa-rica`
  - `/costa-rica/service-business-web-development`
  - `/costa-rica/real-estate-web-development`
  - `/costa-rica/healthcare-web-development`
  - `/costa-rica/tourism-web-development`

- [ ] Rule: every page must own a distinct query class and business intent. If two pages chase the same demand, merge them.

- [ ] Commit:
```bash
git add frontend/content/market-pages/es-cr.ts frontend/content/market-pages/en-cr.ts frontend/lib/market-pages.ts
git commit -m "refactor(seo): tighten market page intent map"
```

### Task 4: Replace Template SEO with Real Money Pages

**Files:**
- Modify: `frontend/content/market-pages/es-cr.ts`
- Modify: `frontend/content/market-pages/en-cr.ts`
- Modify: `frontend/components/market-pages/market-landing-page.tsx`

- [ ] Rewrite core pages manually so each one has:
  - a distinct headline
  - a distinct commercial angle
  - distinct objections
  - distinct proof
  - distinct CTA framing

- [ ] Target minimum copy depth for core money pages:
  - hubs: `700-1,000` words of unique content
  - core money pages: `900-1,400` words
  - sector pages: `700-1,000` words if kept

- [ ] Add on-page modules that vary by intent:
  - pricing context on cost pages
  - trust/proof on quote pages
  - sector-specific pain points on vertical pages
  - lead-flow explanation on conversion pages

- [ ] Stop reusing the same three proof items and same FAQ block across the entire cluster.

- [ ] Commit:
```bash
git add frontend/content/market-pages/es-cr.ts frontend/content/market-pages/en-cr.ts frontend/components/market-pages/market-landing-page.tsx
git commit -m "feat(seo): rewrite core market pages with distinct intent"
```

### Task 5: Render Real Cluster Navigation

**Files:**
- Modify: `frontend/components/market-pages/market-landing-page.tsx`
- Review: `frontend/content/market-pages/es-cr.ts`
- Review: `frontend/content/market-pages/en-cr.ts`

- [ ] Render `featuredLinks` on hub pages. They already exist in data but are not used by the component.

- [ ] On detail pages, separate:
  - `next best pages`
  - `related sectors`
  - `quote / money pages`

- [ ] Keep the cluster flat enough for crawlability, but intentional enough that Google understands which pages are primary and which are support.

- [ ] Add contextual anchor sections such as:
  - services
  - sectors
  - pricing
  - proof
  - quote

- [ ] Commit:
```bash
git add frontend/components/market-pages/market-landing-page.tsx
git commit -m "feat(seo): render featured cluster navigation"
```

### Task 6: Build a Real Proof Layer

**Files:**
- Create: `frontend/components/sections/case-proof.tsx`
- Create: `frontend/content/case-proofs.ts` or structured proof content files
- Modify: `frontend/app/page.tsx`
- Modify: `frontend/content/market-pages/es-cr.ts`
- Modify: `frontend/content/market-pages/en-cr.ts`

- [ ] Replace generic proof with actual evidence:
  - project names when public
  - before/after snapshots where possible
  - sector-specific examples
  - measurable outcomes if available
  - delivery context and scope

- [ ] At minimum, every core page should reference proof that matches its audience:
  - local businesses for `/cr/*`
  - foreign-owned / English-speaking buyers for `/costa-rica/*`

- [ ] If portfolio pages remain, they should be evidence pages, not generic “portfolio” filler.

- [ ] Commit:
```bash
git add frontend/components/sections/case-proof.tsx frontend/content/case-proofs.ts frontend/app/page.tsx frontend/content/market-pages/es-cr.ts frontend/content/market-pages/en-cr.ts
git commit -m "feat(cro): add real project proof to market pages"
```

### Task 7: Reframe Blog and Resource Content Around Buyer Demand

**Files:**
- Modify: `frontend/app/blog/page.tsx`
- Modify: `frontend/app/resources/page.tsx`
- Review: `frontend/content/posts/*`

- [ ] Split content into two buckets:
  - buyer-relevant authority content
  - developer/AI/operator content

- [ ] Keep buyer-relevant posts prominent:
  - websites for small businesses
  - why local businesses lose clients without a website
  - website lead-generation problems
  - WhatsApp/contact-response business pain

- [ ] Demote or isolate dev-only posts so they do not define the site’s main topical identity.

- [ ] Remove `Resources` from any buyer-critical path unless it helps a commercial query or trust decision.

- [ ] Commit:
```bash
git add frontend/app/blog/page.tsx frontend/app/resources/page.tsx
git commit -m "fix(content): align public content hubs with service intent"
```

### Task 8: Decide What to Index, Demote, or Noindex

**Files:**
- Modify: `frontend/next-sitemap.config.js`
- Modify: page-level metadata where needed
- Review: `frontend/app/resources/*`
- Review: `frontend/app/compare/*`
- Review: `frontend/app/checklist/*`
- Review: `frontend/app/learn/*`

- [ ] Keep indexed:
  - homepage
  - contact
  - core Costa Rica market pages
  - buyer-relevant blog posts

- [ ] Consider `noindex` or de-prioritizing:
  - low-value developer resources with no service relevance
  - duplicate or weak support pages
  - experimental pSEO that does not support commercial intent

- [ ] Clean sitemap priorities so they reflect actual business priority, not just route existence.

- [ ] Replace synthetic freshness where possible with source-driven dates.

- [ ] Commit:
```bash
git add frontend/next-sitemap.config.js
git commit -m "fix(seo): align indexation and sitemap with business priorities"
```

### Task 9: Rebuild the Homepage as an Authority Router

**Files:**
- Modify: `frontend/app/page.tsx`
- Review: `frontend/components/sections/about.tsx`
- Review: `frontend/components/sections/testimonials.tsx`
- Review: `frontend/components/sections/contact.tsx`

- [ ] Make the homepage route visitors to three clear outcomes:
  - learn who Marcelo is
  - see proof of work
  - enter the right Costa Rica service lane

- [ ] Add two obvious lane cards or sections:
  - Spanish Costa Rica business owners
  - English-speaking / foreign-owned Costa Rica businesses

- [ ] Keep authority and personality, but stop making users infer where to go next.

- [ ] Commit:
```bash
git add frontend/app/page.tsx
git commit -m "feat(cro): make homepage route users into market lanes"
```

### Task 10: Instrument Lead Capture So SEO Can Be Judged by Revenue

**Files:**
- Review: `frontend/app/api/contact/route.ts`
- Review: current analytics setup
- Optional create: `frontend/lib/analytics/*`

- [ ] Track form submissions by:
  - source page
  - locale lane
  - route group
  - project type

- [ ] Define the KPI set:
  - indexed core pages
  - GSC impressions and clicks on core market pages
  - qualified form submissions from `/cr/*`
  - qualified form submissions from `/costa-rica/*`

- [ ] Do not treat traffic alone as success. The site’s SEO job is qualified quote flow.

- [ ] Commit:
```bash
git add frontend/app/api/contact/route.ts frontend/lib/analytics
git commit -m "feat(analytics): track seo lead quality by market lane"
```

---

## Content Priority Order

Implement rewrites in this order:

1. `/cr`
2. `/cr/paginas-web-costa-rica`
3. `/cr/cotizacion`
4. `/cr/cuanto-cuesta-pagina-web`
5. `/cr/constructoras`
6. `/cr/clinicas`
7. `/cr/turismo`
8. `/costa-rica`
9. `/costa-rica/web-development`
10. `/costa-rica/web-development-agency`
11. `/costa-rica/request-a-quote`
12. `/costa-rica/website-cost-costa-rica`
13. `/costa-rica/expat-business-web-development`

Everything else is secondary until those pages are genuinely strong.

## Routes to Merge or Challenge First

- `/cr/servicios`
- `/cr/negocios-servicios`
- `/cr/consultorios`
- `/cr/portafolio`
- `/cr/casos`
- `/cr/proceso`
- `/costa-rica/software-development`
- `/costa-rica/why-costa-rica`

If a page cannot defend a unique query and a unique sales job, merge it.

## Success Criteria

- Spanish market pages render with proper Spanish language signals.
- The homepage visibly routes users into `/cr` and `/costa-rica`.
- The nav no longer positions dev content as equal to commercial lanes.
- Core market pages are manually differentiated and materially deeper.
- At least 8 core money pages are clearly indexable and internally prioritized.
- Form submissions can be attributed to route groups and page intent.

## What Not to Do

- Do not keep adding thin market pages just because the system makes it easy.
- Do not let `/resources` or dev-tool pSEO define the site’s identity.
- Do not pretend all ES/EN pages are alternates if they are not real equivalents.
- Do not rely on generic proof like `600+ projects` as the main trust device.
- Do not judge this by impressions alone; judge it by qualified quote requests.
