/**
 * SEO Configuration Module
 * 
 * Centralized SEO configuration for the portfolio.
 * This barrel file exports all SEO-related configurations and utilities.
 * 
 * @module content/seo
 * 
 * @example Basic usage
 * ```typescript
 * import { seoKeywords, pageMetadata, openGraphConfig } from '../content/seo';
 * 
 * // Get all keywords
 * const keywords = getAllKeywords();
 * 
 * // Get metadata for a specific page
 * const homeMeta = getPageMetadata('home');
 * 
 * // Generate social media tags
 * const socialTags = generateAllSocialTags('resume');
 * ```
 */

// ════════════════════════════════════════════════════════════════════════════════
// KEYWORDS
// ════════════════════════════════════════════════════════════════════════════════

export {
  // Types
  type SEOKeywords,
  
  // Data
  seoKeywords,
  
  // Utilities
  getAllKeywords,
  getKeywordsString,
  getKeywordsByCategory,
} from './keywords';

// ════════════════════════════════════════════════════════════════════════════════
// METADATA
// ════════════════════════════════════════════════════════════════════════════════

export {
  // Types
  type PageMetadata,
  type SiteMetadata,
  
  // Data
  siteMetadata,
  pageMetadata,
  
  // Utilities
  getPageMetadata,
  getCanonicalUrl,
  getPageKeywordsString,
} from './metadata';

// ════════════════════════════════════════════════════════════════════════════════
// STRUCTURED DATA (JSON-LD)
// ════════════════════════════════════════════════════════════════════════════════

export {
  // Types
  type PersonSchemaData,
  type WebsiteSchemaData,
  type BreadcrumbItem,
  
  // Data
  personSchemaData,
  websiteSchemaData,
  breadcrumbItems,
  
  // Generators
  generatePersonSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateProfilePageSchema,
  getAllStructuredData,
  getStructuredDataStrings,
} from './structured-data';

// ════════════════════════════════════════════════════════════════════════════════
// SOCIAL MEDIA (Open Graph & Twitter Cards)
// ════════════════════════════════════════════════════════════════════════════════

export {
  // Types
  type OGImageConfig,
  type OpenGraphConfig,
  type TwitterCardConfig,
  type PageSocialConfig,
  
  // Data
  openGraphConfig,
  twitterCardConfig,
  pageSocialConfigs,
  
  // Utilities
  getPageSocialConfig,
  generateOGTags,
  generateTwitterTags,
  generateAllSocialTags,
} from './social-media';

// ════════════════════════════════════════════════════════════════════════════════
// CONVENIENCE EXPORTS
// ════════════════════════════════════════════════════════════════════════════════

/**
 * Complete SEO configuration object
 * 
 * Provides easy access to all SEO settings in one object
 * 
 * @example
 * ```typescript
 * import { seoConfig } from '../content/seo';
 * 
 * console.log(seoConfig.site.domain);
 * console.log(seoConfig.keywords.primary);
 * console.log(seoConfig.social.openGraph.siteName);
 * ```
 */
import { seoKeywords } from './keywords';
import { siteMetadata, pageMetadata } from './metadata';
import { personSchemaData, websiteSchemaData, breadcrumbItems } from './structured-data';
import { openGraphConfig, twitterCardConfig, pageSocialConfigs } from './social-media';

export const seoConfig = {
  /** Site-wide metadata */
  site: siteMetadata,
  
  /** Page-specific metadata */
  pages: pageMetadata,
  
  /** SEO keywords by category */
  keywords: seoKeywords,
  
  /** Social media configurations */
  social: {
    openGraph: openGraphConfig,
    twitter: twitterCardConfig,
    pages: pageSocialConfigs,
  },
  
  /** Structured data configurations */
  structuredData: {
    person: personSchemaData,
    website: websiteSchemaData,
    breadcrumbs: breadcrumbItems,
  },
} as const;
