/**
 * Arena Page Content Configuration
 * 
 * This file contains content for the interactive arena/game environment.
 * Edit this file to customize station content, controls, and UI text.
 */

/** Station information displayed in the arena */
export interface StationContent {
  /** Station identifier */
  id: string;
  /** Station display name */
  name: string;
  /** Station description */
  description: string;
}

/** Arena UI text content */
export interface ArenaContent {
  /** Page title */
  title: string;
  /** Loading text */
  loadingText: string;
  /** Landscape orientation prompt */
  landscapePrompt: string;
  /** Station proximity message template */
  stationProximityMessage: string;
}

/**
 * Arena page content configuration
 */
export const arenaContent: ArenaContent = {
  title: '3D Arena',
  loadingText: 'Loading Arena...',
  landscapePrompt: 'Please rotate your device to landscape mode for the best experience.',
  stationProximityMessage: 'Press E to interact with',
};

/**
 * Station content for the arena
 */
export const stationContents: StationContent[] = [
  {
    id: 'work',
    name: 'Work Experience',
    description: 'View professional experience and career history.',
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Explore featured projects and technical work.',
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Get in touch and connect.',
  },
];

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
  { key: 'A', label: 'A', action: 'Strafe left' },
  { key: 'D', label: 'D', action: 'Strafe right' },
  { key: 'Shift', label: 'Shift', action: 'Hold to run' },
  { key: 'I', label: 'I', action: 'Dance' },
  { key: 'H', label: 'H', action: 'Toggle controls' },
  { key: 'Escape', label: 'ESC', action: 'Close UI' },
];

/**
 * Controls panel text content
 */
export const controlsPanelContent = {
  title: 'Controls',
  hideText: 'Press H to hide',
  showText: 'Press H for controls',
};
