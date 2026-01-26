import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-fg-muted hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {post.publishedAt && (
            <time className="text-fg-muted text-sm">
              {new Date(post.publishedAt).toLocaleDateString(
                post.lang === "es" ? "es-CR" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-fg mt-4 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-fg-secondary">{post.excerpt}</p>
        </header>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-fg prose-headings:text-fg prose-headings:font-light prose-a:text-accent prose-a:underline hover:prose-a:text-accent-secondary prose-strong:text-fg prose-code:text-accent prose-pre:bg-bg-tertiary prose-blockquote:border-border prose-blockquote:text-fg-muted prose-li:text-fg">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Footer */}
        <footer className="border-t border-border mt-16 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-fg-muted hover:text-fg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
