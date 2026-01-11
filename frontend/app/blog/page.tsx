import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, getStrapiImageUrl } from "@/lib/strapi";

export const revalidate = 60; // ISR - revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-black">
      <div className="max-w-6xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-neutral-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back home
        </Link>

        {/* Header */}
        <header className="mb-24">
          <p className="text-white text-sm uppercase tracking-widest mb-8">Blog</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
            Thoughts &
            <br />
            Insights.
          </h1>
        </header>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="border-t border-neutral-800">
            {posts.map((post) => {
              const imageUrl = getStrapiImageUrl(post.featuredImage);
              return (
                <Link
                  key={post.documentId}
                  href={`/blog/${post.slug}`}
                  className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-16 py-8 border-b border-neutral-800 group hover:bg-neutral-900/30 transition-colors -mx-4 px-4"
                >
                  <div>
                    <time className="text-sm text-neutral-500">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex gap-8">
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl text-white font-light mb-3 group-hover:text-neutral-300 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-neutral-400 line-clamp-2">{post.excerpt}</p>
                    </div>
                    {imageUrl && (
                      <div className="hidden md:block relative w-32 h-20 rounded overflow-hidden flex-shrink-0">
                        <Image src={imageUrl} alt={post.title} fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="border-t border-neutral-800 pt-24 text-center">
            <p className="text-neutral-500 text-lg">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
