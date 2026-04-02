import { z } from "zod";

export const marketMachineSchema = z.enum(["es-cr", "en-cr"]);
export const marketLocaleSchema = z.enum(["es", "en"]);

export const marketHeroSchema = z.object({
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  supportingText: z.string().min(1).optional(),
});

export const marketCtaSchema = z.object({
  primaryLabel: z.string().min(1),
  primaryHref: z.string().min(1),
  secondaryLabel: z.string().min(1).optional(),
  secondaryHref: z.string().min(1).optional(),
  tertiaryLabel: z.string().min(1).optional(),
  tertiaryHref: z.string().min(1).optional(),
});

export const marketProofSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  metric: z.string().min(1).optional(),
});

export const marketFaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const marketNarrativeSectionSchema = z.object({
  eyebrow: z.string().min(1).optional(),
  title: z.string().min(1),
  body: z.string().min(1),
  points: z.array(z.string().min(1)).optional(),
});

export const marketPageLinkSchema = z.object({
  label: z.string().min(1),
  slug: z.string().min(1),
});

const marketBaseSchema = z.object({
  machine: marketMachineSchema,
  locale: marketLocaleSchema,
  generatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(3),
  hero: marketHeroSchema,
  intro: z.string().min(1),
  proof: z.array(marketProofSchema).min(1),
  faq: z.array(marketFaqSchema).min(1),
  cta: marketCtaSchema,
  alternatePath: z.string().min(1).optional(),
  noindex: z.boolean().optional(),
  narrativeSections: z.array(marketNarrativeSectionSchema).optional(),
  caseProofIds: z.array(z.string().min(1)).optional(),
});

export const marketPageSchema = marketBaseSchema.extend({
  slug: z.string().min(1),
  path: z.string().min(1),
  problemTitle: z.string().min(1),
  problemPoints: z.array(z.string().min(1)).min(3),
  solutionTitle: z.string().min(1),
  solutionPoints: z.array(z.string().min(1)).min(3),
  deliverablesTitle: z.string().min(1),
  deliverables: z.array(z.string().min(1)).min(3),
  relatedSlugs: z.array(z.string().min(1)).min(1),
  featuredLinks: z.array(marketPageLinkSchema).optional(),
});

export const marketHubSchema = marketBaseSchema.extend({
  path: z.string().min(1),
  featuredLinks: z.array(marketPageLinkSchema).min(1),
});

export const marketDatasetSchema = z.object({
  hub: marketHubSchema,
  pages: z.array(marketPageSchema).min(1),
});

export type MarketMachine = z.infer<typeof marketMachineSchema>;
export type MarketLocale = z.infer<typeof marketLocaleSchema>;
export type MarketHero = z.infer<typeof marketHeroSchema>;
export type MarketCta = z.infer<typeof marketCtaSchema>;
export type MarketProof = z.infer<typeof marketProofSchema>;
export type MarketFaq = z.infer<typeof marketFaqSchema>;
export type MarketNarrativeSection = z.infer<typeof marketNarrativeSectionSchema>;
export type MarketPageLink = z.infer<typeof marketPageLinkSchema>;
export type MarketPage = z.infer<typeof marketPageSchema>;
export type MarketHub = z.infer<typeof marketHubSchema>;
export type MarketDataset = z.infer<typeof marketDatasetSchema>;
