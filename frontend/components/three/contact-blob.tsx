"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

// Positions as fractions of viewport: [xFactor, yFactor, z]
// xFactor: -0.5 = far left edge, 0.5 = far right edge
// yFactor: relative to vertical center of hero (~top 60vh)
const RING_DEFS = [
  {
    xFactor: -0.25,
    y: 1.6,
    z: 0.0,
    radius: 0.55,
    tube: 0.018,
    color: "#ffffff",
    rotX: 0.0008,
    rotY: 0.0015,
    rotZ: 0.0006,
  },
  {
    xFactor: 0.35,
    y: 1.8,
    z: -0.2,
    radius: 0.46,
    tube: 0.015,
    color: "#67e8f9",
    rotX: 0.0015,
    rotY: 0.0008,
    rotZ: 0.001,
  },
  {
    xFactor: 0.1,
    y: 0.3,
    z: -0.3,
    radius: 0.52,
    tube: 0.016,
    color: "#a78bfa",
    rotX: 0.001,
    rotY: 0.0018,
    rotZ: 0.0008,
  },
  {
    xFactor: 0.42,
    y: 0.5,
    z: 0.1,
    radius: 0.4,
    tube: 0.014,
    color: "#bae6fd",
    rotX: 0.0012,
    rotY: 0.001,
    rotZ: 0.0014,
  },
];

function Ring({
  position,
  radius,
  tube,
  color,
  rotX,
  rotY,
  rotZ,
  floatOffset,
}: {
  position: [number, number, number];
  radius: number;
  tube: number;
  color: string;
  rotX: number;
  rotY: number;
  rotZ: number;
  floatOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x += rotX;
    groupRef.current.rotation.y += rotY;
    groupRef.current.rotation.z += rotZ;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.3 + floatOffset) * 0.12;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <torusGeometry args={[radius, tube, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 5]}>
        <torusGeometry args={[radius * 0.65, tube * 0.8, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export function ContactBlob() {
  const { viewport } = useThree();
  const hw = viewport.width / 2;

  return (
    <>
      {RING_DEFS.map((r, i) => (
        <Ring
          key={i}
          position={[r.xFactor * hw * 1.6, r.y, r.z]}
          radius={r.radius}
          tube={r.tube}
          color={r.color}
          rotX={r.rotX}
          rotY={r.rotY}
          rotZ={r.rotZ}
          floatOffset={i * 1.6}
        />
      ))}
    </>
  );
}
