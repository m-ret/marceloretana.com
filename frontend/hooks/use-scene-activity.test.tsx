import { afterAll, beforeEach, describe, expect, it } from "bun:test";
import { useRef } from "react";
import {
  installDom,
  removeDom,
  render,
  stubIdleCallback,
  stubIntersectionObserver,
  stubMatchMedia,
  stubWebGL,
} from "@/tests/dom";

installDom();
afterAll(removeDom);
const { useSceneActivity } = await import("./use-scene-activity");

function Probe() {
  const ref = useRef<HTMLDivElement>(null);
  return <div ref={ref} data-activity={JSON.stringify(useSceneActivity(ref))} />;
}

/** A section that never gets its ref attached, so there is nothing to observe. */
function Detached() {
  const ref = useRef<HTMLDivElement>(null);
  useSceneActivity(ref);
  return <div />;
}

const read = (container: HTMLElement) =>
  JSON.parse(container.firstElementChild?.getAttribute("data-activity") ?? "{}");

let observer: ReturnType<typeof stubIntersectionObserver>;
let idle: ReturnType<typeof stubIdleCallback>;
let media: ReturnType<typeof stubMatchMedia>;
let webgl: ReturnType<typeof stubWebGL>;

beforeEach(() => {
  observer = stubIntersectionObserver();
  idle = stubIdleCallback();
  media = stubMatchMedia(false);
  webgl = stubWebGL("gpu");
});

describe("useSceneActivity", () => {
  it("does not mount the scene until the page is idle", async () => {
    const view = await render(<Probe />);

    expect(read(view.container)).toEqual({ mounted: false, frameloop: "always" });

    await view.act(async () => idle.runAll());
    expect(read(view.container)).toEqual({ mounted: true, frameloop: "always" });
    await view.unmount();
  });

  it("never creates the scene on a browser that draws WebGL on the CPU", async () => {
    webgl.kind = "software";
    const view = await render(<Probe />);

    await view.act(async () => idle.runAll());
    await view.act(async () => observer.fire(true));

    expect(read(view.container)).toEqual({ mounted: false, frameloop: "always" });
    await view.unmount();
  });

  it("never creates the scene where WebGL is not available", async () => {
    webgl.kind = "none";
    const view = await render(<Probe />);

    await view.act(async () => idle.runAll());

    expect(read(view.container)).toEqual({ mounted: false, frameloop: "always" });
    await view.unmount();
  });

  it("releases the context it used to look for a GPU", async () => {
    const view = await render(<Probe />);

    await view.act(async () => idle.runAll());

    expect(webgl.lost).toBe(1);
    await view.unmount();
  });

  it("observes its section", async () => {
    const view = await render(<Probe />);

    expect(observer.observers).toHaveLength(1);
    expect(observer.observers[0].observed).toEqual([view.container.firstElementChild as Element]);
    await view.unmount();
  });

  it("pauses while out of view, stays mounted, and resumes", async () => {
    const view = await render(<Probe />);
    await view.act(async () => idle.runAll());

    await view.act(async () => observer.fire(false));
    expect(read(view.container)).toEqual({ mounted: true, frameloop: "never" });

    await view.act(async () => observer.fire(true));
    expect(read(view.container)).toEqual({ mounted: true, frameloop: "always" });
    await view.unmount();
  });

  it("does not start while out of view, and starts when it comes into view", async () => {
    const view = await render(<Probe />);
    await view.act(async () => observer.fire(false));

    await view.act(async () => idle.runAll());
    expect(read(view.container)).toEqual({ mounted: false, frameloop: "never" });

    await view.act(async () => observer.fire(true));
    expect(read(view.container)).toEqual({ mounted: true, frameloop: "always" });
    await view.unmount();
  });

  it("shows a still frame under reduced motion", async () => {
    media.set(true);
    const view = await render(<Probe />);

    await view.act(async () => idle.runAll());

    expect(read(view.container)).toEqual({ mounted: true, frameloop: "demand" });
    await view.unmount();
  });

  it("stops observing and cancels the idle callback on unmount", async () => {
    const view = await render(<Probe />);

    await view.unmount();

    expect(observer.observers[0].disconnected).toBe(true);
    expect(idle.cancelled).toHaveLength(1);
  });

  it("observes nothing when the section is not on the page", async () => {
    const view = await render(<Detached />);

    expect(observer.observers).toHaveLength(0);
    await view.unmount();
  });
});
