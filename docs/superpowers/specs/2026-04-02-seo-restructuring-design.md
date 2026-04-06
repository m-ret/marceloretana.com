# SEO Restructuring & Bilingual Architecture

**Date:** 2026-04-02
**Status:** Draft
**Scope:** marceloretana.com -- full URL restructuring, i18n system, content strategy

---

## Problem

marceloretana.com has ~150 indexable and non-indexable pages across two languages with no consistent URL scheme, no language toggle, redundant geo-keywords in slugs, keyword cannibalization between similar service pages, and 77 pieces of library content excluded from search via sitemap rules. The site cannot capture the organic traffic its content deserves.

## Goals

1. Consistent bilingual URL architecture: English at root, Spanish under `/es/`
2. Language toggle so users can switch between EN/ES from any page
3. Eliminate keyword cannibalization by consolidating overlapping service pages
4. Index the technical library (77 pages) to build domain authority
5. Clean redirect map so no existing page returns 404
6. Topical cluster strategy linking blog posts to service hub pages

## Non-Goals

- Visual redesign (out of scope)
- CMS integration
- Additional languages beyond EN/ES
- New content creation (blog posts) -- that follows separately
- Spanish translations of checklists, build guides, or resource lists (English-only for this phase)

---

## 1. URL Architecture

### Principle

English at root. Spanish under `/es/`. Every URL targets one distinct search intent. No redundant geo-keywords in slugs.

### English Routes (root)

| URL | Purpose | Primary Keywords |
|-----|---------|-----------------|
| `/` | Homepage with market selection | marcelo retana, web developer costa rica |
| `/costa-rica` | EN services hub -- pillar page covering web development, design, agency positioning, nearshore, expat. | web development costa rica, web design costa rica, web agency costa rica |
| `/costa-rica/website-cost` | Pricing/cost guide | website cost costa rica |
| `/costa-rica/redesign` | Redesign service | website redesign costa rica |
| `/costa-rica/lead-generation` | Lead generation service | lead generation website costa rica |
| `/costa-rica/real-estate` | Vertical: construction/real estate | real estate web development costa rica |
| `/costa-rica/healthcare` | Vertical: clinics/medical | healthcare web development costa rica |
| `/costa-rica/tourism` | Vertical: tourism/hospitality | tourism web development costa rica |
| `/costa-rica/quote` | EN quote form | (conversion page) |
| `/contact` | General contact | (conversion page) |
| `/blog` | EN blog index | |
| `/blog/[slug]` | EN blog posts | |
| `/compare/[slug]` | Tool comparisons | |
| `/learn/[slug]` | Build guides | |
| `/checklist/[slug]` | Interactive checklists | |
| `/resources/[slug]` | Curated tool lists | |

### Spanish Routes (/es/)

| URL | Purpose | Primary Keywords |
|-----|---------|-----------------|
| `/es` | ES homepage + main service hub. This IS the service page -- not a separate landing page. | paginas web costa rica, diseno web costa rica, desarrollo web costa rica |
| `/es/cuanto-cuesta` | Pricing/cost guide | cuanto cuesta pagina web costa rica |
| `/es/rediseno` | Redesign service | rediseno sitio web costa rica |
| `/es/generar-clientes` | Lead generation service | sitio web que genere clientes |
| `/es/constructoras` | Vertical: construction | paginas web constructoras costa rica |
| `/es/clinicas` | Vertical: healthcare | paginas web clinicas costa rica |
| `/es/turismo` | Vertical: tourism | paginas web turismo costa rica |
| `/es/cotizacion` | ES quote form | (conversion page) |
| `/es/contacto` | ES contact | (conversion page) |
| `/es/blog` | ES blog index | |
| `/es/blog/[slug]` | ES blog posts | |
| `/es/compare/[slug]` | Spanish comparisons (10 existing) | |

### Library Content -- English Only (Intentional)

Checklists (16), build guides (16), and resource lists (18) remain English-only. No Spanish translations planned for this phase. These pages have no language toggle and no hreflang. CTAs on library pages link to `/costa-rica` (English audience).

### Pages Consolidated (Absorbed Into Hub)

**Into `/costa-rica`:**
- web-development, web-design, web-development-agency, nearshore-web-development, expat-business-web-development

**Into `/es`:**
- paginas-web-costa-rica, diseno-web-costa-rica, desarrollo-web-costa-rica, seo-costa-rica

