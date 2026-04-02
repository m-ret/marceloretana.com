"use client";

import { useMemo, useState } from "react";

interface ResourceItem {
  name: string;
  description: string;
  url: string;
  tags: string[];
  pricing: "free" | "freemium" | "paid" | "open-source";
  highlight?: string;
}

interface ResourceCategory {
  name: string;
  description: string;
  items: ResourceItem[];
}

interface Props {
  categories: ResourceCategory[];
  tags: string[];
  locale: "en" | "es";
}

const pricingColors = {
  free: "text-green-500 border-green-500/30",
  "open-source": "text-green-500 border-green-500/30",
  freemium: "text-yellow-500 border-yellow-500/30",
  paid: "text-red-500 border-red-500/30",
};

export default function ResourceFilter({ categories, tags, locale }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const matchesTag = !selectedTag || item.tags.includes(selectedTag);
          const matchesSearch =
            !search ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
          return matchesTag && matchesSearch;
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, selectedTag, search]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === "es" ? "Buscar recursos..." : "Search resources..."}
          className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-sm text-fg placeholder-fg-muted focus:border-accent/50 focus:outline-none transition-colors"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`text-xs uppercase tracking-wider px-3 py-1.5 border rounded-full transition-colors cursor-pointer ${
              !selectedTag
                ? "border-accent text-accent"
                : "border-border text-fg-secondary hover:border-fg-muted"
            }`}
          >
            {locale === "es" ? "Todos" : "All"}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 border rounded-full transition-colors cursor-pointer ${
                selectedTag === tag
                  ? "border-accent text-accent"
                  : "border-border text-fg-secondary hover:border-fg-muted"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {filtered.map((cat, ci) => (
        <section key={ci} className="mb-12">
          <h2 className="text-xl font-light text-fg mb-2">{cat.name}</h2>
          <p className="text-sm text-fg-secondary mb-6">{cat.description}</p>

          <div className="space-y-3">
            {cat.items.map((item, ii) => (
              <a
                key={ii}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-border rounded-lg hover:border-accent/50 p-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-fg group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded ${pricingColors[item.pricing]}`}
                      >
                        {item.pricing}
                      </span>
                    </div>
                    <p className="text-sm text-fg-secondary mb-3">{item.description}</p>
                    {item.highlight && (
                      <p className="text-sm text-accent/80 mb-3">{item.highlight}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider text-fg-muted border border-border px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-fg-muted group-hover:text-accent transition-colors shrink-0">
                    &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-fg-secondary">
            {locale === "es"
              ? "No se encontraron recursos con esos filtros."
              : "No resources found matching your filters."}
          </p>
        </div>
      )}
    </div>
  );
}
