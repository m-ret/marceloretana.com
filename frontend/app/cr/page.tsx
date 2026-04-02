import type { Metadata } from "next";
import { MarketLandingPage } from "@/components/market-pages/market-landing-page";
import { esCrHub, esCrMarketPages } from "@/content/market-pages/es-cr";
import { buildMarketJsonLd, buildMarketMetadata } from "@/lib/market-seo";

export function generateMetadata(): Metadata {
  return buildMarketMetadata(esCrHub);
}

export default function CostaRicaSpanishHubPage() {
  const jsonLd = buildMarketJsonLd(esCrHub);

  return (
    <>
      {jsonLd.map((item) => (
        <script
          key={`cr-hub-jsonld-${String(item["@type"])}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <MarketLandingPage entry={esCrHub} relatedPages={esCrMarketPages} />
    </>
  );
}
