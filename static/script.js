/* ─────────────────────────────────────────
   DANIEL HO — PORTFOLIO
   script.js — rendering & behavior only

   All editable text/data lives in content.js (loaded before this file —
   see index.html). This file just reads CONTENT / PROJECTS / SITE and
   turns them into the page: renderers, routing, cursor, motion, etc.
───────────────────────────────────────── */

/* JS is running — activate scroll-reveal hiding.
   If this line never runs, elements stay visible (no blank page). */
document.documentElement.classList.add('js-ready');

/* Capability flags, read once. */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasHover             = window.matchMedia('(hover: hover)').matches;
const hasFinePointer       = window.matchMedia('(pointer: fine)').matches;

/* ── CUSTOM CURSOR OPT-IN ──────────────────────────────────────────────
   The stylesheet only hides the real cursor under html.cursor-custom, and
   that class is added here — meaning it can only ever be applied when JS
   has actually run AND the device has a real, fine, hover-capable pointer
   AND the visitor hasn't asked for reduced motion.

   The previous version set `cursor: none` in plain CSS on <body>, so a
   visitor whose JS was blocked, slow, or errored got a page with no
   visible pointer at all — an unrecoverable state, and a plausible one on
   a locked-down corporate network. Enhancement now degrades to "normal
   cursor" rather than "no cursor". */
const useCustomCursor = hasHover && hasFinePointer && !prefersReducedMotion;
if (useCustomCursor) document.documentElement.classList.add('cursor-custom');


/* ══════════════════════════════════════════
   TEXT SPLITTING
   Two reveal treatments, both built at runtime so the HTML stays plain
   text and reads correctly to screen readers, search crawlers, and
   anyone whose JS never arrives.

   splitChars()  → hero name, one span per glyph, staggered rise
   maskLines()   → section titles, whole line rising from behind its box

   Both bail out entirely under reduced motion: there's no point building
   dozens of wrapper elements for an animation that won't play.
══════════════════════════════════════════ */

function splitChars(el, startIndex) {
  const text = el.textContent;
  el.textContent = '';

  /* The real string stays in the DOM for assistive tech and crawlers. The
     animated glyphs are decorative duplicates — without this split a
     screen reader announces the name one letter at a time, because each
     inline-block span reads as its own word. */
  const label = document.createElement('span');
  label.className = 'sr-only';
  label.textContent = text;
  el.appendChild(label);

  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');

  let i = startIndex;
  for (const ch of text) {
    if (ch === ' ') { visual.appendChild(document.createTextNode(' ')); i++; continue; }
    const outer = document.createElement('span');
    outer.className = 'ch';
    const inner = document.createElement('span');
    inner.className = 'ch-i';
    inner.textContent = ch;
    outer.style.setProperty('--i', i++);
    outer.appendChild(inner);
    visual.appendChild(outer);
  }
  el.appendChild(visual);
  return i;
}

function initSplitText() {
  if (prefersReducedMotion) return;
  /* One running index across every split element, so the stagger reads as
     a single continuous sweep through the name rather than each line
     restarting its own count. */
  let i = 0;
  document.querySelectorAll('[data-split]').forEach(el => { i = splitChars(el, i); });
}

/* Wraps a title's text in a single block so it can slide up from behind
   the heading's own overflow box. Idempotent — safe to call again after
   a re-render. */
function maskLines() {
  if (prefersReducedMotion) return;
  document.querySelectorAll('.sec-title').forEach(el => {
    if (el.querySelector('.m-in')) return;
    const inner = document.createElement('span');
    inner.className = 'm-in';
    inner.textContent = el.textContent;
    el.textContent = '';
    el.appendChild(inner);
  });
}


