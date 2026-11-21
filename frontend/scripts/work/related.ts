/** Cross-link rules for build stories: related stories and the service pages a story is proof for. */

export const MAX_RELATED_PAGES = 3;

/** The slice of a market page entry these rules read. */
export type MarketIndexEntry = { locale: "en" | "es"; alternatePath?: string };

function findDuplicates(values: readonly string[]): string[] {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

/**
 * Returns one message per broken rule, or an empty list.
 *
 * Related stories must exist, not point at the story itself, and not repeat. Related pages are
 * English market paths whose `alternatePath` is a Spanish market page, so the Spanish story can
 * link the Spanish twin.
 */
export function checkRelated(
  slug: string,
  relatedStories: readonly string[],
  relatedPages: readonly string[],
  knownSlugs: readonly string[],
  market: ReadonlyMap<string, MarketIndexEntry>
): string[] {
  const errors: string[] = [];

  for (const related of relatedStories) {
    if (related === slug) errors.push(`relatedStories: "${related}" is the story itself`);
    else if (!knownSlugs.includes(related))
      errors.push(`relatedStories: unknown story "${related}"`);
  }
  for (const duplicate of findDuplicates(relatedStories)) {
    errors.push(`relatedStories: "${duplicate}" is listed twice`);
  }

  if (relatedPages.length > MAX_RELATED_PAGES) {
    errors.push(`relatedPages: ${relatedPages.length} pages; at most ${MAX_RELATED_PAGES}`);
  }
  for (const duplicate of findDuplicates(relatedPages)) {
    errors.push(`relatedPages: "${duplicate}" is listed twice`);
  }
  for (const path of relatedPages) {
    const english = market.get(path);
    if (!english) {
      errors.push(`relatedPages: "${path}" is not a market page`);
      continue;
    }
    if (english.locale !== "en") {
      errors.push(`relatedPages: "${path}" must be the English page`);
      continue;
    }
    const twin = english.alternatePath ? market.get(english.alternatePath) : undefined;
    if (twin?.locale !== "es") {
      errors.push(`relatedPages: "${path}" has no Spanish twin through alternatePath`);
    }
  }

  return errors;
}
