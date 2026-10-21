# Approved Hades chapter

The user approved publication after reviewing the condensed Special Powers list and final biography placement: heading at the original top position, paragraphs lower with 1em gaps. The complete final copy is in pages.js and checked against tests/fixtures/hades-copy.json.

Special Powers: Turns invisible. / Rules the dead. / Controls underground riches.

The revised biography, quick facts, Family and Did You Know wording comes from Hades_Revised_Approved_Text.md. The bottom-right heading is Guardian. The revised story titles are Hades and Persephone, The Twelve Labours of Heracles, and Orpheus and Eurydice. Each retains Coming soon; no unavailable destination is linked.

Artwork: approved original left image at 1067×1280; approved completed right artwork with crystal medallion and Cerberus generated at 1145×1373. Each source is retained byte-for-byte in assets/hades-*-source.*. Common-canvas 1067×1280 SVG wrappers embed those exact bytes, preserve source aspect ratio and do not crop or resample. The right image needs a negligible letterbox margin because its aspect ratio differs slightly. The approved generated rendering is retained; this does not claim it is pixel-identical to the earlier blank template.

Both artwork and live text use the existing shared reference-canvas transform. Body text is 18 px at the 494 px reference width, which is the 1024×768 two-page view. All panels fit with this typography. On larger pages, the font grows with the artwork and retains wrapping. Phone text is smaller and zoom remains available; 18 actual CSS px is not promised on small phones or phone double-page overviews.

Hades-only biography styling: line-height 1.15; paragraphs margin-bottom 1em; last paragraph no bottom margin; vertically centered paragraph group with 32px top and 4px bottom reference padding; heading absolutely positioned at the text area's original top edge. Other character layouts retain their own rules.

Validation: exact copy, image loads, panel and glyph bounds across tablet/phone portrait and both landscape modes, chapter navigation, Home, medallion spacing visually, paragraph gaps and two-page A5 print. Chromium automation is not physical iPad Safari validation. Tests do not change artwork or shrink text to pass.
