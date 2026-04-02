import Link from "next/link";

const laneCards = [
  {
    eyebrow: "Para negocios en Costa Rica",
    title: "Sitios web y páginas de servicio para verse más serios y recibir más consultas.",
    description:
      "Pensado para negocios locales que hoy dependen demasiado de redes sociales, referencias o WhatsApp para explicar todo.",
    href: "/cr",
    cta: "Ver servicios en español",
    points: [
      "Páginas web para negocios y servicios",
      "Rediseños con mejor credibilidad y claridad",
      "Cotización por formulario, no por mensajes sueltos",
    ],
  },
  {
    eyebrow: "For foreign-owned businesses in Costa Rica",
    title: "Costa Rica web and app execution with direct English communication.",
    description:
      "Built for expats, foreign-owned businesses, and local operators who want a stronger website, clearer scope, and less agency friction.",
    href: "/costa-rica",
    cta: "Explore the English lane",
    points: [
      "Web development and redesigns",
      "Founder-led execution with local context",
      "Email-first quote flow with clearer follow-up",
    ],
  },
];

export function CostaRicaLanes() {
  return (
    <section className="bg-bg px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 border-t border-border pt-8 md:grid-cols-[220px_1fr] md:gap-16">
          <div>
            <p className="text-lg font-medium uppercase tracking-widest text-fg">Costa Rica</p>
          </div>

          <div>
            <h2 className="max-w-4xl text-3xl font-light leading-tight text-fg md:text-5xl">
              Choose the lane that matches the way your business buys.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-secondary md:text-xl">
              The site now starts with two commercial paths. One speaks to Costa Rica business
              owners in Spanish. The other speaks to foreign-owned businesses that want direct
              communication in English and a serious local partner.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {laneCards.map((lane) => (
            <article key={lane.href} className="border-t border-border pt-8">
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
