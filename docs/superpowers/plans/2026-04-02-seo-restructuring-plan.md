# SEO Restructuring & Bilingual Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure marceloretana.com from inconsistent /cr + /costa-rica URL scheme to clean bilingual architecture (English at root, Spanish under /es/) with language toggle, consolidated service pages, and indexed library content.

**Architecture:** Keep `(default)` route group for English, rename `(es)/cr/` to `(es)/es/` for Spanish. All Spanish service pages become explicit static routes (no dynamic [slug]). Add LanguageContext for toggle data flow. 66 permanent redirects in next.config.ts.

**Tech Stack:** Next.js 16.1.6 (App Router), TypeScript, Tailwind CSS 4, Zod, next-sitemap, Vercel

**Spec:** `docs/superpowers/specs/2026-04-02-seo-restructuring-design.md`

---

## Task 1: Language Pair Map & Context

**Files:**
- Create: `frontend/lib/language-pairs.ts`
- Create: `frontend/lib/language-context.tsx`

This is the foundation. Everything else depends on it.

- [ ] **Step 1: Create `lib/language-pairs.ts`**

```typescript
// frontend/lib/language-pairs.ts

const staticPairs: Record<string, string> = {
  "/costa-rica": "/es",
  "/es": "/costa-rica",
  "/costa-rica/website-cost": "/es/cuanto-cuesta",
  "/es/cuanto-cuesta": "/costa-rica/website-cost",
  "/costa-rica/redesign": "/es/rediseno",
  "/es/rediseno": "/costa-rica/redesign",
  "/costa-rica/lead-generation": "/es/generar-clientes",
  "/es/generar-clientes": "/costa-rica/lead-generation",
  "/costa-rica/real-estate": "/es/constructoras",
  "/es/constructoras": "/costa-rica/real-estate",
  "/costa-rica/healthcare": "/es/clinicas",
  "/es/clinicas": "/costa-rica/healthcare",
  "/costa-rica/tourism": "/es/turismo",
  "/es/turismo": "/costa-rica/tourism",
  "/costa-rica/quote": "/es/cotizacion",
  "/es/cotizacion": "/costa-rica/quote",
  "/contact": "/es/contacto",
  "/es/contacto": "/contact",
  "/blog": "/es/blog",
  "/es/blog": "/blog",
};

export function getAlternatePath(currentPath: string): string | null {
  return staticPairs[currentPath] ?? null;
}

export function isSpanishPath(path: string): boolean {
  return path === "/es" || path.startsWith("/es/");
}

export function getCurrentLocale(path: string): "en" | "es" {
  return isSpanishPath(path) ? "es" : "en";
}
```

- [ ] **Step 2: Create `lib/language-context.tsx`**

```tsx
// frontend/lib/language-context.tsx
"use client";

import { createContext, useContext } from "react";

type LanguageContextValue = {
  locale: "en" | "es";
  alternatePath: string | null;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  alternatePath: null,
});

export function LanguageProvider({
  locale,
  alternatePath,
  children,
}: LanguageContextValue & { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ locale, alternatePath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
```

- [ ] **Step 3: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`
Expected: Build succeeds (new files are unused so far)

- [ ] **Step 4: Commit**

```bash
git add frontend/lib/language-pairs.ts frontend/lib/language-context.tsx
git commit -m "feat(i18n): add language pair map and context provider"
```

---

## Task 2: Wire LanguageContext Into Layouts

**Files:**
- Modify: `frontend/components/layout/site-root.tsx`
- Modify: `frontend/app/(default)/layout.tsx`
- Modify: `frontend/app/(es)/layout.tsx`

- [ ] **Step 1: Update `site-root.tsx` to accept `alternatePath` and wrap children with LanguageProvider**

In `frontend/components/layout/site-root.tsx`, add `alternatePath` to the props and wrap the body content:

```typescript
// Add import at top:
import { LanguageProvider } from "@/lib/language-context";

// Update SiteRootProps:
type SiteRootProps = {
  children: React.ReactNode;
  lang: "en" | "es";
  alternatePath?: string | null;
};

// Update function signature and wrap body content:
export function SiteRoot({ children, lang, alternatePath = null }: SiteRootProps) {
  // ... existing code ...
  // Inside <body>, wrap QueryProvider contents:
  <LanguageProvider locale={lang} alternatePath={alternatePath}>
    <QueryProvider>
      <ThemeProvider>
        <Nav />
        {children}
      </ThemeProvider>
    </QueryProvider>
  </LanguageProvider>
}
```

Note: LanguageProvider wraps QueryProvider so the toggle (inside Nav) can read context.

- [ ] **Step 2: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`
Expected: Build succeeds. Layouts pass `lang` but not `alternatePath` yet -- default is `null`.

- [ ] **Step 3: Commit**

```bash
git add frontend/components/layout/site-root.tsx
git commit -m "feat(i18n): wire LanguageContext into SiteRoot layout"
```

---

## Task 3: Language Toggle Component

**Files:**
- Create: `frontend/components/language-toggle.tsx`
- Modify: `frontend/components/sections/nav.tsx`

- [ ] **Step 1: Create the toggle component**

```tsx
// frontend/components/language-toggle.tsx
"use client";

import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { locale, alternatePath } = useLanguage();

  if (!alternatePath) return null;

  const isEs = locale === "es";

  return (
    <a
      href={alternatePath}
      className="flex items-center gap-1 text-xs font-medium tracking-wide text-fg-muted hover:text-fg transition-colors"
      title={isEs ? "Switch to English" : "Cambiar a Español"}
    >
      <span className={isEs ? "text-fg-muted" : "text-fg"}>EN</span>
      <span className="text-fg-muted">/</span>
      <span className={isEs ? "text-fg" : "text-fg-muted"}>ES</span>
    </a>
  );
}
```

