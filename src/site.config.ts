// ─────────────────────────────────────────────────────────────────────────────
// site.config.ts — Single file to customize per client.
//
// For a new client (e.g. misspaolasal.com):
//   1. Edit every value in this file
//   2. Swap design tokens in src/styles/global.css (@theme block)
//   3. Replace src/assets/myphoto.jpg
//   4. Update astro.config.mjs `site:` URL
//   5. Replace content in src/content/blog/ and src/content/projects/
// ─────────────────────────────────────────────────────────────────────────────

// ── Feature Flags ─────────────────────────────────────────────────────────────
// When false: no route, no script tag, no UI is emitted for that feature.
// Change these to true once the corresponding feature is ready for this client.

export const FEATURES = {
  // ── Core content ────────────────────────────────
  blog: true,
  projects: true,
  search: true,
  rss: true,

  // ── Engagement ──────────────────────────────────
  newsletter: false,

  // ── Blog post UX ────────────────────────────────
  tableOfContents: true,
  readingProgress: true,
  socialSharing: false,
  dynamicOgImages: false,

  // ── Monetization ────────────────────────────────
  kofi: false,

  // ── Privacy ─────────────────────────────────────
  cookieConsent: false,
} as const;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LogoConfig {
  /** Plain-color segment, e.g. "nikka" */
  part1: string;
  /** Accent-color segment, e.g. "paola" */
  part2: string;
  /** Appended after part2 in plain color. Footer uses it; Header omits it. */
  suffix?: string;
}

export interface NavLink {
  href: string;
  label: string;
  /** When set, this link is hidden unless the named feature flag is true. */
  feature?: keyof typeof FEATURES;
}

export interface FooterLink {
  label: string;
  href: string;
  /** When true, opens in a new tab with rel="noopener" */
  external?: boolean;
}

export interface AuthorConfig {
  /** Full name — used in AuthorCard */
  name: string;
  /** Short name — used in copyright line and RSS feed */
  shortName: string;
  /** One-liner bio shown in AuthorCard */
  bio: string;
}

export interface SocialConfig {
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
  github?: string;
  threads?: string;
  pinterest?: string;
  email?: string;
}

export interface AnalyticsConfig {
  /** GA4 measurement ID, e.g. "G-XXXXXXXX". Set to undefined to disable entirely. */
  googleAnalyticsId?: string;
  /** Your domain as registered in Plausible, e.g. "nikkapaola.com" */
  plausibleDomain?: string;
  /** Microsoft Clarity project ID */
  microsoftClarityId?: string;
  /** Google Tag Manager container ID, e.g. "GTM-XXXXXXX". Set to undefined to disable. */
  googleTagManagerId?: string;
}

export interface NewsletterConfig {
  provider: 'buttondown' | 'kit' | 'beehiiv' | 'mailchimp';
  /** Full form action URL for the chosen provider */
  endpoint: string;
}

export interface KofiConfig {
  username: string;
}

export type TagStyle =
  | 'tag-rose'
  | 'tag-sage'
  | 'tag-gold'
  | 'tag-blue'
  | 'tag-lavender'
  | 'tag-blossom';

export type TopicColor =
  | 'terracotta'
  | 'dusty-rose'
  | 'gold'
  | 'sage'
  | 'blue'
  | 'lavender';

export interface HeroTag {
  label: string;
  style: TagStyle;
}

export interface FloatingCard {
  icon: string;
  label: string;
  value: string;
}

export interface HeroConfig {
  /** Eyebrow text above the h1, e.g. "Personal blog & a little corner of the internet" */
  eyebrow: string;
  /** First line of the h1, e.g. "Nothing on pause." */
  titleLine1: string;
  /** Second line of the h1 (rendered in <em>), e.g. "Everything on purpose." */
  titleLine2: string;
  tagline: string;
  tags: HeroTag[];
  /** Exactly two floating cards shown over the hero photo */
  floatingCards: [FloatingCard, FloatingCard];
  photoAlt: string;
}

export interface AboutFact {
  icon: string;
  label: string;
  value: string;
}

export interface AboutStripConfig {
  bio: string;
  /** Exactly four facts shown in the 2×2 grid */
  facts: [AboutFact, AboutFact, AboutFact, AboutFact];
}

export interface Topic {
  icon: string;
  name: string;
  desc: string;
  count: string;
  color: TopicColor;
  /** Used in /blog?cat= query param */
  cat: string;
}

export interface SiteConfig {
  /** Browser tab title and OG title fallback */
  title: string;
  /** Site description for meta tags and RSS */
  description: string;
  /** Canonical site URL — also set in astro.config.mjs */
  url: string;
  logo: LogoConfig;
  author: AuthorConfig;
  social: SocialConfig;
  /** Main nav — single source for Header desktop links and MobileMenu */
  nav: NavLink[];
  footerLinks: FooterLink[];
  analytics: AnalyticsConfig;
  /** Only required when FEATURES.newsletter = true */
  newsletter?: NewsletterConfig;
  /** Only required when FEATURES.kofi = true */
  kofi?: KofiConfig;
  hero: HeroConfig;
  aboutStrip: AboutStripConfig;
  topics: Topic[];
}

