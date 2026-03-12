/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://marceloretana.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  additionalPaths: async (config) => {
    const fs = require("fs");
    const path = require("path");
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
    } else if (path === "/resources") {
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