/* ── EMBED FACADE ─────────────────────────────────────────────────────
   Third-party embeds (YouTube, Google Drive/Docs) load on click instead
   of eagerly on page load. This avoids extra third-party requests for
   visitors who never press play, and — the bigger reason — gives a real,
   visible "click to load" state instead of a silently blank/broken box
   if the embed is blocked outright by an ad blocker or a locked-down
   network, which happens routinely with YouTube/Drive iframes.

   embedYouTube()/embedIframe() (in content.js, since PROJECTS calls them
   at definition time) build a small descriptor; buildEmbedFacade() below
   turns that into the actual facade markup at render time. */
let embedIdSeq = 0;

function buildEmbedFacade(media) {
  const id = 'embed-' + (++embedIdSeq);
  const ratioClass = media.kind === 'youtube' ? 'embed-16x9' : (media.ratio === 'gdoc' ? 'embed-gdoc' : 'embed-16x9');
  const src = media.kind === 'youtube'
    ? `https://www.youtube.com/embed/${media.videoId}?autoplay=1&rel=0`
    : media.src;
  const label = media.kind === 'youtube' ? 'Play video' : 'Load embedded content';
  const posterAttr = media.poster ? ` style="background-image:url('${media.poster}')"` : '';

  /* Real iframe markup — inert inside a <template> until the user opts in. */
  const iframeHtml = `<div class="${ratioClass}"><iframe src="${src}" title="${media.title}" allowfullscreen loading="lazy"></iframe></div>`;

  return `<div class="embed-facade ${ratioClass}" id="${id}"${posterAttr}>
    <button class="embed-facade-btn" type="button" data-embed-target="${id}" aria-label="${label}: ${media.title}">
      <svg class="embed-play-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5"></circle>
        <path d="M10 8.3l6 3.7-6 3.7V8.3z"></path>
      </svg>
      <span>${label}</span>
    </button>
    <template class="embed-facade-tpl">${iframeHtml}</template>
  </div>`;
}

/* Delegated click — works for facades on any project page without
   needing to (re)bind listeners each time renderProject() runs. */
document.addEventListener('click', e => {
  const btn = e.target.closest('.embed-facade-btn');
  if (!btn) return;
  const facade = document.getElementById(btn.dataset.embedTarget);
  const tpl = facade?.querySelector('.embed-facade-tpl');
  if (facade && tpl) facade.outerHTML = tpl.innerHTML;
});


/* ══════════════════════════════════════════
   ROUTER
══════════════════════════════════════════ */

/* Shared broken-image fallback for project detail media — swaps a failed
   <img> for the same dashed-border placeholder used when a project has
   no media at all, instead of leaving a broken-image icon on the page. */
