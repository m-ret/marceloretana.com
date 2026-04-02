import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/sections/contact-form";
import { getAlternateSlug, getPseoContent, getPseoSlugs, hasAlternate } from "@/lib/pseo";
import type { Stack } from "@/lib/pseo-types";
import ShareBar from "../../compare/[slug]/ShareBar";
import CodeBlock from "./CodeBlock";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPseoSlugs("stacks").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPseoContent<Stack>("stacks", slug);
  if (!data) return {};

  const url = `https://marceloretana.com/learn/${slug}`;
  const alternates: Metadata["alternates"] = { canonical: url };
  if (hasAlternate("stacks", slug, data.meta.locale)) {
    alternates.languages = {
      [data.meta.locale === "en" ? "es" : "en"]:
        `https://marceloretana.com/learn/${getAlternateSlug(slug, data.meta.locale)}`,
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
      locale: data.meta.locale === "es" ? "es_CR" : "en_US",
    },
  };
}

const difficultyColors = {
  beginner: "text-green-500 border-green-500/30",
  intermediate: "text-yellow-500 border-yellow-500/30",
  advanced: "text-red-500 border-red-500/30",
};

export default async function LearnPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getPseoContent<Stack>("stacks", slug);
  if (!data) notFound();

  const { steps, seo, meta, introduction, prerequisites, estimated_time, difficulty, next_steps } =
    data;

  const altSlug = hasAlternate("stacks", slug, meta.locale)
    ? getAlternateSlug(slug, meta.locale)
    : undefined;
  const ui =
    meta.locale === "es"
      ? {
          back: "Todas las guías",
          tip: "Consejo:",
          ctaTitle: "¿Necesita ayuda para construir esto?",
          ctaBody:
            "Si quiere lanzar algo con este stack, puedo ayudarle a definir la arquitectura y construirlo con una base sólida.",
          footer: "Todas las guías",
        }
      : {
          back: "All guides",
          tip: "Tip:",
          ctaTitle: "Need help building this?",
          ctaBody:
            "I have shipped production projects with these stacks. If you want to launch something with this stack, I can help define the architecture and build it well.",
          footer: "All guides",
        };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: seo.title,
    description: seo.description,
    totalTime: estimated_time,
    step: steps.map((step) => ({
      "@type": "HowToStep",
      position: step.number,
      name: step.title,
      text: step.description,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://marceloretana.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: meta.locale === "es" ? "Aprender" : "Learn",
        item: "https://marceloretana.com/learn",
      },
      { "@type": "ListItem", position: 3, name: seo.title.split(" with ")[0] || seo.title },
    ],
  };

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="max-w-3xl mx-auto">
        <Link
          href="/learn"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {ui.back}
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-fg mb-6 leading-tight">
            {seo.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-fg-muted mb-4">
            <span>~{estimated_time}</span>
            <span
              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded ${difficultyColors[difficulty]}`}
            >
              {difficulty}
            </span>
            <span>
              {steps.length} {meta.locale === "es" ? "pasos" : "steps"}
            </span>
          </div>
          <p className="text-lg text-fg-secondary">{introduction}</p>
          {altSlug && (
            <Link
              href={`/learn/${altSlug}`}
              className="inline-block mt-4 text-sm text-accent hover:underline"
            >
              {meta.locale === "en" ? "Ver en Español" : "View in English"}
            </Link>
          )}
        </header>

        <ShareBar title={seo.title} url={`https://marceloretana.com/learn/${slug}`} />

        {/* Prerequisites */}
        <section className="mb-12 border border-border rounded-lg p-6">
          <h2 className="text-xl font-light text-fg mb-4">
            {meta.locale === "es" ? "Requisitos previos" : "Prerequisites"}
          </h2>
          <ul className="space-y-3">
            {prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-sm mt-0.5">-</span>
                <div>
                  <span className="text-fg">{prereq.name}</span>
                  <p className="text-sm text-fg-secondary mt-0.5">{prereq.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        {steps.map((step) => (
          <section key={step.number} className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl text-accent/30 leading-none font-light">
                {String(step.number).padStart(2, "0")}
              </span>
              <h2 className="text-2xl font-light text-fg">{step.title}</h2>
            </div>

            <p className="text-fg-secondary leading-relaxed mb-6 ml-14">{step.description}</p>

            {step.code_snippet && (
              <div className="ml-14 mb-6">
                <CodeBlock
                  code={step.code_snippet.code}
                  language={step.code_snippet.language}
                  filename={step.code_snippet.filename}
                />
              </div>
            )}

            {step.tips && step.tips.length > 0 && (
              <div className="ml-14 border-l-2 border-accent/20 pl-4">
                {step.tips.map((tip, i) => (
                  <p key={i} className="text-sm text-fg-secondary mb-1">
                    <span className="text-accent">{ui.tip}</span> {tip}
                  </p>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Next steps */}
        <section className="border border-border rounded-lg p-8 mb-16">
          <h2 className="text-xl font-light text-fg mb-6">
            {meta.locale === "es" ? "Próximos pasos" : "Next Steps"}
          </h2>
          <ul className="space-y-3">
            {next_steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-sm mt-0.5">-</span>
                <span className="text-fg-secondary">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="border border-border rounded-lg p-8">
          <h2 className="text-xl font-light text-fg mb-3">{ui.ctaTitle}</h2>
          <p className="text-fg-secondary mb-0">{ui.ctaBody}</p>
          <ContactForm locale={meta.locale === "es" ? "cr" : "en"} sourcePage={`/learn/${slug}`} />
        </section>

        <footer className="border-t border-border mt-16 pt-8">
          <Link
            href="/learn"
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
