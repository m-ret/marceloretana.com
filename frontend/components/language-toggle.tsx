"use client";

import { usePathname } from "next/navigation";
import { getAlternatePath, getLanguageHubFallback } from "@/lib/language-pairs";

export function LanguageToggle() {
  const pathname = usePathname();
  const alternatePath = getAlternatePath(pathname);
  const hubFallback = alternatePath == null ? getLanguageHubFallback(pathname) : null;
  const targetPath = alternatePath ?? hubFallback;

  if (!targetPath) return null;

  const isHubFallback = alternatePath == null && hubFallback != null;
  const isEs = pathname === "/es" || pathname.startsWith("/es/");

  const title = isHubFallback
    ? isEs
      ? "English services hub"
      : "Spanish services hub"
    : isEs
      ? "Switch to English"
      : "Cambiar a Español";

  return (
    <a
      href={targetPath}
      className="flex items-center gap-1 text-xs font-medium tracking-wide text-fg-muted hover:text-fg transition-colors"
      title={title}
      aria-label={title}
    >
      <span className={isEs ? "text-fg-muted" : "text-fg"}>EN</span>
      <span className="text-fg-muted">/</span>
      <span className={isEs ? "text-fg" : "text-fg-muted"}>ES</span>
    </a>
  );
}
