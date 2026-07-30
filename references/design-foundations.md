# Design foundations

Use this reference when establishing or evaluating the visual system. The bundled
`assets/component-kit/tokens/globals.css` is the authoritative token implementation for
canonical component work.

## Contents

1. Visual character
2. Token architecture
3. Color
4. Typography
5. Spacing and density
6. Shape, borders, and depth
7. Icons and imagery
8. State language
9. Foundation checklist

## 1. Visual character

Do not begin from one universal taste. Select and name a character supported by the
product, audience, task, content, brand, or supplied references. Valid systems include:

- quiet and restrained;
- dense and technical;
- tactile and layered;
- editorial and typographic;
- playful and illustrative;
- media-led and cinematic;
- crisp and utilitarian;
- spatial and canvas-like.

Combine traits deliberately; do not apply an entire fashionable style package. “Quiet
confidence” is not a quality guarantee and may produce the same giant headline, tiny mono
eyebrow, off-white canvas, sparse rules, and empty sections as other generated work.

The interface should look authored before it looks decorated. Effects, color, imagery,
depth, and expressive type are allowed when they establish identity, explain structure,
or support content. Remove them only when they are ungrounded or accumulated by reflex.

## 2. Token architecture

Use four layers:

1. Raw: literal color, size, radius, font, and shadow values such as `neutral.950` or
   `accent.500`.
2. Semantic: role-only names such as `fg.default`, `surface.canvas`, `border.default`,
   `action.primary`, and `focus.ring`.
3. Component: control height, input padding, dialog width, navigation row, table cell.
4. Local: rare one-off values justified by a specific composition.

Components should consume semantic or component tokens. Themes should normally remap
semantic roles rather than rewrite every component.

When a repository already has tokens:

- map canonical roles to existing semantic roles where the rendered result remains exact;
- add missing roles centrally;
- do not scatter literal replacements across copied components;
- keep light and dark themes paired;
- document deliberate deviations.

## 3. Color

Classify the host before selecting a palette:

- **Preserve** a mature, repeated, accessible system.
- **Repair** unclear roles, contrast failures, or accidental drift without replacing its
  identity.
- **Create** only when the repository has no credible system or the product direction
  explicitly requires a new one.

Record the color owners, product conditions, host mode, base family, accent, contrast
strategy, light/dark modes, semantic states, user-authored color, media, and data
visualization needs. When creating or materially repairing a neutral system, render
achromatic, warm-neutral, and cool-neutral candidates in the same representative screen.
Select from the comparison; do not default to a fashionable product's palette.

Keep these controls independent:

- base family establishes the canvas and reading atmosphere;
- accent identifies product identity and emphasis;
- contrast controls hierarchy and density;
- action, selection, and focus roles remain distinct even when they share a hue;
- success, warning, danger, and information communicate meaning rather than brand;
- chart series and user-authored colors use their own allocation rules.

Use numeric steps only for primitive scales. Components consume role-only semantic tokens
such as `fg.muted`, `surface.raised`, `border.subtle`, `selection.bg`, and `focus.ring`.
Canonical component tokens may retain their published names inside the exact component
boundary.

Dark mode is an independent semantic mapping, not an inversion. Verify text, boundaries,
focus, selection, state colors, overlays, charts, and forced-colors behavior in each
supported mode. Never rely on color alone.

Read `color-systems.md` for the decision workflow, examples, contrast targets, and
verification record.

## 4. Typography

### Select the typeface deliberately

The repository's current font is evidence, not authority. Preserve it when it is a
documented brand choice or when its character, metrics, language coverage, and available
styles support the product. Question it when it is merely a framework starter, a default
sans stack, Inter or Geist without rationale, or when every product built from the
repository inherits the same voice.

Record:

```text
Current face and why it may exist:
Product character and reading conditions:
Required scripts, numerals, weights, italics, and variable axes:
Current face versus credible alternative:
Decision — preserve, revise, or replace:
Fallback metrics, loading, licensing, and performance:
```

When the choice is not already constrained by brand or an exact component contract,
render the current face beside at least one credible alternative. Compare a page title,
paragraph, compact control, dense row, tabular numbers, long label, and localization
sample. Do not choose from a font name or marketing specimen alone.

Choose one primary family by default. Add a display, serif, or mono companion only when it
has a defined information role. Verify actual files exist for the styles used, prevent
synthetic bold and italic, and keep fallbacks close enough in metrics to avoid damaging
layout shift.

Exact canonical components retain Inter and their source metrics. That contract does not
make Inter the automatic page or brand face outside the component.

### Control weight distribution

The canonical scale has four functional families:

- `title-*`: display and page headings, medium weight;
- `label-*`: controls, navigation, key values, medium weight;
- `paragraph-*`: prose and explanatory copy, regular weight;
- `subheading-*`: compact uppercase or tracked section labels.

Canonical headline sizes run from 20/28 through 56/64. Labels and paragraphs cover
12/16, 14/20, 16/24, 18/24, and 24/32. Use the exact token in canonical components.

Rules:

- make regular weight the baseline for prose, descriptions, metadata, table cells, list
  rows, unselected navigation, and ordinary values;
- use medium weight for controls, selected navigation, compact headings, and labels that
  need operational emphasis;
- reserve semibold and bold for sparse focal anchors, exceptional values, or deliberate
  brand display; do not apply them to every title, button, row name, and status;
- in an ordinary product region, regular-weight text should usually outnumber text at 600
  or above. If it does not, treat the hierarchy as compressed and justify or rebalance it;
- do not stack size, heavy weight, high contrast, containment, and central placement on the
  same element when fewer signals establish the hierarchy;