function handleImgError(img) {
  const wrap = document.createElement('div');
  wrap.className = 'm-main';
  wrap.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    <span>Image unavailable</span>`;
  img.replaceWith(wrap);
}

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

function applyRoute() {
  const r = getRoute();
  if (r.type === 'project') {
    savedScrollY = window.scrollY;
    renderProject(r.slug);
    showPage('project');
  } else {
    showPage('home');
    /* Scroll restored here (not in the back-button handler) to avoid
       a race condition with showPage's requestAnimationFrame. */
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
    closeMobileMenu();
    resetHomeMeta();
    setTimeout(() => { initScrollObserver(); initScrollSpy(); }, 50);
  }
  updateProgress();
}

/* route() adds the View Transitions cross-fade on top of applyRoute() —
   used for actual navigations (hashchange). The very first paint calls
   applyRoute() directly from INIT at the bottom of this file: there's no
   previous rendered state to transition from on first load, and wrapping
   it in startViewTransition anyway caused a visible rendering glitch. */
function route() {
  if (document.startViewTransition && !prefersReducedMotion) {
    document.startViewTransition(applyRoute);
  } else {
    applyRoute();
  }
}

window.addEventListener('hashchange', route);


/* ══════════════════════════════════════════
   CONTENT RENDERERS
   These read from CONTENT / PROJECTS and
   inject into the empty containers in HTML.
══════════════════════════════════════════ */

function renderHero() {
  document.querySelector('.h-desc').textContent = CONTENT.hero.desc;

  /* Proof strip — the headline numbers, above the fold. */
  const proofEl = document.querySelector('.h-proof');
  const proof = CONTENT.hero?.proof;
  if (proofEl && proof?.length) {
    proofEl.innerHTML = proof.map(p => `
      <div class="pf-item">
        <span class="pf-v">${p.value}${p.suffix ? `<span class="pf-sfx">${p.suffix}</span>` : ''}</span>
        <span class="pf-l">${p.label}</span>
      </div>
    `).join('');
    /* Four columns only work if there are four items; otherwise let the
       grid size itself so a 3- or 5-item edit doesn't leave a gap. */
    if (proof.length !== 4) {
      proofEl.style.gridTemplateColumns = `repeat(${Math.min(proof.length, 4)}, 1fr)`;
    }
  } else if (proofEl) {
    proofEl.remove();
  }
}

function renderAbout() {
  document.querySelector('.ab-body').innerHTML =
    CONTENT.about.bio.map(p => `<p>${p}</p>`).join('');

  const factsEl = document.querySelector('.ab-facts');
  if (factsEl) {
    factsEl.innerHTML = (CONTENT.about.facts || []).map(f => `
      <div class="fact-row">
        <span class="fact-l">${f.label}</span>
        <span class="fact-v">${f.value}</span>
      </div>
    `).join('');
  }

  const intEl = document.querySelector('.int-items');
  const interests = CONTENT.about.interests;
  if (intEl) {
    if (interests?.length) {
      /* Set as a sentence rather than a row of chips. */
      intEl.textContent = interests.join('. ') + '.';
    } else {
      document.querySelector('.ab-interests')?.remove();
    }
  }
}

function renderHonors() {
  document.querySelector('.ab-honors').innerHTML = `
    <div class="hon-lbl">Honors &amp; Awards</div>
    ${CONTENT.honors.map(h => `
      <div class="hon-mini">${h.name}<span class="hon-mini-yr">${h.year}</span></div>
    `).join('')}
  `;
}

/* Slash-separated small text rather than a row of bordered pills — see
   the .meta-line note in style.css. */
function metaLine(items, extraClass = '') {
  if (!items?.length) return '';
  return `<div class="meta-line ${extraClass}">${items.map(t => `<span>${t}</span>`).join('')}</div>`;
}

function renderExperience() {
  document.querySelector('.exp-list').innerHTML =
    CONTENT.experience.map((e, i) => `
      <div class="exp-row rv">
        <span class="exp-i">${String(i + 1).padStart(2, '0')}</span>
        <div>
          <div class="exp-role">${e.role}</div>
          <div class="exp-org">${e.org}</div>
          <p class="exp-desc">${e.desc}</p>
          ${metaLine(e.tags, 'exp-tags')}
        </div>
        <span class="exp-yr${e.current ? ' is-current' : ''}">${e.year}</span>
      </div>
    `).join('');
}

/* ── PROJECT CARDS ──
   Each card leads with an image and the project's headline result, so the
   evidence is visible before the click rather than after it. Projects with
   no screenshot on file get a generated monogram tile so a missing asset
   never leaves a hole in the grid. */
/* The monogram tile sets the project's own name in the display italic
   rather than stamped initials — two capital letters in a tinted box is
   the placeholder every template ships with. */
function thumbFallbackLabel(title) {
  return title;
}

/* Declared as a real function rather than inlined into the onerror
   attribute — building markup inside an HTML attribute string means
   escaping quotes inside quotes, which is exactly where these break. */
function handleThumbError(img, label) {
  const wrap = img.closest('.proj-thumb');
  if (!wrap) return;
  wrap.classList.add('proj-thumb--mono');
  const span = document.createElement('span');
  span.textContent = label;
  img.replaceWith(span);
}

function buildCardThumb(p) {
  const num = `<span class="proj-num">${p.num}</span>`;

  /* Fall back to the monogram tile both when no thumb is declared and when
     a declared one fails to load (onerror), so a bad path degrades to the
     designed placeholder instead of a broken-image icon. */
  if (!p.thumb) {
    return `<div class="proj-thumb proj-thumb--mono"><span>${p.title}</span>${num}</div>`;
  }

  return `<div class="proj-thumb">
    <img src="${p.thumb}" alt="" loading="lazy" decoding="async"
         onerror="handleThumbError(this, ${JSON.stringify(thumbFallbackLabel(p.title)).replace(/"/g, '&quot;')})">
    ${num}
  </div>`;
}

function buildCard(slug, p, i, wide) {
  return `
    <a class="proj-a${wide ? ' proj-a--wide' : ''} rv${i % 2 ? ' d1' : ''}"
       href="#/project/${slug}" aria-label="${p.title} — ${p.sub}">
      ${buildCardThumb(p)}
      <div class="proj-body">
        <div class="proj-top">
          <div class="proj-title">${p.title}</div>
          <span class="arr">↗</span>
        </div>
        <div class="proj-sub">${p.sub}</div>
        <p class="proj-desc">${p.cardDesc}</p>
        ${metaLine(p.cardTags)}
        <div class="proj-foot">
          ${p.resultStat ? `
            <span class="proj-stat">
              <span class="proj-stat-v">${p.resultStat.value}</span>
              <span class="proj-stat-l">${p.resultStat.label}</span>
            </span>` : '<span></span>'}
        </div>
      </div>
    </a>`;
}

/* Cards are rendered in labelled tiers rather than one flat grid — see the
   PROJECT_GROUPS note in content.js for why.

   Any project whose `group` doesn't match a declared tier (or has none)
   falls into a trailing "Other" group rather than silently disappearing,
   which is the failure mode of grouping by a hand-typed key. */
function renderProjectCards() {
  const groups = (typeof PROJECT_GROUPS !== 'undefined' && PROJECT_GROUPS.length)
    ? PROJECT_GROUPS
    : [{ id: null, label: '', note: '' }];

  const entries = Object.entries(PROJECTS);
  const claimed = new Set();

  const blocks = groups.map(g => {
    const items = entries.filter(([, p]) => p.group === g.id);
    items.forEach(([slug]) => claimed.add(slug));
    return { g, items };
  });

  const orphans = entries.filter(([slug]) => !claimed.has(slug));
  if (orphans.length) blocks.push({ g: { id: '_other', label: 'Other', note: '' }, items: orphans });

  document.querySelector('.proj-grid').innerHTML = blocks
    .filter(b => b.items.length)
    .map(({ g, items }) => {
      /* A tier holding a single project gets a full-width horizontal card,
         so a lone tile never sits beside an empty half-row. */
      const wide = items.length === 1;
      return `
        <section class="proj-group">
          ${g.label ? `
            <header class="proj-group-hd rv">
              <h3 class="proj-group-l">${g.label}</h3>
              ${g.note ? `<p class="proj-group-n">${g.note}</p>` : ''}
            </header>` : ''}
          <div class="proj-row">
            ${items.map(([slug, p], i) => buildCard(slug, p, i, wide)).join('')}
          </div>
        </section>`;
    }).join('');
}

function renderCurrently() {
  document.querySelector('.cur-lead').textContent = CONTENT.currently.lead;
  document.querySelector('.cur-list').innerHTML =
    CONTENT.currently.items
      .map(item => `<div class="cur-item">${item}</div>`)
      .join('');
}

function renderSkills() {
  document.querySelector('.sk-g').innerHTML =
    CONTENT.skills.map(cat => `
      <div>
        <h3 class="sk-cat">${cat.category}</h3>
        <ul class="sk-list">
          ${cat.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
}

