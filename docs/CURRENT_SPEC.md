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

The complete artwork and HTML overlays now share a **494 × 592.6148078725 CSS px reference canvas**. The reference body text is 18 px, and a single transform scales the entire canvas to the displayed page width. This preserves line wrapping and relative positions when images resize, rather than calculating overlay fonts independently through container units. Browser automatic text inflation is disabled with text-size-adjust: 100%; pinch zoom is not disabled. The test text-scale control still changes actual HTML font size and can expose overflow.

Book text uses locally bundled Liberation Serif Regular and Bold (CSS family Book Serif), with Georgia/Times/serif only as failure fallbacks. These are unmodified SIL-OFL-licensed font files; the license is included. Loading failures are reported in Layout checks rather than treated as confirmed fits. Headings are 1.15× reference body size; the name is 1⅓×. The biography now uses 1.18 line height and 0.3 em paragraph gaps, retaining approximately 24.6 reference pixels below the final text line. Card and right-page bullet spacing is retained. The original artwork and wording are unchanged.

Portrait shows one page with Previous/Next and Home. Landscape offers Single page and Two pages. Tablet landscape defaults to two pages at 1000 CSS px or wider; phones default to one. The selected landscape mode persists across orientation changes for the current session; portrait always shows one page. Switching pages or views updates the art/text transform synchronously, avoiding a frame of stale scaling. Single-page view is capped at 660 CSS px width and may scroll vertically. The spread fits available screen height and width. Smaller views necessarily scale physical font size with the artwork; pinch zoom remains available.

Both artwork canvases remain exactly 1067 × 1280. Production JavaScript and CSS filenames are content-hashed to prevent stale stylesheet/script combinations on refresh. The fixed reference canvas is a response to user-supplied screenshots showing oversized overlays; desktop mobile emulation did not reproduce the original device fault, so the exact cause is not claimed as confirmed.

No separate comfortable-reading view was added. Rotating restores the landscape spread automatically. Diagnostics stay in a modal so they do not consume book space. Increasing scale may deliberately overflow a panel and marks it for review.

## Printing and publication

Print uses two separate A5 portrait sheets with artwork aspect ratios retained and no controls. A5 does not share the image's proportions, so there is white space below each illustration. Native Safari/printer checks remain outstanding. GitHub Pages build/workflow is prepared; actual publication is a separate operation.

The default landing page is a basic Contents menu for Poseidon and Zeus. Home returns to this menu; chapter URLs use `?god=poseidon` and `?god=zeus`.

Hades is available from Contents and `?god=hades`. [Approved Hades specification](HADES.md) records the final wording, artwork and biography placement.
