import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostsByLang, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre sitios web, presencia digital, flujos de WhatsApp y ejecución de producto en Costa Rica.",
  alternates: {
    canonical: "/es/blog",
    languages: {
      en: "/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: "Blog | Marcelo Retana",
    description:
      "Artículos sobre sitios web, presencia digital, flujos de WhatsApp y ejecución de producto en Costa Rica.",
    url: "https://marceloretana.com/es/blog",
    type: "website",
  },
};

const commercialPostSlugs = new Set([
  "5-errores-que-matan-tu-atencion-al-cliente-en-whatsapp",
  "como-construimos-sitios-web-que-funcionan-para-pequenas-empresas",
  "como-manejar-cientos-de-mensajes-de-whatsapp-sin-volverse-loco",
  "como-reducir-tiempos-de-respuesta-en-whatsapp",
  "desde-costa-rica-presencia-digital-para-emprendedores-reales",
  "el-costo-real-de-ignorar-mensajes-de-whatsapp",
  "por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web",
  "por-que-soporte-whatsapp-first-supera-omnicanal-para-pymes-latam",
  "por-que-tu-sitio-web-no-genera-clientes",
  "por-que-whatsapp-es-el-canal-de-soporte-numero-uno",
  "soporte-con-ia-en-whatsapp-se-esta-volviendo-estandar-para-equipos-pequenos",
]);

function PostList({ posts, empty }: { posts: Post[]; empty: string }) {
  if (posts.length === 0) {
    return <p className="py-8 text-fg-muted">{empty}</p>;
  }

  return (
    <div className="border-t border-border">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/es/blog/${post.slug}`}
          className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-16 py-8 border-b border-border group hover:bg-bg-tertiary transition-colors -mx-4 px-4"
        >
          <div>
            {post.publishedAt && (
              <time className="text-sm text-fg-muted">
                {new Date(post.publishedAt).toLocaleDateString("es-CR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                <span>{commercialPostSlugs.has(post.slug) ? "Comercial" : "Nota técnica"}</span>
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

export default function BlogEsPage() {
  const posts = getPostsByLang("es");
  const commercialPosts = posts.filter((post) => commercialPostSlugs.has(post.slug));
  const technicalPosts = posts.filter((post) => !commercialPostSlugs.has(post.slug));
  const hasPosts = posts.length > 0;

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-6xl">
        <Link
          href="/es"
          className="inline-flex items-center text-fg-muted hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>

        <header className="mb-24">
          <p className="text-fg text-sm uppercase tracking-widest mb-8">Artículos</p>
          <h1 className="max-w-5xl text-4xl md:text-6xl lg:text-7xl font-light text-fg leading-tight">
            Notas de campo sobre sitios web,
            <br />
            captación de clientes y
            <br />
            ejecución digital en Costa Rica.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-fg-secondary md:text-xl">
            Los artículos comerciales van primero. Están escritos para dueños de negocio y equipos
            que buscan mejorar su visibilidad, confianza y seguimiento. Las notas técnicas siguen
            públicas, pero están detrás de la historia de servicio.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 text-sm uppercase tracking-[0.24em]">
            <Link href="/blog" className="text-fg transition-colors hover:text-fg-secondary">
              English articles →
            </Link>
            <Link href="/es/contacto" className="text-fg-muted transition-colors hover:text-fg">
              Solicitar cotización →
            </Link>
          </div>
        </header>

        {hasPosts ? (
          <div className="space-y-16">
            <section className="max-w-5xl">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">
                Artículos comerciales
              </p>
              <h2 className="mb-4 text-2xl font-light text-fg md:text-3xl">
                Artículos que apoyan los servicios en Costa Rica.
              </h2>
              <p className="mb-8 max-w-3xl text-sm leading-relaxed text-fg-secondary md:text-base">
                Estos son los posts que ayudan al lado comercial del sitio. Cubren sitios web,
                presencia digital, flujos de respuesta en WhatsApp y las razones por las que los
                negocios pierden confianza o consultas en línea.
              </p>
              <PostList posts={commercialPosts} empty="Aún no hay artículos comerciales." />
            </section>

            <section className="max-w-5xl">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">
                Notas técnicas
              </p>
              <h2 className="mb-4 text-2xl font-light text-fg md:text-3xl">
                Notas de desarrollo, flujos de IA y observaciones de ingeniería.
              </h2>
              <p className="mb-8 max-w-3xl text-sm leading-relaxed text-fg-secondary md:text-base">
                Estos posts siguen siendo parte del sitio, pero son secundarios. Existen como
                evidencia de cómo pienso y construyo, no como el trabajo principal del sitio.
              </p>
              <PostList posts={technicalPosts} empty="Aún no hay notas técnicas." />
            </section>
          </div>
        ) : (
          <div className="border-t border-border pt-24 text-center">
            <p className="text-fg-muted text-lg">Aún no hay publicaciones. ¡Vuelve pronto!</p>
          </div>
        )}
      </div>
    </main>
  );
}
