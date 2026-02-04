// Movement speeds (units per second) - based on three.js Soldier example
export const WALK_SPEED = 2.4;
export const RUN_SPEED = 6.5;
export const ROTATION_SPEED = 3;

// Arena boundaries (slightly inside wall edges)
export const ARENA_BOUND_X = 48;
export const ARENA_BOUND_Z = 48;

// Station positions
export const STATIONS = {
  work: { x: -25, y: 0, z: 0 },
  projects: { x: 0, y: 0, z: -25 },
  contact: { x: 25, y: 0, z: 0 },
} as const;

// Station interaction radius
export const STATION_RADIUS = 6;

// Camera settings
export const CAMERA_OFFSET = {
  distance: 5,      // Distance behind character
  height: 2.8,      // Height above character
  lookAheadDistance: 1.2, // How far ahead of character to look
};

// Animation settings
export const ANIMATION_CROSSFADE_DURATION = 0.2;

// Character spawn position and rotation
export const SPAWN_POSITION: [number, number, number] = [0, 0, 0];
export const SPAWN_ROTATION = 0; // Facing +Z direction initially

// Colors
export const COLORS = {
  bgPrimary: '#0a0a0a',
  bgSecondary: '#111111',
  bgTertiary: '#1a1a1a',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  accent: '#3b82f6',
  ground: '#0f0f12',
} as const;
