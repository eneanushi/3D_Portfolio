import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';

export const SwatCharacter = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/3d-models/Soldier.glb');
  const { actions, mixer } = useAnimations(animations, group);

  const characterPosition = useGameStore((state) => state.characterPosition);
  const characterRotation = useGameStore((state) => state.characterRotation);
  const currentAnimation = useGameStore((state) => state.currentAnimation);

  const currentActionRef = useRef<THREE.AnimationAction | null>(null);
  const prevAnimationRef = useRef<string>('Idle');

  // Animation mapping for Soldier.glb
  // animations[0] = Idle
  // animations[1] = Run
  // animations[3] = Walk
  const animationMap = useRef<Record<string, THREE.AnimationAction | null>>({});

  // Setup animation map when actions are ready
  useEffect(() => {
    if (!actions || !animations || animations.length === 0) return;

    console.log('=== SOLDIER CHARACTER DEBUG ===');
    console.log('Number of animations:', animations.length);
    animations.forEach((clip, i) => {
      console.log(`Animation ${i}: "${clip.name}" (duration: ${clip.duration.toFixed(2)}s)`);
    });

    // The Soldier.glb model has: Idle (0), Run (1), TPose (2), Walk (3)
    const idleClip = animations[0];
    const runClip = animations[1];
    const walkClip = animations[3];

    if (idleClip && actions[idleClip.name]) {
      animationMap.current['Idle'] = actions[idleClip.name];
      console.log('Mapped Idle to:', idleClip.name);
    }
    if (runClip && actions[runClip.name]) {
      animationMap.current['Running'] = actions[runClip.name];
      console.log('Mapped Running to:', runClip.name);
    }
    if (walkClip && actions[walkClip.name]) {
      animationMap.current['Walking'] = actions[walkClip.name];
      console.log('Mapped Walking to:', walkClip.name);
    }

    animationMap.current['Dance'] = animationMap.current['Idle'];

  }, [actions, animations]);

  // Setup character materials and shadows
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          // Apply material enhancements 
          if (mesh.name === 'vanguard_Mesh') {
            // Main body mesh
            const material = mesh.material as THREE.MeshStandardMaterial;
            if (material) {
              material.metalness = 0.8;
              material.roughness = 0.3;
              material.color.set(1, 1, 1);
              if (material.map) {
                material.metalnessMap = material.map;
              }
            }
          } else {
            // Other meshes (visor, etc.)
            const material = mesh.material as THREE.MeshStandardMaterial;
            if (material) {
              material.metalness = 0.9;
              material.roughness = 0.1;
              material.transparent = true;
              material.opacity = 0.85;
              material.color.set(1, 1, 1);
            }
          }
        }
      });
    }
  }, [scene]);

  // Initialize - play Idle animation
  useEffect(() => {
    if (!mixer || Object.keys(animationMap.current).length === 0) return;

    const idleAction = animationMap.current['Idle'];
    if (idleAction) {
      idleAction.reset();
      idleAction.setLoop(THREE.LoopRepeat, Infinity);
      idleAction.setEffectiveWeight(1);
      idleAction.setEffectiveTimeScale(1);
      idleAction.play();
      currentActionRef.current = idleAction;
      console.log('Playing initial Idle animation');
    }
  }, [mixer, actions]);

  // Handle animation state changes with smooth crossfading
  useEffect(() => {
    if (!mixer) return;
    if (currentAnimation === prevAnimationRef.current) return;

    const newAction = animationMap.current[currentAnimation];
    const oldAction = currentActionRef.current;

    console.log(`Animation change: ${prevAnimationRef.current} -> ${currentAnimation}`);

    if (newAction && newAction !== oldAction) {
      const fadeDuration = 0.35;

      // Reset and prepare new action
      newAction.reset();
      newAction.setEffectiveWeight(1);
      newAction.setEffectiveTimeScale(1);
      newAction.setLoop(THREE.LoopRepeat, Infinity);

      if (oldAction) {
        // Sync animation time for smooth transitions between walk/run
        if (currentAnimation !== 'Idle' && prevAnimationRef.current !== 'Idle') {
          const oldClipDuration = oldAction.getClip().duration;
          const newClipDuration = newAction.getClip().duration;
          newAction.time = oldAction.time * (newClipDuration / oldClipDuration);
        }

        // Stop any ongoing fades
        oldAction.stopFading();
        newAction.stopFading();

        // Schedule fade out for old action
        oldAction.fadeOut(fadeDuration);
      }

      // Fade in new action
      newAction.fadeIn(fadeDuration);
      newAction.play();
      
      currentActionRef.current = newAction;
    }

    prevAnimationRef.current = currentAnimation;
  }, [currentAnimation, mixer]);

  // Update mixer and transform every frame
  useFrame((_, delta) => {
    mixer?.update(delta);

    if (group.current) {
      group.current.position.set(...characterPosition);
      
      group.current.rotation.y = characterRotation + Math.PI;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.0} />
    </group>
  );
};

useGLTF.preload('/models/3d-models/Soldier.glb');
