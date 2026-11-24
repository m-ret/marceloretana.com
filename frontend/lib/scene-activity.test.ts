import { describe, expect, it } from "bun:test";
import { hasHardwareWebGL, sceneActivity, whenIdle } from "@/lib/scene-activity";

type FakeGl = {
  renderer?: string | null;
  hideDebugInfo?: boolean;
  noLoseExtension?: boolean;
};

/** A document whose canvas gives out a fake WebGL context, and records how it was asked. */
function fakeDocument(gl: FakeGl | null) {
  const record = { contextArgs: [] as unknown[], lost: 0 };
  const doc = {
    createElement: () => ({
      getContext: (...args: unknown[]) => {
        record.contextArgs = args;
        if (!gl) return null;
        return {
          getExtension: (name: string) => {
            if (name === "WEBGL_debug_renderer_info") {
              return gl.hideDebugInfo ? null : { UNMASKED_RENDERER_WEBGL: 37446 };
            }
            if (name === "WEBGL_lose_context") {
              return gl.noLoseExtension ? null : { loseContext: () => record.lost++ };
            }
            return null;
          },
          getParameter: () => gl.renderer ?? null,
        };
      },
    }),
  };
  return { doc: doc as unknown as Pick<Document, "createElement">, record };
}

describe("hasHardwareWebGL", () => {
  it("is true for a browser that reports a GPU", () => {
    const { doc } = fakeDocument({ renderer: "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060, D3D11)" });

    expect(hasHardwareWebGL(doc)).toBe(true);
  });

  it("asks for a WebGL context that fails rather than run on the CPU", () => {
    const { doc, record } = fakeDocument({ renderer: "Apple M2" });

    hasHardwareWebGL(doc);

    expect(record.contextArgs).toEqual(["webgl", { failIfMajorPerformanceCaveat: true }]);
  });

  it("is false where the browser gives no WebGL context", () => {
    expect(hasHardwareWebGL(fakeDocument(null).doc)).toBe(false);
  });

  it.each([
    "ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)",
    "llvmpipe (LLVM 15.0.7, 256 bits)",
    "Google SwiftShader",
    "ANGLE (Microsoft, Microsoft Basic Render Driver Direct3D11 vs_5_0 ps_5_0)",
    "Apple software renderer",
  ])("is false when the renderer draws on the CPU: %s", (renderer) => {
    expect(hasHardwareWebGL(fakeDocument({ renderer }).doc)).toBe(false);
  });

  it("assumes a GPU when the browser hides the renderer's name", () => {
    expect(hasHardwareWebGL(fakeDocument({ hideDebugInfo: true }).doc)).toBe(true);
    expect(hasHardwareWebGL(fakeDocument({ renderer: null }).doc)).toBe(true);
  });

  it("releases the context it asked for, whatever it found", () => {
    const gpu = fakeDocument({ renderer: "Apple M2" });
    const cpu = fakeDocument({ renderer: "llvmpipe" });

    hasHardwareWebGL(gpu.doc);
    hasHardwareWebGL(cpu.doc);

    expect(gpu.record.lost).toBe(1);
    expect(cpu.record.lost).toBe(1);
  });

  it("copes with a browser that cannot release the context", () => {
    expect(
      hasHardwareWebGL(fakeDocument({ renderer: "Apple M2", noLoseExtension: true }).doc)
    ).toBe(true);
  });

  it("is false when asking for a context throws", () => {
    const doc = {
      createElement: () => ({
        getContext: () => {
          throw new Error("blocked");
        },
      }),
    };

    expect(hasHardwareWebGL(doc as unknown as Pick<Document, "createElement">)).toBe(false);
  });
});

describe("sceneActivity", () => {
  it("is not mounted until it has started", () => {
    expect(sceneActivity({ started: false, visible: true, reducedMotion: false })).toEqual({
      mounted: false,
      frameloop: "always",
    });
  });

  it("animates while started and on screen", () => {
    expect(sceneActivity({ started: true, visible: true, reducedMotion: false })).toEqual({
      mounted: true,
      frameloop: "always",
    });
  });

  it("renders nothing, but stays mounted, while out of view", () => {
    expect(sceneActivity({ started: true, visible: false, reducedMotion: false })).toEqual({
      mounted: true,
      frameloop: "never",
    });
  });

  it("renders nothing while out of view, even before it has started", () => {
    expect(sceneActivity({ started: false, visible: false, reducedMotion: false })).toEqual({
      mounted: false,
      frameloop: "never",
    });
  });

  it("shows a single still frame under reduced motion", () => {
    expect(sceneActivity({ started: true, visible: true, reducedMotion: true })).toEqual({
      mounted: true,
      frameloop: "demand",
    });
  });

  it("stays paused out of view under reduced motion too", () => {
    expect(sceneActivity({ started: true, visible: false, reducedMotion: true }).frameloop).toBe(
      "never"
    );
  });
});

describe("whenIdle", () => {
  it("uses the browser's idle callback with the timeout, and cancels it", () => {
    const calls: unknown[] = [];
    const cancelled: number[] = [];
    const win = {
      requestIdleCallback: (callback: () => void, options?: { timeout: number }) => {
        calls.push(options);
        callback();
        return 7;
      },
      cancelIdleCallback: (handle: number) => cancelled.push(handle),
      setTimeout: () => 0,
      clearTimeout: () => {},
    };
    let ran = 0;

    const cancel = whenIdle(win as unknown as Window, () => ran++, 900);
    cancel();

    expect(ran).toBe(1);
    expect(calls).toEqual([{ timeout: 900 }]);
    expect(cancelled).toEqual([7]);
  });

  it("waits 1.5 s at most by default", () => {
    const calls: unknown[] = [];
    const win = {
      requestIdleCallback: (_callback: () => void, options?: { timeout: number }) => {
        calls.push(options);
        return 1;
      },
      cancelIdleCallback: () => {},
      setTimeout: () => 0,
      clearTimeout: () => {},
    };

    whenIdle(win as unknown as Window, () => {});

    expect(calls).toEqual([{ timeout: 1500 }]);
  });

  it("falls back to a short timer where there are no idle callbacks (Safari)", () => {
    const timers: Array<{ delay: number; handle: number }> = [];
    const cleared: number[] = [];
    const win = {
      setTimeout: (_callback: () => void, delay: number) => {
        timers.push({ delay, handle: 42 });
        return 42;
      },
      clearTimeout: (handle: number) => cleared.push(handle),
    };

    const cancel = whenIdle(win as unknown as Window, () => {});
    cancel();

    expect(timers).toEqual([{ delay: 250, handle: 42 }]);
    expect(cleared).toEqual([42]);
  });

  it("falls back to the timer when only half of the idle API exists", () => {
    const timers: number[] = [];
    const win = {
      requestIdleCallback: () => 1,
      setTimeout: (_callback: () => void, delay: number) => timers.push(delay),
      clearTimeout: () => {},
    };

    whenIdle(win as unknown as Window, () => {});

    expect(timers).toEqual([250]);
  });
});
