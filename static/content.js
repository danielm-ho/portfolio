/* ─────────────────────────────────────────
   DANIEL HO — PORTFOLIO
   content.js — ✏️ EDIT EVERYTHING HERE

   This file is the only one you should need to open to update text,
   projects, or contact info. It's loaded before script.js (see the
   <script> order in index.html), which reads these objects and renders
   them — script.js itself has no content in it, only behavior.

   SITE     → name, email, links, resume path (nav, footer, contact)
   CONTENT  → homepage copy (hero, about, experience, currently, skills,
              contact) — hero.roles is the line that rotates under your name
   PROJECTS → project detail pages + the grid cards
───────────────────────────────────────── */


/* ══════════════════════════════════════════
   SITE IDENTITY
   Single source of truth for name, contact info, and program details —
   update here and it propagates to nav, footer, mobile menu, and contact
   links automatically. (Static HTML keeps the same values as a fallback
   for when JS doesn't run.)
══════════════════════════════════════════ */

const SITE = {
  name:         'Daniel Ho',
  email:        'danmicah12@gmail.com',
  university:   'Carnegie Mellon University',
  program:      'Information Systems & Policy Management',
  programShort: 'IS + Policy & Management',
  gradYear:     '2029',
  resumePath:   './static/files/resume.pdf',
  linkedin:     'https://linkedin.com/in/danielmho',
  github:       'https://github.com/danielm-ho'
};


/* ══════════════════════════════════════════
   HOMEPAGE CONTENT
══════════════════════════════════════════ */

