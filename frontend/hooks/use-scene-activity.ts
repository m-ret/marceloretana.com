"use client";

import { type RefObject, useEffect, useState } from "react";
import {
  hasHardwareWebGL,
  type SceneActivity,
  sceneActivity,
  whenIdle,
} from "@/lib/scene-activity";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Drives a decorative WebGL scene that lives in `ref`'s section: starts it when the page is idle
 * and the section is on screen, pauses it while the section is out of view, and shows a still
 * frame under reduced motion. A browser without a GPU for WebGL never gets the scene: drawing it
 * on the CPU would leave the page unresponsive. See `sceneActivity` for the rules.
 */
export function useSceneActivity(ref: RefObject<Element | null>): SceneActivity {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [hardware, setHardware] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  // Checked once the page is idle, so probing for a GPU does not compete with the first paint.
  useEffect(() => whenIdle(window, () => setHardware(hasHardwareWebGL(document))), []);

  useEffect(() => {
    if (hardware && visible) setStarted(true);
  }, [hardware, visible]);

  return sceneActivity({ started, visible, reducedMotion });
}
