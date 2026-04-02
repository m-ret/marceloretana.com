import fs from "fs";
import path from "path";

const PSEO_DIR = path.join(process.cwd(), "content/pseo");

type ContentType = "comparisons" | "checklists" | "resources" | "stacks";

/**
 * Get all JSON files for a given content type.
 */
export function getPseoSlugs(type: ContentType): string[] {
  const dir = path.join(PSEO_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

/**
 * Read and parse a single pSEO content file.
 */
export function getPseoContent<T>(type: ContentType, slug: string): T | null {
  const filePath = path.join(PSEO_DIR, type, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

/**
 * Get all content for a given type (for listing pages, sitemaps, etc.).
 */
export function getAllPseoContent<T>(type: ContentType): T[] {
  const slugs = getPseoSlugs(type);
  return slugs
    .map((slug) => getPseoContent<T>(type, slug))
    .filter((item): item is T => item !== null);
}

/**
 * Get content filtered by locale.
 */
export function getPseoContentByLocale<T extends { meta: { locale: string } }>(
  type: ContentType,
  locale: "en" | "es"
): T[] {
  return getAllPseoContent<T>(type).filter((item) => item.meta.locale === locale);
}

/**
 * Get the alternate locale slug for hreflang linking.
 * Convention: EN slugs have no suffix, ES slugs end with "-es".
 */
export function getAlternateSlug(slug: string, currentLocale: "en" | "es"): string {
  if (currentLocale === "en") {
    return `${slug}-es`;
  }
  return slug.replace(/-es$/, "");
}

/**
 * Check if an alternate locale version exists.
 */
export function hasAlternate(type: ContentType, slug: string, currentLocale: "en" | "es"): boolean {
  const altSlug = getAlternateSlug(slug, currentLocale);
  const filePath = path.join(PSEO_DIR, type, `${altSlug}.json`);
  return fs.existsSync(filePath);
}

/**
 * Get content by URL slug and locale.
 * ES files use a "-es" suffix on disk but the URL slug omits it.
 */
export function getPseoContentByUrlSlug<T>(
  type: ContentType,
  urlSlug: string,
  locale: "en" | "es"
): T | null {
  const fileSlug = locale === "es" ? `${urlSlug}-es` : urlSlug;
  return getPseoContent<T>(type, fileSlug);
}

/**
 * Get all URL slugs for ES content of a given type.
 * Strips the "-es" suffix so the slug matches the URL, not the filename.
 */
export function getEsPseoSlugs(type: ContentType): string[] {
  return getPseoSlugs(type)
    .filter((slug) => slug.endsWith("-es"))
    .map((slug) => slug.replace(/-es$/, ""));
}
