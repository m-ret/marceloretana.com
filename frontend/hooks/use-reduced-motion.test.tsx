import { afterAll, describe, expect, it } from "bun:test";
import { installDom, removeDom, render, stubMatchMedia } from "@/tests/dom";

installDom();
afterAll(removeDom);
const { useReducedMotion } = await import("./use-reduced-motion");

function Probe() {
  return <span>{String(useReducedMotion())}</span>;
}

describe("useReducedMotion", () => {
  it("reads the visitor's preference", async () => {
    stubMatchMedia(true);

    const view = await render(<Probe />);

    expect(view.container.textContent).toBe("true");
    await view.unmount();
  });

  it("follows the preference when it changes, and stops listening on unmount", async () => {
    const media = stubMatchMedia(false);

    const view = await render(<Probe />);
    expect(view.container.textContent).toBe("false");
    expect(media.listeners.size).toBe(1);

    await view.act(async () => media.set(true));
    expect(view.container.textContent).toBe("true");

    await view.unmount();
    expect(media.listeners.size).toBe(0);
  });

  it("renders false on the server, where there is no preference to read", async () => {
    const { renderToStaticMarkup } = await import("react-dom/server");

    expect(renderToStaticMarkup(<Probe />)).toBe("<span>false</span>");
  });
});
