import Link from "next/link";
import { ContactForm } from "@/components/sections/contact-form";
import type { MarketHub, MarketPage } from "@/lib/market-page-types";
import { cn } from "@/lib/utils";

type MarketEntry = MarketHub | MarketPage;

type MarketLandingPageProps = {
  entry: MarketEntry;
  relatedPages: MarketPage[];
};

const baseCardClass = "rounded-3xl border border-border bg-bg-tertiary/40 backdrop-blur-sm";

function isMarketPage(entry: MarketEntry): entry is MarketPage {
  return "slug" in entry;
}

function renderCta(href: string, label: string, className: string) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function MarketLandingPage({ entry, relatedPages }: MarketLandingPageProps) {
  const locale = entry.locale === "es" ? "cr" : "en";
  const isPage = isMarketPage(entry);
  const copy =
    entry.locale === "es"
      ? {
          summary: "Resumen",
          problem: "Problemas",
          solution: "Enfoque",
          deliverables: "Entregables",
          faq: "Preguntas frecuentes",
          proof: "Prueba",
          related: "Paginas relacionadas",
          formEyebrow: "Cotizacion",
          formTitle: "Cuente que necesita",
          formDescription:
            "El formulario es la via principal para responder con mejor contexto y dar seguimiento por email.",
        }
      : {
          summary: "Summary",
          problem: "Problems",
          solution: "Approach",
          deliverables: "Deliverables",
          faq: "Frequently asked questions",
          proof: "Proof",
          related: "Related pages",
          formEyebrow: "Quote",
          formTitle: "Tell me what you need",
          formDescription:
            "The form is the primary path because it makes scoping and follow-up much cleaner by email.",
        };

  const primaryCtaClass =
    "inline-flex items-center justify-center rounded-full border border-fg bg-fg px-6 py-3 text-xs uppercase tracking-[0.2em] text-bg transition-colors hover:bg-fg-secondary hover:border-fg-secondary";

  const secondaryCtaClass =
    "inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-fg transition-colors hover:border-fg hover:text-fg";

  const tertiaryCtaClass =
    "inline-flex items-center text-xs uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-fg";

  return (
    <main lang={entry.locale} className="min-h-screen bg-bg text-fg">
      <section className="px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-16">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1.2fr)_420px]">
          <div>
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-fg-muted mb-6">
                {entry.hero.eyebrow}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.02] tracking-tight max-w-5xl">
                {entry.hero.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-lg md:text-xl text-fg-secondary">
                {entry.hero.subheadline}
              </p>
              {entry.hero.supportingText ? (
                <p className="mt-4 max-w-3xl text-sm md:text-base text-fg-muted">
                  {entry.hero.supportingText}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              {renderCta(entry.cta.primaryHref, entry.cta.primaryLabel, primaryCtaClass)}
              {entry.cta.secondaryHref && entry.cta.secondaryLabel
                ? renderCta(entry.cta.secondaryHref, entry.cta.secondaryLabel, secondaryCtaClass)
                : null}
              {entry.cta.tertiaryHref && entry.cta.tertiaryLabel
                ? renderCta(entry.cta.tertiaryHref, entry.cta.tertiaryLabel, tertiaryCtaClass)
                : null}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {entry.proof.map((item) => (
                <div
                  key={`${item.title}-${item.metric ?? ""}`}
                  className={cn(baseCardClass, "p-6")}
                >
                  {item.metric ? (
                    <p className="text-sm uppercase tracking-[0.2em] text-fg-muted mb-4">
                      {item.metric}
                    </p>
                  ) : null}
                  <h2 className="text-lg font-medium mb-2">{item.title}</h2>
                  <p className="text-sm text-fg-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <aside id="lead-form" className={cn(baseCardClass, "xl:sticky xl:top-28 self-start p-8")}>
            <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">
              {copy.formEyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-light mb-4">{copy.formTitle}</h2>
            <p className="text-sm text-fg-secondary mb-0">{copy.formDescription}</p>
            <ContactForm locale={locale} sourcePage={entry.path} className="mt-2 border-b-0 py-8" />
          </aside>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={cn(baseCardClass, "p-8")}>
            <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">{copy.summary}</p>
            <h2 className="text-2xl md:text-3xl font-light mb-4">{entry.title}</h2>
            <p className="text-fg-secondary leading-relaxed">{entry.intro}</p>
          </div>

          <div className={cn(baseCardClass, "p-8")}>
            <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">
              {entry.locale === "es" ? "Palabras clave" : "Primary keywords"}
            </p>
            <div className="flex flex-wrap gap-3">
              {entry.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] text-fg-secondary"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {isPage ? (
          <div className="grid gap-6 lg:grid-cols-3 mt-6">
            <section className={cn(baseCardClass, "p-8")}>
              <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">
                {copy.problem}
              </p>
              <h2 className="text-2xl font-light mb-4">{entry.problemTitle}</h2>
              <ul className="space-y-3 text-sm text-fg-secondary">
                {entry.problemPoints.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className={cn(baseCardClass, "p-8")}>
              <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">
                {copy.solution}
              </p>
              <h2 className="text-2xl font-light mb-4">{entry.solutionTitle}</h2>
              <ul className="space-y-3 text-sm text-fg-secondary">
                {entry.solutionPoints.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className={cn(baseCardClass, "p-8")}>
              <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">
                {copy.deliverables}
              </p>
              <h2 className="text-2xl font-light mb-4">{entry.deliverablesTitle}</h2>
              <ul className="space-y-3 text-sm text-fg-secondary">
                {entry.deliverables.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] mt-6">
          <section className={cn(baseCardClass, "p-8")}>
            <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">{copy.faq}</p>
            <div className="space-y-6">
              {entry.faq.map((item) => (
                <div key={item.question}>
                  <h2 className="text-lg font-medium mb-2">{item.question}</h2>
                  <p className="text-sm text-fg-secondary leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className={cn(baseCardClass, "p-8")}>
            <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">{copy.related}</p>
            <div className="space-y-3">
              {(isPage ? relatedPages : relatedPages.slice(0, 6)).map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="block rounded-2xl border border-border px-4 py-4 text-sm text-fg-secondary transition-colors hover:text-fg hover:border-fg"
                >
                  {page.hero.eyebrow}
                </Link>
              ))}
              {!isPage
                ? entry.featuredLinks.map((item) => (
                    <Link
                      key={item.slug}
                      href={`${entry.path}/${item.slug}`}
                      className="block rounded-2xl border border-border px-4 py-4 text-sm text-fg-secondary transition-colors hover:text-fg hover:border-fg"
                    >
                      {item.label}
                    </Link>
                  ))
                : null}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
