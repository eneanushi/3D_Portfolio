import * as THREE from 'three';
import { AnimationName } from '../types/character.types';
import { ANIMATION_CROSSFADE_DURATION } from './constants';

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