- [ ] **Step 2: Add toggle to nav header bar**

In `frontend/components/sections/nav.tsx`, import and add the toggle next to the theme toggle in the header:

```typescript
// Add import:
import { LanguageToggle } from "@/components/language-toggle";

// In the header bar (the fixed top bar), add <LanguageToggle /> next to <ThemeToggle />
// Find the div containing the logo and buttons, add LanguageToggle before ThemeToggle
```

- [ ] **Step 3: Update nav links -- replace `/cr` with `/es`**

In `frontend/components/sections/nav.tsx`, update `marketLinks` array:
- Change `href: "/cr"` to `href: "/es"` (line ~17)
- Update description text if it references `/cr`

- [ ] **Step 4: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`

- [ ] **Step 5: Commit**

```bash
git add frontend/components/language-toggle.tsx frontend/components/sections/nav.tsx
git commit -m "feat(i18n): add language toggle to navigation"
```

---

## Task 4: Redirects in next.config.ts

**Files:**
- Modify: `frontend/next.config.ts`

All 66 permanent redirects. This is the safety net -- old URLs stop 404ing immediately.

- [ ] **Step 1: Add redirects array to next.config.ts**

Add a `redirects()` function to the Next.js config. The full list:

```typescript
// In next.config.ts, add to the config object:
async redirects() {
  return [
    // === Spanish market pages -> /es/ ===
    { source: "/cr", destination: "/es", permanent: true },
    { source: "/cr/paginas-web-costa-rica", destination: "/es", permanent: true },
    { source: "/cr/diseno-web-costa-rica", destination: "/es", permanent: true },
    { source: "/cr/desarrollo-web-costa-rica", destination: "/es", permanent: true },
    { source: "/cr/seo-costa-rica", destination: "/es", permanent: true },
    { source: "/cr/cuanto-cuesta-pagina-web", destination: "/es/cuanto-cuesta", permanent: true },
    { source: "/cr/por-que-necesita-sitio-web", destination: "/es/blog/por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web", permanent: true },
    { source: "/cr/sitio-web-que-genere-clientes", destination: "/es/generar-clientes", permanent: true },
    { source: "/cr/cotizacion", destination: "/es/cotizacion", permanent: true },
    { source: "/cr/constructoras", destination: "/es/constructoras", permanent: true },
    { source: "/cr/clinicas", destination: "/es/clinicas", permanent: true },
    { source: "/cr/turismo", destination: "/es/turismo", permanent: true },
    { source: "/cr/rediseno-sitio-web", destination: "/es/rediseno", permanent: true },
    { source: "/cr/servicios", destination: "/es", permanent: true },
    { source: "/cr/negocios-servicios", destination: "/es", permanent: true },
    { source: "/cr/consultorios", destination: "/es/clinicas", permanent: true },
    { source: "/cr/portafolio", destination: "/es", permanent: true },
    { source: "/cr/casos", destination: "/es", permanent: true },
    { source: "/cr/proceso", destination: "/es", permanent: true },

    // === English market pages -> consolidated ===
    { source: "/costa-rica/web-development", destination: "/costa-rica", permanent: true },
    { source: "/costa-rica/web-design", destination: "/costa-rica", permanent: true },
    { source: "/costa-rica/web-development-agency", destination: "/costa-rica", permanent: true },
    { source: "/costa-rica/nearshore-web-development", destination: "/costa-rica", permanent: true },
    { source: "/costa-rica/expat-business-web-development", destination: "/costa-rica", permanent: true },
    { source: "/costa-rica/website-cost-costa-rica", destination: "/costa-rica/website-cost", permanent: true },
    { source: "/costa-rica/website-redesign-costa-rica", destination: "/costa-rica/redesign", permanent: true },
    { source: "/costa-rica/lead-generation-websites-costa-rica", destination: "/costa-rica/lead-generation", permanent: true },
    { source: "/costa-rica/request-a-quote", destination: "/costa-rica/quote", permanent: true },
    { source: "/costa-rica/software-development", destination: "/costa-rica", permanent: true },
    { source: "/costa-rica/why-costa-rica", destination: "/costa-rica", permanent: true },
    { source: "/costa-rica/service-business-web-development", destination: "/costa-rica", permanent: true },
    { source: "/costa-rica/real-estate-web-development", destination: "/costa-rica/real-estate", permanent: true },
    { source: "/costa-rica/healthcare-web-development", destination: "/costa-rica/healthcare", permanent: true },
    { source: "/costa-rica/tourism-web-development", destination: "/costa-rica/tourism", permanent: true },

    // === Spanish blog posts -> /es/blog/ ===
    { source: "/blog/5-errores-que-matan-tu-atencion-al-cliente-en-whatsapp", destination: "/es/blog/5-errores-que-matan-tu-atencion-al-cliente-en-whatsapp", permanent: true },
    { source: "/blog/anthropic-midio-millones-de-agentes-ia-lo-que-los-desarrolladores-deben-saber", destination: "/es/blog/anthropic-midio-millones-de-agentes-ia-lo-que-los-desarrolladores-deben-saber", permanent: true },
    { source: "/blog/codex-vs-claude-code-deja-de-cambiar-empieza-a-dominar", destination: "/es/blog/codex-vs-claude-code-deja-de-cambiar-empieza-a-dominar", permanent: true },
    { source: "/blog/como-construimos-sitios-web-que-funcionan-para-pequenas-empresas", destination: "/es/blog/como-construimos-sitios-web-que-funcionan-para-pequenas-empresas", permanent: true },
    { source: "/blog/como-manejar-cientos-de-mensajes-de-whatsapp-sin-volverse-loco", destination: "/es/blog/como-manejar-cientos-de-mensajes-de-whatsapp-sin-volverse-loco", permanent: true },
    { source: "/blog/como-multiplique-mi-productividad-con-claude-code", destination: "/es/blog/como-multiplique-mi-productividad-con-claude-code", permanent: true },
    { source: "/blog/como-reducir-tiempos-de-respuesta-en-whatsapp", destination: "/es/blog/como-reducir-tiempos-de-respuesta-en-whatsapp", permanent: true },
    { source: "/blog/construi-goeasychat-plataforma-whatsapp-multiagente", destination: "/es/blog/construi-goeasychat-plataforma-whatsapp-multiagente", permanent: true },
    { source: "/blog/desde-costa-rica-presencia-digital-para-emprendedores-reales", destination: "/es/blog/desde-costa-rica-presencia-digital-para-emprendedores-reales", permanent: true },
    { source: "/blog/el-costo-real-de-ignorar-mensajes-de-whatsapp", destination: "/es/blog/el-costo-real-de-ignorar-mensajes-de-whatsapp", permanent: true },
    { source: "/blog/limites-de-sesion-de-anthropic-estan-cambiando-como-programan-los-power-users", destination: "/es/blog/limites-de-sesion-de-anthropic-estan-cambiando-como-programan-los-power-users", permanent: true },
    { source: "/blog/mcp-se-esta-convirtiendo-en-la-capa-de-integracion-por-defecto-para-productos-ia", destination: "/es/blog/mcp-se-esta-convirtiendo-en-la-capa-de-integracion-por-defecto-para-productos-ia", permanent: true },
    { source: "/blog/por-que-claude-code-se-come-toda-tu-ram", destination: "/es/blog/por-que-claude-code-se-come-toda-tu-ram", permanent: true },
    { source: "/blog/por-que-construyo-mvps-rapido", destination: "/es/blog/por-que-construyo-mvps-rapido", permanent: true },
    { source: "/blog/por-que-los-flujos-hibridos-de-coding-con-ia-ganan-tras-los-limites", destination: "/es/blog/por-que-los-flujos-hibridos-de-coding-con-ia-ganan-tras-los-limites", permanent: true },
    { source: "/blog/por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web", destination: "/es/blog/por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web", permanent: true },
    { source: "/blog/por-que-soporte-whatsapp-first-supera-omnicanal-para-pymes-latam", destination: "/es/blog/por-que-soporte-whatsapp-first-supera-omnicanal-para-pymes-latam", permanent: true },
    { source: "/blog/por-que-tu-sitio-web-no-genera-clientes", destination: "/es/blog/por-que-tu-sitio-web-no-genera-clientes", permanent: true },
    { source: "/blog/por-que-whatsapp-es-el-canal-de-soporte-numero-uno", destination: "/es/blog/por-que-whatsapp-es-el-canal-de-soporte-numero-uno", permanent: true },
    { source: "/blog/que-es-llms-txt-y-como-agregarlo-a-tu-sitio-web", destination: "/es/blog/que-es-llms-txt-y-como-agregarlo-a-tu-sitio-web", permanent: true },
    { source: "/blog/soporte-con-ia-en-whatsapp-se-esta-volviendo-estandar-para-equipos-pequenos", destination: "/es/blog/soporte-con-ia-en-whatsapp-se-esta-volviendo-estandar-para-equipos-pequenos", permanent: true },
    { source: "/blog/whatsapp-business-vs-whatsapp-multiagente", destination: "/es/blog/whatsapp-business-vs-whatsapp-multiagente", permanent: true },

    // === Spanish comparisons -> /es/compare/ (regex: strip -es suffix) ===
    { source: "/compare/:slug(.*)-es", destination: "/es/compare/:slug", permanent: true },
  ];
},
```

- [ ] **Step 2: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`

