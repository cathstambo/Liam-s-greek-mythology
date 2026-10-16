# Integrated prototype validation

Recorded 16 October 2026. This is the current integrated application, replacing the earlier isolated image-fit trials. Historical failures under older artwork/copy/spacing are not the current acceptance result.

## Completed

`npm run build` succeeds. **8 Playwright Chromium tests pass**, serving the production `dist/` at a nested HTTP project path rather than `file://`.

| Check | Result |
|---|---|
| 1024 × 768 landscape | Two pages, no document scrolling, all text panels fit at default 18 px |
| 1180 × 820 landscape | Two pages, no document scrolling, all text panels fit at default responsive size |
| 1366 × 1024 landscape | Two pages, no document scrolling, all text panels fit at default 20 px |
| 768 × 1024 portrait | One page, Previous/Next, Home, arrows and orientation change work |
| Artwork | Both SVG canvases load via HTTP at 1067 × 1280; screenshot inspection confirms embedded artwork renders |
| Copy | Every heading, paragraph, bullet and status matches the current specification exactly |
| Story states | Three Coming soon statuses; zero story links; no Personality section |
| Typography controls | 140% changes actual overlay font size and produces visible, named overflow diagnostics |
| Phone view toggle | At 844 × 390, choose two-page overview; choice survives rotation; switch back to 18 px single-page text and navigate |
| Dialog | Keyboard Escape closes it; panel outline toggle works |
| Print | Two A5 portrait PDF sheets, approximately 420 × 594.96 points, no controls or split pages |
| Source preservation | Each SVG embeds byte-identical source raster data; both canvases match without stretching or cropping |

The screenshots were visually inspected at the smallest spread. The PDF was inspected with `pdfinfo` and text extraction: both pages and all approved wording are present as text. Re-run the tests to generate `test-results/spread-1024.png`, `spread-1180.png`, `spread-1366.png` and `poseidon-a5.pdf`.

## Changes explaining improved fits

The prior latest right-page trial passed 18 px. Integration retains that geometry and compact spacing. Left-page art and wording are unchanged; tighter paragraph and card spacing now allow the full left copy to fit at 18 px in Chromium. No type is reduced below 18 px at default scale. Font-scale testing can deliberately exceed available space; the app flags this visibly rather than clipping or shrinking.

The two page canvases are now exactly 1067 × 1280. The underlying right raster remains at its generated resolution and is embedded proportionally, with negligible horizontal padding. No new image generation was needed.

## Still unverified

- Native iPad Safari/iPadOS, real touch reading comfort, browser toolbar/zoom variations and installed Georgia font metrics. Desktop Chromium uses its available serif fallback. A real-device check remains necessary.
- Android Chrome on physical hardware. Viewports narrower than the target iPads may show explicit fit warnings; no separate reading view was added.
- Physical printer margins and Safari/iPad print output. Chromium PDF pagination is verified; real print workflows may require disabling headers/footers and enabling backgrounds.
- The GitHub Actions workflow and deployed GitHub Pages site have not been run remotely. Local nested-path checks pass. Repository settings were not changed.
- Snapshot publication/fresh-task environment restoration has not been tested.

## Suggested user check after publishing

1. Open the GitHub Pages HTTPS URL in Safari, at normal zoom.
2. In landscape, confirm the full spread and controls fit and Layout checks reports no overflow at 100%.
3. Rotate to portrait; navigate both directions and use Home.
4. Check Family heading clearance, full biography, Powers/Home facts and all story statuses.
5. Test 110–140% scale to confirm diagnostics, then restore 100%.
6. Open the print preview: two A5 portrait sheets, backgrounds present and no navigation controls.

If native font wrapping produces a warning, record the viewport, browser, panel and scale. Adjust spacing or approved geometry explicitly; do not hide overflow or lower the minimum font to manufacture a pass.
