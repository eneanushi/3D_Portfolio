import { create } from 'zustand';
import { AnimationName, KeyboardState } from '../types/character.types';
import { StationType } from '../types/station.types';
import { SPAWN_POSITION, SPAWN_ROTATION } from '../utils/constants';

export type GamePhase = 'entry' | 'mission' | 'loading' | 'playing';

interface GameState {
  // App flow
  gamePhase: GamePhase;
  setGamePhase: (phase: GamePhase) => void;

  // Character state
  characterPosition: [number, number, number];
  characterRotation: number;
  currentAnimation: AnimationName;
  isMoving: boolean;
  isDancing: boolean;

  // Keyboard input state
  keys: KeyboardState;
  setKey: (key: keyof KeyboardState, value: boolean) => void;
  resetKeys: () => void;

  // Station interaction
  nearestStation: StationType | null;
  showStationUI: boolean;
  isUIOpen: boolean;
  manuallyClosedStation: StationType | null;

  // Controls panel
  showControlsPanel: boolean;

  // UI State
  showMinimap: boolean;
  showObjectives: boolean;

  // Actions
  updateCharacterPosition: (pos: [number, number, number]) => void;
  updateCharacterRotation: (rot: number) => void;
  setCurrentAnimation: (anim: AnimationName) => void;
  setIsMoving: (moving: boolean) => void;
  setIsDancing: (dancing: boolean) => void;
  setNearestStation: (station: StationType | null) => void;
  setShowStationUI: (show: boolean) => void;
  setIsUIOpen: (open: boolean) => void;
  setManuallyClosedStation: (station: StationType | null) => void;
  closeStationUI: () => void;
  toggleControlsPanel: () => void;
  toggleMinimap: () => void;
  toggleObjectives: () => void;

  // Reset
  reset: () => void;
}

const initialKeys: KeyboardState = {
  w: false,
  a: false,
  s: false,
  d: false,
  shift: false,
  i: false,
  h: false,
  e: false,
  escape: false,
};

const initialState = {
  gamePhase: 'entry' as GamePhase,
  characterPosition: SPAWN_POSITION,
  characterRotation: SPAWN_ROTATION,
  currentAnimation: 'Idle' as AnimationName,
  isMoving: false,
  isDancing: false,
  keys: { ...initialKeys },
  nearestStation: null,
  showStationUI: false,
  isUIOpen: false,
  manuallyClosedStation: null,
  showControlsPanel: true,
  showMinimap: true,
  showObjectives: true,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  setGamePhase: (phase) => set({ gamePhase: phase }),

  updateCharacterPosition: (pos) => set({ characterPosition: pos }),

  updateCharacterRotation: (rot) => set({ characterRotation: rot }),

  setCurrentAnimation: (anim) => set({ currentAnimation: anim }),

  setIsMoving: (moving) => set({ isMoving: moving }),

  setIsDancing: (dancing) => set({ isDancing: dancing }),

  setKey: (key, value) =>
    set((state) => ({
      keys: { ...state.keys, [key]: value },
    })),

  resetKeys: () => set({ keys: { ...initialKeys } }),

  setNearestStation: (station) => set({ nearestStation: station }),

  setShowStationUI: (show) => set({ showStationUI: show }),

  setIsUIOpen: (open) => set({ isUIOpen: open }),

  setManuallyClosedStation: (station) => set({ manuallyClosedStation: station }),

  closeStationUI: () => set((state) => ({ 
    showStationUI: false, 
    isUIOpen: false,
    manuallyClosedStation: state.nearestStation,
  })),

  toggleControlsPanel: () =>
    set((state) => ({ showControlsPanel: !state.showControlsPanel })),

  toggleMinimap: () =>
    set((state) => ({ showMinimap: !state.showMinimap })),

  toggleObjectives: () =>
    set((state) => ({ showObjectives: !state.showObjectives })),

  reset: () => set(initialState),
}));
