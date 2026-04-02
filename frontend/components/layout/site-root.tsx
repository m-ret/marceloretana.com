import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/sections/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/lib/query-provider";
import { organizationJsonLd, personJsonLd } from "@/lib/site-metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

type SiteRootProps = {
  children: React.ReactNode;
  lang: "en" | "es";
};

export function SiteRoot({ children, lang }: SiteRootProps) {
  const showToolbar = process.env.NODE_ENV === "development";

  return (
    <html lang={lang} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
        {showToolbar && <VercelToolbar />}
      </body>
    </html>
  );
}
