# Color-system selection

Use for creating, extending, theming, or auditing a product palette. Select color from the
host, task, content, and state model. Do not treat a familiar neutral family plus a blue
accent as a universal product palette.

## Contents

1. Classify the host
2. Write the color brief
3. Compare palette candidates
4. Build the token architecture
5. Separate color responsibilities
6. Tune modes and accessibility
7. Decision-trace examples
8. Verification

## 1. Classify the host

Choose one mode before changing color:

### Preserve

Use when the repository has a coherent, accessible palette with deliberate brand or product
identity. Keep its primitive values, semantic mappings, mode behavior, and learned status
language. Add new roles through the host system instead of importing the canonical kit's
gray and blue defaults.

### Repair

Use when the host has recognizable identity but incomplete ramps, unclear semantic aliases,
missing dark-mode mappings, inaccessible pairings, or raw literals leaking into components.
Preserve the identity-bearing choices and repair the functional gaps.

### Create

Use when the repository is bare or its palette is only framework starter output. Establish
the system from rendered comparisons rather than picking a named color family in isolation.

Do not classify prevalence as intent. A repository can contain many blue utilities because
of a starter template, and one brand color can still be deliberate when it appears in the
logo, assets, product imagery, and repeated approved surfaces.

The bundled canonical component palette is an exact implementation contract. It is not the
automatic page, brand, or product palette outside those component boundaries.

## 2. Write the color brief

Record:

```text
Host mode — preserve | repair | create:
Color owners — chrome | brand | user content | state | data | media:
Product character and reading conditions:
Density and attention competition:
Existing brand assets and repeated product evidence:
Canvas and surface requirements:
Content or media color already present:
Accent responsibility:
Selection responsibility:
Focus responsibility:
Semantic states:
Data-visualization needs:
Supported modes and high-contrast behavior:
```

Name who owns chroma. A document tool may reserve it for user highlights and properties. A
media product may let imagery carry it. An operations tool may need state and chart colors
to remain more prominent than the brand accent.

## 3. Compare palette candidates

When the host mode is `create`, or when a `repair` changes the neutral family, render the
same representative screen with:

1. an achromatic neutral;
2. a low-chroma warm neutral;
3. a low-chroma cool neutral.

Keep content, geometry, type, density, and component states identical. Compare:

- which region remains the focal anchor;
- whether inactive navigation recedes without becoming illegible;
- whether sustained reading becomes tiring or muddy;
- whether surfaces remain distinguishable without excessive borders;
- whether media, avatars, user colors, or charts clash with the base family;
- whether the accent remains recognizable without dominating ordinary work;
- whether disabled, selected, hover, focus, error, and stale states remain distinct;
- whether dark mode preserves the same hierarchy.

Choose from the rendered task, not a swatch sheet. Record why the other candidates failed.
Do not describe the winner only as clean, modern, premium, calm, or timeless.

Use three independent controls:

```text
Base family — the hue and chroma behavior of ordinary chrome
Accent — the color used for a named interaction or identity role
Contrast — the separation between foregrounds, surfaces, borders, and controls
```

Do not increase saturation to compensate for weak hierarchy. Fix position, type, spacing,
surface separation, or contrast first.

Use OKLCH or another perceptually organized space when the host supports it. Treat
lightness, chroma, and hue as separate parameters; check gamut and final sRGB rendering.
Perceptual lightness does not replace contrast calculation against the actual background.

## 4. Build the token architecture

Keep raw values behind role-based aliases:

```text
primitive.neutral.*
primitive.accent.*
primitive.red.*

surface.canvas
surface.subtle
surface.raised
surface.overlay
surface.hover
surface.selected

fg.default
fg.muted
fg.subtle
fg.disabled
fg.on-accent

border.default
border.strong
border.selected

accent.solid
accent.muted
selection.background
selection.foreground
focus.ring
```

Primitive steps may use numbers. General semantic roles should not expose a raw scale step
such as `fg-muted-400`; that couples meaning to one palette and makes mode changes harder.
Exact canonical component tokens retain their published names and mappings.

Define only the surface levels the product needs. Do not create twelve neutral steps when
the interface has one canvas, one grouped surface, and one overlay. Conversely, do not force
a canvas, sidebar, panel, popover, and modal onto two values when users need their layers to
remain legible.

Keep component tokens rare and specific:

```text
button.primary.background.default
button.primary.background.hover
input.border.invalid
dialog.scrim
```

Prefer semantic roles until a component has a genuine state or contrast need that cannot be
expressed safely by the shared role.

## 5. Separate color responsibilities

### Accent, action, selection, and focus

Do not treat these as one color automatically:

- Accent expresses identity or an interaction family.
- Action prominence depends on local hierarchy and component variant.
- Selection communicates current state.
- Focus must remain visible against every adjacent surface and user-selected accent.

An accent may map to several roles only after each pairing and state is verified. Provide an
independent focus fallback when user theming or content color can make the accent unsuitable.

### Semantic state

Give success, warning, error, and information separate foreground, surface, border, and
emphasis mappings. Use saturated treatments only when urgency or scanning requires them.
Do not communicate state by hue alone; pair it with labels, icons, position, or pattern.

Do not assume green means good or red means bad without a domain definition. Financial,
capacity, environmental, and operational metrics may have different directionality.

### User content and media

Keep user-selected colors, avatars, covers, tags, and media distinct from application chrome.
Test missing images, very bright media, dark media, transparent assets, and user colors that
approach the product accent.

### Data visualization

Create chart palettes separately from interface accent and status colors:

- use sequential palettes for ordered magnitude;
- diverging palettes only when a meaningful midpoint exists;
- categorical palettes for unordered peers;
- reserve semantic colors for data with the same established meaning;
- test adjacent colors, not only each color against the canvas;
- add spacing, borders, direct labels, shapes, line styles, or patterns;
- provide a table or text alternative when the data matters.

