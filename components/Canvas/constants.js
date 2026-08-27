/**
 * Shared constants for the 3D character scene.
 *
 * PERFORMANCE MODEL
 * - frameloop="demand": the GPU renders only on pointer move, not every frame.
 * - Real-time shadow maps are OFF (biggest cost on a high-poly model).
 *   A baked ContactShadows plane gives the grounding shadow for ~free.
 * - Environment HDR is OFF — replaced by a cheap hemisphere light.
 * - No auto-rotate, no Float animation: anything that animates on its own
 *   defeats demand rendering. Pills are static geometry now.
 * - dpr capped at 1.5 to limit fragment work on retina displays.
 *
 * The other half of perf is the MODEL. An 8MB .glb is high-poly. To go further:
 *   npx @gltf-transform/cli optimize public/models/character.glb \
 *     public/models/character.glb --compress meshopt
 * and import + configure MeshoptDecoder in useGLTF.
 */

export const MODEL_URL = '/models/character.glb';

// How strongly the character leans toward the cursor (normalized [-1,1]).
export const TRACK_Y = 0.35;
export const TRACK_X = 0.18;
export const TRACK_SMOOTH = 0.08;

// How much of the visible viewport height the model fills after auto-fit.
export const FIT_FILL = 0.85;