import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/sections/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/lib/query-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Marcelo Retana | Full-Stack Developer - Modern Websites, Apps & MVPs",
    template: "%s | Marcelo Retana",
  },
  description:
    "Full-stack developer with 10+ years experience building high-converting websites, apps, and MVPs. Performance-first development with Next.js, SEO optimization, and AI search visibility. Based in Costa Rica, delivering worldwide.",
  keywords: [
    // Core identity
    "full stack developer",
    "senior software engineer",
    "10 years experience developer",
    // Target SEO keywords
    "modern website development",
    "high-converting landing pages",
    "SEO-friendly websites",
    "lead generation websites",
    "performance-first development",
    "custom CMS",
    "AI search optimization",
    // Speed & delivery
    "MVP developer",
    "MVP specialist",
    "rapid prototyping",
    "fast delivery developer",
    // Apps
    "web app developer",
    "mobile app developer",
    "React Native developer",
    "app development",
    // Ecommerce
    "ecommerce developer",
    "custom ecommerce",
    // Web
    "professional website developer",
    "business website design",
    "custom web development",
    // AI & Modern
    "AI workflow developer",
    "AI integration specialist",
    "Claude AI developer",
    // Tech stack
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Node.js developer",
    // Location
    "Costa Rica developer",
    "remote developer",
    "GEXP Software",
  ],
  authors: [{ name: "Marcelo Retana", url: "https://marceloretana.com" }],
  creator: "Marcelo Retana",
  publisher: "Marcelo Retana",
  metadataBase: new URL("https://marceloretana.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marcelo Retana | Full-Stack Developer - Modern Websites, Apps & MVPs",
    description:
      "10+ years building high-converting websites, apps, and MVPs. Performance-first development with Next.js, SEO + AI search optimization. Delivered fast.",
    url: "https://marceloretana.com",
    siteName: "Marcelo Retana",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marcelo Retana - Freelance Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcelo Retana | Full-Stack Developer - Modern Websites, Apps & MVPs",
    description:
      "10+ years building high-converting websites, apps, and MVPs. Performance-first development with Next.js, SEO + AI search optimization.",
    images: ["/twitter-image.jpg"],
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
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marcelo Retana",
  url: "https://marceloretana.com",
  image: "https://marceloretana.com/profile.jpeg",
  jobTitle: "Full-Stack Developer & Founder",
  description:
    "Full-stack developer with 10+ years of experience building high-converting websites, web apps, mobile apps, and MVPs. Specializes in performance-first development with Next.js, SEO optimization, and AI search visibility.",
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
    "Modern Website Development",
    "High-Converting Landing Pages",
    "SEO Optimization",
    "AI Search Optimization",
    "Performance-First Development",
    "MVP Development",
    "Rapid Prototyping",
    "Ecommerce Development",
    "Web Applications",
    "Mobile App Development",
    "Lead Generation Websites",
    "React",
    "Next.js",
    "React Native",
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
          name: "MVP & Prototype Development",
          description:
            "Launch-ready MVPs and demos for startups. Fast turnaround from idea to working product.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ecommerce Development",
          description:
            "Custom online stores, Shopify apps, and ecommerce solutions that drive sales.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web & Mobile Apps",
          description: "Full-stack web applications and React Native mobile apps built for scale.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Workflow Integration",
          description: "Custom AI integrations and automated workflows using modern LLM tools.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Professional Websites",
          description: "High-converting business websites with modern design and fast performance.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <Nav />
            {children}
          </ThemeProvider>
        </QueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
