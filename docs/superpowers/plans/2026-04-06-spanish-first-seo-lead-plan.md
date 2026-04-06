# Spanish-first SEO & lead capture — implementation plan

> **For agentic workers:** Execute tasks **in order**. Steps use checkbox (`- [ ]`) syntax. After code changes, run from `frontend/`: `bun run validate:market` and `bun run validate`.

**Goal:** Encode **Approach C** (Spanish-first cadence, promote to EN when earned) in **validation, UX, measurement, and docs** — without breaking existing hreflang pairs or the language toggle on paired routes.

**Spec:** [`docs/superpowers/specs/2026-04-06-spanish-first-seo-lead-design.md`](../specs/2026-04-06-spanish-first-seo-lead-design.md)

**Tech stack:** Next.js App Router, TypeScript, `frontend/content/market-pages/*.ts`, `frontend/scripts/market-pages/validate.ts`, `frontend/lib/language-pairs.ts`, `frontend/components/language-toggle.tsx`, optional `@next/third-parties/google` for GA4 events.

---

## Task 1: Reciprocal `alternatePath` validation

**Files:**

- Modify: `frontend/scripts/market-pages/validate.ts`
- Reference: `frontend/lib/market-pages.ts` (`getAllMarketEntries` or equivalent inline)

**Steps:**

- [ ] After existing Zod + `relatedSlugs` checks, build a list of **all** market entries (both hubs + all pages from `es-cr` and `en-cr`).
- [ ] For each entry with **`alternatePath`** set: find an entry whose **`path`** equals that `alternatePath`.
- [ ] Assert the peer exists; assert peer’s **`alternatePath`** equals **this** entry’s **`path`** (strict reciprocity).
- [ ] If `alternatePath` is **omitted**, require **no** reciprocal check (ES-only / EN-only allowed by design).
- [ ] Run `bun run validate:market` — must pass on current datasets before merging.

---

## Task 2: Language toggle fallback (unpaired commercial paths)

**Files:**

- Modify: `frontend/lib/language-pairs.ts` (or new `frontend/lib/language-fallback.ts` if cleaner)
- Modify: `frontend/components/language-toggle.tsx`

**Problem:** Today `getAlternatePath` returns `null` for paths not in `staticPairs` → toggle **hidden**. Spec (P1): when there is **no 1:1 translation**, still offer a **safe** switch to the opposite **services hub** (`/es` ↔ `/costa-rica`), not a 404 and not silence.

**Steps:**

- [ ] Add helper e.g. `getLanguageHubFallback(currentPath: string): string | null`:
  - If `getAlternatePath(currentPath)` is non-null → return **null** (toggle uses exact pair as today).
  - Else if path is under **excluded** routes (no hub fallback) → return **null**. **Exclude at minimum:** `/es/blog`, `/es/blog/*`, `/es/compare`, `/es/compare/*`, `/blog/*`, `/compare/*`, `/learn/*`, `/checklist/*`, `/resources/*` (library stays English-first; blog posts may not have ES twins).
  - Else if path is `/es` or starts with `/es/` → return **`/costa-rica`**.
  - Else if path is `/costa-rica` or starts with `/costa-rica/` → return **`/es`**.
  - Else → return **null**.
- [ ] Update `LanguageToggle`: if `getAlternatePath` is null but `getLanguageHubFallback` is non-null, render link to fallback with **`title`** / **`aria-label`** that clarifies **“English services hub”** / **“Spanish services hub”** (not “translated page”) to avoid deceptive UX.
- [ ] Manually verify: paired routes (`/es/turismo` ↔ `/costa-rica/tourism`) still use **exact** `staticPairs`, not hub fallback.

---

## Task 3: Document Spanish-first workflow for humans & agents

**Files:**

- Modify: `AGENTS.md`
- Optional: one paragraph in `README.md` under AI-assisted development (only if it stays short)

**Steps:**

- [ ] Add subsection **Spanish-first market pages**: default new money pages to **`es-cr.ts`**; promote to **`en-cr.ts`** per spec promotion ladder; never add fake `alternatePath`.
- [ ] Document **ship gate** from spec: new ES vertical should have **hub + ≥2 contextual internal links** (featuredLinks / relatedSlugs / narrative links — whichever applies).
- [ ] Document **post-ship checks**: Rich Results Test on new template variants; GSC filters `/es/` vs `/costa-rica/`; optional Lighthouse on ES hub + one vertical after large layout changes.
- [ ] Mention **`bun run validate:market`** reciprocal `alternatePath` rule after Task 1 ships.

---

## Task 4: GA4 `generate_lead` on successful contact submit

**Files:**

- Modify: `frontend/components/sections/contact-form.tsx`
- Reference: `@next/third-parties/google` (`sendGAEvent` if available in installed version)

**Steps:**

- [ ] On successful `POST /api/contact`, if `process.env.NEXT_PUBLIC_GA4_ID` is set, fire **`sendGAEvent`** (or documented equivalent) with event name **`generate_lead`** and params: `source_page`, `locale` (and optional `page_path` if redundant).
- [ ] Keep event **no-op** when GA4 ID absent (local dev).
- [ ] Do not block UX on analytics failure (try/catch or `.catch`).

---

## Task 5 (optional): Thank-you state for attribution

**Files:**

- Modify: `contact-form.tsx` and/or small route under `app/(default)` and `app/(es)/es/`

**Steps:**

- [ ] Either: navigate to **`/contact?submitted=1`** / **`/es/cotizacion?submitted=1`** on success, **or** add thin **`/thank-you`** / **`/es/gracias`** pages linked from success message.
- [ ] If using query param, ensure **`canonical`** / indexing policy unchanged (still index parent page; param can be ignored in GSC).

---

## Task 6: Content / IA pass (manual or data-driven)

**Files:**

- Modify: `frontend/content/market-pages/es-cr.ts`, optionally `en-cr.ts`

**Steps:**

- [ ] Audit **`esCrHub.featuredLinks`** order: **highest commercial intent / newest** ES verticals surfaced first (Spanish-first positioning).
- [ ] For **one** underperforming ES vertical, deepen **unique** `intro`, `faq`, `proof` (not template swap only) as a template for future pages.
- [ ] When promoting to EN per ladder, add **`en-cr`** row + **`alternatePath`** reciprocity + add **`staticPairs`** entry in `language-pairs.ts` if the new slug must appear in the toggle (hub fallback covers until then — confirm product choice).

---

## Task 7: Final verification (before closing milestone)

**Steps:**

- [ ] `bun run validate:market` && `bun run validate`
- [ ] Rich Results Test: **`/es`**, **`/costa-rica`**, one vertical each language
- [ ] Click test: language toggle on paired route + on a path that uses **hub fallback** (if Task 2 exposes one)
- [ ] Submit test form in staging/prod with GA4 debug (if Task 4 shipped)

---

## References

- SEO audit evidence: use **Rich Results Test** / GSC — not `curl` alone for JSON-LD.
- Programmatic discipline: unique value per URL; see spec §2.4.
