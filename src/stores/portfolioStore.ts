import { create } from 'zustand';
import {
  workExperienceData,
  projectsShowcase,
  contactInfoData,
  type WorkExperience,
  type ProjectsShowcase,
  type ContactInfo,
} from '../content';

interface PortfolioState {
  workExperience: WorkExperience[];
  projects: ProjectsShowcase;
  contactInfo: ContactInfo;

  // Actions for future updates
  setWorkExperience: (data: WorkExperience[]) => void;
  setProjects: (data: ProjectsShowcase) => void;
  setContactInfo: (data: ContactInfo) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  workExperience: workExperienceData,
  projects: projectsShowcase,
  contactInfo: contactInfoData,

  setWorkExperience: (data) => set({ workExperience: data }),
  setProjects: (data) => set({ projects: data }),
  setContactInfo: (data) => set({ contactInfo: data }),
}));
