import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { ContactForm } from "@/components/sections/contact-form";
import { getPostBySlug, getPostsByLang } from "@/lib/posts";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostsByLang("es").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Publicación no encontrada",
    };
  }

  const url = `https://marceloretana.com/es/blog/${slug}`;

  const languages: Record<string, string> = {
    es: url,
    "x-default": post.alternate ? `https://marceloretana.com/blog/${post.alternate}` : url,
  };
  if (post.alternate) {
    languages.en = `https://marceloretana.com/blog/${post.alternate}`;
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Marcelo Retana"],
      tags: post.tags,
      locale: "es_CR",
      alternateLocale: "en_US",
      siteName: "Marcelo Retana",
      images: [
        {
          url: `https://marceloretana.com/es/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`https://marceloretana.com/es/blog/${slug}/twitter-image`],
    },
  };
}

export default async function BlogPostEsPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://marceloretana.com/es" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://marceloretana.com/es/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://marceloretana.com/es/blog/${slug}`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `https://marceloretana.com/es/blog/${slug}`,
    inLanguage: "es",
    keywords: post.tags?.join(", "),
    author: {
      "@type": "Person",
      name: "Marcelo Retana",
      url: "https://marceloretana.com",
      jobTitle: "Senior Software Developer",
      worksFor: {
        "@type": "Organization",
        name: "GEXP Software",
      },
    },
    publisher: {
      "@type": "Person",
      name: "Marcelo Retana",
      url: "https://marceloretana.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://marceloretana.com/es/blog/${slug}`,
    },
  };

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/es/blog"
          className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {post.publishedAt && (
            <time className="text-fg-secondary text-sm">
              {new Date(post.publishedAt).toLocaleDateString("es-CR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
        <div className="prose prose-lg max-w-none prose-headings:font-light prose-a:underline hover:prose-a:opacity-80 prose-pre:bg-bg-tertiary">
          <MarkdownRenderer content={post.content} />
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-light text-fg mb-2">¿Quiere trabajar conmigo?</h2>
          <p className="text-sm text-fg-muted mb-0">
            Desarrollo sitios web, apps y MVPs. Cuénteme sobre su proyecto.
          </p>
          <ContactForm locale="cr" sourcePage={`/es/blog/${slug}`} />
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-16 pt-8">
          <Link
            href="/es/blog"
            className="inline-flex items-center text-fg-secondary hover:text-fg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a todas las publicaciones
          </Link>
        </footer>
      </article>
    </main>
  );
}
