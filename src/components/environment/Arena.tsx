import { Ground } from './Ground';
import { WorkStation } from './WorkStation';
import { ProjectsStation } from './ProjectsStation';
import { ContactStation } from './ContactStation';
import { Lighting } from './Lighting';

export const Arena = () => {
  return (
    <>
      <Lighting />
      <Ground />
      
      {/* Interactive stations */}
      <WorkStation />
      <ProjectsStation />
      <ContactStation />
    </>
  );
};
