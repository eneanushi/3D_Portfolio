/**
 * Arena Station Data Configuration
 * 
 * This file contains all content displayed in the interactive arena stations:
 * - Work Experience entries
 * - Project portfolio items
 * - Contact information
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * The arena has three interactive stations that the user can walk up to:
 * 
 * 1. WORK STATION - Displays your professional experience
 * 2. PROJECTS STATION - Showcases your portfolio projects
 * 3. CONTACT STATION - Shows your contact information
 * 
 * To customize:
 * - Add/remove entries from workExperienceData array
 * - Add/remove entries from projectsData array
 * - Update contactInfoData with your contact details
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ════════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Work experience entry interface
 */
export interface WorkExperience {
  /** Unique identifier for the entry */
  id: string;
  /** Job title / position */
  title: string;
  /** Company name and location */
  company: string;
  /** Employment period (e.g., "01/2024 – Present") */
  period: string;
  /** Job description and responsibilities */
  description: string;
  /** Technologies and skills used */
  technologies: string[];
}

/**
 * Project entry interface
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Project title */
  title: string;
  /** Project description */
  description: string;
  /** Technologies used in the project */
  technologies: string[];
  /** Optional: Live project URL */
  link?: string;
  /** Optional: Project screenshot/image URL */
  image?: string;
}

/**
 * Contact information interface
 */
export interface ContactInfo {
  /** Email address */
  email: string;
  /** Optional: Phone number */
  phone?: string;
  /** LinkedIn profile URL */
  linkedin: string;
  /** Optional: GitHub profile URL */
  github?: string;
}

// ════════════════════════════════════════════════════════════════════════════════
// WORK EXPERIENCE DATA
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Work Experience Entries
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ HOW TO ADD A NEW JOB:                                                       │
 * │                                                                             │
 * │ 1. Copy an existing entry object                                           │
 * │ 2. Update the id (must be unique)                                          │
 * │ 3. Fill in your job details                                                │
 * │ 4. List technologies/skills used                                           │
 * │                                                                             │
 * │ TIPS:                                                                       │
 * │ • Order entries from most recent to oldest                                 │
 * │ • Use action verbs in descriptions (Built, Led, Improved, etc.)            │
 * │ • Include quantifiable achievements when possible                          │
 * │ • Keep descriptions concise but informative (2-4 sentences)                │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */
export const workExperienceData: WorkExperience[] = [
  {
    id: '1',
    title: 'Student Support Analyst',
    company: 'TechServices – University of Massachusetts Lowell',
    period: '02/2025 – Present',
    description: 'Provide front-line IT support as part of UMass Lowell\'s TechServices department, supporting over 18,000 students and 1,100 faculty/staff, and resolving 30+ account and login issues weekly. Collaborate with network, system security, and infrastructure engineers to diagnose complex hardware, software, and network problems. Configure Wi-Fi and device connectivity for 100+ users, ensuring secure and reliable access to campus systems. Re-image and deploy 50+ desktops across departments, optimizing system performance and user setup efficiency.',
    technologies: ['IT Support', 'Network Configuration', 'System Administration', 'Hardware Deployment', 'Windows', 'macOS'],
  },
  {
    id: '2',
    title: 'Computer Science Tutor',
    company: 'TASC – Bunker Hill Community College',
    period: '02/2023 – 12/2024',
    description: 'Enhanced coding efficiency of 60+ students by more than 50% through debugging and problem-solving support. Crafted and executed tailored lesson plans for over 50 students, elevating their performance by an average of 25%. Mentored students in Java, C++, and Data Structures, leading to 30+ successful project completions.',
    technologies: ['Java', 'C++', 'Data Structures', 'Teaching', 'Mentoring', 'Problem Solving'],
  },
  {
    id: '3',
    title: 'IT Technical Support Intern',
    company: "Mayor's Office of Housing, City of Boston",
    period: '06/2023 – 08/2023',
    description: 'Improved data accuracy by identifying and deleting 400+ legacy records, ensuring up-to-date information. Upgraded infrastructure by upgrading 50+ legacy hardware components, boosting system reliability. Delivered end-user support across Windows, macOS, iOS, Android, Microsoft Office, Google Workspace, printers, browsers, and file-share systems; maintained hardware inventory and provisioning records.',
    technologies: ['IT Support', 'Hardware Upgrades', 'Data Management', 'Windows', 'macOS', 'iOS', 'Android', 'Microsoft Office', 'Google Workspace'],
  },
  
  // ────────────────────────────────────────────────────────────────────────────
  // ADD MORE WORK EXPERIENCE BELOW
  // Copy this template and fill in your details:
  // ────────────────────────────────────────────────────────────────────────────
  // {
  //   id: '4',
  //   title: 'Your Job Title',
  //   company: 'Company Name – Location',
  //   period: 'MM/YYYY – MM/YYYY',
  //   description: 'Description of your role, responsibilities, and achievements.',
  //   technologies: ['Skill 1', 'Skill 2', 'Technology 1'],
  // },
];

