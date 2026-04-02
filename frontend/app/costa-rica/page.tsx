import type { Metadata } from "next";
import { MarketLandingPage } from "@/components/market-pages/market-landing-page";
import { enCrHub, enCrMarketPages } from "@/content/market-pages/en-cr";
import { buildMarketJsonLd, buildMarketMetadata } from "@/lib/market-seo";

export function generateMetadata(): Metadata {
  return buildMarketMetadata(enCrHub);
}

export default function CostaRicaEnglishHubPage() {
  const jsonLd = buildMarketJsonLd(enCrHub);

  return (
    <>
      {jsonLd.map((item) => (
        <script
          key={`en-cr-hub-jsonld-${String(item["@type"])}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <MarketLandingPage entry={enCrHub} relatedPages={enCrMarketPages} />
    </>
  );
}
