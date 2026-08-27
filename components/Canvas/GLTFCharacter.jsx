'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_URL, FIT_FILL } from './constants';
import { useMouseTracking } from './useMouseTracking';

/**
 * GLTFCharacter
 * -------------
 * Loads the real .glb from /models/character.glb via useGLTF (suspends),
 * auto-fits it to fill the canvas vertically, and tracks the pointer.
 *
 * The auto-fit measures the model's bounding box, scales it to ~FIT_FILL of
 * the visible viewport height, and centers it — so it renders correctly no
 * matter the author's export scale. Re-runs on viewport resize.
 */
export default function GLTFCharacter() {
  const group = useRef();
  const head = useRef();
  const baseY = useRef(0);
  const { camera, size } = useThree();

  const { scene } = useGLTF(MODEL_URL);

  // Enable shadows + locate a head mesh (heuristic by name) for future use.
  useMemo(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (!head.current && /head|neck|cran/i.test(obj.name)) {
          head.current = obj;
        }
      }
    });
  }, [scene]);

  // Auto-fit to fill the canvas vertically; re-run on resize.
  useEffect(() => {
    if (!group.current) return;
    const box = new THREE.Box3().setFromObject(group.current);
    const sizeVec = new THREE.Vector3();
    box.getSize(sizeVec);
    if (sizeVec.y === 0) return;

    const camDist = camera.position.length() || 3.2;
    const fov = (camera.fov * Math.PI) / 180;
    const visibleH = 2 * camDist * Math.tan(fov / 2);
    const scale = (visibleH * FIT_FILL) / sizeVec.y;
    group.current.scale.setScalar(scale);

    box.setFromObject(group.current);
    const center = new THREE.Vector3();
    box.getCenter(center);
    group.current.position.x = -center.x;
    group.current.position.z = -center.z;

    const bottomY = box.min.y;
    group.current.position.y = -bottomY - (visibleH * FIT_FILL) / 2;
    baseY.current = group.current.position.y;
  }, [scene, camera, size.width, size.height]);

  useMouseTracking(group, baseY);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Prime the GLTF cache so repeat visits are instant. Safe at module scope.
useGLTF.preload(MODEL_URL);