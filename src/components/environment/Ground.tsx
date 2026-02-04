import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Custom component for walls with proper UV mapping
const ArenaWall = ({ 
  position, 
  rotation = [0, 0, 0], 
  size, 
  texture 
}: { 
  position: [number, number, number]; 
  rotation?: [number, number, number]; 
  size: [number, number, number]; 
  texture: THREE.Texture;
}) => {
  const material = useMemo(() => {
    const clonedTexture = texture.clone();
    clonedTexture.wrapS = clonedTexture.wrapT = THREE.RepeatWrapping;
    // Scale texture based on wall dimensions for proper aspect ratio
    const repeatX = size[0] / 8; // One texture repeat every 8 units
    const repeatY = size[1] / 4; // One texture repeat every 4 units height
    clonedTexture.repeat.set(repeatX, repeatY);
    clonedTexture.needsUpdate = true;
    
    return new THREE.MeshStandardMaterial({
      map: clonedTexture,
      roughness: 0.6,
      metalness: 0.2,
    });
  }, [texture, size]);

  return (
    <mesh position={position} rotation={rotation} receiveShadow castShadow material={material}>
      <boxGeometry args={size} />
    </mesh>
  );
};

export const Ground = () => {
  // Load textures
  const arenaTexture = useLoader(THREE.TextureLoader, '/textures/images/Arena_Ground_Texture.png');
  const wallsTexture = useLoader(THREE.TextureLoader, '/textures/images/Arena_Wall_Texture.png');

  // Configure arena texture with higher quality settings
  useMemo(() => {
    arenaTexture.wrapS = arenaTexture.wrapT = THREE.RepeatWrapping;
    arenaTexture.repeat.set(8, 8); // More repetitions for higher detail
    arenaTexture.colorSpace = THREE.SRGBColorSpace;
    arenaTexture.minFilter = THREE.LinearMipmapLinearFilter;
    arenaTexture.magFilter = THREE.LinearFilter;
    arenaTexture.anisotropy = 16; // Higher anisotropy for better quality at angles
    arenaTexture.needsUpdate = true;
  }, [arenaTexture]);

  // Configure walls texture base settings
  useMemo(() => {
    wallsTexture.colorSpace = THREE.SRGBColorSpace;
    wallsTexture.minFilter = THREE.LinearMipmapLinearFilter;
    wallsTexture.magFilter = THREE.LinearFilter;
    wallsTexture.anisotropy = 16;
    wallsTexture.needsUpdate = true;
  }, [wallsTexture]);

  const arenaSize = 100;
  const wallHeight = 8;
  const wallThickness = 0.5;

  return (
    <group>
      {/* Main Ground Plane with arena texture - high quality */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[arenaSize, arenaSize, 1, 1]} />
        <meshStandardMaterial 
          map={arenaTexture}
          roughness={0.7} 
          metalness={0.15} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle grid overlay */}
      <gridHelper 
        args={[arenaSize, 50, '#222233', '#1a1a28']} 
        position={[0, 0.02, 0]} 
      />

      {/* Arena Walls with proper UV mapping */}
      {/* North Wall (-Z) */}
      <ArenaWall 
        position={[0, wallHeight / 2, -arenaSize / 2]} 
        size={[arenaSize, wallHeight, wallThickness]}
        texture={wallsTexture}
      />

      {/* South Wall (+Z) */}
      <ArenaWall 
        position={[0, wallHeight / 2, arenaSize / 2]} 
        size={[arenaSize, wallHeight, wallThickness]}
        texture={wallsTexture}
      />

      {/* East Wall (+X) */}
      <ArenaWall 
        position={[arenaSize / 2, wallHeight / 2, 0]} 
        rotation={[0, Math.PI / 2, 0]}
        size={[arenaSize, wallHeight, wallThickness]}
        texture={wallsTexture}
      />

      {/* West Wall (-X) */}
      <ArenaWall 
        position={[-arenaSize / 2, wallHeight / 2, 0]} 
        rotation={[0, Math.PI / 2, 0]}
        size={[arenaSize, wallHeight, wallThickness]}
        texture={wallsTexture}
      />

      {/* Corner pillars for cleaner wall joints */}
      {[
        [-arenaSize / 2, -arenaSize / 2],
        [arenaSize / 2, -arenaSize / 2],
        [arenaSize / 2, arenaSize / 2],
        [-arenaSize / 2, arenaSize / 2],
      ].map(([x, z], index) => (
        <mesh key={index} position={[x, wallHeight / 2, z]} receiveShadow castShadow>
          <boxGeometry args={[wallThickness * 2, wallHeight, wallThickness * 2]} />
          <meshStandardMaterial 
            color="#1a1a20"
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Center marker */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.3, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};
