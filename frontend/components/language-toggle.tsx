"use client";

import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { locale, alternatePath } = useLanguage();

  if (!alternatePath) return null;

  const isEs = locale === "es";

  return (
    <a
      href={alternatePath}
      className="flex items-center gap-1 text-xs font-medium tracking-wide text-fg-muted hover:text-fg transition-colors"
      title={isEs ? "Switch to English" : "Cambiar a Español"}
    >
      <span className={isEs ? "text-fg-muted" : "text-fg"}>EN</span>
      <span className="text-fg-muted">/</span>
      <span className={isEs ? "text-fg" : "text-fg-muted"}>ES</span>
    </a>
  );
}
