---
title: "What Is llms.txt and How to Add It to Your Website"
excerpt: "AI models are reading your website right now — but they're guessing what matters. llms.txt is a new standard that lets you tell them directly. Here's what it is, who's using it, and how to implement it in Next.js."
publishedAt: 2026-02-18
lang: en
tags:
  - AI search optimization
  - SEO
  - llms.txt
  - Next.js
  - web development
---

AI models are reading your website right now. ChatGPT, Claude, Perplexity, Gemini — they're all crawling your pages, scraping your HTML, and trying to figure out what your site is about.

The problem? They're guessing. They're parsing navigation menus, sidebars, cookie banners, and footer links alongside your actual content. They have no way to know what's important and what's noise.

**llms.txt fixes that.**

## What Is llms.txt?

`llms.txt` is a markdown file served at the root of your website (`yoursite.com/llms.txt`) that provides a structured, LLM-friendly summary of your site. Think of it as `robots.txt` for the AI era — except instead of telling crawlers what they *can't* access, you're telling AI models what they *should* know.

The idea was proposed by Jeremy Howard (co-founder of fast.ai and answer.ai) and published as a specification at [llmstxt.org](https://llmstxt.org/). The reasoning is simple: websites are designed for humans. They use complex layouts, JavaScript rendering, navigation trees, and visual hierarchy to communicate. LLMs don't see any of that. They see raw text. And raw text from a modern website is full of noise.

`llms.txt` gives LLMs a clean, structured document that says: "Here's who we are, here's what we do, and here's what matters."

## The Spec

The format is straightforward markdown with a few conventions:

1. **H1 heading** (required) — your site or project name
2. **Blockquote** — a one-line summary
3. **Body text** — optional details
4. **H2 sections** — organized lists of links with descriptions

Here's what it looks like in practice:

```markdown
# Your Company Name

> One-line description of what you do.

## About

- [Homepage](https://yoursite.com): Main site description
- [Blog](https://yoursite.com/blog): What you write about

## Services

- Service One: What it is and who it's for
- Service Two: Description

## Blog Posts

- [Post Title](https://yoursite.com/blog/post-slug): Brief excerpt

## Contact

- [Book a Call](https://yoursite.com/call): CTA description
- Email: hello@yoursite.com
```

That's it. No JSON schemas. No XML namespaces. Just markdown that any LLM can parse instantly.

## Who's Using It

This isn't some obscure proposal sitting in a GitHub issue. Major companies have adopted `llms.txt`:

- **Anthropic** ([anthropic.com/llms.txt](https://docs.anthropic.com/llms.txt)) — the company behind Claude
- **Cloudflare** — uses it across their developer docs
- **Stripe** — provides structured API documentation via llms.txt
- **Vercel** — the company behind Next.js
- **Mintlify** — documentation platform, built-in llms.txt support
- **ReadMe** — API documentation platform with automatic llms.txt generation

The pattern is clear: if your content matters to AI, you should be controlling how AI sees it.

## Why It Matters for Your Business

If you've read my post on [why your website isn't generating leads](/blog/why-your-website-isnt-generating-leads), you know I'm focused on websites that actually do something for your business. `llms.txt` is the next piece of that puzzle.

Here's the shift that's happening: **people are searching with AI, not just Google.**

When someone asks ChatGPT "who builds fast MVPs in Costa Rica" or asks Perplexity "best Next.js developer for hire," the answer comes from what these models know about your site. If your site is a wall of JavaScript with no clear structure, the model might not surface you at all.

`llms.txt` gives you direct influence over how AI models understand and represent your business. It's the same principle as SEO — you're optimizing for the systems that connect people to your services. The systems are just evolving.

This is what I call **AI search optimization**, and it's already part of how I build every client project. Your `robots.txt` tells crawlers they're welcome. Your `llms.txt` tells them what to pay attention to.

## How to Implement llms.txt in Next.js

There are two approaches: a static file or a dynamic route handler. I recommend the route handler because it lets you include dynamic content like blog posts automatically.

### The Route Handler Approach

Create `app/llms.txt/route.ts`:

```typescript
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const blogLines = posts
    .map(
      (post) =>
        `- [${post.title}](https://yoursite.com/blog/${post.slug}): ${post.excerpt}`
    )
    .join("\n");

  const content = `# Your Site Name

> One-line description of your site.

## About

- [Homepage](https://yoursite.com): What your site is
- [Blog](https://yoursite.com/blog): What you write about

## Blog Posts

${blogLines}

## Contact

- [Book a Call](https://yoursite.com/call): Schedule a consultation
- Email: hello@yoursite.com
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
```

Key details:

- **`export const dynamic = "force-static"`** — this generates the file at build time, so it doesn't run on every request. Your llms.txt is baked into the deployment.
- **`getAllPosts()`** — pulls your blog posts dynamically, so you never have to manually update the file when you publish new content.
- **`Content-Type: text/plain`** — serves it as plain text, which is what LLMs expect.

### The Static File Approach

If your content doesn't change often, you can just drop a `llms.txt` file in your `public/` directory:

```
public/llms.txt
```

This works, but you'll need to update it manually whenever you add blog posts or change your services. The route handler is better for any site with dynamic content.

### Point robots.txt to It

Add a reference in your `robots.txt` so crawlers know where to find it:

```
# LLMs
Llms-Txt: https://yoursite.com/llms.txt
```

This follows the same convention as the `Sitemap:` directive. Not all crawlers look for it yet, but it's cheap to add and future-proofs your setup.

## What to Include (and What Not To)

**Include:**
- Your name or company name and what you do
- Key services or products with brief descriptions
- Blog posts with titles, URLs, and excerpts
- Contact info and CTAs (booking links, email)
- Tech stack or expertise areas (if relevant to how people find you)

**Don't include:**
- Your entire website content (keep it concise)
- Internal pages that aren't useful for understanding your business
- Sensitive information (API keys, internal tools, admin pages)
- Marketing fluff — LLMs don't respond to hype, they respond to clear information

The goal is a clean, factual summary. Write it like you're briefing a very smart assistant who needs to understand your business in 30 seconds.

## The Bigger Picture

We're in the early innings of a fundamental shift in how people discover businesses and services online. Google isn't going away, but AI-powered search is growing fast. People are asking Claude, ChatGPT, and Perplexity for recommendations instead of typing keywords into a search bar.

Your website needs to work for both audiences: humans who browse and AI models that read. `robots.txt` handles crawler permissions. `sitemap.xml` handles page discovery. `llms.txt` handles AI comprehension.

It takes 15 minutes to implement. The upside is that every AI model that reads your site gets a clean, accurate picture of who you are and what you do.

## Frequently Asked Questions

### Does llms.txt replace robots.txt or sitemap.xml?

No. They serve different purposes. `robots.txt` controls crawler access permissions. `sitemap.xml` helps search engines discover your pages. `llms.txt` provides a structured summary specifically for AI language models. You should have all three.

### Will adding llms.txt improve my Google ranking?

Not directly. Google's ranking algorithm doesn't use llms.txt. But as AI-powered search features (like Google's AI Overviews) become more prominent, having a clear, structured summary of your site can influence how AI systems understand and recommend your content.

### Is llms.txt an official web standard?

It's a community proposal, not a W3C or IETF standard. But it has significant adoption from major tech companies including Anthropic, Cloudflare, Stripe, and Vercel. The spec is published at [llmstxt.org](https://llmstxt.org/) and is actively maintained.

### How often should I update my llms.txt?

If you use the route handler approach, blog posts update automatically on every build. For other content (services, descriptions), update whenever your offerings change. There's no crawl frequency to worry about — AI models read it when they visit your site.

### Can I have different llms.txt files for different languages?

The spec doesn't address multilingual content specifically. The pragmatic approach is to include your primary language in `llms.txt` and note that content is available in other languages, linking to the relevant pages. AI models handle multilingual content well.

---

**Want your website optimized for both search engines and AI models?** I build high-converting, performance-first websites with SEO and AI search optimization baked in from day one. [Book a free consultation](https://cal.com/marcelo-retana) and let's talk about what your site should be doing for your business.
