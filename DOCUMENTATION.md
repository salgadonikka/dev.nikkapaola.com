# dev.nikkapaola.com — Functional & Technical Documentation

**Last updated:** June 2026
**Framework:** Astro 6
**Live site:** https://dev.nikkapaola.com

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Pages & Routes](#4-pages--routes)
5. [Components](#5-components)
6. [Layouts](#6-layouts)
7. [Design System](#7-design-system)
8. [Content Management](#8-content-management)
9. [Features](#9-features)
10. [Feature Flags](#10-feature-flags)
11. [Build & Deployment](#11-build--deployment)
12. [Configuration Reference](#12-configuration-reference)

---

## 1. Overview

**dev.nikkapaola.com** is Nikka Paola Salgado's developer/engineering portfolio site. It is a static site built with Astro, focused on a software engineering job search — primarily targeting roles in .NET/React/Azure in Poland and Europe.

**Primary goals:**
- Present a polished portfolio with skills, career timeline, and project case studies (`/portfolio`)
- Publish technical blog posts across Web Dev, DevOps, Engineering, Career, and Tools categories
- Showcase individual projects with detailed case study pages (`/projects/[slug]`)
- Be fast, accessible, and mostly readable without JavaScript

This site is a stripped-down fork of the [nikkapaola.com](https://nikkapaola.com) personal blog template, refocused for the developer audience. Lifestyle-blog features (guestbook, /now, /links, speaking) have been removed.

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Site framework | Astro | ^6.0.4 | Static-first; React islands for interactivity |
| UI components | React | ^19.2.4 | Used only where interactivity is needed |
| Styling | Tailwind CSS | ^4.2.1 | Configured via `@tailwindcss/vite` Vite plugin |
| Markdown | MDX | ^5.0.0 | Rich posts with embedded React components |
| Syntax highlighting | Shiki | bundled | Code blocks in blog posts |
| Search | Pagefind | ^1.4.0 | Post-build static search index |
| Sitemap | @astrojs/sitemap | ^3.7.1 | Auto-generated at build time |
| RSS | @astrojs/rss | ^4.0.17 | Feed at `/rss.xml` |
| Image optimisation | sharp + astro:assets | — | Resize, WebP conversion, lazy loading |
| Node | — | >=22.12.0 | Minimum required version |

---

## 3. Architecture

### Rendering model

Astro renders all pages to static HTML at build time. JavaScript is only shipped for components that explicitly need it. Interactive React components use `client:load` (hydrate immediately on page load).

```
src/
├── assets/              # Static assets processed by Astro (images)
├── components/
│   ├── portfolio/       # Portfolio page tile components + nav
│   └── blog/            # Blog-specific components (TopicTree, ReadingProgress)
├── content/
│   ├── blog/            # Blog posts (.md and .mdx files)
│   └── projects/        # Project entries (.md and .mdx files)
├── data/
│   ├── portfolioData.js     # All portfolio page content
│   └── portfolioDrawers.js  # Project drawer HTML content
├── layouts/
│   ├── SiteLayout.astro     # Shell with icon sidebar nav
│   └── BlogPost.astro       # Individual blog post wrapper
├── pages/               # File-based routing (each file = a route)
├── styles/
│   ├── global.css       # Design tokens + base styles
│   ├── portfolio.css    # /portfolio page styles
│   ├── projects.css     # /projects styles
│   ├── landing.css      # / landing page styles
│   └── site-layout.css  # Icon sidebar nav shell styles
└── content.config.ts    # Content collection schemas (Zod)

public/
├── favicon.ico
├── resume.pdf
└── robots.txt

astro.config.mjs         # Astro + Vite configuration
src/site.config.ts       # Site identity, nav, feature flags
```

### Data flow

**Portfolio page:**
```
src/data/portfolioData.js → portfolio.astro + Tile components → HTML
src/data/portfolioDrawers.js → portfolioInteractions.js (client script) → drawer overlays
```

**Blog posts:**
```
src/content/blog/*.md → Content Collections (Zod) → getCollection() → BlogPost layout → HTML
```

**Projects:**
```
src/content/projects/*.md → Content Collections (Zod) → getCollection() → [slug].astro → HTML
```

---

## 4. Pages & Routes

### `/` — Landing Page

**File:** `src/pages/index.astro`

Sections (top to bottom):
- **Hero** — name, role, stack badge, contact links, and featured project cards
- **Featured projects** — 3 cards pulled from `portfolioData.js` by `drawerKey`
- **About / bio strip** — short bio and call to action

Data sourced from `src/data/portfolioData.js` (identity, status, contact links, projects).

---

### `/portfolio` — Portfolio

**File:** `src/pages/portfolio.astro`

The main job-search page. Assembled from portfolio tile components:

1. **Tile01Intro** — name, role, photo, monogram, stack
2. **Tile02Experience** — skills and career timeline
3. **Tile03Contact** — contact links, availability status

Project drawer overlays are powered by `portfolioInteractions.js` (client script) reading data from `portfolioDrawers.js`.

**Styles:** `src/styles/portfolio.css`

---

### `/blog` — Blog Listing

**File:** `src/pages/blog/index.astro`

**Filtering:** URL parameters:
- `?cat=Engineering` — filter by category (matches post frontmatter)
- `?tag=dotnet` — filter by tag

Active filter shows a bar with the filter label, post count, and a `✕` clear link.

**Layout:**
- First post: featured full-width card (image + metadata)
- Remaining posts: 3-column card grid (1-column on mobile)

---

### `/blog/[slug]` — Individual Blog Post

**File:** `src/pages/blog/[...slug].astro`

Generates one static page per file in `src/content/blog/` via `getStaticPaths()`. Passes all frontmatter to the `BlogPost` layout.

---

### `/projects` — Projects Listing

**File:** `src/pages/projects/index.astro`

All non-draft project entries from the `projects` content collection. Sorted: featured projects first (full-width card), then ascending `order`.

**Styles:** `src/styles/projects.css`

---

### `/projects/[slug]` — Project Detail

**File:** `src/pages/projects/[slug].astro`

Sections:
1. **Hero** — breadcrumb, category + status badges, title, tagline, CTA links ("Visit site" / "View on GitHub")
2. **Overview** — MDX/Markdown body rendered in `proj-prose` styles
3. **Screenshots** — grid of CDN images from `screenshots` frontmatter; placeholder boxes if none
4. **Tech stack** — badge list from the `stack` array
5. **Writing about this** — auto-pulled blog posts sharing tags with the project (up to 4, most recent first)

**Styles:** `src/styles/projects.css`

---

### `/about` — About Page

**File:** `src/pages/about.astro`

Personal bio and background. Edit the file directly — no data file.

---

### `/search` — Search

**File:** `src/pages/search.astro`

Loads Pagefind UI at runtime. Only functional after `npm run build` (Pagefind indexes the built HTML). In dev mode, shows a notice directing to the blog listing.

---

### `/404` — Custom 404

**File:** `src/pages/404.astro`

Custom not-found page with "Go Home" and "Browse Blog" CTAs.

---

### `/rss.xml` — RSS Feed

**File:** `src/pages/rss.xml.js`

RSS 2.0 feed from all published blog posts via `@astrojs/rss`.

---

### `/sitemap-index.xml`

Auto-generated by `@astrojs/sitemap`. No source file — controlled via `site` in `astro.config.mjs`.

---

## 5. Components

### Portfolio Components

#### `portfolio/PortfolioSidebar.astro`

Desktop icon sidebar navigation. Renders icon buttons for each main nav route (`/portfolio`, `/blog`, `/projects`). Active route is highlighted. Used inside `SiteLayout.astro`.

---

#### `portfolio/PortfolioMobileBar.astro`

Bottom navigation bar for mobile. Same routes as the sidebar. Fixed to the bottom of the viewport.

---

#### `portfolio/Tile01Intro.astro`

First tile on the portfolio page. Displays identity (name, role, monogram, stack badge) and the hero photo.

Data sourced from the `identity` export in `portfolioData.js`.

---

#### `portfolio/Tile02Experience.astro`

Second tile on the portfolio page. Displays skills list and career timeline.

Data sourced from `portfolioData.js`.

---

#### `portfolio/Tile03Contact.astro`

Third tile on the portfolio page. Displays contact links (email, LinkedIn, GitHub, website, resume) and availability/location status.

Data sourced from `contactLinks` and `status` in `portfolioData.js`.

---

### Blog Components

#### `blog/TopicTree.astro`

Topic/category navigation tree for the blog sidebar. Lists categories linking to `?cat=` filtered views.

---

#### `blog/ReadingProgress.astro`

Thin progress bar at the top of the viewport that fills as the user scrolls through a blog post. Rendered by `BlogPost.astro` when `FEATURES.readingProgress` is true.

---

### Shared Astro Components

#### `BaseHead.astro`

Renders the entire `<head>` element.

**Props:**
```typescript
{
  title: string;
  description: string;
  image?: ImageMetadata;  // Open Graph og:image
}
```

**Includes:**
- Inline theme script (sets `html[data-theme]` from `localStorage` before paint — prevents dark mode flash)
- Charset, viewport, favicon, sitemap, RSS alternate link
- Canonical URL
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- Twitter Card tags
- Google Fonts preconnect + stylesheet (Playfair Display, DM Sans)
- Conditional analytics: GA4 (`googleAnalyticsId`) and GTM (`googleTagManagerId`) via `siteConfig.analytics`

---

#### `Header.astro`

Fixed top navigation bar with glassmorphism background.

**Contents:** Logo (text link to `/`), nav links from `siteConfig.nav`, search icon, `<DarkModeToggle />`, `<MobileMenu />`.

---

#### `Footer.astro`

Site footer. Logo + tagline, footer links from `siteConfig.footerLinks`, dynamic copyright year.

---

#### `FormattedDate.astro`

**Props:** `{ date: Date }` → renders a `<time>` element. Example output: `June 1, 2026`.

---

#### `Icon.astro`

Renders an inline SVG icon by name. Used by portfolio tiles and nav components.

---

#### `PostMeta.astro`

Renders the metadata row for a blog post (date, reading time, category).

---

#### `CircleStates.astro`

Visual status indicator component (used in Tile03Contact for availability state).

---

#### `DataTable.astro`

Styled table component for MDX posts.

---

### React Components

All React components hydrate with `client:load`.

#### `DarkModeToggle.tsx`

**No props.** Pill-shaped toggle between light/dark mode. Reads/writes `html[data-theme]` and persists to `localStorage.theme`.

---

#### `MobileMenu.tsx`

**No props.** Hamburger menu with animated bars → ×. Shows a dropdown overlay with full nav links on tap.

---

#### `NewsletterForm.tsx`

**No props.** Email subscribe form with `idle | loading | success | error` state. Wire the `handleSubmit` function to a real provider endpoint when `FEATURES.newsletter` is enabled.

---

#### `PhotoGallery.tsx`

Masonry image grid with fullscreen lightbox. Used inside `.mdx` posts.

**Props:**
```typescript
{
  images: string[];         // Image URLs
  captions?: string[];      // Captions matched by index (optional)
  columns?: 2 | 3 | 4;     // Grid columns — default: 3
}
```

Features: hover scale animation, click-to-lightbox, image counter (e.g., "2 / 15"), keyboard navigation (`←` / `→` / `Esc`), prev/next buttons.

---

### MDX Components

These are available for use in `.mdx` blog posts — import them at the top of the file.

| Component | Usage | Purpose |
| --------- | ----- | ------- |
| `Callout.astro` | `<Callout type="note">` | Info block. Types: `note`, `tip`, `warning`, `aside` |
| `Highlight.astro` | `<Highlight>text</Highlight>` | Editorial pull-quote in serif with gold border |
| `Figure.astro` | `<Figure src="..." alt="..." caption="..." />` | Image with optional caption |
| `Pullquote.astro` | `<Pullquote>text</Pullquote>` | Large stylised pull-quote |

---

## 6. Layouts

### `SiteLayout.astro`

**File:** `src/layouts/SiteLayout.astro`

Shell layout used by all non-blog pages (`/`, `/portfolio`, `/projects`, `/about`, `/search`).

**Props:**
```typescript
{
  title: string;
  description?: string;
  contentClass?: string;  // Add "sl-content--split" for inner-scroll content areas
}
```

**Structure:**
- `<BaseHead>` in the `<head>`
- `<PortfolioSidebar>` — desktop icon nav (left)
- Main content slot
- `<PortfolioMobileBar>` — mobile bottom nav

**Styles:** `src/styles/site-layout.css`

---

### `BlogPost.astro`

**File:** `src/layouts/BlogPost.astro`

**Props:** `CollectionEntry<'blog'>['data'] & { id: string }`

**Sections:**

1. **Cover image** (conditional on `heroImage`): full-width, 55vh, gradient fade at bottom
2. **Post header:** category label, title, description, meta row (date · updated date · reading time), tag pills
3. **Prose content:** `<div class="prose">` — body styles for headings, paragraphs, links, blockquotes, code, tables, images
4. **Post footer:** "← Back to all posts" link
5. **Related posts** (conditional): up to 3 posts sharing the same `category` or `tags`, sorted by most recent

`data-pagefind-body` on the article element scopes Pagefind indexing to post content only.

---

## 7. Design System

All design tokens are CSS custom properties in `src/styles/global.css` under `@theme {}` (Tailwind 4 syntax).

### Color Palette

| Token | Light Value | Purpose |
|-------|-------------|---------|
| `--color-cream` | `#faf7f2` | Page background |
| `--color-warm-white` | `#f5f1eb` | Card backgrounds, subtle surfaces |
| `--color-ink` | `#1c1a17` | Primary text |
| `--color-ink-soft` | `#3d3a35` | Secondary text |
| `--color-muted` | `#8a8479` | Tertiary text, metadata |
| `--color-terracotta` | `#c4694f` | Primary accent — CTAs, links, active states |
| `--color-terracotta-light` | `#e8c4b8` | Underline colour on links |
| `--color-terracotta-dark` | `#b05840` | Hover state on terracotta elements |
| `--color-sage` | `#7a9e87` | Secondary accent |
| `--color-gold` | — | Decorative accent (Highlight borders) |
| `--color-border` | `#e8e2d9` | Dividers, card borders |
| `--color-nav-bg` | `rgba(250,247,242,0.88)` | Header glassmorphism |
| `--color-code-bg` | `#1c1a17` | Code block background (always dark) |
| `--color-code-text` | `#faf7f2` | Code block text (always light) |

### Dark Mode

1. **Manual toggle:** `html[data-theme="dark"]` set by `DarkModeToggle.tsx` via `localStorage`
2. **OS preference:** `@media (prefers-color-scheme: dark)` with `html:not([data-theme="light"])`

Flash prevention: `BaseHead.astro` includes an `is:inline` script that sets `html[data-theme]` synchronously before first paint.

### Typography

| Font | Token | Usage |
|------|-------|-------|
| Playfair Display | `--font-serif` | Post titles, section headings, pull-quotes |
| DM Sans | `--font-sans` | Body copy, UI labels, metadata |

Both loaded from Google Fonts via `<link>` in `BaseHead.astro`.

### `.prose` class

Applied to blog post body content. Key styles:
- Headings: serif, `--color-ink`
- Paragraphs: 1.8 line height, `--color-ink-soft`, weight 300
- Links: terracotta with underline
- Blockquotes: left border in terracotta, italic
- `<code>`: warm-white background, border, rounded
- `<pre>`: dark background (`--color-code-bg`), always dark regardless of theme
- Tables: bordered with `--color-border`
- Images: full width, rounded corners

---

## 8. Content Management

### Portfolio page

All portfolio content is driven by `src/data/portfolioData.js`. No component files need touching — update the exports here to change anything on the portfolio page.

**Key exports:**

| Export | Purpose |
| ------ | ------- |
| `identity` | Name, monogram, role, stack, photo alt |
| `status` | Current availability and location |
| `contactLinks` | Array of `{ label, href, icon, external }` |
| `metaDescription` | `<meta description>` for the portfolio page |
| `projects` | Array of project card data (used on `/` and `/portfolio`) |
| `drawerData` | Re-exported from `portfolioDrawers.js` |

**Project drawer HTML** lives in `src/data/portfolioDrawers.js`. Each entry maps a `drawerKey` to HTML content rendered in the overlay panel on the portfolio page. The client script at `src/scripts/portfolioInteractions.js` imports `drawerData` directly from this file.

---

### Writing a new blog post

Create a `.md` or `.mdx` file in `src/content/blog/`. The filename becomes the URL slug.

**Full frontmatter reference:**

```yaml
---
title: "Post title"
description: "One sentence shown on listing cards and in search results."
pubDate: 2026-06-01
updatedDate: 2026-06-15         # optional
heroImage: ./cover.jpg          # optional — relative path to image file
category: "Engineering"         # Web Dev | DevOps | Engineering | Career | Tools | OSS | Notes
tags: ["dotnet", "react", "azure"]  # lowercase, hyphenated
readingTime: "5 min read"       # fill manually
isAlbum: false                  # true for photo-gallery posts
draft: false
---
```

**Rules:**
- Do not use `# H1` in the body — the layout renders `title` as the `<h1>`
- Tags are used for URL filtering (`/blog?tag=dotnet`) and for related-post matching with projects — keep them consistent
- `draft: true` hides the post from listings and RSS but still builds it at its URL

**For photo-album posts**, set `isAlbum: true`, use `.mdx`, and embed `PhotoGallery`:

```mdx
import PhotoGallery from '../../components/PhotoGallery.tsx';

<PhotoGallery
  client:load
  images={["https://cdn.example.com/1.jpg", "https://cdn.example.com/2.jpg"]}
  captions={["Caption 1", "Caption 2"]}
  columns={3}
/>
```

Do not commit large images to the repo. Use Cloudflare R2 (10 GB free, zero egress) and reference CDN URLs directly.

---

### Writing a new project entry

Create a `.md` or `.mdx` file in `src/content/projects/`. The filename becomes the URL slug.

**Full frontmatter reference:**

```yaml
---
name: "Tamelo"
tagline: "A weekly task planner built to escape the procrastination sinkhole."
description: "Slightly longer summary used in meta tags and Open Graph."
category: "App"            # App | Business | Side Project | Content
status: "In Progress"      # Live | In Progress | Planning | Paused
featured: true             # spans full width on /projects grid, shown first
order: 1                   # lower = higher on the page (among non-featured)
stack:
  - React 19
  - TypeScript
  - ASP.NET Core
tags:
  - tamelo
  - productivity           # matched against blog post tags for auto-pull
url: "https://tamelo.app"               # optional — "Visit site" CTA
githubUrl: "https://github.com/…"       # optional — "View on GitHub" CTA
screenshots:
  - "https://cdn.example.com/1.jpg"     # first = hero (full width)
  - "https://cdn.example.com/2.jpg"
draft: false
---
```

The file body renders as the **Overview** section. Use `##` headings for sub-sections (How it works, What's next, etc.).

**Related posts:** Any blog post sharing at least one tag with the project auto-appears in "Writing about this". Keep tags consistent across projects and posts.

**Status badge colours:**

| Status | Colour |
|--------|--------|
| Live | Green |
| In Progress | Terracotta |
| Planning | Border grey / muted |
| Paused | Warm white / muted |

---

## 9. Features

### Search (Pagefind)

- Pagefind indexes static HTML at build time, scanning `data-pagefind-body` elements
- Index is written to `dist/pagefind/` and served at `/pagefind/`
- `search.astro` dynamically imports Pagefind UI at runtime; if the import fails (dev mode), a styled fallback notice is shown
- `/pagefind/pagefind-ui.js` is excluded from Vite bundling via `rollupOptions.external`
- Search is only functional after `npm run build` or `npm run preview`

### Dark Mode

- Default: follows OS preference (`prefers-color-scheme: dark`)
- User override: clicking the toggle persists to `localStorage.theme`
- Flash prevention: `BaseHead.astro` sets `html[data-theme]` synchronously before first paint

### Related Posts (on blog posts)

`BlogPost.astro` queries all posts at build time, filters by matching `category` OR shared `tags`, excludes the current post, and takes up to 3 sorted by most recent. Section is hidden if no matches found.

### Related Posts (on project detail pages)

`projects/[slug].astro` queries all blog posts, filters by shared `tags` with the project, takes up to 4 most recent. Falls back to a placeholder message.

### RSS Feed

At `/rss.xml`. Includes all published posts with title, description, publication date, and link.

### Active Filter Indicator (on `/blog`)

When filtering by `?cat=` or `?tag=`, a bar shows the active filter label, post count, and a `✕` clear link.

### Sitemap

`/sitemap-index.xml` auto-generated by `@astrojs/sitemap` at build time.

---

## 10. Feature Flags

All toggles live in `src/site.config.ts` under `FEATURES`. They run at **build time** — disabled features produce zero dead code in the output.

### Current flags

```ts
export const FEATURES = {
  blog: true,            // /blog listing + post routes
  projects: true,        // /projects listing + detail pages
  search: true,          // /search (Pagefind)
  rss: true,             // /rss.xml feed
  newsletter: false,     // email subscribe form
  tableOfContents: true, // auto ToC sidebar on blog posts
  readingProgress: true, // thin progress bar on blog posts
  socialSharing: false,  // Twitter/X + copy-link at post footer
  dynamicOgImages: false,// Satori-generated OG image per post
  kofi: false,           // floating Ko-fi button
  cookieConsent: false,  // cookie banner (enable when GA is active)
} as const;
```

### Usage in pages/components

```astro
---
import { FEATURES } from '../site.config';
---
{FEATURES.newsletter && <NewsletterForm client:load />}
```

### Adding a new toggleable feature

1. Add the key to `FEATURES` in `src/site.config.ts`
2. Wrap usage with `{FEATURES.myFeature && ...}`
3. If it's a whole page, conditionally redirect or skip the route in the page's frontmatter

---

## 11. Build & Deployment

### Development

```bash
npm run dev       # http://localhost:4321
```

Pagefind search is not available in dev mode — use `/blog` to browse posts.

### Production build

```bash
npm run build
```

Steps:
1. `astro build` — compiles all pages to static HTML in `./dist/`
2. `pagefind --site dist` — builds the search index at `dist/pagefind/`

### Preview

```bash
npm run preview   # Serves ./dist/ locally — search works here
```

### Deployment

`./dist/` is a self-contained static site. Deploy to any static host:

| Platform | Setup |
| -------- | ----- |
| **Cloudflare Pages** | Build command: `npm run build`, output: `dist` |
| **Netlify** | Same build command and output dir |
| **Vercel** | Same; Astro is auto-detected |

Set any required environment variables (`PUBLIC_GA_ID`, `PUBLIC_GTM_ID`) in the hosting dashboard.

---

## 12. Configuration Reference

### `src/site.config.ts`

Single source of truth for site identity, nav, analytics, and feature flags.

Key sections:

```ts
export const siteConfig = {
  title: 'dev.nikkapaola.com',
  description: '...',
  url: 'https://dev.nikkapaola.com',
  logo: { part1: 'dev', part2: '.nikkapaola', suffix: '.com' },
  author: { name: 'Nikka Paola Salgado', shortName: 'Nikka Paola', bio: '...' },
  social: { linkedin: '...', github: '...', email: '...' },
  nav: [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog',      label: 'Blog' },
    { href: '/projects',  label: 'Projects' },
  ],
  footerLinks: [...],
  analytics: {
    googleAnalyticsId: import.meta.env.PUBLIC_GA_ID,
    googleTagManagerId: import.meta.env.PUBLIC_GTM_ID,
  },
  // hero, aboutStrip, topics: used by landing page
};
```

`SITE_TITLE` and `SITE_DESCRIPTION` are re-exported from here (no separate `consts.ts`).

`visibleNav` is a pre-filtered export of `siteConfig.nav` with feature-gated entries removed — use this in `Header` and `MobileMenu`.

### `astro.config.mjs`

```javascript
{
  site: 'https://dev.nikkapaola.com',  // Required for canonical URLs and sitemap
  integrations: [mdx(), sitemap(), react()],
  markdown: { syntaxHighlight: 'shiki' },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind-ui.js'],  // Runtime-only, exclude from bundle
      },
    },
  },
}
```

Update `site` before deploying to a different domain.

### `src/content.config.ts`

Zod schemas for the `blog` and `projects` content collections. Add new frontmatter fields here to make them type-safe throughout the codebase via `CollectionEntry<'blog'>` / `CollectionEntry<'projects'>`.

### `public/robots.txt`

Allows all crawlers to index all pages.

### `public/resume.pdf`

Nikka's resume — linked from the contact tile on the portfolio page.
