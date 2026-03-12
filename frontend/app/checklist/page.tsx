import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPseoContent } from "@/lib/pseo";
import type { Checklist } from "@/lib/pseo-types";

export const metadata: Metadata = {
  title: "Developer Checklists | Marcelo Retana",
  description:
    "Interactive checklists for launching, optimizing, and securing your web projects. Track your progress and never miss a step.",
  alternates: { canonical: "https://marceloretana.com/checklist" },
};

export default function ChecklistIndex() {
  const checklists = getAllPseoContent<Checklist>("checklists");

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
        <h1 className="text-3xl md:text-4xl font-light text-fg mb-4">Developer Checklists</h1>
        <p className="text-fg-secondary mb-12">
          Interactive checklists with progress tracking. Check items off, come back later — your
          progress is saved.
        </p>
        <div className="space-y-3">
          {checklists.map((item) => (
            <Link
              key={item.meta.slug}
              href={`/checklist/${item.meta.slug}`}
              className="group flex items-center justify-between p-5 border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div>
                <h2 className="text-lg text-fg group-hover:text-accent transition-colors">
                  {item.seo.title}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-fg-muted">{item.total_items} items</span>
                  <span className="text-sm text-fg-muted">~{item.estimated_time}</span>
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
