# Visual direction and host-style challenge

Use this reference for every new page, redesign, or visual audit. Architecture and visual
style are separate contracts: preserve sound code integration, but do not extend a weak
visual language without examining it.

## 1. Evidence hierarchy

Resolve visual direction from:

1. explicit user instructions and supplied references;
2. genuine brand assets and repeated, intentional brand decisions;
3. product objects, user tasks, content, and data shape;
4. sound host patterns that improve consistency or learned behavior;
5. a documented fallback direction.

Do not treat the most common CSS treatment in the repository as proof of intent.

## 2. Audit the host language

Sample the shell and at least three representative routes or page families. Inventory:

- topology, navigation, focal anchors, density, and useful-space allocation;
- typeface source, available styles, weight distribution, typography, color, surface,
  radius, border, depth, icon, image, and motion;
- repeated header, filter, card, table, list, form, and CTA structures;
- component and variant choices;
- responsive transformations and system states.

Classify repeated patterns:

```text
Preserve — intentional, task-supporting, recognizable, and consistently implemented.
Question — plausible but generic, weakly justified, or over-repeated.
Reject — harmful to task, accessibility, credibility, identity, or supplied direction.
```

Three related questionable signals require a visual challenge. Five signals across
categories require revisiting the page family, not recoloring it.

## 3. Ordinary slop signals

- centered category slogan, generic subcopy, two CTAs, floating mockup;
- equal feature or testimonial cards, generic bento layouts, icon-tile grids;
- gradients, glow, glass, purple/blue “technology” color, decorative grids;
- four KPI cards, chart, activity feed, and secondary status rail without a decision model;
- repeated title/description/action/control-band/table page skeleton;
- fake live dots, mock metrics, placeholder logos, testimonials, or audit proof;
- a component library reduced to rounded white cards and default buttons.

These are not forbidden individually. Their unjustified accumulation is the problem.

## 4. Anti-slop signals

Anti-slop is another recognizable default. Question accumulation of:

- giant black grotesk headlines paired with tiny tracked uppercase mono eyebrows;
- off-white canvas, black type, cobalt accent, and one dark inversion section;
- section numbers, rulers, crop marks, coordinate labels, or measurement decoration;
- sparse two-column editorial sections with excessive unused space;
- thin ruled ledgers used for every list regardless of object or interaction;
- deliberate-looking asymmetry that does not encode hierarchy;
- full-width solid-color CTA bands and dark utility footers;
- “quiet confidence,” restraint, or subtraction used to excuse flat interaction;
- repeated text-only compositions where imagery, manipulation, or layered state would help.

Do not solve ordinary slop by applying this entire counter-style.

## 5. Visual-direction brief

Record:

```text
Product character:
Primary objects:
Primary task and interaction:
Topology:
Focal anchor:
Density:
Symmetry:
Surface and depth:
Typography, including preserve/revise/replace typeface decision and weight budget:
Color behavior:
Media or illustration:
Interaction richness:
Distinctive motif:
Reference traits to carry:
Host patterns to preserve:
Host patterns to question:
Host patterns to reject:
```

Every line needs a product, task, content, brand, or reference reason. “Clean,” “modern,”
“premium,” “minimal,” and “not AI-looking” are insufficient.

## 6. Challenge protocol

When the requested result conflicts with the host visual style:

- preserve APIs, data flow, primitives with sound behavior, and accessibility;
- keep brand decisions that are supported by assets or repeated deliberate use;
- replace page-level composition and styling patterns that create generic drift;
- adapt sound primitives through documented variants before forking them;
- show the user the material conflict only when it affects scope, consistency, or risk.

The goal is authored continuity, not visual obedience and not novelty for its own sake.
