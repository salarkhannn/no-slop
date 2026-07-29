# Symmetry and balance

Use for components, repeated regions, action groups, and page composition.

## 1. Peer symmetry

Elements that mean the same thing should normally share:

- height and width policy;
- internal padding and gap;
- label baseline and line-height;
- icon size, side, and optical alignment;
- radius family, border, depth, and state treatment;
- metadata slots and action alignment;
- truncation, wrapping, empty, and loading behavior.

Content may vary without making the component contract vary.

## 2. Local contracts

Write a short contract for repeated or paired regions:

```text
Peers:
Shared axes:
Shared dimensions:
Allowed variation:
Content stress behavior:
Responsive behavior:
```

Use shared components, grid tracks, tokens, and named variants to enforce it.

## 3. Intentional asymmetry

Asymmetry is appropriate when it communicates:

- primary versus supporting content;
- narrative direction;
- a selected object and its context;
- different content types or aspect ratios;
- risk or exception priority.

It is not appropriate when caused by arbitrary offsets, inconsistent component variants,
different padding owners, accidental wrapping, or missing metadata.

## 4. Optical balance

Evaluate visual mass:

- dark and saturated regions feel heavier;
- images and dense controls outweigh prose;
- large headings can overpower the actual work;
- shadows and floating layers pull forward;
- whitespace helps only when it establishes focus or rhythm.

Balance does not require mirroring. It requires a defensible relationship between masses
and alignment anchors.

## 5. Stress checks

Verify:

- shortest and longest labels;
- missing image or metadata;
- one-line and multi-line titles;
- translated text;
- selected, loading, error, and disabled states;
- narrow and extra-wide widths;
- zoom and font scaling.

Fix the shared contract before adding per-instance offsets.
