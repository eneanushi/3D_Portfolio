/**
 * SEO Keywords Configuration
 * 
 * This file contains all target keywords for search engine optimization.
 * Organized by category for easy customization.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 1. PRIMARY KEYWORDS (10-15 recommended)
 *    - Your main job titles and professional identifiers
 *    - These appear in meta tags and are most important for SEO
 *    - Example: "Software Engineer", "Full Stack Developer"
 * 
 * 2. TECHNOLOGY KEYWORDS (15-25 recommended)
 *    - Programming languages, frameworks, and tools you specialize in
 *    - Include both full names and common abbreviations
 *    - Example: "React", "ReactJS", "TypeScript", "Node.js"
 * 
 * 3. SPECIALIZATION KEYWORDS (5-10 recommended)
 *    - Unique skills or focus areas that set you apart
 *    - Include project types and methodologies
 *    - Example: "3D Web Development", "Interactive UI/UX"
 * 
 * 4. LOCATION KEYWORDS (3-5 recommended)
 *    - Geographic terms for local SEO
 *    - Include city, state/region, and country variations
 *    - Example: "Boston Developer", "Massachusetts Engineer"
 * 
 * 5. EDUCATION KEYWORDS (2-3 recommended)
 *    - University, degree, and academic terms
 *    - Useful for entry-level or academic positions
 *    - Example: "Computer Science Graduate", "UMass Lowell"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * TIPS FOR KEYWORD RESEARCH
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * - Use Google Keyword Planner (free with Google Ads account)
 * - Check job postings for common terminology in your field
 * - Include both singular and plural forms where relevant
 * - Add variations (e.g., "React Developer" AND "ReactJS Engineer")
 * - Focus on keywords with good search volume + lower competition
 * - Update keywords periodically as trends change
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

/**
 * SEO keyword categories interface
 */
export interface SEOKeywords {
  /** Main job titles and professional identifiers (most important) */
  primary: string[];
  /** Programming languages, frameworks, and tools */
  technologies: string[];
  /** Unique skills and focus areas */
  specializations: string[];
  /** Geographic terms for local SEO */
  location: string[];
  /** University and academic terms */
  education: string[];
}

/**
 * All SEO keywords organized by category
 * 
 * @example Customizing for a different role:
 * ```typescript
 * // For a Data Scientist:
 * primary: ['Data Scientist', 'Machine Learning Engineer', 'AI Developer'],
 * technologies: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas'],
 * specializations: ['Deep Learning', 'Natural Language Processing', 'Computer Vision'],
 * ```
 */
export const seoKeywords: SEOKeywords = {
  /**
   * PRIMARY KEYWORDS
   * Your main professional titles - these are the most important for SEO
   */
  primary: [
    'Software Engineer',
    'Web Developer',
    'Full Stack Developer',
    'Frontend Developer',
    'React Developer',
    'TypeScript Developer',
    'Three.js Developer',
    'Creative Developer',
    'JavaScript Developer',
    'UI Developer',
  ],

  /**
   * TECHNOLOGY KEYWORDS
   * Languages, frameworks, and tools you work with
   */
  technologies: [
    'React',
    'ReactJS',
    'TypeScript',
    'JavaScript',
    'Three.js',
    'WebGL',
    'Node.js',
    'HTML',
    'CSS',
    'HTML5',
    'CSS3',
    'Python',
    'Git',
    'REST API',
    'Vite',
    'Tailwind CSS',
    'Framer Motion',
    'React Three Fiber',
  ],

  /**
   * SPECIALIZATION KEYWORDS
   * Unique skills and project types that set you apart
   */
  specializations: [
    '3D Website Portfolio',
    'Interactive Portfolio',
    '3D Web Development',
    'Interactive Web Design',
    'Creative Web Development',
    'Modern Web Applications',
    'Responsive Web Design',
    'Single Page Applications',
    'Progressive Web Apps',
  ],

  /**
   * LOCATION KEYWORDS
   * Geographic terms for local search optimization
   */
  location: [
    'Massachusetts Developer',
    'Boston Web Developer',
    'Boston Area Developer',
    'New England Developer',
    'USA Software Engineer',
  ],

  /**
   * EDUCATION KEYWORDS
   * Academic and university-related terms
   */
  education: [
    'Computer Science Student',
    'UMass Lowell',
    'University of Massachusetts Lowell',
    'CS Graduate',
  ],
};

/**
 * Get all keywords as a flat array
 * Useful for meta tag generation
 * 
 * @returns Array of all keywords combined
 */
export const getAllKeywords = (): string[] => {
  return [
    ...seoKeywords.primary,
    ...seoKeywords.technologies,
    ...seoKeywords.specializations,
    ...seoKeywords.location,
    ...seoKeywords.education,
  ];
};

/**
 * Get keywords as a comma-separated string
 * Ready for use in meta keywords tag
 * 
 * @returns Comma-separated keyword string
 */
export const getKeywordsString = (): string => {
  return getAllKeywords().join(', ');
};

/**
 * Get a subset of keywords by categories
 * 
 * @param categories - Array of category names to include
 * @returns Array of keywords from specified categories
 * 
 * @example
 * ```typescript
 * // Get only technical keywords
 * getKeywordsByCategory(['technologies', 'specializations']);
 * ```
 */
export const getKeywordsByCategory = (
  categories: (keyof SEOKeywords)[]
): string[] => {
  return categories.flatMap(cat => seoKeywords[cat]);
};
