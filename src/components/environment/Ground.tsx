import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { ARENA_SIZE, WALL_HEIGHT, COLORS } from '../../utils/constants';

const WALL_THICKNESS = 0.6;

/**
 * Arena shell: floor, perimeter walls and the quiet inlays that give the
 * space a sense of scale. The palette is deliberately neutral so the
 * character and the zone panels stay the brightest things on screen.
 */
export const Ground = () => {
  const groundTexture = useLoader(
    THREE.TextureLoader,
    '/textures/images/Arena_Ground_Texture.png'
  );

  useMemo(() => {
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(5, 5);
    groundTexture.colorSpace = THREE.SRGBColorSpace;
    groundTexture.minFilter = THREE.LinearMipmapLinearFilter;
    groundTexture.magFilter = THREE.LinearFilter;
    groundTexture.anisotropy = 8;
    groundTexture.needsUpdate = true;
  }, [groundTexture]);

  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: COLORS.stone,
        roughness: 0.92,
        metalness: 0.08,
      }),
    []
  );

  const capMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: COLORS.stoneLight,
        roughness: 0.4,
        metalness: 0.5,
      }),
    []
  );

  const inlayMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.045,
        side: THREE.DoubleSide,
      }),
    []
  );

  const half = ARENA_SIZE / 2;

  // North / South / East / West walls
  const walls: { position: [number, number, number]; rotation: [number, number, number] }[] = [
    { position: [0, WALL_HEIGHT / 2, -half], rotation: [0, 0, 0] },
    { position: [0, WALL_HEIGHT / 2, half], rotation: [0, 0, 0] },
    { position: [half, WALL_HEIGHT / 2, 0], rotation: [0, Math.PI / 2, 0] },
    { position: [-half, WALL_HEIGHT / 2, 0], rotation: [0, Math.PI / 2, 0] },
  ];

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[ARENA_SIZE, ARENA_SIZE]} />
        <meshStandardMaterial
          map={groundTexture}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Two concentric inlays: they read as architecture and quietly tell the
          player how far they have wandered from the centre. */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} material={inlayMaterial}>
        <ringGeometry args={[13.9, 14, 128]} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} material={inlayMaterial}>
        <ringGeometry args={[33.9, 34, 128]} />
      </mesh>

      {/* Centre medallion at the spawn point */}
      <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]} material={inlayMaterial}>
        <ringGeometry args={[1.9, 2.05, 64]} />
      </mesh>

      {/* Perimeter walls */}
      {walls.map(({ position, rotation }, index) => (
        <group key={index} position={position} rotation={rotation}>
          <mesh receiveShadow castShadow material={wallMaterial}>
            <boxGeometry args={[ARENA_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          </mesh>
          {/* Light rail along the top edge keeps the horizon legible */}
          <mesh position={[0, WALL_HEIGHT / 2 + 0.1, 0]} material={capMaterial}>
            <boxGeometry args={[ARENA_SIZE, 0.2, WALL_THICKNESS + 0.25]} />
          </mesh>
        </group>
      ))}

      {/* Corner pillars for clean wall joints */}
      {[
        [-half, -half],
        [half, -half],
        [half, half],
        [-half, half],
      ].map(([x, z], index) => (
        <mesh key={index} position={[x, WALL_HEIGHT / 2, z]} receiveShadow castShadow material={capMaterial}>
          <boxGeometry args={[WALL_THICKNESS * 2.2, WALL_HEIGHT + 0.4, WALL_THICKNESS * 2.2]} />
        </mesh>
      ))}
    </group>
  );
};
