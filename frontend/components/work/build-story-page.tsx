import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { workLabels } from "@/components/work/labels";
import { WorkCta } from "@/components/work/work-cta";
import { WorkFigure } from "@/components/work/work-figure";
import type { BuildStory } from "@/content/work/types";
import { workPath } from "@/lib/work";
import { buildStoryJsonLd } from "@/lib/work-seo";

const gutter = "px-6 md:px-12 lg:px-16";
/** The site's label rail (About, Experience), widened for headings; the column keeps a ~70ch measure. */
const rail =
  "grid gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[17.5rem_minmax(0,42.5rem)]";
const heroSizes =
  "(min-width: 1728px) 1600px, (min-width: 1024px) calc(100vw - 8rem), (min-width: 768px) calc(100vw - 6rem), 100vw";
const figureSizes =
  "(min-width: 1280px) 1152px, (min-width: 1024px) calc(100vw - 8rem), (min-width: 768px) calc(100vw - 6rem), 100vw";

export function BuildStoryPage({ story }: { story: BuildStory }) {
  const t = workLabels[story.locale];
  const meta = [
    { label: story.ownProduct ? t.product : t.client, value: story.name },
    { label: t.sector, value: story.sector },
    { label: t.location, value: story.location },
    { label: t.year, value: story.year },
  ];

  return (
    <main className="min-h-screen bg-bg pb-32 text-fg">
      {buildStoryJsonLd(story).map((item) => (
        <script
          key={item["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}

      <article>
        <header className={`${gutter} pt-32 md:pt-40`}>
          <div className="mx-auto max-w-6xl">
            <Link
              href={workPath(story.locale)}
              className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t.allWork}
            </Link>
            <h1 className="mt-12 max-w-5xl text-[clamp(2.25rem,6vw,5rem)] font-light leading-[1.04] tracking-[-0.03em] text-balance wrap-anywhere">
              {story.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-fg-secondary wrap-break-word md:text-2xl md:leading-relaxed">
              {story.excerpt}
            </p>

            <div className="mt-14 flex flex-col gap-8 border-t border-border pt-6 md:flex-row md:items-end md:justify-between">
              <dl className="grid min-w-0 flex-1 grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
                {meta.map((item) => (
                  <div key={item.label} className="min-w-0">
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-base text-fg wrap-anywhere">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={story.liveUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex shrink-0 items-center gap-2 text-sm uppercase tracking-[0.24em] text-fg transition-colors hover:text-fg-secondary"
              >
                {t.visitSite}
                <span aria-hidden="true">↗</span>
                <span className="sr-only">{t.newTab}</span>
              </a>
            </div>
          </div>
        </header>

        <div className={`${gutter} mt-12 md:mt-16`}>
          <div className="mx-auto max-w-[100rem]">
            <WorkFigure image={story.hero} sizes={heroSizes} preload />
          </div>
        </div>

        <div className={gutter}>
          <div className="mx-auto max-w-6xl">
            {story.sections.map((section, index) => {
              const id = `section-${index + 1}`;
              return (
                <section key={id} aria-labelledby={id} className="mt-20 md:mt-28">
                  <div className={`${rail} border-t border-border pt-8 md:pt-10`}>
                    <h2
                      id={id}
                      className="text-2xl font-light leading-snug text-balance wrap-anywhere md:text-3xl"
                    >
                      {section.heading}
                    </h2>
                    <div className="min-w-0 max-w-[42.5rem] space-y-6 text-lg leading-[1.75] text-fg-secondary wrap-break-word">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  {section.image ? (
                    <WorkFigure
                      image={section.image}
                      sizes={figureSizes}
                      className="mt-12 md:mt-16"
                    />
                  ) : null}
                </section>
              );
            })}

            <section
              aria-labelledby="takeaways"
              className={`${rail} -mx-6 mt-24 bg-yellow-400 px-6 py-10 text-black sm:mx-0 sm:p-10 md:mt-32 md:p-12`}
            >
              {/* Marcelo's own advice wears the yellow of his profile card in the home hero. */}
              <h2
                id="takeaways"
                className="text-2xl font-light leading-snug text-balance wrap-anywhere md:text-3xl"
              >
                {t.takeaways}
              </h2>
              <ul className="min-w-0 space-y-5">
                {story.takeaways.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-lg leading-relaxed text-black/85 wrap-break-word md:text-xl md:leading-relaxed"
                  >
                    <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-black" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="stack" className="mt-20 md:mt-28">
              <div className={`${rail} border-t border-border pt-8 md:pt-10`}>
                <h2 id="stack" className="text-sm font-medium uppercase tracking-widest text-fg">
                  {t.stack}
                </h2>
                <ul className="grid min-w-0 grid-cols-2 gap-x-8 sm:grid-cols-3">
                  {story.stack.map((item) => (
                    <li
                      key={item}
                      className="min-w-0 border-b border-border py-3 text-fg-secondary wrap-anywhere"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </article>

      <div className={gutter}>
        <div className="mx-auto max-w-6xl">
          <a
            href={story.caseStudyUrl}
            target="_blank"
            rel="noopener"
            className="group -mx-6 mt-20 block border-y border-border px-6 py-10 transition-colors hover:bg-bg-tertiary sm:mx-0 sm:border sm:p-10 md:mt-28 md:p-12"
          >
            <span className="block text-2xl font-light leading-tight text-fg text-balance wrap-anywhere md:text-4xl">
              {t.caseStudyLink}{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
            <span className="mt-4 block max-w-2xl text-base leading-relaxed text-fg-secondary">
              {t.caseStudyNote}
            </span>
            <span className="sr-only">{t.newTab}</span>
          </a>

          <WorkCta locale={story.locale} className="mt-24 md:mt-32" />

          {story.next.slug !== story.slug ? (
            <nav aria-label={t.next} className="mt-24 border-t border-border md:mt-32">
              <Link
                href={story.next.path}
                className="group flex items-end justify-between gap-6 py-10"
              >
                <span className="min-w-0">
                  <span className="block text-sm text-fg-muted">
                    {t.next} · {story.next.name}
                  </span>
                  <span className="mt-3 block max-w-4xl text-2xl font-light leading-tight text-fg text-balance transition-colors wrap-anywhere group-hover:text-fg-secondary md:text-4xl">
                    {story.next.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-3xl text-fg transition-transform group-hover:translate-x-2 md:text-5xl"
                >
                  →
                </span>
              </Link>
            </nav>
          ) : null}
        </div>
      </div>
    </main>
  );
}
