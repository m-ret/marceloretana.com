import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPseoContent, getPseoContentByLocale } from "@/lib/pseo";
import type { Checklist, Comparison, Resource, Stack } from "@/lib/pseo-types";

export const metadata: Metadata = {
  title: "Developer Resources & Tools | Marcelo Retana",
  description:
    "Curated developer resources, tool comparisons, checklists, and guides. Find the best tools for your next project.",
  alternates: { canonical: "https://marceloretana.com/resources" },
};

export default function ResourcesHub() {
  const resources = getPseoContentByLocale<Resource>("resources", "en");
  const comparisons = getAllPseoContent<Comparison>("comparisons");
  const checklists = getAllPseoContent<Checklist>("checklists");
  const guides = getAllPseoContent<Stack>("stacks");

  const sections = [
    {
      title: "Compare Tools",
      description: "Side-by-side comparisons of popular frameworks and tools",
      href: "/compare",
      count: comparisons.length,
    },
    {
      title: "Checklists",
      description: "Interactive checklists to ensure you don't miss anything",
      href: "/checklist",
      count: checklists.length,
    },
    {
      title: "Learn",
      description: "Step-by-step guides for building projects with modern stacks",
      href: "/learn",
      count: guides.length,
    },
  ];

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-light text-fg mb-4">Developer Resources</h1>
        <p className="text-fg-secondary mb-12">
          Curated tools, comparisons, checklists, and guides to help you build better software
          faster.
        </p>

        {/* Content type cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
            >
              <h2 className="text-lg text-fg group-hover:text-accent transition-colors mb-2">
                {section.title}
              </h2>
              <p className="text-sm text-fg-secondary mb-3">{section.description}</p>
              {section.count > 0 && (
                <span className="text-xs text-fg-muted">{section.count} available</span>
              )}
            </Link>
          ))}
        </div>

        {/* Resource lists */}
        {resources.length > 0 && (
          <section>
            <h2 className="text-2xl font-light text-fg mb-8">Resource Lists</h2>
            <div className="space-y-3">
              {resources.map((resource) => (
                <Link
                  key={resource.meta.slug}
                  href={`/resources/${resource.meta.slug}`}
                  className="group flex items-center justify-between p-5 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <div>
                    <h3 className="text-lg text-fg group-hover:text-accent transition-colors">
                      {resource.seo.title}
                    </h3>
                    <p className="text-sm text-fg-muted mt-1">{resource.total_items} resources</p>
                  </div>
                  <span className="text-fg-muted group-hover:text-accent transition-colors">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border border-border rounded-lg p-8 mt-16 text-center">
          <h2 className="text-xl font-light text-fg mb-3">Need a Custom Solution?</h2>
          <p className="text-fg-secondary mb-6">
            I build high-converting websites and apps. Let&apos;s talk about your project.
          </p>
          <Link
            href="#contact"
            className="inline-block border border-accent text-accent px-6 py-2.5 rounded-full text-sm hover:bg-accent hover:text-white transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </section>
      </div>
    </main>
  );
}
