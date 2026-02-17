import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostsByLang, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog - Web Development, AI & Performance",
  description:
    "Articles on modern web development, AI-powered workflows, performance optimization, and building high-converting websites. By Marcelo Retana.",
  openGraph: {
    title: "Blog - Web Development, AI & Performance | Marcelo Retana",
    description:
      "Articles on modern web development, AI-powered workflows, performance optimization, and building high-converting websites.",
    url: "https://marceloretana.com/blog",
    type: "website",
  },
};

function PostList({ posts, locale }: { posts: Post[]; locale: "en" | "es" }) {
  if (posts.length === 0) {
    return (
      <p className="text-fg-muted py-8">
        {locale === "en" ? "No posts yet." : "No hay publicaciones aún."}
      </p>
    );
  }

  return (
    <div className="border-t border-border">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-16 py-8 border-b border-border group hover:bg-bg-tertiary transition-colors -mx-4 px-4"
        >
          <div>
            {post.publishedAt && (
              <time className="text-sm text-fg-muted">
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === "en" ? "en-US" : "es-CR",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </time>
            )}
          </div>
          <div className="flex gap-8">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl text-fg font-light mb-3 group-hover:text-fg-secondary transition-colors">
                {post.title}
              </h3>
              <p className="text-fg-secondary line-clamp-2">{post.excerpt}</p>
            </div>
            {post.featuredImage && (
              <div className="hidden md:block relative w-32 h-20 rounded overflow-hidden flex-shrink-0">
                <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const englishPosts = getPostsByLang("en");
  const spanishPosts = getPostsByLang("es");
  const hasPosts = englishPosts.length > 0 || spanishPosts.length > 0;

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-6xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-fg-muted hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back home
        </Link>

        {/* Header */}
        <header className="mb-24">
          <p className="text-fg text-sm uppercase tracking-widest mb-8">Blog</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-fg leading-tight">
            Web Development,
            <br />
            AI & Performance.
          </h1>
        </header>

        {hasPosts ? (
          <div className="space-y-16">
            {/* English Posts */}
            <section>
              <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium mb-8">
                English
              </h2>
              <PostList posts={englishPosts} locale="en" />
            </section>

            {/* Spanish Posts */}
            <section>
              <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium mb-8">
                Español
              </h2>
              <PostList posts={spanishPosts} locale="es" />
            </section>
          </div>
        ) : (
          <div className="border-t border-border pt-24 text-center">
            <p className="text-fg-muted text-lg">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