const CONTENT = {

  // ── HERO ──────────────────────────────────────────────────────────────
  hero: {
    desc: `Information Systems & Policy Management student exploring how technology
           shapes organizations, education, and everyday communities.`,
    // roles: cycles under your name, in order, on a loop. Edit/add/remove
    // freely — the first one here is also what shows before JS loads.
    roles: ['Builder.', 'Musician.', 'Systems thinker.', 'Educator.'],

    // proof: the four-up number strip pinned to the bottom of the hero.
    // These are the facts a recruiter needs in the first five seconds, so
    // they sit above the fold instead of being buried in About.
    proof: [
      { value: '4.0',   label: 'GPA at Carnegie Mellon' },
      { value: '1M+', label: 'Views on music socials' },
      { value: 'IS',    label: 'Double Major', suffix: ' + P&M' },
      { value: '2029',  label: 'Expected graduation' }
    ]
  },

  // ── ABOUT ─────────────────────────────────────────────────────────────
  // bio: one string per paragraph — add or remove freely.
  about: {
    bio: [
      `I'm a rising sophomore at Carnegie Mellon University studying Information Systems
       and Policy & Management with the intention to learn not only about how technology
       works, but also about how it can be effectively adopted and used by mission-driven organizations.`,
      `I'm currently a Product Manager Intern at Pittsburgh Tomorrow, building LivePGH, and
       an Undergraduate Research Assistant studying cybercriminal team formation through
       agent-based simulation and game theory. My background also spans nonprofit database
       work, literacy education, and community-focused design projects — I'm especially
       interested in building tools and systems that help related organizations better achieve their mission.`,
      `Outside of academics, I produce music and co-founded Ottoman Empire, a student band
       that has performed at campus events and accumulated over 1 million views and 125k likes
       on Instagram.`
    ],
    // facts: the compact definition list under the photo. Short labels,
    // short values — this is reference material, not a headline (the
    // headline numbers live in hero.proof).
    facts: [
      { label: 'Based in', value: 'Pittsburgh, PA' },
      { label: 'Studying', value: 'Information Systems + Policy & Management' },
      { label: 'Focus',    value: 'EdTech · Civic Tech · Product' }
    ],

    // interests: moved out of the Toolkit section so the skills grid reads
    // as a clean technical inventory. These live here, next to the bio,
    // where personality belongs.
    interests: ['Music production & arrangement', 'Tennis & pickleball', 'Fantasy football', 'Creative writing']
  },

  // ── HONORS & AWARDS ───────────────────────────────────────────────────
  // Folded into the About section (compact list next to stats) rather
  // than a standalone section. Order here = order on page (most recent first).
  honors: [
    { name: 'Chadd S.J. Ciccarelli Student Award', year: 'June 2026' },
    { name: 'Charpie Leadership Institute Scholar', year: 'April 2026' },
    { name: 'National Merit Finalist', year: 'April 2025' },
    { name: 'Presidential Service Award (Gold)', year: 'April 2023 & 2024' }
  ],

  // ── EXPERIENCE ────────────────────────────────────────────────────────
  // To add a role: copy one object, fill in the fields, paste it in.
  // Order here = order on page.
  //
  // current: true  → adds a pulsing "Now" marker to the row, so a recruiter
  //                  can see what you're actively doing without parsing dates.
  // tags:          → 2–4 short keywords per role. These are what a skim
  //                  actually catches; the paragraph is for the second pass.
  experience: [
    {
      current: true,
      tags: ['Product', 'Data Pipelines', 'Leaflet.js'],
      role: 'Product Manager Intern',
      org:  'Pittsburgh Tomorrow',
      desc: `Developing LivePGH, an interactive Leaflet-map web app matching Pittsburgh
             residents to neighborhoods that fit their needs. Engineering a data pipeline
             that fetches, normalizes, and caches six civic data sources, and building a
             six-question matching quiz and scoring algorithm alongside a tool for comparing
             neighborhoods on cost, walkability, schools, and transit access.`,
      year: 'June–Aug 2026'
    },
    {
      current: true,
      tags: ['Python', 'Game Theory', 'Simulation'],
      role: 'Undergraduate Research Assistant',
      org:  'CMU — Security Economics Research',
      desc: `Analyzing an agent-based simulation modeling cybercriminal team formation
             through game theory. Revamping core utility functions to improve pipeline
             reliability and reduce technical debt across the simulation codebase.`,
      year: 'June 2026–Present'
    },
    {
      tags: ['EdTech', 'Data-Informed Instruction', '+13% growth'],
      role: 'Literacy Instructor',
      org:  'AmeriCorps LitCorps',
      desc: `Delivered 1:1 enrichment literacy instruction to 20 remedial elementary and
             middle-school students over 6-week periods, driving 13% average educational
             growth via the BookNook platform. Differentiated instruction across diverse
             reading levels using real-time BookNook data to pilot and modify strategies.`,
      year: '2024–2025'
    },
    {
      tags: ['Founded', '$7.5K AUM', '+12% TTM'],
      role: 'Founding Managing Director',
      org:  'Firm Foundation Fund',
      desc: `Founded and managed the school's first student-run investment fund overseeing
             $7,500 in assets, directing equity research, portfolio decisions, and analyst
             operations across a team of student members. Generated a 12% trailing-twelve-month
             return.`,
      year: '2023–2025'
    },
    {
      tags: ['Training', 'Workflow Design', '15+ staff'],
      role: 'Media Operations Intern',
      org:  'Pamoza International',
      desc: `Trained 15+ staff members on video software and equipment, enabling
             independent in-house content production. Built a centralized media workflow
             designed for staff-led maintenance, removing dependence on continued outside
             support.`,
      year: '2023–2024'
    },
    {
      tags: ['Human-Centered Design', 'User Research', 'Usability Testing'],
      role: 'Project Team Member',
      org:  'Design for America — CMU',
      desc: `Devised three interventions — critique cards, a physical art yearbook template,
             and a redesigned mailing system — to boost attendance in MCG Youth's afterschool
             arts programs across four studios. Informed design decisions through expert
             interviews, student surveys, and think-aloud usability testing.`,
      year: '2025–2026'
    }
  ],

  // ── CURRENTLY ─────────────────────────────────────────────────────────
  // These change the most often — update freely.
  currently: {
    lead: `Building LivePGH at Pittsburgh Tomorrow, researching cybercriminal team formation
           at CMU, and taking on freelance web development for local clients.`,
    items: [
      'Developing LivePGH, an interactive neighborhood-matching map for Pittsburgh residents',
      'Analyzing agent-based simulations of cybercriminal team formation through game theory',
      'Designing and building client websites as a freelance web developer',
      'Producing and arranging independent music covers'
    ]
  },

  // ── SKILLS ────────────────────────────────────────────────────────────
  // Technical inventory only — hobbies now live in about.interests so this
  // section reads as a clean keyword block for recruiters (and for the
  // keyword scanners many of them run first).
  // To add a category: add an object. To add a skill: add a string to items.
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'JavaScript', 'R / RMarkdown', 'SQL', 'HTML & CSS']
    },
    {
      category: 'Tools & Frameworks',
      items: ['Git & GitHub', 'GitHub Pages', 'RStudio', 'Figma', 'Google Workspace']
    },
    {
      category: 'Domains',
      items: [
        'EdTech & Civic Tech', 'Nonprofit Operations',
        'Data Analysis', 'Systems & Policy', 'Human-Centered Design'
      ]
    }
  ],

  // ── CONTACT ───────────────────────────────────────────────────────────
  contact: {
    sub: `Seeking summer internships in edtech, civic tech, and education nonprofits
          near Philadelphia and Pittsburgh.`
  }

};