**Moved to blog:**
- por-que-necesita-sitio-web (educational content, not a service)

**Killed (were already noindex):**
- servicios, negocios-servicios, consultorios, portafolio, casos, proceso, software-development, why-costa-rica, service-business-web-development

---

## 2. i18n System

### Language Toggle

A simple `[EN | ES]` toggle in the top nav bar, next to the existing theme toggle. Links to the alternate-language version of the current page.

**Data flow for the toggle:**
- Page components pass `alternatePath` to the layout via a React context (`LanguageContext`)
- Static service pages: alternate path is hardcoded from the language pair map
- Dynamic blog pages: alternate path comes from the post's frontmatter `alternate` field, resolved at build time and passed via the context
- Dynamic comparison pages: alternate path derived by adding/removing `/es/` prefix (ES slugs strip the `-es` suffix)
- Pages without a pair (checklists, guides, resources): context provides `null`, toggle is hidden

**Language preference persistence:**
- URL-path detection: anything under `/es/` is Spanish context
- Nav links adapt based on current path prefix: if on an `/es/` page, "Services" links to `/es`, "Blog" links to `/es/blog`
- No cookie/localStorage needed -- the URL IS the language state
- On pages without a language pair (library content), nav defaults to English links

### Route Groups (Next.js App Router)

The `(default)` route group keeps its current name. Only the `(es)` group's internal folder changes from `cr/` to `es/`.

```
app/
  (default)/   -> lang="en" (KEEP CURRENT NAME -- do NOT rename to (en))
    page.tsx                    -> /
    costa-rica/
      page.tsx                  -> /costa-rica
      [slug]/page.tsx           -> /costa-rica/website-cost, etc.
    blog/
      page.tsx                  -> /blog (CHANGE: filter to EN-only posts)
      [slug]/page.tsx           -> /blog/[slug] (CHANGE: generateStaticParams EN-only, add dynamicParams=false)
    compare/[slug]/page.tsx     -> /compare/[slug]
    learn/[slug]/page.tsx       -> /learn/[slug]
    checklist/[slug]/page.tsx   -> /checklist/[slug]
    resources/[slug]/page.tsx   -> /resources/[slug]
    contact/page.tsx            -> /contact

  (es)/        -> lang="es"
    es/                         (RENAME from cr/)
      page.tsx                  -> /es (NEW: full Spanish homepage/service hub)
      cuanto-cuesta/page.tsx    -> /es/cuanto-cuesta (STATIC route, not [slug])
      rediseno/page.tsx         -> /es/rediseno (STATIC route)
      generar-clientes/page.tsx -> /es/generar-clientes (STATIC route)
      constructoras/page.tsx    -> /es/constructoras (STATIC route)
      clinicas/page.tsx         -> /es/clinicas (STATIC route)
      turismo/page.tsx          -> /es/turismo (STATIC route)
      cotizacion/page.tsx       -> /es/cotizacion (STATIC route)
      contacto/page.tsx         -> /es/contacto (NEW: Spanish contact page)
      blog/
        page.tsx                -> /es/blog (NEW: ES-only blog index)
        [slug]/page.tsx         -> /es/blog/[slug] (NEW: ES blog posts)
      compare/
        [slug]/page.tsx         -> /es/compare/[slug] (NEW: ES comparisons)
```

**Key decision: All Spanish service pages are static routes, not dynamic `[slug]` routes.** This eliminates the conflict between `generateStaticParams` and static directories. Each page gets its own folder. The `es-cr.ts` content file still provides the data, but routing is explicit.

**Why not `[slug]`:** With only 7 service pages, explicit static routes are clearer, avoid slug conflicts with `blog/`, `compare/`, `cotizacion/`, `contacto/`, and make the build deterministic.

### Language Pair Map

Centralized source of truth in `lib/language-pairs.ts`, used by the toggle, hreflang generation, and sitemap:

| English | Spanish |
|---------|---------|
| `/costa-rica` | `/es` |
| `/costa-rica/website-cost` | `/es/cuanto-cuesta` |
| `/costa-rica/redesign` | `/es/rediseno` |
| `/costa-rica/lead-generation` | `/es/generar-clientes` |
| `/costa-rica/real-estate` | `/es/constructoras` |
| `/costa-rica/healthcare` | `/es/clinicas` |
| `/costa-rica/tourism` | `/es/turismo` |
| `/costa-rica/quote` | `/es/cotizacion` |
| `/contact` | `/es/contacto` |
| `/blog` | `/es/blog` |

