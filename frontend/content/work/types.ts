import type { StaticImageData } from "next/image";

export type WorkLocale = "en" | "es";
export type Localized<T> = Record<WorkLocale, T>;

export type WorkImageKind = "desktop" | "mobile" | "photo" | "video";

export type WorkImageAsset = {
  src: StaticImageData;
  kind: WorkImageKind;
  alt: Localized<string>;
  caption?: Localized<string>;
};

export type BuildStorySection<Img> = {
  heading: string;
  body: string[];
  image: Img | null;
};

export type BuildStoryCopy<Img> = {
  title: string;
  excerpt: string;
  sector: string;
  location: string;
  sections: BuildStorySection<Img>[];
  takeaways: string[];
  stack: string[];
  seo: { title: string; description: string };
};

/** One content module per project. `images.hero` is required; copy refers to images by key. */
export type BuildStorySource = {
  slug: string;
  name: string;
  year: string;
  liveUrl: string;
  /** GEXP's own product rather than a client project. */
  ownProduct?: boolean;
  /** ISO date; Article datePublished and dateModified. */
  publishedAt: string;
  /** 1200×630 crop of the hero without text, shared by both locales. */
  og: StaticImageData;
  images: Record<string, WorkImageAsset>;
  copy: Localized<BuildStoryCopy<string>>;
};

export type WorkImage = {
  src: StaticImageData;
  kind: WorkImageKind;
  alt: string;
  caption?: string;
};

export type BuildStory = BuildStoryCopy<WorkImage> & {
  slug: string;
  name: string;
  year: string;
  liveUrl: string;
  ownProduct: boolean;
  publishedAt: string;
  og: StaticImageData;
  locale: WorkLocale;
  hero: WorkImage;
  path: string;
  caseStudyUrl: string;
  next: { slug: string; name: string; title: string; path: string };
};
