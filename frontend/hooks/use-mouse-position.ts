"use client";

import { useEffect, useRef } from "react";

/** Returns a ref to a normalized mouse position (-1 to 1) that updates without re-renders. */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      position.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      position.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return position;
}
