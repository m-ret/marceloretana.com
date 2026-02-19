"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { blobFragmentShader } from "./shaders/blob-fragment";
import { blobVertexShader } from "./shaders/blob-vertex";

export function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseStrength: { value: 0.3 },
      uNoiseSpeed: { value: 0.4 },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[1.5, 0, 0]}>
      <icosahedronGeometry args={[1.8, 64]} />
      <shaderMaterial
        vertexShader={blobVertexShader}
        fragmentShader={blobFragmentShader}
        uniforms={uniforms}
        toneMapped={false}
      />
    </mesh>
  );
}
