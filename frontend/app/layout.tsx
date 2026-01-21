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
    default: "Marcelo Retana | Freelance Developer & Designer in Costa Rica",
    template: "%s | Marcelo Retana",
  },
  description:
    "Freelance software developer and designer based in Costa Rica. I build custom websites, web apps, and digital solutions for startups and businesses. Expert in React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "freelance developer",
    "freelance designer",
    "web developer Costa Rica",
    "software engineer",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Node.js developer",
    "UI/UX designer",
    "web design",
    "web development",
    "custom software",
    "startup developer",
    "remote developer",
    "Costa Rica developer",
    "frontend developer",
    "backend developer",
    "mobile app developer",
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
    title: "Marcelo Retana | Freelance Developer & Designer",
    description:
      "Freelance software developer and designer based in Costa Rica. I build custom websites, web apps, and digital solutions for startups and businesses.",
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
    title: "Marcelo Retana | Freelance Developer & Designer",
    description:
      "Freelance software developer and designer based in Costa Rica. Building custom web solutions.",
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
  jobTitle: "Freelance Software Developer & Designer",
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
  sameAs: ["https://linkedin.com/in/marceloretana", "https://github.com"],
  knowsAbout: [
    "Web Development",
    "Software Engineering",
    "UI/UX Design",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
  ],
  offers: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Custom Software Development",
      description:
        "Custom websites, web applications, and digital solutions for startups and businesses",
    },
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
