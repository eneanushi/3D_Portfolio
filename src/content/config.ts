/**
 * Global Configuration
 * 
 * This file contains the core identity and global settings for the portfolio.
 * Edit this file to customize personal information, branding, and global links.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * CONFIGURATION STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This file handles:
 * - Personal identity (name, title, email, etc.)
 * - Social media links
 * - Copyright information
 * - Navigation items
 * 
 * For SEO configuration (keywords, meta tags, Open Graph, structured data),
 * see the dedicated files in: src/content/seo/
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// Import SEO configuration for integration
import { siteMetadata, getAllKeywords, getKeywordsString } from './seo';

// ════════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════════

/** Personal identity information */
export interface PersonalIdentity {
  /** Full name displayed across the portfolio */
  fullName: string;
  /** First name for casual references */
  firstName: string;
  /** Last name for casual references */
  lastName: string;
  /** Initials used in logo/branding (e.g., "EN") */
  initials: string;
  /** Professional title/role */
  title: string;
  /** Secondary titles for SEO */
  secondaryTitles: string[];
  /** Short tagline or motto */
  tagline: string;
  /** Email address for contact */
  email: string;
  /** Location for local SEO */
  location: string;
  /** University affiliation */
  university: string;
}

/** Social media and professional links */
export interface SocialLinks {
  /** LinkedIn profile URL */
  linkedin: string;
  /** GitHub profile URL */
  github?: string;
  /** Instagram profile URL */
  instagram?: string;
  /** Personal website URL */
  website?: string;
  /** Twitter/X profile URL */
  twitter?: string;
}

/** Copyright configuration */
export interface CopyrightConfig {
  /** Copyright year */
  year: number;
  /** Copyright holder name */
  holder: string;
  /** Full copyright text */
  fullText: string;
}

/** Global site configuration */
export interface SiteConfig {
  /** Personal identity information */
  identity: PersonalIdentity;
  /** Social media links */
  social: SocialLinks;
  /** Copyright information */
  copyright: CopyrightConfig;
}

// ════════════════════════════════════════════════════════════════════════════════
// SITE CONFIGURATION
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Main site configuration
 * 
 * ⚠️ CUSTOMIZATION: Edit these values to personalize the portfolio
 * 
 * @example
 * ```typescript
 * import { siteConfig } from './content';
 * 
 * console.log(siteConfig.identity.fullName); // "Enea Nushi"
 * console.log(siteConfig.social.github);     // "https://github.com/..."
 * ```
 */
export const siteConfig: SiteConfig = {
  /**
   * PERSONAL IDENTITY
   * Your name, title, and basic information
   */
  identity: {
    fullName: 'Enea Nushi',
    firstName: 'Enea',
    lastName: 'Nushi',
    initials: 'EN',
    title: 'Software Engineer',
    secondaryTitles: [
      'Web Developer',
      'React Developer',
      'Full Stack Developer',
      'Frontend Developer',
      'TypeScript Developer',
      'Three.js Developer',
    ],
    tagline: 'Engineering dreams, one line at a time.',
    email: 'nushienea3@gmail.com',
    location: 'Massachusetts, Boston',
    university: 'University of Massachusetts Lowell',
  },

  /**
   * SOCIAL MEDIA LINKS
   * Your professional profiles and contact links
   */
  social: {
    linkedin: 'https://www.linkedin.com/in/enea-nushi/',
    github: 'https://github.com/eneanushi',
    instagram: 'https://www.instagram.com/vision9.dev/',
    website: 'https://www.eneanushi.com',
    // twitter: 'https://twitter.com/yourhandle', // Uncomment if you have Twitter
  },

  /**
   * COPYRIGHT INFORMATION
   * Displayed in footer across all pages
   */
  copyright: {
    year: 2026,
    holder: 'Enea Nushi',
    fullText: 'Copyright © 2026 Enea Nushi',
  },
};

// ════════════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Navigation items used across the site
 * 
 * @example Adding a new page:
 * ```typescript
 * export const navItems = [
 *   // ... existing items
 *   { id: 'blog', label: 'Blog', path: '/blog' },
 * ] as const;
 * ```
 */
export const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'arena', label: 'Arena', path: '/arena' },
  { id: 'resume', label: 'Resume', path: '/resume' },
  { id: 'contact', label: 'Contact', path: '/contact' },
] as const;

export type NavItem = typeof navItems[number];

// ════════════════════════════════════════════════════════════════════════════════
// ASSETS LINK
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Assets/Credits link configuration
 * Displayed in the footer for attribution
 */
export const assetsLink = {
  label: 'Assets',
  path: '/ASSETS.md',
  description: 'View 3D asset credits and attributions',
};

// ════════════════════════════════════════════════════════════════════════════════
// LEGACY SEO SUPPORT
// ════════════════════════════════════════════════════════════════════════════════
// These exports maintain backward compatibility with existing code
// For new implementations, use the dedicated SEO configuration in ./seo/

// Import structured data generators for backward compatibility
import { generatePersonSchema, generateWebsiteSchema } from './seo';

/**
 * @deprecated Use imports from './seo' instead
 * Maintained for backward compatibility
 */
export const getStructuredData = () => ({
  person: generatePersonSchema(),
  website: generateWebsiteSchema(),
});

/**
 * Helper function to get SEO keywords
 * @deprecated Import directly from './seo' instead
 */
export const getSEOKeywords = getAllKeywords;

/**
 * Helper function to get keywords as string
 * @deprecated Import directly from './seo' instead
 */
export const getSEOKeywordsString = getKeywordsString;

/**
 * Site metadata reference (from SEO config)
 * For full SEO configuration, import from './seo'
 */
export const seo = {
  domain: siteMetadata.domain,
  siteUrl: siteMetadata.siteUrl,
  author: siteMetadata.author,
  themeColor: siteMetadata.themeColor,
};