- [ ] **Step 3: Commit**

```bash
git add frontend/next.config.ts
git commit -m "feat(seo): add 66 permanent redirects for URL migration"
```

---

## Task 5: Rename Spanish Route Group (cr -> es)

**Files:**
- Rename: `frontend/app/(es)/cr/` -> `frontend/app/(es)/es/`
- Delete: `frontend/app/(es)/es/[slug]/` (will be replaced by static routes)
- Keep: `frontend/app/(es)/es/page.tsx` (hub page, will be rewritten in Task 9)

This is the physical folder rename. The hub page stays but the dynamic [slug] route is removed -- we'll create individual static routes in Task 6.

- [ ] **Step 1: Rename the directory**

```bash
cd frontend && mv app/\(es\)/cr app/\(es\)/es
```

- [ ] **Step 2: Delete the dynamic [slug] route**

```bash
rm -rf frontend/app/\(es\)/es/\[slug\]
```

- [ ] **Step 3: Verify the `(es)/es/page.tsx` still imports correctly**

The hub page imports from `@/content/market-pages/es-cr` and `@/lib/market-pages`. These imports are path-aliased and don't change. Verify:

Run: `cd frontend && npm run build 2>&1 | tail -20`
Expected: Build should fail because the old [slug] routes no longer exist but `generateStaticParams` in the old location references them. This is expected -- we fix it in the next tasks.

