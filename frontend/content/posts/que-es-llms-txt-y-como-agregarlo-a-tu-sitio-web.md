---
title: "Qué Es llms.txt y Cómo Agregarlo a Tu Sitio Web"
excerpt: "Los modelos de IA están leyendo tu sitio web ahora mismo — pero están adivinando qué es importante. llms.txt es un nuevo estándar que te permite decirles directamente. Acá te explico qué es, quién lo usa, y cómo implementarlo en Next.js."
publishedAt: 2026-02-18
lang: es
alternate: what-is-llms-txt-and-how-to-add-it-to-your-website
tags:
  - optimización IA
  - SEO
  - llms.txt
  - Next.js
  - desarrollo web
---

Los modelos de IA están leyendo tu sitio web ahora mismo. ChatGPT, Claude, Perplexity, Gemini — todos están rastreando tus páginas, parseando tu HTML, e intentando entender de qué se trata tu sitio.

El problema? Están adivinando. Parsean menús de navegación, sidebars, banners de cookies y links del footer junto con tu contenido real. No tienen forma de saber qué es importante y qué es ruido.

**llms.txt soluciona eso.**

## Qué Es llms.txt?

`llms.txt` es un archivo markdown que se sirve en la raíz de tu sitio web (`tusitio.com/llms.txt`) y provee un resumen estructurado y amigable para LLMs de tu sitio. Pensalo como el `robots.txt` de la era de la IA — excepto que en lugar de decirle a los crawlers qué *no pueden* acceder, le estás diciendo a los modelos de IA qué *deberían* saber.