function renderContact() {
  document.querySelector('.ct-sub').textContent = CONTENT.contact.sub;
}

function renderContent() {
  renderHero();
  renderAbout();
  renderHonors();
  renderExperience();
  renderProjectCards();
  renderCurrently();
  renderSkills();
  renderContact();
}


/* ══════════════════════════════════════════
   PROJECT DETAIL RENDERER
══════════════════════════════════════════ */

/* Cached so both renderProject() (for the "next project" link) and any
   future navigation can reason about order without re-deriving it. */
const PROJECT_SLUGS = Object.keys(PROJECTS);

function renderProject(slug) {
  const p = PROJECTS[slug];
  if (!p) { window.location.hash = '#'; return; }

  /* Links live in the hero now rather than at the foot of the sidebar.
     Recruiters click through, and a shipped thing whose link is three
     screens below the fold may as well not have one. */
  const linksHTML = p.links?.length
    ? `<div class="pd-links">
         ${p.links.map(l =>
           `<a class="pd-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} <span aria-hidden="true">↗</span></a>`
         ).join('')}
       </div>`
    : '';

  function buildSecondaryImages(media) {
    if (!media.secondary?.length) return '';
    return `<div class="m-grid">
      ${media.secondary.map((src, i) => {
        const cap = media.captions?.[i];
        return `<figure class="m-figure">
          <img src="${src}" alt="${cap || 'Project screenshot'}" loading="lazy"
               onerror="this.closest('.m-figure').classList.add('m-figure--err')">
          ${cap ? `<figcaption class="m-caption">${cap}</figcaption>` : ''}
        </figure>`;
      }).join('')}
    </div>`;
  }

  function buildMainMedia(main) {
    if (typeof main === 'string') {
      // Plain HTML (currently only the <img> case, e.g. Titanic Classifier).
      // handleImgError() swaps a failed image for the same dashed-border
      // placeholder used when a project has no media at all.
      return main.includes('<img')
        ? main.replace('<img', '<img onerror="handleImgError(this)" ')
        : main;
    }
    return buildEmbedFacade(main); // embedYouTube()/embedIframe() descriptor
  }

  const mediaHTML = p.media
    ? `<div class="pd-media">
         ${buildMainMedia(p.media.main)}
         ${buildSecondaryImages(p.media)}
       </div>`
    : `<div class="pd-media">
         <div class="m-main">
           <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
           <span>Add primary media — screenshot, video embed, or live demo link</span>
         </div>
         <div class="m-grid">
           <div class="m-slot">Secondary image</div>
           <div class="m-slot">Secondary image</div>
         </div>
       </div>`;

  /* Next project — a case study that dead-ends costs you the rest of the
     portfolio. Wraps around so there's always somewhere to go. */
  const idx = PROJECT_SLUGS.indexOf(slug);
  const nextSlug = PROJECT_SLUGS[(idx + 1) % PROJECT_SLUGS.length];
  const next = PROJECTS[nextSlug];
  const nextHTML = (PROJECT_SLUGS.length > 1 && next)
    ? `<div class="pd-next">
         <a class="pd-next-a" href="#/project/${nextSlug}">
           <div>
             <span class="pd-next-lbl">Next project</span>
             <span class="pd-next-title">${next.title}</span>
           </div>
           <span class="arr">↗</span>
         </a>
       </div>`
    : '';

  document.getElementById('page-project').innerHTML = `
    <div class="pd-hero">
      <a href="#" class="pd-back" id="pd-back">← Back to work</a>
      <div class="pd-n">${p.num}</div>
      <h1 class="pd-title">${p.title}</h1>
      ${p.summary ? `<p class="pd-summary">${p.summary}</p>` : ''}
      ${linksHTML}
      <div class="pd-meta">
        <div class="pd-meta-item">
          <span class="pd-meta-lbl">Project</span>
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
        <div class="pd-cs-block">
          <h3>Challenge</h3>
          <p>${p.challenge}</p>
        </div>
        <div class="pd-cs-block">
          <h3>Approach</h3>
          <p>${p.approach}</p>
        </div>
        ${p.decision ? `
        <div class="pd-cs-block pd-cs-block--key">
          <h3>Key decision</h3>
          <p>${p.decision}</p>
        </div>` : ''}
        <div class="pd-cs-block">
          <h3>Result</h3>
          <p>${p.result}</p>
        </div>
      </div>
      <div class="pd-side">
        ${p.resultStat ? `
        <div class="pd-side-s pd-side-stat">
          <div class="pd-side-lbl">Result</div>
          <div class="st-v">${p.resultStat.value}</div>
          <div class="st-l">${p.resultStat.label}</div>
        </div>` : ''}
        <div class="pd-side-s">
          <div class="pd-side-lbl">Technologies</div>
          <div class="pd-side-stack">${p.stack.join(' · ')}</div>
        </div>
        <div class="pd-side-s">
          <div class="pd-side-lbl">Year</div>
          <div class="pd-side-val">${p.year}</div>
        </div>
        <div class="pd-side-s">
          <div class="pd-side-lbl">Role</div>
          <div class="pd-side-val">${p.role}</div>
        </div>
      </div>
    </div>

    ${nextHTML}
  `;

  /* Back button just sets the hash; scroll is restored in route(). */
  document.getElementById('pd-back').addEventListener('click', e => {
    e.preventDefault();
    window.location.hash = '#';
  });

  /* Per-project tab title + meta description (SEO / UX — doesn't affect
     social-preview crawlers, which don't execute JS, but helps the tab,
     browser history entries, and any client-side sitemap tooling). */
  document.title = `${p.title} — ${SITE.name}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', p.cardDesc.replace(/\s+/g, ' ').trim());

  bindHoverTargets();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* Restore the homepage title/description when navigating back, so a
   recruiter who bookmarks or shares from the home view doesn't carry a
   stale project title with them. */