- [ ] **Step 4: Commit the rename**

```bash
git add -A
git commit -m "refactor(routes): rename (es)/cr to (es)/es for /es/ URL prefix"
```

---

## Task 6: Create Spanish Static Service Routes

**Files:**
- Create: `frontend/app/(es)/es/cuanto-cuesta/page.tsx`
- Create: `frontend/app/(es)/es/rediseno/page.tsx`
- Create: `frontend/app/(es)/es/generar-clientes/page.tsx`
- Create: `frontend/app/(es)/es/constructoras/page.tsx`
- Create: `frontend/app/(es)/es/clinicas/page.tsx`
- Create: `frontend/app/(es)/es/turismo/page.tsx`
- Create: `frontend/app/(es)/es/cotizacion/page.tsx`
- Create: `frontend/app/(es)/es/contacto/page.tsx`

Each is a static route that loads its content from the market pages data.

- [ ] **Step 1: Create a shared service page component to avoid repetition**

```tsx
// frontend/app/(es)/es/_components/es-service-page.tsx
import type { Metadata } from "next";
import { MarketLandingPage } from "@/components/market-pages/market-landing-page";
import { getRelatedMarketPages } from "@/lib/market-pages";
import { buildMarketJsonLd, buildMarketMetadata } from "@/lib/market-seo";
import type { MarketPage } from "@/lib/market-page-types";

export function generateEsMetadata(page: MarketPage): Metadata {
  return buildMarketMetadata(page);
}

export function EsServicePage({ page }: { page: MarketPage }) {
  const relatedPages = getRelatedMarketPages("es-cr", page.slug);
  const jsonLd = buildMarketJsonLd(page);

  return (
    <>
      {jsonLd.map((item) => (
        <script
          key={`es-page-jsonld-${page.slug}-${String(item["@type"])}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <MarketLandingPage entry={page} relatedPages={relatedPages} />
    </>
  );
}
```

- [ ] **Step 2: Create each static route page**

Each page follows the same pattern. Example for `cuanto-cuesta`:

```tsx
// frontend/app/(es)/es/cuanto-cuesta/page.tsx
import type { Metadata } from "next";
import { getMarketPage } from "@/lib/market-pages";
import { EsServicePage, generateEsMetadata } from "../_components/es-service-page";

const page = getMarketPage("es-cr", "cuanto-cuesta")!;

export function generateMetadata(): Metadata {
  return generateEsMetadata(page);
}

export default function CuantoCuestaPage() {
  return <EsServicePage page={page} />;
}
```

Create the same pattern for: `rediseno`, `generar-clientes`, `constructoras`, `clinicas`, `turismo`.

For `cotizacion/page.tsx` and `contacto/page.tsx`: these are form pages, not market pages. Create minimal pages that import `ContactForm` with `locale="cr"`.

```tsx
// frontend/app/(es)/es/cotizacion/page.tsx
import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Solicitar Cotización | Marcelo Retana",
  description: "Solicite una cotización para su proyecto web en Costa Rica.",
  alternates: { canonical: "/es/cotizacion" },
};

export default function CotizacionPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <ContactForm locale="cr" sourcePage="/es/cotizacion" />
    </main>
  );
}
```

```tsx
// frontend/app/(es)/es/contacto/page.tsx
import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contacto | Marcelo Retana",
  description: "Contacte a Marcelo Retana para servicios de desarrollo web en Costa Rica.",
  alternates: { canonical: "/es/contacto" },
};

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <ContactForm locale="cr" sourcePage="/es/contacto" />
    </main>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`
Note: This may still fail because `es-cr.ts` data file has old slugs/paths. That's fixed in Task 7.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/\(es\)/es/
git commit -m "feat(routes): create static Spanish service routes under /es/"
```

---

## Task 7: Update Market Pages Data Files

**Files:**
- Modify: `frontend/content/market-pages/es-cr.ts` (all `path` fields, remove killed pages, update slugs)
- Modify: `frontend/content/market-pages/en-cr.ts` (all `path` and `alternatePath` fields, remove killed pages, update slugs)

This is the largest data change. Every `path:` field that says `/cr/` must say `/es/`. Every `alternatePath:` that says `/cr` must say `/es`. Killed pages are removed entirely.

- [ ] **Step 1: Update `es-cr.ts`**

Changes needed:
1. Hub `path`: `/cr` -> `/es`
2. Hub `alternatePath`: `/costa-rica` -> `/costa-rica` (unchanged)
3. Hub `featuredLinks` slugs: update to new slugs
4. All page `path` fields: `/cr/[slug]` -> `/es/[new-slug]`
5. Update slugs: `paginas-web-costa-rica` -> remove (absorbed), `cuanto-cuesta-pagina-web` -> `cuanto-cuesta`, etc.
6. Remove pages: paginas-web-costa-rica, diseno-web-costa-rica, desarrollo-web-costa-rica, seo-costa-rica, servicios, negocios-servicios, consultorios, portafolio, casos, proceso, por-que-necesita-sitio-web

