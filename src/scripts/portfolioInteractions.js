/**
 * Portfolio page interactions.
 * Handles: sidebar animations, tile scroll/nav, drawer open/close,
 *          keyboard navigation, mobile menu, progress dots.
 *
 * Imported by portfolio.astro via <script>.
 * Runs as an ES module — no IIFE needed.
 */

import { drawerData } from '../data/portfolioDrawers.js';

// ── Element references ───────────────────────────────
const rightPanel   = document.getElementById('pf2-right');
const sidebarEl    = document.getElementById('pf2-sidebar');
const tiles        = Array.from(document.querySelectorAll('.tile'));
const sidebarLinks       = Array.from(document.querySelectorAll('.si-nav--desktop .si-link'));
const sidebarLinksTablet = Array.from(document.querySelectorAll('.si-nav--tablet .si-link'));
const dots         = Array.from(document.querySelectorAll('#progress-dots .pdot'));
const dotsTablet   = Array.from(document.querySelectorAll('#progress-dots-tablet .pdot'));
const mobHamburger = document.getElementById('mob-hamburger');
const mobClose     = document.getElementById('mob-close');
const mobOverlay   = document.getElementById('mob-overlay');
const mobNavLinks  = Array.from(document.querySelectorAll('.mob-nav-link'));

// Tablet snap sections (the 5 scroll targets in tablet mode)
const tabletSnapSections = [
  document.querySelector('#tile-01 .t01-left'),
  document.querySelector('#tile-01 .t01-skills'),
  document.querySelector('#tile-02 .t02-left'),
  document.querySelector('#tile-02 .t02-right'),
  document.querySelector('#tile-03'),
].filter(Boolean);

// Maps tablet section index → tile index (used for sidebar hide/show logic)
const tabletSectionToTile = [0, 0, 1, 1, 2];

// Tile 03 contact hero elements
const heroPhotoWrapEl = document.getElementById('t03c-photo-wrap');
const heroIdentityEl  = document.getElementById('t03c-identity');
const heroCopyEl      = document.getElementById('t03c-copy');
const heroLinksEl     = document.getElementById('t03c-links');

// ── State ────────────────────────────────────────────
let currentIndex = 0;
let heroAnimated = false;
const isMobile   = () => window.innerWidth <= 768;
const isTablet   = () => window.innerWidth > 768 && window.innerWidth <= 1100;
const LAST_TILE  = tiles.length - 1;
const COLLAPSE_MS = 500; // must match CSS width transition duration

// ── Avatar photo fallback ────────────────────────────
const avatarImg = document.querySelector('.si-avatar-img');
if (avatarImg) {
  avatarImg.addEventListener('error', () => {
    avatarImg.style.display = 'none';
    const fb = document.querySelector('.si-avatar-fallback');
    if (fb) fb.style.display = 'flex';
  });
}

// ── Page-load: unfold sidebar from left ─────────────
if (sidebarEl && !isMobile()) {
  sidebarEl.classList.add('si--entering');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      sidebarEl.classList.remove('si--entering');
    });
  });
}

// ── Hero animations ──────────────────────────────────
function resetHero() {
  heroAnimated = false;
  [heroPhotoWrapEl, heroIdentityEl, heroCopyEl, heroLinksEl].forEach((el) => {
    if (!el) return;
    el.style.transition = 'none';
    el.style.opacity    = '0';
    el.style.transform  = '';
  });
  if (heroPhotoWrapEl) heroPhotoWrapEl.style.transform = 'scale(0.55)';
}

function showSidebar() {
  sidebarEl && sidebarEl.classList.remove('si--hidden');
  resetHero();
}

function hideSidebarAndAnimate() {
  if (heroAnimated || isMobile()) return;
  heroAnimated = true;

  sidebarEl && sidebarEl.classList.add('si--hidden');

  setTimeout(() => {
    if (heroPhotoWrapEl) {
      heroPhotoWrapEl.style.transition =
        'transform 0.6s cubic-bezier(0.34,1.2,0.64,1), opacity 0.4s ease';
      heroPhotoWrapEl.style.transform = '';
      heroPhotoWrapEl.style.opacity   = '1';
    }
  }, COLLAPSE_MS);

  setTimeout(() => {
    if (heroIdentityEl) {
      heroIdentityEl.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      heroIdentityEl.style.opacity    = '1';
      heroIdentityEl.style.transform  = '';
    }
  }, COLLAPSE_MS + 220);

  setTimeout(() => {
    if (heroCopyEl) {
      heroCopyEl.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      heroCopyEl.style.opacity    = '1';
      heroCopyEl.style.transform  = '';
    }
  }, COLLAPSE_MS + 360);

  setTimeout(() => {
    if (heroLinksEl) {
      heroLinksEl.style.transition = 'opacity 0.45s ease';
      heroLinksEl.style.opacity    = '1';
    }
  }, COLLAPSE_MS + 480);
}

