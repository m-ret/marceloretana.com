"use client";

import { type RefObject, useEffect, useState } from "react";
import { type SceneActivity, sceneActivity, whenIdle } from "@/lib/scene-activity";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Drives a decorative WebGL scene that lives in `ref`'s section: starts it when the page is idle
 * and the section is on screen, pauses it while the section is out of view, and shows a still
 * frame under reduced motion. See `sceneActivity` for the rules.
 */
export function useSceneActivity(ref: RefObject<Element | null>): SceneActivity {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [idle, setIdle] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => whenIdle(window, () => setIdle(true)), []);

  useEffect(() => {
    if (idle && visible) setStarted(true);
  }, [idle, visible]);

  return sceneActivity({ started, visible, reducedMotion });
}
