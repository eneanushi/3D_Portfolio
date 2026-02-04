import { SwatCharacter } from './SwatCharacter';
import { useCharacterMovement } from '../../hooks/useCharacterMovement';
import { useStationProximity } from '../../hooks/useStationProximity';

export const CharacterController = () => {
  // Apply movement logic
  useCharacterMovement();

  // Apply proximity detection
  useStationProximity();

  return <SwatCharacter />;
};
