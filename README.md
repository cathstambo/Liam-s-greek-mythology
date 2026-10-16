# Liam's Greek Mythology Corner

A static, two-page Poseidon prototype. The artwork stays separate from selectable HTML text. No backend, login, analytics, ads, keys, runtime dependencies or CDN is needed.

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

- Landscape on phones and tablets: both pages together, fitted to viewport height and width, with Home and controls outside the artwork.
- Portrait: a “Turn your device sideways” message replaces the book. Browsers are not forced to rotate.
- There is no single-page view or view toggle. Home focuses the start of the book.
- Layout checks opens test-only typography scaling (100–140%), panel outlines, overflow reports and Print.
- Stories are labelled Coming soon and are not links.
- On tablet-sized landscapes, text starts at 18 CSS px and rises to 20 px on larger pages. Increasing test scale intentionally reveals limits; the app does not silently shrink or clip text. On smaller phones the book scales with the artwork and uses smaller text; fit warnings remain available.

## Publish with GitHub Pages

A workflow is prepared in `.github/workflows/pages.yml`. Repository settings have not been changed and publication has not been triggered by this implementation.

1. Review the changes and merge/push them to `main` in `cathstambo/Liam-s-greek-mythology`.
2. In GitHub, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
3. Run **Actions → Deploy GitHub Pages → Run workflow**, or push a new change to `main`.
4. Open the deployed URL reported by that successful workflow. The expected project path uses the actual repository name, `/Liam-s-greek-mythology/`.

All application asset/module URLs are relative; no repository name is hard-coded into the app. If your account restricts Actions, Pages or the `github-pages` environment, an owner must enable/approve those settings. No custom domain is configured.

## Verify on a real iPad

Open the deployed HTTPS site in Safari at normal browser zoom. Test the landscape book, portrait rotation message, Home, Layout checks, orientation changes, and printing. Confirm readable text, no artwork overlap, and no warning at 100% scale. Safari and installed fonts can wrap differently from desktop Chromium. [Validation record](docs/VALIDATION.md) separates completed automated checks from device checks still outstanding.

## Print

Use Layout checks → Print A5 pages. Choose A5 portrait, 100% scale, background graphics enabled and browser headers/footers disabled. Each illustrated page prints on its own A5 sheet; the original wide art is preserved with white space below rather than stretched to fill A5. Chromium PDF output has been tested. Real printer margins and iPad printing still need checking.

## Add future character pages

Add approved artwork with a common canvas and append page data in `pages.js`: copy, accessible description and percentage-based inner rectangles. Add navigation/grouping only when specified. Keep lettering in HTML, not raster assets. Validate fit at the smallest target viewport before adding more content. Repeat subpath, orientation, overflow and print checks.
