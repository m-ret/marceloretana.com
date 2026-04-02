import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contacto | Marcelo Retana",
  description: "Contacte a Marcelo Retana para servicios de desarrollo web en Costa Rica.",
  alternates: { canonical: "/es/contacto" },
};

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <ContactForm locale="cr" sourcePage="/es/contacto" />
    </main>
  );
}
