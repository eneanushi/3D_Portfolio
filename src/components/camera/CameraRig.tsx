import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { CAMERA_OFFSET } from '../../utils/constants';

export const CameraRig = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const characterPosition = useGameStore((state) => state.characterPosition);
  const characterRotation = useGameStore((state) => state.characterRotation);

  // Smoothed values
  const smoothedPosition = useRef(new THREE.Vector3(0, CAMERA_OFFSET.height, CAMERA_OFFSET.distance));
  const smoothedLookAt = useRef(new THREE.Vector3(0, 1.5, 0));

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    // Character position as Vector3
    const charPos = new THREE.Vector3(
      characterPosition[0],
      characterPosition[1],
      characterPosition[2]
    );

    // Camera should be BEHIND the character
    // Character faces direction based on rotation (sin for X, cos for Z)
    // Camera should be opposite to that direction
    const cameraOffset = new THREE.Vector3(
      -Math.sin(characterRotation) * CAMERA_OFFSET.distance,
      CAMERA_OFFSET.height,
      -Math.cos(characterRotation) * CAMERA_OFFSET.distance
    );

    // Target camera position = character position + offset behind
    const targetCameraPos = charPos.clone().add(cameraOffset);

    // Look at point is slightly above character and ahead of them
    const lookAheadOffset = new THREE.Vector3(
      Math.sin(characterRotation) * CAMERA_OFFSET.lookAheadDistance,
      1.5, // Look at character's chest/head height
      Math.cos(characterRotation) * CAMERA_OFFSET.lookAheadDistance
    );
    const targetLookAt = charPos.clone().add(lookAheadOffset);

    // Smooth camera movement (lerp factor based on delta time)
    const lerpSpeed = 8;
    const lerpFactor = 1 - Math.exp(-lerpSpeed * delta);

    smoothedPosition.current.lerp(targetCameraPos, lerpFactor);
    smoothedLookAt.current.lerp(targetLookAt, lerpFactor);

    // Apply to camera
    cameraRef.current.position.copy(smoothedPosition.current);
    cameraRef.current.lookAt(smoothedLookAt.current);
  });

  // Initial position
  const initialPos: [number, number, number] = [
    0,
    CAMERA_OFFSET.height,
    CAMERA_OFFSET.distance
  ];

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={60}
      near={0.1}
      far={1000}
      position={initialPos}
    />
  );
};
