import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      // === Spanish market pages -> /es/ ===
      { source: "/cr", destination: "/es", permanent: true },
      { source: "/cr/paginas-web-costa-rica", destination: "/es", permanent: true },
      { source: "/cr/diseno-web-costa-rica", destination: "/es", permanent: true },
      { source: "/cr/desarrollo-web-costa-rica", destination: "/es", permanent: true },
      { source: "/cr/seo-costa-rica", destination: "/es", permanent: true },
      { source: "/cr/cuanto-cuesta-pagina-web", destination: "/es/cuanto-cuesta", permanent: true },
      {
        source: "/cr/por-que-necesita-sitio-web",
        destination: "/es/blog/por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web",
        permanent: true,
      },
      {
        source: "/cr/sitio-web-que-genere-clientes",
        destination: "/es/generar-clientes",
        permanent: true,
      },
      { source: "/cr/cotizacion", destination: "/es/cotizacion", permanent: true },
      { source: "/cr/constructoras", destination: "/es/constructoras", permanent: true },
      { source: "/cr/clinicas", destination: "/es/clinicas", permanent: true },
      { source: "/cr/turismo", destination: "/es/turismo", permanent: true },
      { source: "/cr/rediseno-sitio-web", destination: "/es/rediseno", permanent: true },
      { source: "/cr/servicios", destination: "/es", permanent: true },
      { source: "/cr/negocios-servicios", destination: "/es", permanent: true },
      { source: "/cr/consultorios", destination: "/es/clinicas", permanent: true },
      { source: "/cr/portafolio", destination: "/es", permanent: true },
      { source: "/cr/casos", destination: "/es", permanent: true },
      { source: "/cr/proceso", destination: "/es", permanent: true },

      // === English market pages -> consolidated ===
      { source: "/costa-rica/web-development", destination: "/costa-rica", permanent: true },
      { source: "/costa-rica/web-design", destination: "/costa-rica", permanent: true },
      { source: "/costa-rica/web-development-agency", destination: "/costa-rica", permanent: true },
      {
        source: "/costa-rica/nearshore-web-development",
        destination: "/costa-rica",
        permanent: true,
      },
      {
        source: "/costa-rica/expat-business-web-development",
        destination: "/costa-rica",
        permanent: true,
      },
      {
        source: "/costa-rica/website-cost-costa-rica",
        destination: "/costa-rica/website-cost",
        permanent: true,
      },
      {
        source: "/costa-rica/website-redesign-costa-rica",
        destination: "/costa-rica/redesign",
        permanent: true,
      },
      {
        source: "/costa-rica/lead-generation-websites-costa-rica",
        destination: "/costa-rica/lead-generation",
        permanent: true,
      },
      { source: "/costa-rica/request-a-quote", destination: "/costa-rica/quote", permanent: true },
      { source: "/costa-rica/software-development", destination: "/costa-rica", permanent: true },
      { source: "/costa-rica/why-costa-rica", destination: "/costa-rica", permanent: true },
      {
        source: "/costa-rica/service-business-web-development",
        destination: "/costa-rica",
        permanent: true,
      },
      {
        source: "/costa-rica/real-estate-web-development",
        destination: "/costa-rica/real-estate",
        permanent: true,
      },
      {
        source: "/costa-rica/healthcare-web-development",
        destination: "/costa-rica/healthcare",
        permanent: true,
      },
      {
        source: "/costa-rica/tourism-web-development",
        destination: "/costa-rica/tourism",
        permanent: true,
      },

      // === Spanish blog posts -> /es/blog/ ===
      {
        source: "/blog/5-errores-que-matan-tu-atencion-al-cliente-en-whatsapp",
        destination: "/es/blog/5-errores-que-matan-tu-atencion-al-cliente-en-whatsapp",
        permanent: true,
      },
      {
        source:
          "/blog/anthropic-midio-millones-de-agentes-ia-lo-que-los-desarrolladores-deben-saber",
        destination:
          "/es/blog/anthropic-midio-millones-de-agentes-ia-lo-que-los-desarrolladores-deben-saber",
        permanent: true,
      },
      {
        source: "/blog/codex-vs-claude-code-deja-de-cambiar-empieza-a-dominar",
        destination: "/es/blog/codex-vs-claude-code-deja-de-cambiar-empieza-a-dominar",
        permanent: true,
      },
      {
        source: "/blog/como-construimos-sitios-web-que-funcionan-para-pequenas-empresas",
        destination: "/es/blog/como-construimos-sitios-web-que-funcionan-para-pequenas-empresas",
        permanent: true,
      },
      {
        source: "/blog/como-manejar-cientos-de-mensajes-de-whatsapp-sin-volverse-loco",
        destination: "/es/blog/como-manejar-cientos-de-mensajes-de-whatsapp-sin-volverse-loco",
        permanent: true,
      },
      {
        source: "/blog/como-multiplique-mi-productividad-con-claude-code",
        destination: "/es/blog/como-multiplique-mi-productividad-con-claude-code",
        permanent: true,
      },
      {
        source: "/blog/como-reducir-tiempos-de-respuesta-en-whatsapp",
        destination: "/es/blog/como-reducir-tiempos-de-respuesta-en-whatsapp",
        permanent: true,
      },
      {
        source: "/blog/construi-goeasychat-plataforma-whatsapp-multiagente",
        destination: "/es/blog/construi-goeasychat-plataforma-whatsapp-multiagente",
        permanent: true,
      },
      {
        source: "/blog/desde-costa-rica-presencia-digital-para-emprendedores-reales",
        destination: "/es/blog/desde-costa-rica-presencia-digital-para-emprendedores-reales",
        permanent: true,
      },
      {
        source: "/blog/el-costo-real-de-ignorar-mensajes-de-whatsapp",
        destination: "/es/blog/el-costo-real-de-ignorar-mensajes-de-whatsapp",
        permanent: true,
      },
      {
        source:
          "/blog/limites-de-sesion-de-anthropic-estan-cambiando-como-programan-los-power-users",
        destination:
          "/es/blog/limites-de-sesion-de-anthropic-estan-cambiando-como-programan-los-power-users",
        permanent: true,
      },
      {
        source:
          "/blog/mcp-se-esta-convirtiendo-en-la-capa-de-integracion-por-defecto-para-productos-ia",
        destination:
          "/es/blog/mcp-se-esta-convirtiendo-en-la-capa-de-integracion-por-defecto-para-productos-ia",
        permanent: true,
      },
      {
        source: "/blog/por-que-claude-code-se-come-toda-tu-ram",
        destination: "/es/blog/por-que-claude-code-se-come-toda-tu-ram",
        permanent: true,
      },
      {
        source: "/blog/por-que-construyo-mvps-rapido",
        destination: "/es/blog/por-que-construyo-mvps-rapido",
        permanent: true,
      },
      {
        source: "/blog/por-que-los-flujos-hibridos-de-coding-con-ia-ganan-tras-los-limites",
        destination: "/es/blog/por-que-los-flujos-hibridos-de-coding-con-ia-ganan-tras-los-limites",
        permanent: true,
      },
      {
        source: "/blog/por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web",
        destination: "/es/blog/por-que-los-negocios-locales-pierden-clientes-sin-un-sitio-web",
        permanent: true,
      },
      {
        source: "/blog/por-que-soporte-whatsapp-first-supera-omnicanal-para-pymes-latam",
        destination: "/es/blog/por-que-soporte-whatsapp-first-supera-omnicanal-para-pymes-latam",
        permanent: true,
      },
      {
        source: "/blog/por-que-tu-sitio-web-no-genera-clientes",
        destination: "/es/blog/por-que-tu-sitio-web-no-genera-clientes",
        permanent: true,
      },
      {
        source: "/blog/por-que-whatsapp-es-el-canal-de-soporte-numero-uno",
        destination: "/es/blog/por-que-whatsapp-es-el-canal-de-soporte-numero-uno",
        permanent: true,
      },
      {
        source: "/blog/que-es-llms-txt-y-como-agregarlo-a-tu-sitio-web",
        destination: "/es/blog/que-es-llms-txt-y-como-agregarlo-a-tu-sitio-web",
        permanent: true,
      },
      {
        source: "/blog/soporte-con-ia-en-whatsapp-se-esta-volviendo-estandar-para-equipos-pequenos",
        destination:
          "/es/blog/soporte-con-ia-en-whatsapp-se-esta-volviendo-estandar-para-equipos-pequenos",
        permanent: true,
      },
      {
        source: "/blog/whatsapp-business-vs-whatsapp-multiagente",
        destination: "/es/blog/whatsapp-business-vs-whatsapp-multiagente",
        permanent: true,
      },

      // === Spanish comparisons -> /es/compare/ ===
      { source: "/compare/:slug(.*)-es", destination: "/es/compare/:slug", permanent: true },
    ];
  },
};

export default withVercelToolbar()(nextConfig);
