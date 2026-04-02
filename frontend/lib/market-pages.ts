import { enCrHub, enCrMarketPages } from "@/content/market-pages/en-cr";
import { esCrHub, esCrMarketPages } from "@/content/market-pages/es-cr";
import type { MarketDataset, MarketHub, MarketMachine, MarketPage } from "@/lib/market-page-types";

const marketDatasets: Record<MarketMachine, MarketDataset> = {
  "en-cr": {
    hub: enCrHub,
    pages: enCrMarketPages,
  },
  "es-cr": {
    hub: esCrHub,
    pages: esCrMarketPages,
  },
};

export function getMarketHub(machine: MarketMachine): MarketHub {
  return marketDatasets[machine].hub;
}

export function getAllMarketHubs(): MarketHub[] {
  return Object.values(marketDatasets).map((dataset) => dataset.hub);
}

export function getMarketPagesByMachine(machine: MarketMachine): MarketPage[] {
  return marketDatasets[machine].pages;
}

export function getAllMarketPages(): MarketPage[] {
  return Object.values(marketDatasets).flatMap((dataset) => dataset.pages);
}

export function getAllMarketEntries(): Array<MarketHub | MarketPage> {
  return [...getAllMarketHubs(), ...getAllMarketPages()];
}

export function getMarketPage(machine: MarketMachine, slug: string): MarketPage | null {
  return getMarketPagesByMachine(machine).find((page) => page.slug === slug) ?? null;
}

export function getRelatedMarketPages(
  machine: MarketMachine,
  slug: string,
  limit?: number
): MarketPage[] {
  const page = getMarketPage(machine, slug);
  if (!page) return [];

  const pages = getMarketPagesByMachine(machine);
  const maxItems = typeof limit === "number" ? limit : Math.max(pages.length - 1, 0);
  const pagesBySlug = new Map(pages.map((item) => [item.slug, item]));
  const selected: MarketPage[] = [];
  const seen = new Set<string>();

  page.relatedSlugs.forEach((relatedSlug) => {
    const match = pagesBySlug.get(relatedSlug);
    if (!match || seen.has(match.slug)) return;
    seen.add(match.slug);
    selected.push(match);
  });

  if (selected.length < maxItems) {
    pages.forEach((candidate) => {
      if (candidate.slug === slug || seen.has(candidate.slug)) return;
      seen.add(candidate.slug);
      selected.push(candidate);
    });
  }

  return selected.slice(0, maxItems);
}

export function getAlternateMarketEntry(path: string): MarketHub | MarketPage | null {
  const entry = getAllMarketEntries().find((item) => item.path === path);
  if (!entry?.alternatePath) return null;
  return getAllMarketEntries().find((item) => item.path === entry.alternatePath) ?? null;
}
