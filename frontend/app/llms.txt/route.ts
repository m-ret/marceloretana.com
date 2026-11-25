import { getAllPosts } from "@/lib/posts";
import { getBuildStories, workPath } from "@/lib/work";

export const dynamic = "force-static";

const siteUrl = "https://marceloretana.com";

export function GET() {
  const posts = getAllPosts();
  const stories = getBuildStories("en");

  const blogLines = posts
    .map(
      (post) => `- [${post.title}](https://marceloretana.com/blog/${post.slug}): ${post.excerpt}`
    )
    .join("\n");

  const caseStudyLines = stories
    .map((story) => `- [${story.title}](${siteUrl}${story.path}): ${story.excerpt}`)
    .join("\n");

  const content = `# Marcelo Retana

> Full-stack developer with 10+ years of experience building high-converting websites, web apps, mobile apps, and MVPs. Specializes in performance-first development with Next.js, SEO optimization, and AI search visibility. Based in Costa Rica, delivering worldwide.

## About

- [Portfolio](https://marceloretana.com): Main site with work experience, client testimonials, services, and contact information
- [Work](${siteUrl}${workPath("en")}): First-person build stories from real projects, with the decisions and trade-offs behind each one
- [Blog](https://marceloretana.com/blog): Technical articles on web development, AI developer tools, SEO, and lead generation

## Services

- MVP & Prototype Development: Launch-ready MVPs and demos for startups. Fast turnaround from idea to working product.
- Professional Websites: High-converting business websites with modern design, fast performance, and SEO optimization.
- Web & Mobile Apps: Full-stack web applications and React Native mobile apps built for scale.
- Ecommerce Development: Custom online stores, Shopify apps, and ecommerce solutions that drive sales.
- AI Workflow Integration: Custom AI integrations and automated workflows using modern LLM tools.

## Tech Stack

- Frontend: React, Next.js, TypeScript, Tailwind CSS, React Native
- Backend: Node.js, GraphQL, PostgreSQL, AWS, Docker
- AI & Tooling: Claude Code, MCP servers, AI-powered development workflows

## Case Studies

First-person build stories, one per project: the decisions, the trade-offs and what I'd tell an owner planning something similar. Each story has a Spanish twin under ${siteUrl}${workPath("es", "<same-slug>")} and a company version on https://gexpsoftware.com/work/<same-slug>.

English index: ${siteUrl}${workPath("en")}
Spanish index: ${siteUrl}${workPath("es")}

${caseStudyLines}

## Blog Posts

${blogLines}

## Contact

- [Book a Call](https://cal.com/marcelo-retana): Schedule a free consultation
- [GitHub](https://github.com/m-ret): Open source work and projects
- [LinkedIn](https://linkedin.com/in/marceloretana): Professional profile
- Email: info@gexpsoftware.com
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
