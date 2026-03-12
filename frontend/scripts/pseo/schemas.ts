import { z } from "zod/v4";

// ─── Shared schemas ───

export const SeoSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  keywords: z.array(z.string()).min(3).max(10),
});

export const MetaSchema = z.object({
  niche: z.string(),
  type: z.enum(["comparison", "checklist", "resource", "stack"]),
  locale: z.enum(["en", "es"]),
  slug: z.string(),
  generated_at: z.string(),
});

// ─── Comparison ───

const ToolDetailSchema = z.object({
  name: z.string(),
  slug: z.string(),
  tagline: z.string(),
  website: z.string().url(),
  category: z.string(),
});

const CriterionSchema = z.object({
  criterion: z.string(),
  tool_a: z.object({
    score: z.number().min(1).max(10),
    detail: z.string(),
  }),
  tool_b: z.object({
    score: z.number().min(1).max(10),
    detail: z.string(),
  }),
});

const ComparisonCategorySchema = z.object({
  name: z.string(),
  criteria: z.array(CriterionSchema).min(4).max(6),
});

export const ComparisonSchema = z.object({
  meta: MetaSchema,
  seo: SeoSchema,
  tools: z.tuple([ToolDetailSchema, ToolDetailSchema]),
  introduction: z.string(),
  categories: z.array(ComparisonCategorySchema).min(3).max(5),
  verdict: z.object({
    winner_overall: z.string(),
    best_for: z.record(z.string(), z.string()),
    summary: z.string(),
  }),
  related_slugs: z.array(z.string()).optional(),
});

export type Comparison = z.infer<typeof ComparisonSchema>;

// ─── Checklist ───

const ChecklistItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  description: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  priority: z.enum(["critical", "important", "nice-to-have"]),
});

const ChecklistSectionSchema = z.object({
  name: z.string(),
  description: z.string(),
  items: z.array(ChecklistItemSchema).min(5).max(8),
});

export const ChecklistSchema = z.object({
  meta: MetaSchema,
  seo: SeoSchema,
  introduction: z.string(),
  total_items: z.number(),
  estimated_time: z.string(),
  sections: z.array(ChecklistSectionSchema).min(4).max(6),
  tips: z.array(z.string()).min(3).max(5),
  related_slugs: z.array(z.string()).optional(),
});

export type Checklist = z.infer<typeof ChecklistSchema>;

// ─── Resource ───

const ResourceItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  tags: z.array(z.string()).min(1).max(5),
  pricing: z.enum(["free", "freemium", "paid", "open-source"]),
  highlight: z.string().optional(),
});

const ResourceCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  items: z.array(ResourceItemSchema).min(4).max(12),
});

export const ResourceSchema = z.object({
  meta: MetaSchema,
  seo: SeoSchema,
  introduction: z.string(),
  total_items: z.number(),
  categories: z.array(ResourceCategorySchema).min(3).max(5),
  related_slugs: z.array(z.string()).optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;

// ─── Stack Guide ───

const PrerequisiteSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url().optional(),
});

const StepSchema = z.object({
  number: z.number(),
  title: z.string(),
  description: z.string(),
  code_snippet: z
    .object({
      language: z.string(),
      code: z.string(),
      filename: z.string().optional(),
    })
    .optional(),
  tips: z.array(z.string()).optional(),
});

export const StackSchema = z.object({
  meta: MetaSchema,
  seo: SeoSchema,
  introduction: z.string(),
  prerequisites: z.array(PrerequisiteSchema).min(2).max(5),
  estimated_time: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  steps: z.array(StepSchema).min(5).max(8),
  next_steps: z.array(z.string()).min(2).max(4),
  related_slugs: z.array(z.string()).optional(),
});

export type Stack = z.infer<typeof StackSchema>;

// ─── Schema map ───

export const schemas = {
  comparison: ComparisonSchema,
  checklist: ChecklistSchema,
  resource: ResourceSchema,
  stack: StackSchema,
} as const;

export type ContentType = keyof typeof schemas;
export type ContentData = Comparison | Checklist | Resource | Stack;
