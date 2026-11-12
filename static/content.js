/* ─────────────────────────────────────────
   DANIEL HO — PORTFOLIO
   content.js — ✏️ EDIT EVERYTHING HERE

   This file is the only one you should need to open to update text,
   projects, or contact info. It's loaded before script.js (see the
   <script> order in index.html), which reads these objects and renders
   them — script.js itself has no content in it, only behavior.

   SITE     → name, email, links, resume path (nav, footer, contact)
   CONTENT  → homepage copy (hero, about, experience, currently, skills,
              contact)
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
  email:        'dmho@andrew.cmu.edu',
  university:   'Carnegie Mellon University',
  program:      'Information Systems & Policy Management',
  programShort: 'IS + Policy & Management',
  gradYear:     '2029',
  resumePath:   './static/files/resume.pdf',
  linkedin:     'https://linkedin.com/in/danielmho',
  github:       'https://github.com/danielm-ho',

  // Public address of the live site, with trailing slash. Used for the
  // canonical/share URLs that tools/build-pages.mjs writes into each
  // project page.
  url:          'https://danielm-ho.github.io/portfolio/',

  // Visitor analytics (GoatCounter: free, no cookies, no consent banner).
  // Off while empty. To turn on: sign up at goatcounter.com, pick a code
  // (e.g. 'danielho' for danielho.goatcounter.com), and paste it here.
  // Each project page counts as its own pageview, and clicks on the
  // resume / email / LinkedIn / GitHub links are counted as events.
  goatcounter:  'danielho'
};


/* ══════════════════════════════════════════
   HOMEPAGE CONTENT
══════════════════════════════════════════ */