Surviving pages with new slugs:
- `cuanto-cuesta-pagina-web` -> slug: `cuanto-cuesta`, path: `/es/cuanto-cuesta`
- `sitio-web-que-genere-clientes` -> slug: `generar-clientes`, path: `/es/generar-clientes`
- `rediseno-sitio-web` -> slug: `rediseno`, path: `/es/rediseno`
- `constructoras` -> slug: `constructoras`, path: `/es/constructoras`
- `clinicas` -> slug: `clinicas`, path: `/es/clinicas`
- `turismo` -> slug: `turismo`, path: `/es/turismo`
- `cotizacion` -> slug: `cotizacion`, path: `/es/cotizacion`

All `relatedSlugs` arrays must be updated to reference new slugs only (remove references to deleted pages).

**IMPORTANT:** The `createPage` helper function (line ~61 of `es-cr.ts`) hardcodes `path: \`/cr/${page.slug}\``. Change this to `path: \`/es/${page.slug}\``. Similarly update the hub path from `"/cr"` to `"/es"`.

- [ ] **Step 2: Update `en-cr.ts`**

Changes needed:
1. Hub `alternatePath`: `/cr` -> `/es`
2. All page `alternatePath` fields: `/cr/[slug]` -> `/es/[new-slug]`
3. Update slugs: `website-cost-costa-rica` -> `website-cost`, etc.
4. All page `path` fields: update slug in path
5. Remove pages: web-development, web-design, web-development-agency, nearshore-web-development, expat-business-web-development, software-development, why-costa-rica, service-business-web-development, request-a-quote

Surviving pages with new slugs:
- `website-cost-costa-rica` -> slug: `website-cost`, path: `/costa-rica/website-cost`
- `website-redesign-costa-rica` -> slug: `redesign`, path: `/costa-rica/redesign`
- `lead-generation-websites-costa-rica` -> slug: `lead-generation`, path: `/costa-rica/lead-generation`
- `real-estate-web-development` -> slug: `real-estate`, path: `/costa-rica/real-estate`
- `healthcare-web-development` -> slug: `healthcare`, path: `/costa-rica/healthcare`
- `tourism-web-development` -> slug: `tourism`, path: `/costa-rica/tourism`
- `request-a-quote` -> slug: `quote`, path: `/costa-rica/quote` (KEEP -- do NOT delete, this is a live route)

Remove `noindex: true` from real-estate, healthcare, tourism.

Also update `enCrHub.featuredLinks` to reference only surviving slugs with their new names. Remove references to deleted pages (web-development, web-design, web-development-agency, etc.).

- [ ] **Step 3: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`

- [ ] **Step 4: Commit**

```bash
git add frontend/content/market-pages/
git commit -m "refactor(content): update market page paths, slugs, and remove consolidated pages"
```

---

## Task 8: Update market-seo.ts and market-pages.ts

**Files:**
- Modify: `frontend/lib/market-seo.ts` (update `/cr` references to `/es`)
- Modify: `frontend/lib/market-pages.ts` (no structural changes needed, just verify)

- [ ] **Step 1: Update `market-seo.ts`**

In `buildMarketMetadata()` (line 34-36): change `entry.path === "/cr"` to `entry.path === "/es"`.

In `buildMarketJsonLd()` (line 112-114): change the breadcrumb `"/cr"` to `"/es"` and update the breadcrumb name.

Specifically:
```typescript
// Line 34: was  entry.path === "/cr" || entry.path === "/costa-rica"
// Now:         entry.path === "/es" || entry.path === "/costa-rica"

// Line 112: was  entry.locale === "es" ? "/cr" : "/costa-rica"
// Now:           entry.locale === "es" ? "/es" : "/costa-rica"

// Line 114: same pattern for the hub path check
// was:  entry.path === "/cr" || entry.path === "/costa-rica"
// Now:  entry.path === "/es" || entry.path === "/costa-rica"
```

Also update the x-default logic to match the spec: homepage `/` gets `x-default` pointing to itself, only `/costa-rica` <-> `/es` gets the hreflang pair.

- [ ] **Step 2: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`

- [ ] **Step 3: Commit**

```bash
git add frontend/lib/market-seo.ts
git commit -m "fix(seo): update /cr references to /es in market SEO utilities"
```

---

## Task 9: Update Hardcoded /cr References

**Files:**
- Modify: `frontend/components/sections/hero.tsx` (lines 62, 163)
- Modify: `frontend/components/sections/costa-rica-lanes.tsx` (line 9)
- Modify: `frontend/app/(default)/blog/page.tsx` (line 131)
- Modify: `frontend/app/(default)/resources/page.tsx` (lines 68, 155)

- [ ] **Step 1: Update each file -- replace `/cr` hrefs with `/es`**

Use find-and-replace in each file. These are all simple href changes:
- `href="/cr"` -> `href="/es"`
- `"/cr"` -> `"/es"` (where it's a link target)

Check context for each -- some may be in descriptive text (keep as-is) vs link targets (change).

- [ ] **Step 2: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`

- [ ] **Step 3: Commit**

```bash
git add frontend/components/sections/hero.tsx frontend/components/sections/costa-rica-lanes.tsx frontend/app/\(default\)/blog/page.tsx frontend/app/\(default\)/resources/page.tsx
git commit -m "fix(links): update all /cr references to /es across components"
```

---

## Task 10: Spanish Blog Routes

**Files:**
- Create: `frontend/app/(es)/es/blog/page.tsx`
- Create: `frontend/app/(es)/es/blog/[slug]/page.tsx`
- Modify: `frontend/app/(default)/blog/page.tsx` (filter to EN-only)
- Modify: `frontend/app/(default)/blog/[slug]/page.tsx` (filter generateStaticParams to EN-only, add dynamicParams=false)

- [ ] **Step 1: Create ES blog index page**

```tsx
// frontend/app/(es)/es/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByLang } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos sobre desarrollo web, presencia digital, WhatsApp y ejecución para negocios en Costa Rica.",
  alternates: { canonical: "/es/blog" },
};

