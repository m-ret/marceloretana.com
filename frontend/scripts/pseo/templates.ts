/**
 * Deterministic title templates for pSEO content.
 * Titles are NOT AI-generated — they follow strict patterns.
 */

export interface ComparisonMeta {
  tool_a: string;
  tool_b: string;
  use_case: string;
}

export interface ChecklistMeta {
  niche: string;
  topic: string;
  count: number;
}

export interface ResourceMeta {
  category: string;
  niche: string;
}

export interface StackMeta {
  project_type: string;
  stack: string;
}

// ─── Title generators ───

export function comparisonTitle(m: ComparisonMeta, locale: "en" | "es"): string {
  if (locale === "es") {
    return `${m.tool_a} vs ${m.tool_b}: Cuál es mejor para ${m.use_case} en 2026?`;
  }
  return `${m.tool_a} vs ${m.tool_b}: Which Is Better for ${m.use_case} in 2026?`;
}

export function checklistTitle(m: ChecklistMeta, locale: "en" | "es"): string {
  if (locale === "es") {
    return `Checklist de ${m.topic} para ${m.niche}: ${m.count} Pasos Esenciales`;
  }
  return `${m.niche} ${m.topic} Checklist: ${m.count} Essential Steps`;
}

export function resourceTitle(m: ResourceMeta, locale: "en" | "es"): string {
  if (locale === "es") {
    return `Mejores ${m.category} para ${m.niche} en 2026`;
  }
  return `Best ${m.category} for ${m.niche} in 2026`;
}

export function stackTitle(m: StackMeta, locale: "en" | "es"): string {
  if (locale === "es") {
    return `Como Construir ${m.project_type} con ${m.stack}`;
  }
  return `How to Build ${m.project_type} with ${m.stack}`;
}

// ─── Slug generators ───

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function comparisonSlug(tool_a: string, tool_b: string, locale: "en" | "es"): string {
  const base = slugify(`${tool_a}-vs-${tool_b}`);
  return locale === "es" ? `${base}-es` : base;
}

export function checklistSlug(niche: string, topic: string, locale: "en" | "es"): string {
  const base = slugify(`${niche}-${topic}-checklist`);
  return locale === "es" ? `${base}-es` : base;
}

export function resourceSlug(category: string, niche: string, locale: "en" | "es"): string {
  const base = slugify(`best-${category}-for-${niche}`);
  return locale === "es" ? `${base}-es` : base;
}

export function stackSlug(project_type: string, stack: string, locale: "en" | "es"): string {
  const base = slugify(`build-${project_type}-with-${stack}`);
  return locale === "es" ? `${base}-es` : base;
}

// ─── Content definitions (what to generate) ───

export interface ContentPlan {
  type: "comparison" | "checklist" | "resource" | "stack";
  slug: string;
  title: string;
  locale: "en" | "es";
  niche: string;
  params: ComparisonMeta | ChecklistMeta | ResourceMeta | StackMeta;
}
