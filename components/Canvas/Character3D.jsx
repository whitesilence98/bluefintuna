'use client';

import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Scene from './Scene';

/**
 * Character3D
 * -----------
 * The WebGL canvas shell. Default export — this is what Hero.jsx imports via
 * next/dynamic({ ssr: false }).
 *
 * Perf: frameloop="demand" renders only on pointer move (idle = 0 fps), dpr
 * capped at 1.5, ACES tone mapping. All heavy scene logic lives in <Scene/>.
 */
export default function Character3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 3.2], fov: 38 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      // Render only when something changes (pointer move). Idle = 0 frames/sec,
      // so a static hero costs nothing after the first paint.
      frameloop="demand"
      aria-label="Interactive 3D character that follows your cursor"
      role="img"
    >
      <Scene />
    </Canvas>
  );
}