Blog post pairs resolved via frontmatter `alternate` field. Comparison pairs resolved by slug convention (add/strip `-es` suffix + prefix swap).

**Homepage hreflang:** `/` is standalone with `x-default` pointing to itself. It is a market-selector page, not a language-specific service page. Only `/costa-rica` <-> `/es` gets the hreflang pair. This avoids the ambiguity of `/es` having two English alternates.

### Hreflang Tags

Every page with a language pair gets bidirectional hreflang + x-default:

```html
<!-- On /costa-rica -->
<link rel="alternate" hreflang="en" href="https://marceloretana.com/costa-rica" />
<link rel="alternate" hreflang="es" href="https://marceloretana.com/es" />
<link rel="alternate" hreflang="x-default" href="https://marceloretana.com/costa-rica" />

<!-- On /es -->
<link rel="alternate" hreflang="en" href="https://marceloretana.com/costa-rica" />
<link rel="alternate" hreflang="es" href="https://marceloretana.com/es" />
<link rel="alternate" hreflang="x-default" href="https://marceloretana.com/costa-rica" />

<!-- On / (homepage) -- standalone -->
<link rel="alternate" hreflang="x-default" href="https://marceloretana.com/" />
```

Pages without a pair (most library content) emit no hreflang and hide the language toggle.

### Sitemap Language Annotations

Update `next-sitemap.config.js` to include `alternateRefs` for pages with language pairs:

```js
alternateRefs: [
  { hreflang: 'en', href: 'https://marceloretana.com' },
  { hreflang: 'es', href: 'https://marceloretana.com/es' },
]
```

Apply per-URL via the `transform` function, using the language pair map.

---

## 3. Content Strategy

### Indexing Changes

**Clarification:** The 77 library pages are NOT blocked by `<meta name="robots" content="noindex">`. They are excluded only via the `next-sitemap.config.js` exclude list. The individual pages have no robots meta tag and are technically indexable if Google discovers them. The fix is to remove them from the sitemap exclude list and add them to the sitemap with appropriate priority.

Additionally, the 4 library index pages (`/compare`, `/learn`, `/checklist`, `/resources`) currently have `robots: { index: false }` in their page metadata. Decision: **keep index pages as noindex.** Individual pages are the SEO targets; index pages serve internal navigation only. Breadcrumbs provide the link equity path.

**Newly included in sitemap:**
- 19 EN comparisons at `/compare/[slug]`
- 10 ES comparisons at `/es/compare/[slug]`
- 16 build guides at `/learn/[slug]`
- 16 checklists at `/checklist/[slug]`
- 18 resource guides at `/resources/[slug]`
- 3 English vertical pages (real-estate, healthcare, tourism) -- remove noindex
- `/es/rediseno`, `/es/generar-clientes` -- newly promoted

**Net indexable page count:** ~40 currently -> ~120+ after migration

### Sitemap Priority Tiers

| Priority | Pages |
|----------|-------|
| 1.0 | `/` |
| 0.95 | `/es`, `/costa-rica` |
| 0.85 | Service/vertical pages |
| 0.8 | Blog posts |
| 0.7 | Contact/quote pages |
| 0.6 | Library content (comparisons, guides, checklists, resources) |

Note: Google ignores `<priority>` in sitemaps. These values serve as internal documentation of page importance.

### Structured Data

**Service pages:** `ProfessionalService` + `FAQ` + `BreadcrumbList`
**Blog posts:** `Article` + `BreadcrumbList` (add `dateModified`, `author.sameAs`)
**Comparisons:** `ItemList`
**Checklists/guides:** `HowTo`
**Resources:** `ItemList`
**Homepage:** `ProfessionalService` + `Person` + `Organization`

### Open Graph Images -- Per Language

The root `opengraph-image.tsx` and `twitter-image.tsx` currently generate English-only images. Spanish pages shared on WhatsApp (the primary communication channel for Costa Rica businesses) would show English preview cards.

**Fix:** Each route group gets its own OG image generators:
- `(default)/opengraph-image.tsx` -- English (existing, keep)
- `(es)/es/opengraph-image.tsx` -- Spanish (NEW, generate Spanish text)
- Service pages and blog posts already have per-page OG images; ensure Spanish pages generate Spanish OG text

