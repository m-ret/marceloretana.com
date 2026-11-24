import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { MarketLandingPage } from "@/components/market-pages/market-landing-page";
import { getMarketPage, getMarketPagesByMachine, getRelatedMarketPages } from "@/lib/market-pages";
import { buildMarketJsonLd, buildMarketMetadata } from "@/lib/market-seo";
import { withShareImages } from "@/lib/site-metadata";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getMarketPagesByMachine("en-cr").map((page) => ({ slug: page.slug }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const page = getMarketPage("en-cr", slug);

  if (!page) {
    return {};
  }

  return withShareImages(buildMarketMetadata(page), parent);
}

export default async function CostaRicaEnglishPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getMarketPage("en-cr", slug);

  if (!page) {
    notFound();
  }

  const relatedPages = getRelatedMarketPages("en-cr", slug);
  const jsonLd = buildMarketJsonLd(page);

  return (
    <>
      {jsonLd.map((item) => (
        <script
          key={`en-cr-page-jsonld-${page.slug}-${String(item["@type"])}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <MarketLandingPage entry={page} relatedPages={relatedPages} />
    </>
  );
}
