#!/usr/bin/env bun

import { enCrHub, enCrMarketPages } from "@/content/market-pages/en-cr";
import { esCrHub, esCrMarketPages } from "@/content/market-pages/es-cr";
import { marketDatasetSchema } from "@/lib/market-page-types";

const datasets = [
  {
    machine: "es-cr",
    hub: esCrHub,
    pages: esCrMarketPages,
  },
  {
    machine: "en-cr",
    hub: enCrHub,
    pages: enCrMarketPages,
  },
] as const;

for (const dataset of datasets) {
  const result = marketDatasetSchema.safeParse(dataset);
  if (!result.success) {
    console.error(`\n${dataset.machine} validation failed`);
    for (const issue of result.error.issues) {
      console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
  }

  const slugSet = new Set<string>();
  for (const page of dataset.pages) {
    if (slugSet.has(page.slug)) {
      console.error(`Duplicate slug "${page.slug}" in ${dataset.machine}`);
      process.exit(1);
    }
    slugSet.add(page.slug);

    for (const relatedSlug of page.relatedSlugs) {
      if (!dataset.pages.find((candidate) => candidate.slug === relatedSlug)) {
        console.error(`Missing related slug "${relatedSlug}" in ${dataset.machine}/${page.slug}`);
        process.exit(1);
      }
    }
  }
}

console.log("Market pages valid");
