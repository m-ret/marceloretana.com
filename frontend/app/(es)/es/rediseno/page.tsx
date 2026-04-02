import type { Metadata } from "next";
import { getMarketPage } from "@/lib/market-pages";
import { EsServicePage, generateEsMetadata } from "../_components/es-service-page";

const page = getMarketPage("es-cr", "rediseno")!;

export function generateMetadata(): Metadata {
  return generateEsMetadata(page);
}

export default function RedisenoPage() {
  return <EsServicePage page={page} />;
}
