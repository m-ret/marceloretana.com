import type { Metadata } from "next";
import { siteMetadata } from "@/lib/site-metadata";

// The page is a client component, so it cannot export metadata; it lives here. Without it the page
// inherited the home page's canonical, title and share URL, which told search engines that the
// quote page is a copy of the home page.
export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Marcelo Retana for web development services in Costa Rica.",
  alternates: {
    canonical: "/contact",
    languages: {
      es: "/es/contacto",
      "x-default": "/contact",
    },
  },
  openGraph: {
    ...siteMetadata.openGraph,
    title: "Contact | Marcelo Retana",
    description: "Contact Marcelo Retana for web development services in Costa Rica.",
    url: "https://marceloretana.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
