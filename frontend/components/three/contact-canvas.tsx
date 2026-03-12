"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ContactScene } from "./contact-scene";

export function ContactCanvas() {
  return (
    <Canvas
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