// ── Config ────────────────────────────────────────────────────────────────────

export const siteConfig = {
  title: 'dev.nikkapaola.com',
  description:
    'Nikka Salgado — Full-Stack Software Developer. Portfolio, projects, and technical writing.',
  url: 'https://dev.nikkapaola.com',

  logo: {
    part1: 'dev',
    part2: '.nikkapaola',
    suffix: '.com',
  },

  author: {
    name: 'Nikka Paola Salgado',
    shortName: 'Nikka Paola',
    bio: 'Developer, traveler, thyroid cancer survivor. Writing about life, code, money, and the things in between.',
  },

  social: {
    linkedin: 'https://linkedin.com/in/nikkasalgado',
    github: 'https://github.com/salgadonikka',
    email: 'nikkapfs@gmail.com',
  },

  nav: [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about',      label: 'About'      },
    { href: '/projects',  label: 'Projects'  },
    { href: '/blog',      label: 'Blog'      }
  ],

  footerLinks: [
    { label: 'Portfolio', href: '/portfolio',                               external: false },
    { label: 'Blog',      href: '/blog',                                    external: false },
    { label: 'Projects',  href: '/projects',                                external: false },
    { label: 'GitHub',    href: 'https://github.com/salgadonikka',         external: true  },
    { label: 'LinkedIn',  href: 'https://linkedin.com/in/nikkasalgado',    external: true  },
  ],

  analytics: {
    googleAnalyticsId: (import.meta.env.PUBLIC_GA_ID as string | undefined),
    googleTagManagerId: (import.meta.env.PUBLIC_GTM_ID as string | undefined),
  },

  // newsletter: {
  //   provider: 'buttondown',
  //   endpoint: 'https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME',
  // },

  // kofi: {
  //   username: 'your-username',
  // },

  hero: {
    eyebrow: 'Personal blog & a little corner of the internet',
    titleLine1: 'Nothing on pause.',
    titleLine2: 'Everything on purpose.',
    tagline: 'A documentation of my life.',
    tags: [
      { label: 'Health',               style: 'tag-rose'     },
      { label: 'Travel',               style: 'tag-gold'     },
      { label: 'Software Development', style: 'tag-blue'     },
      { label: 'Finance',              style: 'tag-lavender' },
    ],
    floatingCards: [
      { icon: 'Laptop', label: 'Currently in', value: 'Focus mode'             },
      { icon: 'Leaf',   label: 'Next chapter',  value: 'Something exciting, TBA' },
    ],
    photoAlt: 'Nikka Paola',
  },

  aboutStrip: {
    bio: "I'm Nikka, a Filipino software developer with a lot going on. This blog is where I write about the things I want to remember and the things I think might help someone else. I'm trying to live life intentionally and I want to put out something positive into the world. Cancer, code, money, travel, and the slow work of building a life that actually fits.",
    facts: [
      { icon: 'MapPin',      label: 'Originally from',    value: 'The Philippines' },
      { icon: 'Leaf',        label: 'Next chapter',       value: 'A big move, soon'   },
      { icon: 'Code',        label: 'By day',             value: 'Software Developer' },
      { icon: 'AirplaneTilt', label: 'Countries visited', value: 'Still counting...' },
    ],
  },

  topics: [
    { icon: 'Globe',        name: 'Web Dev',          desc: 'Frontend, backend, and full-stack patterns.',               count: 'HTML · CSS · JS',      color: 'terracotta', cat: 'web-dev'   },
    { icon: 'Terminal',     name: 'DevOps & Infra',   desc: 'CI/CD, deployments, and the boring-important stuff.',       count: 'DevOps · Cloud',       color: 'sage',       cat: 'devops'    },
    { icon: 'Code',         name: 'Engineering',      desc: 'Architecture decisions, trade-offs, and deep dives.',       count: 'Design · Systems',     color: 'gold',       cat: 'engineering'},
    { icon: 'Briefcase',    name: 'Career',           desc: 'Getting hired, growing as an engineer, and lessons learnt.', count: 'Career · Growth',     color: 'dusty-rose', cat: 'career'    },
    { icon: 'Toolbox',      name: 'Tools & Stack',    desc: 'My current setup, editor config, and favourite libraries.', count: 'Tools · DX',           color: 'terracotta', cat: 'tools'     },
    { icon: 'GitBranch',    name: 'Open Source',      desc: 'Contributing, maintaining, and working in public.',         count: 'OSS · Community',      color: 'sage',       cat: 'oss'       },
    { icon: 'BookOpen',     name: 'Notes',            desc: 'Quick notes, TILs, and things worth writing down.',         count: 'TIL · Notes',          color: 'lavender',   cat: 'notes'     },
  ],
} satisfies SiteConfig;

// ── Backwards-compat exports (replaces src/consts.ts) ─────────────────────────
export const SITE_TITLE = siteConfig.title;
export const SITE_DESCRIPTION = siteConfig.description;

/** Nav links with feature-gated entries already filtered out. Use this in Header/MobileMenu. */
export const visibleNav = siteConfig.nav.filter(
  link => link.feature === undefined || FEATURES[link.feature]
);
