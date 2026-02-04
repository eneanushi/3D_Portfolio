/**
 * Page-Specific SEO Metadata Configuration
 * 
 * This file contains SEO metadata (titles, descriptions, keywords) for each page.
 * Edit these values to optimize your portfolio for search engines.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * TITLE TAGS (50-60 characters recommended)
 * - Include your name and primary keyword
 * - Front-load important keywords
 * - Make each page title unique
 * - Format: "[Name] | [Primary Keyword] - [Secondary Keyword]"
 * 
 * META DESCRIPTIONS (150-160 characters recommended)
 * - Write compelling, click-worthy descriptions
 * - Include 1-2 target keywords naturally
 * - Include a call-to-action when appropriate
 * - Make each description unique per page
 * 
 * KEYWORDS (10-15 per page recommended)
 * - Focus on page-relevant keywords
 * - Don't duplicate the same keywords on every page
 * - Mix primary keywords with page-specific terms
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * BEST PRACTICES
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * DO:
 * ✓ Write for humans first, search engines second
 * ✓ Use your name consistently across all pages
 * ✓ Include location keywords if targeting local opportunities
 * ✓ Update descriptions when you add new projects or skills
 * 
 * DON'T:
 * ✗ Stuff keywords unnaturally into descriptions
 * ✗ Use the exact same title/description on multiple pages
 * ✗ Exceed character limits (titles get truncated in search results)
 * ✗ Make false claims about skills or experience
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { seoKeywords } from './keywords';

/**
 * Interface for page-specific SEO metadata
 */
export interface PageMetadata {
  /** 
   * Page title for browser tab and search results
   * @recommended 50-60 characters max
   */
  title: string;
  
  /** 
   * Meta description for search result snippets
   * @recommended 150-160 characters max
   */
  description: string;
  
  /** 
   * Page-specific keywords array
   * @recommended 10-15 keywords per page
   */
  keywords: string[];
  
  /**
   * Canonical URL path (without domain)
   * @example '/' for home, '/resume' for resume page
   */
  canonicalPath: string;
  
  /**
   * Open Graph type for social sharing
   * @see https://ogp.me/#types
   */
  ogType: 'website' | 'profile' | 'article';
}

/**
 * Global site metadata configuration
 */
export interface SiteMetadata {
  /** 
   * Site domain without protocol
   * @example 'www.yourname.com'
   */
  domain: string;
  
  /** 
   * Full site URL with protocol
   * @example 'https://www.yourname.com'
   */
  siteUrl: string;
  
  /** 
   * Default/fallback page title
   */
  defaultTitle: string;
  
  /** 
   * Default site description
   */
  defaultDescription: string;
  
  /** 
   * Site author name
   */
  author: string;
  
  /** 
   * Language code
   * @example 'en', 'en-US'
   */
  language: string;
  
  /**
   * Theme color for browser UI
   * @example '#0a0a0a' (dark), '#ffffff' (light)
   */
  themeColor: string;
}

/**
 * Global site metadata
 * 
 * ⚠️ IMPORTANT: Update the domain when deploying to a new URL
 */
export const siteMetadata: SiteMetadata = {
  /**
   * Your website domain
   * Change this when you deploy to your own domain
   */
  domain: 'www.eneanushi.space',
  
  /**
   * Full site URL (used for canonical links and OG tags)
   * Must include https:// or http://
   */
  siteUrl: 'https://www.eneanushi.space',
  
  /**
   * Default title when no page-specific title is set
   */
  defaultTitle: 'Enea Nushi | Software Engineer & Full Stack Developer',
  
  /**
   * Default description for pages without specific descriptions
   */
  defaultDescription: 'Interactive 3D Portfolio showcasing full-stack development, React, TypeScript, and Three.js projects. Computer Science student at UMass Lowell.',
  
  /**
   * Your full name (used in meta author tag)
   */
  author: 'Enea Nushi',
  
  /**
   * Site language
   */
  language: 'en',
  
  /**
   * Browser theme color (address bar color on mobile)
   */
  themeColor: '#0a0a0a',
};

/**
 * Page-specific metadata configuration
 * 
 * Each page has its own optimized title, description, and keywords.
 * Customize these for better search engine visibility.
 */