const HOME_TITLE = document.title;
const HOME_DESC  = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

function resetHomeMeta() {
  document.title = HOME_TITLE;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', HOME_DESC);
}


/* ══════════════════════════════════════════
   SITE IDENTITY RENDERING
   SITE itself (name, email, links, program) lives in content.js — this
   just reads it and propagates it to the nav, footer, mobile menu, and
   contact links. (Static HTML keeps the same values as a fallback for
   when JS doesn't run.)
══════════════════════════════════════════ */

function renderSite() {
  const logo = document.getElementById('n-home');
  if (logo) logo.textContent = SITE.name;

  const eyeText = document.querySelector('.h-eye-text');
  if (eyeText) eyeText.textContent = `${SITE.university}, class of ${SITE.gradYear}`;

  const mobFoot = document.querySelector('.mob-foot');
  if (mobFoot) mobFoot.textContent = `${SITE.university} · ${SITE.programShort} · ${SITE.gradYear}`;

  const ftName = document.querySelector('.ft-name');
  if (ftName) ftName.textContent = `${SITE.name} · ${SITE.university}`;

  const ftProgram = document.querySelector('.ft-program');
  if (ftProgram) ftProgram.textContent = `${SITE.programShort} · ${SITE.gradYear}`;

  document.querySelectorAll('a[href$="resume.pdf"]').forEach(a => a.setAttribute('href', SITE.resumePath));
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => a.setAttribute('href', `mailto:${SITE.email}`));
  document.querySelectorAll('a[href*="linkedin.com"]').forEach(a => a.setAttribute('href', SITE.linkedin));
  /* Matched on data-site-link rather than link text, so a project link
     that happens to point at a github.com repo is never rewritten. */
  document.querySelectorAll('a[data-site-link="github"]').forEach(a => a.setAttribute('href', SITE.github));

  /* Contact cells: the handle under each label, derived from SITE so the
     four destinations can't drift out of sync with the hrefs above. */
  const handle = {
    email:    SITE.email,
    resume:   'PDF',
    linkedin: '/' + SITE.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '').replace(/\/$/, ''),
    github:   '@' + SITE.github.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '')
  };
  document.querySelectorAll('.ct-cell').forEach(cell => {
    const v = cell.querySelector('.ct-cell-v');
    const key = cell.dataset.siteLink;
    if (v && handle[key]) v.textContent = handle[key];
  });

  const copyBtn = document.getElementById('ct-copy');
  if (copyBtn) copyBtn.dataset.mail = SITE.email;
}


