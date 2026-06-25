/**
 * Drawer panel content for portfolio.astro.
 * Each entry maps to a data-drawer="key" attribute in the HTML.
 * body: raw HTML string injected into .drawer-content via innerHTML.
 */
export const drawerData = {
  wtw: {
    eyebrow: "Experience",
    title: "WTW Manila Global Delivery Center",
    period: "Feb 2019 - Present",
    role: "Associate Software Engineer → + People Manager → Lead Associate Software Engineer",
    body: `
      <p class="dr-summary">6+ years at Willis Towers Watson's Manila delivery center, contributing across the full stack of a multi-tier enterprise benefits administration platform serving pension and health clients across 100+ global organizations.</p>
      <div class="dr-section">
        <div class="dr-section-title">Career progression</div>
        <div class="dr-progression">
          <div class="dr-prog-item"><span class="dr-prog-year">Feb 2019</span><span class="dr-prog-role">Associate Software Engineer</span></div>
          <div class="dr-prog-item"><span class="dr-prog-year">Mar 2022</span><span class="dr-prog-role">+ People Manager (concurrent)</span></div>
          <div class="dr-prog-item"><span class="dr-prog-year">Apr 2024</span><span class="dr-prog-role">Lead Associate Software Engineer</span></div>
        </div>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">What I worked on</div>
        <ul class="dr-list">
          <li><strong>Pension payment workflow</strong> - contributed across backend, admin 
            (ASP.NET WebForms), and self-service portal (React) for multiple 
            phases of a fully redesigned pension payment workflow. Features 
            included retirement counseling (created from scratch), election 
            summary (a summary screen spanning dozens of subplan, payment method, 
            marital status, and beneficiary combinations, where correctness is 
            non-negotiable — these are irrevocable financial elections), and 
            payment in arrears. Delivery involved sustained cross-timezone 
            coordination with US-based team members. Received significant client 
            team recognition at launch.</li>
          <li><strong>Death processing enhancements</strong> - extended a core administrative 
            feature to cover a previously unsupported user class: Alternate Payee 
            Beneficiaries. Introduced a new screen and flow, with the feature 
            spanning multiple steps across multiple sprints; received team recognition for this work.</li>
          <li><strong>Trust Authorization Case Workflow</strong> - redesigned a cross-module case 
            creation architecture to support pension-specific document upload 
            behaviour. The existing event handler approach could not support the 
            new requirements, so I introduced a pension-specific case provider 
            that extends the core provider, respecting module boundaries and 
            enabling pre-, during-, and post-case-creation logic. This fixed 
            multiple unreported defects - incorrect case linking, hardcoded 
            document type logic, and an ESSNext workaround that existed because 
            the correct logic wasn't in place. The solution was adopted as a 
            baseline for other teams. I proactively flagged the exposed defects 
            to the product owner and helped triage which were in scope vs. 
            separate work.</li>
          <li><strong>Audit data export</strong> - diagnosed and redesigned a critically slow 
            pipeline. Root causes: non-SARGable string filtering, a monolithic 
            query loading 400K+ rows without prefiltering, correlated subqueries, 
            and parameter sniffing instability. Fix: indexed intermediate tables, 
            staged datasets, OUTER APPLY, restructured execution plan. Runtime: 
            45 minutes → 20 seconds (135× improvement).</li>
          <li>Sustained contributions across the broader platform: communications dashboard, batch processes, 
            case management enhancements, document generation pipelines, data 
            exports, SSRS reports across pension and integrated segments.</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">As a manager (from Mar 2022)</div>
        <p>Led an APAC shift development team - conducting 1:1s, performance evaluations, goal-setting, and coaching. Also stepped in as acting Scrum Master, SDET, and Technical Writer during transition periods to maintain delivery continuity.</p>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">What this taught me</div>
        <p>Six years on the same complex system teaches you things you can't 
        learn from switching companies every two years. You learn what 
        "maintainable" actually means when you're the one maintaining it. 
        You learn to make changes in a system you didn't design, around 
        constraints you didn't choose, without breaking what you didn't 
        touch. The features I'm most proud of are the ones where I delivered 
        the requirement and left the codebase better than I found it. 
        Defects fixed, workarounds removed, a cleaner baseline for the 
        next developer.

        I also learned what it actually means to advocate for people. 
        Work doesn't only have to revolve around the contributions you make 
        to your company. It can also have a deeply personal impact on 
        someone else's life. And some of the most important decisions 
        you make at work are the ones that don't seem like work decisions 
        at the time.

        It also gave me perspective on what I want next. A team where I 
        can go wider, not just deeper, and engineers I can genuinely learn 
        from.</p>
      </div>
      <div class="dr-stack">.NET Framework 4.8 · ASP.NET WebForms · ASP.NET MVC · ASP.NET Web API · React · TypeScript · SQL Server · SSIS · SSRS · Azure · NUnit · Selenium · Azure DevOps</div>
    `,
  },

  deltek: {
    eyebrow: "Experience",
    title: "Deltek Systems (Philippines)",
    period: "Jan 2016 - Jan 2019",
    role: "Software Engineer - R&D & Automation",
    body: `
      <p class="dr-summary">Three years on Deltek's internal R&D team, building automation tooling and developer productivity applications from the ground up. Two of the applications developed here were adopted company-wide.</p>
      <div class="dr-section">
        <div class="dr-section-title">What I built</div>
        <ul class="dr-list">
          <li><strong>Single Sign-On</strong> - lead developer on a company-wide SSO pilot; one of two major R&amp;D initiatives delivered by the team</li>
          <li><strong>Test Results Manager</strong> - a centralized results tracking application for QA engineers across Deltek products</li>
          <li><strong>Test Runner</strong> - contributed enhancements to an in-house automation tool that ran automated tests against the majority of Deltek's product suite</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Support &amp; leadership</div>
        <ul class="dr-list">
          <li>Lead support contact for Test Runner across an average of 5 Software Engineers and multiple QA leads</li>
          <li>Delivered bug fixes for product-specific automation issues; unblocked QA teams on test execution roadblocks</li>
          <li>Conducted code reviews and led onboarding and training for new hires</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">What this taught me</div>
        <p>Building tools for other developers forces a different standard - the API has to be obvious, the errors have to be useful, and the thing has to keep working when you're not in the room. This is where I learned to write for maintainability, not just correctness.</p>
      </div>
      <div class="dr-stack">C# · .NET Framework · Selenium WebDriver · Coded UI · SQL Server · MSTest</div>
    `,
  },

  eastwest: {
    eyebrow: "Experience",
    title: "EastWest Banking Corporation",
    period: "Jul 2012 - Jan 2016",
    role: "IT Management Trainee → Programmer-Analyst → Asst. Manager",
    body: `
      <p class="dr-summary">First professional role, starting as part of EastWest's competitive IT management trainee program and progressing to Assistant Manager. Spent most of this time on the Core Banking Transformation project - one of the largest system migrations in the bank's history.</p>
      <div class="dr-section">
        <div class="dr-section-title">Career progression</div>
        <div class="dr-progression">
          <div class="dr-prog-item"><span class="dr-prog-year">Jul 2012</span><span class="dr-prog-role">IT Management Trainee (ranked 5th overall)</span></div>
          <div class="dr-prog-item"><span class="dr-prog-year">Aug 2013</span><span class="dr-prog-role">Programmer/Analyst - Junior Officer</span></div>
          <div class="dr-prog-item"><span class="dr-prog-year">Jan 2015</span><span class="dr-prog-role">Programmer/Analyst - Assistant Manager</span></div>
        </div>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Core Banking Transformation (Jul 2013 - Nov 2014)</div>
        <ul class="dr-list">
          <li>Participated in functional and technical testing of Temenos T24 during the bank's migration from its legacy core banking system</li>
          <li>Developed a stored procedure used in the migration of Auto Loans Add-On data</li>
          <li>Performed Unit, System Integration, and Performance Testing on selected interfaces connecting third-party systems to T24</li>
          <li>Coordinated with business users on User Acceptance Testing of T24 and selected interfaces</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Day-to-day work</div>
        <ul class="dr-list">
          <li>Investigated and resolved production issues on the T24 core banking system; reported to the vendor when needed</li>
          <li>Developed, tested, and promoted data fixes to production under change management protocols</li>
          <li>Designed and built internal applications using jBase and C# on the T24 platform</li>
          <li>Developed a streamlined testing process for fix promotion that improved efficiency and reduced production incidents</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">What this taught me</div>
        <p>Banking sets a high bar for correctness - production issues in a core banking system affect real accounts. Working under those constraints shaped how I think about data integrity, change management, and what "done" really means in a regulated environment.</p>
      </div>
      <div class="dr-stack">C# · .NET Framework · SQL Server · Temenos T24 · jBase · SSRS</div>
    `,
  },

  emerson: {
    eyebrow: "Internship",
    title: "Emerson Process Management",
    period: "Apr 2012 - Jun 2012",
    role: "Software Developer Intern",
    body: `
      <p class="dr-summary">Three-month internship at Emerson's Power and Water Solutions division, building two standalone applications as part of the intern program.</p>
      <div class="dr-divider"></div>
      <div class="dr-section">
        <div class="dr-section-title">What I built</div>
        <ul class="dr-list">
          <li><strong>Arduino Interface App</strong> - a Windows desktop application that communicated with an external Arduino device, reading and displaying hardware signals</li>
          <li><strong>Mobile Chat App</strong> - a chat application built for the Android platform</li>
        </ul>
      </div>
      <div class="dr-stack">C# · .NET Framework · Java (Android) · Arduino</div>
    `,
  },

  mapua: {
    eyebrow: "Education",
    title: "Mapua Institute of Technology",
    period: "Jul 2007 - Aug 2012",
    role: "B.S. Computer Engineering",
    body: `
      <p class="dr-summary">Bachelor of Science in Computer Engineering with a specialization in the Microsoft .NET Framework. Now known as Mapua University.</p>
      <div class="dr-divider"></div>
      <div class="dr-section">
        <div class="dr-section-title">Specialization</div>
        <p>Microsoft .NET Framework - coursework focused on enterprise software development patterns and the Windows application stack.</p>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Thesis</div>
        <p><strong>Web-based Blood Pressure and Electrocardiogram Monitoring System</strong></p>
        <p style="margin-top:8px">A hardware-software integration project that read vital signs from sensors and presented real-time data through a web interface. Combined embedded systems, signal processing, and web development.</p>
      </div>
      <div class="dr-stack">C# · ASP.NET · .NET Framework · Embedded Systems</div>
    `,
  },

  "benefits-platform": {
    eyebrow: "Project - Enterprise",
    title: "Benefits Outsourcing Platform",
    subtitle: "WTW Manila Global Delivery Center",
    body: `
      <p class="dr-summary">Enterprise React + ASP.NET Core web platform for pension and health benefits administration. Served 100+ global corporate clients for 6+ years of production. Proprietary - detailed architecture available in interviews.</p>
      <div class="dr-section">
        <div class="dr-section-title">What I contributed</div>
        <ul class="dr-list">
          <li>Full-stack feature development: React UI components, ASP.NET Core API endpoints, SQL Server data layer</li>
          <li>Code review ownership as lead - set standards for the team's React and .NET patterns</li>
          <li>Onboarded and mentored 4 engineers; managed growth plans and performance reviews</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Architecture (non-proprietary)</div>
        <p>Multi-tier platform: ASP.NET WebForms admin, ASP.NET MVC (ESS portals), and React (ESSNext) consuming a .NET Web API layer, backed by SQL Server. Azure DevOps CI/CD, NUnit test coverage, SSIS bulk data pipelines, SSRS reporting.</p>
      </div>
      <div class="dr-stack">ASP.NET Core · React · TypeScript · SQL Server · Azure DevOps · NUnit · SSIS · SSRS · OAuth2</div>
    `,
  },

  tamelo: {
    eyebrow: "Project - Personal",
    title: "Tamelo App &amp; API",
    github: "https://github.com/salgadonikka/tamelo-app",
    body: `
      <p class="dr-summary">A weekly task planner built to explore modern .NET + React architecture outside of enterprise constraints. Tasks are assigned to days of the week using a circular state machine with four states.</p>
      <div class="dr-section">
        <div class="dr-section-title">Why I built it</div>
        <p>I wanted a project where I make all architecture decisions myself - no legacy patterns, no inherited constraints. Tamelo is where I explore ASP.NET Core 10 preview features, Supabase, and React 18 concurrent features in a real deployment.</p>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Technical decisions</div>
        <ul class="dr-list">
          <li>ASP.NET Core 10 Web API, built with Clean Architecture, MediatR for CQRS, FluentValidation, and EF Core as the ORM</li>
          <li>Supabase for authentication (email/password + Google OAuth) and PostgreSQL hosting. The API validates Supabase-issued JWTs and handles all data access via EF Core</li>
          <li>React 18 with TypeScript; state managed with Zustand for simplicity over Redux</li>
          <li>Circular task state: Pending → In Progress → Done → Skipped → Pending</li>
        </ul>
      </div>
      <div class="dr-stack">React 18 · TypeScript · ASP.NET Core 10 · Supabase · PostgreSQL · Zustand</div>
      <a href="/projects/tamelo" class="dr-github">View full project →</a>
      <a href="https://github.com/salgadonikka/tamelo-app" target="_blank" rel="noopener" class="dr-github">View on GitHub →</a>
    `,
  },

  mymedstory: {
    eyebrow: "Project - Personal",
    title: "MyMedStory",
    github: "https://github.com/salgadonikka/mymedstory",
    body: `
      <p class="dr-summary">A private cloud-hosted health intelligence platform for personal medical records. Transforms scattered documents and lab results into a unified, searchable timeline with AI-assisted summaries.</p>
      <div class="dr-section">
        <div class="dr-section-title">The problem it solves</div>
        <p>Medical history is fragmented - PDFs from different hospitals, lab results in different formats, no single source of truth. MyMedStory ingests documents, extracts structured data, and presents a chronological health timeline with AI context.</p>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Architecture</div>
        <ul class="dr-list">
          <li>.NET 8 API with Hangfire for background document processing jobs</li>
          <li>Next.js 14 web app (App Router) + React Native mobile sharing a single API</li>
          <li>Cloudflare R2 for document storage - zero egress cost vs S3</li>
          <li>PostgreSQL via Supabase with full-text search over extracted medical data</li>
          <li>AI summarisation layer for lab result interpretation</li>
        </ul> 
      </div>
      <div class="dr-stack">.NET 10 · Next.js 14 · React Native · PostgreSQL · Cloudflare R2 · Hangfire</div>
      <a href="https://github.com/salgadonikka/mymedstory" target="_blank" rel="noopener" class="dr-github">View on GitHub →</a>
    `,
  },

  devutilityhub: {
    eyebrow: "Project - Personal",
    title: "DevUtilityHub",
    github: "https://github.com/salgadonikka/DevUtilityHub",
    body: `
      <p class="dr-summary">A full-stack developer utility web application. All processing logic lives in an ASP.NET Core 10 Web API; React is a thin presentation layer that sends input and displays output only.</p>
      <div class="dr-section">
        <div class="dr-section-title">Tools</div>
        <ul class="dr-list">
          <li><strong>Universal Formatter</strong> - prettify, minify, and validate JSON and XML</li>
          <li><strong>Base64 / URL / HTML Encoder</strong> - encode and decode all three formats</li>
          <li><strong>Text Tools</strong> - case conversion, trim, sort, deduplicate, reverse, and more</li>
          <li><strong>Diff Checker</strong> - side-by-side text diff with line-level change highlighting</li>
          <li><strong>Timestamp Converter</strong> - Unix ↔ human-readable, seconds and milliseconds</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Architecture</div>
        <p>Layered API design - Controllers handle HTTP routing only, Services orchestrate logic, and Core contains pure algorithm implementations with no dependencies. Auto-detection of input format. Centralised error handling via middleware. Unit tests target the Core layer directly with no HTTP or DI dependencies.</p>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Why I built it</div>
        <p>A clean sandbox for practising strict architectural separation: the backend is the product, and the frontend is just a display layer. Also a practical tool I actually use day-to-day.</p>
      </div>
      <div class="dr-stack">ASP.NET Core 10 · React 19 · TypeScript · Vite · Tailwind CSS v4 · OpenAPI / Swagger · Docker</div>
      <a href="https://github.com/salgadonikka/DevUtilityHub" target="_blank" rel="noopener" class="dr-github">View on GitHub →</a>
    `,
  },
};
