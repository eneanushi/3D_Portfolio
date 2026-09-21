import { Ground } from './Ground';
import { StationZone } from './StationZone';
import { Lighting } from './Lighting';
import { Atmosphere } from './Atmosphere';

export const Arena = () => {
  return (
    <>
      <Lighting />
      <Ground />
      <Atmosphere />

      {/* Interactive zones */}
      <StationZone type="work" />
      <StationZone type="projects" />
      <StationZone type="contact" />
    </>
  );
};