// ════════════════════════════════════════════════════════════════════════════════
// PROJECTS DATA
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Project Portfolio Entries
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ HOW TO ADD A NEW PROJECT:                                                   │
 * │                                                                             │
 * │ 1. Copy an existing project object                                         │
 * │ 2. Update the id (must be unique)                                          │
 * │ 3. Fill in project details                                                 │
 * │ 4. Add link if the project is live (optional)                              │
 * │                                                                             │
 * │ TIPS:                                                                       │
 * │ • Lead with the most impressive/relevant projects                          │
 * │ • Include live links when available                                        │
 * │ • Highlight technical challenges and solutions                             │
 * │ • Mention the impact or results of the project                             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */
export const projectsData: Project[] = [
  {
    id: '1',
    title: 'PvP Multiplayer Battlefield Web3 Gaming Platform',
    description: 'Engineered a real-time PvP multiplayer experience leveraging SpaceTimeDB for scalable state synchronization. Implemented 3D interactive environments using Three.js integrated with React for smooth front-end rendering. Developed and deployed Solana smart contracts to handle staking, battle logic, and secure prize distribution. Designed matchmaking and gameplay flow to support global concurrent users in a competitive arena.',
    technologies: ['React', 'TypeScript', 'Three.js', 'SpaceTimeDB', 'Solana', 'Web3', 'Smart Contracts'],
  },
  {
    id: '2',
    title: 'Full-Stack Trading Platform',
    description: 'Built a real-time trading platform using Node.js, React, and PostgreSQL, simulating real-value market behavior with paper trading. Integrated a Python Django CRM to manage users, trades, and backend operations.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Python', 'Django', 'REST API'],
  },
  {
    id: '3',
    title: 'Real Estate Agent Website',
    description: 'Designed and developed a professional website for real estate agent Anthony Kadelliu to showcase property listings, highlight client testimonials, and capture leads through a built-in contact form. Focused on a modern, responsive user interface with clean design principles and strong SEO optimization to improve online visibility and client engagement.',
    technologies: ['React', 'TypeScript', 'SEO', 'Responsive Design', 'Lead Generation'],
    link: 'https://www.anthonykadelliu.com',
  },
  {
    id: '4',
    title: 'UTeach STEM Teaching – UML Honors Fellowship',
    description: 'Built a static informational website using React and TypeScript to make UTeach program details easy to access and encourage student interest in STEM teaching. Authored a research paper analyzing strategies to inspire and recruit future STEM educators through early exposure and clearly defined program pathways.',
    technologies: ['React', 'TypeScript', 'Research', 'Education', 'Static Site'],
    link: 'https://www.nextgenstemteacher.org',
  },
  {
    id: '5',
    title: 'ASMIS AI Landing Page',
    description: 'Developed the ASMIS AI landing page with clear positioning around 24/7 AI mentorship for international students. Integrated Supabase for secure waitlist management, real-time tracking, and scalable data handling. Designed the page architecture to align with the upcoming mobile experience for consistent branding and user flow.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Landing Page', 'AI/ML'],
    link: 'https://www.asmis.info',
  },
  {
    id: '6',
    title: '3D Background UI – Interactive Environment',
    description: 'An innovative web interface featuring a responsive 3D environment that delivers an immersive user experience through interactive visual elements and motion-driven design.',
    technologies: ['React', 'Three.js', 'TypeScript', '3D Graphics', 'Interactive Design'],
    link: 'https://eneanushi-3d-background-ui.vercel.app',
  },
  {
    id: '7',
    title: 'Graphic Design Portfolio',
    description: 'Developed a portfolio website for a graphic design major using React and TypeScript, emphasizing clean layout, visual hierarchy, and responsive design to showcase creative work effectively.',
    technologies: ['React', 'TypeScript', 'Portfolio', 'Responsive Design', 'Visual Design'],
    link: 'https://www.sindilluka.com',
  },
  {
    id: '8',
    title: 'Artist Portfolio Website',
    description: 'Designed and developed an artist portfolio website using React and TypeScript, allowing the artist to present their work, background, and future marketplace features. Note: This website is still in development. Marketplace functionality, including artwork purchases and live artwork data, is not yet implemented. All paintings and purchasing interactions shown are mock data for demonstration purposes.',
    technologies: ['React', 'TypeScript', 'Portfolio', 'E-commerce', 'Art Gallery'],
    link: 'https://kristanushi.vercel.app',
  },
  
  // ────────────────────────────────────────────────────────────────────────────
  // ADD MORE PROJECTS BELOW
  // Copy this template and fill in your details:
  // ────────────────────────────────────────────────────────────────────────────
  // {
  //   id: '9',
  //   title: 'Your Project Title',
  //   description: 'Description of the project, its purpose, and technical details.',
  //   technologies: ['React', 'TypeScript', 'Other Tech'],
  //   link: 'https://your-project-url.com', // Optional
  // },
];

