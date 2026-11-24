import type { Metadata, ResolvingMetadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { withShareImages } from "@/lib/site-metadata";

const description = "Solicite una cotización para su proyecto web en Costa Rica.";

const metadata: Metadata = {
  title: "Solicitar Cotización",
  description,
  alternates: {
    canonical: "/es/cotizacion",
    languages: {
      en: "/costa-rica/quote",
      "x-default": "/costa-rica/quote",
    },
  },
  openGraph: {
    title: "Solicitar Cotización | Marcelo Retana",
    description,
    url: "https://marceloretana.com/es/cotizacion",
    siteName: "Marcelo Retana",
    locale: "es_CR",
    type: "website",
  },
};

export function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return withShareImages(metadata, parent);
}

export default function CotizacionPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="sr-only">Solicitar cotización</h1>
      <ContactForm locale="cr" sourcePage="/es/cotizacion" />
    </main>
  );
}
