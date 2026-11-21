import { mock } from "bun:test";
import type { StaticImageData } from "next/image";
import type {
  BuildStoryCopy,
  BuildStorySource,
  StoryPreview,
  WorkImageAsset,
  WorkLocale,
} from "@/content/work/types";

/** A static image import as Next gives it to the code, without a real file. */
export function image(name: string): StaticImageData {
  return {
    src: `/static/${name}.webp`,
    width: 1600,
    height: 1000,
    blurDataURL: "data:image/webp;base64,AAAA",
  };
}

function asset(name: string, kind: WorkImageAsset["kind"] = "desktop"): WorkImageAsset {
  return {
    src: image(name),
    kind,
    alt: { en: `${name} alt`, es: `${name} alt es` },
    caption: { en: `${name} caption`, es: `${name} caption es` },
  };
}

/** Copy for one language; `figure` is the image key of the first section, or null for none. */
export function makeCopy(
  slug: string,
  locale: WorkLocale,
  figure: string | null = "figure"
): BuildStoryCopy<string> {
  return {
    title: `${slug} title ${locale}`,
    excerpt: `${slug} excerpt ${locale}`,
    sector: `${slug} sector ${locale}`,
    location: "Somewhere",
    sections: [
      { heading: "First", body: ["Body"], image: figure },
      { heading: "Second", body: ["Body"], image: null },
    ],
    takeaways: ["One", "Two", "Three"],
    stack: ["A", "B", "C", "D", "E"],
    seo: { title: "SEO title", description: "SEO description" },
  };
}

export function makeSource(
  slug: string,
  overrides: Partial<BuildStorySource> = {}
): BuildStorySource {
  return {
    slug,
    name: `${slug} name`,
    year: "2026",
    liveUrl: `https://${slug}.example.com`,
    publishedAt: "2026-10-30",
    relatedStories: ["alpha", "beta"],
    relatedPages: [],
    og: image(`${slug}-og`),
    images: { hero: asset(`${slug}-hero`), figure: asset(`${slug}-figure`, "mobile") },
    copy: { en: makeCopy(slug, "en"), es: makeCopy(slug, "es") },
    ...overrides,
  };
}

/** What the content registry holds in tests. Tests that change it restore its length afterwards. */
export const fakeSources: BuildStorySource[] = [
  makeSource("alpha", { relatedStories: ["beta", "gamma"], relatedPages: ["/costa-rica/tourism"] }),
  makeSource("beta", {
    relatedStories: ["alpha", "gamma"],
    relatedPages: ["/costa-rica/tourism", "/costa-rica/redesign"],
  }),
  makeSource("gamma", { relatedStories: ["alpha", "beta"], ownProduct: true }),
];

export const FAKE_SOURCE_COUNT = fakeSources.length;

export function makePreview(slug: string, locale: WorkLocale = "en"): StoryPreview {
  return {
    slug,
    name: `${slug} name`,
    year: "2026",
    title: `${slug} title ${locale}`,
    sector: `${slug} sector ${locale}`,
    path: locale === "es" ? `/es/casos/${slug}` : `/work/${slug}`,
    hero: { src: image(`${slug}-hero`), kind: "desktop", alt: `${slug} hero alt` },
  };
}

/** Replaces the content registry with `fakeSources`. Call before importing the code under test. */
export function registerWorkMock(): void {
  mock.module("@/content/work", () => ({ buildStorySources: fakeSources }));
}
