import type { Metadata } from "next";
import { MarketLandingPage } from "@/components/market-pages/market-landing-page";
import type { MarketPage } from "@/lib/market-page-types";
import { getRelatedMarketPages } from "@/lib/market-pages";
import { buildMarketJsonLd, buildMarketMetadata } from "@/lib/market-seo";

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
