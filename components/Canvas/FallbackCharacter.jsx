'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMouseTracking } from './useMouseTracking';

/**
 * FallbackCharacter
 * -----------------
 * Bust built from primitives. Renders inside <Suspense> while the .glb loads,
 * so the hero is never empty during development. Same pointer-tracking,
 * independent head turn for a little more life.
 */
export default function FallbackCharacter() {
  const group = useRef();
  const head = useRef();
  const baseY = useRef(0);

  // Warm clay material echoing the studio lighting in the reference.
  const skin = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c98a5e',
        roughness: 0.65,
        metalness: 0.05,
      }),
    []
  );

  useMouseTracking(group, baseY, { trackY: 0.4, trackX: 0.2 });

  // Separate head turn (a little extra life) on top of the group lean.
  useFrame((state) => {
    if (!head.current) return;
    const { x, y } = state.pointer;
    head.current.rotation.y = THREE.MathUtils.lerp(
      head.current.rotation.y,
      x * 0.5,
      0.1
    );
    head.current.rotation.x = THREE.MathUtils.lerp(
      head.current.rotation.x,
      -y * 0.3,
      0.1
    );
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* Shoulders/torso */}
      <mesh castShadow receiveShadow position={[0, -0.9, 0]} material={skin}>
        <capsuleGeometry args={[0.62, 0.7, 8, 24]} />
      </mesh>
      {/* Neck */}
      <mesh castShadow position={[0, -0.15, 0]} material={skin}>
        <cylinderGeometry args={[0.16, 0.2, 0.3, 24]} />
      </mesh>
      {/* Head */}
      <mesh ref={head} castShadow position={[0, 0.25, 0]} material={skin}>
        <sphereGeometry args={[0.42, 48, 48]} />
      </mesh>
      {/* Hair cap */}
      <mesh castShadow position={[0, 0.4, -0.02]}>
        <sphereGeometry args={[0.44, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#1a1714" roughness={0.9} />
      </mesh>
    </group>
  );
}