export const pageMetadata: Record<string, PageMetadata> = {
  /**
   * HOME PAGE
   * The main landing page - should have strongest SEO focus
   */
  home: {
    title: 'Enea Nushi | Software Engineer & Full Stack Developer',
    description: 'Explore the interactive 3D portfolio of Enea Nushi - Software Engineer, React Developer & Three.js specialist. View projects and experience.',
    keywords: [
      ...seoKeywords.primary.slice(0, 5),
      'Interactive Portfolio',
      '3D Website',
      'Developer Portfolio',
      'Software Engineer Portfolio',
    ],
    canonicalPath: '/',
    ogType: 'website',
  },

  /**
   * ABOUT PAGE
   * Personal background and professional story
   */
  about: {
    title: 'About | Enea Nushi - Web Developer & CS Student',
    description: 'Learn about Enea Nushi - Computer Science student at UMass Lowell, passionate Full Stack Developer specializing in React, TypeScript & 3D web.',
    keywords: [
      'About Enea Nushi',
      'Computer Science Student',
      'UMass Lowell',
      'Full Stack Developer',
      'Web Developer Background',
      'Developer Story',
      ...seoKeywords.education,
    ],
    canonicalPath: '/about',
    ogType: 'profile',
  },

  /**
   * ARENA / PROJECTS PAGE
   * Interactive showcase of work and projects
   */
  arena: {
    title: 'Projects Arena | Enea Nushi - React & Three.js Developer',
    description: 'Explore interactive 3D project showcase featuring React, TypeScript, Node.js, and Three.js applications by Software Engineer Enea Nushi.',
    keywords: [
      'React Projects',
      'Three.js Portfolio',
      'Web Development Projects',
      'Interactive Portfolio',
      'TypeScript Projects',
      'Frontend Projects',
      '3D Web Applications',
      ...seoKeywords.technologies.slice(0, 5),
    ],
    canonicalPath: '/arena',
    ogType: 'website',
  },

  /**
   * RESUME PAGE
   * Professional experience and qualifications
   */
  resume: {
    title: 'Resume | Enea Nushi - Software Engineer Experience',
    description: 'View the professional resume of Enea Nushi - Software Engineer with experience in React, TypeScript, Python, and full-stack development.',
    keywords: [
      'Software Engineer Resume',
      'Developer CV',
      'Technical Skills',
      'Work Experience',
      'React Developer Resume',
      'Full Stack Resume',
      'Web Developer CV',
      ...seoKeywords.primary.slice(0, 3),
    ],
    canonicalPath: '/resume',
    ogType: 'profile',
  },

  /**
   * CONTACT PAGE
   * Contact information and availability
   */
  contact: {
    title: 'Contact | Enea Nushi - Available for Opportunities',
    description: 'Get in touch with Enea Nushi for software development opportunities, collaborations, or inquiries. Based in Massachusetts.',
    keywords: [
      'Contact Developer',
      'Hire Software Engineer',
      'Massachusetts Developer',
      'Boston Area Developer',
      'Freelance Developer',
      'Development Inquiries',
      ...seoKeywords.location.slice(0, 2),
    ],
    canonicalPath: '/contact',
    ogType: 'website',
  },
};

/**
 * Get metadata for a specific page
 * Falls back to home page metadata if page not found
 * 
 * @param pageName - The page identifier (home, about, arena, resume, contact)
 * @returns PageMetadata object for the specified page
 * 
 * @example
 * ```typescript
 * const resumeMeta = getPageMetadata('resume');
 * console.log(resumeMeta.title); // "Resume | Enea Nushi - Software Engineer Experience"
 * ```
 */
export const getPageMetadata = (pageName: string): PageMetadata => {
  return pageMetadata[pageName] || pageMetadata.home;
};

/**
 * Get the full canonical URL for a page
 * 
 * @param pageName - The page identifier
 * @returns Full canonical URL including domain
 * 
 * @example
 * ```typescript
 * getCanonicalUrl('resume'); // "https://www.eneanushi.space/resume"
 * ```
 */
export const getCanonicalUrl = (pageName: string): string => {
  const metadata = getPageMetadata(pageName);
  return `${siteMetadata.siteUrl}${metadata.canonicalPath}`;
};

/**
 * Get keywords as a comma-separated string for a specific page
 * 
 * @param pageName - The page identifier
 * @returns Comma-separated keyword string
 */
export const getPageKeywordsString = (pageName: string): string => {
  const metadata = getPageMetadata(pageName);
  return metadata.keywords.join(', ');
};
