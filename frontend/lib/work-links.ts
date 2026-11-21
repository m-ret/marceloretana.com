import type { BuildStory, WorkLocale } from "@/content/work/types";
import type { MarketHub, MarketPage } from "@/lib/market-page-types";
import { getAllMarketEntries } from "@/lib/market-pages";
import { getBuildStories } from "@/lib/work";

type MarketEntry = MarketHub | MarketPage;

/** A service page a story links to, already in the story's language. */
export type RelatedPageLink = { path: string; eyebrow: string; title: string };

function indexByPath(entries: MarketEntry[]): Map<string, MarketEntry> {
  return new Map(entries.map((entry) => [entry.path, entry]));
}

/** Stories name English paths; the Spanish page is the English page's `alternatePath`. */
function inLocale(
  english: MarketEntry | undefined,
  locale: WorkLocale,
  byPath: Map<string, MarketEntry>
): MarketEntry | undefined {
  if (!english || locale === "en") return english;
  return english.alternatePath ? byPath.get(english.alternatePath) : undefined;
}

/** The service pages a story is proof for, in the story's own language. */
export function getRelatedPages(story: Pick<BuildStory, "locale" | "relatedPages">) {
  const byPath = indexByPath(getAllMarketEntries());
  const links: RelatedPageLink[] = [];

  for (const englishPath of story.relatedPages) {
    const entry = inLocale(byPath.get(englishPath), story.locale, byPath);
    if (entry) links.push({ path: entry.path, eyebrow: entry.hero.eyebrow, title: entry.title });
  }

  return links;
}

/** The stories that name a service page (given in either language), in registry order. */
export function getStoriesForPage(path: string): BuildStory[] {
  const entry = indexByPath(getAllMarketEntries()).get(path);
  if (!entry) return [];

  const englishPath = entry.locale === "en" ? entry.path : entry.alternatePath;
  if (!englishPath) return [];

  return getBuildStories(entry.locale).filter((story) => story.relatedPages.includes(englishPath));
}
