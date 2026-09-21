import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { CAMERA_OFFSET } from '../../utils/constants';

const targetPosition = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();
const characterVector = new THREE.Vector3();

/**
 * Third-person follow camera.
 *
 * Damped rather than lerped so the framing stays consistent at any frame rate,
 * with two small cinematic touches: the field of view widens a little while
 * sprinting, and the camera settles back and up when a zone panel is open so
 * the character reads as part of the composition behind it.
 */
export const CameraRig = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const smoothedPosition = useRef(
    new THREE.Vector3(0, CAMERA_OFFSET.height, CAMERA_OFFSET.distance)
  );
  const smoothedLookAt = useRef(new THREE.Vector3(0, CAMERA_OFFSET.lookAtHeight, 0));

  useFrame((state, delta) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const { characterPosition, characterRotation, currentAnimation, isUIOpen } =
      useGameStore.getState();

    characterVector.set(characterPosition[0], characterPosition[1], characterPosition[2]);

    const sin = Math.sin(characterRotation);
    const cos = Math.cos(characterRotation);

    // Pull back and lift slightly while a panel is open
    const distance = CAMERA_OFFSET.distance * (isUIOpen ? 1.14 : 1);
    const height = CAMERA_OFFSET.height * (isUIOpen ? 1.12 : 1);

    // On wide screens the panel docks to the right, so pan the framing across
    // to keep the character clear of it rather than hidden behind it.
    const isWide = state.size.width > 768;
    const lateral = isUIOpen && isWide ? CAMERA_OFFSET.lateralOnOpen : 0;
    const rightX = cos * lateral;
    const rightZ = -sin * lateral;

    targetPosition.set(
      characterVector.x - sin * distance + rightX,
      characterVector.y + height,
      characterVector.z - cos * distance + rightZ
    );

    targetLookAt.set(
      characterVector.x + sin * CAMERA_OFFSET.lookAheadDistance + rightX,
      characterVector.y + CAMERA_OFFSET.lookAtHeight,
      characterVector.z + cos * CAMERA_OFFSET.lookAheadDistance + rightZ
    );

    // Frame-rate independent damping
    const lambda = CAMERA_OFFSET.damping;
    smoothedPosition.current.x = THREE.MathUtils.damp(smoothedPosition.current.x, targetPosition.x, lambda, delta);
    smoothedPosition.current.y = THREE.MathUtils.damp(smoothedPosition.current.y, targetPosition.y, lambda, delta);
    smoothedPosition.current.z = THREE.MathUtils.damp(smoothedPosition.current.z, targetPosition.z, lambda, delta);

    smoothedLookAt.current.x = THREE.MathUtils.damp(smoothedLookAt.current.x, targetLookAt.x, lambda, delta);
    smoothedLookAt.current.y = THREE.MathUtils.damp(smoothedLookAt.current.y, targetLookAt.y, lambda, delta);
    smoothedLookAt.current.z = THREE.MathUtils.damp(smoothedLookAt.current.z, targetLookAt.z, lambda, delta);

    camera.position.copy(smoothedPosition.current);

    // Barely perceptible handheld drift, so a standing character is not static
    const t = state.clock.elapsedTime;
    camera.position.y += Math.sin(t * 0.5) * 0.015;

    camera.lookAt(smoothedLookAt.current);

    const targetFov = currentAnimation === 'Running' ? CAMERA_OFFSET.fovRun : CAMERA_OFFSET.fov;
    if (Math.abs(camera.fov - targetFov) > 0.01) {
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 3, delta);
      camera.updateProjectionMatrix();
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={CAMERA_OFFSET.fov}
      near={0.1}
      far={400}
      position={[0, CAMERA_OFFSET.height, CAMERA_OFFSET.distance]}
    />
  );
};
