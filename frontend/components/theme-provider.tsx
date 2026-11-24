"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  applyTheme,
  DEFAULT_THEME,
  otherTheme,
  parseTheme,
  readAppliedTheme,
  storeTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The inline script in <head> applied the saved theme before the first paint, so React's state
    // only has to catch up with the page; nothing visible changes here.
    setTheme(readAppliedTheme(document));
    setMounted(true);

    // The visitor changed the theme in another tab.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const next = parseTheme(event.newValue) ?? DEFAULT_THEME;
      applyTheme(document, next);
      setTheme(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Only a deliberate choice is saved, so a visitor who never touches the toggle is never pinned.
  const toggleTheme = () => {
    const next = otherTheme(theme);
    applyTheme(document, next);
    storeTheme(window, next);
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