- use no more than three obvious type levels in one local region;
- let size, weight, tone, and placement agree on the same hierarchy;
- keep product page titles compact; reserve display sizes for marketing moments;
- keep body lines roughly 45–75 characters where reading matters;
- align tabular numbers and units consistently;
- use sentence case by default;
- avoid all-caps except short tracked subheadings or status labels;
- never fake hierarchy with color alone;
- test long names, localization, and 200% zoom.

Optical polish:

- use tighter tracking only at larger sizes;
- use comfortable line height for prose and tighter line height for labels;
- align icons to the text's optical center, not merely the box center;
- choose variable-font optical sizing when supported and stable.

## 5. Spacing and density

Read `spatial-system.md` before applying these values to page geometry. First classify the
relationship and assign its owner; then map it to the host scale. Do not infer that every
page needs a padded centered container.

Use a 4 px base rhythm with an 8 px primary cadence. Common values:

- 4: micro separation inside a compact control;
- 8: tightly related items;
- 12: control internals or compact rows;
- 16: ordinary component padding or local group separation;
- 20–24: card or panel padding;
- 32: subsection separation;
- 40–48: major product regions;
- 64–96: marketing section rhythm.

These are starting points, not a requirement to use every value.

Relationship rule:

```text
inside a group < between sibling groups < between sections
```

If all vertical gaps are equal, the hierarchy is probably unclear.

Density modes:

- compact: high-frequency tools, data grids, sidebars;
- standard: forms, dashboards, settings;
- spacious: marketing, onboarding, education.

Keep density internally consistent. A compact table next to an oversized card header often
feels accidental.

Treat page insets, grid gutters, surface padding, sibling gaps, and component internals as
separate roles. Exact canonical component values remain source-controlled even when they do
not match the surrounding composition scale.

## 6. Shape, borders, and depth

Use radius by scale and purpose:

- compact controls: 6–10 px;
- inputs and ordinary action surfaces: around 8–10 px;
- cards and floating panels: around 12–20 px;
- circle only for avatars, dots, icon targets, or genuinely circular affordances.

Do not make every rectangle a pill.

Containment ladder:

1. whitespace;
2. alignment;
3. subtle background change;
4. border;
5. shadow;
6. strong color.

Use enough force to make grouping, affordance, and hierarchy immediately legible. The
least force is not always the right force: rich tools, media surfaces, selected objects,
and floating interaction layers may need depth, tint, or strong contrast. Do not flatten
useful affordances in the name of restraint.

A boundary may also support an expressive or experiential system, such as a coherent
window metaphor or tactile object language. Keep it when that responsibility is specific
and consistent; remove it when parent and child repeat the same job.

Shadows should explain elevation:

- small: button or compact floating control;
- medium: menu, popover, tooltip;
- large: dialog or elevated presentation surface.

Avoid multiple unrelated shadow styles on the same screen.

## 7. Icons and visual media

Icons:

- classify the symbol as a functional icon, content identity, or expressive illustration
  before choosing its source;
- use the host or canonical family for functional controls; a bespoke expressive family
  may differ when the product direction makes that contrast deliberate;
- use one coherent icon family;
- keep stroke/fill character consistent;
- use 16 px for dense inline utility, 20 px for standard controls, and 24 px only when
  emphasis warrants it;
- keep icon-only targets at least 40–44 CSS px where practical;
- pair ambiguous icons with a label or tooltip;
- use directional icons consistently with reading direction;
- never use emoji as functional interface icons unless the product language demands it;
- do not place every icon, initial, or number in a tinted square by habit; use a container
  when it establishes a target, fallback identity, category, state, or coherent object
  language;
- do not substitute an initial or sequence number for a meaningful icon, portrait, label,
  or ordered-list marker.

Visual media:

- classify material visuals as product evidence, data visualization, explanatory diagram,
  or illustration and read `information-graphics.md`;
- use real product imagery, diagrams, screenshots, or meaningful illustration in their
  declared role;
- preserve aspect ratios;
- plan focal-point cropping at each breakpoint;
- avoid generic stock photos that do not support the claim;
- provide useful alt text or empty alt for decorative imagery;
- decide explicitly whether media is structurally important, supporting, or absent;
- when references are media-led, do not replace imagery with text-only boxes and rules;
- do not use abstract diagrams as product proof or turn prose into decorative nodes and
  connectors.

## 8. State language

Every interactive component needs the applicable states:

- default;
- hover;
- pressed or active;
- focus-visible;
- disabled;
- loading;
- selected or checked;
- open or expanded;
- invalid or error;
- success or completed;
- destructive confirmation.

State changes should remain recognizable without motion. Loading should preserve layout
where possible. Disabled controls should remain legible and should not be used as the only
way to explain why an action is unavailable.

## 9. Foundation checklist

- [ ] Semantic tokens, not scattered literals
- [ ] Clear neutral text hierarchy
- [ ] Palette mode is explicitly preserve, repair, or create
- [ ] Achromatic, warm, and cool candidates were compared when neutral selection changed
- [ ] Typeface preserved or replaced through a rendered comparison
- [ ] Regular weight is the baseline; heavy weights remain scarce and purposeful
- [ ] Loaded font files cover every used weight and style without synthesis
- [ ] Semantic colors used only for meaning
- [ ] Accent, action, selection, focus, status, and chart roles are not accidentally coupled
- [ ] Three or fewer local type levels
- [ ] Spacing communicates grouping
- [ ] Page geometry and outer insets have content-based reasons
- [ ] Every visible distance has one owner
- [ ] Radius matches scale and purpose
- [ ] Borders and shadows explain structure
- [ ] One coherent icon language
- [ ] Material visuals have a declared evidence, explanation, data, or illustration role
- [ ] Light and dark roles preserve hierarchy
- [ ] All relevant states are specified
