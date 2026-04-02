import type { Metadata } from "next";
import { SiteRoot } from "@/components/layout/site-root";
import { siteMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata: Metadata = siteMetadata;

export default function DefaultRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRoot lang="en">{children}</SiteRoot>;
}
