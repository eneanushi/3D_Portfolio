import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { STATIONS, ARENA_SIZE } from '../../utils/constants';

/**
 * Restrained three-point lighting plus a soft follow light on the character.
 * No coloured stage lights: the arena should read as an architectural space.
 */
export const Lighting = () => {
  const followRef = useRef<THREE.SpotLight>(null);
  const followTarget = useRef<THREE.Object3D>(null);

  useFrame(() => {
    const { characterPosition } = useGameStore.getState();

    if (followRef.current && followTarget.current) {
      // A spotlight aims at its target object, which must live in the scene
      if (followRef.current.target !== followTarget.current) {
        followRef.current.target = followTarget.current;
      }

      followRef.current.position.set(
        characterPosition[0] + 2.5,
        9,
        characterPosition[2] + 3.5
      );
      followTarget.current.position.set(
        characterPosition[0],
        0,
        characterPosition[2]
      );
      followTarget.current.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Base fill so nothing ever goes fully black */}
      <ambientLight intensity={0.5} color="#c8ccd6" />
      <hemisphereLight args={['#aab2c4', '#0d0e11', 0.55]} />

      {/* Key light — the only shadow caster */}
      <directionalLight
        position={[22, 30, 16]}
        intensity={1.9}
        color="#fff4e2"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-ARENA_SIZE / 2}
        shadow-camera-right={ARENA_SIZE / 2}
        shadow-camera-top={ARENA_SIZE / 2}
        shadow-camera-bottom={-ARENA_SIZE / 2}
      />

      {/* Cool fill from the opposite side */}
      <directionalLight position={[-18, 12, -14]} intensity={0.35} color="#9fb0cc" />

      {/* Rim light to separate silhouettes from the far wall */}
      <directionalLight position={[0, 9, -26]} intensity={0.45} color="#dfe6f2" />

      {/* Soft follow light keeps the character readable anywhere in the arena */}
      <spotLight
        ref={followRef}
        intensity={26}
        angle={0.55}
        penumbra={1}
        distance={26}
        decay={1.6}
        color="#fff6ea"
      />
      <object3D ref={followTarget} />

      {/* One quiet uplight per zone so the monoliths sit in their own pool */}
      {Object.values(STATIONS).map((station, index) => (
        <pointLight
          key={index}
          position={[station.x, 4.2, station.z]}
          intensity={9}
          distance={16}
          decay={1.8}
          color="#d8c7a2"
        />
      ))}
    </>
  );
};
