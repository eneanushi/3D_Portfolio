/**
 * Arena Page Content Configuration
 *
 * This file contains content for the interactive arena/game environment.
 * Edit this file to customize zone labels, controls, and UI text.
 */

import type { StationType } from '../types/station.types';

/** A zone the player can walk into */
export interface StationContent {
  /** Station identifier */
  id: StationType;
  /** Short label used on the 3D marker and in the HUD */
  name: string;
  /** One-line description shown in the interaction prompt */
  description: string;
  /** Two-digit index rendered on the 3D marker */
  index: string;
}

/** Arena UI text content */
export interface ArenaContent {
  /** Page title */
  title: string;
  /** Loading text */
  loadingText: string;
  /** Landscape orientation prompt */
  landscapePrompt: string;
  /** Prompt shown when standing inside a zone (desktop) */
  interactPrompt: string;
  /** Prompt shown when standing inside a zone (touch) */
  interactPromptTouch: string;
  /** Hint shown while roaming the arena */
  roamHint: string;
}

/**
 * Arena page content configuration
 */
export const arenaContent: ArenaContent = {
  title: 'Arena',
  loadingText: 'Preparing the arena',
  landscapePrompt: 'Please rotate your device to landscape mode for the best experience.',
  interactPrompt: 'Open',
  interactPromptTouch: 'Tap to open',
  roamHint: 'Walk into a zone to open it',
};

/**
 * Zone content for the arena
 */
export const stationContents: StationContent[] = [
  {
    id: 'work',
    name: 'Experience',
    description: 'Roles, timeline and what I shipped',
    index: '01',
  },
  {
    id: 'projects',
    name: 'Work',
    description: 'Case studies and live builds',
    index: '02',
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Email and social links',
    index: '03',
  },
];

/** Look up a zone by its station id */
export const getStationContent = (id: StationType): StationContent =>
  stationContents.find((station) => station.id === id) ?? stationContents[0];

/** Control key mappings */
export interface ControlMapping {
  /** Key name/code */
  key: string;
  /** Display label */
  label: string;
  /** Action description */
  action: string;
}

/**
 * Keyboard controls configuration
 */
export const keyboardControls: ControlMapping[] = [
  { key: 'W', label: 'W', action: 'Walk forward' },
  { key: 'S', label: 'S', action: 'Walk backward' },
  { key: 'A', label: 'A', action: 'Turn left' },
  { key: 'D', label: 'D', action: 'Turn right' },
  { key: 'Shift', label: 'Shift', action: 'Hold to run' },
  { key: 'E', label: 'E', action: 'Open a zone' },
  { key: 'H', label: 'H', action: 'Toggle controls' },
  { key: 'Escape', label: 'ESC', action: 'Close panel' },
];

/**
 * Controls panel text content
 */
export const controlsPanelContent = {
  title: 'Controls',
  hideText: 'Press H to hide',
  showText: 'Press H for controls',
};
