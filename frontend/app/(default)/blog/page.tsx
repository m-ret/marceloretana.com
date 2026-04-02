import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostsByLang, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Articles on Websites, Lead Capture, and Product Execution",
  description:
    "Buyer-relevant articles on websites, digital presence, WhatsApp workflows, and product execution in Costa Rica, plus selected technical notes from the field.",
  alternates: {
    canonical: "/blog",
    languages: {
      es: "/es/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: "Articles on Websites, Lead Capture, and Product Execution | Marcelo Retana",
    description:
      "Buyer-relevant articles on websites, digital presence, WhatsApp workflows, and product execution in Costa Rica.",
    url: "https://marceloretana.com/blog",
    type: "website",
  },
};

const commercialPostSlugs = new Set([
  "5-errores-que-matan-tu-atencion-al-cliente-en-whatsapp",
  "ai-support-on-whatsapp-is-becoming-standard-for-small-teams",
  "como-construimos-sitios-web-que-funcionan-para-pequenas-empresas",
  "como-manejar-cientos-de-mensajes-de-whatsapp-sin-volverse-loco",
  "como-reducir-tiempos-de-respuesta-en-whatsapp",
  "desde-costa-rica-presencia-digital-para-emprendedores-reales",
  "el-costo-real-de-ignorar-mensajes-de-whatsapp",
  "from-costa-rica-building-digital-presence-for-real-entrepreneurs",
  "how-we-build-websites-that-work-for-small-businesses",
  "por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web",
  "por-que-soporte-whatsapp-first-supera-omnicanal-para-pymes-latam",
  "por-que-tu-sitio-web-no-genera-clientes",
  "por-que-whatsapp-es-el-canal-de-soporte-numero-uno",
  "scaling-whatsapp-support-without-hiring-a-call-center",
  "soporte-con-ia-en-whatsapp-se-esta-volviendo-estandar-para-equipos-pequenos",
  "whatsapp-business-api-explained-for-business-owners",
  "why-local-businesses-lose-customers-without-a-website",
  "why-whatsapp-first-support-beats-omnichannel-for-latam-smbs",
  "why-your-website-isnt-generating-leads",
]);

function localeLabel(locale: "en" | "es") {
  return locale === "es" ? "Español" : "English";
}

function PostList({ posts, empty }: { posts: Post[]; empty: string }) {
  if (posts.length === 0) {
    return <p className="py-8 text-fg-muted">{empty}</p>;
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
                  post.lang === "en" ? "en-US" : "es-CR",
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
              <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                <span>{localeLabel(post.lang)}</span>
                <span>{commercialPostSlugs.has(post.slug) ? "Commercial" : "Technical note"}</span>
              </div>
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
  const posts = getPostsByLang("en");
  const commercialPosts = posts.filter((post) => commercialPostSlugs.has(post.slug));
  const technicalPosts = posts.filter((post) => !commercialPostSlugs.has(post.slug));
  const hasPosts = posts.length > 0;

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center text-fg-muted hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back home
        </Link>

        <header className="mb-24">
          <p className="text-fg text-sm uppercase tracking-widest mb-8">Articles</p>
          <h1 className="max-w-5xl text-4xl md:text-6xl lg:text-7xl font-light text-fg leading-tight">
            Field notes on websites,
            <br />
            lead capture, and
            <br />
            digital execution in Costa Rica.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-fg-secondary md:text-xl">
            The commercial articles come first. They are written for business owners and teams
            trying to fix visibility, trust, and follow-up. The technical notes stay public, but
            they sit behind the service story instead of competing with it.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 text-sm uppercase tracking-[0.24em]">
            <Link href="/es" className="text-fg transition-colors hover:text-fg-secondary">
              Para negocios en Costa Rica →
            </Link>
            <Link href="/costa-rica" className="text-fg transition-colors hover:text-fg-secondary">
              For foreign-owned businesses →
            </Link>
            <Link href="/contact" className="text-fg-muted transition-colors hover:text-fg">
              Request a quote →
            </Link>
          </div>
        </header>

        {hasPosts ? (
          <div className="space-y-16">
            <section className="max-w-5xl">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">
                Business and buyer articles
              </p>
              <h2 className="mb-4 text-2xl font-light text-fg md:text-3xl">
                Articles that support the Costa Rica service lanes.
              </h2>
              <p className="mb-8 max-w-3xl text-sm leading-relaxed text-fg-secondary md:text-base">
                These are the posts that actually help the commercial side of the site. They cover
                websites, digital presence, WhatsApp response flow, and the reasons businesses lose
                trust or inquiries online.
              </p>
              <PostList posts={commercialPosts} empty="No commercial articles published yet." />
            </section>

            <section className="max-w-5xl">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">
                Technical notes
              </p>
              <h2 className="mb-4 text-2xl font-light text-fg md:text-3xl">
                Build notes, AI workflows, and engineering observations.
              </h2>
              <p className="mb-8 max-w-3xl text-sm leading-relaxed text-fg-secondary md:text-base">
                These posts are still part of the site, but they are secondary. They exist as
                evidence of how I think and build, not as the primary job of the website.
              </p>
              <PostList posts={technicalPosts} empty="No technical notes published yet." />
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
