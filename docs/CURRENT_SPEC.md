# Current approved scope and decisions

This document supersedes conflicting portions of the historical original build brief. Scope is still only the two-page Poseidon prototype, not the full encyclopedia.

## Selected artwork

- Left: user-supplied `1000075663.jpg`, 1067 × 1280, accepted by the user. Retained byte-for-byte as `assets/poseidon-left-source.jpg`.
- Right: latest edited trial `exec-71732726-f05e-42f5-8ddf-5c1eaa055184.png`, 1145 × 1374, with Poseidon/Amphitrite above Family, taller Family and Did You Know panels, and lowered full-width Stories. Retained byte-for-byte as `assets/poseidon-right-source.png`.
- `assets/poseidon-left.svg` and `poseidon-right.svg` are identical **1067 × 1280** canvases embedding those image bytes. `preserveAspectRatio="xMidYMid meet"` preserves each artwork completely. The tiny right-image ratio difference is accommodated by less than one source-canvas pixel of horizontal ivory/transparent padding, without resampling, cropping, stretching or regenerating the artwork.
- All actual titles, headings, body copy and statuses are HTML overlays. No additional art generation was performed during integration.

## Exact left-page copy

### Title scroll

POSEIDON

God of the Sea

Say it: puh-SY-dun

### Who is Poseidon?

Poseidon is one of the mightiest Greek gods! He rules the seas and oceans with his powerful golden trident.

When he's happy, the sea is calm and peaceful. But when he's angry, watch out! He can create enormous waves, wild storms and even earthquakes.

He lives in a magnificent underwater palace surrounded by amazing sea creatures.

### Facts

| Heading | Copy |
|---|---|
| Powers | Seas, storms and earthquakes |
| Symbol | His mighty trident |
| Home | A palace beneath the sea |
| Sacred Animal | The horse |

## Exact right-page copy

### Special Powers

- Creates giant waves
- Summons powerful storms
- Causes earthquakes

### Family

- Brothers: Zeus and Hades
- Wife: Amphitrite
- Son: Polyphemus, a one-eyed Cyclops

### Did You Know?

The ancient Greeks believed Poseidon created the very first horse!

### Explore His Stories

- Odysseus and the Cyclops — Coming soon
- Poseidon and Athena — Coming soon
- The Adventures of Odysseus — Coming soon

No Personality section, Trident section, fifth panel or invented story destinations. Status labels use the full body font size.

## Typography and geometry

`pages.js` is the editable source of exact wording and percentage rectangles. Coordinates on the right are mapped through the non-cropping canvas transform, not guessed from the left image.

Body size is `clamp(18px, 3.2cqw, 20px)` at 100% test scale. Font stack: Georgia, Times New Roman, serif. Headings are 1.15 times body size; the name is 1⅓ times the title base. Compact title line height is 1.05. Right Powers/Family and Did You Know use 1.2 line height; story lists use 1.28, with compact spacing and inline statuses. Headings beside the Powers and Family medallions preserve the measured list clearances.

Integration also uses 1.2 line height and 0.35 em paragraph gaps in the left biography, and 1.15 line height with a 0.1 em heading gap in fact cards. These spacing refinements resolve previous Chromium 18 px failures without changing art, rectangles, approved wording or the minimum body size. This supersedes earlier reports using looser spacing; native device comfort is still unverified.

Both pages use the same canvas, a 12 px gutter and at least 12 px horizontal outer margins. A compact 56 px header and 56 px navigation row fit outside the spread. Width is constrained by both viewport width and height. Landscape at 1000 CSS px or wider shows the spread. Other sizes show one page; a testing override can also show one page. At very small sizes, text may not fit and is visibly flagged, never shrunk or hidden.

No separate comfortable-reading view was added. Diagnostics stay in a modal so they do not consume book space. Increasing scale may deliberately overflow a panel and marks it for review.

## Printing and publication

Print uses two separate A5 portrait sheets with artwork aspect ratios retained and no controls. A5 does not share the image's proportions, so there is white space below each illustration. Native Safari/printer checks remain outstanding. GitHub Pages build/workflow is prepared; actual publication is a separate operation.
