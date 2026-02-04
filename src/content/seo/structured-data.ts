/**
 * Structured Data (JSON-LD) Configuration
 * 
 * This file contains Schema.org structured data for rich search results.
 * Structured data helps search engines understand your content and can
 * enable rich snippets in search results.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * WHAT IS STRUCTURED DATA?
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Structured data is a standardized format for providing information about
 * a page and classifying its content. Search engines use this data to:
 * 
 * - Display rich snippets (enhanced search results)
 * - Better understand page content and context
 * - Power features like Knowledge Graph panels
 * - Enable voice search and AI assistants
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * PERSON SCHEMA
 * - Update with your personal information
 * - Include all your professional social profiles
 * - List your actual skills and expertise
 * - Add your educational background
 * 
 * WEBSITE SCHEMA
 * - Update the site name and URL
 * - Keep the search action if your site has search functionality
 * - Remove search action if not applicable
 * 
 * BREADCRUMB SCHEMA
 * - Update to match your site's navigation structure
 * - Add or remove items as you add/remove pages
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * TESTING YOUR STRUCTURED DATA
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Use these tools to validate your structured data:
 * 
 * 1. Google Rich Results Test
 *    https://search.google.com/test/rich-results
 * 
 * 2. Schema.org Validator
 *    https://validator.schema.org/
 * 
 * 3. Google Search Console
 *    Check for structured data errors after deployment
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { siteMetadata } from './metadata';
import { seoKeywords } from './keywords';

/**
 * Person schema data interface
 * @see https://schema.org/Person
 */
export interface PersonSchemaData {
  /** Your full name */
  name: string;
  /** Professional job title */
  jobTitle: string;
  /** Contact email address */
  email: string;
  /** Professional profile image URL */
  image: string;
  /** Array of social media profile URLs */
  socialProfiles: string[];
  /** Educational institution */
  alumniOf: string;
  /** Array of skills and expertise */
  knowsAbout: string[];
  /** Address region (state/province) */
  addressRegion: string;
  /** Address country code */
  addressCountry: string;
}

/**
 * Website schema data interface
 * @see https://schema.org/WebSite
 */
export interface WebsiteSchemaData {
  /** Website name */
  name: string;
  /** Website URL */
  url: string;
  /** Site description */
  description: string;
  /** Author/owner name */
  authorName: string;
}

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /** Display name for the breadcrumb */
  name: string;
  /** Full URL for the breadcrumb item */
  url: string;
}

/**
 * Person schema configuration
 * 
 * Update this with your personal and professional information.
 * This helps search engines understand who you are and can enable
 * Knowledge Graph panels for your name.
 */
export const personSchemaData: PersonSchemaData = {
  /**
   * Your full legal name
   */
  name: 'Enea Nushi',
  
  /**
   * Your current professional title
   */
  jobTitle: 'Software Engineer',
  
  /**
   * Professional contact email
   */
  email: 'nushienea3@gmail.com',
  
  /**
   * URL to your professional photo or avatar
   * Should be a high-quality image (recommended: 400x400px minimum)
   */
  image: `${siteMetadata.siteUrl}/favicon/Graph_Image.png`,
  
  /**
   * All your professional social media profiles
   * Include LinkedIn, GitHub, Twitter, personal website, etc.
   */
  socialProfiles: [
    'https://www.linkedin.com/in/enea-nushi/',
    'https://github.com/eneanushi',
    'https://www.instagram.com/vision9.dev/',
    'https://www.eneanushi.com',
  ],
  
  /**
   * Your university or educational institution
   */
  alumniOf: 'University of Massachusetts Lowell',
  
  /**
   * Skills and areas of expertise
   * These appear in Google Knowledge panels
   */
  knowsAbout: [
    'Software Engineering',
    'Web Development',
    'React',
    'TypeScript',
    'Three.js',
    'Full Stack Development',
    'JavaScript',
    'Python',
    'HTML/CSS',
  ],
  
  /**
   * Your state/province/region
   */
  addressRegion: 'Massachusetts',
  
  /**
   * Your country (ISO 3166-1 alpha-2 code)
   */
  addressCountry: 'US',
};

