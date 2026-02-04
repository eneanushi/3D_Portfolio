import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../stores/gameStore';
import {
  WALK_SPEED,
  RUN_SPEED,
  ARENA_BOUND_X,
  ARENA_BOUND_Z,
  ROTATION_SPEED,
} from '../utils/constants';
import { clampPosition } from '../utils/animationHelpers';

export const useCharacterMovement = () => {
  const keys = useGameStore((state) => state.keys);
  const isUIOpen = useGameStore((state) => state.isUIOpen);
  const characterPosition = useGameStore((state) => state.characterPosition);
  const characterRotation = useGameStore((state) => state.characterRotation);
  const updateCharacterPosition = useGameStore((state) => state.updateCharacterPosition);
  const updateCharacterRotation = useGameStore((state) => state.updateCharacterRotation);
  const setCurrentAnimation = useGameStore((state) => state.setCurrentAnimation);
  const setIsMoving = useGameStore((state) => state.setIsMoving);

  useFrame((_, delta) => {
    // Don't process if UI is open
    if (isUIOpen) {
      setCurrentAnimation('Idle');
      setIsMoving(false);
      return;
    }

    // Current rotation
    let newRotation = characterRotation;

    // A/D keys rotate the character
    if (keys.a) {
      newRotation += ROTATION_SPEED * delta; // Rotate left (counter-clockwise)
    }
    if (keys.d) {
      newRotation -= ROTATION_SPEED * delta; // Rotate right (clockwise)
    }

    // Normalize rotation to 0 to 2PI
    while (newRotation < 0) newRotation += Math.PI * 2;
    while (newRotation >= Math.PI * 2) newRotation -= Math.PI * 2;

    updateCharacterRotation(newRotation);

    // Determine animation and speed based on W/S keys
    let animation: 'Idle' | 'Walking' | 'Running' | 'Dance' = 'Idle';
    let speed = 0;
    let isMoving = false;

    if (keys.w) {
      // W = move forward (in the direction character is facing)
      isMoving = true;
      if (keys.shift) {
        animation = 'Running';
        speed = RUN_SPEED;
      } else {
        animation = 'Walking';
        speed = WALK_SPEED;
      }
    } else if (keys.s) {
      // S = move backward (opposite to facing direction)
      isMoving = true;
      animation = 'Walking';
      speed = -WALK_SPEED * 0.6; // Slower backward
    }

    setCurrentAnimation(animation);
    setIsMoving(isMoving);

    // Apply movement in the direction the character is facing
    if (isMoving && speed !== 0) {
      // Character faces +Z in model space, rotation Y rotates around Y axis
      // Forward direction is determined by rotation
      const forward = new THREE.Vector3(
        Math.sin(newRotation),
        0,
        Math.cos(newRotation)
      );

      const movement = forward.multiplyScalar(speed * delta);

      const newPosition: [number, number, number] = [
        characterPosition[0] + movement.x,
        0,
        characterPosition[2] + movement.z,
      ];

      // Clamp to arena bounds
      newPosition[0] = clampPosition(newPosition[0], -ARENA_BOUND_X, ARENA_BOUND_X);
      newPosition[2] = clampPosition(newPosition[2], -ARENA_BOUND_Z, ARENA_BOUND_Z);

      updateCharacterPosition(newPosition);
    }
  });
};
