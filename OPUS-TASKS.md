# Tasks to hand to another session

Each task below is a prompt you can paste as-is. Paste the **Shared rules** block
first, then one task. Delete this file before merging to `main`.

## Shared rules (paste before any task)

```
You are working on my portfolio site. Repo: github.com/danielm-ho/portfolio.
Work on the branch `fable-overnight` (create a new branch off it if I say so).
Never push to main; I merge myself.

Rules:
- Vanilla HTML/CSS/JS on GitHub Pages. No framework, no libraries. The only build
  step is `node tools/build-pages.mjs`; rerun it after any change to project pages.
- All copy lives in static/content.js. script.js is behavior, style.css is styling.
- Never invent facts, numbers, quotes, decisions or outcomes. If a fact is missing,
  ask me, or leave a `TODO(Daniel)` comment in content.js and move on.
- Any sentence you write yourself, list it for me in chat so I can check it.
- No em-dashes in site copy. Plain, specific sentences: who did what, with what.
- The site uses a light "paper" theme with tokens in :root of style.css. Use the
  tokens; do not hard-code colors.
- Accessibility cannot get worse: keyboard reachable, visible focus, alt text,
  prefers-reduced-motion respected.
- Verify before you commit: serve with `python3 -m http.server`, screenshot the
  affected pages at 1440px and 390px wide, check the console for errors, and tab
  through the page. One commit per task with a clear message.
- Read REVIEW.md on the branch first. It lists what was done, open questions and
  the TODOs.
```

## 1. A photo-led hero, as an alternative to try

```
The homepage hero is a poster: my name set across the full width with a line map
of Pittsburgh behind it (see #hero in index.html, the HERO block in style.css and
renderHeroMap in script.js). I chose the map because I want the site to read as
technical work. Build an alternative on a separate branch so I can compare: one
of my photos running full bleed with my name set across it, in the spirit of
https://lchsu5.github.io/liz/. Candidates already in the repo:
static/files/music-stage-portrait.webp (me on stage under purple light) and
static/files/portrait-blazer.webp (navy blazer, stone archway). I will attach the
full-size originals; do not upscale the ones in the repo. In that version move
the Pittsburgh map and its key to the top of the LivePGH block in Selected Work.
Keep my statement and both buttons legible at 1440px and 390px, tell me where you
cropped, and show me both heroes side by side before I decide. Also tell me
plainly whether a music photo as the first thing a recruiter sees helps or hurts
for product and consulting roles.

Separately: I have three more photos of me playing guitar that are not on the
site. Add the best one or two to the music project page gallery (media.secondary
in content.js). Ask me what event each is from before writing a caption.
```

## 2. Case-study text as tabs

```
Each project page shows Challenge / Approach / Key decision / Result as stacked
blocks (renderProject in script.js, the `block()` helper). Turn them into a tab
set: one row of tabs, one panel visible at a time, the decision tab first when a
project has one. Use real tab semantics (role=tablist/tab/tabpanel, arrow keys),
and show all panels stacked when printing or when JavaScript is off. Then reuse
the same component on the homepage LivePGH block so a visitor can read the
decision without leaving the homepage. Do not change any copy.
```

## 3. Get the homepage under 5,000px on desktop

```
The homepage is about 7,500px tall at 1440px wide. A comparable student site
(https://lchsu5.github.io/liz/) is 3,400px. Propose a cut list to get mine under
5,000px without deleting any fact that is not also in my resume PDF
(static/files/resume.pdf): for example merging About into the hero and Contact,
collapsing Honors into one line, and making Experience single-line rows with the
organization's logo. Show me the list and wait for my OK before changing
anything. Experience logos: only use files I give you.
```

## 4. Finish the decisions (interview me)

```
Open static/content.js and search for `TODO(Daniel)`. For each one, ask me the
question it describes, all in one numbered list, each answerable in a sentence or
two. Also ask, for LivePGH, Zab and SWE Life: "what went wrong or surprised you?"
After I answer, write the decision and result blocks from my answers, keeping my
phrasing where it works, and list every sentence you wrote. Do not write any
decision I did not give you.
```

## 5. LivePGH you can actually use (needs the LivePGH code and permission)

```
I'm attaching the LivePGH source (or giving you access to its repo) and I have
Pittsburgh Tomorrow's permission to show a demo. Build a small, self-contained
version of the six-question quiz that runs inside the browser frame on my
homepage's LivePGH block and returns ranked neighborhoods from a frozen snapshot
of the real scores. Highlight the results on the existing hero map component
(renderHeroMap in script.js, outlines in static/pgh-map.js). No network calls, no
libraries, under 60KB added. If the scoring cannot be reproduced exactly from the
source, stop and tell me rather than approximating.
```

## 6. Study Lab case study with a live page (needs one lab file)

```
Study Lab is a Claude skill I built that produces interactive study pages. It is
not on GitHub right now, so do not call it open-source or link a repo. I'm
attaching one generated lab page that I'm fine publishing. Add a Study Lab entry
to PROJECTS in static/content.js, host the lab under /labs/ in the repo, and show
it on the project page inside the browser frame using the same "Use the live
site here" pattern as Zab (media.live in content.js). Interview me first for the
challenge, the approach, one decision, and what did not work. I have told a
previous session that some labs did not help me study; ask me about that, because
it is the honest part of the story.
```

## 7. Smaller jobs, one prompt each

```
Regenerate the six project link-preview images (static/og/og-*.jpg) in the paper
theme, following the pattern in tools/og-home.html: one HTML template that reads
title, summary and lead image from static/content.js, screenshotted at 1200x630.
```

```
Test the branch in Safari on iOS, Safari on macOS and Firefox. Check the project
card transition falls back cleanly, the reel viewer opens and closes, the hero
map responds to taps, and the live Zab site loads inside its frame. Fix what
breaks and list what you could not test.
```

```
Compare static/files/resume.pdf with the site. List every fact that differs
between them (titles, dates, numbers, Pamoza wording, Ottoman Empire, Study Lab).
Do not edit either; give me the list.
```

```
Add a "Try the live site" button to the Zab card on the homepage that opens the
real site in the existing viewer dialog (openViewer in script.js). The card is a
single link today, so restructure it the way the LivePGH feature block was
restructured (buildFeature in script.js). Then check whether the SWE Life game at
academy.cs.cmu.edu can be embedded the same way; if the site refuses framing,
leave the video and say so.
```
