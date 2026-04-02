import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareBar from "@/app/(default)/compare/[slug]/ShareBar";
import { ContactForm } from "@/components/sections/contact-form";
import { getEsPseoSlugs, getPseoContentByUrlSlug, hasAlternate } from "@/lib/pseo";
import type { Comparison } from "@/lib/pseo-types";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getEsPseoSlugs("comparisons").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPseoContentByUrlSlug<Comparison>("comparisons", slug, "es");
  if (!data) return {};

  const url = `https://marceloretana.com/es/compare/${slug}`;
  const alternates: Metadata["alternates"] = { canonical: url };

  // EN alternate: if EN file exists (same slug without -es suffix, which is just slug)
  if (hasAlternate("comparisons", `${slug}-es`, "es")) {
    alternates.languages = {
      en: `https://marceloretana.com/compare/${slug}`,
    };
  }

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates,
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      url,
      type: "article",
      siteName: "Marcelo Retana",
      locale: "es_CR",
    },
  };
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const pct = (score / 10) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-fg-secondary w-20 shrink-0 text-right">{label}</span>
      <div className="flex-1 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-accent w-10">{score}/10</span>
    </div>
  );
}

export default async function EsComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getPseoContentByUrlSlug<Comparison>("comparisons", slug, "es");
  if (!data) notFound();

  const { tools, categories, verdict, seo, meta, introduction } = data;
  const [toolA, toolB] = tools;

  const enSlug = slug; // EN file uses the same slug without "-es"
  const enExists = hasAlternate("comparisons", `${slug}-es`, "es");

  const ui = {
    breadcrumb: "Comparativas",
    back: "Todas las comparativas",
    bestFor: "Mejor para",
    ctaTitle: "¿Necesita ayuda para elegir?",
    ctaBody:
      "Si está evaluando estas herramientas para un proyecto real, puedo ayudarle a escoger la opción correcta según su stack, su equipo y el tipo de negocio.",
    footer: "Todas las comparativas",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: seo.title,
    description: seo.description,
    author: { "@type": "Person", name: "Marcelo Retana", url: "https://marceloretana.com" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://marceloretana.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: ui.breadcrumb,
        item: "https://marceloretana.com/es/compare",
      },
      { "@type": "ListItem", position: 3, name: `${toolA.name} vs ${toolB.name}` },
    ],
  };

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="max-w-3xl mx-auto">
        <Link
          href="/es/compare"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {ui.back}
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-fg mt-4 mb-6 leading-tight">
            {seo.title}
          </h1>
          <p className="text-lg text-fg-secondary">{seo.description}</p>
          {enExists && (
            <Link
              href={`/compare/${enSlug}`}
              className="inline-block mt-4 text-sm text-accent hover:underline"
            >
              View in English
            </Link>
          )}
        </header>

        <ShareBar title={seo.title} url={`https://marceloretana.com/es/compare/${slug}`} />

        <p className="text-fg-secondary text-lg leading-relaxed mb-12">{introduction}</p>

        {/* Tool cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {[toolA, toolB].map((tool) => (
            <div key={tool.slug} className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-light text-fg mb-2">{tool.name}</h2>
              <p className="text-fg-secondary text-sm mb-2">{tool.tagline}</p>
              <span className="text-fg-muted text-xs uppercase tracking-wider">
                {tool.category}
              </span>
            </div>
          ))}
        </div>

        {/* Categories */}
        {categories.map((cat, i) => (
          <section key={i} className="mb-16">
            <h2 className="text-2xl font-light text-fg mb-8">{cat.name}</h2>
            <div className="space-y-8">
              {cat.criteria.map((criterion, j) => (
                <div key={j} className="border border-border rounded-lg p-6">
                  <h3 className="text-lg text-fg mb-4">{criterion.criterion}</h3>
                  <div className="space-y-3 mb-4">
                    <ScoreBar score={criterion.tool_a.score} label={toolA.name} />
                    <ScoreBar score={criterion.tool_b.score} label={toolB.name} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-accent text-xs uppercase block mb-1">{toolA.name}</span>
                      <p className="text-fg-secondary">{criterion.tool_a.detail}</p>
                    </div>
                    <div>
                      <span className="text-accent text-xs uppercase block mb-1">{toolB.name}</span>
                      <p className="text-fg-secondary">{criterion.tool_b.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Verdict */}
        <section className="border border-border rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-light text-fg mb-6">Veredicto</h2>
          <p className="text-fg-secondary text-lg leading-relaxed mb-6">{verdict.summary}</p>
          <div className="mb-6">
            <span className="text-fg-muted text-xs uppercase tracking-wider block mb-1">
              Ganador General
            </span>
            <span className="text-2xl font-light text-accent">{verdict.winner_overall}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.entries(verdict.best_for).map(([useCase, tool]) => (
              <div key={useCase} className="border border-border rounded-lg p-4">
                <span className="text-fg-muted text-xs uppercase tracking-wider block mb-1">
                  {ui.bestFor} {useCase}
                </span>
                <span className="text-fg">{tool}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border border-border rounded-lg p-8">
          <h2 className="text-xl font-light text-fg mb-3">{ui.ctaTitle}</h2>
          <p className="text-fg-secondary mb-0">{ui.ctaBody}</p>
          <ContactForm locale="cr" sourcePage={`/es/compare/${slug}`} />
        </section>

        <footer className="border-t border-border mt-16 pt-8">
          <Link
            href="/es/compare"
            className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {ui.footer}
          </Link>
        </footer>
      </article>
    </main>
  );
}
