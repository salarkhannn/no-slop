# Component contracts

Use this reference before copying, porting, modifying, or reviewing a canonical component.
The files in `assets/component-kit` are the implementation authority.

## Contents

1. Meaning of exact
2. Asset map
3. Integration workflow
4. Allowed adaptation
5. Required states
6. Composition rules
7. Porting rules
8. Verification

## 1. Meaning of exact

Exact matching covers:

- semantic element and accessibility behavior;
- DOM and slot structure where it affects layout or state;
- dimensions, padding, gap, and alignment;
- typography token, line height, weight, and tracking;
- semantic colors, borders, radius, and shadows;
- icon family, glyph, size, optical alignment, and placement;
- focus ring and keyboard state;
- hover, pressed, selected, checked, open, disabled, loading, error, and destructive states;
- transition property, duration, easing, and transform origin;
- variant names, defaults, compound variants, and public props.

Pixel identity at one screenshot is insufficient if interaction states or responsive
behavior differ.

The exactness boundary ends at the provided assets. A page shell, chart, metric card,
dashboard layout, or marketing section is a new composition unless its implementation is
also present in the asset kit. It may be designed in the same visual language, but must not
be labeled canonical.

## 2. Asset map

Read `assets/component-kit/manifest.json` to locate categories and files.
Read `references/component-catalog.md` for the 49 public component names and their source
mapping. Do not expose helper assets as public components.

Key paths:

```text
assets/component-kit/tokens/globals.css
assets/component-kit/react/components/ui/*.tsx
assets/component-kit/react/hooks/*.ts
assets/component-kit/react/utils/*
assets/component-kit/dependencies.json
```

The token stylesheet is a complete Tailwind CSS v4 CSS-first theme with light and dark
semantic roles, typography, shadows, radii, and animation keyframes.

The implementation assumes:

- React and TypeScript;
- utility classes provided by the bundled theme;
- aliases for `@/components`, `@/hooks`, and `@/utils`;
- headless interaction primitives for complex widgets;
- one coherent icon package.

For React and React-capable standalone artifacts, exact integration means importing and
rendering the canonical source. Hand-authored HTML/CSS that resembles the source is a
visual approximation and must not be labeled exact.

When the deliverable must be one HTML file, bundle React, the selected source components,
their primitives, the token stylesheet, and the font into the file. Do not replace the
components with static markup to avoid bundling.

## 3. Integration workflow

1. Inspect the repository's existing component and token locations.
2. Identify the requested components and recursively trace local imports.
3. Copy only the necessary source, hooks, and utilities.
4. Install only external imports required by those files.
5. Merge the theme:
   - preserve the `@theme` token names used by components;
   - keep one utility-framework import;
   - extract token and keyframe blocks when the host owns reset or body styles;
   - never overwrite host body, reset, font, or color-scheme rules blindly;
   - identify whether the host or the kit owns dark-mode activation;
   - retain dark-mode mappings when dark mode is supported;
   - verify both themes after merging.
6. Adapt aliases and client/server boundaries.
7. Create a state matrix or story for verification.
8. Compare rendered output at relevant widths.
9. Run type, lint, build, interaction, and accessibility checks.

Never paste the whole kit into a repository when one component and two utilities suffice.

## 4. Allowed adaptation

Allowed without breaking exactness:

- import paths and file locations;
- framework-specific client directives;
- link or image wrappers;
- type-only syntax needed by the host version;
- event plumbing to existing application logic;
- token aliases that resolve to the same rendered value;
- portal mount target;
- test selectors and analytics attributes;
- composition wrappers outside the component boundary.

Requires explicit disclosure:

- changing icon family or glyph;
- changing interaction primitive;
- omitting a state;
- changing dimensions, spacing, radius, color, typography, or shadow;
- renaming or removing a variant;
- replacing an overlay pattern;
- simplifying responsive behavior;
- changing animation timing or origin.

Disallowed when the user asked for exactness:

- visual approximation;
- “cleaning up” distinctive details based on taste;
- substituting a repository primitive that renders differently without consent;
- merging several components into a generic abstraction before verifying parity.

## 5. Required states

Build the applicable matrix:

| State | Verify |
| --- | --- |
| Default | geometry, label, icon, contrast |
| Hover | feedback without layout shift |
| Pressed | immediate response and stable content |
| Focus-visible | visible ring, no mouse-only artifact |
| Disabled | behavior, cursor, contrast, explanation |
| Loading | layout stability and accessible name/status |
| Selected/checked | color plus non-color signal |
| Open/expanded | trigger state, placement, dismissal |
| Invalid | message association and error styling |
| Destructive | intent, confirmation, undo where appropriate |
| Empty | useful next action |
| Overflow | long label, long value, narrow width |

For overlays also test:

- initial focus;
- focus containment when modal;
- Escape dismissal;
- outside-click behavior;
- return focus;
- viewport collision and scroll;
- nested interactive content.

## 6. Composition rules

- Read `references/component-selection.md` before choosing among neighboring components or
  variants. Exact source fidelity does not excuse an inappropriate component choice.
- Choose the component from interaction semantics first. Choose its variant separately from
  local hierarchy, scope, risk, frequency, and density.
- Do not accept a source default merely because no prop is required. Confirm that the
  default expresses the intended context.
- Use the ordinary button for labeled actions and compact button for icon-dominant utility.
- Use one visual primary per action group.
- Keep field label, input, hint, and error in one semantic group.
- Use badges for compact classification, status badges for status, tags for removable or
  selected entities, and banners for page-level messages.
- Use alert for in-flow feedback, toast for transient confirmation, notification for richer
  actionable feedback, and modal only when interruption is necessary.
- Use dropdown for a menu of actions, select for choosing a value, popover for compact
  contextual content, drawer for secondary workflows, and modal for bounded decisions.
- Use tabs for peer views, segmented controls for a compact mode switch, accordion for
  progressive disclosure, and steppers for ordered progress.
- Tables need a reading and action model, not merely a grid of values.

## 7. Porting rules

When the host is not React:

1. Preserve rendered semantic elements and accessible relationships.
2. Replace headless primitives with an equivalent accessible primitive or implement the
   complete behavior.
3. Port tokens before porting component classes.
4. Preserve variant and state names where practical.
5. Preserve box geometry and visual selectors.
6. Recreate portals, focus management, keyboard navigation, and collision handling.
7. Verify the port against the React asset, not from memory.

Do not translate utility classes mechanically if the target framework's state or scoping
model changes their meaning.

## 8. Verification

Visual comparison order:

1. outer geometry and dimensions;
2. internal padding, gap, and baseline;
3. typography;
4. border, radius, and shadow;
5. icon and decoration;
6. color;
7. states and motion.

Use an overlay or image diff when browser tooling exists. Otherwise record computed styles
and bounding boxes for both reference and implementation.

Acceptance:

- no unexplained geometry difference;
- no missing state;
- no accessibility regression;
- no layout shift between states;
- no arbitrary token literal introduced;
- any necessary deviation documented.

Do not claim exactness without rendered evidence. If no canonical screenshot baseline is
available, verify computed styles, bounding boxes, and every applicable state against a
fresh render of the bundled asset.
