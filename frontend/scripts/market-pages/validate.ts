#!/usr/bin/env bun

import { enCrHub, enCrMarketPages } from "@/content/market-pages/en-cr";
import { esCrHub, esCrMarketPages } from "@/content/market-pages/es-cr";
import { marketDatasetSchema } from "@/lib/market-page-types";
import { getAllMarketEntries } from "@/lib/market-pages";

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

const allEntries = getAllMarketEntries();
const pathCounts = new Map<string, number>();
for (const entry of allEntries) {
  pathCounts.set(entry.path, (pathCounts.get(entry.path) ?? 0) + 1);
}
const duplicatePaths = [...pathCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([path]) => path);
if (duplicatePaths.length > 0) {
  console.error(`Duplicate market paths: ${duplicatePaths.join(", ")}`);
  process.exit(1);
}

const byPath = new Map(allEntries.map((entry) => [entry.path, entry]));

for (const entry of allEntries) {
  const alternatePath = entry.alternatePath;
  if (alternatePath === undefined) continue;

  const peer = byPath.get(alternatePath);
  if (!peer) {
    console.error(`alternatePath "${alternatePath}" has no market entry (from ${entry.path})`);
    process.exit(1);
  }
  if (peer.alternatePath !== entry.path) {
    console.error(
      `alternatePath reciprocity broken: ${entry.path} -> ${alternatePath}, peer has alternatePath ` +
        `${peer.alternatePath === undefined ? "(omitted)" : JSON.stringify(peer.alternatePath)} ` +
        `(expected ${JSON.stringify(entry.path)})`
    );
    process.exit(1);
  }
}

console.log("Market pages valid");
