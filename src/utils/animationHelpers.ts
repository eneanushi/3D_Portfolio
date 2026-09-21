import * as THREE from 'three';
import { AnimationName } from '../types/character.types';
import { ANIMATION_CROSSFADE_DURATION, STATIONS, MONOLITH_BLOCK_RADIUS } from './constants';

export const findAnimationByName = (
  animations: THREE.AnimationClip[],
  name: AnimationName
): THREE.AnimationClip | undefined => {
  return animations.find((clip) =>
    clip.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const crossfadeToAnimation = (
  _mixer: THREE.AnimationMixer,
  currentAction: THREE.AnimationAction | null,
  nextAction: THREE.AnimationAction,
  duration: number = ANIMATION_CROSSFADE_DURATION
): void => {
  if (currentAction && currentAction !== nextAction) {
    currentAction.fadeOut(duration);
  }

  nextAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play();
};

export const clampPosition = (
  value: number,
  min: number,
  max: number
): number => {
  return Math.max(min, Math.min(max, value));
};

export const calculateDistance = (
  pos1: [number, number, number],
  pos2: [number, number, number]
): number => {
  const dx = pos1[0] - pos2[0];
  const dy = pos1[1] - pos2[1];
  const dz = pos1[2] - pos2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

/**
 * Slide the character around a zone monolith instead of letting them walk
 * through it. Each monolith is approximated by a small cylinder, and a
 * position inside it is pushed back out to the nearest point on its edge —
 * which reads as sliding along the surface rather than as a hard stop.
 */
export const resolveMonolithCollision = (
  position: [number, number, number]
): [number, number, number] => {
  let [x, y, z] = position;

  for (const station of Object.values(STATIONS)) {
    const dx = x - station.x;
    const dz = z - station.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < MONOLITH_BLOCK_RADIUS) {
      // Exactly on centre: nudge along +X so the direction is well defined
      const nx = distance > 0.0001 ? dx / distance : 1;
      const nz = distance > 0.0001 ? dz / distance : 0;
      x = station.x + nx * MONOLITH_BLOCK_RADIUS;
      z = station.z + nz * MONOLITH_BLOCK_RADIUS;
    }
  }

  return [x, y, z];
};
