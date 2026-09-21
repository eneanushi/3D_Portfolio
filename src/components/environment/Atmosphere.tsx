import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';

/**
 * Backdrop and grounding.
 *
 * A gradient dome gives the sky above the walls some depth instead of a flat
 * clear colour, and a soft blob shadow keeps the character anchored to the
 * floor even where the directional shadow is shallow.
 */
export const Atmosphere = () => {
  const shadowRef = useRef<THREE.Mesh>(null);

  const domeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          topColor: { value: new THREE.Color('#16181d') },
          bottomColor: { value: new THREE.Color('#08090b') },
        },
        vertexShader: /* glsl */ `
          varying float vHeight;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vHeight = worldPosition.y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          varying float vHeight;
          void main() {
            float t = clamp(vHeight / 90.0, 0.0, 1.0);
            gl_FragColor = vec4(mix(bottomColor, topColor, t), 1.0);
          }
        `,
      }),
    []
  );

  // Soft radial falloff used as a fake contact shadow under the character
  const shadowTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
      gradient.addColorStop(0.55, 'rgba(0, 0, 0, 0.22)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame(() => {
    const { characterPosition } = useGameStore.getState();
    if (shadowRef.current) {
      shadowRef.current.position.set(
        characterPosition[0],
        0.018,
        characterPosition[2]
      );
    }
  });

  return (
    <>
      <mesh material={domeMaterial} position={[0, 0, 0]} renderOrder={-1}>
        <sphereGeometry args={[220, 32, 16]} />
      </mesh>

      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          depthWrite={false}
          opacity={0.9}
        />
      </mesh>
    </>
  );
};
