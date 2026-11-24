"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { Frameloop } from "@/lib/scene-activity";
import { ContactScene } from "./contact-scene";

export function ContactCanvas({ frameloop = "always" }: { frameloop?: Frameloop }) {
  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "#000000" }}
    >
      <Suspense fallback={null}>
        <ContactScene />
      </Suspense>
    </Canvas>
  );
}
