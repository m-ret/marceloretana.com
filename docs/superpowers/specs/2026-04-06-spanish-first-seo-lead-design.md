# Spanish-first SEO & lead design (Approach C)

**Date:** 2026-04-06  
**Status:** Approved (Sections 1–3)  
**Scope:** marceloretana.com — organic lead capture, dual ES/EN lanes with **Spanish-first** cadence  
**Process:** Brainstorming skill (design-first) + seo-audit skill (priorities, evidence rules)

---

## 1. Goal

- **Business:** Qualified leads for **websites, redesigns, lead-gen flows, and related builds** for businesses **in or tied to Costa Rica**.
- **Strategy choice:** **D — balanced mix, Spanish primary.** Operationalized as **Approach C — Spanish-first cadence**: ship and prove in **ES**, then **promote** to **EN** when earned.
- **Non-goals:** City-vs-city comparison pages as a default tactic; mass thin URL programs; fake hreflang pairs.

---

## 2. Information architecture & cadence (Section 1)

### 2.1 Primary spine (Spanish first)

- **`/es`** is the **main commercial hub** for local CR intent. New **depth** (copy, proof, FAQ, internal links) **defaults here first**.
- **Homepage** keeps dual lanes; **growth surface** for new verticals and experiments is **biased to the Spanish lane** without removing the English lane.

### 2.2 English spine (secondary, not frozen)

- **`/costa-rica`** and children remain **accurate, indexable**, and **hreflang-paired when pairs exist**.
- **New ideas default ES-only** until promotion. **No skeleton EN** pages for symmetry only.

### 2.3 Promotion ladder (ES → EN)

Promote to a **full EN sibling** when **any** of:

1. **Demand:** GSC shows meaningful **English** query class, or inbound asks in English for that vertical.  
2. **Conversion:** ES page drives **qualified** forms or booked calls.  
3. **Strategic:** Vertical is **known core** for English-speaking buyers (e.g. tourism + foreign operators) before data catches up.

### 2.4 Programmatic / template rule

- **One template** (`MarketLandingPage` + datasets) is **approved**.
- **Spanish-first** = **more unique content per ES row** (intro, objections, FAQ, proof), **not** keyword swap only.

### 2.5 Success criteria (90 days)

- ↑ **Qualified ES leads** (primary).  
- ↑ GSC **impressions/clicks** for **`/es`** and target ES queries.  
- **EN** stable or improving **without** requiring **full parity** on every new page.

---

## 3. Data model, sitemap, hreflang, workflows (Section 2)

### 3.1 Files

- **`frontend/content/market-pages/es-cr.ts`** — default for **new** money pages.  
- **`frontend/content/market-pages/en-cr.ts`** — grows by **promotion**, not by default.

### 3.2 Alternates

- **Paired pages:** Reciprocal **`alternateSlug`** / `getAlternateMarketEntry` + `buildMarketMetadata` **`alternates.languages`** and **`x-default`** as today.  
- **ES-only:** **No** EN alternate until EN exists — **no invented hreflang**.  
- **EN-only:** Rare under Approach C; same rule in reverse.

### 3.3 Validation

- **`bun run validate:market`:** If **`alternateSlug`** (or equivalent) is set, **peer must exist and reciprocate**. If omitted, **no** cross-locale requirement.  
- Types may need **`alternateSlug` optional** explicitly documented in `market-page-types` when implementing.

### 3.4 Sitemap

- **`frontend/next-sitemap.config.js`:** Include **only live, indexable** URLs; **no** placeholder EN.  
- ES market URLs remain **first-class**; tune priority/changefreq later if data supports it.

### 3.5 Internal linking (ES-first)

- **`/es` hub** surfaces **new ES verticals** in featured/related **before** EN hub lists the same set.  
- Blog/library: for **CR-commercial** intent, **prefer** links to **`/es/...`** when audience is local/bilingual; **EN** CTAs where the piece is English-first.

### 3.6 Operational workflow

1. Add **ES** `MarketPage` + route + sitemap if needed.  
2. **`bun run validate:market`** && **`bun run validate`**.  
3. Measure **2–4 weeks** (or shorter if clear wins).  
4. If promoted: add **EN** row, **bidirectional** alternate, sitemap parity, Rich Results spot-check.

---

## 4. Seo-audit cross-check (Section 2)

| Issue | Impact | Evidence | Fix (design) | Priority |
|-------|--------|----------|--------------|----------|
| ES-only while user expects EN pair from language toggle | Med — UX / bounce | Product: toggle with no equivalent | Toggle **falls back** to **`/costa-rica`** hub or safe default — **no** 404 | P1 |
| Weak internal links to new ES vertical | High — orphans | Common add-row failure | **Ship gate:** hub + **≥2** contextual internal links | P0 |
| Template-only swaps, thin ES verticals | High — thin / cannibal | pSEO risk | Unique blocks per row (intro, FAQ, proof) | P0 |
| JSON-LD / FAQ assumptions | Med — rich results | Fetch-only tools miss edge cases | **Rich Results Test** per **template variant** at ship | P1 |
| `canonical` / `noindex` drift | High — index bugs | Future edits | **`buildMarketMetadata`** single source; document `noindex` rules | P0 |

**Evidence rule (seo-audit):** Do **not** claim “schema OK” from **`curl` / `web_fetch` alone**; use **Rich Results Test** or **rendered HTML** / GSC.

---

## 5. Conversion, measurement, technical checks, rollout (Section 3)

### 5.1 Conversion

- **Form-first** on money pages; **`sourcePage`** per route (existing pattern).  
- New ES pages: **conversion block** requirement — clear path to **#lead-form** (or equivalent) and **vertical-specific** form intro where intent differs.  
- Verticals **link to** high-intent quote routes when user is ready (`/es/cotizacion`, `/costa-rica/quote`).

### 5.2 Measurement

- **Minimum:** Track **`sourcePage`** + locale in CRM/sheet weekly.  
- **Recommended:** GA4 **`generate_lead`** (or equivalent) with **`source_page`**, **`locale`**, optional **`vertical_slug`**.  
- **GSC:** Separate views or filters for **`/es/`** vs **`/costa-rica/`**.

### 5.3 Ship-time technical checks (seo-audit order)

- **P0:** Canonical, `robots` index, sitemap inclusion.  
- **P1:** Rich Results Test per **new template variant**.  
- **P1:** Lighthouse/PageSpeed spot-check on **ES hub + one vertical** after layout-heavy changes.

### 5.4 Rollout sequence

1. Ship ES → validate.  
2. Observe GSC + leads.  
3. Promote EN → hreflang + sitemap + spot-check.  
4. Update both hubs’ internal links.

### 5.5 Section 3 risks

| Issue | Impact | Mitigation |
|-------|--------|------------|
| No event-level conversions | High | GA4 + weekly `sourcePage` review |
| No thank-you URL | Med | Optional thank-you route in implementation plan |
| CWV regression | Med | Lighthouse on representative pages per release |

---

## 6. Implementation notes (for writing-plans phase)

- **Do not implement** from this doc alone; produce **`docs/superpowers/plans/…`** via **writing-plans** skill, then code.  
- Likely touch: `es-cr.ts`, `en-cr.ts`, `market-page-types.ts`, `validate.ts`, `market-pages.ts`, `LanguageToggle` behavior, `next-sitemap.config.js`, optional GA4, docs in **AGENTS.md** for agent workflows.

---

## 7. Approval log

| Section | Status |
|---------|--------|
| §1 IA & cadence | Approved |
| §2 Data / sitemap / hreflang + audit table | Approved |
| §3 Conversion / measurement / rollout | Approved |
