/* ─────────────────────────────────────────
   DANIEL HO — PORTFOLIO
   main.js
───────────────────────────────────────── */

/* ── PROJECT DATA ──
   To add a new project:
   1. Add an entry to PROJECTS below
   2. Add a matching <a> card in index.html inside .proj-grid
   The slug in href="#/project/YOUR-SLUG" must match the key here.

   ── MEDIA FIELD GUIDE ──
   Each project has an optional `media` field. If omitted, a placeholder is shown.

   For a YouTube/video main slot:
     main: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:6px">
               <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                 style="position:absolute;inset:0;width:100%;height:100%;border:none"
                 allowfullscreen></iframe>
             </div>`

   For an image main slot:
     main: `<img src="./static/files/your-image.png"
               style="width:100%;border-radius:6px;border:1px solid var(--b2)"
               alt="Description">`

   For secondary images (shown in a 2-column grid below main):
     secondary: [
       './static/files/screenshot-1.png',
       './static/files/screenshot-2.png'
     ]

   For captions on secondary images (optional, aligned by index):
     captions: [
       'Caption for first image',
       'Caption for second image'
     ]

   secondary is optional — omit it or leave as [] to show nothing below main.
─────────────────────────────────────────── */
const PROJECTS = {
  'swe-life': {
    num:   '01',
    // FIX 6: Typo corrected — "Sofware" → "Software"
    title: 'SWE Life',
    sub:   'CMU 15-112 Final Project',
    year:  '2026',
    role:  'Solo Developer',
    stack: ['Python', 'CMU Graphics Library', 'Game Design', 'Object-Oriented Programming'],
    body:  `A minigame collection built as the final project for CMU 15-112 (Fundamentals of Programming and Computer Science). The game follows a Software Engineer attempting to climb the corporate ladder by improving hygiene, grooming, and room cleanliness stats through a series of minigames.

The project grew into a complex, 1300-line system featuring a progression system, an in-game shop with persistent upgrades, cross-stat debuffs, a slingshot minigame, and a vertically scrolling platformer. This project received a 99/100 grade and a feature on CMU's Spring '26 15-112 course website. Built entirely in Python with the cmu_graphics library.`,
    media: {
      main: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:6px">
                <iframe src="https://www.youtube.com/embed/i-ZC2HGeB9w?si=Kj0VFo9_FMqpvjTA"
                  style="position:absolute;inset:0;width:100%;height:100%;border:none"
                  allowfullscreen></iframe>
              </div>`,
      secondary: [
        './static/files/swe-life-1.png',
        './static/files/swe-life-2.png'
      ],
      captions: [
        'Home screen and stat dashboard',
        '"THE CLIMB" vertically scrolling platformer minigame'
      ]
    },
    links: [
      { label: 'Play Project', url: 'https://academy.cs.cmu.edu/sharing/oldLaceFish369828' }
    ]
  },

  'monomuse': {
    num:   '02',
    title: 'MonoMuse',
    sub:   'Museum Database Analysis & Redesign',
    year:  '2026',
    role:  'Developer & Analyst',
    stack: ['ERD', 'MySQL', 'SQL', 'HTML, CSS, JS', 'Funnel Analysis', 'Basic Web Development'],
    body:  `A database analysis and UX redesign project for a fictional museum website. 
The project produced SQL-based usability findings from structured museum data and a full redesign summary. Work included debugging a JavaScript slideshow rendering issue and implementing dynamic localStorage variable display for state persistence across sessions.`,
    media: {
      // FIX 3 & 8: MonoMuse iframe now uses the same responsive wrapper as the
      // YouTube embed, and has a defined height so it doesn't collapse.
      main: `<div style="position:relative;padding-bottom:75%;height:0;overflow:hidden;border-radius:6px;background:var(--s1);border:1px solid var(--b2)">
               <iframe
                 src="https://docs.google.com/document/d/e/2PACX-1vSPJ3uftFpHHLsl9dKsHHDmpfDWZPR34n_VeCgzdcqk9nRVM4s7IcBZniPjfpbND44gB_rVFZtzreWY/pub?embedded=true"
                 style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:6px"
                 title="Database Analysis Report">
                 Your browser does not support iframes.
               </iframe>
             </div>`,
      secondary: [
        './static/files/monomuse-1.png',
        './static/files/monomuse-2.png'
      ],
      captions: [
        'Database schema and SQL analysis',
        'Website redesign wireframes'
      ]
    },
    links: [
      { label: 'Database Analysis Report', url: 'https://docs.google.com/document/d/1ugFPz1JJQCwt8puhy2eo24r6WgcdWJKEPOjVf53r0cY/edit?tab=t.0' },
      { label: 'Website Redesign Report', url: 'https://docs.google.com/document/d/16cZFHNhtuy9aLKG_l03aGjn6ELaemB58FrRcpXSupE8/edit?usp=sharing' }
    ]
  },

  'titanic-classifier': {
    num:   '03',
    title: 'Titanic Survival Classifier',
    sub:   'Binary Classification Analysis',
    year:  '2026',
    role:  'Data Analyst',
    stack: ['R', 'RMarkdown', 'LDA', 'QDA', 'Logistic Regression', 'Classification Trees', 'ggplot2'],
    body:  `A binary classification analysis on the Titanic dataset for CMU 36-202: Methods for Statistics and Data Science. Applied and compared four classification methods — Linear Discriminant Analysis (LDA), Quadratic Discriminant Analysis (QDA), logistic regression, and classification trees, evaluating each on accuracy, precision, and interpretability.

Findings were communicated in a full RMarkdown report with clear visualizations and a structured comparison of model performance across key metrics.`,
    media: {
      main: `<img src="./static/files/titanic-main.png"
                style="width:100%;border-radius:6px;border:1px solid var(--b2)"
                alt="Titanic classifier results">`,
    },
    links: [{ label: 'Full Analysis', url: 'https://drive.google.com/file/d/1Oqy27mSg0_LD5_mos973FJ4k9BlSCbNZ/view?usp=sharing' }]
  },

  'dan_the.musicman': {
    num:   '04',
    title: 'Music Portfolio',
    sub:   'Production, Performance & Audience Growth',
    year:  '2024 – Present',
    role:  'Producer, Arranger & Performing Musician',
    stack: ['Audio Production', 'Mixing & Mastering', 'Content Strategy', 'Ensemble Performance', 'Project Management'],
    body:  `A body of work spanning solo production and live performance, built around iteration, technical execution, and creative direction under real constraints.

I founded Ottoman Empire, a student band at CMU that has performed at multiple campus events, including CMU's Rose Ball as one of two selected acts. I coordinate rehearsals, arrangements, and live execution across the group. The band's content has accumulated over 700,000 Instagram views.

Separately, I arrange, record, mix, and master multi-instrument music covers independently. My most recent cover comprised 61 individual tracks. Across these projects, I have sung and played guitar, piano, percussion, saxophone, viola, and oboe.`,
    media: {
      main: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:6px;background:var(--s1);border:1px solid var(--b2)">
               <iframe
                 src="https://drive.google.com/file/d/1Yu2p1ySjo1PeLFIz-QaUUhyA9fAjCsME/preview"
                 style="position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:6px"
                 allowfullscreen>
               </iframe>
             </div>`,
      secondary: [
        './static/files/music-1.png',
        './static/files/music-2.png'
      ],
      captions: [
        'Ottoman Empire performing at Rose Ball',
        'Recording and production setup'
      ]
    },
    links: [
      { label: 'Ottoman Empire on Instagram', url: 'https://instagram.com/ottomanempire502' },
      { label: 'Selected Music Content', url: 'https://drive.google.com/drive/folders/12GREpGJfUg_63VZoJOTi0-QHIM-7El9G?usp=sharing' }
    ]
  }
};


