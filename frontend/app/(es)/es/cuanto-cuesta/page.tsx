import type { Metadata } from "next";
import { getMarketPage } from "@/lib/market-pages";
import { EsServicePage, generateEsMetadata } from "../_components/es-service-page";

const page = getMarketPage("es-cr", "cuanto-cuesta")!;

export function generateMetadata(): Metadata {
  return generateEsMetadata(page);
}

export default function CuantoCuestaPage() {
  return <EsServicePage page={page} />;
}
