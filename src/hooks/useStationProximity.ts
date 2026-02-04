import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../stores/gameStore';
import { STATIONS, STATION_RADIUS } from '../utils/constants';
import { calculateDistance } from '../utils/animationHelpers';
import { StationType } from '../types/station.types';

export const useStationProximity = () => {
  const characterPosition = useGameStore((state) => state.characterPosition);
  const nearestStation = useGameStore((state) => state.nearestStation);
  const setNearestStation = useGameStore((state) => state.setNearestStation);
  const showStationUI = useGameStore((state) => state.showStationUI);
  const setShowStationUI = useGameStore((state) => state.setShowStationUI);
  const keys = useGameStore((state) => state.keys);
  const setIsUIOpen = useGameStore((state) => state.setIsUIOpen);
  const manuallyClosedStation = useGameStore((state) => state.manuallyClosedStation);
  const setManuallyClosedStation = useGameStore((state) => state.setManuallyClosedStation);
  const closeStationUI = useGameStore((state) => state.closeStationUI);

  const prevEscape = useRef(false);

  useFrame(() => {
    let closestStation: StationType | null = null;
    let minDistance = STATION_RADIUS;

    // Check distance to each station
    Object.entries(STATIONS).forEach(([stationType, position]) => {
      const stationPos: [number, number, number] = [position.x, position.y, position.z];
      const distance = calculateDistance(characterPosition, stationPos);

      if (distance < minDistance) {
        minDistance = distance;
        closestStation = stationType as StationType;
      }
    });

    // Update nearest station
    if (closestStation !== nearestStation) {
      setNearestStation(closestStation);
      // Reset manuallyClosedStation when moving to a different station (or leaving)
      if (closestStation !== manuallyClosedStation) {
        setManuallyClosedStation(null);
      }
    }

    // Handle escape key to close UI (on key down, not held)
    if (keys.escape && !prevEscape.current && showStationUI) {
      closeStationUI();
    }
    prevEscape.current = keys.escape;

    // Auto-show station UI when near a station (but not if manually closed)
    if (closestStation && !showStationUI && manuallyClosedStation !== closestStation) {
      setShowStationUI(true);
      setIsUIOpen(true);
    } else if (!closestStation && showStationUI) {
      setShowStationUI(false);
      setIsUIOpen(false);
    }
  });
};
