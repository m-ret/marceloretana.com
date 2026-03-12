"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 600;
const COLORS = [
  new THREE.Color("#ffffff"),
  new THREE.Color("#ffd699"), // warm gold
  new THREE.Color("#4488ff"), // blue
  new THREE.Color("#aa66ff"), // purple
  new THREE.Color("#ffeeaa"), // pale gold
  new THREE.Color("#88aaff"), // light blue
];

export function HeroParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    const off = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      spd[i] = 0.004 + Math.random() * 0.012;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, colors: col, speeds: spd, offsets: off };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i];
      arr[i * 3] += Math.sin(t * 0.4 + offsets[i]) * 0.002;
      if (arr[i * 3 + 1] > 5.5) {
        arr[i * 3 + 1] = -5.5;
        arr[i * 3] = (Math.random() - 0.5) * 14;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={COUNT} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
