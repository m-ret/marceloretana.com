"use client";

import { usePathname } from "next/navigation";
import { getAlternatePath, getLanguageHubFallback } from "@/lib/language-pairs";

type LanguageToggleProps = {
  /** On the navigation pill, which is dark in both themes, the text is white instead of themed. */
  onGlass?: boolean;
};

export function LanguageToggle({ onGlass = false }: LanguageToggleProps) {
  const pathname = usePathname();
  const alternatePath = getAlternatePath(pathname);
  const hubFallback = alternatePath == null ? getLanguageHubFallback(pathname) : null;
  const targetPath = alternatePath ?? hubFallback;

  if (!targetPath) return null;

  const isHubFallback = alternatePath == null && hubFallback != null;
  const isEs = pathname === "/es" || pathname.startsWith("/es/");

  const action = isHubFallback
    ? isEs
      ? "English services hub"
      : "Spanish services hub"
    : isEs
      ? "Switch to English"
      : "Cambiar a Español";
  // The one label written in Spanish is the invitation shown on English pages.
  const actionLang = !isHubFallback && !isEs ? "es" : "en";
  // The accessible name starts with the visible text (WCAG 2.5.3 Label in Name). The tooltip repeats
  // it exactly, so assistive technology does not announce the same words twice.
  const label = `EN / ES: ${action}`;

  const tone = onGlass
    ? {
        link: "text-white/75 hover:text-white",
        current: "text-white",
        other: "text-white/75",
        slash: "text-white/60",
      }
    : {
        link: "text-fg-muted hover:text-fg",
        current: "text-fg",
        other: "text-fg-muted",
        slash: "text-fg-muted",
      };

  return (
    <a
      href={targetPath}
      lang={actionLang}
      className={`flex items-center gap-1 text-xs font-medium tracking-wide transition-colors ${tone.link}`}
      title={label}
      aria-label={label}
    >
      <span className={isEs ? tone.other : tone.current}>EN</span>
      <span className={tone.slash}>/</span>
      <span className={isEs ? tone.current : tone.other}>ES</span>
    </a>
  );
}
