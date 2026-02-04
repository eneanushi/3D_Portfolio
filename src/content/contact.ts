/**
 * Contact Page Content Configuration
 * 
 * This file contains all content and links for the contact page.
 * Edit this file to customize contact information and social links.
 */

import { siteConfig } from './config';

/** Contact link structure */
export interface ContactLink {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Full URL (mailto: for email) */
  url: string;
  /** Optional display URL (shown instead of full URL) */
  displayUrl?: string;
  /** SVG icon as JSX string - rendered in component */
  iconType: 'linkedin' | 'instagram' | 'email' | 'website' | 'github';
}

/** Contact page text content */
export interface ContactContent {
  /** Section label above title */
  sectionLabel: string;
  /** Main title text */
  titleMain: string;
  /** Italic portion of title */
  titleItalic: string;
  /** Projects note text */
  projectsNote: string;
  /** Projects link URL */
  projectsLinkUrl: string;
  /** Projects link text */
  projectsLinkText: string;
  /** Scene indicator label */
  sceneLabel: string;
  /** Scene indicator title */
  sceneTitle: string;
  /** Scene indicator italic text */
  sceneTitleItalic: string;
  /** Attribution text */
  attributionText: string;
  /** Attribution link URL */
  attributionUrl: string;
}

/**
 * Contact page content configuration
 */
export const contactContent: ContactContent = {
  sectionLabel: 'Get In Touch',
  titleMain: "Let's ",
  titleItalic: 'Connect',
  projectsNote: 'Most developed projects and their live URLs can be found at',
  projectsLinkUrl: 'https://www.eneanushi.com/work',
  projectsLinkText: 'eneanushi.com/work',
  sceneLabel: 'Ambient Environment',
  sceneTitle: 'Littlest ',
  sceneTitleItalic: 'Tokyo',
  attributionText: 'LittlestTokyo model via three.js examples',
  attributionUrl: 'https://threejs.org/examples/',
};

/**
 * Contact links configuration
 * 
 * Add, remove, or modify contact/social links here.
 */
export const contactLinks: ContactLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: siteConfig.social.linkedin,
    iconType: 'linkedin',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: siteConfig.social.instagram || '',
    iconType: 'instagram',
  },
  {
    id: 'email',
    label: 'Email',
    url: `mailto:${siteConfig.identity.email}`,
    displayUrl: siteConfig.identity.email,
    iconType: 'email',
  },
  {
    id: 'website',
    label: 'Personal Site',
    url: siteConfig.social.website || '',
    iconType: 'website',
  },
];
