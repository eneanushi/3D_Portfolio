import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const TokyoEnvironment = () => {
  const { scene, animations } = useGLTF('/models/3d-models/LittlestTokyo.glb');
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  // Setup the model
  useEffect(() => {
    if (scene) {
      // Enable shadows for all meshes
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Create animation mixer if there are animations
      if (animations && animations.length > 0) {
        mixerRef.current = new THREE.AnimationMixer(scene);
        
        // Play all animations
        animations.forEach((clip) => {
          const action = mixerRef.current!.clipAction(clip);
          action.play();
        });
      }
    }
  }, [scene, animations]);

  // Update animation mixer
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
      <primitive 
        object={scene} 
        scale={0.015}  // Scale down the model to fit arena
        position={[0, 3, 0]} // Centered in the arena
        rotation={[0, Math.PI, 0]} // Rotate to face the spawn point
      />
  );
};

// Preload the model
useGLTF.preload('/models/3d-models/LittlestTokyo.glb');
