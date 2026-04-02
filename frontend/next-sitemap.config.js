import fs from "fs";
import path from "path";

const MARKET_LASTMOD = "2026-04-01T00:00:00.000Z";

const marketRoutes = [
  "/cr",
  "/cr/servicios",
  "/cr/paginas-web-costa-rica",
  "/cr/diseno-web-costa-rica",
  "/cr/desarrollo-web-costa-rica",
  "/cr/negocios-servicios",
  "/cr/constructoras",
  "/cr/clinicas",
  "/cr/turismo",
  "/cr/cuanto-cuesta-pagina-web",
  "/cr/por-que-necesita-sitio-web",
  "/cr/cotizacion",
  "/costa-rica",
  "/costa-rica/web-development",
  "/costa-rica/web-development-agency",
  "/costa-rica/software-development",
  "/costa-rica/web-design",
  "/costa-rica/why-costa-rica",
  "/costa-rica/service-business-web-development",
  "/costa-rica/real-estate-web-development",
  "/costa-rica/healthcare-web-development",
  "/costa-rica/tourism-web-development",
];

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://marceloretana.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/apple-icon*", "/icon*", "/opengraph-image*", "/twitter-image*", "/llms.txt"],
  additionalPaths: async (config) => {
    const PSEO_DIR = path.join(process.cwd(), "content/pseo");

    function getSlugs(contentDir) {
      const dir = path.join(PSEO_DIR, contentDir);
      if (!fs.existsSync(dir)) return [];
      return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".json"))
        .map((f) => f.replace(/\.json$/, ""));
    }

    const routes = [
      { contentDir: "comparisons", routePrefix: "/compare" },
      { contentDir: "checklists", routePrefix: "/checklist" },
      { contentDir: "resources", routePrefix: "/resources" },
      { contentDir: "stacks", routePrefix: "/learn" },
    ];

    const paths = [];
    for (const { contentDir, routePrefix } of routes) {
      const slugs = getSlugs(contentDir);
      for (const slug of slugs) {
        paths.push({
          loc: `${routePrefix}/${slug}`,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        });
      }
    }

    for (const route of marketRoutes) {
      paths.push({
        loc: route,
        changefreq: "weekly",
        priority: route === "/cr" || route === "/costa-rica" ? 0.95 : 0.85,
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
    } else if (
      path === "/cr" ||
      path === "/costa-rica"
    ) {
      priority = 0.95;
      changefreq = "weekly";
    } else if (
      path.startsWith("/cr/") ||
      path.startsWith("/costa-rica/")
    ) {
      priority = 0.85;
      changefreq = "weekly";
    } else if (
      path === "/compare" ||
      path === "/checklist" ||
      path === "/resources" ||
      path === "/learn"
    ) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (
      path.startsWith("/compare/") ||
      path.startsWith("/checklist/") ||
      path.startsWith("/resources/") ||
      path.startsWith("/learn/")
    ) {
      priority = 0.7;
      changefreq = "weekly";
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
