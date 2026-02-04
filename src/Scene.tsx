import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Arena } from './components/environment/Arena';
import { CharacterController } from './components/character/CharacterController';
import { CameraRig } from './components/camera/CameraRig';
import * as THREE from 'three';

export const Scene = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{ 
        width: '100%', 
        height: '100%',
        display: 'block',
      }}
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <color attach="background" args={['#1a1a2e']} />
      <fog attach="fog" args={['#1a1a2e', 40, 150]} />
      
      <Suspense fallback={null}>
        <CameraRig />
        <Arena />
        <CharacterController />
      </Suspense>
    </Canvas>
  );
};
