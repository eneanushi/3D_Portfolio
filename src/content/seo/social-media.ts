/**
 * Social Media SEO Configuration
 * 
 * This file contains Open Graph and Twitter Card configurations for
 * social media sharing previews (Facebook, Twitter, LinkedIn, WhatsApp, etc.)
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHAT ARE OPEN GRAPH AND TWITTER CARDS?
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * When you share a link on social media, platforms use Open Graph (OG) tags
 * and Twitter Cards to generate rich preview cards with:
 * 
 * - A preview image
 * - Title text
 * - Description text
 * - Site name
 * 
 * Without these tags, shared links appear as plain text URLs.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * PREVIEW IMAGE
 * - Recommended size: 1200x630 pixels (1.91:1 aspect ratio)
 * - Minimum size: 600x315 pixels
 * - File format: PNG or JPG
 * - File size: Under 5MB (ideally under 1MB)
 * - Place in: public/favicon/ or public/images/
 * 
 * TITLES
 * - Keep under 60 characters to avoid truncation
 * - Include your name and what you do
 * - Make it compelling and click-worthy
 * 
 * DESCRIPTIONS
 * - Keep under 155 characters
 * - Summarize the page content
 * - Include a call-to-action if appropriate
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * TESTING SOCIAL MEDIA PREVIEWS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Use these tools to preview and debug your social sharing:
 * 
 * Facebook:
 *   https://developers.facebook.com/tools/debug/
 * 
 * Twitter:
 *   https://cards-dev.twitter.com/validator
 * 
 * LinkedIn:
 *   https://www.linkedin.com/post-inspector/
 * 
 * General Preview:
 *   https://www.opengraph.xyz/
 *   https://metatags.io/
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { siteMetadata, getPageMetadata } from './metadata';

/**
 * Open Graph image configuration interface
 */
export interface OGImageConfig {
  /** 
   * Image URL (use absolute URL for production)
   * @recommended 1200x630 pixels
   */
  url: string;
  
  /** 
   * Image width in pixels
   * @recommended 1200
   */
  width: number;
  
  /** 
   * Image height in pixels
   * @recommended 630
   */
  height: number;
  
  /** 
   * Alt text describing the image
   * Important for accessibility and SEO
   */
  alt: string;
  
  /** 
   * Image MIME type
   */
  type: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp';
}

/**
 * Open Graph configuration interface
 */
export interface OpenGraphConfig {
  /** Site name displayed in social previews */
  siteName: string;
  
  /** Locale for content (e.g., 'en_US') */
  locale: string;
  
  /** Default OG type */
  type: 'website' | 'profile' | 'article';
  
  /** Default image configuration */
  defaultImage: OGImageConfig;
}

/**
 * Twitter Card configuration interface
 */
export interface TwitterCardConfig {
  /** 
   * Card type
   * - 'summary': Small square image
   * - 'summary_large_image': Large rectangular image (recommended)
   */
  card: 'summary' | 'summary_large_image';
  
  /** 
   * Your Twitter handle (without @)
   * @optional Leave empty if you don't have Twitter
   */
  site?: string;
  
  /** 
   * Creator's Twitter handle (without @)
   * @optional Leave empty if you don't have Twitter
   */
  creator?: string;
}

/**
 * Page-specific social media configuration interface
 */
export interface PageSocialConfig {
  /** Page title for social sharing */
  title: string;
  
  /** Page description for social sharing */
  description: string;
  
  /** 
   * Page-specific image URL
   * Falls back to default image if not specified
   */
  image?: string;
}

/**
 * Global Open Graph configuration
 * 
 * These settings apply to all pages unless overridden
 */
export const openGraphConfig: OpenGraphConfig = {
  /**
   * Site name shown in social previews
   * Usually your name + "Portfolio" or similar
   */
  siteName: 'Enea Nushi - Portfolio',
  
  /**
   * Content locale
   * Format: language_TERRITORY
   * @see https://ogp.me/#optional
   */
  locale: 'en_US',
  
  /**
   * Default content type
   */
  type: 'website',
  
  /**
   * Default preview image
   * 
   * ⚠️ IMPORTANT: Update the URL when you deploy to a new domain
   * Image should be placed in public/favicon/ or public/images/
   */
  defaultImage: {
    url: `${siteMetadata.siteUrl}/favicon/Graph_Image.png`,
    width: 1200,
    height: 630,
    alt: 'Enea Nushi - Software Engineer & Web Developer Portfolio',
    type: 'image/png',
  },
};

/**
 * Twitter Card configuration
 * 
 * @optional If you don't use Twitter, you can remove the site/creator fields
 */
export const twitterCardConfig: TwitterCardConfig = {
  /**
   * Card type - 'summary_large_image' shows a large preview image
   */
  card: 'summary_large_image',
  
  /**
   * Your Twitter handle (without @)
   * Leave undefined if you don't have a Twitter account
   */
  site: undefined,
  
  /**
   * Content creator's Twitter handle
   * Usually the same as site for personal portfolios
   */
  creator: undefined,
};

