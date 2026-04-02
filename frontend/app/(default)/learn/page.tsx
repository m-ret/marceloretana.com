import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPseoContent } from "@/lib/pseo";
import type { Stack } from "@/lib/pseo-types";

export const metadata: Metadata = {
  title: "Build Guides | Marcelo Retana",
  description:
    "Secondary library of build guides with code snippets, prerequisites, and step-by-step instructions.",
  alternates: { canonical: "https://marceloretana.com/learn" },
  robots: {
    index: false,
    follow: true,
  },
};

const difficultyColors = {
  beginner: "text-green-500 border-green-500/30",
  intermediate: "text-yellow-500 border-yellow-500/30",
  advanced: "text-red-500 border-red-500/30",
};

export default function LearnIndex() {
  const guides = getAllPseoContent<Stack>("stacks");

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/resources"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Resources
        </Link>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">Library</p>
        <h1 className="text-3xl md:text-4xl font-light text-fg mb-4">Build Guides</h1>
        <p className="max-w-2xl text-fg-secondary mb-12">
          Technical build guides and stack walkthroughs kept as secondary material. Helpful if you
          want to study the implementation side, but separate from the Costa Rica service lanes.
        </p>
        <div className="space-y-3">
          {guides.map((item) => (
            <Link
              key={item.meta.slug}
              href={`/learn/${item.meta.slug}`}
              className="group flex items-center justify-between p-5 border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div>
                <h2 className="text-lg text-fg group-hover:text-accent transition-colors">
                  {item.seo.title}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded ${difficultyColors[item.difficulty]}`}
                  >
                    {item.difficulty}
                  </span>
                  <span className="text-sm text-fg-muted">~{item.estimated_time}</span>
                  <span className="text-sm text-fg-muted">{item.steps.length} steps</span>
                </div>
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
