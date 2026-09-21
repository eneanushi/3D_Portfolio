import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { STATIONS, STATION_RADIUS, COLORS } from '../../utils/constants';
import { getStationContent } from '../../content/arena';
import { StationType } from '../../types/station.types';

interface StationZoneProps {
  type: StationType;
}

const MONOLITH_HEIGHT = 3.6;
const MONOLITH_WIDTH = 2.4;
const DAIS_RADIUS = STATION_RADIUS * 0.62;

/**
 * A single interactive zone: a low dais, a monolith, and a floating label.
 *
 * Everything is built from geometry and the site's own typography rather than
 * baked signage textures, so the zones read as part of the portfolio rather
 * than as game props. The zone brightens gently as the player walks in.
 */
export const StationZone = ({ type }: StationZoneProps) => {
  const position = STATIONS[type];
  const content = getStationContent(type);

  // Turn each monolith so its face greets a player walking in from the centre
  const facing = useMemo(
    () => Math.atan2(-position.x, -position.z),
    [position.x, position.z]
  );

  const monolithRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const inlayRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);
  const labelDomRef = useRef<HTMLDivElement>(null);

  // 0 → far away, 1 → standing in the zone. Drives every highlight here.
  const focus = useRef(0);

  const materials = useMemo(() => {
    const accent = new THREE.Color(COLORS.accent);

    return {
      dais: new THREE.MeshStandardMaterial({
        color: COLORS.stone,
        roughness: 0.85,
        metalness: 0.1,
      }),
      daisRim: new THREE.MeshStandardMaterial({
        color: COLORS.stoneLight,
        roughness: 0.55,
        metalness: 0.35,
      }),
      monolith: new THREE.MeshStandardMaterial({
        color: '#1c1e23',
        roughness: 0.38,
        metalness: 0.5,
        emissive: accent.clone().multiplyScalar(0.05),
      }),
      inlay: new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.35,
      }),
      ring: new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const { characterPosition } = useGameStore.getState();

    const dx = characterPosition[0] - position.x;
    const dz = characterPosition[2] - position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    // Ease in over the last few metres of the approach
    const target = THREE.MathUtils.clamp(
      1 - (distance - STATION_RADIUS) / (STATION_RADIUS * 1.4),
      0,
      1
    );
    focus.current = THREE.MathUtils.damp(focus.current, target, 4, delta);

    const t = state.clock.elapsedTime;
    const f = focus.current;

    if (monolithRef.current) {
      const material = monolithRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.6 + f * 1.8;
      // A barely-there drift so the zone feels alive without animating loudly
      monolithRef.current.position.y = MONOLITH_HEIGHT / 2 + 0.55 + Math.sin(t * 0.6) * 0.04;
      monolithRef.current.rotation.y = Math.sin(t * 0.18) * 0.06;
    }

    if (inlayRef.current) {
      const material = inlayRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.25 + f * 0.5;
      inlayRef.current.scale.y = 1 + f * 0.9;
    }

    if (ringRef.current) {
      const material = ringRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.08 + f * 0.22;
      const scale = 1 + f * 0.04;
      ringRef.current.scale.setScalar(scale);
    }

    if (labelRef.current) {
      labelRef.current.position.y = MONOLITH_HEIGHT + 1.5 + Math.sin(t * 0.6) * 0.04;
    }

    // The floating label is wayfinding for a player at a distance. Once they
    // have arrived, the HUD prompt takes over and the label steps aside.
    if (labelDomRef.current) {
      labelDomRef.current.style.opacity = String(Math.max(0, 1 - f));
      labelDomRef.current.style.transform = `translateY(${f * -6}px)`;
    }
  });

  return (
    <group position={[position.x, 0, position.z]} rotation={[0, facing, 0]}>
      {/* Dais — a low plinth that grounds the zone */}
      <mesh position={[0, 0.09, 0]} receiveShadow castShadow material={materials.dais}>
        <cylinderGeometry args={[DAIS_RADIUS, DAIS_RADIUS + 0.12, 0.18, 64]} />
      </mesh>

      {/* Machined rim around the dais */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.daisRim}>
        <ringGeometry args={[DAIS_RADIUS - 0.14, DAIS_RADIUS, 64]} />
      </mesh>

      {/* Threshold ring marking the interaction radius */}
      <mesh
        ref={ringRef}
        position={[0, 0.025, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.ring}
      >
        <ringGeometry args={[STATION_RADIUS - 0.16, STATION_RADIUS, 96]} />
      </mesh>

      {/* Monolith */}
      <mesh
        ref={monolithRef}
        position={[0, MONOLITH_HEIGHT / 2 + 0.55, 0]}
        castShadow
        receiveShadow
        material={materials.monolith}
      >
        <boxGeometry args={[MONOLITH_WIDTH, MONOLITH_HEIGHT, 0.3]} />

        {/* Accent inlay on the face — it grows as the player closes in, which
            is the zone's only "come here" signal. */}
        <mesh
          ref={inlayRef}
          position={[0, -MONOLITH_HEIGHT / 2 + 0.55, 0.16]}
          material={materials.inlay}
        >
          <planeGeometry args={[0.05, 0.8]} />
        </mesh>
      </mesh>

      {/* Floating label — uses the site's own type, not a baked texture */}
      <group ref={labelRef} position={[0, MONOLITH_HEIGHT + 1.5, 0]}>
        <Html
          center
          distanceFactor={18}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            ref={labelDomRef}
            className="zone-label"
            style={{ transition: 'opacity 220ms linear' }}
          >
            <span className="zone-label__index">{content.index}</span>
            <span className="zone-label__name">{content.name}</span>
          </div>
        </Html>
      </group>
    </group>
  );
};
