'use client';

import { Suspense } from 'react';
import { ContactShadows } from '@react-three/drei';
import GLTFCharacter from './GLTFCharacter';
import FallbackCharacter from './FallbackCharacter';

/**
 * Scene
 * -----
 * Lights, character (real model with primitive fallback), baked contact
 * shadow. No real-time shadow maps and no Environment HDR — both are the
 * heavy costs on a high-poly model.
 */
export default function Scene() {
  return (
    <>
      {/* Cheap warm lighting — no shadow maps.
          A hemisphere light gives sky/ground fill for near-zero cost. */}
      <hemisphereLight args={['#fff3e6', '#1a1714', 0.6]} />
      <ambientLight intensity={0.35} color="#fff3e6" />
      <directionalLight position={[3, 4, 2]} intensity={2.0} color="#ffd9b3" />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#9bb8ff" />

      <Suspense fallback={<FallbackCharacter />}>
        <GLTFCharacter />
      </Suspense>

      {/* Baked contact shadow (static, cheap) instead of real-time shadow maps. */}
      <ContactShadows
        position={[0, -1.65, 0]}
        opacity={0.5}
        scale={6}
        blur={2.4}
        far={3}
        color="#000000"
        frames={1}
      />
    </>
  );
}