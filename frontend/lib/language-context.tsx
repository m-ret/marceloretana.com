"use client";

import { createContext, useContext } from "react";

type LanguageContextValue = {
  locale: "en" | "es";
  alternatePath: string | null;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  alternatePath: null,
});

export function LanguageProvider({
  locale,
  alternatePath,
  children,
}: LanguageContextValue & { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ locale, alternatePath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