/**
 * Website schema configuration
 */
export const websiteSchemaData: WebsiteSchemaData = {
  name: 'Enea Nushi - Portfolio',
  url: siteMetadata.siteUrl,
  description: siteMetadata.defaultDescription,
  authorName: personSchemaData.name,
};

/**
 * Breadcrumb navigation structure
 * 
 * Update this array when you add or remove pages from your site.
 * Order should match your site's logical navigation hierarchy.
 */
export const breadcrumbItems: BreadcrumbItem[] = [
  { name: 'Home', url: `${siteMetadata.siteUrl}/` },
  { name: 'About', url: `${siteMetadata.siteUrl}/about` },
  { name: 'Arena', url: `${siteMetadata.siteUrl}/arena` },
  { name: 'Resume', url: `${siteMetadata.siteUrl}/resume` },
  { name: 'Contact', url: `${siteMetadata.siteUrl}/contact` },
];

/**
 * Generate Person schema JSON-LD
 * 
 * @returns Complete Person schema object ready for JSON-LD injection
 * 
 * @example
 * ```html
 * <script type="application/ld+json">
 *   ${JSON.stringify(generatePersonSchema())}
 * </script>
 * ```
 */
export const generatePersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personSchemaData.name,
  jobTitle: personSchemaData.jobTitle,
  email: `mailto:${personSchemaData.email}`,
  url: siteMetadata.siteUrl,
  image: personSchemaData.image,
  sameAs: personSchemaData.socialProfiles,
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: personSchemaData.alumniOf,
  },
  knowsAbout: personSchemaData.knowsAbout,
  address: {
    '@type': 'PostalAddress',
    addressRegion: personSchemaData.addressRegion,
    addressCountry: personSchemaData.addressCountry,
  },
});

/**
 * Generate WebSite schema JSON-LD
 * 
 * @returns Complete WebSite schema object
 */
export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: websiteSchemaData.name,
  url: websiteSchemaData.url,
  author: {
    '@type': 'Person',
    name: websiteSchemaData.authorName,
  },
  description: websiteSchemaData.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteMetadata.siteUrl}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Generate BreadcrumbList schema JSON-LD
 * 
 * @returns Complete BreadcrumbList schema object
 */
export const generateBreadcrumbSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Generate ProfilePage schema JSON-LD
 * 
 * @returns Complete ProfilePage schema object
 */
export const generateProfilePageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: personSchemaData.name,
    alternateName: personSchemaData.name.split(' ').map(n => n[0]).join(''),
    description: `${personSchemaData.jobTitle} specializing in ${seoKeywords.technologies.slice(0, 3).join(', ')}`,
    image: personSchemaData.image,
  },
});

/**
 * Generate all structured data schemas
 * 
 * @returns Object containing all schema generators
 * 
 * @example
 * ```typescript
 * const schemas = getAllStructuredData();
 * // Use in HTML:
 * // <script type="application/ld+json">${JSON.stringify(schemas.person)}</script>
 * ```
 */
export const getAllStructuredData = () => ({
  person: generatePersonSchema(),
  website: generateWebsiteSchema(),
  breadcrumbs: generateBreadcrumbSchema(),
  profilePage: generateProfilePageSchema(),
});

/**
 * Generate structured data as JSON strings ready for HTML injection
 * 
 * @returns Object with stringified JSON-LD for each schema
 */
export const getStructuredDataStrings = () => ({
  person: JSON.stringify(generatePersonSchema(), null, 2),
  website: JSON.stringify(generateWebsiteSchema(), null, 2),
  breadcrumbs: JSON.stringify(generateBreadcrumbSchema(), null, 2),
  profilePage: JSON.stringify(generateProfilePageSchema(), null, 2),
});
