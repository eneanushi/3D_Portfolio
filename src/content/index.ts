/**
 * Content Configuration Barrel Export
 * 
 * This file exports all content configuration modules for easy importing.
 * Import from '@/content' or '../content' to access all configuration.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * IMPORT EXAMPLES
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @example Basic imports
 * ```typescript
 * import { siteConfig, navItems, resumeContentEn } from '@/content';
 * ```
 * 
 * @example SEO imports
 * ```typescript
 * import { seoKeywords, pageMetadata, openGraphConfig } from '@/content';
 * // Or directly from SEO module:
 * import { getAllKeywords, generateOGTags } from '@/content/seo';
 * ```
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ════════════════════════════════════════════════════════════════════════════════
// GLOBAL CONFIGURATION
// ════════════════════════════════════════════════════════════════════════════════

export { 
  siteConfig, 
  navItems,
  assetsLink,
  getStructuredData,
  seo,
  type PersonalIdentity,
  type SocialLinks,
  type CopyrightConfig,
  type SiteConfig,
  type NavItem,
} from './config';

// ════════════════════════════════════════════════════════════════════════════════
// SEO CONFIGURATION
// All SEO-related exports from the dedicated seo/ module
// ════════════════════════════════════════════════════════════════════════════════

export {
  // Keywords
  seoKeywords,
  getAllKeywords,
  getKeywordsString,
  getKeywordsByCategory,
  type SEOKeywords,
  
  // Metadata
  siteMetadata,
  pageMetadata,
  getPageMetadata,
  getCanonicalUrl,
  getPageKeywordsString,
  type PageMetadata,
  type SiteMetadata,
  
  // Structured Data
  personSchemaData,
  websiteSchemaData,
  breadcrumbItems,
  generatePersonSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateProfilePageSchema,
  getAllStructuredData,
  getStructuredDataStrings,
  type PersonSchemaData,
  type WebsiteSchemaData,
  type BreadcrumbItem,
  
  // Social Media
  openGraphConfig,
  twitterCardConfig,
  pageSocialConfigs,
  getPageSocialConfig,
  generateOGTags,
  generateTwitterTags,
  generateAllSocialTags,
  type OGImageConfig,
  type OpenGraphConfig,
  type TwitterCardConfig,
  type PageSocialConfig,
  
  // Unified SEO Config object
  seoConfig,
} from './seo';

// ════════════════════════════════════════════════════════════════════════════════
// PAGE CONTENT
// ════════════════════════════════════════════════════════════════════════════════

// Home page content
export { 
  homeContent, 
  assetAttributions,
  type HomeContent,
  type AssetAttribution,
} from './home';

// Contact page content
export { 
  contactContent, 
  contactLinks,
  type ContactContent,
  type ContactLink,
} from './contact';

// Resume page content
export { 
  resumeContentEn, 
  resumeContentSq, 
  resumeSections,
  resumeDownloadConfig,
  getResumeContent,
  type ResumeContent,
  type JobEntry,
  type EducationEntry,
  type ResumeSection,
} from './resume';

// Arena page content
export { 
  arenaContent, 
  stationContents,
  keyboardControls,
  controlsPanelContent,
  type ArenaContent,
  type StationContent,
  type ControlMapping,
} from './arena';

// Station data (work experience, projects, contact)
export {
  workExperienceData,
  projectsData,
  contactInfoData,
  getWorkExperienceById,
  getProjectById,
  getProjectsWithLinks,
  getAllProjectTechnologies,
  getAllWorkTechnologies,
  type WorkExperience,
  type Project,
  type ContactInfo,
} from './stations';
