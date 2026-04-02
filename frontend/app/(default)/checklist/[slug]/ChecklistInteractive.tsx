"use client";

import { useCallback, useEffect, useState } from "react";

interface ChecklistItem {
  id: string;
  text: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  priority: "critical" | "important" | "nice-to-have";
}
interface ChecklistSection {
  name: string;
  description: string;
  items: ChecklistItem[];
}
interface Props {
  sections: ChecklistSection[];
  locale: "en" | "es";
  slug: string;
}

const diffColors = {
  beginner: "text-green-500 border-green-500/30",
  intermediate: "text-yellow-500 border-yellow-500/30",
  advanced: "text-red-500 border-red-500/30",
};
const prioLabels = {
  critical: { en: "Critical", es: "Critico" },
  important: { en: "Important", es: "Importante" },
  "nice-to-have": { en: "Nice to have", es: "Opcional" },
};

export default function ChecklistInteractive({ sections, locale, slug }: Props) {
  const key = `pseo-checklist-${slug}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const s = localStorage.getItem(key);
      if (s) setChecked(new Set(JSON.parse(s)));
    } catch {
      /* ignore */
    }
  }, [key]);

  const toggle = useCallback(
    (id: string) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        try {
          localStorage.setItem(key, JSON.stringify([...next]));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [key]
  );

  const total = sections.reduce((s, sec) => s + sec.items.length, 0);
  const done = checked.size;
  const pct = total > 0 ? (done / total) * 100 : 0;

  return (
    <div>
      {/* Progress */}
      <div className="border border-border rounded-lg p-6 mb-12">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-fg-muted uppercase tracking-wider">
            {locale === "es" ? "Progreso" : "Progress"}
          </span>
          <span className="text-sm text-accent">
            {done}/{total} ({Math.round(pct)}%)
          </span>
        </div>
        <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {sections.map((section, si) => (
        <section key={si} className="mb-12">
          <h2 className="text-xl font-light text-fg mb-2">{section.name}</h2>
          <p className="text-sm text-fg-secondary mb-6">{section.description}</p>
          <div className="space-y-2">
            {section.items.map((item) => {
              const isChecked = checked.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`w-full text-left p-4 border rounded-lg transition-all cursor-pointer ${isChecked ? "border-accent/30 bg-accent/5" : "border-border hover:border-border"}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 border-2 rounded shrink-0 mt-0.5 flex items-center justify-center transition-colors ${isChecked ? "border-accent bg-accent" : "border-border"}`}
                    >
                      {isChecked && (
                        <svg viewBox="0 0 12 12" className="w-3 h-3 text-white">
                          <path
                            fill="currentColor"
                            d="M10.28 2.28a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06L4.25 7.22l4.97-4.94a.75.75 0 0 1 1.06 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-base ${isChecked ? "text-fg-muted line-through" : "text-fg"}`}
                      >
                        {item.text}
                      </span>
                      <p
                        className={`text-sm mt-1 ${isChecked ? "text-fg-muted" : "text-fg-secondary"}`}
                      >
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded ${diffColors[item.difficulty]}`}
                        >
                          {item.difficulty}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-fg-muted">
                          {prioLabels[item.priority][locale]}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
