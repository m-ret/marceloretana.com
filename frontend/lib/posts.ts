import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  featuredImage?: string;
  tags?: string[];
  lang: "en" | "es";
}

export function getAllPosts(): Post[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        content,
        publishedAt: data.publishedAt || data.date || new Date().toISOString(),
        featuredImage: data.featuredImage || data.image,
        tags: data.tags || [],
        lang: data.lang || "en",
      } satisfies Post;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const extensions = [".md", ".mdx"];

  for (const ext of extensions) {
    const fullPath = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        content,
        publishedAt: data.publishedAt || data.date || new Date().toISOString(),
        featuredImage: data.featuredImage || data.image,
        tags: data.tags || [],
        lang: data.lang || "en",
      };
    }
  }

  return null;
}

export function getPostsByLang(lang: "en" | "es"): Post[] {
  return getAllPosts().filter((post) => post.lang === lang);
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx?$/, ""));
}