const CONTENT = {

  // ── HERO ──────────────────────────────────────────────────────────────
  hero: {
    // statement: the one sentence a recruiter should be able to repeat.
    statement: `I find places where a system falls short of its mission and build something
                to close the gap.`,
    desc: `Sophomore at Carnegie Mellon, studying Information Systems and Policy & Management.
           I chose IS after working with Pamoza International in Malawi, where I saw how much
           good accessible tools could do and how limited my technical skills still were.`,

    // map: the drawing of Pittsburgh's 90 neighborhoods beside the statement.
    // `matches` are filled in on the map and listed under it, in this order.
    // Names must match the city's own neighborhood names exactly. These four
    // and their fit scores are read off the LivePGH results screenshot
    // (static/files/livepgh-matches.jpg).
    map: {
      project: 'livepgh',   // the case study the caption links to
      caption: `One run of the LivePGH quiz, drawn on Pittsburgh's 90 neighborhoods.`,
      linkText: 'See how I built LivePGH',
      matches: [
        { hood: 'Squirrel Hill South', fit: '76%' },
        { hood: 'Squirrel Hill North', fit: '75%' },
        { hood: 'Friendship',          fit: '74%' },
        { hood: 'Regent Square',       fit: '73%' }
      ]
    },

    // proof: the figures under the hero. Only numbers with something behind
    // them on this site. `href` is optional: '#music', '#work', or a project slug.
    proof: [
      { value: '4.0', label: 'GPA at Carnegie Mellon' },
      { value: '156', label: 'Neighborhoods and suburbs covered by LivePGH' },
      { value: '1M+', label: 'Instagram views for Ottoman Empire, the student band I founded' }
    ]
  },

  // ── MUSIC ─────────────────────────────────────────────────────────────
  // The full-width band between Selected Work and About. The photo runs
  // edge to edge; "Watch the reel" plays the main video from the project
  // named in `project` (its media.main), so the reel is only set in one place.
  music: {
    title: 'Ottoman Empire',
    lede:  `I founded Ottoman Empire, a student band at Carnegie Mellon. We were one of two
            acts selected for CMU's Rose Ball.`,
    body:  `On my own I arrange, record, mix and master multi-instrument covers. The most
            recent one has 61 tracks. Across both I sing and play guitar, piano, percussion,
            saxophone, viola and oboe.`,
    stat:  { value: '1M+', label: 'Instagram views' },
    image: './static/files/music-2.webp',
    imageAlt: 'Ottoman Empire playing at Rose Ball: six musicians on stage under purple light, with dancers in the foreground',
    project: 'dan_the.musicman',
    reelLabel: 'Watch the reel',
    pageLabel: 'How the covers get made',
    links: [ { label: 'Ottoman Empire on Instagram', url: 'https://instagram.com/ottomanempire502' } ]
  },

  // ── ABOUT ─────────────────────────────────────────────────────────────
  // bio: one string per paragraph — add or remove freely.
  about: {
    bio: [
      `At Pamoza International in Malawi I built a simple Google Drive organization flow, and
       I wished I could have done much more. That work showed me how much good accessible
       tools could do, and how limited my technical skills still were. It is why I chose
       Information Systems.`,
      `This fall I'm taking coursework in data structures, database design, and human-centered
       software, and working as an Undergraduate Research Assistant studying cybercriminal team
       formation through agent-based simulation and game theory. Last summer I was a Product
       Manager Intern at Pittsburgh Tomorrow, where I built LivePGH. My background also spans
       nonprofit media operations, literacy education, and community-focused design projects.`
    ],
    // facts: the compact definition list under the photo. Short labels,
    // short values — this is reference material, not a headline (the
    // headline numbers live in hero.proof).
    facts: [
      { label: 'Based in', value: 'Pittsburgh, PA' },
      { label: 'Studying', value: 'Information Systems + Policy & Management' },
      { label: 'Coursework', value: 'Data Structures · Database Design · Human-Centered Software · Fundamentals of Programming · Reasoning with Data · Statistics & Data Science' },
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
  // current: true  → sets the row's dates in the accent colour, so a recruiter
  //                  can see what you're actively doing without parsing dates.
  // line:          → ONE sentence (two at most): the most concrete fact about
  //                  the role. The full bullets live in the resume PDF.
  // project:       → OPTIONAL. A PROJECTS slug; adds a "Case study" link.
  // url:           → OPTIONAL. Makes the organisation name a link.
  experience: [
    {
      current: true,
      role: 'Undergraduate Research Assistant',
      org:  'CMU, Security Economics Research',
      line: `Analyzing an agent-based simulation modeling cybercriminal team formation
             through game theory.`,
      year: 'June 2026–Present'
    },
    {
      current: true,
      role: 'Scholar',
      org:  'Charpie Leadership Institute, CMU',
      url:  'https://www.cmu.edu/student-affairs/celd/leadership-development/charpie-leadership-institute.html',
      line: `Selected for a two-semester civic leadership cohort with a funded project
             component. Scoping a community project built on Pittsburgh civic data.`,
      year: 'Aug 2026–Present'
    },
    {
      role: 'Product Manager Intern',
      org:  'Pittsburgh Tomorrow',
      line: `Developed LivePGH, an interactive Leaflet-map web app matching Pittsburgh
             residents to neighborhoods that fit their needs.`,
      project: 'livepgh',
      year: 'June–Aug 2026'
    },
    {
      role: 'Freelance Web Developer',
      org:  'Zab Hair Studio',
      line: `Designed and built the studio's site from scratch after a series of client
             interviews.`,
      project: 'zab-hair-studio',
      year: 'June 2026–Present'
    },
    {
      role: 'Project Team Member',
      org:  'Design for America, CMU',
      line: `Devised three interventions (critique cards, a physical art yearbook template,
             and a redesigned mailing system) to boost attendance in MCG Youth's afterschool
             arts programs across four studios.`,
      year: 'Sept 2025–May 2026'
    },
    {
      role: 'Literacy Instructor',
      org:  'AmeriCorps LitCorps',
      line: `Delivered 1:1 enrichment literacy instruction to 20 remedial elementary and
             middle-school students over 6-week periods, driving 13% average educational
             growth via the BookNook platform.`,
      year: 'Summers 2024 & 2025'
    },
    {
      role: 'Founding Managing Director',
      org:  'Firm Foundation Fund',
      line: `Founded and managed the school's first student-run investment fund, overseeing
             $7,500 in assets and generating a 12% trailing-twelve-month return.`,
      year: '2023–2025'
    },
    {
      role: 'Media Operations Intern',
      org:  'Pamoza International',
      line: `Trained 15+ staff members on video software and equipment, and built a simple
             Google Drive organization flow that staff maintain themselves.`,
      year: '2023–2024'
    }
  ],

  // ── CURRENTLY ─────────────────────────────────────────────────────────
  // These change the most often — update freely.
  currently: {
    lead: `Sophomore at CMU, doing security economics research, and scoping a civic data
           project with the Charpie Leadership Institute.`,
    items: [
      'Coursework in Data Structures (Java), Database Design, and Designing Human-Centered Software',
      'Researching agent-based simulations of cybercriminal team formation',
      'Scoping a Charpie Leadership Institute project built on Pittsburgh civic data',
      'Performing with Ottoman Empire and producing independent covers'
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
      items: ['Python', 'JavaScript', 'SQL', 'Java', 'R / RMarkdown', 'HTML & CSS']
    },
    {
      category: 'Tools & Frameworks',
      items: ['Git & GitHub', 'Leaflet.js', 'Figma', 'RStudio', 'Excel', 'Google Workspace', 'Claude Code']
    },
    {
      category: 'Domains',
      items: [
        'EdTech & Civic Tech', 'Database Design', 'Data Analysis',
        'Human-Centered Design', 'Nonprofit Operations', 'Systems & Policy'
      ]
    }
  ],

  // ── CONTACT ───────────────────────────────────────────────────────────
  contact: {
    sub: `Seeking Summer 2027 internships in product, technology consulting, and civic or
          education technology.`
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
  { id: 'academic', label: 'Academic Projects',     note: 'Coursework at Carnegie Mellon.' }
];


/* ══════════════════════════════════════════
   PROJECTS
   Each entry powers both the homepage grid card AND the detail page.

   group               → which PROJECT_GROUPS tier the card sits in
   card                → OPTIONAL. false keeps the project out of the Selected
                         Work grid (it still has its own page). The music page
                         uses this: the homepage shows it as the full-width
                         music band instead (CONTENT.music).
   featured            → OPTIONAL. true gives the project a full-width block
                         at the top of its tier instead of a card: a large
                         framed screenshot (featureImage, falling back to
                         thumb) with the description, the `pull` line and the
                         result figure under it. Meant for one project.
   pull                → OPTIONAL. { label, text }: one short statement set
                         large on the featured block. Only used with featured.
   cardDesc            → short blurb shown on the grid card
   cardTags            → tags on the grid card (keep to 3–4)
   thumb               → image shown at the top of the grid card (optional —
                         projects without one get a generated monogram tile,
                         so a missing thumb never leaves a hole in the grid)
   thumbPos            → OPTIONAL. Cards crop the image to fit; this says
                         which part to keep, e.g. 'left center' or 'top'.
   summary             → ONE sentence, shown directly under the title on the
                         detail page and above the media. Without it a reader
                         hits a video or screenshot before they know what
                         they're looking at.
   challenge/approach/decision/result → the case-study blocks. All four are
                         optional: leave one out and it doesn't render.
   labels              → OPTIONAL. Rename a block's heading for this project,
                         e.g. labels: { challenge: 'The assignment' }. The
                         defaults are Challenge / Approach / Key decision /
                         Result.
   decision            → OPTIONAL, and the highest-signal block on the page:
                         one choice you made and what you gave up to make it.
                         "I chose X over Y because Z." Leave it out entirely
                         and the block simply doesn't render — an empty or
                         vague one is worse than none.
   resultStat          → OPTIONAL. The big pulled-out number. Appears BOTH on
                         the grid card and in the detail-page sidebar. Only
                         for a real outcome; leave it out before reaching for
                         a filler count.
   cardNote            → OPTIONAL. One line at the foot of the card when
                         there is no resultStat, e.g. the decision in brief.
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
     — pass 'gdoc' as a third argument for a taller 4:3 embed (docs/reports),
       or 'square' for a 1:1 video
     — optional fourth argument { poster: './static/files/x.webp', label: 'Play the reel' }
       sets the still image and button text shown before the embed loads
   Image (main slot):             media.main = embedImage('./static/files/img.png', 'Alt text')

   frame:     how screenshots on this page are presented. 'browser' draws a
              plain browser bar above each one (for web pages), 'plain' a
              thin mat (photos, charts, code). Default 'plain'.
   secondary: images shown in a 2-col grid. Each entry is a path, or
              { src, frame } to override the frame for one image; 'phone'
              sets a phone screenshot in a phone-shaped frame.
   captions:  array of captions aligned by index to secondary images
   callouts:  OPTIONAL. Numbered pins on the main image, each explained in a
              list under it: [{ x: 17, y: 66, text: '...' }]. x and y are
              percentages from the image's left and top edges.

   Every image on a project page can be tapped to enlarge.
─────────────────────────────────────────────────────────────────────── */

/* embedYouTube()/embedIframe() build a small descriptor that script.js
   turns into a click-to-load facade at render time — see buildEmbedFacade()
   in script.js. They live here (not script.js) because PROJECTS below
   calls them right at definition time. */
function embedYouTube(videoId, title) {
  return { kind: 'youtube', videoId, title, poster: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` };
}
function embedImage(src, alt) {
  return { kind: 'image', src, alt };
}
function embedIframe(src, title, ratio = '16x9', opts = {}) {
  return { kind: 'iframe', src, title, ratio, poster: opts.poster, label: opts.label };
}

const PROJECTS = {

  /* ────────────────────────────────────────────────────────────────────
     LivePGH

     STATUS (Nov 2026)
     Confirmed by you: the build is finished and handed off, not public yet.
     Still drafted from the Pittsburgh Tomorrow entry in CONTENT.experience
     and not checked by you line by line: challenge, approach, result.

     decision   → states what the product does, taken from the Approach
                  copy and from the note on LivePGH's own landing page (see
                  static/files/livepgh-home.jpg). It is headed "What it
                  won't do" because nothing here says whose call it was or
                  what it cost.
                  TODO(Daniel): if this was your decision, add one sentence
                  on what leaving these out cost you, and delete the
                  labels: { decision: ... } line so the block reads
                  "Key decision".
     links      → no public URL yet. Add { label: 'Live site', url: '...' }
                  the day it launches.
  ──────────────────────────────────────────────────────────────────── */
  'livepgh': {
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
    featured: true,
    featureImage: './static/files/livepgh-matches.jpg',
    featureAlt: 'LivePGH quiz results: a map of Pittsburgh with matched neighborhoods shaded, beside a ranked list of matches with fit scores',
    // The first sentence restates the Approach copy below; the second is the
    // product's own wording from the note on its landing page.
    pull: {
      label: `What LivePGH won't do`,
      text:  `It publishes no neighborhood "safety score" and uses no demographic identity
              to match people. It matches on how you want to live.`
    },
    summary:  `An interactive neighborhood-matching map for Pittsburgh, built at Pittsburgh
               Tomorrow on top of six normalized civic data sources.`,
    challenge: `Choosing where to live in a city you don't already know means reconciling
several incompatible public datasets (cost, walkability, schools, transit) that are
published in different formats, on different schedules, at different geographic granularities.
To sort through this data, prospective residents need an intuitive, interactive tool that can act as a "first step" in their decision-making process.`,
    approach: `I engineered a data pipeline that fetches, normalizes and caches six civic data
sources into a Pittsburgh neighborhood ranking/scoring algorithm, then used these results to build an interactive
Leaflet map, a six-question matching quiz with a scoring algorithm behind it, and a comparison
tool that puts neighborhoods side by side on cost, walkability, schools and transit access.
The front door gives users three ways in: match from the city they live in now, take the fit
quiz, or just browse all 156 places. People arrive at this decision at very different stages,
and forcing everyone through the same funnel loses the ones who only want to look around.
Every price and rent is labeled an <em>informed estimate</em>.`,
    labels:   { decision: `What it won't do` },
    decision: `LivePGH publishes no neighborhood "safety score" and uses no demographic identity
as a matching input. Its own note to users gives the reason: steering people by demographics
"would be discriminatory," so it matches on how you want to live.`,
    // TODO(Daniel): other decisions worth a sentence each, if you want more
    //   than one: why cache rather than fetch live; why six sources and not
    //   more; why a quiz instead of filters; how you picked the scoring weights.
    result: `Over a summer internship I delivered the pipeline, the matching quiz, the
comparison tool and the neighborhood pages: 156 places in all, covering every City of
Pittsburgh neighborhood plus 67 Allegheny County suburbs, each with cost, commute, walkability
and lifestyle detail. The build is finished and handed off. It has not launched publicly yet,
so the screenshots on this page are from the handed-off build.`,
    resultStat: { value: '156', label: 'Neighborhoods & suburbs covered' },
    media: {
      frame: 'browser',
      main: embedImage('./static/files/livepgh-home.jpg',
                       'LivePGH landing page: three ways to start finding a neighborhood'),
      callouts: [
        { x: 17.5, y: 67, text: `Three ways in: match from the city you live in now, take the fit quiz, or browse every neighborhood.` },
        { x: 17.5, y: 95, text: `The note on the numbers: every price and rent is an informed estimate, and there is no neighborhood "safety score" or demographic matching.` }
      ],
      secondary: [
        './static/files/livepgh-matches.jpg',
        './static/files/livepgh-neighborhood.webp',
        './static/files/livepgh-relocate.jpg',
        './static/files/livepgh-browse.jpg'
      ],
      captions: [
        'Quiz results: ranked matches with fit scores, drawn on the Leaflet map',
        'Neighborhood page: cost, commute, transit and terrain, every figure labeled an estimate',
        'Match from where you live now: three curated Pittsburgh neighborhoods and an honest cost comparison',
        'Browse: all 156 city neighborhoods and Allegheny County suburbs, filterable and sortable'
      ]
    },
    links: [] // ← handed off, not public yet; add { label: 'Live site', url: '...' } at launch
  },

  'zab-hair-studio': {
    group:    'applied',
    title:    'Zab Hair Studio',
    sub:      'Freelance Client Website',
    year:     '2026',
    role:     'Freelance Web Developer',
    stack:    ['HTML', 'CSS', 'JavaScript', 'Content Architecture', 'Client Discovery'],
    cardDesc: `Designed and built a small business website from scratch for a local hair
               studio, after interviewing the client to translate brand and business
               preferences into technical requirements.`,
    // cardNote: one line at the foot of the card, in place of a result figure.
    cardNote: `Built around one content.js file, so the owner edits the site himself.`,
    cardTags: ['HTML + CSS', 'JS', 'Freelance'],
    thumb:    './static/files/zab-hero.jpg',
    thumbPos: 'left center',   // which part of the image survives the card's crop
    summary: `A small business website built from scratch for a Newtown Square hair studio,
              designed so the owner can maintain it without touching markup.`,
    challenge: `A Newtown Square hair studio needed a website built from the ground up, with
no existing technical requirements.`,
    approach: `I interviewed the client to turn his brand and business preferences into concrete
technical requirements, then designed and built the site from scratch. That includes video
embeds that render YouTube, Instagram or TikTok from a single pasted link.`,
    /* decision: built from your own sentence (Nov 2026): "I built a custom
       content.js page so he could edit it himself." The second sentence is
       from your Services caption.
       TODO(Daniel): what did this cost you, or what did you choose it over?
       One sentence turns this from a feature into a trade-off. */
    decision: `I built the site around a custom content.js file so the owner could edit it
himself. Every card, price and photo is read from that one file, so he can change an offering
without touching markup.`,
    result: `Delivered a working, maintainable site the client can update independently. I continue
to work with the studio as an ongoing freelance client.`,
    /* Screenshots from the live site (Aug 2026). The phone view is cropped
       to the phone's own width and shown in a phone frame. */
    media: {
      frame: 'browser',
      main: embedImage('./static/files/zab-hero.jpg',
                       `Zab Hair Studio homepage: 'Sharp Every Time' headline, booking call-to-action, and a stat bar reading 7 years cutting and 15,000+ clients`),
      secondary: [
        './static/files/zab-cuts.jpg',
        './static/files/zab-menu.jpg',
        { src: './static/files/zab-mobile-phone.webp', frame: 'phone' },
        './static/files/zab-media.jpg'
      ],
      captions: [
        'The work: a gallery of cuts shot in the shop, captioned by service so a visitor can point at the one they want',
        'Services: every card, price and photo is read from the shared content file, so the shop can change an offering without touching markup',
        'Mobile: where nearly all barbershop traffic actually arrives, with book, call and directions pinned to the bottom of the screen',
        'Media: platform-detecting embeds that render YouTube, Instagram or TikTok from a single pasted link'
      ]
    },
    links: [
      { label: 'View Live Site', url: 'https://danielm-ho.github.io/Zab-Barber/' },
      { label: 'Source on GitHub', url: 'https://github.com/danielm-ho/Zab-Barber' }
    ]
  },

  'monomuse': {
    group:    'academic',
    title:    'MonoMuse',
    sub:      'Museum Website Redesign & Funnel Analysis',
    labels:   { challenge: 'The brief' },
    year:     '2026',
    role:     'Designer & Analyst',
    stack:    ['SQL', 'Funnel Analysis', 'Figma', 'Usability Evaluation', 'Information Architecture'],
    cardDesc: `Redesigned a museum website across home, explore, exhibitions, and ticketing
               pages, then queried visitor session data in SQL to measure how browsing
               behavior relates to reaching checkout.`,
    cardTags: ['SQL', 'UX Design', 'Analytics'],
    thumb: './static/files/monomuse-2.webp',
    summary: `A CMU coursework project pairing a four-page museum website redesign with a SQL
              funnel analysis, a usability memo, and a design summary.`,
    // NOT VERIFIED (Nov 2026): this copy was drafted from the two screenshots
    //   and a one-line description, and you haven't checked it.
    // TODO(Daniel): confirm the course, what the funnel analysis concluded and
    //   what the usability memo recommended, then add decision: (what you
    //   changed and why).
    challenge: `MonoMuse, a fictional contemporary museum of art and technology, needed a
website that moves visitors from learning about the museum to buying tickets.`,
    approach: `I designed four pages (Home, Explore, Exhibitions, and Buy Tickets) with a
consistent navigation bar and a ticket call-to-action on every page. I then wrote SQL queries
joining page-visit and page tables to compare how many pages sessions visited overall against
sessions that reached the ticket overview and checkout pages.`,
    result: `Findings were written up in a usability memo and a design summary alongside the
query results. Sessions that reached checkout visited about the same number of pages as all
sessions (roughly 10), suggesting page count alone doesn't predict conversion.`,
    media: {
      main: embedImage('./static/files/monomuse-2.webp',
                       'MonoMuse wireframes: Home, Explore, Exhibitions, and Buy Tickets pages'),
      secondary: ['./static/files/monomuse-1.webp'],
      captions:  ['SQL funnel query comparing average pages visited across all sessions, sessions reaching the ticket overview, and sessions reaching checkout']
    },
    links: []
  },

  'swe-life': {
    group:    'academic',
    title:    'SWE Life',
    sub:      'CMU 15-112 Final Project',
    labels:   { challenge: 'The project', approach: 'What I built' },
    year:     '2026',
    role:     'Solo Developer',
    stack:    ['Python', 'CMU Graphics Library', 'Game Design', 'Object-Oriented Programming'],
    cardDesc: `A Python minigame collection for CMU 15-112 featuring stat systems, upgrade
               mechanics, a shop, cross-stat debuffs, and minigames including a vertically
               scrolling platformer and projectile physics.`,
    cardTags: ['Python', 'CMU Graphics', 'Game Design'],
    thumb: './static/files/swe-life-2.webp',
    summary: `A 1,300-line Python minigame collection with a progression system, an in-game
              shop and two original minigames, built solo for CMU 15-112.`,
    // TODO(Daniel) decision: what did you cut, or choose the harder path on?
    //   The scrolling platformer and the slingshot physics were both optional;
    //   why build them instead of more minigames? Two or three sentences.
    challenge: `A minigame collection built as the final project for CMU 15-112 (Fundamentals
of Programming and Computer Science). The game follows a Software Engineer attempting to climb
the corporate ladder by improving hygiene, grooming, and room cleanliness stats through a
series of minigames.`,
    approach: `The project grew into a complex, 1300-line system featuring a progression
system, an in-game shop with persistent upgrades, cross-stat debuffs, a slingshot minigame,
and a vertically scrolling platformer. Built entirely in Python with the cmu_graphics library.`,
    result: `This project received a 99/100 grade and is listed in the project gallery on
CMU's Spring '26 15-112 course website.`,
    resultStat: { value: '99/100', label: 'Final grade' },
    media: {
      main: embedYouTube('i-ZC2HGeB9w', 'SWE Life demo'),
      secondary: ['./static/files/swe-life-1.webp', './static/files/swe-life-2.webp'],
      captions:  ['Sample of code', '"THE CLIMB" vertically scrolling platformer minigame']
    },
    links: [
      { label: 'Play Project', url: 'https://academy.cs.cmu.edu/sharing/oldLaceFish369828' },
      { label: 'Listed in the 15-112 Spring 2026 gallery', url: 'https://www.cs.cmu.edu/~112-s26/gallery.html' },
      { label: 'Source on GitHub', url: 'https://github.com/danielm-ho/SWE-Life' }
    ]
  },

  'titanic-classifier': {
    group:    'academic',
    title:    'Titanic Survival Classifier',
    sub:      'Binary Classification Analysis',
    labels:   { challenge: 'The assignment' },
    year:     '2026',
    role:     'Data Analyst',
    stack:    ['R', 'RMarkdown', 'LDA', 'QDA', 'Logistic Regression', 'Classification Trees', 'ggplot2'],
    cardDesc: `Binary classification analysis using LDA, QDA, logistic regression, and
               classification trees. Model comparison presented in a full RMarkdown report.`,
    cardTags: ['R', 'RMarkdown', 'Statistics'],
    thumb: './static/files/titanic-main.webp',
    summary: `A four-way comparison of classification methods on the Titanic dataset, written
              up as a full RMarkdown report for CMU 36-202.`,
    // TODO(Daniel) decision: your own copy says you evaluated on "accuracy,
    //   precision AND interpretability", which is a trade-off. Which model did
    //   you land on, and what did you give up to pick it? The result block
    //   below also says nothing about what you found.
    challenge: `A binary classification analysis on the Titanic dataset for CMU 36-202:
Methods for Statistics and Data Science.`,
    approach: `Applied and compared four classification methods: Linear Discriminant
Analysis (LDA), Quadratic Discriminant Analysis (QDA), logistic regression, and
classification trees. Each was evaluated on accuracy, precision, and interpretability.`,
    result: `Findings were communicated in a full RMarkdown report with clear visualizations
and a structured comparison of model performance across key metrics.`,
    media: {
      main: embedImage('./static/files/titanic-main.webp',
                       'RStudio showing the classification tree fitted to the Titanic data, with splits on gender, passenger class, fare and port of embarkation')
    },
    links: [{ label: 'Full Analysis', url: 'https://drive.google.com/file/d/1Oqy27mSg0_LD5_mos973FJ4k9BlSCbNZ/view?usp=sharing' }]
  },

  'dan_the.musicman': {
    group:    'creative',
    card:     false,   // shown on the homepage as the music band, not a grid card
    title:    'Music Portfolio',
    sub:      'Ottoman Empire and solo covers',
    labels:   { approach: 'What I do', result: 'Reach' },
    year:     '2024 – Present',
    role:     'Producer, Arranger & Performing Musician',
    stack:    ['Arranging', 'Recording', 'Mixing & Mastering', 'Ensemble Performance'],
    cardDesc: `Solo producer and performing musician. 60+-track arrangements recorded, mixed,
               and mastered independently. Founder of Ottoman Empire, selected for CMU's Rose
               Ball; 1M+ Instagram views and 125k+ likes across both projects.`,
    cardTags: ['Production', 'Performance'],
    thumb: './static/files/music-2.webp',
    summary: `Solo covers I arrange, record, mix and master myself, the most recent with 61
              tracks, and a student band I founded that has performed at CMU's Rose Ball.`,
    // TODO(Daniel) decision: optional here, but there is one worth telling.
    //   What did you decide about how the band works?
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
      main: embedIframe('https://drive.google.com/file/d/1Yu2p1ySjo1PeLFIz-QaUUhyA9fAjCsME/preview', 'Music portfolio reel', 'square',
                        { poster: './static/files/music-reel-poster.webp', label: 'Play the reel' }),
      secondary: ['./static/files/music-1.webp', './static/files/music-2.webp'],
      captions:  ['Recording and production setup', 'Ottoman Empire performing at Rose Ball']
    },
    links: [
      { label: 'Ottoman Empire on Instagram', url: 'https://instagram.com/ottomanempire502' },
      { label: 'Selected Music Content',      url: 'https://drive.google.com/drive/folders/12GREpGJfUg_63VZoJOTi0-QHIM-7El9G?usp=sharing' }
    ]
  }

};