const MARKET_LASTMOD = "2026-04-01T00:00:00.000Z";

const costaRicaRoutes = [
  "/costa-rica",
  "/costa-rica/quote",
  "/costa-rica/website-cost",
  "/costa-rica/redesign",
  "/costa-rica/lead-generation",
  "/costa-rica/real-estate",
  "/costa-rica/healthcare",
  "/costa-rica/tourism",
];

const esRoutes = [
  { loc: "/es", priority: 0.95, changefreq: "weekly" },
  { loc: "/es/cuanto-cuesta", priority: 0.85, changefreq: "weekly" },
  { loc: "/es/rediseno", priority: 0.85, changefreq: "weekly" },
  { loc: "/es/generar-clientes", priority: 0.85, changefreq: "weekly" },
  { loc: "/es/constructoras", priority: 0.85, changefreq: "weekly" },
  { loc: "/es/clinicas", priority: 0.85, changefreq: "weekly" },
  { loc: "/es/turismo", priority: 0.85, changefreq: "weekly" },
  { loc: "/es/cotizacion", priority: 0.7, changefreq: "monthly" },
  { loc: "/es/contacto", priority: 0.7, changefreq: "monthly" },
];

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://marceloretana.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/api/*",
    "/apple-icon*",
    "/icon*",
    "/opengraph-image*",
    "/twitter-image*",
    "/llms.txt",
  ],
  additionalPaths: async () => {
    const paths = [];

    for (const route of costaRicaRoutes) {
      paths.push({
        loc: route,
        changefreq: "weekly",
        priority: route === "/costa-rica" ? 0.95 : 0.85,
        lastmod: MARKET_LASTMOD,
      });
    }

    for (const route of esRoutes) {
      paths.push({
        loc: route.loc,
        changefreq: route.changefreq,
        priority: route.priority,
        lastmod: MARKET_LASTMOD,
      });
    }

    return paths;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    additionalSitemaps: [],
    transformRobotsTxt: async (_, robotsTxt) => {
      return `${robotsTxt}\n# LLMs\nLlms-Txt: https://marceloretana.com/llms.txt\n`;
    },
  },
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === "/") {
      priority = 1.0;
      changefreq = "monthly";
    } else if (path === "/blog") {
      priority = 0.9;
      changefreq = "daily";
    } else if (path.startsWith("/blog/")) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path === "/es") {
      priority = 0.95;
      changefreq = "weekly";
    } else if (path === "/es/blog") {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path.startsWith("/es/blog/")) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.startsWith("/es/compare/")) {
      priority = 0.6;
      changefreq = "monthly";
    } else if (path.startsWith("/es/")) {
      priority = 0.85;
      changefreq = "weekly";
    } else if (path === "/costa-rica") {
      priority = 0.95;
      changefreq = "weekly";
    } else if (path.startsWith("/costa-rica/")) {
      priority = 0.85;
      changefreq = "weekly";
    } else if (
      path.startsWith("/compare/") ||
      path.startsWith("/learn/") ||
      path.startsWith("/checklist/") ||
      path.startsWith("/resources/")
    ) {
      priority = 0.6;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default config;
