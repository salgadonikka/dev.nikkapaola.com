# dev.nikkapaola.com

Nikka Paola Salgado's **developer portfolio** — live at **dev.nikkapaola.com**.

Built on top of the [nikkapaola.com](https://github.com/salgadonikka/nikkapaola.com) template, stripped down and refocused for a software engineering.

---

## Stack

- **Astro 6** — static site framework
- **React 19** — interactive components
- **Tailwind CSS 4** — via `@tailwindcss/vite`; design tokens in `src/styles/global.css`
- **MDX** — rich blog posts with embedded components
- **TypeScript** — content collection schemas and component props

---

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build locally
npm run astro      # run Astro CLI (e.g. astro check, astro add)
```

---

## Pages

| Route              | File                              | Notes                                              |
| ------------------ | --------------------------------- | -------------------------------------------------- |
| `/`                | `src/pages/index.astro`           | Landing page — hero, featured projects, bio strip  |
| `/portfolio`       | `src/pages/portfolio.astro`       | Full portfolio: skills, timeline, project drawers  |
| `/blog`            | `src/pages/blog/index.astro`      | Blog listing; `?cat=` and `?tag=` filters          |
| `/blog/[slug]`     | `src/pages/blog/[...slug].astro`  | Individual posts via `BlogPost` layout             |
| `/projects`        | `src/pages/projects/index.astro`  | Projects grid, sorted by featured + order          |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | Project detail: overview, screenshots, stack       |
| `/rss.xml`         | `src/pages/rss.xml.js`            | RSS feed                                           |

---

## Key files

| File | Purpose |
| ---- | ------- |
| `src/data/portfolioData.js` | Single source of truth for portfolio page content (identity, status, skills, timeline, projects) |
| `src/data/portfolioDrawers.js` | Detailed HTML content for project drawer overlays on the portfolio page |
| `src/site.config.ts` | Site identity, nav, social links, analytics IDs, feature flags |
| `src/styles/global.css` | Design tokens (`@theme {}`), base styles, `.prose` |
| `src/styles/portfolio.css` | All styles for the `/portfolio` page |
| `src/styles/landing.css` | Styles for the `/` landing page |
| `src/styles/site-layout.css` | Icon sidebar nav layout shared across pages |
| `src/layouts/SiteLayout.astro` | Shell layout with icon-based sidebar navigation |
| `src/content/blog/` | Blog posts as `.md` / `.mdx` files |
| `src/content/projects/` | Project entries as `.md` / `.mdx` files |

---

## Content

### Blog posts

Create `.md` or `.mdx` files in `src/content/blog/`. Required frontmatter:

```yaml
---
title: "Post title"
description: "One sentence shown on listing cards."
pubDate: 2026-06-01
category: "Engineering"
tags: ["dotnet", "react"]
readingTime: "5 min read"
draft: false
---
```

### Projects

Create `.md` or `.mdx` files in `src/content/projects/`:

```yaml
---
name: "Project Name"
tagline: "One punchy line."
description: "Meta description."
category: "App"           # App | Business | Side Project | Content
status: "Live"            # Live | In Progress | Planning | Paused
featured: false
order: 1
stack: [React, TypeScript, .NET]
tags: [tagname]
url: "https://example.com"
githubUrl: "https://github.com/..."
screenshots: ["https://cdn.example.com/1.jpg"]
draft: false
---
```

### Portfolio page

All portfolio content comes from `src/data/portfolioData.js`. Update the exports there — no component files need touching — to change the identity block, skills list, career timeline, project cards, or contact links.

---

## Design system

Tokens live in `src/styles/global.css` under `@theme {}`. To retheme, swap the values there.

| Token | Role |
| ----- | ---- |
| `--color-cream` | base background |
| `--color-ink` | primary text |
| `--color-terracotta` | primary accent |
| `--color-sage` | secondary accent |
| `--font-serif` | Playfair Display |
| `--font-sans` | DM Sans |

---

## Deploying

Update `site` in `astro.config.mjs` before building:

```js
export default defineConfig({
  site: "https://dev.nikkapaola.com",
});
```

Then `npm run build` — output goes to `./dist/`.
