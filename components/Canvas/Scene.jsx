'use client';

import { Suspense } from 'react';
import { ContactShadows } from '@react-three/drei';
import GLTFCharacter from './GLTFCharacter';
import FallbackCharacter from './FallbackCharacter';
import useIsDark from '@/lib/use-is-dark';

/**
 * Scene
 * -----
 * Lights, character (real model with primitive fallback), baked contact
 * shadow. No real-time shadow maps and no Environment HDR — both are the
 * heavy costs on a high-poly model.
 *
 * Lighting follows the site theme: cool/neutral for the light ambient wash,
 * warm champagne tones for the dark espresso palette. useIsDark watches the
 * `dark` class on <html>, so toggling mid-session relights the scene
 * without a remount.
 */

export default function Scene() {
  const dark = useIsDark();

  return (
    <>
      {/* Cheap lighting — no shadow maps. A hemisphere light gives
          sky/ground fill for near-zero cost. */}
      {dark ? (
        // Warm espresso-era rig: champagne key + cool fill.
        <>
          <hemisphereLight args={['#fff3e6', '#1a1714', 0.6]} />
          <ambientLight intensity={0.35} color="#fff3e6" />
          <directionalLight position={[3, 4, 2]} intensity={2.0} color="#ffd9b3" />
          <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#9bb8ff" />
        </>
      ) : (
        // Cool ambient rig: neutral key over the mint/teal page wash.
        <>
          <hemisphereLight args={['#ffffff', '#cffaf4', 0.9]} />
          <ambientLight intensity={0.6} color="#ffffff" />
          <directionalLight position={[3, 4, 2]} intensity={1.6} color="#ffffff" />
          <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#bfe8e0" />
        </>
      )}

      <Suspense fallback={<FallbackCharacter />}>
        <GLTFCharacter />
      </Suspense>

      {/* Baked contact shadow (static, cheap) instead of real-time shadow maps. */}
      <ContactShadows
        position={[0, -1.65, 0]}
        opacity={dark ? 0.5 : 0.25}
        scale={6}
        blur={2.4}
        far={3}
        color="#000000"
        frames={1}
      />
    </>
  );
}