/* ══════════════════════════════════════════
   ROUTER
══════════════════════════════════════════ */

function getRoute() {
  const h = window.location.hash || '#';
  if (h.startsWith('#/project/')) return { type: 'project', slug: h.replace('#/project/', '') };
  return { type: 'home' };
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('on');
    p.style.display = 'none';
  });
  const pg = document.getElementById('page-' + name);
  pg.style.display = 'block';
  requestAnimationFrame(() => pg.classList.add('on'));
}

function route() {
  const r = getRoute();
  if (r.type === 'project') {
    savedScrollY = window.scrollY;   
    renderProject(r.slug);
    showPage('project');
  } else {
    showPage('home');
    closeMobileMenu();
    setTimeout(initScrollObserver, 50);
  }
}

window.addEventListener('hashchange', route);


/* ══════════════════════════════════════════
   PROJECT DETAIL RENDERER
══════════════════════════════════════════ */

function renderProject(slug) {
  const p = PROJECTS[slug];
  if (!p) { window.location.hash = '#'; return; }

  const linksHTML = p.links.length
    ? `<div class="pd-side-s">
         <div class="pd-side-lbl">Links</div>
         ${p.links.map(l => `<a href="${l.url}" target="_blank" style="color:var(--ac);font-size:.875rem;text-decoration:none;display:block;margin-bottom:.35rem">${l.label} ↗</a>`).join('')}
       </div>`
    : '';

  // FIX 2: Secondary images now use .m-figure wrappers for consistent sizing
  // and optional captions aligned by index from media.captions[]
  function buildSecondaryImages(media) {
    if (!media.secondary?.length) return '';
    return `<div class="m-grid">
      ${media.secondary.map((src, i) => {
        const cap = media.captions?.[i];
        return `<figure class="m-figure">
          <img src="${src}" alt="${cap || 'Project screenshot'}">
          ${cap ? `<figcaption class="m-caption">${cap}</figcaption>` : ''}
        </figure>`;
      }).join('')}
    </div>`;
  }

  // Build media section — uses project's media field if present, else shows placeholder
  const mediaHTML = p.media
    ? `<div class="pd-media">
         ${p.media.main}
         ${buildSecondaryImages(p.media)}
       </div>`
    : `<div class="pd-media">
         <div class="m-main">
           <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
           <span>Add primary media — screenshot, video embed, or live demo link</span>
         </div>
         <div class="m-grid">
           <div class="m-slot">Secondary image</div>
           <div class="m-slot">Secondary image</div>
         </div>
       </div>`;

  document.getElementById('page-project').innerHTML = `
    <div class="pd-hero">
      <a href="#" class="pd-back" id="pd-back">← Back to work</a>
      <div class="pd-n">${p.num}</div>
      <h1 class="pd-title">${p.title}</h1>
      <div class="pd-meta">
        <div class="pd-meta-item">
          <span class="pd-meta-lbl">Subtitle</span>
          <span class="pd-meta-val">${p.sub}</span>
        </div>
        <div class="pd-meta-item">
          <span class="pd-meta-lbl">Year</span>
          <span class="pd-meta-val">${p.year}</span>
        </div>
        <div class="pd-meta-item">
          <span class="pd-meta-lbl">Role</span>
          <span class="pd-meta-val">${p.role}</span>
        </div>
      </div>
    </div>

    ${mediaHTML}

    <div class="pd-body">
      <div class="pd-overview">
        <h3>Overview</h3>
        ${p.body.split('\n\n').map(para => `<p>${para}</p>`).join('')}
      </div>
      <div class="pd-side">
        <div class="pd-side-s">
          <div class="pd-side-lbl">Technologies</div>
          <div class="tags">${p.stack.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
        <div class="pd-side-s">
          <div class="pd-side-lbl">Year</div>
          <div class="pd-side-val">${p.year}</div>
        </div>
        <div class="pd-side-s">
          <div class="pd-side-lbl">Role</div>
          <div class="pd-side-val">${p.role}</div>
        </div>
        ${linksHTML}
      </div>
    </div>
  `;

  document.getElementById('pd-back').addEventListener('click', e => {
  e.preventDefault();
  window.location.hash = '#';
  setTimeout(() => window.scrollTo({ top: savedScrollY, behavior: 'instant' }), 30);
});
  bindHoverTargets();
  window.scrollTo({ top: 0, behavior: 'instant' });
}