/* ══════════════════════════════════════════
   PROJECT GROUPS
   Selected Work is split into labelled tiers rather than one flat grid.

   The four original projects were two pieces of CMU coursework, one
   freelance client site and a music reel, all shown as identical tiles.
   A uniform grid implies "these are comparable", which quietly drags the
   paid client work down to assignment level and invites a reader to judge
   the whole set by whichever item is weakest. Labelling the tiers fixes
   that in both directions: coursework presented as coursework is entirely
   normal for a sophomore, and the applied work gets to stand on its own.

   Order here = order on the page. A group with exactly one project renders
   that card full-width in a horizontal layout, so a lone tile never sits
   next to an empty half-row.
══════════════════════════════════════════ */

const PROJECT_GROUPS = [
  { id: 'applied',  label: 'Applied & Client Work', note: 'Built for real users and paying clients.' },
  { id: 'academic', label: 'Academic Projects',     note: 'Coursework at Carnegie Mellon.' },
  { id: 'creative', label: 'Creative Practice',     note: '' }
];


/* ══════════════════════════════════════════
   PROJECTS
   Each entry powers both the homepage grid card AND the detail page.

   group               → which PROJECT_GROUPS tier the card sits in
   cardDesc            → short blurb shown on the grid card
   cardTags            → tags on the grid card (keep to 3–4)
   thumb               → image shown at the top of the grid card (optional —
                         projects without one get a generated monogram tile,
                         so a missing thumb never leaves a hole in the grid)
   summary             → ONE sentence, shown directly under the title on the
                         detail page and above the media. Without it a reader
                         hits a video or screenshot before they know what
                         they're looking at.
   challenge/approach/decision/result → the case-study blocks.
   decision            → OPTIONAL, and the highest-signal block on the page:
                         one choice you made and what you gave up to make it.
                         "I chose X over Y because Z." Leave it out entirely
                         and the block simply doesn't render — an empty or
                         vague one is worse than none.
   resultStat          → the big pulled-out number. Appears BOTH on the grid
                         card and in the detail-page sidebar, so the headline
                         outcome is visible before the click.
   stack               → full tech list on the detail page sidebar
   links               → surfaced in the detail-page hero, not buried in the
                         sidebar. Recruiters click through; a shipped thing
                         with no link to it is a claim rather than evidence.

   To add a project:
   1. Add an entry here (copy an existing one as a template)
   2. Give it a `group`
   3. That's it — the grid card is generated automatically

   ── MEDIA GUIDE ──────────────────────────────────────────────────────
   YouTube video (main slot):     media.main = embedYouTube('VIDEO_ID', 'Title')
   Google Drive/Docs (main slot): media.main = embedIframe('https://...', 'Title')
     — pass 'gdoc' as a third argument for a taller 4:3 embed (docs/reports)
   Image (main slot):
     media.main = `<img src="./static/files/img.png"
                      style="width:100%;border-radius:6px;border:1px solid var(--b2)" alt="...">`

   secondary: array of image paths shown in a 2-col grid below main
   captions:  array of captions aligned by index to secondary images
─────────────────────────────────────────────────────────────────────── */

/* embedYouTube()/embedIframe() build a small descriptor that script.js
   turns into a click-to-load facade at render time — see buildEmbedFacade()
   in script.js. They live here (not script.js) because PROJECTS below
   calls them right at definition time. */
