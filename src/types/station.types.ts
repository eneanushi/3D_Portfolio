export type StationType = 'work' | 'projects' | 'contact';

export interface StationPosition {
  x: number;
  y: number;
  z: number;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  linkedin: string;
  github?: string;
}

export interface StationContent {
  type: StationType;
  title: string;
  position: StationPosition;
  data: WorkExperience[] | Project[] | ContactInfo;
}

export interface StationUIProps {
  station: StationContent | null;
  isVisible: boolean;
  onClose: () => void;
}
