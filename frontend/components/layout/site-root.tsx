import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/sections/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import { QueryProvider } from "@/lib/query-provider";
import { organizationJsonLd, personJsonLd } from "@/lib/site-metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

type SiteRootProps = {
  children: React.ReactNode;
  lang: "en" | "es";
  alternatePath?: string | null;
};

export function SiteRoot({ children, lang, alternatePath }: SiteRootProps) {
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
        <LanguageProvider locale={lang} alternatePath={alternatePath ?? null}>
          <QueryProvider>
            <ThemeProvider>
              <Nav />
              {children}
            </ThemeProvider>
          </QueryProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        )}
        {showToolbar && <VercelToolbar />}
      </body>
    </html>
  );
}
