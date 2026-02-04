import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Tokyo Model Component with animations
const TokyoModel = () => {
  const { scene, animations } = useGLTF('/models/3d-models/LittlestTokyo.glb');
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      // Enable shadows for all meshes
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Enhance materials for better visual quality
          const mesh = child as THREE.Mesh;
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.envMapIntensity = 0.5;
          }
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
      ref={modelRef}
      object={scene} 
      scale={0.012}
      position={[0, -2, -5]}
      rotation={[0, Math.PI * 0.75, 0]}
    />
  );
};

// Ambient atmosphere effect
const AtmosphereEffect = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(0x0a0a12) },
    uColor2: { value: new THREE.Color(0x1a1a2e) },
  }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} scale={100} frustumCulled={false}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        side={THREE.BackSide}
        fog={false}
        depthWrite={false}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            vPosition = position;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            float t = clamp(vPosition.y * 0.5 + 0.5, 0.0, 1.0);
            vec3 color = mix(uColor1, uColor2, t);
            
            // Add subtle pulsing
            float pulse = sin(uTime * 0.2) * 0.02 + 0.98;
            color *= pulse;
            
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

// Floating particles for depth
const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20 + 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
};

// Camera animation controller
const CameraController = () => {
  const { camera } = useThree();
  const targetPosition = useMemo(() => new THREE.Vector3(8, 3, 8), []);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.05;
    
    // Gentle camera sway
    camera.position.x = targetPosition.x + Math.sin(time) * 0.5;
    camera.position.y = targetPosition.y + Math.sin(time * 0.7) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Scene content
const SceneContent = () => {
  return (
    <>
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a12', 15, 60]} />
      
      {/* Sky background */}
      <AtmosphereEffect />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.5} color="#8899aa" />
      
      {/* Main warm light */}
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.8}
        color="#ffe4c4"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Accent light from below */}
      <pointLight
        position={[0, -3, 5]}
        intensity={1.2}
        color="#ff8844"
        distance={20}
      />
      
      {/* Cool fill light */}
      <pointLight
        position={[-10, 5, -10]}
        intensity={0.8}
        color="#4488ff"
        distance={30}
      />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Tokyo model */}
      <TokyoModel />
      
      {/* Camera controller for subtle movement */}
      <CameraController />
      
      {/* Orbit controls - disabled for immersive experience */}
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={[0, 0, 0]}
      />
    </>
  );
};

// Main export
export const TokyoScene = () => {
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
        toneMappingExposure: 1.0,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 150,
        position: [8, 3, 8],
      }}
    >
      <SceneContent />
    </Canvas>
  );
};

// Preload the model
useGLTF.preload('/models/3d-models/LittlestTokyo.glb');