Do not place ordinary text over chart colors unless the exact pairing passes. Do not make
the first chart series the same color as every primary button unless the shared meaning is
intentional.

## 6. Tune modes and accessibility

Design light and dark modes as separate mappings over shared roles, not as arithmetic
inversions:

- retune large-surface lightness and chroma;
- preserve focal hierarchy and surface relationships;
- reduce apparent brightness of large dark-mode surfaces;
- avoid pure white body text across large dark regions;
- retune borders, shadows, scrims, translucent layers, and media overlays;
- verify semantic and chart palettes independently in each mode;
- support forced colors or a documented high-contrast mode where the audience needs it.

Verify at minimum:

- 4.5:1 for ordinary text;
- 3:1 for large text;
- 3:1 for meaningful control boundaries, focus indicators, and graphics against adjacent
  colors;
- state and selection remain understandable without color;
- 200% zoom, text enlargement, grayscale, and relevant color-vision simulations.

Passing contrast is necessary, not sufficient. Muted text that technically passes can still
create fatigue when used for ordinary body content, and excessive contrast can make every
region compete.

## 7. Decision-trace examples

Use these as reasoning analogies. Do not copy their palette direction without matching host,
task, content, and state evidence. Each example includes a condition that would change the
decision.

### Example A — mature enterprise system

```text
Context: Add a dense employee history view to a token-rich enterprise application.
Color owners: Existing brand and semantic system; history entries also use status.
Host evidence: Repeated approved tokens across forms, tables, navigation, and dark mode.
Mode: Preserve.
Candidates: No new neutral candidates; compare only existing surface roles for the ledger.
Decision: Reuse host canvas, row hover, selected row, text, border, and status mappings.
Reject: Import canonical gray and blue because it would fork learned selection and status.
Verify: Dense rows, disabled permissions, focus, dark mode, and long histories.
Changes if: Existing status pairings fail or the new work reveals a missing elevation role;
repair that role centrally without replacing the palette.
```

### Example B — bare issue tracker

```text
Context: Create a keyboard-heavy triage workspace in a bare repository.
Color owners: Chrome, selection, operational state; issue labels are user content.
Mode: Create.
Candidates: Achromatic, low-chroma warm, and low-chroma cool on the same queue/inspector.
Decision: Choose the candidate where inactive navigation recedes, dense rows remain crisp,
and issue-label colors do not clash. Use one quiet accent for active selection.
Reject: Increasing accent saturation to make the page interesting; it competes with status.
Verify: Selected/unselected rows, stale and failed states, bulk selection, focus, both modes.
Changes if: Brand assets or a host editor theme establish a different base family.
```

### Example C — document editor

```text
Context: Create a knowledge editor with highlights, callouts, covers, and database fields.
Color owners: User content owns most chroma; chrome supports writing and navigation.
Mode: Create.
Candidates: Three neutral families beside representative colored documents and covers.
Decision: Keep ordinary chrome low-chroma and reserve application accent for selection and
the rare principal action. Give user colors their own content token family.
Reject: Saturated navigation and tinted cards; they compete with authored content.
Verify: Empty document, heavily highlighted document, missing cover, comments, dark mode.
Changes if: The product's brand explicitly makes colored chrome part of creation identity.
```

### Example D — customizable CRM

```text
Context: Create a relationship workspace whose members can select an accent.
Color owners: Stable neutral surfaces, replaceable accent, lifecycle state, avatars.
Mode: Create with a theme contract.
Candidates: Test several accent hues against each neutral candidate, not one favorite pair.
Decision: Keep selection and accent mappings replaceable; give focus an independent fallback.
Reject: Deriving warning, error, and charts from the user's accent.
Verify: Light/dark, low/high-chroma accents, selected records, focus, avatars, charts.
Changes if: The host already ships a tested theme generator; preserve its parameters.
```

### Example E — media-led collection

```text
Context: Create a gallery where photography determines recognition and selection.
Color owners: Media carries chroma; chrome, captions, selection, and overlays support it.
Mode: Create.
Candidates: Compare neutral families under bright, dark, monochrome, and missing media.
Decision: Use stable neutral surfaces and an outline plus non-color selected treatment.
Reject: A strong brand background behind every thumbnail; it distorts image comparison.
Verify: Failed images, transparent assets, captions, keyboard focus, dark/light media.
Changes if: The supplied brand reference intentionally uses a colored gallery environment.
```

### Example F — operational analytics

```text
Context: Create a capacity dashboard with ordered trends, categories, and incident states.
Color owners: Chrome, semantic incidents, sequential data, categorical data.
Mode: Preserve or repair the host; create only when no system exists.
Candidates: Compare base families while holding chart palettes and data constant.
Decision: Keep interface accent, incident status, and charts as separate token families.
Reject: Reusing primary-button blue for the first series and red/green for every comparison.
Verify: Adjacent series, direct labels, grayscale, color-vision simulation, both modes.
Changes if: Domain conventions establish a mandatory, documented directional color meaning.
```

## 8. Verification

Run `node scripts/audit-color.mjs <repo>` as an inventory and lead generator. Confirm every
candidate in source and rendered context.

For the final decision, record:

```text
Host mode:
Color owners:
Candidates rendered:
Chosen base family and task reason:
Rejected candidates and consequences:
Accent, selection, and focus mapping:
Semantic and chart mapping:
Light/dark behavior:
Contrast and non-color verification:
Canonical component boundary:
```

Review narrow, medium, wide, and high-contrast or forced-color conditions. Compare complete
screens with long, sparse, selected, disabled, error, loading, stale, and media-failure
states. A palette is not validated by a swatch sheet or a single hero screenshot.
