import type { Metadata } from "next";
import { MarketLandingPage } from "@/components/market-pages/market-landing-page";
import { esCrHub } from "@/content/market-pages/es-cr";
import { getIndexableMarketPagesByMachine } from "@/lib/market-pages";
import { buildMarketJsonLd, buildMarketMetadata } from "@/lib/market-seo";

export function generateMetadata(): Metadata {
  return buildMarketMetadata(esCrHub);
}

export default function CostaRicaSpanishHubPage() {
  const jsonLd = buildMarketJsonLd(esCrHub);
  const relatedPages = getIndexableMarketPagesByMachine("es-cr");

  return (
    <>
      {jsonLd.map((item) => (
        <script
          key={`cr-hub-jsonld-${String(item["@type"])}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <MarketLandingPage entry={esCrHub} relatedPages={relatedPages} />
    </>
  );
}
