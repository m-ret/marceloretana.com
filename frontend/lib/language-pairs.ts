const staticPairs: Record<string, string> = {
  "/costa-rica": "/es",
  "/es": "/costa-rica",
  "/costa-rica/website-cost": "/es/cuanto-cuesta",
  "/es/cuanto-cuesta": "/costa-rica/website-cost",
  "/costa-rica/redesign": "/es/rediseno",
  "/es/rediseno": "/costa-rica/redesign",
  "/costa-rica/lead-generation": "/es/generar-clientes",
  "/es/generar-clientes": "/costa-rica/lead-generation",
  "/costa-rica/real-estate": "/es/constructoras",
  "/es/constructoras": "/costa-rica/real-estate",
  "/costa-rica/healthcare": "/es/clinicas",
  "/es/clinicas": "/costa-rica/healthcare",
  "/costa-rica/tourism": "/es/turismo",
  "/es/turismo": "/costa-rica/tourism",
  "/costa-rica/quote": "/es/cotizacion",
  "/es/cotizacion": "/costa-rica/quote",
  "/contact": "/es/contacto",
  "/es/contacto": "/contact",
  "/blog": "/es/blog",
  "/es/blog": "/blog",
};

export function getAlternatePath(currentPath: string): string | null {
  return staticPairs[currentPath] ?? null;
}

function isHubFallbackExcluded(path: string): boolean {
  if (path === "/es/blog" || path.startsWith("/es/blog/")) return true;
  if (path === "/es/compare" || path.startsWith("/es/compare/")) return true;
  if (path.startsWith("/blog/")) return true;
  if (path.startsWith("/compare/")) return true;
  if (path.startsWith("/learn/")) return true;
  if (path.startsWith("/checklist/")) return true;
  if (path.startsWith("/resources/")) return true;
  return false;
}

/**
 * When there is no 1:1 translation, suggests the opposite services hub (/es ↔ /costa-rica).
 * Returns null if an exact pair exists, the path is excluded, or the path is not under /es or /costa-rica.
 */
export function getLanguageHubFallback(currentPath: string): string | null {
  if (getAlternatePath(currentPath) != null) return null;
  if (isHubFallbackExcluded(currentPath)) return null;
  if (currentPath === "/es" || currentPath.startsWith("/es/")) return "/costa-rica";
  if (currentPath === "/costa-rica" || currentPath.startsWith("/costa-rica/")) return "/es";
  return null;
}

export function isSpanishPath(path: string): boolean {
  return path === "/es" || path.startsWith("/es/");
}

export function getCurrentLocale(path: string): "en" | "es" {
  return isSpanishPath(path) ? "es" : "en";
}
