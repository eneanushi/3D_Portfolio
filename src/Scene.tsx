import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Arena } from './components/environment/Arena';
import { CharacterController } from './components/character/CharacterController';
import { CameraRig } from './components/camera/CameraRig';
import { COLORS } from './utils/constants';
import * as THREE from 'three';

export const Scene = () => {
  return (
    <Canvas
      shadows="soft"
      dpr={[1, 1.75]}
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
        toneMappingExposure: 1.05,
      }}
    >
      <color attach="background" args={[COLORS.atmosphere]} />
      {/* Exponential fog dissolves the far wall instead of cutting it off */}
      <fogExp2 attach="fog" args={[COLORS.atmosphere, 0.011]} />

      <Suspense fallback={null}>
        <CameraRig />
        <Arena />
        <CharacterController />
      </Suspense>
    </Canvas>
  );
};
