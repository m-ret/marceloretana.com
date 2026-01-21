import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogPostLoading() {
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

        {/* Header skeleton */}
        <header className="mb-12">
          <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse mb-4" />
          <div className="h-12 w-3/4 bg-neutral-800 rounded animate-pulse mb-6" />
          <div className="space-y-2">
            <div className="h-6 w-full bg-neutral-800 rounded animate-pulse" />
            <div className="h-6 w-2/3 bg-neutral-800 rounded animate-pulse" />
          </div>
        </header>

        {/* Featured image skeleton */}
        <div className="relative aspect-video mb-12 rounded-lg overflow-hidden bg-neutral-800 animate-pulse" />

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
          <div className="h-8 w-1/2 bg-neutral-800 rounded animate-pulse mt-8" />
          <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-neutral-800 rounded animate-pulse" />
        </div>
      </article>
    </main>
  );
}
