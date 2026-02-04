/**
 * Home Page Content Configuration
 * 
 * This file contains all text content and configuration for the home/entry screen.
 * Edit this file to customize the home page appearance and messaging.
 */

import { siteConfig } from './config';

/** Home page content structure */
export interface HomeContent {
  /** Pre-title label above the name */
  preTitle: string;
  /** Main heading - first name */
  firstName: string;
  /** Main heading - last name */
  lastName: string;
  /** Call-to-action text for mobile */
  ctaText: string;
  /** Desktop prompt text */
  desktopPrompt: string;
  /** Assets license button text */
  assetsLicenseText: string;
  /** License modal title */
  licenseModalTitle: string;
  /** License modal description */
  licenseModalDescription: string;
}

/**
 * Home page content configuration
 * 
 * Customize the text displayed on the home/entry screen.
 */
export const homeContent: HomeContent = {
  preTitle: siteConfig.identity.title,
  firstName: siteConfig.identity.firstName,
  lastName: siteConfig.identity.lastName,
  ctaText: 'Enter Portfolio',
  desktopPrompt: 'Press Enter',
  assetsLicenseText: 'Assets License',
  licenseModalTitle: '3D Assets Attribution',
  licenseModalDescription: 'The following 3D assets are used throughout this portfolio:',
};

/** 3D Asset attribution information */
export interface AssetAttribution {
  /** Asset category/source name */
  source: string;
  /** List of assets from this source */
  assets: string;
  /** Link to the source */
  url: string;
  /** Link display text */
  linkText: string;
}

/**
 * Asset attributions for the license modal
 */
export const assetAttributions: AssetAttribution[] = [
  {
    source: 'Three.js Examples',
    assets: 'Lucy Statue (Home), LittlestTokyo (Contact) & Soldier (Arena - via Mixamo)',
    url: 'https://threejs.org/examples',
    linkText: 'threejs.org/examples',
  },
  {
    source: 'Sketchfab',
    assets: 'Mobile Home (Resume)',
    url: 'https://sketchfab.com/3d-models/mobile-home-5240b1dbc29c4ea28be7f91b3638951a',
    linkText: 'View on Sketchfab',
  },
];