### Internal Linking

1. Hub pages (`/costa-rica`, `/es`) link to verticals, pricing, and supporting blog posts
2. Vertical pages link to hub and related verticals
3. Blog posts link to relevant service pages
4. Library pages include contextual CTAs to service pages (link to `/costa-rica` since library is English-only)
5. Breadcrumbs on every page

### Blog Restructuring

- EN posts stay at `/blog/[slug]`
- ES posts move to `/es/blog/[slug]` (301 redirects from `/blog/[spanish-slug]`)
- `/blog` index filters to EN-only posts (use existing `getPostsByLang("en")`)
- `/es/blog` index filters to ES-only posts (use existing `getPostsByLang("es")`)
- Existing alternate pairs connected via hreflang
- EN blog `[slug]/page.tsx` adds `dynamicParams = false` and filters `generateStaticParams` to EN-only slugs
- ES blog `[slug]/page.tsx` sets `dynamicParams = false` and filters `generateStaticParams` to ES-only slugs

**Redirect precedence:** Next.js `redirects` in `next.config.ts` execute BEFORE route matching. So `/blog/[spanish-slug]` will 301 to `/es/blog/[spanish-slug]` even if `generateStaticParams` no longer includes that slug. Verify with local build + `curl -I` before deploying.

### Topical Clusters (Post-Launch Content)

**Supporting `/es`:** que incluir en sitio profesional, errores comunes paginas negocios, como elegir desarrollador web
**Supporting `/costa-rica`:** what to look for in CR web partner, nearshore vs offshore, working with local developer
**Supporting verticals:** constructoras + web, clinicas + pacientes en linea, turismo + reservas

---

## 4. Redirect Plan

### Summary

| Category | Count |
|----------|-------|
| Spanish market pages -> /es/ | 19 |
| English market pages -> consolidated | 15 |
| Spanish blog posts -> /es/blog/ | 22 |
| Spanish comparisons -> /es/compare/ | 10 |
| **Total** | **66** |

### Implementation

All 301 redirects in `next.config.ts` as permanent redirects. Handled at CDN edge by Vercel. Well within Vercel's 1,024 redirect limit.

**Blog redirects:** Must be enumerated individually (Spanish blog slugs do not follow a predictable suffix pattern). Generate the list from `getAllPosts()` filtered to `lang === "es"`.

**Comparison redirects:** Can use a regex pattern since all ES comparisons have the `-es` suffix:
```ts
{ source: '/compare/:slug(.*)-es', destination: '/es/compare/:slug', permanent: true }
```
Caution: verify this does not match English slugs containing "es" (e.g., `biome-vs-eslint` -- the regex anchors to `-es$` which does not match `eslint`).

### Complete Redirect Table

**Spanish market pages:**

| Old | New |
|-----|-----|
| `/cr` | `/es` |
| `/cr/paginas-web-costa-rica` | `/es` |
| `/cr/diseno-web-costa-rica` | `/es` |
| `/cr/desarrollo-web-costa-rica` | `/es` |
| `/cr/seo-costa-rica` | `/es` |
| `/cr/cuanto-cuesta-pagina-web` | `/es/cuanto-cuesta` |
| `/cr/por-que-necesita-sitio-web` | `/es/blog/por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web` |
| `/cr/sitio-web-que-genere-clientes` | `/es/generar-clientes` |
| `/cr/cotizacion` | `/es/cotizacion` |
| `/cr/constructoras` | `/es/constructoras` |
| `/cr/clinicas` | `/es/clinicas` |
| `/cr/turismo` | `/es/turismo` |
| `/cr/rediseno-sitio-web` | `/es/rediseno` |
| `/cr/servicios` | `/es` |
| `/cr/negocios-servicios` | `/es` |
| `/cr/consultorios` | `/es/clinicas` |
| `/cr/portafolio` | `/es` |
| `/cr/casos` | `/es` |
| `/cr/proceso` | `/es` |

**English market pages:**

