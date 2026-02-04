import { useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate tree cubes data matching reference implementation
function generateTreeData() {
  const maxSteps = 5;
  const lengthMult = 0.8;
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const data: number[] = [];
  let instanceCount = 0;
  let minY = Infinity;
  let maxY = -Infinity;

  const random = () => (Math.random() - 0.5) * 2.0;
  const newPosition = new THREE.Vector3();
  const position = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const color = new THREE.Color();

  function createTreePart(
    angle: number,
    x: number,
    y: number,
    z: number,
    length: number,
    count: number
  ) {
    if (Math.random() > (maxSteps / Math.max(1, count)) * 0.25) return;

    if (count < maxSteps) {
      const newLength = length * lengthMult;
      const newX = x + Math.cos(angle) * length;
      const newY = y + Math.sin(angle) * length;
      const countSq = Math.min(3.2, count * count);
      const newZ = z + (Math.random() * countSq - countSq / 2) * length;

      let size = 30 - count * 8;
      if (size > 25) size = 25;
      if (size < 10) size = 10;
      size = size / 100;

      const subSteps = 32;

      for (let i = 0; i < subSteps; i++) {
        instanceCount += 1;

        const percent = i / subSteps;
        const extra = 1 / maxSteps;

        newPosition.set(x, y, z).lerp(new THREE.Vector3(newX, newY, newZ), percent);
        position.copy(newPosition);

        position.x += random() * size * 3;
        position.y += random() * size * 3;
        position.z += random() * size * 3;

        positions.push(position.x, position.y, position.z);
        minY = Math.min(minY, position.y);
        maxY = Math.max(maxY, position.y);

        const scale = Math.random() + 5;

        normal.copy(position).sub(newPosition).normalize();
        normals.push(normal.x, normal.y, normal.z);

        color.setHSL((count / maxSteps) * 0.5 + Math.random() * 0.05, 0.75, 0.6 + Math.random() * 0.1);
        colors.push(color.r, color.g, color.b);

        const instanceSize = size * scale;
        const instanceTime = count / maxSteps + percent * extra;
        const instanceSeed = Math.random();

        data.push(instanceSize * 1.15, instanceTime, instanceSeed);
      }

      for (let b = 0; b < 4; b++) {
        createTreePart(angle + random(), newX, newY, newZ, newLength + random(), count + 1);
      }
    }
  }

  createTreePart(Math.PI * 0.5, 0, 0, 0, 16, 0);

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    colors: new Float32Array(colors),
    data: new Float32Array(data),
    count: instanceCount,
    heightMin: Number.isFinite(minY) ? minY : 0,
    heightRange: Number.isFinite(maxY - minY) && maxY !== minY ? maxY - minY : 1,
  };
}