/* ══════════════════════════════════════════
   COPY EMAIL
   A mailto: link opens whatever the OS thinks the mail client is, which
   for a recruiter on a managed machine is often nothing at all. Copying
   the address is the reliable path, so it's offered alongside.
══════════════════════════════════════════ */

function initCopyEmail() {
  const btn = document.getElementById('ct-copy');
  if (!btn) return;

  const original = btn.textContent;

  btn.addEventListener('click', async () => {
    const mail = btn.dataset.mail;
    try {
      await navigator.clipboard.writeText(mail);
    } catch {
      /* Clipboard API needs a secure context and permission; fall back to
         the old execCommand path so this still works over plain file:// */
      const tmp = document.createElement('textarea');
      tmp.value = mail;
      tmp.setAttribute('readonly', '');
      tmp.style.position = 'absolute';
      tmp.style.left = '-9999px';
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); } catch { /* nothing more to try */ }
      tmp.remove();
    }
    btn.textContent = 'Copied';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1800);
  });
}


/* ══════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════ */

const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
let menuOpen  = false;

function openMobileMenu() {
  menuOpen = true;
  burger.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  burger.setAttribute('aria-label', 'Close menu');
  mobMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  menuOpen = false;
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Open menu');
  mobMenu.classList.remove('open');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => menuOpen ? closeMobileMenu() : openMobileMenu());

