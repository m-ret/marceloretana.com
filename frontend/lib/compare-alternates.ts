const siteUrl = "https://marceloretana.com";

/**
 * The address of a comparison in the other language, for hreflang.
 *
 * Spanish comparisons live at /es/compare/<slug>; the "-es" on their file names is not part of the
 * address. The old /compare/<slug>-es address only redirects, so it must not be advertised: a
 * hreflang that points at a redirect is ignored by search engines.
 */
export function comparisonAlternateUrl(slug: string, locale: "en" | "es"): string {
  return locale === "en"
    ? `${siteUrl}/es/compare/${slug}`
    : `${siteUrl}/compare/${slug.replace(/-es$/, "")}`;
}
