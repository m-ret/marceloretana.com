import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@/components/blog/blocks-renderer";
import { getBlogPostBySlug, getBlogPosts, getStrapiImageUrl } from "@/lib/strapi";

export const revalidate = 60; // ISR - revalidate every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Marcelo Retana`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getStrapiImageUrl(post.featuredImage);

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-black">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-neutral-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {post.publishedAt && (
            <time className="text-neutral-500 text-sm">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mt-4 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-neutral-400">{post.excerpt}</p>
        </header>

        {/* Featured image */}
        {imageUrl && (
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-neutral-300 prose-headings:text-white prose-headings:font-light prose-a:text-white prose-a:underline prose-strong:text-white">
          <BlocksRenderer content={post.content} />
        </div>

        {/* Footer */}
        <footer className="border-t border-neutral-800 mt-16 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-neutral-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
