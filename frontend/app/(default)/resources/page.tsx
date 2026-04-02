import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPseoContent, getPseoContentByLocale } from "@/lib/pseo";
import type { Checklist, Comparison, Resource, Stack } from "@/lib/pseo-types";

export const metadata: Metadata = {
  title: "Technical Library | Marcelo Retana",
  description:
    "Secondary technical library with comparisons, checklists, and build guides. The main commercial paths for this site live under /cr and /costa-rica.",
  alternates: { canonical: "https://marceloretana.com/resources" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ResourcesHub() {
  const resources = getPseoContentByLocale<Resource>("resources", "en");
  const comparisons = getAllPseoContent<Comparison>("comparisons");
  const checklists = getAllPseoContent<Checklist>("checklists");
  const guides = getAllPseoContent<Stack>("stacks");

  const sections = [
    {
      title: "Comparisons",
      description: "Side-by-side notes on frameworks, tools, and platform choices.",
      href: "/compare",
      count: comparisons.length,
    },
    {
      title: "Checklists",
      description: "Interactive checklists for launches, audits, and implementation work.",
      href: "/checklist",
      count: checklists.length,
    },
    {
      title: "Guides",
      description: "Step-by-step build guides and implementation walkthroughs.",
      href: "/learn",
      count: guides.length,
    },
  ];

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Home
        </Link>
        <header className="mb-16 max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-fg-muted">Library</p>
          <h1 className="text-4xl font-light text-fg leading-tight md:text-6xl">
            Technical library,
            <br />
            kept secondary on purpose.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-fg-secondary md:text-xl">
            This section keeps the comparisons, checklists, and build notes public. It is useful,
            but it is not the main job of the site. If you are here because you need a website,
            redesign, or product execution in Costa Rica, start with the commercial lanes below.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm uppercase tracking-[0.24em]">
            <Link href="/es" className="text-fg transition-colors hover:text-fg-secondary">
              Para negocios en Costa Rica →
            </Link>
            <Link href="/costa-rica" className="text-fg transition-colors hover:text-fg-secondary">
              For foreign-owned businesses →
            </Link>
            <Link href="/contact" className="text-fg-muted transition-colors hover:text-fg">
              Request a quote →
            </Link>
          </div>
        </header>

        <section className="mb-16 border-t border-border pt-8">
          <div className="grid gap-6 md:grid-cols-3">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="border-t border-border pt-4 transition-colors hover:text-fg-secondary"
              >
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                  {section.count} entries
                </p>
                <h2 className="mb-3 text-lg text-fg">{section.title}</h2>
                <p className="text-sm leading-relaxed text-fg-secondary">{section.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">Resource lists</p>
            <h2 className="mb-4 text-2xl font-light text-fg md:text-3xl">
              Curated references by stack and tooling category.
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-fg-secondary md:text-base">
              Useful if you are comparing implementation options. Not the first place to start if
              you are trying to hire me for a website or product build.
            </p>
          </div>
        </section>

        {resources.length > 0 && (
          <section>
            <div className="border-t border-border">
              {resources.map((resource) => (
                <Link
                  key={resource.meta.slug}
                  href={`/resources/${resource.meta.slug}`}
                  className="group grid gap-4 border-b border-border py-8 md:grid-cols-[220px_1fr]"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                      {resource.total_items} resources
                    </p>
                  </div>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-xl text-fg transition-colors group-hover:text-fg-secondary">
                        {resource.seo.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                        {resource.introduction}
                      </p>
                    </div>
                    <span className="text-fg-muted transition-colors group-hover:text-fg-secondary">
                      &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 border-t border-border pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">Commercial path</p>
          <h2 className="mb-4 text-2xl font-light text-fg md:text-3xl">
            If you need execution, leave the library and go to the right lane.
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-fg-secondary md:text-base">
            The technical library stays public because it is useful. The commercial path for this
            site is still simple: choose the Costa Rica lane that matches your business, then
            request a quote with proper context.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm uppercase tracking-[0.24em]">
            <Link href="/es" className="text-fg transition-colors hover:text-fg-secondary">
              Para negocios en Costa Rica →
            </Link>
            <Link href="/costa-rica" className="text-fg transition-colors hover:text-fg-secondary">
              For foreign-owned businesses →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
