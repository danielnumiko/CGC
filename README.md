# Cancer Grand Challenges — news hub

A production build of the CGC news hub landing page, implemented from the
Claude Design canvas `CGC News Hub v2.dc.html`.

The page pulls five content types into one continuous scroll — news, press
releases, conferences, Discover magazine and the research library — so every
card carries the same meta pattern: type label, then date, then source or read
time, then taxonomy tags. A reader learns the pattern once rather than
relearning it at every section.

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Running it

Any static server will do:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Reviewing it

The site root is the prototype harness: the page in a device window, with the
breakpoint and theme toolbar from the design canvas.

- **Breakpoint** — 320, 768, 1280 or 1920. Sizes scale down to fit the window
  and the readout shows the scale factor.
- **Theme** — dark or light.

Both choices persist across reloads.

The frame is a real iframe, so the page's own media queries do the work: what
you see at 768 is what a 768px browser gets, not a simulation.

`page.html` is the page on its own, free of any of this — as it would ship.
There's a link to it in the toolbar.

## Structure

```
index.html              device-frame harness for review, not part of the page
page.html               the page itself
preview.html            redirect stub, keeps the old harness URL working
assets/css/tokens.css   design tokens, resolved at four breakpoints
assets/css/styles.css   components
assets/js/main.js       challenge carousel + background cell parallax
assets/img/             photography, logos and the grain tile
assets/fonts/           Bw Gradual — not committed, see below
```

## Design system

Tokens come straight from the Figma breakpoint collection and resolve at
320 / 768 / 1280 / 1920.

| Breakpoint | Margin | Gutter | Content width |
| --- | --- | --- | --- |
| 1920 | 110 | 66 | 1700 |
| 1280 | 80 | 40 | 1120 |
| 768 | 36 | 27 | 696 |
| 320 | 24 | 12 | 272 |

Colour roles:

| Role | Hex |
| --- | --- |
| Tag — research theme or challenge | `#FFE534` |
| Tag — team name | `#FB8D2B` |
| Text and surfaces | `#FFFFFF` |
| Meta text on dark ground | `#F2F2F2` |
| Outlined label fill | black at 30% with a `#777777` hairline |

Mid grey on the dark ground computes to about 4.15:1 and fails AA, so very
light grey is used for meta text throughout. Brand orange with black text is
8.9:1 — that is why orange is the second tag colour, not an aesthetic choice.
Don't substitute it casually.

### Flush card groups

Several card containers overlap by 1px so the group reads as a single block
with a hairline seam. Cards round only their outer corners, radius 10: in a
vertical stack the top card is `10/10/0/0` and the bottom `0/0/10/10`; in a
horizontal row the left card is `10/0/0/10` and the right `0/10/10/0`. The seam
runs vertically below 1280 and horizontally above it.

### Themes

Dark is the default. A light theme ships as an ink/paper flip of the same
tokens — set `data-theme="light"` on `<html>`, or use the toggle in
the harness. Yellow has no contrast on paper, so the accent becomes brand
orange, darkened again where it is used as type.

## Fonts

CGC's display face is **Bw Gradual**, a licensed font. It is deliberately not
committed here — see `assets/fonts/README.md`. The page currently renders in
**Poppins**, the documented stand-in. Nothing should go to the client in a
substitute face without that being flagged.

Body, prose and meta text are Roboto, loaded from Google Fonts.

## Images

The five photographs and both logos are the real assets. `grain.jpg` is still a
placeholder tile — it sits at `--grain-op: 0` by default, so it isn't visible
until the grain is dialled up.

`conference-media.jpg` was supplied as a screenshot of an already-rendered card,
with an "Event" pill and white rounded corners in the pixels. It is cropped to
801 × 336 to remove both — the card supplies its own radius and its own SOLD OUT
badge, and the media frame covers, so the aspect doesn't need to match. A clean
817 × 418 export would restore the foreground the crop costs.

Design dimensions, for replacements:

| File | Size |
| --- | --- |
| `news-featured.jpg` | 729 × 409 |
| `discover-1.jpg` | 763 × 428 |
| `discover-2.jpg` | 763 × 428 |
| `discover-hero.jpg` | 850 × 576 |
| `conference-media.jpg` | 817 × 418 |

The news teaser image ratio is a fixed 16:9 everywhere except 768, where the
component switches to a side-by-side layout and the image fills the card height
instead. That is intentional.

Grain sits at `--grain-op: 0` by default, matching the design. Raise it in
`tokens.css` to dial the texture up — and swap in a real grain tile first.

## Content

All copy, dates and tags are the design's own placeholder content. There is no
CMS behind the page and the newsletter form has no endpoint wired up.
