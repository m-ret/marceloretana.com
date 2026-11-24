import { describe, expect, it } from "bun:test";
import { sceneActivity, whenIdle } from "@/lib/scene-activity";

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
