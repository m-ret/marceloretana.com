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

export function isSpanishPath(path: string): boolean {
  return path === "/es" || path.startsWith("/es/");
}

export function getCurrentLocale(path: string): "en" | "es" {
  return isSpanishPath(path) ? "es" : "en";
}