function embedYouTube(videoId, title) {
  return { kind: 'youtube', videoId, title, poster: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` };
}
function embedIframe(src, title, ratio = '16x9') {
  return { kind: 'iframe', src, title, ratio };
}

const PROJECTS = {

  /* ────────────────────────────────────────────────────────────────────
     LivePGH

     ⚠️  DRAFTED FROM YOUR EXPERIENCE COPY — READ BEFORE PUBLISHING.
     Everything below is rephrased from the Pittsburgh Tomorrow entry in
     CONTENT.experience. Nothing here is invented, but nothing here has
     been checked by you either.

     Screenshots are in from the local build (Aug 2026) — thumb + five
     images below. Two things are still open:

       links      → the build is local-only, so there's no URL yet. Add
                    { label: 'Live site', url: '...' } the day it ships.
       decision   → the trade-off block. See the note on it below.
  ──────────────────────────────────────────────────────────────────── */
  'livepgh': {
    num:      '01',
    group:    'applied',
    title:    'LivePGH',
    sub:      'Neighborhood Matching for Pittsburgh Residents',
    year:     '2026',
    role:     'Product Manager Intern, Pittsburgh Tomorrow',
    stack:    ['JavaScript', 'Leaflet.js', 'Data Pipeline Design', 'Civic Data', 'Product Management'],
    cardDesc: `An interactive map that matches Pittsburgh residents to neighborhoods that fit
               their needs, built on a pipeline that fetches, normalizes and caches six civic
               data sources.`,
    cardTags: ['Leaflet.js', 'Data Pipeline', 'Product'],
    thumb:    './static/files/livepgh-matches.jpg',
    summary:  `An interactive neighborhood-matching map for Pittsburgh, built at Pittsburgh
               Tomorrow on top of six normalized civic data sources.`,
    challenge: `Choosing where to live in a city you don't already know means reconciling
several incompatible public datasets — cost, walkability, schools, transit — that are
published in different formats, on different schedules, at different geographic granularities.
To sort through this data, prospective residents need an intuitive, interactive tool that can act as a "first step" in their decision-making process.`,
    approach: `I engineered a data pipeline that fetches, normalizes and caches six civic data
sources into a Pittsburgh neighborhood ranking/scoring algorithm, then used these results to build an interactive
Leaflet map, a six-question matching quiz with a scoring algorithm behind it, and a comparison
tool that puts neighborhoods side by side on cost, walkability, schools and transit access.
The front door gives users three ways in — match from the city they live in now, take the fit
quiz, or just browse all 156 places — because people arrive at this decision at very different
stages, and forcing everyone through the same funnel loses the ones who only want to look around.
Every price and rent is labeled an <em>informed estimate</em>, and the product publishes no
neighborhood "safety score" and uses no demographic identity as a matching input.`,
    // decision: ← THE MOST VALUABLE BLOCK ON THIS PAGE, and I can't write it
    //   for you. One choice, and what you gave up for it. Candidates from
    //   this project: why cache rather than fetch live; why six sources and
    //   not more; why a quiz instead of filters; how you picked the scoring
    //   weights. Two or three sentences. Uncomment and fill in.
    result: `Over a summer internship I delivered the pipeline, the matching quiz, the
comparison tool and the neighborhood pages — 156 places in all, covering every City of
Pittsburgh neighborhood plus 67 Allegheny County suburbs, each with cost, commute, walkability
and lifestyle detail. The build is running locally and in review ahead of launch; screenshots
below are from the current build.`,
    resultStat: { value: '156', label: 'Neighborhoods & suburbs covered' },
    media: {
      main: `<img src="./static/files/livepgh-home.jpg"
               style="width:100%;border-radius:6px;border:1px solid var(--b2)"
               alt="LivePGH landing page: three ways to start finding a neighborhood">`,
      secondary: [
        './static/files/livepgh-matches.jpg',
        './static/files/livepgh-neighborhood.png',
        './static/files/livepgh-relocate.jpg',
        './static/files/livepgh-browse.jpg'
      ],
      captions: [
        'Quiz results — ranked matches with fit scores, drawn on the Leaflet map',
        'Neighborhood page — cost, commute, transit and terrain, every figure labeled an estimate',
        'Match from where you live now — three curated Pittsburgh neighborhoods and an honest cost comparison',
        'Browse — all 156 city neighborhoods and Allegheny County suburbs, filterable and sortable'
      ]
    },
    links: [] // ← local build only for now; add { label: 'Live site', url: '...' } at launch
  },

  'zab-hair-studio': {
    num:      '02',
    group:    'applied',
    title:    'Zab Hair Studio',
    sub:      'Freelance Client Website',
    year:     '2026',
    role:     'Freelance Web Developer',
    stack:    ['HTML', 'CSS', 'JavaScript', 'Content Architecture', 'Client Discovery'],
    cardDesc: `Designed and built a small business website from scratch for a local hair
               studio, including a centralized content architecture and platform-detecting
               video embeds, after interviewing the client to translate brand and business
               preferences into technical requirements.`,
    cardTags: ['HTML + CSS', 'JS', 'Freelance'],
    thumb:    './static/files/zab-hero.jpg',
    summary: `A small business website built from scratch for a Newtown Square hair studio,
              designed so the owner can maintain it without touching markup.`,
    challenge: `A Newtown Square hair studio needed a website built from the ground up, with
no existing technical requirements.`,
    approach: `I Interviewed the client to translate those preferences into concrete technical
requirements, then designed and built the site from scratch, including a centralized content
architecture (so future edits don't require touching markup) and platform-detecting video
embeds.`,
    /* ⚠️  DRAFTED, NOT VERIFIED. This is my reading of the reasoning already
       implied by your own copy ("so future edits don't require touching
       markup", "the client can update independently"). Check that it's
       actually how you thought about it, and rewrite freely. */
//     decision: `Rather than hard-coding copy into the markup, I separated all editable content
// into a single file the owner could open on her own. That cost more time up front and added a
// layer of indirection to the codebase, but it meant routine changes — prices, hours, a new
// photo — never require a developer.`,
    result: `Delivered a working, maintainable site the client can update independently, and
continue to maintain the engagement as an ongoing freelance client.`,
    resultStat: { value: 'Live', label: 'Shipped & maintained' },
    /* Screenshots from the live site (Aug 2026).
       Note on the secondary grid: .m-figure img is locked to 16/9 with
       object-fit:cover, so any shot that isn't already 16:9 gets
       center-cropped. These four are pre-letterboxed to 16:9 on the page's
       own background colour, which is why the phone view and the services
       page read whole instead of losing their headers. Letterbox anything
       you add here the same way. */
    media: {
      main: `<img src="./static/files/zab-hero.jpg"
               style="width:100%;border-radius:6px;border:1px solid var(--b2)"
               alt="Zab Hair Studio homepage: 'Sharp Every Time' headline, booking call-to-action, and a stat bar reading 7 years cutting and 15,000+ clients">`,
      secondary: [
        './static/files/zab-cuts.jpg',
        './static/files/zab-menu.jpg',
        './static/files/zab-mobile.jpg',
        './static/files/zab-media.jpg'
      ],
      captions: [
        'The work — a gallery of cuts shot in the shop, captioned by service so a visitor can point at the one they want',
        'Services — every card, price and photo is read from the shared content file, so the shop can change an offering without touching markup',
        'Mobile — where nearly all barbershop traffic actually arrives, with book, call and directions pinned to the bottom of the screen',
        'Media — platform-detecting embeds that render YouTube, Instagram or TikTok from a single pasted link'
      ]
    },
    links: [ { label: 'View Live Site', url: 'https://danielm-ho.github.io/Zab-Barber/' } ]
  },

  'swe-life': {
    num:      '03',
    group:    'academic',
    title:    'SWE Life',
    sub:      'CMU 15-112 Final Project',
    year:     '2026',
    role:     'Solo Developer',
    stack:    ['Python', 'CMU Graphics Library', 'Game Design', 'Object-Oriented Programming'],
    cardDesc: `A Python minigame collection for CMU 15-112 featuring stat systems, upgrade
               mechanics, a shop, cross-stat debuffs, and minigames including a vertically
               scrolling platformer and projectile physics.`,
    cardTags: ['Python', 'CMU Graphics', 'Game Design'],
    thumb: './static/files/swe-life-2.png',
    summary: `A 1,300-line Python minigame collection with a progression system, an in-game
              shop and two original minigames, built solo for CMU 15-112.`,
    // decision: ← what did you cut, or choose the harder path on? The
    //   scrolling platformer and the slingshot physics were both optional;
    //   why build them instead of more minigames? Two or three sentences.
    challenge: `A minigame collection built as the final project for CMU 15-112 (Fundamentals
of Programming and Computer Science). The game follows a Software Engineer attempting to climb
the corporate ladder by improving hygiene, grooming, and room cleanliness stats through a
series of minigames.`,
    approach: `The project grew into a complex, 1300-line system featuring a progression
system, an in-game shop with persistent upgrades, cross-stat debuffs, a slingshot minigame,
and a vertically scrolling platformer. Built entirely in Python with the cmu_graphics library.`,
    result: `This project received a 99/100 grade and a feature on CMU's Spring '26 15-112
course website.`,
    resultStat: { value: '99/100', label: 'Final grade' },
    media: {
      main: embedYouTube('i-ZC2HGeB9w', 'SWE Life demo'),
      secondary: ['./static/files/swe-life-1.png', './static/files/swe-life-2.png'],
      captions:  ['Sample of code', '"THE CLIMB" vertically scrolling platformer minigame']
    },
    links: [{ label: 'Play Project', url: 'https://academy.cs.cmu.edu/sharing/oldLaceFish369828' }]
  },

  'titanic-classifier': {
    num:      '04',
    group:    'academic',
    title:    'Titanic Survival Classifier',
    sub:      'Binary Classification Analysis',
    year:     '2026',
    role:     'Data Analyst',
    stack:    ['R', 'RMarkdown', 'LDA', 'QDA', 'Logistic Regression', 'Classification Trees', 'ggplot2'],
    cardDesc: `Binary classification analysis using LDA, QDA, logistic regression, and
               classification trees. Model comparison presented in a full RMarkdown report.`,
    cardTags: ['R', 'RMarkdown', 'Statistics'],
    thumb: './static/files/titanic-main.png',
    summary: `A four-way comparison of classification methods on the Titanic dataset, written
              up as a full RMarkdown report for CMU 36-202.`,
    // decision: ← your own copy says you evaluated on "accuracy, precision
    //   AND interpretability", which is a trade-off hiding in plain sight.
    //   Which model did you land on, and what did you give up to pick it?
    //   That one paragraph turns a common assignment into a judgement call.
    challenge: `A binary classification analysis on the Titanic dataset for CMU 36-202:
Methods for Statistics and Data Science.`,
    approach: `Applied and compared four classification methods — Linear Discriminant
Analysis (LDA), Quadratic Discriminant Analysis (QDA), logistic regression, and
classification trees, evaluating each on accuracy, precision, and interpretability.`,
    result: `Findings were communicated in a full RMarkdown report with clear visualizations
and a structured comparison of model performance across key metrics.`,
    resultStat: { value: '4', label: 'Methods compared' },
    media: {
      main: `<img src="./static/files/titanic-main.png"
               style="width:100%;border-radius:6px;border:1px solid var(--b2)"
               alt="Titanic classifier results">`
    },
    links: [{ label: 'Full Analysis', url: 'https://drive.google.com/file/d/1Oqy27mSg0_LD5_mos973FJ4k9BlSCbNZ/view?usp=sharing' }]
  },

  'dan_the.musicman': {
    num:      '05',
    group:    'creative',
    title:    'Music Portfolio',
    sub:      'Production, Performance & Audience Growth',
    year:     '2024 – Present',
    role:     'Producer, Arranger & Performing Musician',
    stack:    ['Audio Production', 'Mixing & Mastering', 'Content Strategy', 'Ensemble Performance', 'Project Management'],
    cardDesc: `Solo producer and performing musician. 60+-track arrangements recorded, mixed,
               and mastered independently. Founder of Ottoman Empire, selected for CMU's Rose
               Ball; 1M+ Instagram views and 125k+ likes across both projects.`,
    cardTags: ['Production', 'Performance', 'Project Management'],
    thumb: './static/files/music-2.png',
    summary: `Solo production and live performance — 60+ self-recorded arrangements, and a
              student band I founded that has performed at CMU's Rose Ball.`,
    // decision: ← optional here, but there is one worth telling: founding and
    //   running a band is a coordination problem, not a musical one. What did
    //   you decide about how the group works?
    challenge: `A body of work spanning solo production and live performance, built around
iteration, technical execution, and creative direction under real constraints.`,
    approach: `I founded Ottoman Empire, a student band at CMU that has performed at multiple
campus events, including CMU's Rose Ball as one of two selected acts. I coordinate rehearsals,
arrangements, and live execution across the group. Separately, I arrange, record, mix, and
master multi-instrument music covers independently. My most recent cover comprised 61
individual tracks. Across these projects, I have sung and played guitar, piano, percussion,
saxophone, viola, and oboe.`,
    result: `The band's content has accumulated over 1,000,000 Instagram views and 125,000
likes.`,
    resultStat: { value: '1M+', label: 'Instagram views' },
    media: {
      main: embedIframe('https://drive.google.com/file/d/1Yu2p1ySjo1PeLFIz-QaUUhyA9fAjCsME/preview', 'Music portfolio reel'),
      secondary: ['./static/files/music-1.png', './static/files/music-2.png'],
      captions:  ['Recording and production setup', 'Ottoman Empire performing at Rose Ball']
    },
    links: [
      { label: 'Ottoman Empire on Instagram', url: 'https://instagram.com/ottomanempire502' },
      { label: 'Selected Music Content',      url: 'https://drive.google.com/drive/folders/12GREpGJfUg_63VZoJOTi0-QHIM-7El9G?usp=sharing' }
    ]
  }

};
