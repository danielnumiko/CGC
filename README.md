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

## Structure

```
index.html              the page
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
tokens — set `data-theme="light"` on `<html>`. Yellow has no contrast on paper,
so the accent becomes brand orange, darkened again where it is used as type.

## Fonts

CGC's display face is **Bw Gradual**, a licensed font. It is deliberately not
committed here — see `assets/fonts/README.md`. The page currently renders in
**Poppins**, the documented stand-in. Nothing should go to the client in a
substitute face without that being flagged.

Body, prose and meta text are Roboto, loaded from Google Fonts.

## Images

`assets/img/` currently holds placeholder tiles at the correct dimensions for
five of the photographs. They are flat dark gradients, not photography, and
need replacing with the real exports at the same filenames and sizes:

| File | Size |
| --- | --- |
| `news-featured.jpg` | 729 × 409 |
| `discover-1.jpg` | 763 × 428 |
| `discover-2.jpg` | 763 × 428 |
| `discover-hero.jpg` | 850 × 576 |
| `conference-media.jpg` | 817 × 418 |
| `grain.jpg` | tiling grain texture |

The news teaser image ratio is a fixed 16:9 everywhere except 768, where the
component switches to a side-by-side layout and the image fills the card height
instead. That is intentional.

Both logos (`cgc-logo.png`, `cruk-logo.png`) are the real assets.

Grain sits at `--grain-op: 0` by default, matching the design. Raise it in
`tokens.css` to dial the texture up.

## Content

All copy, dates and tags are the design's own placeholder content. There is no
CMS behind the page and the newsletter form has no endpoint wired up.
