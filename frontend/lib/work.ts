import { buildStorySources } from "@/content/work";
import type {
  BuildStory,
  BuildStorySource,
  WorkImage,
  WorkImageAsset,
  WorkLocale,
} from "@/content/work/types";

const CASE_STUDY_BASE: Record<WorkLocale, string> = {
  en: "https://gexpsoftware.com/work",
  es: "https://gexpsoftware.com/cr/casos",
};

/** "/work" | "/work/<slug>" | "/es/casos" | "/es/casos/<slug>" */
export function workPath(locale: WorkLocale, slug?: string): string {
  const base = locale === "es" ? "/es/casos" : "/work";
  return slug ? `${base}/${slug}` : base;
}

function resolveImage(source: BuildStorySource, key: string, locale: WorkLocale): WorkImage {
  const asset: WorkImageAsset | undefined = source.images[key];
  if (!asset) throw new Error(`${source.slug}: unknown image "${key}"`);
  return {
    src: asset.src,
    kind: asset.kind,
    alt: asset.alt[locale],
    caption: asset.caption?.[locale],
  };
}

function toBuildStory(source: BuildStorySource, index: number, locale: WorkLocale): BuildStory {
  const copy = source.copy[locale];
  const next = buildStorySources[(index + 1) % buildStorySources.length];

  return {
    ...copy,
    sections: copy.sections.map((section) => ({
      ...section,
      image: section.image ? resolveImage(source, section.image, locale) : null,
    })),
    slug: source.slug,
    name: source.name,
    year: source.year,
    liveUrl: source.liveUrl,
    ownProduct: source.ownProduct === true,
    publishedAt: source.publishedAt,
    og: source.og,
    locale,
    hero: resolveImage(source, "hero", locale),
    path: workPath(locale, source.slug),
    caseStudyUrl: `${CASE_STUDY_BASE[locale]}/${source.slug}`,
    next: {
      slug: next.slug,
      name: next.name,
      title: next.copy[locale].title,
      path: workPath(locale, next.slug),
    },
  };
}

/** Registry (display) order. */
export function getBuildStories(locale: WorkLocale): BuildStory[] {
  return buildStorySources.map((source, index) => toBuildStory(source, index, locale));
}

export function getBuildStory(locale: WorkLocale, slug: string): BuildStory | undefined {
  const index = buildStorySources.findIndex((source) => source.slug === slug);
  return index === -1 ? undefined : toBuildStory(buildStorySources[index], index, locale);
}

export function getBuildStorySlugs(): string[] {
  return buildStorySources.map((source) => source.slug);
}