// ════════════════════════════════════════════════════════════════════════════════
// CONTACT INFORMATION
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Contact Information for Arena Station
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ ⚠️ UPDATE THESE WITH YOUR CONTACT DETAILS                                   │
 * │                                                                             │
 * │ This information is displayed when users interact with the                 │
 * │ Contact station in the arena.                                              │
 * │                                                                             │
 * │ Note: For the main Contact page, edit src/content/contact.ts               │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */
export const contactInfoData: ContactInfo = {
  /** Your professional email address */
  email: 'nushienea3@gmail.com',
  
  /** Your LinkedIn profile URL */
  linkedin: 'https://www.linkedin.com/in/enea-nushi/',
  
  /** Optional: Your GitHub profile URL */
  github: 'https://github.com/eneanushi',
  
  /** Optional: Your phone number (uncomment to use) */
  // phone: '+1 (555) 123-4567',
};

// ════════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Get a work experience entry by ID
 * 
 * @param id - The unique identifier of the work experience
 * @returns The work experience entry or undefined if not found
 */
export const getWorkExperienceById = (id: string): WorkExperience | undefined => {
  return workExperienceData.find(exp => exp.id === id);
};

/**
 * Get a project by ID
 * 
 * @param id - The unique identifier of the project
 * @returns The project entry or undefined if not found
 */
export const getProjectById = (id: string): Project | undefined => {
  return projectsData.find(project => project.id === id);
};

/**
 * Get all projects with live links
 * 
 * @returns Array of projects that have a link property
 */
export const getProjectsWithLinks = (): Project[] => {
  return projectsData.filter(project => project.link);
};

/**
 * Get all unique technologies across all projects
 * 
 * @returns Array of unique technology strings
 */
export const getAllProjectTechnologies = (): string[] => {
  const techSet = new Set<string>();
  projectsData.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};

/**
 * Get all unique technologies across all work experience
 * 
 * @returns Array of unique technology strings
 */
export const getAllWorkTechnologies = (): string[] => {
  const techSet = new Set<string>();
  workExperienceData.forEach(exp => {
    exp.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};
