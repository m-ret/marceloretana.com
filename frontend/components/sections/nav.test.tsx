import { afterAll, beforeEach, describe, expect, it, mock } from "bun:test";
import { installDom, removeDom, render } from "@/tests/dom";
import { registerNextMocks } from "@/tests/fixtures/next";

installDom();
afterAll(removeDom);

let locale: "en" | "es" = "en";
mock.module("@/lib/language-context", () => ({ useLanguage: () => ({ locale }) }));
mock.module("@/components/language-toggle", () => ({
  LanguageToggle: ({ onGlass }: { onGlass?: boolean }) => (
    <span data-language-toggle data-glass={onGlass ? "yes" : "no"} />
  ),
}));
mock.module("@/components/theme-toggle", () => ({ ThemeToggle: () => <span data-theme-toggle /> }));
registerNextMocks();
const { Nav } = await import("./nav");

/** What the dialog was asked to do. happy-dom has no top layer, so the calls are recorded. */
let calls: string[];

beforeEach(() => {
  locale = "en";
  calls = [];
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    calls.push("showModal");
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    calls.push("close");
    this.removeAttribute("open");
  };
});

const trigger = (container: HTMLElement) =>
  container.querySelector<HTMLButtonElement>("button[aria-controls='site-menu']");
const closeButton = (container: HTMLElement) =>
  container.querySelector<HTMLButtonElement>("dialog button");

describe("Nav menu", () => {
  it("is a native dialog that starts closed and has a name", async () => {
    const view = await render(<Nav />);
    const dialog = view.container.querySelector("dialog");

    expect(dialog?.id).toBe("site-menu");
    expect(dialog?.getAttribute("aria-label")).toBe("Menu");
    expect(dialog?.hasAttribute("open")).toBe(false);
    expect(dialog?.getAttribute("role")).toBeNull();
    await view.unmount();
  });

  it("is opened by a button that says so", async () => {
    const view = await render(<Nav />);
    const button = trigger(view.container);

    expect(button?.getAttribute("aria-label")).toBe("Open menu");
    expect(button?.getAttribute("aria-haspopup")).toBe("dialog");
    await view.unmount();
  });

  it("opens as a modal and moves focus to the close button", async () => {
    const view = await render(<Nav />);

    await view.act(async () => trigger(view.container)?.click());

    expect(calls).toEqual(["showModal"]);
    expect(view.container.querySelector("dialog")?.hasAttribute("open")).toBe(true);
    expect(document.activeElement).toBe(closeButton(view.container));
    expect(closeButton(view.container)?.getAttribute("aria-label")).toBe("Close menu");
    await view.unmount();
  });

  it("closes from the close button", async () => {
    const view = await render(<Nav />);
    await view.act(async () => trigger(view.container)?.click());

    await view.act(async () => closeButton(view.container)?.click());

    expect(calls).toEqual(["showModal", "close"]);
    await view.unmount();
  });

  it("closes when a link inside it is followed", async () => {
    const view = await render(<Nav />);
    const links = [...view.container.querySelectorAll<HTMLAnchorElement>("dialog a")];
    expect(links.length).toBeGreaterThan(5);

    for (const link of links.filter((item) => item.getAttribute("href")?.startsWith("/"))) {
      calls.length = 0;
      await view.act(async () => link.click());
      expect(calls).toEqual(["close"]);
    }
    await view.unmount();
  });

  it("keeps external mail links out of the closing behavior", async () => {
    const view = await render(<Nav />);
    const mail = view.container.querySelector<HTMLAnchorElement>("dialog a[href^='mailto:']");

    await view.act(async () => mail?.click());

    expect(calls).toEqual([]);
    await view.unmount();
  });

  it("gives each navigation inside the menu a name from its heading", async () => {
    const view = await render(<Nav />);
    const navs = [...view.container.querySelectorAll("dialog nav")];

    expect(navs.map((nav) => nav.getAttribute("aria-labelledby"))).toEqual([
      "menu-main",
      "menu-services",
      "menu-library",
    ]);
    for (const nav of navs) {
      const id = nav.getAttribute("aria-labelledby") ?? "";
      expect(view.container.querySelector(`#${id}`)).not.toBeNull();
    }
    await view.unmount();
  });

  it("names the top navigation and links the quote page", async () => {
    const view = await render(<Nav />);
    const top = view.container.querySelector("nav[aria-label='Primary']");
    const quote = top?.querySelector("a[href='/contact']");

    expect(top).not.toBeNull();
    expect(quote?.textContent).toBe("Get a Quote");
    await view.unmount();
  });

  it("puts the language toggle on the dark pill, and the themed one in the menu", async () => {
    const view = await render(<Nav />);
    const toggles = [...view.container.querySelectorAll("[data-language-toggle]")];

    expect(toggles.map((toggle) => toggle.getAttribute("data-glass"))).toEqual(["yes", "no"]);
    await view.unmount();
  });

  it("speaks Spanish on Spanish pages", async () => {
    locale = "es";
    const view = await render(<Nav />);

    expect(trigger(view.container)?.getAttribute("aria-label")).toBe("Abrir menú");
    expect(closeButton(view.container)?.getAttribute("aria-label")).toBe("Cerrar menú");
    expect(view.container.querySelector("dialog")?.getAttribute("aria-label")).toBe("Menú");
    expect(view.container.querySelector("nav[aria-label='Principal']")).not.toBeNull();
    expect(view.container.querySelector("a[href='/es/contacto']")?.textContent).toBe("Cotizar");
    expect(view.container.querySelector("dialog a[href='/es/casos']")?.textContent).toBe("Casos");
    await view.unmount();
  });
});
