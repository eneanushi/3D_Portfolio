import { create } from 'zustand';
import { 
  workExperienceData, 
  projectsData, 
  contactInfoData,
  type WorkExperience,
  type Project,
  type ContactInfo,
} from '../content';

interface PortfolioState {
  workExperience: WorkExperience[];
  projects: Project[];
  contactInfo: ContactInfo;

  // Actions for future updates
  setWorkExperience: (data: WorkExperience[]) => void;
  setProjects: (data: Project[]) => void;
  setContactInfo: (data: ContactInfo) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  workExperience: workExperienceData,
  projects: projectsData,
  contactInfo: contactInfoData,

  setWorkExperience: (data) => set({ workExperience: data }),
  setProjects: (data) => set({ projects: data }),
  setContactInfo: (data) => set({ contactInfo: data }),
}));
