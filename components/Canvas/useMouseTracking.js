'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TRACK_Y, TRACK_X, TRACK_SMOOTH } from './constants';

/**
 * useMouseTracking
 * ----------------
 * Shared per-frame hook: smoothly rotates `ref` toward the pointer and applies
 * an idle bob offset on top of a caller-provided base Y (so auto-fit position
 * is never clobbered).
 *
 * @param {React.RefObject<THREE.Group>} ref    - the group to rotate/bob
 * @param {React.RefObject<number>}     baseY  - ref holding the fitted base Y
 * @param {object} opts                     - { trackY, trackX, smooth, bob }
 */
export function useMouseTracking(ref, baseY, opts = {}) {
  const {
    trackY = TRACK_Y,
    trackX = TRACK_X,
    smooth = TRACK_SMOOTH,
    bob = 0.03,
  } = opts;

  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.pointer;

    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      x * trackY,
      smooth
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -y * trackX,
      smooth
    );

    if (baseY) {
      ref.current.position.y =
        baseY.current + Math.sin(state.clock.elapsedTime * 1.2) * bob;
    }
  });
}