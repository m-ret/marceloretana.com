import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPseoContent } from "@/lib/pseo";
import type { Comparison } from "@/lib/pseo-types";

export const metadata: Metadata = {
  title: "Technical Comparisons | Marcelo Retana",
  description:
    "Secondary library of technical comparisons across frameworks, AI tools, and developer platforms.",
  alternates: { canonical: "https://marceloretana.com/compare" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CompareIndex() {
  const comparisons = getAllPseoContent<Comparison>("comparisons");

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
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">Library</p>
        <h1 className="text-3xl md:text-4xl font-light text-fg mb-4">Technical Comparisons</h1>
        <p className="max-w-2xl text-fg-secondary mb-12">
          Side-by-side tool comparisons kept as part of the technical library. Useful reference
          material, but secondary to the Costa Rica service lanes on this site.
        </p>
        <div className="space-y-3">
          {comparisons.map((item) => (
            <Link
              key={item.meta.slug}
              href={`/compare/${item.meta.slug}`}
              className="group flex items-center justify-between p-5 border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div>
                <h2 className="text-lg text-fg group-hover:text-accent transition-colors">
                  {item.tools[0].name} vs {item.tools[1].name}
                </h2>
                <span className="text-sm text-fg-muted">
                  {item.meta.locale === "es" ? "Español" : "English"}
                </span>
              </div>
              <span className="text-fg-muted group-hover:text-accent transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
