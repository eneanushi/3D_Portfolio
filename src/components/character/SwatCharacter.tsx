import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';

const FADE_DURATION = 0.35;

export const SwatCharacter = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/3d-models/Soldier.glb');
  const { actions, mixer } = useAnimations(animations, group);

  const currentAnimation = useGameStore((state) => state.currentAnimation);

  const currentActionRef = useRef<THREE.AnimationAction | null>(null);
  const prevAnimationRef = useRef<string>('Idle');

  // Soldier.glb ships its clips in a fixed order: Idle, Run, TPose, Walk
  const animationMap = useRef<Record<string, THREE.AnimationAction | null>>({});

  useEffect(() => {
    if (!actions || !animations || animations.length === 0) return;

    const [idleClip, runClip, , walkClip] = animations;

    if (idleClip && actions[idleClip.name]) {
      animationMap.current['Idle'] = actions[idleClip.name];
    }
    if (runClip && actions[runClip.name]) {
      animationMap.current['Running'] = actions[runClip.name];
    }
    if (walkClip && actions[walkClip.name]) {
      animationMap.current['Walking'] = actions[walkClip.name];
    }

    animationMap.current['Dance'] = animationMap.current['Idle'];
  }, [actions, animations]);

  // Materials: a brushed, lightly metallic finish that holds shape under the
  // arena's restrained lighting instead of reading as a mirror.
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!material) return;

      if (mesh.name === 'vanguard_Mesh') {
        material.metalness = 0.42;
        material.roughness = 0.46;
        material.envMapIntensity = 0.8;
      } else {
        // Visor and trim: glossier, but still opaque so shadows stay clean
        material.metalness = 0.72;
        material.roughness = 0.22;
        material.transparent = false;
        material.opacity = 1;
      }
      material.needsUpdate = true;
    });
  }, [scene]);

  // Kick off the idle loop once the actions exist
  useEffect(() => {
    if (!mixer) return;

    const idleAction = animationMap.current['Idle'];
    if (idleAction && !currentActionRef.current) {
      idleAction.reset();
      idleAction.setLoop(THREE.LoopRepeat, Infinity);
      idleAction.setEffectiveWeight(1);
      idleAction.setEffectiveTimeScale(1);
      idleAction.play();
      currentActionRef.current = idleAction;
    }
  }, [mixer, actions]);

  // Crossfade between states
  useEffect(() => {
    if (!mixer) return;
    if (currentAnimation === prevAnimationRef.current) return;

    const newAction = animationMap.current[currentAnimation];
    const oldAction = currentActionRef.current;

    if (newAction && newAction !== oldAction) {
      newAction.reset();
      newAction.setEffectiveWeight(1);
      newAction.setEffectiveTimeScale(1);
      newAction.setLoop(THREE.LoopRepeat, Infinity);

      if (oldAction) {
        // Keep the stride in phase when swapping walk ↔ run
        if (currentAnimation !== 'Idle' && prevAnimationRef.current !== 'Idle') {
          const oldClipDuration = oldAction.getClip().duration;
          const newClipDuration = newAction.getClip().duration;
          newAction.time = oldAction.time * (newClipDuration / oldClipDuration);
        }

        oldAction.stopFading();
        newAction.stopFading();
        oldAction.fadeOut(FADE_DURATION);
      }

      newAction.fadeIn(FADE_DURATION);
      newAction.play();

      currentActionRef.current = newAction;
    }

    prevAnimationRef.current = currentAnimation;
  }, [currentAnimation, mixer]);

  useFrame((_, delta) => {
    mixer?.update(delta);

    if (!group.current) return;

    const { characterPosition, characterRotation } = useGameStore.getState();
    group.current.position.set(...characterPosition);
    group.current.rotation.y = characterRotation + Math.PI;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.0} />
    </group>
  );
};

useGLTF.preload('/models/3d-models/Soldier.glb');
