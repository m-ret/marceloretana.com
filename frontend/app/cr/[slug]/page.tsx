import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketLandingPage } from "@/components/market-pages/market-landing-page";
import { getMarketPage, getMarketPagesByMachine, getRelatedMarketPages } from "@/lib/market-pages";
import { buildMarketJsonLd, buildMarketMetadata } from "@/lib/market-seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getMarketPagesByMachine("es-cr").map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getMarketPage("es-cr", slug);

  if (!page) {
    return {};
  }

  return buildMarketMetadata(page);
}

export default async function CostaRicaSpanishPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getMarketPage("es-cr", slug);

  if (!page) {
    notFound();
  }

  const relatedPages = getRelatedMarketPages("es-cr", slug);
  const jsonLd = buildMarketJsonLd(page);

  return (
    <>
      {jsonLd.map((item) => (
        <script
          key={`cr-page-jsonld-${page.slug}-${String(item["@type"])}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <MarketLandingPage entry={page} relatedPages={relatedPages} />
    </>
  );
}
