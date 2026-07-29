# Layout and composition

Use this reference for page design, layout refinement, or visual audit. Layout quality is
judged by relationships, not by whether every box is centered.

Read `spatial-system.md` before choosing containers, maximum widths, outer insets, gaps,
padding, margins, density, or breakouts. This reference covers composition; the spatial
reference supplies the mandatory decision and ownership workflow.

## Contents

1. Establish the page thesis
2. Create structural anchors
3. Build hierarchy
4. Use spacing relationally
5. Balance without forced symmetry
6. Compose responsive transformations
7. Prevent common failure patterns
8. Static quality gate
9. Diagnostic heuristics

## 1. Establish the page thesis

Before arranging elements, answer:

- Who is here?
- What are they trying to accomplish?
- What must they understand first?
- What is the primary action?
- What information supports that action?
- What can be deferred, collapsed, or moved to another view?

Write the order as plain content before styling. A dashboard may be:

```text
Account context → current health → urgent work → trend → detailed records
```

A marketing page may be:

```text
Promise → evidence → mechanism → use cases → risk reversal → action
```

If the order is unclear in text, layout will not fix it.

## 2. Create structural anchors

Choose deliberate global geometry after completing the spatial brief:

- one content container system;
- predictable outer gutters;
- a consistent column grid;
- stable vertical landmarks;
- a controlled set of section widths;
- clear shell behavior for header, sidebar, utility rail, and content.

Use this only as fallback exploration when the host system provides no suitable model:

| Context | Container | Columns | Gutter |
| --- | --- | --- | --- |
| Dense product | fluid with sensible max | 12 or task-specific | 16–24 |
| Standard product | 1120–1280 max | 12 | 20–32 |
| Editorial/business | 1120–1280 max | 12 | 24–40 |
| Reading column | 640–760 | 1 | 20–32 |

Respect an existing repository's container before introducing another.

Do not place every region in the same container merely to preserve this table. A dashboard
may use a reading rail for its heading and a wider work rail for its table or visualization.
Calculate outer insets from the usable main region after persistent navigation and panes.

Alignment rule: major titles, filters, content panels, and tables should share a small
number of visible edges. Accidental 4–12 px misalignments are more damaging than a modest
change in card styling.

## 3. Build hierarchy

Use multiple signals that agree:

- order;
- position;
- scale;
- whitespace;
- tone;
- weight;
- containment;
- density.

A practical product hierarchy:

1. page identity and essential status;
2. primary action;
3. task controls and filters;
4. primary content;
5. secondary context;
6. metadata and tertiary actions.

Do not allow multiple regions to compete at level one. Large type, saturated color, deep
shadow, and central placement all create emphasis; spend them selectively.

Cards are not hierarchy by themselves. Prefer section structure and whitespace when a
bordered surface does not add grouping, interaction, or contrast.

## 4. Use spacing relationally

Create a local spacing ladder for each composition:

```text
4–8: icon/label or tightly coupled metadata
12–16: items within one component
20–24: groups within one surface
32–48: product sections
64–96: major marketing sections
```

Apply these tests:

- proximity: could a user tell which label belongs to which value?
- cadence: do related repeated rows use the same rhythm?
- separation: is a section boundary stronger than its internal gaps?
- edge consistency: do sibling panels share padding?
- negative space: is the quiet area serving hierarchy or merely empty?

Avoid margin chains where child, parent, and section spacing accidentally add together.
Prefer a parent `gap` for repeated siblings.

Use `spatial-system.md` to classify the relationship, assign one owner, and distinguish
surface padding from sibling gaps, section separation, and page-edge insets.

## 5. Balance without forced symmetry

Symmetry is appropriate for:

- sign-in or focused single-task pages;
- paired choices with equal weight;
- centered announcements or modal decisions.

Asymmetry is appropriate for:

- primary content plus supporting context;
- dashboards with a dominant work area;
- narrative marketing compositions;
- comparison where one option is intentionally emphasized.

