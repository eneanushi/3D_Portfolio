import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { STATIONS } from '../../utils/constants';

export const ProjectsStation = () => {
  // Load texture
  const texture = useLoader(THREE.TextureLoader, '/textures/images/Projects_Texture.png');
  
  // Configure texture for optimal display on box
  useMemo(() => {
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
  }, [texture]);

  // Adjusted proportions: wider and shorter for better text readability
  const boxWidth = 3.2;   // Increased width
  const boxHeight = 2.8;  // Reduced height
  const boxDepth = 3.2;   // Match width for square base

  return (
    <group position={[STATIONS.projects.x, 0, STATIONS.projects.z]}>
      {/* Station Box - optimized proportions */}
      <mesh position={[0, boxHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[boxWidth, boxHeight, boxDepth]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.4}
          metalness={0.25}
        />
      </mesh>

      {/* Base platform for grounding */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[boxWidth + 0.5, 0.1, boxDepth + 0.5]} />
        <meshStandardMaterial
          color="#1a1a20"
          roughness={0.7}
          metalness={0.4}
        />
      </mesh>

      {/* Subtle glow ring around base */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[boxWidth / 2 + 0.6, boxWidth / 2 + 0.8, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </mesh>
    </group>
  );
};
