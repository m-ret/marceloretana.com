import { GlobalRegistrator } from "@happy-dom/global-registrator";
import type { ReactElement } from "react";

type ActGlobal = typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };

/** Gives the test file a browser-like `window` and `document`. Call before importing React DOM. */
export function installDom(): void {
  GlobalRegistrator.register({ url: "http://localhost:3000/" });
  (globalThis as ActGlobal).IS_REACT_ACT_ENVIRONMENT = true;
}

export function removeDom(): void {
  delete (globalThis as ActGlobal).IS_REACT_ACT_ENVIRONMENT;
  GlobalRegistrator.unregister();
}

/** Renders into the fake document. `act` flushes effects the way a browser would run them. */
export async function render(element: ReactElement) {
  const { act } = await import("react");
  const { createRoot } = await import("react-dom/client");
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(element);
  });
  return {
    container,
    act,
    unmount: () =>
      act(async () => {
        root.unmount();
        container.remove();
      }),
  };
}

/** A `matchMedia` whose answer the test controls; changing it notifies subscribers. */
export function stubMatchMedia(initial: boolean) {
  let matches = initial;
  const listeners = new Set<() => void>();
  window.matchMedia = ((media: string) => ({
    media,
    get matches() {
      return matches;
    },
    addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
  })) as unknown as typeof window.matchMedia;
  return {
    listeners,
    set(value: boolean) {
      matches = value;
      for (const listener of [...listeners]) listener();
    },
  };
}

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

/** An `IntersectionObserver` the test can fire by hand. */
export function stubIntersectionObserver() {
  const observers: Array<{
    callback: ObserverCallback;
    observed: Element[];
    disconnected: boolean;
  }> = [];
  class FakeIntersectionObserver {
    private readonly record: (typeof observers)[number];
    constructor(callback: ObserverCallback) {
      this.record = { callback, observed: [], disconnected: false };
      observers.push(this.record);
    }
    observe(element: Element) {
      this.record.observed.push(element);
    }
    disconnect() {
      this.record.disconnected = true;
    }
  }
  const target = globalThis as unknown as { IntersectionObserver: unknown };
  target.IntersectionObserver = FakeIntersectionObserver;
  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
    FakeIntersectionObserver;
  return {
    observers,
    fire(isIntersecting: boolean) {
      for (const observer of observers) observer.callback([{ isIntersecting }]);
    },
  };
}

/** An idle callback the test runs by hand; `cancelled` lists the handles that were cancelled. */
export function stubIdleCallback() {
  const pending = new Map<number, () => void>();
  const cancelled: number[] = [];
  let next = 1;
  const win = window as unknown as {
    requestIdleCallback: (callback: () => void) => number;
    cancelIdleCallback: (handle: number) => void;
  };
  win.requestIdleCallback = (callback) => {
    const handle = next++;
    pending.set(handle, callback);
    return handle;
  };
  win.cancelIdleCallback = (handle) => {
    cancelled.push(handle);
    pending.delete(handle);
  };
  return {
    cancelled,
    runAll() {
      for (const [handle, callback] of [...pending]) {
        pending.delete(handle);
        callback();
      }
    },
  };
}
