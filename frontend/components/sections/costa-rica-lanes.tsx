import Link from "next/link";

const laneCards = [
  {
    eyebrow: "Para negocios en Costa Rica",
    title: "¿Tiene un negocio en Costa Rica y necesita una página web que se vea seria?",
    description:
      "Servicios en español para negocios que necesitan presencia en línea, una mejor imagen y una forma más clara de recibir consultas.",
    href: "/cr",
    cta: "Ver servicios para Costa Rica",
    points: [
      "Páginas web y rediseños",
      "Servicios para constructoras, clínicas, turismo y negocios locales",
      "Cotización más clara por formulario",
    ],
  },
  {
    eyebrow: "For foreign-owned businesses in Costa Rica",
    title: "Do you run a foreign-owned business in Costa Rica and need a stronger website?",
    description:
      "English-language service pages for businesses that want direct communication, clearer scope, and a serious local web partner.",
    href: "/costa-rica",
    cta: "Explore English services",
    points: [
      "Web development and redesigns",
      "Direct English communication",
      "Costa Rica context with cleaner follow-up",
    ],
  },
];

export function CostaRicaLanes() {
  return (
    <section className="bg-bg px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.28em] text-fg-muted">Costa Rica Services</p>
          <h2 className="mt-4 text-3xl font-light leading-tight text-fg md:text-5xl">
            Start in the version that fits your business.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-secondary md:text-xl">
            If your business operates in Costa Rica, use the Spanish side. If you prefer to work in
            English, use the English side.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {laneCards.map((lane) => (
            <article
              key={lane.href}
              className="flex h-full flex-col justify-between border-t border-border pt-8"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-fg-muted">{lane.eyebrow}</p>
              <h3 className="mt-5 max-w-xl text-2xl font-light leading-tight text-fg md:text-4xl">
                {lane.title}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-secondary md:text-lg">
                {lane.description}
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-fg-secondary">
                {lane.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-yellow-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={lane.href}
                className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-fg transition-colors hover:text-fg-secondary"
              >
                <span>{lane.cta}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
