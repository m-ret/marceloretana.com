import Link from "next/link";
import { ContactForm } from "@/components/sections/contact-form";
import type { MarketHub, MarketPage } from "@/lib/market-page-types";

type MarketEntry = MarketHub | MarketPage;

type MarketLandingPageProps = {
  entry: MarketEntry;
  relatedPages: MarketPage[];
};

const sectionClass = "border-t border-border pt-8";

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
  const formNotes =
    entry.locale === "es"
      ? [
          "Respuesta por email en menos de 24 horas.",
          "WhatsApp sigue disponible, pero el seguimiento principal queda por email.",
        ]
      : [
          "Reply by email within 24 hours.",
          "WhatsApp can stay secondary, but the main follow-up stays in email.",
        ];
  const relatedHeading = isPage
    ? copy.related
    : entry.locale === "es"
      ? "Todas las paginas"
      : "All pages";

  const primaryCtaClass =
    "inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-fg transition-colors hover:text-fg-secondary";

  const secondaryCtaClass =
    "inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-fg-muted transition-colors hover:text-fg";

  const tertiaryCtaClass =
    "inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-fg-muted transition-colors hover:text-fg";

  return (
    <main lang={entry.locale} className="min-h-screen bg-bg text-fg">
      <section className="px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-16">
        <div className="max-w-6xl">
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

          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-14">
            {renderCta(entry.cta.primaryHref, entry.cta.primaryLabel, primaryCtaClass)}
            {entry.cta.secondaryHref && entry.cta.secondaryLabel
              ? renderCta(entry.cta.secondaryHref, entry.cta.secondaryLabel, secondaryCtaClass)
              : null}
            {entry.cta.tertiaryHref && entry.cta.tertiaryLabel
              ? renderCta(entry.cta.tertiaryHref, entry.cta.tertiaryLabel, tertiaryCtaClass)
              : null}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {entry.proof.map((item) => (
              <div key={`${item.title}-${item.metric ?? ""}`} className={sectionClass}>
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
      </section>

      <section className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-6xl">
          <ContactForm
            locale={locale}
            sourcePage={entry.path}
            className="border-b-0 py-0"
            header={{
              eyebrow: copy.formEyebrow,
              title: copy.formTitle,
              description: copy.formDescription,
              notes: formNotes,
            }}
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-2 mt-16 max-w-6xl">
          <div className={sectionClass}>
            <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">{copy.summary}</p>
            <h2 className="text-2xl md:text-3xl font-light mb-4">{entry.title}</h2>
            <p className="text-fg-secondary leading-relaxed">{entry.intro}</p>
          </div>

          <div className={sectionClass}>
            <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">
              {entry.locale === "es" ? "Palabras clave" : "Primary keywords"}
            </p>
            <div className="flex flex-wrap gap-3">
              {entry.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] text-fg-secondary"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {isPage ? (
          <div className="grid gap-10 lg:grid-cols-3 mt-16 max-w-6xl">
            <section className={sectionClass}>
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

            <section className={sectionClass}>
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

            <section className={sectionClass}>
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

        <section className={`${sectionClass} mt-16 max-w-6xl`}>
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

        <section className={`${sectionClass} mt-16 max-w-6xl`}>
          <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-6">{relatedHeading}</p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="border-t border-border pt-4 transition-colors hover:text-fg-secondary"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-fg-muted mb-3">
                  {page.hero.eyebrow}
                </p>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-fg leading-relaxed">{page.title}</span>
                  <span aria-hidden="true" className="text-fg-muted">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
