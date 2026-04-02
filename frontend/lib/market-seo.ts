import type { Metadata } from "next";
import type { MarketFaq, MarketHub, MarketPage } from "@/lib/market-page-types";
import { getAlternateMarketEntry } from "@/lib/market-pages";

const siteUrl = "https://marceloretana.com";

type MarketEntry = MarketHub | MarketPage;

function getOgLocale(locale: MarketEntry["locale"]) {
  return locale === "es" ? "es_CR" : "en_US";
}

function buildFaqJsonLd(faq: MarketFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildMarketMetadata(entry: MarketEntry): Metadata {
  const alternateEntry = getAlternateMarketEntry(entry.path);
  const languages = alternateEntry
    ? {
        [alternateEntry.locale === "es" ? "es-CR" : "en"]: alternateEntry.path,
        ...(entry.path === "/es" || entry.path === "/costa-rica" ? { "x-default": "/" } : {}),
      }
    : entry.path === "/es" || entry.path === "/costa-rica"
      ? { "x-default": "/" }
      : undefined;

  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    alternates: {
      canonical: entry.path,
      languages,
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: `${siteUrl}${entry.path}`,
      siteName: "Marcelo Retana",
      locale: getOgLocale(entry.locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
    robots: {
      index: !entry.noindex,
      follow: true,
      googleBot: {
        index: !entry.noindex,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildMarketJsonLd(entry: MarketEntry) {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: entry.title,
    description: entry.description,
    inLanguage: entry.locale,
    url: `${siteUrl}${entry.path}`,
    dateModified: entry.generatedAt,
    isPartOf: {
      "@type": "WebSite",
      name: "Marcelo Retana",
      url: siteUrl,
    },
    about: {
      "@type": "Service",
      name: entry.title,
      areaServed: {
        "@type": "Country",
        name: "Costa Rica",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: entry.locale === "es" ? "Costa Rica" : "Costa Rica",
        item: `${siteUrl}${entry.locale === "es" ? "/es" : "/costa-rica"}`,
      },
      ...(entry.path === "/es" || entry.path === "/costa-rica"
        ? []
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: "slug" in entry ? entry.hero.eyebrow : entry.title,
              item: `${siteUrl}${entry.path}`,
            },
          ]),
    ],
  };

  return [pageJsonLd, breadcrumbJsonLd, buildFaqJsonLd(entry.faq)];
}
