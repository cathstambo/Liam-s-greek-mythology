> Supplied revised right-page brief. Its analysis-only gate was subsequently lifted by the user to proceed with implementation. The selected edited artwork and current status are documented in [CURRENT_SPEC.md](CURRENT_SPEC.md).

# Liam's Greek Mythology Corner — Poseidon right page: revised copy and validation brief

## Status and scope

Use the **latest approved four-panel right-page artwork** supplied with this brief. The user has approved its visual layout, but **text fitting has not been validated**. The left page is not part of this change; do not modify it. Start with analysis/measurement only. **Do not modify code or images, commit, push, or deploy until the user approves the findings.**

## Revised right-page copy (exact text to test)

### Special Powers (wave medallion; top-left parchment)

- Creates giant waves
- Summons powerful storms
- Causes earthquakes

### Family (people medallion; middle-left parchment)

- Brothers: Zeus and Hades
- Wife: Amphitrite
- Son: Polyphemus, a one-eyed Cyclops

### Did You Know? (lightbulb medallion; middle-right seafoam parchment)

The ancient Greeks believed Poseidon created the very first horse!

### Explore His Stories (book medallion; bottom-right horizontal parchment)

- Odysseus and the Cyclops — Coming soon
- Poseidon and Athena — Coming soon
- The Adventures of Odysseus — Coming soon

The three 'Coming soon' labels are statuses, **not links to working stories** unless those stories actually exist. Do not invent story content or destinations.

**Personality is removed entirely.** No fifth parchment or extra section. Do not add a Trident section. The trident remains part of Poseidon's illustration and page-one facts, not a right-page panel.

## Approved right-page artwork/layout

- Top row: large horizontal Special Powers parchment **left**; small ship illustration **right**.
- Middle row: two broad panels, Family **left** and pale seafoam-blue Did You Know? **right**.
- Bottom row: small, child-friendly Poseidon and Amphitrite illustration **left**; wide horizontal Explore His Stories parchment **right**.
- Pale ivory canvas, restrained decorative imagery, thin gold borders with **one small Greek-key square per corner**, and the four relevant blue/gold medallions.
- **All text is rendered as live HTML overlays** (including headings and Coming soon labels). No text baked into artwork.
- Do not change the illustrations, page proportions, parchment shapes, medallion sizes or artwork in this measurement pass.

## Geometry and device constraints

- The **left and right page canvases must be exactly the same dimensions and aspect ratio**. Previous validation reported both source JPEGs at **1067 × 1280 pixels**; verify that the newly supplied right image matches before testing. If it does not, report the mismatch rather than stretching or silently cropping it.
- Both pages appear side-by-side as a real open book on a **1024 × 768 landscape iPad**, with no scrolling, distortion or overflow. Test **1024 × 768, 1180 × 820, and 1366 × 1024**.
- Preserve at least **12 CSS px outer margins** and a **12 CSS px gutter**, subject to the existing app's actual layout.
- Minimum target **18 CSS px body text**, ideally **20 CSS px**, including story labels where practical. Headings must be comfortably readable.
- Use the actual HTML font stack and CSS assumptions from the existing project; note differences from the previous measurement report. Account for medallions, panel borders, internal padding and decorative corners when measuring **usable text rectangles**.
- No arbitrary mid-word breaks, clipped text, overlapping text, or text crossing panel borders. Prefer compact bullet spacing and **inline** 'Coming soon' labels if this saves height, but do not shrink body text below 18 px to make it pass.
- Check the left-page layout remains unaffected by the new right-page dimensions. Previous report also flagged marginal left biography, Powers and Home fits at 1024 × 768; **report these separately, do not silently change left-page copy or artwork**.

## Requested validation output

1. Verify both image dimensions and the rendered page widths/heights at each viewport.
2. Record each right-page panel's **usable text width and height** after accounting for icon and borders.
3. Measure the **maximum fitting font size** for all four panels, including headings and bullet spacing.
4. State clear **pass/fail at 18 px and 20 px** for every panel, including Stories with Coming soon labels.
5. Produce screenshots of the complete two-page spread with the revised text actually overlaid at 18 px; also at 20 px if possible. Identify any overflow visually.
6. If any section fails, propose the **smallest targeted copy/layout adjustments**, with measured justification. Do not implement them without approval.
7. Distinguish desktop Chromium measurements from unverified native iPad Safari behaviour.

## Relevant previous validation

The previous five-panel right-page layout failed 18 px across all five sections at the smallest viewport, largely due to narrow middle columns and lengthy copy. The prior report measured page size around **494 × 592.6 CSS px** per page at 1024 × 768 when both source images were 1067 × 1280. The new four-panel artwork and shorter copy must be remeasured; **do not reuse the old panel text rectangles or assume success**.

## Approval gate

**Analysis only. Stop after reporting results and screenshots.** Await explicit approval before modifying app code, assets, repository files, commits or deployment.
