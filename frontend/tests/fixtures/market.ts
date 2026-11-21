import { mock } from "bun:test";
import type { MarketHub, MarketPage } from "@/lib/market-page-types";

type FakeEntry = Pick<MarketPage, "locale" | "path" | "title" | "alternatePath"> & {
  hero: { eyebrow: string };
};

function entry(
  locale: FakeEntry["locale"],
  path: string,
  title: string,
  eyebrow: string,
  alternatePath?: string
): MarketHub | MarketPage {
  const fake: FakeEntry = { locale, path, title, hero: { eyebrow }, alternatePath };
  return fake as unknown as MarketHub | MarketPage;
}

/** English and Spanish twins, an English page with no twin, and a Spanish page with no twin. */
export const fakeMarketEntries: Array<MarketHub | MarketPage> = [
  entry("en", "/costa-rica", "English hub", "Hub", "/es"),
  entry("es", "/es", "Hub en español", "Centro", "/costa-rica"),
  entry("en", "/costa-rica/tourism", "Tourism title", "Tourism", "/es/turismo"),
  entry("es", "/es/turismo", "Título de turismo", "Turismo", "/costa-rica/tourism"),
  entry("en", "/costa-rica/redesign", "Redesign title", "Redesign", "/es/rediseno"),
  entry("es", "/es/rediseno", "Título de rediseño", "Rediseño", "/costa-rica/redesign"),
  entry("en", "/costa-rica/orphan", "Orphan title", "Orphan"),
  entry("es", "/es/solo", "Solo título", "Solo"),
];

/** Replaces the market page loader with `fakeMarketEntries`. Call before importing the code under test. */
export function registerMarketMock(): void {
  mock.module("@/lib/market-pages", () => ({ getAllMarketEntries: () => fakeMarketEntries }));
}
