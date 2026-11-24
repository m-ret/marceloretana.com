import type { Metadata, ResolvingMetadata } from "next";
import { getMarketPage } from "@/lib/market-pages";
import { EsServicePage, generateEsMetadata } from "../_components/es-service-page";

const page = getMarketPage("es-cr", "cuanto-cuesta")!;

export function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return generateEsMetadata(page, parent);
}

export default function CuantoCuestaPage() {
  return <EsServicePage page={page} />;
}
