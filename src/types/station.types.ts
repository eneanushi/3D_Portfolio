export type StationType = 'work' | 'projects' | 'contact';

export interface StationPosition {
  x: number;
  y: number;
  z: number;
}

export interface WorkExperience {
  id: string;
  /** Job title / position */
  role: string;
  /** Company or organization name */
  company: string;
  /** Employment period (e.g., "01/2026 – Present") */
  period: string;
  /** City / work arrangement (e.g., "Remote", "Boston, MA") */
  location: string;
  /** Responsibilities and achievements, one bullet per string */
  points: string[];
  /** Technologies and skills used */
  technologies: string[];
  /** Marks the current role */
  current?: boolean;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  linkedin: string;
  github?: string;
  instagram?: string;
  website?: string;
}

export interface ProjectsShowcase {
  /** Small label above the title */
  eyebrow: string;
  /** Headline of the panel */
  title: string;
  /** Supporting sentence */
  description: string;
  /** Short discipline labels — never a maintained project list */
  highlights: string[];
  /** Call to action label */
  ctaLabel: string;
  /** Destination for the call to action */
  url: string;
  /** Human readable version of the destination */
  displayUrl: string;
}

export interface StationUIProps {
  station: StationType | null;
  isVisible: boolean;
  onClose: () => void;
}