// ── Active section tracking ──────────────────────────
function setActive(index) {
  currentIndex = index;
  sidebarLinks.forEach((l, i) => {
    const on = i === index;
    l.classList.toggle('si-link--active', on);
    l.setAttribute('aria-current', on ? 'true' : 'false');
  });
  dots.forEach((d, i) => d.classList.toggle('pdot--active', i === index));

  if (!isMobile()) {
    if (index === LAST_TILE) {
      hideSidebarAndAnimate();
    } else {
      showSidebar();
    }
  }
}

// Initialise hero as invisible
resetHero();

// ── IntersectionObserver (desktop + tablet scroll snapping) ──
if (rightPanel && !isMobile()) {
  if (isTablet()) {
    // Tablet: observe 5 sub-sections, update 5-dot and 5-link sets
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const si = tabletSnapSections.indexOf(e.target);
            if (si === -1) return;
            currentIndex = tabletSectionToTile[si];
            dotsTablet.forEach((d, i) => d.classList.toggle('pdot--active', i === si));
            sidebarLinksTablet.forEach((l, i) => {
              const on = i === si;
              l.classList.toggle('si-link--active', on);
              l.setAttribute('aria-current', on ? 'true' : 'false');
            });
            if (currentIndex === LAST_TILE) hideSidebarAndAnimate();
            else showSidebar();
          }
        });
      },
      { root: rightPanel, threshold: 0.5 },
    );
    tabletSnapSections.forEach((s) => obs.observe(s));
  } else {
    // Desktop: observe 3 tiles, update 3-dot set
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = tiles.indexOf(e.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: rightPanel, threshold: 0.5 },
    );
    tiles.forEach((t) => obs.observe(t));
  }
}

// ── Keyboard arrow navigation ────────────────────────
document.addEventListener('keydown', (e) => {
  if (isMobile()) return;
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (document.getElementById('drawer')?.classList.contains('is-open')) return;

  if (e.key === 'ArrowDown' && currentIndex < tiles.length - 1) {
    e.preventDefault();
    tiles[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (e.key === 'ArrowUp' && currentIndex > 0) {
    e.preventDefault();
    tiles[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// ── Sidebar nav clicks ───────────────────────────────
sidebarLinks.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    if (isMobile() || isTablet()) return;
    e.preventDefault();
    tiles[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

sidebarLinksTablet.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    if (!isTablet()) return;
    e.preventDefault();
    const target = tabletSnapSections[i];
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Progress dot clicks ──────────────────────────────
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    if (isMobile() || isTablet()) return;
    tiles[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

dotsTablet.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    if (!isTablet()) return;
    const target = tabletSnapSections[i];
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Mobile menu ──────────────────────────────────────
function openMenu() {
  mobOverlay.setAttribute('aria-hidden', 'false');
  mobOverlay.classList.add('is-open');
  mobHamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobOverlay.setAttribute('aria-hidden', 'true');
  mobOverlay.classList.remove('is-open');
  mobHamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
if (mobHamburger) mobHamburger.addEventListener('click', openMenu);
if (mobClose)     mobClose.addEventListener('click', closeMenu);
mobNavLinks.forEach((l) => l.addEventListener('click', closeMenu));

// ── Drawer ───────────────────────────────────────────
const drawerEl        = document.getElementById('drawer');
const drawerBackdrop  = document.getElementById('drawer-backdrop');
const drawerCloseBtn  = document.getElementById('drawer-close');
const drawerContentEl = document.getElementById('drawer-content');

function openDrawer(key) {
  const data = drawerData[key];
  if (!data || !drawerEl || !drawerContentEl) return;

  drawerContentEl.innerHTML = `
    <div class="dr-eyebrow">${data.eyebrow}</div>
    <h2 class="dr-title">${data.title}</h2>
    ${data.period  ? `<div class="dr-period">${data.period}</div>`   : ''}
    ${data.role    ? `<div class="dr-role">${data.role}</div>`       : ''}
    ${data.subtitle? `<div class="dr-role">${data.subtitle}</div>`   : ''}
    <div class="dr-divider"></div>
    ${data.body}
  `;

  drawerEl.setAttribute('aria-hidden', 'false');
  drawerEl.classList.add('is-open');
  drawerBackdrop.setAttribute('aria-hidden', 'false');
  drawerBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  drawerEl.scrollTop = 0;
  drawerCloseBtn && drawerCloseBtn.focus();
}

function closeDrawer() {
  if (!drawerEl) return;
  drawerEl.setAttribute('aria-hidden', 'true');
  drawerEl.classList.remove('is-open');
  drawerBackdrop.setAttribute('aria-hidden', 'true');
  drawerBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-drawer]');
  if (target) openDrawer(target.dataset.drawer);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    return;
  }
  if (
    (e.key === 'Enter' || e.key === ' ') &&
    document.activeElement?.hasAttribute('data-drawer')
  ) {
    e.preventDefault();
    openDrawer(document.activeElement.dataset.drawer);
  }
});

if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
