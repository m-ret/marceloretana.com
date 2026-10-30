import type { Metadata } from "next";
import type { BuildStory, WorkLocale } from "@/content/work/types";
import { getBuildStories, workPath } from "@/lib/work";

const siteUrl = "https://marceloretana.com";
const author = { "@type": "Person", name: "Marcelo Retana", url: siteUrl };

const indexCopy = {
  en: {
    title: "Work: Build Stories From Real Projects",
    description:
      "First-person build stories by Marcelo Retana: the decisions, trade-offs and lessons behind real websites and products, written for business owners.",
  },
  es: {
    title: "Casos: cómo construí cada proyecto",
    description:
      "Casos en primera persona de Marcelo Retana: las decisiones, lo que se cedió y lo aprendido en sitios web y productos reales, para dueños de negocio.",
  },
} satisfies Record<WorkLocale, { title: string; description: string }>;

const breadcrumbNames = {
  en: { home: "Home", homeUrl: siteUrl, work: "Work" },
  es: { home: "Inicio", homeUrl: `${siteUrl}/es`, work: "Casos" },
} satisfies Record<WorkLocale, Record<string, string>>;

function absolute(path: string) {
  return `${siteUrl}${path}`;
}

/** Self-referencing canonical plus the full en/es/x-default cluster (x-default is English). */
function alternates(locale: WorkLocale, slug?: string): Metadata["alternates"] {
  const en = absolute(workPath("en", slug));
  const es = absolute(workPath("es", slug));
  return {
    canonical: locale === "en" ? en : es,
    languages: { en, es, "x-default": en },
  };
}

function ogLocale(locale: WorkLocale) {
  return locale === "es" ? "es_CR" : "en_US";
}

export function workIndexMetadata(locale: WorkLocale): Metadata {
  const { title, description } = indexCopy[locale];
  // The lead story's statically imported og.jpg: a stable URL for both indexes' share cards.
  const lead = getBuildStories(locale)[0];
  return {
    title,
    description,
    alternates: alternates(locale),
    openGraph: {
      title,
      description,
      url: absolute(workPath(locale)),
      type: "website",
      siteName: "Marcelo Retana",
      locale: ogLocale(locale),
      alternateLocale: ogLocale(locale === "en" ? "es" : "en"),
      ...(lead && { images: [{ url: lead.og.src, width: 1200, height: 630, alt: lead.hero.alt }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(lead && { images: [lead.og.src] }),
    },
  };
}

export function workIndexJsonLd(locale: WorkLocale, stories: BuildStory[]) {
  const { title, description } = indexCopy[locale];
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absolute(workPath(locale)),
    inLanguage: locale,
    author,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: stories.map((story, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absolute(story.path),
        name: story.title,
      })),
    },
  };
}

export function buildStoryMetadata(story: BuildStory): Metadata {
  const { title, description } = story.seo;
  const url = absolute(story.path);
  return {
    title,
    description,
    alternates: alternates(story.locale, story.slug),
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: story.publishedAt,
      modifiedTime: story.publishedAt,
      authors: ["Marcelo Retana"],
      siteName: "Marcelo Retana",
      locale: ogLocale(story.locale),
      alternateLocale: ogLocale(story.locale === "en" ? "es" : "en"),
      images: [{ url: story.og.src, width: 1200, height: 630, alt: story.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [story.og.src],
    },
  };
}

export function buildStoryJsonLd(story: BuildStory) {
  const url = absolute(story.path);
  const crumbs = breadcrumbNames[story.locale];
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: story.title,
      description: story.seo.description,
      image: absolute(story.og.src),
      datePublished: story.publishedAt,
      dateModified: story.publishedAt,
      inLanguage: story.locale,
      url,
      author,
      publisher: author,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      about: {
        "@type": story.ownProduct ? "SoftwareApplication" : "Organization",
        name: story.name,
        url: story.liveUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: crumbs.home, item: crumbs.homeUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: crumbs.work,
          item: absolute(workPath(story.locale)),
        },
        { "@type": "ListItem", position: 3, name: story.title, item: url },
      ],
    },
  ];
}
