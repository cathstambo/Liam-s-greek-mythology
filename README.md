# Liam's Greek Mythology Corner

A static illustrated book with approved two-page Poseidon and Zeus chapters. The artwork stays separate from selectable HTML text. No backend, login, analytics, ads, keys, runtime dependencies or CDN is needed.

To reproduce the non-destructive artwork canvases from the retained source images, run `npm run art:prepare`. This replaces only the SVG wrappers; it does not edit source pixels.

The current implementation uses the accepted left page, edited four-panel right page, shortened biography and revised right-page copy. [Current specification](docs/CURRENT_SPEC.md) records these decisions; the original brief is retained as history.

## Run locally

Requires Python 3 and a modern browser. From this repository:

```sh
npm run dev
```

Open the address printed by the server in your local browser. Serving HTTP is necessary for JavaScript modules; do not open `index.html` as a file.

Node 24 is used for build/test tooling. Install test dependencies with `npm ci`, then:

```sh
npm run build
npm test
```

The deployable site is in `dist/`. Tests use `/usr/bin/chromium` by default. On another machine, install a supported Chromium build and set `CHROMIUM_PATH` to its executable. For example, `npx playwright install chromium`, then use the executable returned by `require('playwright').chromium.executablePath()`.

Tests serve the built site beneath a project subpath. Run the build before testing. Screenshots and the two-page A5 PDF are written to `test-results/` (ignored by Git).

## Use the prototype

- Portrait: one page at a time, with Previous/Next and Home.
- Landscape: choose **Single page** or **Two pages**. Tablets default to the spread, phones to one page. The landscape choice survives rotation for the current session.
- Home returns to the Contents menu in either orientation.
- Layout checks opens test-only typography scaling (100–140%), panel outlines, overflow reports and Print.
- Stories are labelled Coming soon and are not links.
- Text and artwork share a fixed reference canvas and scale together. A bundled, locally served Liberation Serif font keeps wrapping consistent across devices; its SIL Open Font License is in `assets/fonts/LICENSE.txt`. The biography has extra bottom clearance. Browser text inflation is disabled for the book layout. Increasing the test scale intentionally reveals limits; overflow is visibly reported, never clipped.

## Publish with GitHub Pages

A workflow is prepared in `.github/workflows/pages.yml`. Repository settings have not been changed and publication has not been triggered by this implementation.

1. Review the changes and merge/push them to `main` in `cathstambo/Liam-s-greek-mythology`.
2. In GitHub, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
3. Run **Actions → Deploy GitHub Pages → Run workflow**, or push a new change to `main`.
4. Open the deployed URL reported by that successful workflow. The expected project path uses the actual repository name, `/Liam-s-greek-mythology/`.

All application asset/module URLs are relative; no repository name is hard-coded into the app. If your account restricts Actions, Pages or the `github-pages` environment, an owner must enable/approve those settings. No custom domain is configured.

## Verify on a real iPad

Open the deployed HTTPS site in Safari at normal browser zoom. Test portrait paging, both landscape view choices, Home, Layout checks, orientation changes and printing. Confirm readable text, no artwork overlap, and no warning at 100% scale. The same font is supplied to every browser, but native Safari still needs a device check. [Validation record](docs/VALIDATION.md) separates completed automated checks from device checks still outstanding.

## Print

Use Layout checks → Print A5 pages. Choose A5 portrait, 100% scale, background graphics enabled and browser headers/footers disabled. Each illustrated page prints on its own A5 sheet; the original wide art is preserved with white space below rather than stretched to fill A5. Chromium PDF output has been tested. Real printer margins and iPad printing still need checking.

## Add future character pages

Add approved artwork with a common canvas and append page data in `pages.js`: copy, accessible description and percentage-based inner rectangles. Add navigation/grouping only when specified. Keep lettering in HTML, not raster assets. Validate fit at the smallest target viewport before adding more content. Repeat subpath, orientation, overflow and print checks.

Production builds use content-hashed JavaScript and CSS filenames so a refreshed deployment cannot mix new page logic with old cached styles.

## Zeus

Choose Zeus in the header, or open `?god=zeus`. Portrait shows one page; landscape supports single-page and two-page views. Both artwork and live text scale together. Stories retain their approved Coming soon labels until destinations are available.

The approved compact Zeus formatting reduces Powers indentation, tightens Family and Home spacing, and uses an unbulleted semantic story list. Exact wording is preserved. See [Zeus specification](docs/ZEUS.md).

The landing page is a basic Contents menu linking to Poseidon and Zeus. Home returns to Contents; direct chapter links remain available. The menu can be expanded as more chapters are approved.
