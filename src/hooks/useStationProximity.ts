import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../stores/gameStore';
import { STATIONS, STATION_RADIUS } from '../utils/constants';
import { calculateDistance } from '../utils/animationHelpers';
import { StationType } from '../types/station.types';

/**
 * Tracks which zone the character is standing in and drives the zone panel.
 *
 * Entering a zone surfaces the interaction prompt; the panel itself opens on
 * demand (E on desktop, tapping the prompt on touch) so walking past a zone
 * never hijacks the camera.
 */
export const useStationProximity = () => {
  const prevEscape = useRef(false);
  const prevInteract = useRef(false);

  useFrame(() => {
    const {
      characterPosition,
      nearestStation,
      showStationUI,
      keys,
      setNearestStation,
      setShowStationUI,
      setIsUIOpen,
      openStationUI,
      closeStationUI,
    } = useGameStore.getState();

    let closestStation: StationType | null = null;
    let minDistance = STATION_RADIUS;

    // Check distance to each zone
    Object.entries(STATIONS).forEach(([stationType, position]) => {
      const stationPos: [number, number, number] = [position.x, position.y, position.z];
      const distance = calculateDistance(characterPosition, stationPos);

      if (distance < minDistance) {
        minDistance = distance;
        closestStation = stationType as StationType;
      }
    });

    // Update the zone the player is standing in
    if (closestStation !== nearestStation) {
      setNearestStation(closestStation);

      // Walking out of a zone always dismisses its panel
      if (!closestStation && showStationUI) {
        setShowStationUI(false);
        setIsUIOpen(false);
      }
    }

    // E toggles the panel for the current zone (edge triggered)
    if (keys.e && !prevInteract.current && closestStation) {
      if (showStationUI) {
        closeStationUI();
      } else {
        openStationUI();
      }
    }
    prevInteract.current = keys.e;

    // Escape closes the panel (edge triggered)
    if (keys.escape && !prevEscape.current && showStationUI) {
      closeStationUI();
    }
    prevEscape.current = keys.escape;
  });
};
