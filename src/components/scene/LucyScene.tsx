import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';

// Lucy Model Component
const LucyModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loader = new PLYLoader();
    loader.load(
      '/models/3d-models/Lucy100k.ply',
      (loadedGeometry) => {
        loadedGeometry.scale(0.0024, 0.0024, 0.0024);
        loadedGeometry.computeVertexNormals();
        setGeometry(loadedGeometry);
        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.error('Error loading Lucy model:', error);
      }
    );
  }, []);

  if (!geometry || !isLoaded) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[0, -Math.PI / 2, 0]}
      position={[0, 0.8, 0]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial 
        color="#b8a080" 
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};

// Animated Spotlight with texture projection
const AnimatedSpotlight = () => {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/textures/images/Lucy_Texture.jpg',
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.generateMipmaps = false;
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
  }, []);

  useFrame(({ clock }) => {
    if (spotLightRef.current) {
      const time = clock.getElapsedTime() * 0.3;
      spotLightRef.current.position.x = Math.cos(time) * 2.5;
      spotLightRef.current.position.z = Math.sin(time) * 2.5;
    }
  });

  return (
    <spotLight
      ref={spotLightRef}
      position={[2.5, 5, 2.5]}
      intensity={100}
      angle={Math.PI / 6}
      penumbra={1}
      decay={2}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-near={2}
      shadow-camera-far={10}
      shadow-bias={-0.003}
      map={texture}
    />
  );
};

// Ground plane to receive spotlight projection
const GroundPlane = () => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      receiveShadow
    >
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial color="#111111" roughness={0.8} />
    </mesh>
  );
};

// Main exported component
export const LucyScene = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      camera={{
        fov: 40,
        near: 0.1,
        far: 100,
        position: [7, 4, 1],
      }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 1, 0);
      }}
    >
      {/* Background color */}
      <color attach="background" args={['#000000']} />
      
      {/* Ambient lighting for visibility */}
      <ambientLight intensity={0.2} />
      
      {/* Hemisphere light */}
      <hemisphereLight
        args={['#ffffff', '#444444', 0.3]}
      />
      
      {/* Animated spotlight with disturb texture */}
      <AnimatedSpotlight />
      
      {/* Ground plane for projection */}
      <GroundPlane />
      
      {/* Lucy model */}
      <LucyModel />
      
      {/* Camera controls */}
      <OrbitControls
        makeDefault
        minDistance={3}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1, 0]}
        enablePan={false}
        enableZoom={true}
        rotateSpeed={0.5}
        autoRotate={false}
      />
    </Canvas>
  );
};
