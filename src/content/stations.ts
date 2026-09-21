/**
 * Arena Station Data Configuration
 *
 * This file is the single source of truth for the content shown in the
 * interactive arena stations — and, for work experience, for the Resume page
 * as well (see src/content/resume.ts, which maps over `workExperienceData`).
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * The arena has three interactive zones the player can walk up to:
 *
 * 1. WORK ZONE     – professional experience (shared with the Resume page)
 * 2. PROJECTS ZONE – a single call to action pointing at the live work page.
 *                    Deliberately NOT a project list: the projects live on
 *                    eneanushi.com/work so there is nothing to keep in sync here.
 * 3. CONTACT ZONE  – contact and social links
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type {
  WorkExperience,
  ContactInfo,
  ProjectsShowcase,
} from '../types/station.types';

export type { WorkExperience, ContactInfo, ProjectsShowcase };

// ════════════════════════════════════════════════════════════════════════════════
// WORK EXPERIENCE DATA
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Work Experience Entries
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ HOW TO ADD A NEW ROLE:                                                      │
 * │                                                                             │
 * │ 1. Copy an existing entry object                                            │
 * │ 2. Update the id (must be unique)                                           │
 * │ 3. Fill in role, company, period and location                               │
 * │ 4. Write 2–4 bullet points and tag the technologies used                    │
 * │                                                                             │
 * │ Order entries from most recent to oldest, and set `current: true` on the    │
 * │ role you hold today (it gets the "Current" badge in the UI).                │
 * │                                                                             │
 * │ ⚠️ These entries also drive the English Resume page.                        │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */
export const workExperienceData: WorkExperience[] = [
  {
    id: 'spectra',
    role: 'Software Engineer',
    company: 'Spectra',
    period: '01/2026 – Present',
    location: 'Remote',
    current: true,
    points: [
      'Shipped full-stack production apps in React, TypeScript, Next.js, and Three.js for fintech and real estate clients.',
      'Developed automation scripts using Claude, Cursor, and ChatGPT; integrated MCP connectors and IDE plugins.',
      'Managed GitHub repositories, branching, pull requests, and code reviews; coordinated development workflows and delivery through Slack.',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Three.js', 'Claude', 'Cursor', 'MCP', 'GitHub', 'Slack'],
  },
  {
    id: 'trinity',
    role: 'Information Technology Intern',
    company: 'Trinity Life Sciences',
    period: '06/2026 – 08/2026',
    location: 'Waltham, MA',
    points: [
      'Resolved 40+ Tier 2 ServiceNow tickets involving hardware, software, and RBAC across Microsoft 365, GitHub, Copilot, and Perplexity.',
      'Deployed 30+ Entra ID-joined Windows endpoints via Autopilot/Intune with BIOS and compliance validation.',
      'Administered IAM across Microsoft 365 Admin Center and Entra ID; supported PowerShell dynamic groups and authored a zero-touch Workday → Entra ID → Intune proposal.',
    ],
    technologies: ['ServiceNow', 'Microsoft 365', 'Entra ID', 'Intune', 'Autopilot', 'PowerShell', 'IAM', 'RBAC'],
  },
  {
    id: 'techservices',
    role: 'Student Support Analyst',
    company: 'TechServices – University of Massachusetts Lowell',
    period: '02/2025 – 05/2026',
    location: 'Lowell, MA',
    points: [
      'Provide support for 18,000+ students and 1,100+ faculty/staff, resolving account, hardware, and software issues.',
      'Partner with network/security engineers to troubleshoot infrastructure and manage Wi-Fi access for 100+ users.',
      'Re-image and deploy 50+ desktops across departments using standardized configurations.',
    ],
    technologies: ['IT Support', 'Networking', 'Wi-Fi', 'Windows', 'macOS', 'Imaging & Deployment'],
  },
  {
    id: 'tasc',
    role: 'Computer Science Tutor',
    company: 'TASC – Bunker Hill Community College',
    period: '02/2023 – 12/2024',
    location: 'Boston, MA',
    points: [
      'Tutored 60+ students in Java, C++, and Data Structures through debugging and concept reinforcement.',
      'Supported 100+ successful project completions by guiding students sting.',
      'Developed supplemental materials and practice problems to address common programming challenges.',
    ],
    technologies: ['Java', 'C++', 'Data Structures', 'Debugging', 'Mentoring'],
  },
  {
    id: 'moh-boston',
    role: 'IT Technical Support Intern',
    company: "Mayor's Office of Housing, City of Boston",
    period: '06/2023 – 08/2023',
    location: 'Boston, MA',
    points: [
      'Deployed 50+ workstations, replacing legacy desktops with laptops, monitors, docks on fresh Windows installs.',
      'Cleaned database by identifying and removing 400+ outdated records to improve system performance.',
      'Provided end-user support for Windows, macOS, mobile devices, and productivity software across the office.',
    ],
    technologies: ['Windows', 'macOS', 'Mobile Devices', 'Hardware Deployment', 'Data Cleanup'],
  },
];

// ════════════════════════════════════════════════════════════════════════════════
// PROJECTS SHOWCASE
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Projects zone content
 *
 * The arena does not keep its own copy of the project portfolio. It presents a
 * single, well-made invitation to the live work page so there is exactly one
 * place to update when a project ships.
 */
export const projectsShowcase: ProjectsShowcase = {
  eyebrow: 'Selected Work',
  title: 'Explore My Work',
  description:
    'Case studies, live builds and the stack behind them — all kept up to date on the main portfolio.',
  highlights: ['Full-stack web apps', 'Interactive 3D', 'Fintech & real estate'],
  ctaLabel: 'Explore My Work',
  url: 'https://www.eneanushi.com/work',
  displayUrl: 'eneanushi.com/work',
};

// ════════════════════════════════════════════════════════════════════════════════
// CONTACT INFORMATION
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Contact details for the arena contact zone.
 *
 * Note: for the standalone Contact page, edit src/content/contact.ts
 */
export const contactInfoData: ContactInfo = {
  email: 'nushienea3@gmail.com',
  linkedin: 'https://www.linkedin.com/in/enea-nushi/',
  github: 'https://github.com/eneanushi',
  instagram: 'https://www.instagram.com/vision9.dev/',
  website: 'https://www.eneanushi.com',
  // phone: '+1 (555) 123-4567',
};

// ════════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Get a work experience entry by ID
 */
export const getWorkExperienceById = (id: string): WorkExperience | undefined =>
  workExperienceData.find((exp) => exp.id === id);

/**
 * Get all unique technologies across all work experience
 */
export const getAllWorkTechnologies = (): string[] => {
  const techSet = new Set<string>();
  workExperienceData.forEach((exp) => {
    exp.technologies.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};
