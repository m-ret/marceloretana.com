import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/sections/contact-form";
import { getAlternateSlug, getPseoContent, getPseoSlugs, hasAlternate } from "@/lib/pseo";
import type { Resource } from "@/lib/pseo-types";
import ShareBar from "../../compare/[slug]/ShareBar";
import ResourceFilter from "./ResourceFilter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPseoSlugs("resources").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPseoContent<Resource>("resources", slug);
  if (!data) return {};

  const url = `https://marceloretana.com/resources/${slug}`;
  const alternates: Metadata["alternates"] = { canonical: url };
  if (hasAlternate("resources", slug, data.meta.locale)) {
    alternates.languages = {
      [data.meta.locale === "en" ? "es" : "en"]:
        `https://marceloretana.com/resources/${getAlternateSlug(slug, data.meta.locale)}`,
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

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const data = getPseoContent<Resource>("resources", slug);
  if (!data) notFound();

  const { categories, seo, meta, introduction, total_items } = data;

  const altSlug = hasAlternate("resources", slug, meta.locale)
    ? getAlternateSlug(slug, meta.locale)
    : undefined;
  const ui =
    meta.locale === "es"
      ? {
          back: "Todos los recursos",
          ctaTitle: "¿Necesita ayuda para elegir las herramientas correctas?",
          ctaBody:
            "He trabajado en producción con muchas de estas herramientas. Puedo ayudarle a elegir lo que mejor se ajusta a su caso real.",
          footer: "Todos los recursos",
        }
      : {
          back: "All resources",
          ctaTitle: "Need help choosing the right tools?",
          ctaBody:
            "I have built production projects with many of these tools. I can help you choose what best fits your real use case.",
          footer: "All resources",
        };

  const allTags = Array.from(
    new Set(categories.flatMap((c) => c.items.flatMap((item) => item.tags)))
  ).sort();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: seo.title,
    description: seo.description,
    numberOfItems: total_items,
    itemListElement: categories.flatMap((cat, ci) =>
      cat.items.map((item, ii) => ({
        "@type": "ListItem",
        position: ci * 20 + ii + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      }))
    ),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://marceloretana.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: meta.locale === "es" ? "Recursos" : "Resources",
        item: "https://marceloretana.com/resources",
      },
      { "@type": "ListItem", position: 3, name: seo.title.split(" for ")[0] || seo.title },
    ],
  };

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="max-w-3xl mx-auto">
        <Link
          href="/resources"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {ui.back}
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-fg mb-6 leading-tight">
            {seo.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-fg-muted mb-4">
            <span>
              {total_items} {meta.locale === "es" ? "recursos" : "resources"}
            </span>
          </div>
          <p className="text-lg text-fg-secondary">{introduction}</p>
          {altSlug && (
            <Link
              href={`/resources/${altSlug}`}
              className="inline-block mt-4 text-sm text-accent hover:underline"
            >
              {meta.locale === "en" ? "Ver en Español" : "View in English"}
            </Link>
          )}
        </header>

        <ShareBar title={seo.title} url={`https://marceloretana.com/resources/${slug}`} />

        <ResourceFilter categories={categories} tags={allTags} locale={meta.locale} />

        <section className="mt-16">
          <h2 className="text-xl font-light text-fg mb-2">{ui.ctaTitle}</h2>
          <p className="text-sm text-fg-muted mb-0">{ui.ctaBody}</p>
          <ContactForm
            locale={meta.locale === "es" ? "cr" : "en"}
            sourcePage={`/resources/${slug}`}
          />
        </section>

        <footer className="border-t border-border mt-16 pt-8">
          <Link
            href="/resources"
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
