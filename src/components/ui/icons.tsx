/**
 * Shared line icons for the arena UI.
 * Single stroke weight, currentColor, 24px grid — so every icon sits on the
 * same optical footing wherever it is used.
 */

type IconProps = { size?: number };

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const MailIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const LinkedInIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
    <path d="M7 10.5v7M7 7.2v.1" />
    <path d="M11.5 17.5v-7M11.5 13.2a2.7 2.7 0 0 1 5.4 0v4.3" />
  </svg>
);

export const GitHubIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M9 19.5c-4.3 1.3-4.3-2.2-6-2.7m12 5.2v-3.4c0-1 .1-1.4-.5-2 2.6-.3 5-1.3 5-5.7a4.4 4.4 0 0 0-1.2-3 4.1 4.1 0 0 0-.1-3s-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C6.6 4.6 5.6 4.9 5.6 4.9a4.1 4.1 0 0 0-.1 3 4.4 4.4 0 0 0-1.2 3.1c0 4.3 2.4 5.3 5 5.6-.5.5-.6 1-.5 1.6v3.4" />
  </svg>
);

export const InstagramIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.3 6.7v.1" />
  </svg>
);

export const GlobeIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M2.8 12h18.4" />
    <path d="M12 2.8a14 14 0 0 1 0 18.4 14 14 0 0 1 0-18.4" />
  </svg>
);

export const ArrowUpRightIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </svg>
);

export const ChevronDownIcon = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const CloseIcon = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
