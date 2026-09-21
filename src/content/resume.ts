/**
 * Resume Page Content Configuration
 * 
 * This file contains all resume/CV content including work experience,
 * education, skills, and achievements. Supports multiple languages.
 * Edit this file to customize your professional information.
 */

import { siteConfig } from './config';
import { workExperienceData } from './stations';

/** Job/work experience entry */
export interface JobEntry {
  /** Company name with optional department */
  company: string;
  /** Employment period (e.g., "01/2026 – Present") */
  period: string;
  /** Job title/role */
  role: string;
  /** City / work arrangement (e.g., "Remote", "Boston, MA") */
  location: string;
  /** List of responsibilities and achievements */
  points: string[];
}

/**
 * The English work history is derived from the arena station data so the
 * Resume page and the 3D arena can never drift apart.
 * Edit the entries in src/content/stations.ts to change both at once.
 */
const jobsFromStations: JobEntry[] = workExperienceData.map((job) => ({
  company: job.company,
  period: job.period,
  role: job.role,
  location: job.location,
  points: job.points,
}));

/** Education entry */
export interface EducationEntry {
  /** School/institution name */
  name: string;
  /** Degree name */
  degree: string;
  /** GPA or grade information */
  gpa: string;
  /** Graduation date or expected date */
  date: string;
}

/** Resume content for a specific language */
export interface ResumeContent {
  intro: {
    title: string;
    subtitle: string;
    description: string;
  };
  workExperience: {
    title: string;
    jobs: JobEntry[];
  };
  education: {
    title: string;
    schools: EducationEntry[];
  };
  skills: {
    title: string;
    keySkills: string[];
    specializedAreas: string[];
  };
  achievements: {
    title: string;
    awards: string[];
    certifications: string[];
  };
  motto: string;
  downloadResume: string;
  previewResume: string;
}

/** Section navigation item */
export interface ResumeSection {
  id: string;
  labelEn: string;
  labelSq: string;
}

/**
 * Resume section navigation
 */
export const resumeSections: ResumeSection[] = [
  { id: 'intro', labelEn: 'Intro', labelSq: 'Hyrje' },
  { id: 'experience', labelEn: 'Experience', labelSq: 'Përvoja' },
  { id: 'education', labelEn: 'Education', labelSq: 'Edukimi' },
  { id: 'skills', labelEn: 'Skills', labelSq: 'Aftësitë' },
  { id: 'achievements', labelEn: 'Awards', labelSq: 'Çmimet' },
];

/**
 * Resume download configuration
 */
export const resumeDownloadConfig = {
  /** Path to the resume PDF file */
  pdfPath: '/documents/Resume.pdf',
  /** Download filename */
  downloadFilename: 'Resume.pdf',
};

/**
 * Resume content - English
 */
export const resumeContentEn: ResumeContent = {
  intro: {
    title: siteConfig.identity.fullName,
    subtitle: 'Software Engineer & Creative Developer',
    description: `${siteConfig.identity.firstName} is a software engineer and creative developer who brings ideas to life through code. With a foundation in computer science and a flair for intuitive design, he builds everything from AI-driven applications and interactive 3D experiences to scalable web tools and mobile platforms that merge creativity with functionality.`,
  },
  workExperience: {
    title: 'Work Experience',
    jobs: jobsFromStations,
  },
  education: {
    title: 'Education',
    schools: [
      {
        name: 'University of Massachusetts Lowell',
        degree: 'Bachelor of Science in Computer Science',
        gpa: 'GPA: 3.95 / 4.0',
        date: 'Expected Graduation: 05/2027',
      },
      {
        name: 'Bunker Hill Community College',
        degree: 'Associate of Science in Computer Science',
        gpa: 'GPA: 3.9 / 4.0',
        date: 'Completed: 12/2023',
      },
    ],
  },
  skills: {
    title: 'Technical Skills',
    keySkills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Docker', 'PostgreSQL', 'React'],
    specializedAreas: ['Full-Stack Development', 'AI & Automation Integration', '3D & Interactive Experiences'],
  },
  achievements: {
    title: 'Achievements & Certifications',
    awards: [
      'Finalist, UMass Lowell Rist DifferenceMaker $50K Idea Challenge — awarded $2,000 in funding (Spring 2025)',
      'UTeach Project, Honors Fellowship — research-driven web design and video storytelling project (2025)',
      'Selected to pitch ASMIS AI at IdeaCon Rapid Shark Tank, Boston University (2025)',
      '2nd Place, BHCC Hackathon — Spring 2023',
      'Commonwealth Honors Scholar, Bunker Hill Community College',
      'Phi Theta Kappa Honor Society, Bunker Hill Community College',
    ],
    certifications: [
      'CodePath iOS Development — December 2024',
      'CodePath Intermediate Technical Interview Prep — August 2024',
      'C# and .NET Developer Certificate, Infinity Board — July 2023',
      'Introduction to Cybersecurity, Cisco Networking Academy — June 2023',
    ],
  },
  motto: siteConfig.identity.tagline,
  downloadResume: 'Download CV',
  previewResume: 'Preview',
};

