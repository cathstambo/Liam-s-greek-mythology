> Historical original brief. The later approved copy, artwork selections and implementation decisions in [CURRENT_SPEC.md](CURRENT_SPEC.md) supersede conflicting sections here.

# Liam's Greek Mythology Corner — Codex build brief (Prototype 01)

## Goal
Build a delightful, reliable, child-friendly **static web app** for a 7-year-old to explore Greek mythology on an Apple iPad. **This milestone is ONLY the Poseidon two-page prototype**, not the full encyclopedia. Hostable on GitHub Pages with no server, login, ads, analytics, payments or external API keys. The final app will also support a printable A5 book.

## Non-negotiable approved decisions
- Display name: **Liam's Greek Mythology Corner**; suggested repository: `liams-greek-mythology`.
- Art direction: richly coloured animated-adventure illustration with warm classic storybook touches, turquoise seas, gold, parchment and Greek decorative borders; not babyish.
- **Use the two supplied approved image assets exactly as backgrounds**. Do not regenerate, recolour, crop off important artwork, distort or replace them. These assets have EMPTY parchment panels; all actual text must be real HTML overlaid on top, selectable, accessible and editable.
- Landscape iPad: two facing portrait pages as an open book. Portrait iPad: one page at a time. No forced rotation. Preserve each image's aspect ratio. No horizontal scrolling, clipped text or stretched images.
- Main text needs to be legible to a 7-year-old. If text does not fit at a comfortably readable size, **report the collision and propose a content/layout fix; do not silently shrink it to microscopic size**.
- Prototype must work on Safari/iPadOS and Chrome/Android, including when hosted at a GitHub Pages project subpath.

## Assets
Place these in `public/assets/` or an equivalent relative assets folder:
- `poseidon-left.png` — approved left page, featuring Poseidon and four enlarged bottom cards.
- `poseidon-right.png` — approved right page, featuring stormy ship, Amphitrite, horse and undersea palace.

These are supplied alongside this brief. If Codex cannot access the files, request they be added to the repository before implementing the artwork-dependent layout. Do not use placeholder art without clearly marking it as such.

## Left page — APPROVED wording, preserve verbatim
Title: **POSEIDON**
Subtitle: **God of the Sea**
Pronunciation: **Say it: puh-SY-dun**

Heading: **Who is Poseidon?**

Poseidon is one of the mightiest gods in Greek mythology! He rules the seas and oceans, carrying a powerful golden trident.

When Poseidon is happy, the sea can be calm and peaceful. But when he gets angry, watch out! He can create enormous waves, wild storms and even earthquakes.

He lives in a magnificent palace beneath the sea, surrounded by amazing sea creatures.

Four bottom cards, in left-to-right order:
1. **Powers** — Seas, storms and earthquakes
2. **Symbol** — His mighty trident
3. **Home** — A palace beneath the sea
4. **Sacred Animal** — The horse

## Right page — APPROVED wording, preserve verbatim
Section 1 — **Special Powers**

Poseidon can whip up enormous waves, summon fierce storms and shake the earth with earthquakes!

With a strike of his mighty trident, he can turn a peaceful sea into a dangerous adventure.

Section 2 — **Family**

Poseidon's brothers are Zeus, king of the gods, and Hades, ruler of the Underworld.

His wife is Amphitrite, a beautiful sea goddess, and one of his sons is Polyphemus, a giant Cyclops with just one eye!

Section 3 — **Personality**

Poseidon is powerful, proud and very quick to lose his temper!

He can be generous and helpful, but if someone makes him angry, they might find themselves in some very stormy trouble.

Section 4 — **Did You Know?**

The ancient Greeks believed Poseidon was also the god of horses!

Some myths say he created the very first horse. Imagine having a sea god to thank for ponies!

Section 5 — **Explore His Stories**
- Odysseus and the Cyclops
- Poseidon and Athena
- The Adventures of Odysseus

Story destinations do not exist yet: present them visibly as **Coming soon**, not dead clickable links. Do not invent story content.

## Layout implementation
1. The supplied page art is raster art, not a finished readable page. Render each image as a fixed-aspect-ratio page, then position editable HTML text into the blank parchment regions using **percentage-based coordinates relative to that page**, not the viewport. `position: absolute` over a `position: relative` page wrapper is acceptable. Use a data-driven page/region configuration to simplify later revisions.
2. Match overlay placement to the actual artwork. Avoid the decorative icons, borders and illustrations. The **left-page main bio** belongs in the tall right parchment; the four facts belong in the four lower cards. The top title scroll is for the name, subtitle and pronunciation if they fit. The right page has five distinct blank panels. Verify against actual images.
3. Preserve whole-page aspect ratio in landscape; allow a tasteful surrounding background, page gutter and navigation outside the art. If the viewport is too small for two legible pages, consider a readable single-page fallback rather than tiny text, and document the breakpoint decision.
4. Include an accessible **Next page / Previous page** control in portrait, and a clear **Home** control or placeholder for future navigation. Keyboard arrows are a nice extra. Ensure touch targets >= 44 CSS px.
5. Build a **test-only typography control** (e.g., font-size scale 100%–140%) to assess legibility, but don't let it cause invisible overflow. Include an optional diagnostic mode showing text-panel bounds and overflow warnings.
6. Responsive type with sensible minimums, strong contrast (dark ink on pale parchment), comfortable line height, and no scrolling inside tiny text boxes. Where overflow is unavoidable, visibly flag it for review rather than hiding text.
7. Respect reduced-motion preferences. Avoid heavy page-flip animations in the first prototype.
8. Use meaningful HTML headings, alt/accessible descriptions for the decorative art, and keep all text available to screen readers.
9. For print: add a `@media print` mode or dedicated print view that prints two **separate A5 portrait pages** with the same layout, with no controls. Do not let the browser split one page across sheets. Test PDF output.

## Technology and deployment
- Prefer lightweight plain HTML/CSS/JS (or a minimal Vite app if needed); no backend.
- All URLs must work at `/liams-greek-mythology/` or any GitHub Pages project subpath: use relative asset URLs or the build tool's base setting.
- Provide `README.md` with local run instructions, GitHub Pages deployment instructions, and a short note on adding future character pages.
- Provide a deployable build and optionally a GitHub Actions workflow for GitHub Pages. Don't assume permissions or silently modify repo settings.
- No CDN-only dependencies needed for the prototype; offline use is a future enhancement, not a requirement.

## Acceptance tests (must demonstrate, not just claim)
- Both approved images visibly load when served from a web URL (not just local `file://` or Android `content://`).
- In landscape iPad proportions, the two pages appear together with no stretching, text clipping or overlap with decorative art.
- In portrait iPad proportions, one readable page is displayed with navigation to the other.
- Font-size control changes actual overlay text; overflow diagnostics reveal any panel that cannot fit.
- All approved text is present and accurate; story links clearly indicate Coming soon.
- Print preview yields two A5 pages without split pages or UI controls.
- Verify asset URLs on the GitHub Pages subpath; describe how to test on a real iPad Safari.

## Workflow
First inspect the supplied images and calculate text-region positions. Implement the smallest working version. Then report any actual readability problems with the specific panel and suggested adjustment. Do not change approved art or copy without asking. Deliver a concise implementation summary and exact steps for the user to publish/test.
