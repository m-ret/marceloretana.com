import { Analytics } from "@vercel/analytics/next";
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
  title: "Marcelo Retana | Developer & Entrepreneur",
  description:
    "Software Engineer and Founder of GEXP Software. Building innovative solutions with React, Node.js, and modern technologies.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Costa Rica",
  ],
  authors: [{ name: "Marcelo Retana" }],
  metadataBase: new URL("https://marceloretana.com"),
  openGraph: {
    title: "Marcelo Retana | Developer & Entrepreneur",
    description: "Software Engineer and Founder of GEXP Software. Building innovative solutions.",
    url: "https://marceloretana.com",
    siteName: "Marcelo Retana",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcelo Retana | Developer & Entrepreneur",
    description: "Software Engineer and Founder of GEXP Software. Building innovative solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <Nav />
            {children}
          </ThemeProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