/* Escape closes the overlay — expected of any full-screen menu, and the
   only keyboard-reachable way out of it otherwise. */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuOpen) { closeMobileMenu(); burger.focus(); }
});

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

document.querySelectorAll('[data-s]').forEach(el => {
  if (el.classList.contains('mob-link')) return;
  el.addEventListener('click', e => {
    e.preventDefault();
    scrollToSection(el.getAttribute('data-s'));
  });
});

document.getElementById('n-home').addEventListener('click', e => {
  e.preventDefault();
  closeMobileMenu();
  if (getRoute().type !== 'home') window.location.hash = '#';
  else window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ══════════════════════════════════════════
   SCROLL SPY + READING PROGRESS
   On a long single-page portfolio it's easy to lose your place. The nav
   marks the section you're in, and the hairline under the nav shows how
   much document is left — both cheap, both answer "where am I".
══════════════════════════════════════════ */

const navEl      = document.querySelector('.site-nav');
const progressEl = document.getElementById('n-progress');
let spyObserver;

function updateProgress() {
  if (!progressEl) return;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  progressEl.style.width = (pct * 100) + '%';

  /* Nav is transparent over the hero and solidifies once you leave it. */
  navEl?.classList.toggle('scrolled', window.scrollY > 24);
}

function setActiveNav(id) {
  document.querySelectorAll('.n-link[data-s]').forEach(a => {
    a.classList.toggle('active', a.dataset.s === id);
  });
}

function initScrollSpy() {
  if (spyObserver) spyObserver.disconnect();

  const sections = ['about', 'work', 'experience', 'skills', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;

  /* Band across the upper-middle of the viewport: a section counts as
     "current" once its content reaches roughly where the eye is reading,
     rather than the moment its top edge grazes the bottom of the screen. */
  spyObserver = new IntersectionObserver(entries => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActiveNav(visible[0].target.id);
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => spyObserver.observe(s));

  /* Above the first section (i.e. still in the hero) nothing should be
     marked active. */
  window.addEventListener('scroll', () => {
    const first = sections[0];
    if (first && first.getBoundingClientRect().top > window.innerHeight * 0.8) setActiveNav(null);
  }, { passive: true });
}

/* Progress is cheap but runs on every scroll frame, so it's rAF-throttled. */
let progressTicking = false;
window.addEventListener('scroll', () => {
  if (progressTicking) return;
  progressTicking = true;
  requestAnimationFrame(() => { updateProgress(); progressTicking = false; });
}, { passive: true });

window.addEventListener('resize', updateProgress, { passive: true });


/* ══════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════ */

const cur = document.getElementById('cur');
const curPreview = document.getElementById('cur-preview');
const curPreviewImg = curPreview?.querySelector('img');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

/* Skip the rAF loop entirely when the custom cursor isn't in use — it's
   pure wasted work there since #cur is hidden anyway. */
if (useCustomCursor) {
  (function animateCursor() {
    // Higher factor = less trailing lag behind the real cursor. 0.3 felt
    // sluggish on fast movement; this keeps a touch of smoothing without
    // the dot visibly lagging behind.
    cx += (mx - cx) * 0.65;
    cy += (my - cy) * 0.65;
    cur.style.left = cx + 'px';
    cur.style.top  = cy + 'px';
    if (curPreview) {
      curPreview.style.left = (cx + 40) + 'px';
      curPreview.style.top  = (cy - 90) + 'px';
    }
    requestAnimationFrame(animateCursor);
  })();
}

function bindHoverTargets() {
  if (!useCustomCursor) return;
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('h'));
    el.addEventListener('mouseleave', () => cur.classList.remove('h'));
  });
}

