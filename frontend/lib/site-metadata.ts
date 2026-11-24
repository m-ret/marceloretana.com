import type { Metadata, ResolvingMetadata } from "next";

/**
 * The share image of the English pages. The file that draws it sits at the app root, outside the
 * route groups, so Next does not attach it to any page on its own. The Spanish pages get theirs
 * from `app/(es)/es/opengraph-image.tsx`.
 */
const defaultShareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Marcelo Retana - Full-Stack Developer",
};

export const siteMetadata: Metadata = {
  title: {
    default: "Marcelo Retana | Costa Rica Websites, Web Development, and Product Execution",
    template: "%s | Marcelo Retana",
  },
  description:
    "Costa Rica web development for local businesses and foreign-owned teams that need a stronger website, a clearer digital presence, and a cleaner quote process.",
  keywords: [
    "web development costa rica",
    "web development agency costa rica",
    "web design costa rica",
    "desarrollo web costa rica",
    "paginas web costa rica",
    "sitios web costa rica",
    "sitio web para negocios costa rica",
    "website redesign costa rica",
    "lead generation websites costa rica",
    "solicitar cotizacion web costa rica",
    "website quote costa rica",
    "foreign-owned business costa rica web development",
    "nearshore web development costa rica",
    "business website design costa rica",
    "desarrollador web costa rica",
    "GEXP Software",
  ],
  authors: [{ name: "Marcelo Retana", url: "https://marceloretana.com" }],
  creator: "Marcelo Retana",
  publisher: "Marcelo Retana",
  metadataBase: new URL("https://marceloretana.com"),
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "https://marceloretana.com/",
    },
  },
  openGraph: {
    title: "Marcelo Retana | Costa Rica Websites, Web Development, and Product Execution",
    description:
      "Costa Rica web development for businesses that need a stronger website, a clearer digital presence, and a cleaner form-first sales process.",
    url: "https://marceloretana.com",
    siteName: "Marcelo Retana",
    locale: "en_US",
    type: "website",
    images: [defaultShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcelo Retana | Costa Rica Websites, Web Development, and Product Execution",
    description:
      "Costa Rica web development for businesses that need a stronger website, a clearer digital presence, and a cleaner quote process.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
  category: "technology",
};

/**
 * A page that sets its own `openGraph` replaces the one its layouts built, share image included.
 * This puts back the image the layouts resolved (the English default, or the Spanish one), so the
 * page keeps its own title and URL and is still shared with a picture.
 */
export async function withShareImages(
  metadata: Metadata,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const images = (await parent).openGraph?.images;
  if (!images) return metadata;
  return { ...metadata, openGraph: { ...metadata.openGraph, images } };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GEXP Software",
  url: "https://gexpsoftware.com",
  logo: "https://marceloretana.com/profile.avif",
  founder: {
    "@type": "Person",
    name: "Marcelo Retana",
    url: "https://marceloretana.com",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@gexpsoftware.com",
    contactType: "customer service",
    availableLanguage: ["English", "Spanish"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Puerto Jiménez",
    addressCountry: "CR",
  },
  sameAs: ["https://linkedin.com/in/marceloretana", "https://github.com/maketroli"],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marcelo Retana",
  url: "https://marceloretana.com",
  image: "https://marceloretana.com/profile.avif",
  jobTitle: "Web Developer & Founder",
  description:
    "Costa Rica-based developer and founder helping businesses improve their website, lead capture, and digital presence with cleaner execution and stronger positioning.",
  worksFor: {
    "@type": "Organization",
    name: "GEXP Software",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Puerto Jiménez",
    addressCountry: "Costa Rica",
  },
  email: "info@gexpsoftware.com",
  sameAs: ["https://linkedin.com/in/marceloretana", "https://github.com/maketroli"],
  knowsAbout: [
    "Business Website Development",
    "Website Redesign",
    "Lead Generation Websites",
    "Costa Rica Web Development",
    "Web Design",
    "Booking and Inquiry Flows",
    "Web Applications",
    "Next.js",
    "TypeScript",
    "Node.js",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Website Development",
          description:
            "Professional business websites for Costa Rica companies that need stronger credibility and cleaner lead capture.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Redesign",
          description:
            "Redesigns for outdated websites that need clearer messaging, better structure, and stronger conversion paths.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Service and Sector Pages",
          description: "Commercial landing pages for services, sectors, pricing, and quote intent.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Booking and Inquiry Flows",
          description:
            "Simple booking, inquiry, and contact flows that make businesses easier to reach and easier to trust.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Applications",
          description:
            "Custom builds for teams that need more than a brochure site but still want direct execution.",
        },
      },
    ],
  },
};