| Old | New |
|-----|-----|
| `/costa-rica/web-development` | `/costa-rica` |
| `/costa-rica/web-design` | `/costa-rica` |
| `/costa-rica/web-development-agency` | `/costa-rica` |
| `/costa-rica/nearshore-web-development` | `/costa-rica` |
| `/costa-rica/expat-business-web-development` | `/costa-rica` |
| `/costa-rica/website-cost-costa-rica` | `/costa-rica/website-cost` |
| `/costa-rica/website-redesign-costa-rica` | `/costa-rica/redesign` |
| `/costa-rica/lead-generation-websites-costa-rica` | `/costa-rica/lead-generation` |
| `/costa-rica/request-a-quote` | `/costa-rica/quote` |
| `/costa-rica/software-development` | `/costa-rica` |
| `/costa-rica/why-costa-rica` | `/costa-rica` |
| `/costa-rica/service-business-web-development` | `/costa-rica` |
| `/costa-rica/real-estate-web-development` | `/costa-rica/real-estate` |
| `/costa-rica/healthcare-web-development` | `/costa-rica/healthcare` |
| `/costa-rica/tourism-web-development` | `/costa-rica/tourism` |

**Spanish blog posts:** all 22 posts redirect from `/blog/[spanish-slug]` to `/es/blog/[spanish-slug]`. Enumerate individually in next.config.ts from the post list.

**Spanish comparisons:** regex redirect: `/compare/:slug(.*)-es` -> `/es/compare/:slug`. The ES comparison JSON files keep their `-es` suffix filenames, but the new `/es/compare/[slug]` route strips the suffix when resolving. The `getPseoContent` function must be updated to look up `${slug}-es.json` when locale is Spanish.

---

## 5. Migration Safety

### Before Deploying

1. Export current Search Console crawl data (indexed URLs, impressions, clicks)
2. Build locally and test every redirect with `curl -I localhost:3000/[old-url]` -- verify 301 and correct destination
3. Specifically test Spanish blog slugs: verify redirect fires BEFORE static route matching
4. Verify no redirect chains (A -> B -> C) or loops
5. Update sitemap config to include new URLs, exclude old ones, add hreflang annotations
6. Verify all new routes render correctly with correct `<html lang>`, OG images, and structured data
7. Run a full build -- confirm no generateStaticParams conflicts

### After Deploying

1. Submit updated sitemap to Search Console
2. URL Inspection on 10 key redirected URLs (mix of market pages, blog posts, comparisons)
3. Monitor Coverage report for 2 weeks (watch for crawl errors, soft 404s)
4. Monitor Performance report (traffic should transfer in 2-4 weeks)
5. Keep all redirects permanently -- never remove them

### Rollback Plan

If organic traffic drops >40% after 2 weeks with no recovery trend:
1. Revert the code change (single commit revert)
2. Remove the redirects from next.config.ts
3. Restore old route structure
4. Note: if Google has already processed the 301s, reverting creates temporary confusion. Google will re-crawl and adjust within 1-2 weeks.
5. Post-mortem: investigate which specific URLs lost traffic and why

**Risk assessment:** Medium. Consolidating pages concentrates link equity (positive) but changing URLs causes temporary ranking fluctuation. Expected recovery: 2-4 weeks for most pages, 4-8 weeks for full stabilization. The net effect should be positive.

---

## 6. New Content & Code Required

### New Pages (Code + Content -- Blocking for Launch)

| Page | Type | Work |
|------|------|------|
| `/es` | Full new page | Spanish homepage/service hub (~2,000 words). Hero, service overview, Spanish testimonials, about, experience, FAQ. `ProfessionalService` + `FAQ` schema. OG image in Spanish. |
| `/es/contacto` | Full new page | Spanish contact page. Translate hero copy, form labels (already localized via `locale` prop), response promise. |
| `/es/blog` | New route | ES blog index page. Use `getPostsByLang("es")`. Translate index page chrome (headings, category labels). |
| `/es/blog/[slug]` | New route | ES blog post page. Clone from EN blog route, update breadcrumbs to `/es/blog`, generate ES-only static params, add `dynamicParams = false`. Include OG image generation with Spanish text. |
| `/es/compare/[slug]` | New route | ES comparison page. Serve the 10 existing ES comparison JSON files. Slug resolution: strip `-es` suffix from filename for URL, pass to `getPseoContent` with locale-aware lookup. |
| `/es/opengraph-image.tsx` | New file | Spanish OG image generator for the ES route group root. |
| `lib/language-pairs.ts` | New file | Centralized language pair map. Exports lookup functions for toggle + hreflang. |
| `components/language-toggle.tsx` | New component | Toggle in nav bar. Reads `alternatePath` from `LanguageContext`. Hidden when `null`. |
| `LanguageContext` provider | New context | Wraps page content. Pages pass `alternatePath` to context. Toggle reads from context. |

