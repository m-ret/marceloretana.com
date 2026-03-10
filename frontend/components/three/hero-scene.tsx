"use client";

import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef } from "react";
import type * as THREE from "three";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { GroundParticles } from "./ground-particles";
import { MorphingBlob } from "./morphing-blob";

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = mouse.current.x * 0.15;
    const targetY = mouse.current.y * 0.1;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <spotLight
        position={[0, 8, 4]}
        intensity={2}
        angle={0.5}
        penumbra={0.8}
        color="#ffd699"
        castShadow={false}
      />
      <pointLight position={[-5, 2, -2]} intensity={1.5} color="#4488ff" />
      <pointLight position={[5, -2, -3]} intensity={1.2} color="#8844ff" />

      {/* Scene group follows mouse */}
      <group ref={groupRef}>
        <MorphingBlob />
        <GroundParticles />
      </group>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette offset={0.3} darkness={0.7} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  );
}
