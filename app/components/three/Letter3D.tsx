'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useGesture } from '@use-gesture/react';

// 3D Letter with "liquid glass" material + mouse/scroll tilt.
// Replaces the old flat .big-letter black gradient box with real depth.
function LiquidLetter({ letter, themeColor = '#f4d35e' }: { letter: string; themeColor?: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  // Mouse tilt + gentle auto "liquid" bob
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle breathing / liquid wobble
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
      
      // Gentle scale pulse
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.015;
      groupRef.current.scale.setScalar(pulse);
    }
    if (meshRef.current) {
      // Extra material "liquid" shimmer via emissive
      const mat = meshRef.current.material as THREE.MeshPhongMaterial;
      if (mat.emissive) {
        const t = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
        mat.emissive.setHex(parseInt(themeColor.replace('#', '0x')));
        mat.emissiveIntensity = 0.15 + t * 0.25;
      }
    }
  });

  // Pointer tilt (use-gesture for advanced micro-interaction)
  useGesture(
    {
      onMove: ({ xy: [x, y] }) => {
        if (groupRef.current) {
          const nx = ((x / window.innerWidth) - 0.5) * 1.4;
          const ny = ((y / window.innerHeight) - 0.5) * -1.1;
          groupRef.current.rotation.y = nx * 0.6;
          groupRef.current.rotation.x = ny * 0.5;
        }
      },
    },
    { target: document.body }
  );

  const letterSize = Math.min(viewport.width * 0.38, 3.8);

  return (
    <group ref={groupRef}>
      {/* 3D "Liquid Glass" Letter - extruded via Text with nice material */}
      <Text
        ref={meshRef as any}
        fontSize={letterSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.1, 0]}
      >
        {letter}
        <meshPhongMaterial
          color="#f8f8fa"
          emissive={themeColor}
          emissiveIntensity={0.35}
          shininess={95}
          specular="#ffffff"
          reflectivity={0.9}
          transparent
          opacity={0.95}
        />
      </Text>

      {/* Liquid torus "glass ring" around the letter - premium depth */}
      <mesh position={[0, 0, -0.6]} rotation={[0.6, 0, 0]}>
        <torusGeometry args={[letterSize * 0.72, 0.09, 18, 72]} />
        <meshPhongMaterial
          color={themeColor}
          emissive={themeColor}
          emissiveIntensity={0.2}
          shininess={80}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Subtle floating stars / light motes for cinematic romance */}
      <Stars
        radius={letterSize * 2.4}
        depth={12}
        count={28}
        factor={1.6}
        saturation={0}
        fade
        speed={0.4}
      />
    </group>
  );
}

interface Letter3DProps {
  letter: string;
  themeColor?: string;
  className?: string;
  height?: number | string;
}

export default function Letter3D({ letter, themeColor = '#f4d35e', className = '', height = '100%' }: Letter3DProps) {
  return (
    <div className={`three-canvas-container ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 48 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[-6, 8, 4]} intensity={1.4} color="#fff" />
        <pointLight position={[6, -5, -3]} intensity={0.9} color={themeColor} />
        
        <LiquidLetter letter={letter} themeColor={themeColor} />
      </Canvas>
    </div>
  );
}
