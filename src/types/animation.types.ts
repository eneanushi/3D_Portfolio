import * as THREE from 'three';
import { AnimationName } from './character.types';

export interface AnimationAction {
  action: THREE.AnimationAction;
  name: AnimationName;
}

export interface AnimationManagerProps {
  animations: THREE.AnimationClip[];
  currentAnimation: AnimationName;
  scene: THREE.Group;
}

export interface AnimationTransition {
  from: AnimationName;
  to: AnimationName;
  duration: number;
}