/**
 * Page-specific social media configurations
 * 
 * Customize titles and descriptions for each page
 * These override the default page titles for social sharing
 */
export const pageSocialConfigs: Record<string, PageSocialConfig> = {
  /**
   * HOME PAGE social config
   */
  home: {
    title: 'Enea Nushi | Software Engineer & Full Stack Developer',
    description: 'Explore an interactive 3D portfolio showcasing React, TypeScript, and Three.js projects. Built by a Computer Science student at UMass Lowell.',
  },
  
  /**
   * ABOUT PAGE social config
   */
  about: {
    title: 'About Enea Nushi | Web Developer & CS Student',
    description: 'Learn about my journey in software engineering, from UMass Lowell to building interactive 3D web experiences.',
  },
  
  /**
   * ARENA/PROJECTS PAGE social config
   */
  arena: {
    title: 'Project Arena | Interactive 3D Portfolio',
    description: 'Explore my projects in an immersive 3D environment. React, TypeScript, Three.js, and more.',
  },
  
  /**
   * RESUME PAGE social config
   */
  resume: {
    title: 'Resume | Enea Nushi - Software Engineer',
    description: 'View my professional experience, technical skills, and qualifications. Available for full-time opportunities.',
  },
  
  /**
   * CONTACT PAGE social config
   */
  contact: {
    title: 'Contact Enea Nushi | Get In Touch',
    description: 'Interested in working together? Reach out for collaborations, job opportunities, or just to say hello.',
  },
};

/**
 * Get social media configuration for a specific page
 * 
 * @param pageName - The page identifier
 * @returns PageSocialConfig with title and description
 * 
 * @example
 * ```typescript
 * const socialConfig = getPageSocialConfig('resume');
 * // { title: 'Resume | Enea Nushi...', description: '...' }
 * ```
 */
export const getPageSocialConfig = (pageName: string): PageSocialConfig => {
  return pageSocialConfigs[pageName] || pageSocialConfigs.home;
};

/**
 * Generate complete Open Graph meta tags object for a page
 * 
 * @param pageName - The page identifier
 * @returns Object with all OG meta tag values
 * 
 * @example
 * ```typescript
 * const ogTags = generateOGTags('home');
 * // {
 * //   'og:title': 'Enea Nushi | Software Engineer...',
 * //   'og:description': '...',
 * //   'og:image': 'https://www.eneanushi.space/favicon/Graph_Image.png',
 * //   ...
 * // }
 * ```
 */
export const generateOGTags = (pageName: string) => {
  const socialConfig = getPageSocialConfig(pageName);
  const pageData = getPageMetadata(pageName);
  
  return {
    'og:type': pageData.ogType || openGraphConfig.type,
    'og:url': `${siteMetadata.siteUrl}${pageData.canonicalPath}`,
    'og:title': socialConfig.title,
    'og:description': socialConfig.description,
    'og:image': socialConfig.image || openGraphConfig.defaultImage.url,
    'og:image:width': openGraphConfig.defaultImage.width.toString(),
    'og:image:height': openGraphConfig.defaultImage.height.toString(),
    'og:image:alt': openGraphConfig.defaultImage.alt,
    'og:site_name': openGraphConfig.siteName,
    'og:locale': openGraphConfig.locale,
  };
};

/**
 * Generate complete Twitter Card meta tags object for a page
 * 
 * @param pageName - The page identifier
 * @returns Object with all Twitter Card meta tag values
 */
export const generateTwitterTags = (pageName: string) => {
  const socialConfig = getPageSocialConfig(pageName);
  const pageData = getPageMetadata(pageName);
  
  const tags: Record<string, string> = {
    'twitter:card': twitterCardConfig.card,
    'twitter:url': `${siteMetadata.siteUrl}${pageData.canonicalPath}`,
    'twitter:title': socialConfig.title,
    'twitter:description': socialConfig.description,
    'twitter:image': socialConfig.image || openGraphConfig.defaultImage.url,
    'twitter:image:alt': openGraphConfig.defaultImage.alt,
  };
  
  // Only add site/creator if they're defined
  if (twitterCardConfig.site) {
    tags['twitter:site'] = `@${twitterCardConfig.site}`;
  }
  if (twitterCardConfig.creator) {
    tags['twitter:creator'] = `@${twitterCardConfig.creator}`;
  }
  
  return tags;
};

/**
 * Generate all social media meta tags for a page
 * 
 * @param pageName - The page identifier
 * @returns Combined OG and Twitter Card tags
 */
export const generateAllSocialTags = (pageName: string) => ({
  openGraph: generateOGTags(pageName),
  twitter: generateTwitterTags(pageName),
});