Evaluate visual mass, not identical dimensions:

- dark regions feel heavier than light ones;
- imagery feels heavier than text;
- large numbers and saturated actions pull attention;
- dense tables need breathing room around them;
- a sidebar needs enough content weight to justify its width.

If one side feels heavy, adjust scale, density, tone, or whitespace before inventing a
decorative counterweight.

## 6. Compose responsive transformations

Do not merely shrink a desktop screen.

For each region, choose one:

- preserve;
- wrap;
- stack;
- reorder;
- collapse;
- summarize;
- scroll;
- move into an overlay;
- remove only if genuinely nonessential.

Common transformations:

- persistent sidebar → drawer or compact rail;
- inline filters → filter sheet with active-count summary;
- multi-column stats → two-column then single-column;
- wide table → prioritized columns, horizontal scroll, or record cards;
- split hero → stacked copy then visual;
- button group → wrap or full-width primary action;
- secondary detail panel → tabs, disclosure, or subsequent section.

Base breakpoints on content failure, not device names. Check at widths just before and just
after each breakpoint.

## 7. Prevent common failure patterns

### Uniform card soup

Symptom: every idea becomes an equal rounded card.

Fix: identify the dominant region, remove unnecessary containers, vary span and density
according to importance, and use section headings or dividers for weaker groups.

### Spacing without hierarchy

Symptom: 24 px between everything.

Fix: define inside-group, between-group, and between-section gaps.

### Universal contained wrapper

Symptom: one centered maximum-width wrapper and side padding govern headings, prose,
tables, charts, and operational surfaces alike.

Fix: select contained, fluid, mixed-rail, or edge-to-edge geometry for each major region.
Retain the wrapper only when every affected region benefits from the same width policy.

### Doubled outer inset

Symptom: navigation, shell, page, section, and surface padding accumulate at the same edge.

Fix: calculate the usable main region, trace every ancestor contributing space, and assign
the outer inset to one owner.

### Centering as a default

Symptom: centered headings, centered body copy, centered actions, centered cards.

Fix: use left alignment for scanning and task execution; reserve centered alignment for a
single focused message or deliberate brand moment.

### Competing primaries

Symptom: multiple large or saturated actions.

Fix: keep one primary action per decision context; downgrade or relocate the rest.

### Decorative imbalance

Symptom: gradients or floating art are used to fill unexplained empty space.

Fix: correct the grid, content width, and visual mass first.

### Edge drift

Symptom: card headers, tables, charts, and page titles begin on slightly different axes.

Fix: reveal a temporary grid overlay and normalize container/padding values.

### Accidental overflow

Symptom: long labels, tables, toolbars, or translated content break the shell.

Fix: set `min-width: 0` where needed, define wrapping/truncation behavior, and test stress
content rather than ideal strings.

## 8. Static quality gate

Score each item 0, 1, or 2:

- purpose and primary action;
- hierarchy;
- alignment;
- grouping;
- spacing rhythm;
- width model and useful-space allocation;
- effective outer insets and spacing ownership;
- visual balance;
- density consistency;
- state completeness;
- responsive transformation;
- content resilience.

Interpretation:

- 18–20: ready for motion and polish;
- 14–17: fix weak items first;
- 10–13: composition needs another pass;
- below 10: revisit the page thesis and structure.

A high score does not override a blocker such as inaccessible navigation or clipped
content.

## 9. Diagnostic heuristics

Use these quick tests:

- Blur test: can the major groups and emphasis still be perceived?
- Grayscale test: does hierarchy survive without brand color?
- Outline test: do too many nested boxes appear?
- Edge test: how many distinct left and right anchors exist?
- Squint test: does one intended region dominate?
- Five-second test: can a new user name the page and next action?
- Long-content test: double labels, names, and values.
- Empty-content test: does the structure remain intentional without data?
- Zoom test: check 200% and reflow.
- Keyboard test: does focus order match visual order?
