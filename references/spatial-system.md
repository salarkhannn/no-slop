# Spatial system

Use this reference for page geometry, containers, outer insets, padding, gaps, margins,
density, or spacing review. Make spatial decisions from content relationships and task
needs. Do not apply a familiar wrapper or spacing value merely because it looks safe.

## Contents

1. Write the spatial brief
2. Classify relationships
3. Assign spacing ownership
4. Select the macro layout model
5. Establish rails and breakouts
6. Map intent to tokens
7. Handle density and responsive change
8. Allow justified exceptions
9. Prevent recurring failures
10. Audit source and rendered geometry
11. Spatial quality gate

## 1. Write the spatial brief

Complete this brief before styling a new page or materially changing a layout:

```text
Usable region:
  viewport minus persistent navigation, panes, safe areas, and reserved controls
Primary task:
Density:
Content regions:
  region → prose | form | list | table | visualization | canvas | mixed
Width payoff:
  what becomes easier when each region gets wider?
Width risk:
  what becomes harder to read, compare, or associate?
Layout model:
  contained | fluid | mixed-rail | edge-to-edge
Rails:
  page, reading, work, and full-bleed edges
Outer inset:
  owner, token, breakpoint behavior, and reason
Maximum width:
  affected regions and reason
Breakouts:
  regions allowed to exceed their parent rail
Local spacing roles:
  cluster, item, group, section, structural
Exceptions:
  optical or integration corrections with reasons
```

Keep the brief internal unless the user asks for rationale. Do not use “standard,” “clean,”
“modern,” or “breathing room” as a reason without naming the user or content benefit.

For an ambiguous layout, compare the leading model with at least one close alternative.
Choose by task performance, content behavior, and failure risk rather than visual habit.

## 2. Classify relationships

Choose a relationship before choosing a value:

| Role | Relationship | Examples |
| --- | --- | --- |
| Cluster | One indivisible cue | icon and label, status dot and text, value and unit |
| Item | Parts of one object | title and description, label and control, row metadata |
| Group | Related sibling items | fields in a form section, toolbar controls, card content |
| Section | Distinct content groups | summary and details, filters and results |
| Structural | Major page regions | shell and content, primary and supporting panes |

Maintain these invariants:

```text
cluster ≤ item < group < section ≤ structural
```

- Use the same token for the same relationship in the same density mode.
- Make a section boundary visibly stronger than the gaps inside the section.
- Keep nested spacing no larger than the spacing that contains the nested group unless an
  intentional breakout creates emphasis.
- Change spacing when the semantic relationship changes, not merely to avoid repetition.
- Treat repeated rows, cards, fields, and navigation items as a cadence; equivalent items
  should not drift by a few pixels.

The inequality is relational, not a demand that every role use a unique value. Compact
interfaces may share adjacent roles when borders, typography, or structure preserve the
relationship.

## 3. Assign spacing ownership

Give every visible distance one owner:

| Distance | Owner | Preferred mechanism |
| --- | --- | --- |
| Inside an exact component | Canonical component | Preserve source dimensions and tokens |
| Inside a repository component | Component or surface | Component token or padding |
| Between sibling elements | Their parent | Flex/grid `gap` or layout primitive |
| Between page regions | Page composition | Section gap or grid track |
| Between content and usable region edge | Shell or page layout | Outer-inset token |
| Reading width | Reading rail | `max-inline-size` |
| Intentional breakout or overlap | Composition seam | Named bleed/offset mechanism |

Rules:

- Keep reusable components free of external margins.
- Let a surface own its internal padding.
- Let a stack, inline, or grid parent own spacing between its children.
- Let the shell own safe-area and persistent-navigation insets.
- Reset native heading and paragraph margins when an explicit stack owns text rhythm.
- Do not combine parent `gap`, child margins, and section padding for the same relationship.
- Remember that the visible separation can be the sum of gap, margin, padding, and
  distributed alignment.
- Prefer logical properties such as `padding-inline`, `margin-block`, and `inset-inline`
  when direction can change.
