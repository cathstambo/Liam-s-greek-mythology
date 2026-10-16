# Integrated prototype validation

Recorded 16 October 2026. This is the current integrated application, replacing the earlier isolated image-fit trials. Historical failures under older artwork/copy/spacing are not the current acceptance result.

## Completed

`npm run build` succeeds. **14 Playwright Chromium tests pass**, serving the production `dist/` at a nested HTTP project path rather than `file://`.

| Check | Result |
|---|---|
| 1024 × 768 landscape | Two pages, no document scrolling, all text panels fit at default 18 px |
| 1180 × 820 landscape | Two pages, no document scrolling, all text panels fit with artwork and text scaled together |
| 1366 × 1024 landscape | Two pages, no document scrolling, all text panels fit with artwork and text scaled together |
| Portrait | One page with Previous/Next; both pages fit at tested phone and iPad sizes |
| Artwork | Both SVG canvases load via HTTP at 1067 × 1280; screenshot inspection confirms embedded artwork renders |
| Copy | Every heading, paragraph, bullet and status matches the current specification exactly |
| Story states | Three Coming soon statuses; zero story links; no Personality section |
| Typography controls | 140% changes actual overlay font size and produces visible, named overflow diagnostics |
| Touch/mobile matrix | 393×844, 844×393, 768×1024, 1024×768, 820×1180, 1180×820, 1366×1024: both pages and available landscape modes checked for overflow and matching canvas size |
| Dialog | Keyboard Escape closes it; panel outline toggle works |
| Print | Two A5 portrait PDF sheets, approximately 420 × 594.96 points, no controls or split pages |
| Source preservation | Each SVG embeds byte-identical source raster data; both canvases match without stretching or cropping |

The screenshots were visually inspected at the smallest spread. The PDF was inspected with `pdfinfo` and text extraction: both pages and all approved wording are present as text. Re-run the tests to generate `test-results/spread-1024.png`, `spread-1180.png`, `spread-1366.png` and `poseidon-a5.pdf`.

## Changes explaining improved fits

The prior latest right-page trial passed 18 px. Integration retains that geometry and compact spacing. Left-page art and wording are unchanged; tighter paragraph and card spacing now allow the full left copy to fit at 18 px in Chromium. No type is reduced below 18 px at default scale. Font-scale testing can deliberately exceed available space; the app flags this visibly rather than clipping or shrinking.

The two page canvases are now exactly 1067 × 1280. The underlying right raster remains at its generated resolution and is embedded proportionally, with negligible horizontal padding. No new image generation was needed.

## Still unverified

- Native iPad Safari/iPadOS, real touch reading comfort, browser toolbar/zoom variations and installed Georgia font metrics. The app now bundles Liberation Serif Regular/Bold locally; tests verify those files load. A real-device check remains necessary.
- Android Chrome on physical hardware. Portrait and phone landscape default to single-page reading; landscape can switch to a scaled two-page overview.
- Physical printer margins and Safari/iPad print output. Chromium PDF pagination is verified; real print workflows may require disabling headers/footers and enabling backgrounds.
- The GitHub Actions workflow and deployed GitHub Pages site have not been run remotely. Local nested-path checks pass. Repository settings were not changed.
- Snapshot publication/fresh-task environment restoration has not been tested.

## Suggested user check after publishing

1. Open the GitHub Pages HTTPS URL in Safari, at normal zoom.
2. In landscape, confirm the full spread and controls fit and Layout checks reports no overflow at 100%.
3. Rotate to portrait and navigate both pages; rotate back, toggle Single page/Two pages and use Home.
4. Check Family heading clearance, full biography, Powers/Home facts and all story statuses.
5. Test 110–140% scale to confirm diagnostics, then restore 100%.
6. Open the print preview: two A5 portrait sheets, backgrounds present and no navigation controls.

If native font wrapping produces a warning, record the viewport, browser, panel and scale. Adjust spacing or approved geometry explicitly; do not hide overflow or lower the minimum font to manufacture a pass.

## Phone resize correction

A later device screenshot showed oversized text and portrait content visible together. The precise cause was not reproduced in desktop mobile emulation. The fix uses a shared fixed canvas for artwork and overlays, disables automatic text inflation, adds explicit portrait hidden states, restores phone landscape paging, and generates matching content-hashed code/styles for production. An actual Android phone and native Safari should still be checked after deployment. The browser suite now includes touch/mobile emulation at device scale factor 3 and verifies proportional overlay geometry across resize; it is not claimed as physical-device testing.

## Portrait, both landscape modes and biography clearance

Latest user direction restores portrait reading and both landscape choices. All 14 tests pass. Touch emulation at seven viewport sizes checks both pages, available landscape choices, no panel overflow at 100%, no horizontal document overflow, and that the transformed canvas width matches its page wrapper immediately after switching. The biography retains about **24.6 reference CSS px** below its final line, with a regression assertion requiring more than 10 reference px at every size. Tests verify the bundled font loads instead of assuming a platform serif has the same metrics. These remain desktop Chromium/mobile-emulation results, not physical iPad or Android guarantees. Physical checks remain useful, but the user does not need an iPad to run the automated suite.