/**
 * Resume content - Albanian (Shqip)
 */
export const resumeContentSq: ResumeContent = {
  intro: {
    title: siteConfig.identity.fullName,
    subtitle: 'Inxhinier Softuerësh & Zhvillues Kreativ',
    description: `${siteConfig.identity.firstName} është një inxhinier softuerësh dhe zhvillues kreativ që sjell idetë në jetë përmes kodit. Me një themel në shkenca kompjuterike dhe një prirje për dizajn intuitiv, ai ndërton gjithçka nga aplikacionet e drejtuara nga AI dhe përvoja interaktive 3D deri tek mjetet e skalueshme të internetit dhe platformat celulare që bashkojnë krijimtarinë me funksionalitetin.`,
  },
  workExperience: {
    title: 'Përvoja e Punës',
    jobs: [
      {
        company: 'Spectra',
        period: '01/2026 – Aktualisht',
        role: 'Inxhinier Softuerësh',
        location: 'Në distancë',
        points: [
          'Realizova aplikacione full-stack në prodhim me React, TypeScript, Next.js dhe Three.js për klientë në fintech dhe pasuri të paluajtshme.',
          'Zhvillova skripte automatizimi duke përdorur Claude, Cursor dhe ChatGPT; integrova lidhës MCP dhe shtojca IDE.',
          'Menaxhova depot GitHub, degëzimet, pull request-et dhe rishikimet e kodit; koordinova rrjedhat e zhvillimit dhe dorëzimin përmes Slack.',
        ],
      },
      {
        company: 'Trinity Life Sciences',
        period: '06/2026 – 08/2026',
        role: 'Praktikant i Teknologjisë së Informacionit',
        location: 'Waltham, MA',
        points: [
          'Zgjidha 40+ tiketa ServiceNow të nivelit 2 që përfshinin harduer, softuer dhe RBAC në Microsoft 365, GitHub, Copilot dhe Perplexity.',
          'Vendosa 30+ pajisje Windows të lidhura me Entra ID përmes Autopilot/Intune me validim të BIOS-it dhe pajtueshmërisë.',
          'Administrova IAM në Microsoft 365 Admin Center dhe Entra ID; mbështeta grupe dinamike PowerShell dhe hartova një propozim zero-touch Workday → Entra ID → Intune.',
        ],
      },
      {
        company: 'TechServices – Universiteti i Massachusetts Lowell',
        period: '02/2025 – 05/2026',
        role: 'Analist Mbështetës për Studentët',
        location: 'Lowell, MA',
        points: [
          'Ofroj mbështetje për 18,000+ studentë dhe 1,100+ staf akademik e administrativ, duke zgjidhur probleme llogarie, harduerësh dhe softuerësh.',
          'Bashkëpunoj me inxhinierë rrjeti dhe sigurie për të zgjidhur probleme infrastrukture dhe për të menaxhuar aksesin Wi-Fi për 100+ përdorues.',
          'Ri-imazhoj dhe shpërndaj 50+ desktop në departamente duke përdorur konfigurime të standardizuara.',
        ],
      },
      {
        company: 'TASC – Kolegji Komunitar Bunker Hill',
        period: '02/2023 – 12/2024',
        role: 'Tutor i Shkencave Kompjuterike',
        location: 'Boston, MA',
        points: [
          'Tutorova 60+ studentë në Java, C++ dhe Strukturat e të Dhënave përmes debugimit dhe forcimit të koncepteve.',
          'Mbështeta 100+ projekte të përfunduara me sukses duke udhëzuar studentët.',
          'Zhvillova materiale plotësuese dhe ushtrime praktike për sfidat më të zakonshme të programimit.',
        ],
      },
      {
        company: 'Zyra e Kryetarit të Bashkisë për Strehimin, Qyteti i Bostonit',
        period: '06/2023 – 08/2023',
        role: 'Praktikant i Mbështetjes Teknike IT',
        location: 'Boston, MA',
        points: [
          'Vendosa 50+ stacione pune, duke zëvendësuar desktopët e vjetër me laptopë, monitorë dhe dock-e mbi instalime të freskëta Windows.',
          'Pastrova bazën e të dhënave duke identifikuar dhe hequr 400+ regjistrime të vjetruara për të përmirësuar performancën e sistemit.',
          'Ofrova mbështetje për përdoruesit në Windows, macOS, pajisje mobile dhe softuer produktiviteti në të gjithë zyrën.',
        ],
      },
    ],
  },
  education: {
    title: 'Edukimi',
    schools: [
      {
        name: 'Universiteti i Massachusetts Lowell',
        degree: 'Bachelor i Shkencave në Shkencat Kompjuterike',
        gpa: 'GPA: 3.95 / 4.0',
        date: 'Diplomimi i Pritshëm: 05/2027',
      },
      {
        name: 'Kolegji Komunitar Bunker Hill',
        degree: 'Associate i Shkencave në Shkencat Kompjuterike',
        gpa: 'GPA: 3.9 / 4.0',
        date: 'Përfunduar: 12/2023',
      },
    ],
  },
  skills: {
    title: 'Aftësitë Teknike',
    keySkills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Docker', 'PostgreSQL', 'React'],
    specializedAreas: ['Zhvillim Full-Stack', 'Integrim AI & Automatizim', 'Përvoja 3D & Interaktive'],
  },
  achievements: {
    title: 'Arritjet & Certifikimet',
    awards: [
      'Finalist, UMass Lowell Rist DifferenceMaker $50K Idea Challenge — u shpërblye me $2,000 financim (Pranverë 2025)',
      'Projekti UTeach, Bursa e Nderit — projekt i drejtuar nga kërkimi i dizajnit web dhe tregimit video (2025)',
      'U zgjodh të prezantojë ASMIS AI në IdeaCon Rapid Shark Tank, Universiteti i Bostonit (2025)',
      'Vendi i 2-të, BHCC Hackathon — Pranverë 2023',
      'Studiues i Nderit të Commonwealth, Kolegji Komunitar Bunker Hill',
      'Shoqëria e Nderit Phi Theta Kappa, Kolegji Komunitar Bunker Hill',
    ],
    certifications: [
      'CodePath iOS Development — Dhjetor 2024',
      'CodePath Përgatitja e Intervistës Teknike të Ndërmjetme — Gusht 2024',
      'Certifikata e Zhvilluesit C# dhe .NET, Infinity Board — Korrik 2023',
      'Hyrje në Sigurinë Kibernetike, Akademia e Rrjetëzimit Cisco — Qershor 2023',
    ],
  },
  motto: 'Duke inxhinieruar ëndrrat, një rresht në një kohë.',
  downloadResume: 'Shkarko CV',
  previewResume: 'Shiko',
};

/**
 * Get resume content by language
 */
export const getResumeContent = (language: 'en' | 'sq'): ResumeContent => {
  return language === 'en' ? resumeContentEn : resumeContentSq;
};
