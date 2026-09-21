// Movement speeds (units per second) - based on three.js Soldier example
export const WALK_SPEED = 2.4;
export const RUN_SPEED = 6.5;
export const ROTATION_SPEED = 3;

// Arena boundaries (slightly inside wall edges)
export const ARENA_BOUND_X = 48;
export const ARENA_BOUND_Z = 48;

// Arena dimensions
export const ARENA_SIZE = 100;
export const WALL_HEIGHT = 8;

// Zone positions
export const STATIONS = {
  work: { x: -25, y: 0, z: 0 },
  projects: { x: 0, y: 0, z: -25 },
  contact: { x: 25, y: 0, z: 0 },
} as const;

// Zone interaction radius
export const STATION_RADIUS = 6;

// Soft collision radius around each zone monolith
export const MONOLITH_BLOCK_RADIUS = 1.5;

// Camera settings
export const CAMERA_OFFSET = {
  distance: 6.2,          // Distance behind character
  height: 2.9,            // Height above character
  lookAheadDistance: 1.6, // How far ahead of character to look
  lookAtHeight: 1.45,     // Height of the point the camera frames
  fov: 52,                // Base field of view
  fovRun: 56,             // Slightly wider while sprinting, as a speed cue
  damping: 6.5,           // Higher = snappier follow
  lateralOnOpen: 1.9,     // Pan across when a docked panel opens
};

// Animation settings
export const ANIMATION_CROSSFADE_DURATION = 0.2;

// Character spawn position and rotation
export const SPAWN_POSITION: [number, number, number] = [0, 0, 0];
export const SPAWN_ROTATION = 0; // Facing +Z direction initially

// Palette — restrained neutrals shared between the 3D scene and the UI
export const COLORS = {
  bgPrimary: '#000000',
  bgSecondary: '#0a0a0a',
  bgTertiary: '#111111',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  accent: '#c9a962',
  atmosphere: '#0c0d10',
  ground: '#26282e',
  stone: '#17181c',
  stoneLight: '#212329',
} as const;
