import { describe, expect, it } from "bun:test";
import {
  applyTheme,
  DEFAULT_THEME,
  otherTheme,
  parseTheme,
  readAppliedTheme,
  storeTheme,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  themeInitScript,
} from "@/lib/theme";

/** The slice of a document the theme code touches, with the metas it looks up. */
function fakeDocument(options: { theme?: string; metas?: boolean } = {}) {
  const attributes = new Map<string, string>();
  if (options.theme) attributes.set("data-theme", options.theme);
  const metas = new Map<string, Map<string, string>>();
  if (options.metas !== false) {
    metas.set('meta[name="color-scheme"]', new Map([["content", "dark"]]));
    metas.set('meta[name="theme-color"]', new Map([["content", "#000000"]]));
  }
  return {
    attributes,
    metas,
    documentElement: {
      setAttribute: (name: string, value: string) => attributes.set(name, value),
      getAttribute: (name: string) => attributes.get(name) ?? null,
    },
    querySelector: (selector: string) => {
      const meta = metas.get(selector);
      return meta ? { setAttribute: (name: string, value: string) => meta.set(name, value) } : null;
    },
  } as const;
}

describe("parseTheme", () => {
  it("accepts the two themes", () => {
    expect(parseTheme("dark")).toBe("dark");
    expect(parseTheme("light")).toBe("light");
  });

  it("rejects anything else", () => {
    expect(parseTheme("system")).toBeNull();
    expect(parseTheme(null)).toBeNull();
    expect(parseTheme(undefined)).toBeNull();
  });
});

describe("otherTheme", () => {
  it("flips the theme", () => {
    expect(otherTheme("dark")).toBe("light");
    expect(otherTheme("light")).toBe("dark");
  });
});

describe("applyTheme", () => {
  it("sets the theme attribute and both metas", () => {
    const doc = fakeDocument();

    applyTheme(doc as unknown as Document, "light");

    expect(doc.attributes.get("data-theme")).toBe("light");
    expect(doc.metas.get('meta[name="color-scheme"]')?.get("content")).toBe("light");
    expect(doc.metas.get('meta[name="theme-color"]')?.get("content")).toBe(THEME_COLORS.light);
  });

  it("still sets the attribute when the metas are missing", () => {
    const doc = fakeDocument({ metas: false });

    applyTheme(doc as unknown as Document, "dark");

    expect(doc.attributes.get("data-theme")).toBe("dark");
  });
});

describe("readAppliedTheme", () => {
  it("reads the theme the page is showing", () => {
    expect(readAppliedTheme(fakeDocument({ theme: "light" }) as unknown as Document)).toBe("light");
  });

  it("falls back to the default when the attribute is missing or unknown", () => {
    expect(readAppliedTheme(fakeDocument() as unknown as Document)).toBe(DEFAULT_THEME);
    expect(readAppliedTheme(fakeDocument({ theme: "sepia" }) as unknown as Document)).toBe(
      DEFAULT_THEME
    );
  });
});

describe("storeTheme", () => {
  it("saves the choice under the theme key", () => {
    const saved = new Map<string, string>();
    const win = { localStorage: { setItem: (k: string, v: string) => saved.set(k, v) } };

    storeTheme(win as unknown as Window, "light");

    expect(saved.get(THEME_STORAGE_KEY)).toBe("light");
  });

  it("does not throw when saving fails", () => {
    const win = {
      localStorage: {
        setItem: () => {
          throw new Error("quota");
        },
      },
    };

    expect(() => storeTheme(win as unknown as Window, "dark")).not.toThrow();
  });

  it("does not throw when reading localStorage itself throws", () => {
    const win = {
      get localStorage(): never {
        throw new Error("blocked");
      },
    };

    expect(() => storeTheme(win as unknown as Window, "dark")).not.toThrow();
  });
});

describe("themeInitScript", () => {
  /** Runs the inline script the way the browser does, against fakes. */
  function run(stored: string | null | "throws", doc = fakeDocument()) {
    const storage = {
      getItem: (key: string) => {
        if (stored === "throws") throw new Error("blocked");
        return key === THEME_STORAGE_KEY ? stored : null;
      },
    };
    new Function("document", "localStorage", themeInitScript)(doc, storage);
    return doc;
  }

  it("applies a saved light theme and updates both metas before the first paint", () => {
    const doc = run("light");

    expect(doc.attributes.get("data-theme")).toBe("light");
    expect(doc.metas.get('meta[name="color-scheme"]')?.get("content")).toBe("light");
    expect(doc.metas.get('meta[name="theme-color"]')?.get("content")).toBe(THEME_COLORS.light);
  });

  it("applies a saved dark theme", () => {
    const doc = run("dark");

    expect(doc.attributes.get("data-theme")).toBe("dark");
    expect(doc.metas.get('meta[name="theme-color"]')?.get("content")).toBe(THEME_COLORS.dark);
  });

  it("leaves the page alone when nothing valid is saved", () => {
    expect(run(null).attributes.has("data-theme")).toBe(false);
    expect(run("sepia").attributes.has("data-theme")).toBe(false);
  });

  it("still applies the theme when the metas are missing", () => {
    expect(run("light", fakeDocument({ metas: false })).attributes.get("data-theme")).toBe("light");
  });

  it("does nothing, and does not throw, when storage is blocked", () => {
    expect(run("throws").attributes.has("data-theme")).toBe(false);
  });
});
