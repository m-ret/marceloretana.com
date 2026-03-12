import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPseoContent } from "@/lib/pseo";
import type { Comparison } from "@/lib/pseo-types";

export const metadata: Metadata = {
  title: "Tool Comparisons | Marcelo Retana",
  description:
    "Honest, detailed comparisons of popular web frameworks, AI tools, and developer platforms.",
  alternates: { canonical: "https://marceloretana.com/compare" },
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
        <h1 className="text-3xl md:text-4xl font-light text-fg mb-4">Tool Comparisons</h1>
        <p className="text-fg-secondary mb-12">
          Honest, side-by-side comparisons with scores, criteria breakdowns, and clear verdicts.
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
                  {item.meta.locale === "es" ? "Espanol" : "English"}
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