export default function EsBlogPage() {
  const posts = getPostsByLang("es");

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/es/blog/${post.slug}`} className="group block">
              <h2 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-fg-muted mt-1">{post.excerpt}</p>
              <time className="text-sm text-fg-muted">
                {new Date(post.publishedAt).toLocaleDateString("es-CR")}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

- [ ] **Step 2: Create ES blog post page**

Clone the structure from `(default)/blog/[slug]/page.tsx` but:
- Filter `generateStaticParams` to ES-only: `getPostsByLang("es").map(p => ({ slug: p.slug }))`
- Add `export const dynamicParams = false;`
- Update breadcrumb to `/es/blog`
- Update back link to `/es/blog`
- Keep locale-aware UI strings (the existing page already handles "es" locale)

- [ ] **Step 3: Update EN blog index to filter EN-only**

In `frontend/app/(default)/blog/page.tsx`:
- Change `getAllPosts()` calls to `getPostsByLang("en")` for commercial and technical sections
- Or filter the existing `allPosts` by `lang === "en"`

- [ ] **Step 4: Update EN blog [slug] page**

In `frontend/app/(default)/blog/[slug]/page.tsx`:
- Change `generateStaticParams`: `getAllPostSlugs()` -> `getPostsByLang("en").map(p => ({ slug: p.slug }))`
- Add `export const dynamicParams = false;`

- [ ] **Step 5: Fix hreflang URLs in EN blog [slug] page**

In `frontend/app/(default)/blog/[slug]/page.tsx`, update the alternate URL construction (around line 37-41).
The current code builds: `https://marceloretana.com/blog/${post.alternate}`
After migration, ES posts live at `/es/blog/[slug]`. Update to:
```typescript
// When altLang is "es", the URL should be:
`https://marceloretana.com/es/blog/${post.alternate}`
// When altLang is "en", keep as:
`https://marceloretana.com/blog/${post.alternate}`
```

Apply the same fix in the new ES blog `[slug]/page.tsx` -- EN alternates should point to `/blog/${post.alternate}` (not `/es/blog/`).

- [ ] **Step 6: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`

- [ ] **Step 7: Commit**

```bash
git add frontend/app/\(es\)/es/blog/ frontend/app/\(default\)/blog/
git commit -m "feat(blog): split blog into EN and ES routes with language filtering"
```

---

## Task 11: Spanish Comparison Routes

**Files:**
- Create: `frontend/app/(es)/es/compare/[slug]/page.tsx`
- Modify: `frontend/lib/pseo.ts` (locale-aware slug resolution)

- [ ] **Step 1: Update `lib/pseo.ts` to support locale-aware lookup**

Add a function to resolve ES comparison slugs (URL slug without `-es` suffix) to filename (with `-es` suffix):

```typescript
// Add to lib/pseo.ts:
export function getPseoContentByUrlSlug<T>(type: ContentType, urlSlug: string, locale: "en" | "es"): T | null {
  const fileSlug = locale === "es" ? `${urlSlug}-es` : urlSlug;
  return getPseoContent<T>(type, fileSlug);
}

export function getEsPseoSlugs(type: ContentType): string[] {
  return getPseoSlugs(type)
    .filter((slug) => slug.endsWith("-es"))
    .map((slug) => slug.replace(/-es$/, ""));
}
```

- [ ] **Step 2: Create the ES comparison route**

```tsx
// frontend/app/(es)/es/compare/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEsPseoSlugs, getPseoContentByUrlSlug } from "@/lib/pseo";
// Import the same comparison page component used by (default)/compare/[slug]

export const dynamicParams = false;

export async function generateStaticParams() {
  return getEsPseoSlugs("comparisons").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getPseoContentByUrlSlug("comparisons", slug, "es");
  if (!data) return {};
  // Build metadata from comparison data (same pattern as EN comparison page)
  return { title: (data as any).meta?.title, description: (data as any).meta?.description };
}

export default async function EsComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getPseoContentByUrlSlug("comparisons", slug, "es");
  if (!data) notFound();
  // Render the same comparison component (reuse from EN route)
  // ... match the pattern in (default)/compare/[slug]/page.tsx
}
```

Note: Check the existing `(default)/compare/[slug]/page.tsx` for the exact component and props pattern to reuse.

- [ ] **Step 3: Verify build passes**

Run: `cd frontend && npm run build 2>&1 | tail -20`

- [ ] **Step 4: Commit**

```bash
git add frontend/lib/pseo.ts frontend/app/\(es\)/es/compare/
git commit -m "feat(i18n): add Spanish comparison routes under /es/compare/"
```

---

## Task 12: Update Sitemap Configuration

**Files:**
- Modify: `frontend/next-sitemap.config.js`

- [ ] **Step 1: Remove library exclusions from sitemap config**

In `next-sitemap.config.js`, remove these from the `exclude` array:
- `"/compare/*"`, `"/compare"`
- `"/checklist/*"`, `"/checklist"`
- `"/resources/*"`, `"/resources"`
- `"/learn/*"`, `"/learn"`

Keep the index pages (`/compare`, `/checklist`, `/resources`, `/learn`) noindex via their page metadata, but they CAN appear in sitemap for discovery.

- [ ] **Step 2: Add new ES routes to `additionalPaths`**

Add the Spanish service pages, blog, and comparisons to the priority map:
- `/es` -> priority 0.95
- `/es/cuanto-cuesta`, `/es/rediseno`, etc. -> priority 0.85
- `/es/blog` -> priority 0.9
- `/es/compare/*` -> priority 0.6

- [ ] **Step 3: Remove old `/cr/*` routes from `additionalPaths`**

Remove any entries referencing `/cr` or `/cr/*`.

- [ ] **Step 4: Update `transform` function priorities**

Update the pattern matching to include `/es` routes:
```javascript
// Add:
if (config.loc === '/es' || config.loc === '/costa-rica') {
  priority = 0.95; changefreq = 'weekly';
}
if (config.loc.startsWith('/es/') && !config.loc.startsWith('/es/blog') && !config.loc.startsWith('/es/compare')) {
  priority = 0.85; changefreq = 'weekly';
}
```

- [ ] **Step 5: Add hreflang `alternateRefs` support**

```javascript
// In the config, add:
alternateRefs: [
  { hreflang: 'en', href: 'https://marceloretana.com' },
  { hreflang: 'es', href: 'https://marceloretana.com/es' },
],
```

- [ ] **Step 6: Verify sitemap generates correctly**

Run: `cd frontend && npm run build && cat public/sitemap-0.xml | head -50`
Expected: New ES routes appear, old /cr routes absent, library pages included.

- [ ] **Step 7: Commit**

```bash
git add frontend/next-sitemap.config.js
git commit -m "feat(seo): update sitemap to include /es/ routes and library content"
```

---

## Task 13: Spanish OG Image Generators

**Files:**
- Create: `frontend/app/(es)/es/opengraph-image.tsx`
- Create: `frontend/app/(es)/es/twitter-image.tsx`

Spanish pages shared on WhatsApp or social media need Spanish preview cards.

- [ ] **Step 1: Create Spanish OG image generator**

Clone `frontend/app/opengraph-image.tsx` (the root-level EN version) into `frontend/app/(es)/es/opengraph-image.tsx`. Update the text to Spanish:
- Title: "Marcelo Retana | Desarrollo Web Costa Rica"
- Description or tagline in Spanish

- [ ] **Step 2: Create Spanish Twitter image generator**

Clone `frontend/app/twitter-image.tsx` into `frontend/app/(es)/es/twitter-image.tsx` with the same Spanish text.

- [ ] **Step 3: Commit**

```bash
git add frontend/app/\(es\)/es/opengraph-image.tsx frontend/app/\(es\)/es/twitter-image.tsx
git commit -m "feat(seo): add Spanish OG and Twitter image generators for /es/ routes"
```

---

## Task 14: Update 404 Page

**Files:**
- Modify: `frontend/app/not-found.tsx`

- [ ] **Step 1: Make the 404 page bilingual**

Update to show both languages:

```tsx
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-fg-muted">Page not found / Página no encontrada</p>
      <div className="mt-8 flex gap-6">
        <a href="/" className="text-fg hover:text-yellow-400 transition-colors">
          Home (English)
        </a>
        <a href="/es" className="text-fg hover:text-yellow-400 transition-colors">
          Inicio (Español)
        </a>
      </div>
      <a
        href="mailto:info@gexpsoftware.com"
        className="mt-4 text-sm text-fg-muted hover:text-fg transition-colors"
      >
        info@gexpsoftware.com
      </a>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/app/not-found.tsx
git commit -m "fix(ux): make 404 page bilingual for EN/ES visitors"
```

---

## Task 15: Content -- Rewrite /costa-rica Pillar Page

**Files:**
- Modify: `frontend/content/market-pages/en-cr.ts` (hub content)
- Modify: `frontend/app/(default)/costa-rica/page.tsx` (may need layout changes)

- [ ] **Step 1: Rewrite the `enCrHub` content in `en-cr.ts`**

The hub page must absorb content from the 5 killed pages (web-development, web-design, web-development-agency, nearshore, expat). Consolidate their key selling points into the hub's narrative sections:

- Add sections for: Web Development, Web Design, Agency Approach, Nearshore Advantage, Working with Foreign-Owned Businesses
- Each as a `narrativeSection` in the hub data
- Keep the hero focused on "web development costa rica" as the primary keyword
- Update `featuredLinks` to point to surviving child pages only (website-cost, redesign, lead-generation, real-estate, healthcare, tourism)

- [ ] **Step 2: Verify build and page renders correctly**

Run: `cd frontend && npm run build 2>&1 | tail -20`
Then: `cd frontend && npm run dev` and check `/costa-rica` in browser.

- [ ] **Step 3: Commit**

```bash
git add frontend/content/market-pages/en-cr.ts
git commit -m "feat(content): rewrite /costa-rica as consolidated English pillar page"
```

---

## Task 16: Content -- Write /es Spanish Homepage/Service Hub

**Files:**
- Modify: `frontend/app/(es)/es/page.tsx` (rewrite from current CR hub to full homepage)
- Modify: `frontend/content/market-pages/es-cr.ts` (hub content expansion)

This is the most important content piece. `/es` must function as BOTH the Spanish homepage AND the main service page.

- [ ] **Step 1: Expand `esCrHub` content in `es-cr.ts`**

The hub content must absorb paginas-web + diseno-web + desarrollo-web + seo content. Add:
- Hero targeting "paginas web costa rica"
- Narrative sections covering: Paginas Web, Diseno Web, Desarrollo Web, SEO
- FAQ section targeting all absorbed keyword clusters
- Updated `featuredLinks` to surviving child pages only

- [ ] **Step 2: Rewrite the `/es` page component**

The current `(es)/es/page.tsx` (formerly cr/page.tsx) renders `MarketLandingPage`. This may suffice if `MarketLandingPage` supports the expanded content. If more sections are needed (testimonials, about, experience in Spanish), add them:

```tsx
// Additional sections for the Spanish homepage beyond MarketLandingPage:
import { Testimonials } from "@/components/sections/testimonials";
// ... possibly Spanish-specific about/experience sections
```

- [ ] **Step 3: Verify build and page renders**

Run: `cd frontend && npm run build 2>&1 | tail -20`
Then: `npm run dev` and check `/es` in browser.

- [ ] **Step 4: Commit**

```bash
git add frontend/content/market-pages/es-cr.ts frontend/app/\(es\)/es/page.tsx
git commit -m "feat(content): write /es Spanish homepage and consolidated service hub"
```

---

## Task 17: Full Build Verification & Redirect Testing

**Files:** None (testing only)

- [ ] **Step 1: Full production build**

```bash
cd frontend && npm run build
```

Expected: Build completes with 0 errors. Check the route summary output.

- [ ] **Step 2: Test redirects locally**

```bash
cd frontend && npm run start &
sleep 3

# Test Spanish market redirects
curl -sI http://localhost:3000/cr | head -5  # Should show 308 -> /es
curl -sI http://localhost:3000/cr/paginas-web-costa-rica | head -5  # -> /es
curl -sI http://localhost:3000/cr/constructoras | head -5  # -> /es/constructoras

# Test English consolidation redirects
curl -sI http://localhost:3000/costa-rica/web-development | head -5  # -> /costa-rica
curl -sI http://localhost:3000/costa-rica/website-cost-costa-rica | head -5  # -> /costa-rica/website-cost

# Test blog redirects
curl -sI http://localhost:3000/blog/por-que-tu-sitio-web-no-genera-clientes | head -5  # -> /es/blog/...

# Test comparison redirect
curl -sI http://localhost:3000/compare/nextjs-vs-astro-es | head -5  # -> /es/compare/nextjs-vs-astro

# Test new routes render (200)
curl -sI http://localhost:3000/es | head -5  # 200
curl -sI http://localhost:3000/es/constructoras | head -5  # 200
curl -sI http://localhost:3000/es/blog | head -5  # 200
curl -sI http://localhost:3000/costa-rica | head -5  # 200

kill %1
```

Note: Next.js uses 308 (permanent redirect) for permanent redirects in development. In production on Vercel it will be 301.

- [ ] **Step 3: Verify sitemap**

```bash
cat frontend/public/sitemap-0.xml | grep -c "/es/"  # Should be > 0
cat frontend/public/sitemap-0.xml | grep -c "/cr/"   # Should be 0
cat frontend/public/sitemap-0.xml | grep -c "/compare/"  # Should be > 0 (library now included)
```

- [ ] **Step 4: Verify no /cr routes exist in build output**

```bash
ls frontend/.next/server/app/\(es\)/es/ | head -20  # Should show new routes
ls frontend/.next/server/app/\(es\)/cr/ 2>&1  # Should show "No such file or directory"
```

- [ ] **Step 5: Commit verification notes**

No code changes -- this is a verification step only.

---

## Task 18: Final Commit & Summary

- [ ] **Step 1: Verify git status is clean**

```bash
git status
```

- [ ] **Step 2: Tag the migration commit**

```bash
git tag seo-migration-v1
```

---

## Execution Order & Dependencies

**IMPORTANT:** Tasks 5, 6, 7 must be committed together as a single atomic unit. Committing Task 5 alone produces a broken build (the renamed directory breaks the old [slug] route). Do NOT push to origin until at least Tasks 5-7 are complete.

```
Task 1 (language pairs + context) -- no deps
Task 2 (wire context into layouts) -- depends on 1
Task 3 (language toggle) -- depends on 2
Task 4 (redirects) -- no deps (can run parallel with 1-3)
Task 5 (rename cr -> es) -- no deps
Task 7 (update data files) -- depends on 5 (RUN BEFORE Task 6)
Task 6 (static service routes) -- depends on 5 AND 7 (data must have new slugs first)
Task 8 (update market-seo.ts) -- depends on 7
Task 9 (update hardcoded /cr refs) -- depends on 7
Task 10 (Spanish blog routes) -- depends on 5, 7
Task 11 (Spanish comparison routes) -- depends on 5
Task 12 (sitemap config) -- depends on 7, 10, 11
Task 13 (Spanish OG images) -- depends on 5
Task 14 (404 page) -- no deps
Task 15 (rewrite /costa-rica content) -- depends on 7
Task 16 (write /es content) -- depends on 6, 7
Task 17 (verification) -- depends on ALL
Task 18 (tag) -- depends on 17
```

Recommended execution order:
1. Tasks 1 -> 2 -> 3 (infrastructure)
2. Task 4 (redirects, parallel with above)
3. Task 5 -> 7 -> 6 -> 8 -> 9 (routing + data, as one atomic group)
4. Tasks 10, 11 (blog + comparison routes, parallel)
5. Tasks 12, 13, 14 (config + OG + 404, parallel)
6. Tasks 15, 16 (content rewrites, parallel)
7. Task 17 (verification)
8. Task 18 (tag)