/* Project cards get a bigger, labeled cursor state instead of the generic
   circle, plus a floating preview of the project's own screenshot — delegated
   so it keeps working after renderProjectCards() (re)builds the grid, with
   no re-binding required. */
const curLabel = cur.querySelector('.cur-label');
if (useCustomCursor) {
  document.addEventListener('mouseover', e => {
    const card = e.target.closest('.proj-a');
    if (!card) return;
    cur.classList.add('cur-view');
    if (curLabel) curLabel.textContent = 'VIEW';

    const slug = card.getAttribute('href')?.replace('#/project/', '');
    const p = PROJECTS[slug];
    /* Prefer a second image over the card's own thumbnail — showing the
       same picture that's already under the cursor tells you nothing. */
    const src = p?.media?.secondary?.[0] || p?.thumb;
    if (src && curPreviewImg && curPreview) {
      curPreviewImg.src = src;
      curPreview.classList.add('v');
    }
  });
  document.addEventListener('mouseout', e => {
    const leavingCard = e.target.closest('.proj-a');
    const enteringCard = e.relatedTarget?.closest?.('.proj-a');
    if (leavingCard && !enteringCard) {
      cur.classList.remove('cur-view');
      curPreview?.classList.remove('v');
    }
  });
}


/* ══════════════════════════════════════════
   HERO ROLE ROTATOR
══════════════════════════════════════════ */

function initRoleRotator() {
  const el = document.querySelector('.h-role-word');
  const words = CONTENT?.hero?.roles;
  if (!el || !words?.length || prefersReducedMotion) return; // static first word only — no motion

  let i = 0;
  setInterval(() => {
    el.classList.add('out');
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('out');
    }, 350);
  }, 2200);
}


/* ══════════════════════════════════════════
   MAGNETIC BUTTONS
   CTAs pull gently toward the cursor within their own bounds and snap
   back on leave — mouse/hover devices only, skipped for reduced motion.
══════════════════════════════════════════ */

function initMagneticButtons() {
  if (!hasHover || prefersReducedMotion) return;

  const strength = 0.28;
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}


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

renderSite();           // populate identity info (name, email, links) from SITE
renderContent();        // populate all text & cards from CONTENT / PROJECTS
initSplitText();        // wrap the hero name per-glyph for the load reveal
maskLines();            // wrap section titles so they rise from behind their box
bindHoverTargets();     // attach cursor hover to all existing links/buttons
initRoleRotator();      // start the hero's cycling role line
initMagneticButtons();  // enable magnetic pull on CTA buttons
initCopyEmail();        // click-to-copy on the contact address
applyRoute();           // first paint — no transition (nothing to transition from)
initScrollObserver();   // start scroll-reveal animations
initScrollSpy();        // nav highlights the section you're reading
updateProgress();       // set the initial progress width / nav state