// Tree component with shader-driven animation matching reference
const ProceduralTree = () => {
  const treeData = useMemo(() => generateTreeData(), []);

  const geometry = useMemo(() => {
    const baseGeometry = new THREE.BoxGeometry(1, 1, 1);
    const instancedGeometry = new THREE.InstancedBufferGeometry();
    instancedGeometry.index = baseGeometry.index;
    instancedGeometry.attributes = baseGeometry.attributes;
    baseGeometry.dispose();

    instancedGeometry.instanceCount = treeData.count;
    instancedGeometry.setAttribute(
      'instancePosition',
      new THREE.InstancedBufferAttribute(treeData.positions, 3)
    );
    instancedGeometry.setAttribute(
      'instanceNormal',
      new THREE.InstancedBufferAttribute(treeData.normals, 3)
    );
    instancedGeometry.setAttribute(
      'instanceColor',
      new THREE.InstancedBufferAttribute(treeData.colors, 3)
    );
    instancedGeometry.setAttribute(
      'instanceData',
      new THREE.InstancedBufferAttribute(treeData.data, 3)
    );

    return instancedGeometry;
  }, [treeData]);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.2,
      metalness: 0.1,
      emissive: new THREE.Color(0x000000),
    });
    mat.defines = { ...(mat.defines ?? {}), USE_UV: '' };

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uHeightMin = { value: treeData.heightMin };
      shader.uniforms.uHeightRange = { value: treeData.heightRange };

      shader.vertexShader = `
        attribute vec3 instancePosition;
        attribute vec3 instanceNormal;
        attribute vec3 instanceColor;
        attribute vec3 instanceData;
        varying vec3 vInstanceColor;
        varying float vSquareEdge;
        varying float vEffect1;
        varying float vEffect2;
        uniform float uTime;
        uniform float uHeightMin;
        uniform float uHeightRange;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          float instanceSize = instanceData.x;
          float instanceSeed = instanceData.z;

          float height = clamp((instancePosition.y - uHeightMin) / uHeightRange, 0.0, 1.0);
          float pulseSpeed = 0.12;
          float pulse1 = fract(uTime * pulseSpeed);
          float pulse2 = fract(uTime * pulseSpeed + 0.5);
          float pulseCenter1 = pulse1 * 1.4 - 0.2;
          float pulseCenter2 = pulse2 * 1.4 - 0.2;

          float dif1 = abs(height - pulseCenter1);
          float effect1 = dif1 <= 0.15 ? (0.15 - dif1) * (1.7 - height) * 10.0 : 0.0;

          float dif2 = abs(height - pulseCenter2);
          float effect2 = dif2 <= 0.15 ? (0.15 - dif2) * (1.7 - height) * 10.0 : 0.0;

          float effect = max(effect1, effect2);

          vec3 direction = normalize(position);
          vec3 transformed = position + instancePosition;
          transformed += direction * (effect + instanceSize);
          transformed -= direction * effect;
          transformed += instanceNormal * effect;
          transformed += instanceNormal * abs(sin(uTime + instanceSeed * 2.0) * 1.5);

          vInstanceColor = instanceColor;
          vEffect1 = effect1;
          vEffect2 = effect2;

          vec2 edgeUV = uv - vec2(0.5);
          float squareDistance = max(abs(edgeUV.x), abs(edgeUV.y));
          vSquareEdge = (clamp(squareDistance / 0.5, 0.85, 1.0) - 0.5) * 2.0;
        `
      );

      shader.fragmentShader = `
        varying vec3 vInstanceColor;
        varying float vSquareEdge;
        varying float vEffect1;
        varying float vEffect2;
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
          #include <color_fragment>
          vec3 instanceBase = vec3(vSquareEdge) - vInstanceColor;
          diffuseColor.rgb = instanceBase;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `
          #include <emissivemap_fragment>
          vec3 pulse = pow(vec3(vEffect1, 0.0, vEffect2), vec3(2.0)) * vInstanceColor;
          totalEmissiveRadiance += pulse;
        `
      );

      mat.userData.shader = shader;
    };

    mat.customProgramCacheKey = () => 'procedural-tree-material';
    mat.needsUpdate = true;
    return mat;
  }, [treeData]);

  useFrame(({ clock }) => {
    const shader = material.userData.shader;
    if (shader) {
      shader.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  if (treeData.count === 0) return null;

  return (
    <mesh
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
      frustumCulled={false}
      scale={0.05}
    />
  );
};

// Shiny checkered floor with strong reflections
const CheckerFloorWithTexture = () => {
  const [colorMap, normalMap] = useLoader(THREE.TextureLoader, [
    '/textures/images/FloorsCheckerboard_S_Diffuse.jpg',
    '/textures/images/FloorsCheckerboard_S_Normal.jpg',
  ]);

  useMemo(() => {
    [colorMap, normalMap].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(15, 15);
    });
    colorMap.colorSpace = THREE.SRGBColorSpace;
  }, [colorMap, normalMap]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={0.8}
        roughness={0.5}
        depthScale={1.5}
        minDepthThreshold={0.2}
        maxDepthThreshold={1.5}
        color="#ffffff"
        metalness={0.8}
        mirror={0.8}
        map={colorMap}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.3, -0.3)}
      />
    </mesh>
  );
};

// Simple fallback floor with reflections
const SimpleFallbackFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={0.6}
        roughness={0.5}
        depthScale={1.5}
        minDepthThreshold={0.2}
        maxDepthThreshold={1.5}
        color="#5a7580"
        metalness={0.7}
        mirror={0.7}
      />
    </mesh>
  );
};

const GradientBackdrop = () => {
  const uniforms = useMemo(
    () => ({
      colorTop: { value: new THREE.Color(0x0066ff) },
      colorBottom: { value: new THREE.Color(0x4195a4) },
    }),
    []
  );

  return (
    <mesh scale={50} frustumCulled={false}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        side={THREE.BackSide}
        fog={false}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vPosition;

          void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 colorTop;
          uniform vec3 colorBottom;
          varying vec3 vPosition;

          void main() {
            float t = clamp(vPosition.y * 0.5 + 0.5, 0.0, 1.0);
            gl_FragColor = vec4(mix(colorBottom, colorTop, t), 1.0);
          }
        `}
      />
    </mesh>
  );
};

// Scene content
const SceneContent = () => {
  return (
    <>
      <fog attach="fog" args={['#4195a4', 1, 20]} />

      <GradientBackdrop />

      <directionalLight
        position={[7, 5, 7]}
        intensity={3.2}
        color={0xffe499}
        castShadow
        shadow-camera-zoom={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[7, -5, 7]} intensity={0.9} color={0x0487e2} />
      <ambientLight intensity={0.25} />

      {/* Floor */}
      <Suspense fallback={<SimpleFallbackFloor />}>
        <CheckerFloorWithTexture />
      </Suspense>

      <ProceduralTree />

      <OrbitControls
        makeDefault
        minDistance={1}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1, 0]}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
      />
    </>
  );
};

// Main export
export const TreeScene = () => {
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
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      camera={{
        fov: 50,
        near: 0.25,
        far: 30,
        position: [4, 2, 4],
      }}
    >
      <SceneContent />
    </Canvas>
  );
};
