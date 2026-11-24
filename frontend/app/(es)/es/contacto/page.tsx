import type { Metadata, ResolvingMetadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { withShareImages } from "@/lib/site-metadata";

const description = "Contacte a Marcelo Retana para servicios de desarrollo web en Costa Rica.";

const metadata: Metadata = {
  title: "Contacto",
  description,
  alternates: {
    canonical: "/es/contacto",
    languages: {
      en: "/contact",
      "x-default": "/contact",
    },
  },
  openGraph: {
    title: "Contacto | Marcelo Retana",
    description,
    url: "https://marceloretana.com/es/contacto",
    siteName: "Marcelo Retana",
    locale: "es_CR",
    type: "website",
  },
};

export function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  return withShareImages(metadata, parent);
}

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="sr-only">Contacto</h1>
      <ContactForm locale="cr" sourcePage="/es/contacto" />
    </main>
  );
}
