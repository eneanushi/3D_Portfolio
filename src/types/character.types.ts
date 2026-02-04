import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

export type AnimationName = 'Idle' | 'Walking' | 'Running' | 'Dance';

export interface CharacterState {
  position: [number, number, number];
  rotation: number;
  currentAnimation: AnimationName;
  isMoving: boolean;
  movementSpeed: number;
}

export interface CharacterGLTF extends GLTF {
  animations: THREE.AnimationClip[];
  scene: THREE.Group;
}

export interface KeyboardState {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  shift: boolean;
  i: boolean;
  h: boolean;
  e: boolean;
  escape: boolean;
}
