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

Aim for:

- quiet confidence rather than spectacle;
- compact, deliberate product density;
- neutral surfaces with semantic color used sparingly;
- crisp typography with short hierarchy jumps;
- subtle borders and shadows that explain containment;
- small radii on controls and moderate radii on larger surfaces;
- icons that clarify action, status, or object type;
- animation that reinforces structure.

The interface should look designed before it looks decorated. Remove ornamental gradients,
glows, glass effects, floating blobs, and excessive pills unless the product identity or
content explicitly calls for them.

## 2. Token architecture

Use four layers:

1. Raw: literal color, size, radius, font, and shadow values.
2. Semantic: `text-strong`, `bg-weak`, `stroke-soft`, `error-base`, and similar roles.
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

### Neutral hierarchy

Use semantic roles consistently:

- `text-strong-950`: titles, primary values, active labels;
- `text-sub-600`: body copy, supporting labels, ordinary metadata;
- `text-soft-400`: placeholders, timestamps, tertiary context;
- `text-disabled-300`: unavailable content only;
- `bg-white-0`: primary canvas and elevated surface;
- `bg-weak-50` or `bg-weak-25`: subtle grouped regions and hover fills;
- `bg-soft-200`: stronger muted background;
- `stroke-soft-200`: ordinary boundaries;
- `stroke-sub-300`: emphasized boundaries;
- `stroke-strong-950`: rare high-contrast boundary.

Do not use disabled contrast for ordinary secondary text.

### Semantic color

Reserve saturated roles for:

- primary: selected, focused, or principal action;
- success: completed or healthy state;
- warning: risk needing attention;
- error: failure, destructive action, or invalid input;
- information: neutral announcement or guidance.

Do not color an entire large region when an icon, status label, border, or compact tint
communicates the state. Never rely on color alone.

### Dark mode

Dark mode is a semantic remap, not a color inversion:

- preserve relative hierarchy;
- lower the apparent brightness of large surfaces;
- avoid pure white body text across large areas;
- ensure borders remain visible but quiet;
- retune shadows and translucent overlays;
- verify semantic tints independently.

## 4. Typography

The canonical scale has four functional families:

- `title-*`: display and page headings, medium weight;
- `label-*`: controls, navigation, key values, medium weight;
- `paragraph-*`: prose and explanatory copy, regular weight;
- `subheading-*`: compact uppercase or tracked section labels.

Canonical headline sizes run from 20/28 through 56/64. Labels and paragraphs cover
12/16, 14/20, 16/24, 18/24, and 24/32. Use the exact token in canonical components.

Rules:

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

Containment order:

1. whitespace;
2. alignment;
3. subtle background change;
4. border;
5. shadow;
6. strong color.

Use the least force that communicates the boundary.

Shadows should explain elevation:

- small: button or compact floating control;
- medium: menu, popover, tooltip;
- large: dialog or elevated presentation surface.

Avoid multiple unrelated shadow styles on the same screen.

## 7. Icons and imagery

Icons:

- use one coherent icon family;
- keep stroke/fill character consistent;
- use 16 px for dense inline utility, 20 px for standard controls, and 24 px only when
  emphasis warrants it;
- keep icon-only targets at least 40–44 CSS px where practical;
- pair ambiguous icons with a label or tooltip;
- use directional icons consistently with reading direction;
- never use emoji as functional interface icons unless the product language demands it.

Imagery:

- use real product imagery, diagrams, screenshots, or meaningful illustration;
- preserve aspect ratios;
- plan focal-point cropping at each breakpoint;
- avoid generic stock photos that do not support the claim;
- provide useful alt text or empty alt for decorative imagery.

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
- [ ] Semantic colors used only for meaning
- [ ] Three or fewer local type levels
- [ ] Spacing communicates grouping
- [ ] Page geometry and outer insets have content-based reasons
- [ ] Every visible distance has one owner
- [ ] Radius matches scale and purpose
- [ ] Borders and shadows explain structure
- [ ] One coherent icon language
- [ ] Light and dark roles preserve hierarchy
- [ ] All relevant states are specified
