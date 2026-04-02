import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function PostSkeleton() {
  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-16 py-8 border-b border-neutral-800 -mx-4 px-4">
      <div>
        <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse" />
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="h-7 w-3/4 bg-neutral-800 rounded animate-pulse mb-3" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="hidden md:block w-32 h-20 bg-neutral-800 rounded animate-pulse flex-shrink-0" />
      </div>
    </div>
  );
}

export default function BlogLoading() {
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

        {/* Skeleton posts */}
        <div className="border-t border-neutral-800">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    </main>
  );
}
