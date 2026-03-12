/**
 * TypeScript types for pSEO content.
 * These mirror the Zod schemas in scripts/pseo/schemas.ts
 * but without the Zod dependency, for use in page renderers.
 */

export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
}

export interface ContentMeta {
  niche: string;
  type: "comparison" | "checklist" | "resource" | "stack";
  locale: "en" | "es";
  slug: string;
  generated_at: string;
}

// ─── Comparison ───

export interface ToolDetail {
  name: string;
  slug: string;
  tagline: string;
  website: string;
  category: string;
}

export interface Criterion {
  criterion: string;
  tool_a: { score: number; detail: string };
  tool_b: { score: number; detail: string };
}

export interface ComparisonCategory {
  name: string;
  criteria: Criterion[];
}

export interface Comparison {
  meta: ContentMeta;
  seo: SeoData;
  tools: [ToolDetail, ToolDetail];
  introduction: string;
  categories: ComparisonCategory[];
  verdict: {
    winner_overall: string;
    best_for: Record<string, string>;
    summary: string;
  };
  related_slugs?: string[];
}

// ─── Checklist ───

export interface ChecklistItem {
  id: string;
  text: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  priority: "critical" | "important" | "nice-to-have";
}

export interface ChecklistSection {
  name: string;
  description: string;
  items: ChecklistItem[];
}

export interface Checklist {
  meta: ContentMeta;
  seo: SeoData;
  introduction: string;
  total_items: number;
  estimated_time: string;
  sections: ChecklistSection[];
  tips: string[];
  related_slugs?: string[];
}

// ─── Resource ───

export interface ResourceItem {
  name: string;
  description: string;
  url: string;
  tags: string[];
  pricing: "free" | "freemium" | "paid" | "open-source";
  highlight?: string;
}

export interface ResourceCategory {
  name: string;
  description: string;
  items: ResourceItem[];
}

export interface Resource {
  meta: ContentMeta;
  seo: SeoData;
  introduction: string;
  total_items: number;
  categories: ResourceCategory[];
  related_slugs?: string[];
}

// ─── Stack Guide ───

export interface Prerequisite {
  name: string;
  description: string;
  url?: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  code_snippet?: {
    language: string;
    code: string;
    filename?: string;
  };
  tips?: string[];
}

export interface Stack {
  meta: ContentMeta;
  seo: SeoData;
  introduction: string;
  prerequisites: Prerequisite[];
  estimated_time: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: Step[];
  next_steps: string[];
  related_slugs?: string[];
}
