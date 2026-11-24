import type { Metadata, ResolvingMetadata } from "next";
import { MarketLandingPage } from "@/components/market-pages/market-landing-page";
import { enCrHub } from "@/content/market-pages/en-cr";
import { getIndexableMarketPagesByMachine } from "@/lib/market-pages";
import { buildMarketJsonLd, buildMarketMetadata } from "@/lib/market-seo";
import { withShareImages } from "@/lib/site-metadata";

export function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return withShareImages(buildMarketMetadata(enCrHub), parent);
}

export default function CostaRicaEnglishHubPage() {
  const jsonLd = buildMarketJsonLd(enCrHub);
  const relatedPages = getIndexableMarketPagesByMachine("en-cr");

  return (
    <>
      {jsonLd.map((item) => (
        <script
          key={`en-cr-hub-jsonld-${String(item["@type"])}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <MarketLandingPage entry={enCrHub} relatedPages={relatedPages} />
    </>
  );
}