### Rewrites (Content Changes -- Blocking)

| Page | Work |
|------|------|
| `/costa-rica` | Rewrite into THE English pillar page. Absorb content from 5 killed pages. ~1,500 words. |
| `/es/cuanto-cuesta` | Rewrite from cr/cuanto-cuesta-pagina-web. New slug, tighten copy. |
| `/es/rediseno` | Promote from noindex, strengthen content. |
| `/es/generar-clientes` | Rewrite from cr/sitio-web-que-genere-clientes. New slug. |
| `/costa-rica/website-cost` | Rewrite, remove geo-keyword redundancy from content. |
| `/costa-rica/redesign` | Promote from noindex, strengthen content. |
| `/costa-rica/lead-generation` | Rewrite, remove geo-keyword redundancy from content. |

### Code Changes (Blocking)

| File | Change |
|------|--------|
| `app/(es)/cr/` | Rename directory to `app/(es)/es/`. Convert from single `[slug]` dynamic route to individual static route directories. |
| `app/(default)/blog/page.tsx` | Filter to EN-only posts. |
| `app/(default)/blog/[slug]/page.tsx` | Filter `generateStaticParams` to EN-only. Add `dynamicParams = false`. |
| `content/market-pages/es-cr.ts` | Update all `path` fields from `/cr/...` to `/es/...`. Remove killed pages. Update slugs. |
| `content/market-pages/en-cr.ts` | Update all `path` and `alternatePath` fields. Remove killed pages. Update slugs. |
| `lib/market-seo.ts` | Update all `/cr` references to `/es`. Fix breadcrumb JSON-LD paths. |
| `lib/pseo.ts` | Add locale-aware slug resolution for ES comparisons (strip `-es` suffix for URL). |
| `next-sitemap.config.js` | Remove library exclusions. Add language `alternateRefs`. Add new ES routes. |
| `next.config.ts` | Add 66 permanent redirects. |
| `components/sections/nav.tsx` | Add language toggle. Update `/cr` links to `/es`. Adapt links based on current path. |
| `components/sections/hero.tsx` | Update `/cr` links to `/es`. |
| `components/sections/costa-rica-lanes.tsx` | Update `/cr` links to `/es`. |
| `components/layout/site-root.tsx` | Add `LanguageContext` provider. |
| `app/not-found.tsx` | Make bilingual: English heading + Spanish subheading. Links to both `/` and `/es`. |
| `app/(default)/resources/page.tsx` | Update `/cr` links to `/es`. |

### Light Edits (Blocking)

- 6 vertical pages: update internal links from `/cr/` to `/es/`, remove noindex where applicable
- Homepage: update Costa Rica lanes links from `/cr` to `/es`
- Library pages: remove from sitemap exclude list, add contextual CTAs linking to `/costa-rica`

### Post-Launch Blog Posts (Not Blocking)

9 supporting blog posts across topical clusters (see Section 3).

---

## 7. Navigation Update

### Current

```
MAIN: About, Experience, Get a Quote
COSTA RICA SERVICES: Para negocios..., For foreign-owned...
LIBRARY: Blog, Library
```

### New

```
[EN | ES] toggle in top bar (next to theme toggle)

MAIN: About, Experience, Get a Quote
SERVICES: Costa Rica Services (-> /costa-rica or /es based on current path)
CONTENT: Blog (-> /blog or /es/blog), Library (-> /resources)
```

The toggle replaces the dual-lane section. Users pick language once via the toggle or via the homepage lanes (which remain for first-time visitors). Nav adapts based on current URL prefix.

---

## 8. Files With Hardcoded `/cr` References

These files contain `/cr` paths that must be updated to `/es`:

| File | Lines |
|------|-------|
| `components/sections/nav.tsx` | line 17 |
| `components/sections/hero.tsx` | lines 62, 163 |
| `components/sections/costa-rica-lanes.tsx` | line 9 |
| `lib/market-seo.ts` | lines 33, 35, 112, 114 |
| `app/(default)/blog/page.tsx` | line 131 |
| `app/(default)/resources/page.tsx` | lines 68, 155 |
| `content/market-pages/en-cr.ts` | line 144 (`alternatePath: "/cr"`) |
| `content/market-pages/es-cr.ts` | all `path` fields (~18 entries) |
