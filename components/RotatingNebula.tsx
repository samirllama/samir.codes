// components/RotatingNebula.tsx
"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three"; // Keep this if using other THREE.* constants like BackSide
import { cn } from "@/lib/utils";

interface RotatingNebulaProps {
  textureUrl?: string;
  rotationSpeed?: number;
  className?: string;
}

// NebulaMesh component remains the same
function NebulaMesh({
  textureUrl,
  rotationSpeed = 0.001,
}: RotatingNebulaProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  // useLoader now uses the correctly imported TextureLoader
  const texture = useLoader(
    TextureLoader,
    textureUrl || "/textures/nebula-blue-purple.jpg"
  );
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <sphereGeometry args={[5, 64, 32]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide} // Using THREE namespace here
        toneMapped={false}
      />
    </mesh>
  );
}

export default function RotatingNebula({
  textureUrl,
  rotationSpeed,
  className,
}: RotatingNebulaProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      className={cn("w-full h-full", className)}
    >
      <NebulaMesh textureUrl={textureUrl} rotationSpeed={rotationSpeed} />
    </Canvas>
  );
}