- Use `margin-inline: auto` for deliberate alignment or distribution, not as an unexplained
  centering reflex.

Canonical component spacing is exempt from normalization. Audit the integration space
around the component without changing its exact internal contract.

## 4. Select the macro layout model

### Contained

Use when content has a natural readable or scannable maximum:

- prose, documentation, and editorial copy;
- focused forms and settings;
- low-density workflows;
- narrow comparisons whose associations weaken when stretched.

Constrain the relevant region, not necessarily the whole page.

### Fluid

Use when additional horizontal space improves the task:

- dense tables and ledgers;
- monitoring surfaces and timelines;
- large charts, maps, or canvases;
- multi-pane work where simultaneous context matters.

Do not make text lines fluid merely because the data region is fluid.

### Mixed rail

Use when regions have different natural widths:

- constrained title and explanation plus a wider table;
- readable filter summary plus a full work surface;
- contained marketing copy plus full-width evidence or media;
- dashboard overview plus a broad operational ledger.

Use shared grid lines so the page remains coherent. Mixed width does not mean arbitrary
left edges.

### Edge-to-edge

Use when the available screen is the working material:

- maps, editors, media, diagrams, and immersive canvases;
- mobile surfaces that intentionally meet the device edge;
- full-width bands that establish a page or brand region.

Preserve safe areas, interaction clearance, and readable inner rails. Edge-to-edge
backgrounds do not require edge-to-edge text.

### Selection questions

Ask:

1. What specific information or control becomes more useful with additional width?
2. What association, line length, or scan path degrades when the region becomes wider?
3. Does persistent navigation already reduce or inset the usable main region?
4. Does one wrapper impose the same width policy on unlike regions?
5. Is the maximum width derived from content behavior or copied from a familiar template?
6. Would a left-aligned, fluid, or mixed-rail alternative better support the task?
7. What happens at unusually wide windows, split-screen widths, zoom, and localization?

Do not treat contained as the universal default. Respect an established host layout when
it fits the content; otherwise record why a different model is needed.

## 5. Establish rails and breakouts

Define only the rails the page needs:

- Shell rail: the usable region after navigation, panes, and safe areas.
- Page rail: the recurring outer alignment for primary regions.
- Reading rail: the maximum width for sustained text.
- Work rail: the width available to task controls, data, and visualization.
- Full-bleed rail: the shell or viewport edge for deliberate breakouts.

Align top-level regions to these rails. Use local tokens inside the regions instead of
forcing every small element onto the page grid.

A breakout must:

- name the rail it leaves and the rail it joins;
- preserve a clear alignment relationship;
- solve a content or hierarchy need;
- define narrow-width behavior;
- avoid accidental horizontal scrolling.

Common valid compositions:

```text
reading rail: title, description, explanation
work rail: toolbar, chart, table
```

```text
page rail: section content
full-bleed rail: background, media, or canvas
reading rail: text inside the full-bleed region
```

## 6. Map intent to tokens

Use the host design system's spacing scale first. If none exists, establish a restrained
fallback scale from `assets/spatial-rules.json` and expose semantic roles rather than
scattering literals.

Prefer semantic names:

```css
--space-cluster:
--space-item:
--space-group:
--space-section:
--space-structural:
--inset-page:
--inset-page-compact:
--measure-reading:
--measure-work:
```

Map component tokens separately:

```css
--button-padding-inline:
--table-cell-padding-block:
--dialog-padding:
```

Do not force one numeric value across unrelated roles. Do not create a new value for every
local problem. A local literal is acceptable only when a token would misrepresent a rare,
documented integration seam.

## 7. Handle density and responsive change

Choose compact, standard, or spacious density from task frequency and content, then keep
the relationship ladder coherent within that mode.

Responsive rules:

- Calculate outer insets from the usable region, not the raw viewport.
- Change gutter size when content fails, not because a device label was reached.
- Reduce outer insets before shrinking essential controls or text.
- Let fluid work regions gain width while preserving reading measures.
- Replace, stack, or collapse panes when their minimum viable widths no longer fit.
- Test immediately before and after every layout change.
- Avoid copying desktop vertical whitespace unchanged to narrow screens.
- Consume platform or scaffold safe-area insets once; do not add a second equivalent inset.

