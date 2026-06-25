/**
 * portfolioData.js — Single source of truth for all portfolio content.
 *
 * Houses all data for the portfolio page:
 *   identity, status, contact links, bio, skills, timeline, projects, drawer details.
 *
 * Drawer HTML content lives in portfolioDrawers.js.
 * The script at src/scripts/portfolioInteractions.js imports drawerData directly
 * from portfolioDrawers.js — do not move that import.
 */

export { drawerData } from "./portfolioDrawers.js";

// ── SVG icon strings (used in contactLinks below) ─────────────────────────────

const ICONS = {
  email: `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M1 4.5 8 9.5l7-5" stroke="currentColor" stroke-width="1.3"/></svg>`,
  linkedin: `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3.4 5.3H1V15h2.4V5.3zM2.2 4.2a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8zM5.7 5.3V15H8V10c0-2.2 2.9-2.4 2.9 0V15H13.3V9.2c0-4.4-4.6-4.2-5.3-2.1V5.3H5.7z"/></svg>`,
  github: `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .5C3.86.5.5 3.86.5 8a7.5 7.5 0 0 0 5.14 7.12c.38.07.52-.16.52-.36v-1.27c-2.1.46-2.54-.9-2.54-.9-.34-.87-.84-1.1-.84-1.1-.69-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.67 1.16 1.76.82 2.19.63.07-.49.26-.82.48-1.01-1.67-.19-3.43-.84-3.43-3.72 0-.82.29-1.49.78-2.02-.08-.2-.34-1 .07-2.07 0 0 .64-.2 2.09.78A7.27 7.27 0 0 1 8 4.74a7.27 7.27 0 0 1 1.9.26c1.45-.98 2.09-.78 2.09-.78.41 1.07.15 1.87.07 2.07.49.53.78 1.2.78 2.02 0 2.89-1.76 3.53-3.44 3.72.27.24.51.7.51 1.4v2.08c0 .2.14.44.52.36A7.5 7.5 0 0 0 15.5 8C15.5 3.86 12.14.5 8 .5z"/></svg>`,
  website: `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 1.5c-1.5 2-2.5 4-2.5 6.5s1 4.5 2.5 6.5M8 1.5c1.5 2 2.5 4 2.5 6.5S9.5 12.5 8 14.5M1.5 8h13" stroke="currentColor" stroke-width="1.3"/></svg>`,
  resume: `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2v8M5 7l3 3 3-3M2 13h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

// ── Portfolio page meta description ──────────────────────────────────────────

export const metaDescription =
  "Full-Stack Software Engineer with 11+ years of experience in .NET and React. Based in the Philippines, open to roles in Poland and Europe.";

// ── Identity ──────────────────────────────────────────────────────────────────

export const identity = {
  name: "Nikka Paola Salgado",
  monogram: "NPS",
  role: "Full-Stack Software Engineer<br />&amp; People Manager",
  stack: ".NET · React · Azure",
  photoAlt: "Nikka Salgado",
};

// ── Status / location ─────────────────────────────────────────────────────────

export const status = {
  /** Short badge text shown in sidebar and mobile bar */
  availability: "Open to work",
  /** Longer version used in the contact tile */
  availabilityLong: "Available for new roles",
  /** Short location shown in mobile bar */
  location: "Poland & Europe",
  /** Full location shown in sidebar */
  locationDetail: "Poland &amp; Europe · Remote / Hybrid",
};

// ── Contact links ─────────────────────────────────────────────────────────────
// type       — used by components to add link-specific CSS classes (e.g. resume modifier)
// external   — adds target="_blank" rel="noopener"
// showInMobile — whether to include in the mobile bar footer

export const contactLinks = [
  {
    type: "email",
    href: "mailto:nikkapfs@gmail.com",
    label: "nikkapfs@gmail.com",
    title: "Email",
    external: false,
    showInMobile: true,
    iconSvg: ICONS.email,
  },
  {
    type: "linkedin",
    href: "https://linkedin.com/in/nikkasalgado",
    label: "linkedin.com/in/nikkasalgado",
    title: "LinkedIn",
    external: true,
    showInMobile: true,
    iconSvg: ICONS.linkedin,
  },
  {
    type: "github",
    href: "https://github.com/salgadonikka",
    label: "github.com/salgadonikka",
    title: "GitHub",
    external: true,
    showInMobile: true,
    iconSvg: ICONS.github,
  },
  {
    type: "website",
    href: "https://dev.nikkapaola.com",
    label: "dev.nikkapaola.com",
    title: "Website",
    external: false,
    showInMobile: false,
    iconSvg: ICONS.website,
  },
  {
    type: "resume",
    href: "/NikkaSalgado.pdf",
    label: "View my Resume",
    title: "Resume",
    external: true,
    showInMobile: false,
    iconSvg: ICONS.resume,
  },
];

// ── Bio & intro content ───────────────────────────────────────────────────────

export const bio = {
  paragraphs: [
    "I am a full-stack software engineer with 11+ years of experience delivering production software across enterprise, fintech, and SaaS domains, primarily in .NET and React. Most of my career has been spent as a core contributor to a large-scale enterprise Benefits Administration platform, working across backend systems, REST APIs, React frontends, SQL Server, and ETL pipelines for 100+ global organisations.",
    "Open to mid-level full-stack engineering roles in Europe (Poland, Germany).",
  ],
  whatIBring: [
    "End-to-end system ownership (architecture, APIs, frontend, cloud deployment)",
    "Strong backend architecture and API design with production-grade testing",
    "Frontend development in React and TypeScript",
    "People leadership (mentoring engineers, code reviews, cross-timezone delivery)",
  ],
  industries: [
    "Financial Services",
    "Banking",
    "Insurance & Benefits",
    "HR Technology",
    "Enterprise SaaS",
  ],
  languages: [
    "English (Fluent)",
    "Filipino / Tagalog (Native)",
    "Spanish (A2)",
    "Polish (A1 — learning)",
  ],
  activelyExploring: [
    "Azure OpenAI Service",
    "Semantic Kernel",
    "AZ-204",
    "Azure Container Apps",
    "Blazor",
  ],
};

// ── Skills & Stack ────────────────────────────────────────────────────────────
// variant maps directly to CSS class: 'bp' = Core, 'bs' = Proficient, 'bl' = Soft Skills

export const skillGroups = [
  {
    label: "Backend &amp; API",
    skills: [
      { name: "C#", variant: "bp" },
      { name: ".NET", variant: "bp" },
      { name: ".NET Framework", variant: "bp" },
      { name: "ASP.NET Core", variant: "bp" },
      { name: "Web API", variant: "bp" },
      { name: "Entity Framework", variant: "bp" },
      { name: "LINQ", variant: "bp" }
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", variant: "bp" },
      { name: "ASP.NET MVC", variant: "bp" },
      { name: "ASP.NET WebForms", variant: "bp" },
      { name: "TypeScript", variant: "bp" },
      { name: "JavaScript", variant: "bp" },
      { name: "HTML", variant: "bp" },
      { name: "CSS", variant: "bp" },
      { name: "Next.js", variant: "bs" },
      { name: "Astro", variant: "bs" },
    ],
  },
  {
    label: "Data &amp; Cloud",
    skills: [
      { name: "Azure", variant: "bp" },
      { name: "SQL Server", variant: "bp" },
      { name: "PostgreSQL", variant: "bp" },
      { name: "SSIS / SSRS", variant: "bs" },
    ],
  },
  {
    label: "DevOps &amp; Tooling",
    skills: [
      { name: "Git / GitHub", variant: "bp" },
      { name: "Azure DevOps", variant: "bp" },
      { name: "CI/CD", variant: "bp" },
      { name: "Docker", variant: "bs" },
    ],
  },
  {
    label: "Practices",
    skills: [
      { name: "Clean Architecture", variant: "bp" },
      { name: "Domain-Driven Design", variant: "bp" },
      { name: "N-Tier Architecture", variant: "bp" },
      { name: "Design Patterns", variant: "bp" },
      { name: "Testing (NUnit / xUnit, Selenium)", variant: "bp" },
      { name: "Code Reviews", variant: "bp" },
      { name: "Technical Documentation", variant: "bp" },
      { name: "Agile / Scrum", variant: "bp" }
    ],
  },
  {
    label: "Security",
    skills: [
      { name: "OAuth2 / OIDC", variant: "bp" },
      { name: "JWT", variant: "bp" },
      { name: "Microsoft Entra ID", variant: "bs" }
    ],
  },
  {
    label: "Leadership",
    skills: [
      { name: "People Management", variant: "bl" },
      { name: "Mentoring", variant: "bl" },
      { name: "Remote Team Coordination", variant: "bl" },
      { name: "Stakeholder Communication", variant: "bl" },
      { name: "Cross-functional Collaboration", variant: "bl" },
    ],
  },
];

// ── Career timeline ───────────────────────────────────────────────────────────
// drawerKey must match a key in drawerData — clicking an entry opens that drawer.
// stack: null for entries with no tech stack (e.g. education).

export const timeline = [
  {
    drawerKey: "wtw",
    date: "Feb 2019 - Present",
    company: "WTW Manila Global Delivery Center",
    role: "Lead Associate Software Engineer &amp; People Manager",
    desc: "6+ years of full-stack development on BenefitConnect, a multi-tier enterprise benefits platform serving 100+ global clients across pension and health. Grew from individual contributor to technical lead and people manager of the APAC shift team.",
    stack: ".NET Framework 4.8 · ASP.NET WebForms · React · SQL Server · Azure DevOps",
    ariaLabel: "View WTW details",
  },
  {
    drawerKey: "deltek",
    date: "Jan 2016 - Jan 2019",
    company: "Deltek Systems (Philippines)",
    role: "Software Engineer - R&D & Automation",
    desc: "Built internal R&amp;D tools (SSO, Test Results Manager) and maintained Test Runner, an automation framework used across the majority of Deltek's products.",
    stack: "C# · .NET Framework · Selenium · SQL Server",
    ariaLabel: "View Deltek details",
  },
  {
    drawerKey: "eastwest",
    date: "Jul 2012 - Jan 2016",
    company: "EastWest Banking Corporation",
    role: "Programmer/Analyst - Assistant Manager",
    desc: "Core banking transformation project (Phoenix → Temenos T24) and compliance-critical internal tooling for banking operations.",
    stack: "C# · .NET Framework · SQL Server · Temenos T24 · jBase",
    ariaLabel: "View EastWest details",
  },
  {
    drawerKey: "emerson",
    date: "Apr 2012 - Jun 2012",
    company: "Emerson Process Management",
    role: "Software Developer Intern",
    desc: "Built a Windows app interfacing with an Arduino device and a mobile chat app for Android.",
    stack: "C# · Java (Android) · Arduino",
    ariaLabel: "View Emerson internship details",
  },
  {
    drawerKey: "mapua",
    date: "Jul 2007 - Aug 2012",
    company: "Mapua Institute of Technology",
    role: "B.S. Computer Engineering",
    desc: "Specialization in Microsoft .NET Framework. Thesis: Web-based Blood Pressure and ECG Monitoring System.",
    stack: null,
    ariaLabel: "View education details",
  },
];

// ── Featured case study ───────────────────────────────────────────────────────

export const featuredCaseStudy = {
  drawerKey: "benefits-platform",
  eyebrow: "Enterprise Case Study",
  title: "Benefits Outsourcing Platform",
  company: "WTW Manila Global Delivery Center",
  desc: "BenefitConnect - multi-tier enterprise benefits platform spanning 80+ components, pension and health domains, and three ESS portal generations. 6+ years of full-stack contribution: architecture, complex workflow delivery, and performance enhancement.",
  stack: "ASP.NET Core · React · SQL Server · Azure DevOps",
  cta: "View case study →",
  ariaLabel: "View project details",
};

// ── Personal projects ─────────────────────────────────────────────────────────

export const projects = [
  {
    drawerKey: "tamelo",
    title: "Tamelo App &amp; API",
    desc: "A weekly task planner mapping tasks to days using circular state indicators across a rolling 7-day calendar.",
    stack: "React 18 · TypeScript · ASP.NET Core 10 · Supabase",
    ariaLabel: "View Tamelo details",
  },
  {
    drawerKey: "mymedstory",
    title: "MyMedStory",
    desc: "Personal health intelligence platform transforming scattered medical records into a unified, AI-assisted timeline.",
    stack: ".NET 8 · Next.js 14 · React Native · Cloudflare R2 · Hangfire",
    ariaLabel: "View MyMedStory details",
  },
  {
    drawerKey: "devutilityhub",
    title: "DevUtilityHub",
    desc: "Full-stack developer utility toolkit - format, encode, diff, and transform text via a .NET 10 API with a terminal-inspired React frontend.",
    stack: "ASP.NET Core 10 · React 19 · TypeScript · Vite · Tailwind CSS v4",
    ariaLabel: "View DevUtilityHub details",
  },
];

// ── Contact tile copy ─────────────────────────────────────────────────────────

export const contactCopy = {
  heading: "Let's work together.",
  body: "I'm actively looking for mid-level .NET full-stack roles in Poland & Europe. Remote or hybrid. If you're hiring, or just want to talk engineering, I'd love to hear from you.",
};