/* ══════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════ */

const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
let menuOpen  = false;

function openMobileMenu()  {
  menuOpen = true;
  burger.classList.add('open');
  mobMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  menuOpen = false;
  burger.classList.remove('open');
  mobMenu.classList.remove('open');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => menuOpen ? closeMobileMenu() : openMobileMenu());

// Mobile menu links
document.querySelectorAll('.mob-link').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const id = el.getAttribute('data-s');
    closeMobileMenu();
    setTimeout(() => scrollToSection(id), 300);
  });
});


/* ══════════════════════════════════════════
   SECTION NAVIGATION
══════════════════════════════════════════ */

let savedScrollY = 0;

function scrollToSection(id) {
  if (getRoute().type !== 'home') {
    window.location.hash = '#';
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}

// Desktop nav links
document.querySelectorAll('[data-s]').forEach(el => {
  if (el.classList.contains('mob-link')) return;
  el.addEventListener('click', e => {
    e.preventDefault();
    scrollToSection(el.getAttribute('data-s'));
  });
});

// Logo
document.getElementById('n-home').addEventListener('click', e => {
  e.preventDefault();
  closeMobileMenu();
  if (getRoute().type !== 'home') window.location.hash = '#';
  else window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ══════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════ */

const cur = document.getElementById('cur');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animateCursor() {
  cx += (mx - cx) * 0.3;
  cy += (my - cy) * 0.3;
  cur.style.left = cx + 'px';
  cur.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
})();

function bindHoverTargets() {
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('h'));
    el.addEventListener('mouseleave', () => cur.classList.remove('h'));
  });
}

bindHoverTargets();


/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */

let scrollObserver;

function initScrollObserver() {
  if (scrollObserver) scrollObserver.disconnect();

  scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('v');
        scrollObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('#page-home .rv').forEach(el => scrollObserver.observe(el));
}


/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */

route();
initScrollObserver();