import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../stores/gameStore';
import {
  WALK_SPEED,
  RUN_SPEED,
  ARENA_BOUND_X,
  ARENA_BOUND_Z,
  ROTATION_SPEED,
} from '../utils/constants';
import { clampPosition, resolveMonolithCollision } from '../utils/animationHelpers';
import { AnimationName } from '../types/character.types';

const TWO_PI = Math.PI * 2;

/**
 * Drives the character from the keyboard state.
 *
 * Everything is read through `getState()` rather than through selectors: the
 * character's position changes every frame, and subscribing to it here would
 * re-render the whole controller sixty times a second for no benefit.
 */
export const useCharacterMovement = () => {
  const lastAnimation = useRef<AnimationName>('Idle');
  const lastIsMoving = useRef(false);

  useFrame((_, delta) => {
    const store = useGameStore.getState();
    const {
      keys,
      isUIOpen,
      characterPosition,
      characterRotation,
      updateCharacterPosition,
      updateCharacterRotation,
      setCurrentAnimation,
      setIsMoving,
    } = store;

    // Reading a zone panel should not also be driving the character
    if (isUIOpen) {
      if (lastAnimation.current !== 'Idle') {
        setCurrentAnimation('Idle');
        lastAnimation.current = 'Idle';
      }
      if (lastIsMoving.current) {
        setIsMoving(false);
        lastIsMoving.current = false;
      }
      return;
    }

    // A / D turn the character
    let newRotation = characterRotation;
    if (keys.a) newRotation += ROTATION_SPEED * delta;
    if (keys.d) newRotation -= ROTATION_SPEED * delta;

    if (newRotation !== characterRotation) {
      newRotation = ((newRotation % TWO_PI) + TWO_PI) % TWO_PI;
      updateCharacterRotation(newRotation);
    }

    // W / S drive forward and back
    let animation: AnimationName = 'Idle';
    let speed = 0;

    if (keys.w) {
      animation = keys.shift ? 'Running' : 'Walking';
      speed = keys.shift ? RUN_SPEED : WALK_SPEED;
    } else if (keys.s) {
      animation = 'Walking';
      speed = -WALK_SPEED * 0.6; // Slower backwards
    }

    const isMoving = speed !== 0;

    // Only push state when it actually changes, to avoid needless re-renders
    if (animation !== lastAnimation.current) {
      setCurrentAnimation(animation);
      lastAnimation.current = animation;
    }
    if (isMoving !== lastIsMoving.current) {
      setIsMoving(isMoving);
      lastIsMoving.current = isMoving;
    }

    if (!isMoving) return;

    const step = speed * delta;
    let newPosition: [number, number, number] = [
      characterPosition[0] + Math.sin(newRotation) * step,
      0,
      characterPosition[2] + Math.cos(newRotation) * step,
    ];

    // Keep the character inside the arena walls
    newPosition[0] = clampPosition(newPosition[0], -ARENA_BOUND_X, ARENA_BOUND_X);
    newPosition[2] = clampPosition(newPosition[2], -ARENA_BOUND_Z, ARENA_BOUND_Z);

    // Slide around the zone monoliths rather than through them
    newPosition = resolveMonolithCollision(newPosition);

    updateCharacterPosition(newPosition);
  });
};
