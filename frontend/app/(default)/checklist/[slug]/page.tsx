import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlternateSlug, getPseoContent, getPseoSlugs, hasAlternate } from "@/lib/pseo";
import type { Checklist } from "@/lib/pseo-types";
import ChecklistInteractive from "./ChecklistInteractive";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPseoSlugs("checklists").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPseoContent<Checklist>("checklists", slug);
  if (!data) return {};
  const url = `https://marceloretana.com/checklist/${slug}`;
  const alternates: Metadata["alternates"] = { canonical: url };
  if (hasAlternate("checklists", slug, data.meta.locale)) {
    alternates.languages = {
      [data.meta.locale === "en" ? "es" : "en"]:
        `https://marceloretana.com/checklist/${getAlternateSlug(slug, data.meta.locale)}`,
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
    },
  };
}

export default async function ChecklistPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getPseoContent<Checklist>("checklists", slug);
  if (!data) notFound();

  const { sections, seo, meta, introduction, estimated_time, total_items, tips } = data;

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: seo.title,
    description: seo.description,
    totalTime: estimated_time,
    step: sections.flatMap((s, si) =>
      s.items.map((item, ii) => ({
        "@type": "HowToStep",
        position: si * 10 + ii + 1,
        name: item.text,
        text: item.description,
      }))
    ),
  };

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <article className="max-w-3xl mx-auto">
        <Link
          href="/checklist"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          All checklists
        </Link>
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-fg mb-6 leading-tight">
            {seo.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-fg-muted mb-4">
            <span>{total_items} items</span>
            <span>~{estimated_time}</span>
          </div>
          <p className="text-lg text-fg-secondary">{introduction}</p>
        </header>

        <ChecklistInteractive sections={sections} locale={meta.locale} slug={slug} />

        {tips.length > 0 && (
          <section className="border border-border rounded-lg p-8 mt-16">
            <h2 className="text-xl font-light text-fg mb-4">
              {meta.locale === "es" ? "Consejos Pro" : "Pro Tips"}
            </h2>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">-</span>
                  <span className="text-fg-secondary">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="border-t border-border mt-16 pt-8">
          <Link
            href="/checklist"
            className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All checklists
          </Link>
        </footer>
      </article>
    </main>
  );
}
