import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Solicitar Cotización | Marcelo Retana",
  description: "Solicite una cotización para su proyecto web en Costa Rica.",
  alternates: { canonical: "/es/cotizacion" },
};

export default function CotizacionPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <ContactForm locale="cr" sourcePage="/es/cotizacion" />
    </main>
  );
}
