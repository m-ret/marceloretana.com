"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { Frameloop } from "@/lib/scene-activity";
import { HeroScene } from "./hero-scene";

export function HeroCanvas({ frameloop = "always" }: { frameloop?: Frameloop }) {
  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "#000000" }}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  );
}
