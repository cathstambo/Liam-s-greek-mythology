> Historical first-draft assessment. Its paused status, old artwork and geometry are superseded by [the current validation](../../VALIDATION.md).

# Poseidon panel readability assessment

Implementation is paused pending a revised layout. No approved artwork or copy has been changed. The first layout draft remains uncommitted and is not suitable for publication. No alternate reading view has been added.

## Supplied files

The supplied attachments are one ZIP archive and one Markdown brief, rather than two ZIPs. The ZIP contains exactly two PNGs and a build brief. Its brief is byte-for-byte identical to the separate Markdown attachment. Both images are 1055 × 1491 pixels.

## Measurement method and limits

Measured in Chromium at CSS viewport dimensions corresponding to common iPads. Dimensions below describe the inner text rectangles after avoiding borders and illustrated ornaments, not the entire outer parchment. Coordinates are percentages of the original page. The raster images remain unmodified.

The draft uses Georgia with a system serif fallback, 1.28 line height, paragraph spacing of 0.65 em, and headings at 1.15 times body size. Headings reserve two em vertically to help clear the medallions. The title uses 2.25 times the base size, the subtitle 1.3 times, and pronunciation the base size. Font sizes below are the largest measured base sizes fitting these rectangles; they are not recommendations. Each was binary-searched against actual browser scroll dimensions and rounded down to 0.1 px. Font metrics on a real iPad may differ. These are Chromium measurements at iPad dimensions, not claims of actual Safari device testing.

16 CSS px is used as a lower screening threshold, not a guarantee of comfort for a seven-year-old; 18–20 px would be a stronger target for body copy. Do not adopt the small fitting sizes as the final design. Small increases near the fit limit can add an entire line.

The spread breakpoint in the paused draft is landscape at 1000 CSS px. Pages are sized by width, capped at 850 px each; vertical scrolling is allowed. Fitting the whole spread plus controls into the viewport height would reduce page size and make the text limits worse. No design decision about the final breakpoint has been approved.

## Maximum fitting base font sizes (CSS px)

| Panel | Landscape 1024×768 | Landscape 1180×820 | Landscape 1366×1024 | Portrait 768×1024 | Portrait 820×1180 | Portrait 1024×1366 |
|---|---:|---:|---:|---:|---:|---:|
| POSEIDON | 10.5 | 12.2 | 14 | 15.5 | 16.4 | 18.1 |
| Who is Poseidon? | 10.1 | 11.7 | 13.7 | 15.2 | 16.3 | 17.7 |
| Powers | 14 | 16.3 | 18.9 | 21 | 22.5 | 24.3 |
| Symbol | 18.6 | 21.6 | 25.1 | 27.8 | 29.9 | 32.2 |
| Home | 15.1 | 17.5 | 20.3 | 22.5 | 24.2 | 26.1 |
| Sacred Animal | 21.5 | 24.9 | 29 | 32.2 | 34.5 | 37.4 |
| Special Powers | 11.4 | 13.2 | 15.4 | 17.1 | 18.3 | 19.9 |
| Family | 11 | 12.7 | 14.8 | 16.5 | 17.7 | 19.2 |
| Personality | 10.1 | 11.7 | 13.6 | 15.1 | 16.2 | 17.6 |
| Did You Know? | 8.7 | 10.2 | 11.8 | 13.1 | 14 | 15.2 |
| Explore His Stories | 11.5 | 13.3 | 15.5 | 17.2 | 18.5 | 20 |

Page widths in those six columns: **488, 566, 659, 732, 784, 850 CSS px**, respectively. “POSEIDON” values describe the smallest title-scroll line (pronunciation); the name is 2.25 times as large.

## Inner panel dimensions and required copy

Coordinates below are `[left %, top %, width %, height %]`. The first dimensions are for a 488 px-wide page in the 1024×768 spread; the second are for a 732 px-wide single page at 768×1024. The full required wording follows every panel. “Coming soon” labels are included in the stories measurements.

### POSEIDON

- Coordinates: `[25, 4.2, 49, 8.7]`.
- Landscape inner rectangle: **239 × 60 px**.
- Portrait inner rectangle: **359 × 90 px**.

POSEIDON

God of the Sea

Say it: puh-SY-dun

### Who is Poseidon?

- Coordinates: `[58, 29.8, 35.8, 24.9]`.
- Landscape inner rectangle: **175 × 172 px**.
- Portrait inner rectangle: **262 × 258 px**.

Who is Poseidon?

Poseidon is one of the mightiest gods in Greek mythology! He rules the seas and oceans, carrying a powerful golden trident.

When Poseidon is happy, the sea can be calm and peaceful. But when he gets angry, watch out! He can create enormous waves, wild storms and even earthquakes.

He lives in a magnificent palace beneath the sea, surrounded by amazing sea creatures.

### Powers

- Coordinates: `[4.7, 75.4, 17.1, 13.5]`.
- Landscape inner rectangle: **83 × 93 px**.
- Portrait inner rectangle: **125 × 140 px**.

Powers

Seas, storms and earthquakes

### Symbol

- Coordinates: `[28.6, 75.4, 17.8, 14.5]`.
- Landscape inner rectangle: **87 × 100 px**.
- Portrait inner rectangle: **130 × 150 px**.

