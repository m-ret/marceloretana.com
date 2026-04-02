import { getCaseProofs } from "@/content/case-proofs";

type CaseProofSectionProps = {
  locale: "es" | "en";
  caseProofIds?: string[];
};

export function CaseProofSection({ locale, caseProofIds }: CaseProofSectionProps) {
  const proofs = getCaseProofs(caseProofIds);

  if (!proofs.length) return null;

  const copy =
    locale === "es"
      ? {
          eyebrow: "Prueba",
          title: "Proyectos reales que ayudan a bajar el riesgo antes de cotizar.",
          viewProject: "Ver proyecto",
        }
      : {
          eyebrow: "Proof",
          title: "Real projects that reduce risk before someone requests a quote.",
          viewProject: "View project",
        };

  return (
    <section className="border-t border-border pt-8">
      <p className="text-xs uppercase tracking-[0.3em] text-fg-muted mb-4">{copy.eyebrow}</p>
      <h2 className="max-w-4xl text-2xl font-light leading-tight text-fg md:text-4xl">
        {copy.title}
      </h2>
      <div className="mt-10 grid gap-8 xl:grid-cols-2">
        {proofs.map((proof) => (
          <article key={proof.id} className="border-t border-border pt-5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-medium text-fg">{proof.title}</h3>
              <span className="text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                {proof.sector}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-fg-secondary">{proof.summary}</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fg-secondary">
              {proof.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-yellow-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {proof.quote ? (
              <blockquote className="mt-6 border-l border-border pl-4 text-sm text-fg-secondary">
                <p>&ldquo;{proof.quote.text}&rdquo;</p>
                <footer className="mt-3 text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                  {proof.quote.author}, {proof.quote.role}, {proof.quote.source}
                </footer>
              </blockquote>
            ) : null}
            {proof.href ? (
              <a
                href={proof.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-fg transition-colors hover:text-fg-secondary"
              >
                <span>{copy.viewProject}</span>
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