## 8. Allow justified exceptions

Use optical adjustment to correct perceived imbalance, not to hide a structural problem.

An exception must:

- follow the host scale when possible;
- be smaller than the structural distance it corrects;
- have a visible reason, such as glyph weight, icon bounds, bleed, or source parity;
- remain stable across relevant states and breakpoints;
- not create a second competing alignment rail.

Annotate an unavoidable literal near the declaration:

```css
/* spatial-exception: align the asymmetric logo's visible mark to the text rail */
```

Do not use an exception to justify a random page inset, max-width, margin chain, or density
change.

## 9. Prevent recurring failures

### Universal wrapper

Symptom: one centered `max-width` wrapper with side padding contains every page region.

Correction: classify each region and choose contained, fluid, mixed-rail, or edge-to-edge.

### Double inset

Symptom: shell, page, section, and surface padding accumulate at the same edge.

Correction: assign one owner to the outer inset and inspect the full ancestor chain.

### Width cap without a beneficiary

Symptom: a dashboard, table, or chart stops growing while useful horizontal space remains.

Correction: state what the cap protects. Remove or relocate it if no relationship benefits.

### Whitespace as automatic polish

Symptom: large page padding is added to make a screen feel premium despite reducing task
capacity.

Correction: identify whether whitespace supports focus, reading, grouping, or balance. If
none applies, return the space to the task.

### Full width without structure

Symptom: content stretches edge-to-edge and relationships become hard to track.

Correction: preserve reading measures, grid rails, pane proportions, and local grouping.

### Nested value soup

Symptom: nearby rules introduce many one-off values such as 17, 22, 26, and 30 px.

Correction: classify the relationship, assign an owner, map it to a token, and keep only
documented optical exceptions.

### Breakpoint reset

Symptom: mobile overrides replace desktop spacing with unrelated values rather than a
coherent density transformation.

Correction: define how each semantic role changes across the content failure point.

## 10. Audit source and rendered geometry

Run:

```bash
node scripts/audit-spacing.mjs <repo>
```

Use `--json` for structured output, `--scale=0,4,8,...` to supply the host scale, and
`--include-canonical` only when intentionally reviewing protected source.

Treat static findings as review prompts. Confirm them in rendered context.

At narrow, medium, wide, and extra-wide widths:

1. Reveal or overlay the intended rails.
2. Measure the usable main region after persistent shell elements.
3. Record effective left and right insets for each top-level region.
4. Inspect every ancestor contributing padding or margin to those insets.
5. Compare repeated gaps, surface padding, row heights, and alignment edges.
6. Check whether additional width would improve tables, charts, panes, or comparisons.
7. Check whether constrained text remains readable and whether wide data remains usable.
8. Test 320 CSS px reflow, 200% zoom, text-spacing overrides, long labels, localization,
   and empty/loading/error states.
9. Verify pointer targets are at least 24 × 24 CSS px or have sufficient clearance.

Do not fail a layout merely for using generous whitespace, a maximum width, asymmetry, a
negative margin, or a literal. Report the evidence, the content consequence, and whether a
documented reason exists.

## 11. Spatial quality gate

- [ ] The usable region excludes persistent shell elements and safe areas
- [ ] Every major region has a selected width model
- [ ] Every max-width and outer inset has a content-based reason
- [ ] Unlike regions are not trapped in one wrapper without justification
- [ ] Reading, work, page, and full-bleed rails are explicit where needed
- [ ] Each visible distance has one owner
- [ ] The relationship ladder is perceptible
- [ ] Repeated relationships reuse tokens
- [ ] Canonical component internals remain exact
- [ ] Optical exceptions are rare and documented
- [ ] No accidental nested or doubled insets remain
- [ ] Narrow and extra-wide layouts were both inspected
- [ ] Zoom, text spacing, localization, and content states preserve the layout