Symbol

His mighty trident

### Home

- Coordinates: `[53.3, 75.4, 17.8, 14.5]`.
- Landscape inner rectangle: **87 × 100 px**.
- Portrait inner rectangle: **130 × 150 px**.

Home

A palace beneath the sea

### Sacred Animal

- Coordinates: `[77.6, 75.4, 17.5, 14.5]`.
- Landscape inner rectangle: **85 × 100 px**.
- Portrait inner rectangle: **128 × 150 px**.

Sacred Animal

The horse

### Special Powers

- Coordinates: `[7.4, 4, 46, 16.3]`.
- Landscape inner rectangle: **224 × 112 px**.
- Portrait inner rectangle: **337 × 169 px**.

Special Powers

Poseidon can whip up enormous waves, summon fierce storms and shake the earth with earthquakes!

With a strike of his mighty trident, he can turn a peaceful sea into a dangerous adventure.

### Family

- Coordinates: `[7.4, 25.1, 40.1, 16.3]`.
- Landscape inner rectangle: **196 × 112 px**.
- Portrait inner rectangle: **294 × 169 px**.

Family

Poseidon's brothers are Zeus, king of the gods, and Hades, ruler of the Underworld.

His wife is Amphitrite, a beautiful sea goddess, and one of his sons is Polyphemus, a giant Cyclops with just one eye!

### Personality

- Coordinates: `[7.4, 46.2, 35.8, 15.6]`.
- Landscape inner rectangle: **175 × 108 px**.
- Portrait inner rectangle: **262 × 161 px**.

Personality

Poseidon is powerful, proud and very quick to lose his temper!

He can be generous and helpful, but if someone makes him angry, they might find themselves in some very stormy trouble.

### Did You Know?

- Coordinates: `[74, 46.3, 21, 15.7]`.
- Landscape inner rectangle: **102 × 108 px**.
- Portrait inner rectangle: **154 × 162 px**.

Did You Know?

The ancient Greeks believed Poseidon was also the god of horses!

Some myths say he created the very first horse. Imagine having a sea god to thank for ponies!

### Explore His Stories

- Coordinates: `[8, 66.5, 44, 20]`.
- Landscape inner rectangle: **215 × 138 px**.
- Portrait inner rectangle: **322 × 207 px**.

Explore His Stories
Odysseus and the Cyclops
Coming soon
Poseidon and Athena
Coming soon
The Adventures of Odysseus
Coming soon

## Findings to resolve before implementation resumes

- At 1024×768, nine of the eleven regions fail the 16 px screening threshold. Only Symbol and Sacred Animal fit. The biography, Family, Personality, Special Powers, stories, and Did You Know require substantial extra room; Powers and Home have smaller shortfalls. The title scroll also needs rebalancing.
- At 1180×820, seven fail: title scroll, biography, Special Powers, Family, Personality, Did You Know, and stories.
- At 1366×1024, the same seven fail, although several are close to 16 px.
- At 768×1024 portrait, four fail: title scroll, biography, Personality, and Did You Know.
- At 820×1180 portrait, Did You Know remains below 16 px; several other panels only just pass.
- At 1024×1366 portrait with the current 850 px page cap, Did You Know still fails at about 15.2 px.

The title scroll needs separate treatment from body text: the name is large enough to read even in landscape, but the subtitle and especially pronunciation are too small at the fitting base size. Its vertical spacing can be reassessed without altering copy; this alone will not solve the other panels.

The biography has 63 words plus its heading. Did You Know has 29 words plus its heading in the narrowest major text panel. These are the main geometry constraints; Family and Personality also need more space in the spread.

## Proposed direction for a revised layout (not applied)

1. Agree a target of at least 16 px, preferably 18–20 px, at the smallest intended iPad viewport before revising panel geometry.
2. Give the biography and Did You Know substantially more parchment area, including width, rather than relying on reduced font size. At the current landscape widths, the biography needs roughly 394 px of text height where only 172 px exists; Did You Know needs roughly 327 px where only 108 px exists. These are first-pass measurements at 16 px; widening the panels would reduce required height.
3. Reassess the Family, Personality, Special Powers and story panels for the same target. Keep exact copy unless a separate copy revision is approved.
4. Rebalance the title scroll to accommodate its three lines. Retain space beneath medallions and inside borders.
5. If keeping two pages together at 1024×768 is essential, a significant approved artwork/layout revision is needed. A single-page fallback improves readability but does not by itself solve the narrow Did You Know panel. No fallback change has been applied.

## Print observation

A Chromium PDF trial produced two separate A5 portrait sheets (420 × 594.96 pt) with controls removed. This checks pagination only: proportionally scaled body text is about 7.3 pt, which is too small to treat as a successful child-readable print design. Print typography also needs reassessment before publication.

## State of work

Approved assets and copy are intact. There is an uncommitted static layout draft, diagnostic code, and deployment scaffolding in the checkout. Layout implementation, final acceptance testing, committing, and deployment preparation are paused at the user’s request. No push or deployment has occurred. Raw measurements are in `measurements.json`; the measurement script is `scripts/measure-layout.mjs`.
