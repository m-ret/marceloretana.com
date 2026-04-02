import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPseoContentByLocale } from "@/lib/pseo";
import type { Comparison } from "@/lib/pseo-types";

export const metadata: Metadata = {
  title: "Comparaciones Técnicas | Marcelo Retana",
  description:
    "Biblioteca secundaria de comparaciones técnicas entre frameworks, herramientas de IA y plataformas de desarrollo.",
  alternates: {
    canonical: "/es/compare",
    languages: {
      en: "/compare",
      "x-default": "/compare",
    },
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CompareEsIndex() {
  const comparisons = getPseoContentByLocale<Comparison>("comparisons", "es");

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/es"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Inicio
        </Link>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">Biblioteca</p>
        <h1 className="text-3xl md:text-4xl font-light text-fg mb-4">Comparaciones Técnicas</h1>
        <p className="max-w-2xl text-fg-secondary mb-12">
          Comparaciones lado a lado de herramientas, frameworks y plataformas. Material de
          referencia útil, pero secundario a los servicios comerciales de este sitio.
        </p>
        <div className="space-y-3">
          {comparisons.map((item) => (
            <Link
              key={item.meta.slug}
              href={`/es/compare/${item.meta.slug.replace(/-es$/, "")}`}
              className="group flex items-center justify-between p-5 border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div>
                <h2 className="text-lg text-fg group-hover:text-accent transition-colors">
                  {item.tools[0].name} vs {item.tools[1].name}
                </h2>
              </div>
              <span className="text-fg-muted group-hover:text-accent transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
