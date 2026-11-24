export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
/** What a visitor sees until they choose: the site's dark look. */
export const DEFAULT_THEME: Theme = "dark";

/** The page background of each theme, which the browser uses to color its own toolbar. */
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#000000",
  light: "#ffffff",
};

type ThemeDocument = Pick<Document, "documentElement" | "querySelector">;

export function parseTheme(value: unknown): Theme | null {
  return value === "dark" || value === "light" ? value : null;
}

export function otherTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}

/**
 * Makes `theme` the page's theme: the `data-theme` attribute the stylesheet keys off, and the
 * `color-scheme` and `theme-color` metas that tell the browser how to paint its own UI (form
 * controls, scrollbars, the canvas before the CSS arrives, the toolbar).
 */
export function applyTheme(doc: ThemeDocument, theme: Theme): void {
  doc.documentElement.setAttribute("data-theme", theme);
  doc.querySelector('meta[name="color-scheme"]')?.setAttribute("content", theme);
  doc.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
}

/** The theme currently on the page, which the inline script set before the first paint. */
export function readAppliedTheme(doc: Pick<Document, "documentElement">): Theme {
  return parseTheme(doc.documentElement.getAttribute("data-theme")) ?? DEFAULT_THEME;
}

/**
 * Saves the visitor's choice. Even reading `window.localStorage` can throw (blocked site data), so
 * it is read inside the guard; the choice then still applies to this visit, just unsaved.
 */
export function storeTheme(win: Pick<Window, "localStorage">, theme: Theme): void {
  try {
    win.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Not saved.
  }
}

/**
 * Inline script for the head, placed right after the metas it updates. It runs before the first
 * paint, so a visitor who chose the other theme never sees the default flash first. Kept as plain
 * ES5 text: it must not depend on the bundle.
 */
export const themeInitScript = [
  "(function(){try{",
  `var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});`,
  'if(t!=="light"&&t!=="dark")return;',
  'document.documentElement.setAttribute("data-theme",t);',
  "var m=document.querySelector('meta[name=\"color-scheme\"]');",
  'if(m)m.setAttribute("content",t);',
  "var c=document.querySelector('meta[name=\"theme-color\"]');",
  `if(c)c.setAttribute("content",t==="light"?${JSON.stringify(THEME_COLORS.light)}:${JSON.stringify(
    THEME_COLORS.dark
  )});`,
  "}catch(e){}})();",
].join("");
