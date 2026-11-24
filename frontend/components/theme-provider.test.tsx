import { afterAll, beforeEach, describe, expect, it } from "bun:test";
import { installDom, removeDom, render } from "@/tests/dom";

installDom();
afterAll(removeDom);
const { ThemeProvider, useTheme } = await import("./theme-provider");
const { ThemeToggle } = await import("./theme-toggle");

const root = () => document.documentElement;
const meta = (name: string) =>
  document.querySelector(`meta[name="${name}"]`)?.getAttribute("content");

beforeEach(() => {
  document.head.innerHTML =
    '<meta name="color-scheme" content="dark"><meta name="theme-color" content="#000000">';
  root().setAttribute("data-theme", "dark");
  localStorage.clear();
});

function Probe() {
  const { theme, mounted, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme}>
      {theme}:{String(mounted)}
    </button>
  );
}

describe("ThemeProvider", () => {
  it("starts from the theme the inline script already applied", async () => {
    root().setAttribute("data-theme", "light");

    const view = await render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    expect(view.container.textContent).toBe("light:true");
    await view.unmount();
  });

  it("changes, applies and saves the theme only when the visitor toggles it", async () => {
    const view = await render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );
    expect(localStorage.getItem("theme")).toBeNull();

    await view.act(async () => view.container.querySelector("button")?.click());

    expect(view.container.textContent).toBe("light:true");
    expect(root().getAttribute("data-theme")).toBe("light");
    expect(meta("color-scheme")).toBe("light");
    expect(meta("theme-color")).toBe("#ffffff");
    expect(localStorage.getItem("theme")).toBe("light");

    await view.act(async () => view.container.querySelector("button")?.click());
    expect(root().getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    await view.unmount();
  });

  it("still switches when the browser blocks storage", async () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("blocked");
      },
    });
    try {
      const view = await render(
        <ThemeProvider>
          <Probe />
        </ThemeProvider>
      );

      await view.act(async () => view.container.querySelector("button")?.click());

      expect(root().getAttribute("data-theme")).toBe("light");
      await view.unmount();
    } finally {
      if (original) Object.defineProperty(window, "localStorage", original);
    }
  });

  it("follows a change made in another tab", async () => {
    const view = await render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    await view.act(async () => {
      window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: "light" }));
    });
    expect(view.container.textContent).toBe("light:true");
    expect(root().getAttribute("data-theme")).toBe("light");

    await view.act(async () => {
      window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: null }));
    });
    expect(view.container.textContent).toBe("dark:true");
    await view.unmount();
  });

  it("ignores storage changes to other keys, and stops listening on unmount", async () => {
    const view = await render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    await view.act(async () => {
      window.dispatchEvent(new StorageEvent("storage", { key: "other", newValue: "light" }));
    });
    expect(root().getAttribute("data-theme")).toBe("dark");

    await view.unmount();
    window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: "light" }));
    expect(root().getAttribute("data-theme")).toBe("dark");
  });

  it("gives a harmless default outside a provider", async () => {
    const view = await render(<Probe />);

    expect(view.container.textContent).toBe("dark:false");
    await view.act(async () => view.container.querySelector("button")?.click());
    expect(view.container.textContent).toBe("dark:false");
    await view.unmount();
  });
});

describe("ThemeToggle", () => {
  it("renders a labelled placeholder until the page has mounted", async () => {
    const { renderToStaticMarkup } = await import("react-dom/server");

    const html = renderToStaticMarkup(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(html).toContain('aria-label="Toggle theme"');
    expect(html).toContain('type="button"');
  });

  it("offers the other theme, and flips it on click", async () => {
    const view = await render(
      <ThemeProvider>
        <ThemeToggle className="text-white" />
      </ThemeProvider>
    );
    const button = () => view.container.querySelector("button");

    expect(button()?.getAttribute("aria-label")).toBe("Switch to light mode");
    expect(button()?.querySelector("svg")?.getAttribute("class")).toContain("text-white");

    await view.act(async () => button()?.click());
    expect(button()?.getAttribute("aria-label")).toBe("Switch to dark mode");
    await view.unmount();
  });

  it("uses the themed text color when no class is given", async () => {
    const view = await render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(view.container.querySelector("svg")?.getAttribute("class")).toContain("text-fg");
    await view.unmount();
  });
});