La idea fue propuesta por Jeremy Howard (co-fundador de fast.ai y answer.ai) y publicada como especificación en [llmstxt.org](https://llmstxt.org/). El razonamiento es simple: los sitios web están diseñados para humanos. Usan layouts complejos, rendering con JavaScript, árboles de navegación y jerarquía visual para comunicar. Los LLMs no ven nada de eso. Ven texto crudo. Y el texto crudo de un sitio web moderno está lleno de ruido.

`llms.txt` le da a los LLMs un documento limpio y estructurado que dice: "Esto es quiénes somos, esto es lo que hacemos, y esto es lo que importa."

## La Especificación

El formato es markdown directo con algunas convenciones:

1. **Encabezado H1** (requerido) — el nombre de tu sitio o proyecto
2. **Blockquote** — un resumen de una línea
3. **Texto del cuerpo** — detalles opcionales
4. **Secciones H2** — listas organizadas de links con descripciones

Así se ve en la práctica:

```markdown
# Nombre de Tu Empresa

> Descripción de una línea de lo que hacés.

## Acerca De

- [Inicio](https://tusitio.com): Descripción del sitio principal
- [Blog](https://tusitio.com/blog): De qué escribís

## Servicios

- Servicio Uno: Qué es y para quién es
- Servicio Dos: Descripción

## Posts del Blog

- [Título del Post](https://tusitio.com/blog/post-slug): Extracto breve

## Contacto

- [Agendar Llamada](https://tusitio.com/call): Descripción del CTA
- Email: hola@tusitio.com
```

Eso es todo. Sin esquemas JSON. Sin namespaces XML. Solo markdown que cualquier LLM puede parsear al instante.

## Quién Lo Está Usando

Esto no es una propuesta oscura en un issue de GitHub. Empresas importantes ya adoptaron `llms.txt`:

- **Anthropic** ([anthropic.com/llms.txt](https://docs.anthropic.com/llms.txt)) — la empresa detrás de Claude
- **Cloudflare** — lo usa en su documentación para desarrolladores
- **Stripe** — provee documentación estructurada de su API vía llms.txt
- **Vercel** — la empresa detrás de Next.js
- **Mintlify** — plataforma de documentación con soporte nativo para llms.txt
- **ReadMe** — plataforma de documentación de APIs con generación automática de llms.txt

El patrón es claro: si tu contenido le importa a la IA, deberías estar controlando cómo la IA lo ve.

## Por Qué Importa Para Tu Negocio

Si leíste mi post sobre [por qué tu sitio web no genera clientes](/blog/por-que-tu-sitio-web-no-genera-clientes), sabés que me enfoco en sitios web que realmente hacen algo por tu negocio. `llms.txt` es la siguiente pieza de ese rompecabezas.

Este es el cambio que está pasando: **la gente está buscando con IA, no solo con Google.**

Cuando alguien le pregunta a ChatGPT "quién hace MVPs rápidos en Costa Rica" o le pregunta a Perplexity "mejor desarrollador Next.js para contratar," la respuesta viene de lo que estos modelos saben sobre tu sitio. Si tu sitio es una pared de JavaScript sin estructura clara, el modelo podría no mostrarte para nada.

`llms.txt` te da influencia directa sobre cómo los modelos de IA entienden y representan tu negocio. Es el mismo principio que el SEO — estás optimizando para los sistemas que conectan personas con tus servicios. Los sistemas simplemente están evolucionando.

A esto le llamo **optimización para búsqueda con IA**, y ya es parte de cómo construyo cada proyecto para clientes. Tu `robots.txt` le dice a los crawlers que son bienvenidos. Tu `llms.txt` les dice a qué prestarle atención.

## Cómo Implementar llms.txt en Next.js

Hay dos enfoques: un archivo estático o un route handler dinámico. Recomiendo el route handler porque te permite incluir contenido dinámico como posts del blog automáticamente.

### El Enfoque del Route Handler

Creá `app/llms.txt/route.ts`:

```typescript
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const blogLines = posts
    .map(
      (post) =>
        `- [${post.title}](https://tusitio.com/blog/${post.slug}): ${post.excerpt}`
    )
    .join("\n");

  const content = `# Nombre de Tu Sitio

> Descripción de una línea de tu sitio.

## Acerca De

- [Inicio](https://tusitio.com): Qué es tu sitio
- [Blog](https://tusitio.com/blog): De qué escribís

## Posts del Blog

${blogLines}

## Contacto

- [Agendar Llamada](https://tusitio.com/call): Agendá una consulta
- Email: hola@tusitio.com
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
```

Detalles clave:

- **`export const dynamic = "force-static"`** — esto genera el archivo en tiempo de build, así no se ejecuta en cada request. Tu llms.txt queda embebido en el deployment.
- **`getAllPosts()`** — trae tus posts del blog dinámicamente, así nunca tenés que actualizar el archivo manualmente cuando publicás contenido nuevo.
- **`Content-Type: text/plain`** — lo sirve como texto plano, que es lo que los LLMs esperan.

### El Enfoque del Archivo Estático

Si tu contenido no cambia seguido, podés simplemente poner un archivo `llms.txt` en tu directorio `public/`:

```
public/llms.txt
```

Esto funciona, pero vas a tener que actualizarlo manualmente cada vez que agregués posts o cambies tus servicios. El route handler es mejor para cualquier sitio con contenido dinámico.

### Apuntá robots.txt Hacia Él

Agregá una referencia en tu `robots.txt` para que los crawlers sepan dónde encontrarlo:

```
# LLMs
Llms-Txt: https://tusitio.com/llms.txt
```

Esto sigue la misma convención que la directiva `Sitemap:`. No todos los crawlers lo buscan todavía, pero es barato de agregar y prepara tu setup para el futuro.

## Qué Incluir (y Qué No)

**Incluí:**
- Tu nombre o nombre de empresa y qué hacés
- Servicios o productos clave con descripciones breves
- Posts del blog con títulos, URLs y extractos
- Info de contacto y CTAs (links de reserva, email)
- Stack tecnológico o áreas de expertise (si es relevante para cómo te encuentran)

**No incluyas:**
- Todo el contenido de tu sitio web (mantenerlo conciso)
- Páginas internas que no son útiles para entender tu negocio
- Información sensible (API keys, herramientas internas, páginas de admin)
- Fluff de marketing — los LLMs no responden al hype, responden a información clara

El objetivo es un resumen limpio y factual. Escribilo como si estuvieras dando un briefing a un asistente muy inteligente que necesita entender tu negocio en 30 segundos.

## El Panorama General

Estamos en las primeras etapas de un cambio fundamental en cómo la gente descubre negocios y servicios online. Google no va a desaparecer, pero la búsqueda con IA está creciendo rápido. La gente le está preguntando a Claude, ChatGPT y Perplexity por recomendaciones en lugar de escribir keywords en una barra de búsqueda.

Tu sitio web necesita funcionar para ambas audiencias: humanos que navegan y modelos de IA que leen. `robots.txt` maneja permisos de crawlers. `sitemap.xml` maneja descubrimiento de páginas. `llms.txt` maneja comprensión por IA.

Toma 15 minutos de implementar. La ventaja es que cada modelo de IA que lea tu sitio obtiene una imagen limpia y precisa de quién sos y qué hacés.

## Preguntas Frecuentes

### llms.txt reemplaza a robots.txt o sitemap.xml?

No. Sirven propósitos diferentes. `robots.txt` controla permisos de acceso de crawlers. `sitemap.xml` ayuda a los motores de búsqueda a descubrir tus páginas. `llms.txt` provee un resumen estructurado específicamente para modelos de lenguaje de IA. Deberías tener los tres.

### Agregar llms.txt mejora mi ranking en Google?

No directamente. El algoritmo de ranking de Google no usa llms.txt. Pero a medida que las funciones de búsqueda con IA (como los AI Overviews de Google) se vuelven más prominentes, tener un resumen claro y estructurado de tu sitio puede influir en cómo los sistemas de IA entienden y recomiendan tu contenido.

### Es llms.txt un estándar web oficial?

Es una propuesta comunitaria, no un estándar W3C o IETF. Pero tiene adopción significativa de empresas tech importantes incluyendo Anthropic, Cloudflare, Stripe y Vercel. La especificación está publicada en [llmstxt.org](https://llmstxt.org/) y se mantiene activamente.

### Cada cuánto debo actualizar mi llms.txt?

Si usás el enfoque del route handler, los posts del blog se actualizan automáticamente en cada build. Para otro contenido (servicios, descripciones), actualizá cuando cambien tus ofertas. No hay frecuencia de crawl de qué preocuparse — los modelos de IA lo leen cuando visitan tu sitio.

### Puedo tener archivos llms.txt diferentes para diferentes idiomas?

La especificación no aborda contenido multilingüe específicamente. El enfoque práctico es incluir tu idioma principal en `llms.txt` y notar que hay contenido disponible en otros idiomas, enlazando a las páginas relevantes. Los modelos de IA manejan bien el contenido multilingüe.

---

**Querés tu sitio web optimizado tanto para motores de búsqueda como para modelos de IA?** Construyo sitios web de alto rendimiento con SEO y optimización para búsqueda con IA integrados desde el día uno. [Agendá una consulta gratuita](https://cal.com/marcelo-retana) y hablemos de lo que tu sitio debería estar haciendo por tu negocio.
