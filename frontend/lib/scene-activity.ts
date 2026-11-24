/** How a React Three Fiber canvas schedules its frames. */
export type Frameloop = "always" | "demand" | "never";

export type SceneActivity = {
  /** Whether the canvas (and the code behind it) should exist at all. */
  mounted: boolean;
  frameloop: Frameloop;
};

/**
 * What a decorative WebGL scene should be doing.
 *
 * - `started`: it has been visible once the page was idle. Until then it is not mounted, so its
 *   code does not compete with the first paint and hydration. Afterwards it stays mounted, so
 *   scrolling back does not rebuild the WebGL context.
 * - Out of view it renders nothing (`never`).
 * - Under reduced motion it renders one still frame (`demand`) instead of animating.
 */
export function sceneActivity({
  started,
  visible,
  reducedMotion,
}: {
  started: boolean;
  visible: boolean;
  reducedMotion: boolean;
}): SceneActivity {
  if (!visible) return { mounted: started, frameloop: "never" };
  return { mounted: started, frameloop: reducedMotion ? "demand" : "always" };
}

type IdleWindow = Pick<Window, "setTimeout" | "clearTimeout"> & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/** The names browsers report for a renderer that draws on the CPU. */
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i;

/**
 * Whether this browser can draw a WebGL scene on a GPU. Without one (no WebGL at all, or the
 * browser drawing it on the CPU: hardware acceleration off, a virtual machine, a remote desktop)
 * an animated scene takes the page's main thread for most of every frame, so the page is better
 * off without it. A browser that hides its renderer name is assumed to have a GPU.
 */
export function hasHardwareWebGL(doc: Pick<Document, "createElement">): boolean {
  try {
    // Browsers that tell software rendering apart refuse the context under this flag.
    const gl = doc
      .createElement("canvas")
      .getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : null;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !(typeof renderer === "string" && SOFTWARE_RENDERER.test(renderer));
  } catch {
    return false;
  }
}

/** Runs `callback` once the browser is idle, or soon after where it has no idle callbacks (Safari). */
export function whenIdle(win: IdleWindow, callback: () => void, timeoutMs = 1500): () => void {
  if (win.requestIdleCallback && win.cancelIdleCallback) {
    const handle = win.requestIdleCallback(callback, { timeout: timeoutMs });
    return () => win.cancelIdleCallback?.(handle);
  }
  const handle = win.setTimeout(callback, 250);
  return () => win.clearTimeout(handle);
}
