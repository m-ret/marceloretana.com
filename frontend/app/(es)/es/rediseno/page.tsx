import type { Metadata, ResolvingMetadata } from "next";
import { getMarketPage } from "@/lib/market-pages";
import { EsServicePage, generateEsMetadata } from "../_components/es-service-page";

const page = getMarketPage("es-cr", "rediseno")!;

export function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return generateEsMetadata(page, parent);
}

export default function RedisenoPage() {
  return <EsServicePage page={page} />;
}
