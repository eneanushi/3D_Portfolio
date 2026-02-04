/**
 * Resume Page Content Configuration
 * 
 * This file contains all resume/CV content including work experience,
 * education, skills, and achievements. Supports multiple languages.
 * Edit this file to customize your professional information.
 */

import { siteConfig } from './config';

/** Job/work experience entry */
export interface JobEntry {
  /** Company name with optional department */
  company: string;
  /** Employment period (e.g., "02/2025 – Present") */
  period: string;
  /** Job title/role */
  role: string;
  /** List of responsibilities and achievements */
  points: string[];
}

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
    jobs: [
      {
        company: 'TechServices | University of Massachusetts Lowell',
        period: '02/2025 – Present',
        role: 'Student Support Analyst',
        points: [
          'Provide front-line IT support for TechServices, assisting more than 18,000 students and 1,100 faculty and staff while resolving 30+ account and login issues weekly.',
          'Collaborate with network, system security, and infrastructure engineers to troubleshoot complex hardware, software, and network issues.',
          'Configure Wi-Fi and device connectivity for 100+ users, ensuring secure and reliable access to campus systems.',
          'Re-image and deploy 50+ desktops across departments, optimizing system performance and usability.',
        ],
      },
      {
        company: 'TASC | Bunker Hill Community College',
        period: '02/2023 – 12/2024',
        role: 'Computer Science Tutor',
        points: [
          'Improved coding efficiency for 60+ students by over 50% through structured debugging and problem-solving support.',
          'Designed and delivered tailored lesson plans for 50+ students, increasing performance by an average of 25%.',
          'Mentored software development principles, leading to 10 students completing projects with improved code quality.',
        ],
      },
      {
        company: "Mayor's Office of Housing, City of Boston",
        period: '06/2023 – 08/2023',
        role: 'IT Technical Support Intern',
        points: [
          'Replaced and upgraded 50+ legacy hardware systems, improving infrastructure performance and reliability.',
          'Cleaned and maintained Salesforce data by removing 400+ outdated records, ensuring accurate and up-to-date organizational data.',
        ],
      },
    ],
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
        company: 'TechServices | Universiteti i Massachusetts Lowell',
        period: '02/2025 – Aktualisht',
        role: 'Analist Mbështetës për Studentët',
        points: [
          'Ofroj mbështetje IT të linjës së parë për TechServices, duke ndihmuar më shumë se 18,000 studentë dhe 1,100 staf akademik dhe administrativ ndërsa zgjidh 30+ probleme llogarie dhe hyrjeje çdo javë.',
          'Bashkëpunoj me inxhinierë të rrjetit, sigurisë së sistemit dhe infrastrukturës për të zgjidhur probleme komplekse harduerësh, softuerësh dhe rrjeti.',
          'Konfiguroj Wi-Fi dhe lidhjen e pajisjeve për 100+ përdorues, duke siguruar qasje të sigurt dhe të besueshme në sistemet e kampusit.',
          'Ri-imazhoj dhe shpërndaj 50+ desktop në departamente, duke optimizuar performancën dhe përdorshmërinë e sistemit.',
        ],
      },
      {
        company: 'TASC | Kolegji Komunitar Bunker Hill',
        period: '02/2023 – 12/2024',
        role: 'Tutor i Shkencave Kompjuterike',
        points: [
          'Përmirësova efikasitetin e kodimit për 60+ studentë me më shumë se 50% përmes mbështetjes së strukturuar të debugimit dhe zgjidhjes së problemeve.',
          'Dizajnova dhe ofrova plane mësimore të personalizuara për 50+ studentë, duke rritur performancën mesatarisht me 25%.',
          'Mentorova parimet e zhvillimit të softuerit, duke çuar në 10 studentë që përfunduan projekte me cilësi të përmirësuar kodi.',
        ],
      },
      {
        company: 'Zyra e Kryetarit të Bashkisë për Strehimin, Qyteti i Bostonit',
        period: '06/2023 – 08/2023',
        role: 'Praktikant i Mbështetjes Teknike IT',
        points: [
          'Zëvendësova dhe përmirësova 50+ sisteme harduerësh të vjetruara, duke përmirësuar performancën dhe besueshmërinë e infrastrukturës.',
          'Pastrova dhe mirëmbajta të dhënat e Salesforce duke hequr 400+ regjistrime të vjetruara, duke siguruar të dhëna organizative të sakta dhe të përditësuara.',
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
