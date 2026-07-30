---
name: no-slop
description: Design, build, refine, or review distinctive web interfaces with product-specific visual direction, content-shaped composition, deliberate component and variant selection, compound interaction patterns, disciplined spacing, responsive behavior, accessible interaction, exact canonical components, and purposeful motion. Use for dashboards, admin tools, SaaS and data-heavy product UI, business pages, marketing sites, component work, visual QA, generic AI-slop remediation, anti-slop pattern remediation, animation discovery, motion audits, and implementation reviews in existing or new frontend codebases.
---

# No Slop

Create interfaces that are useful, visually authored, and credible. Correctness is required,
but correctness alone is not design quality. Solve product structure, visual direction,
composition, components, responsive behavior, and states before motion polish.

## Non-negotiable mandate

1. Preserve the host framework, architecture, package manager, data flow, and user-owned
   code. Do not automatically preserve its visual style.
2. Audit the host visual language before extending it. Treat repeated ordinary-slop and
   anti-slop signals as prompts for rendered comparison, not automatic defects. Keep,
   revise, or reject them from product evidence and user consequence.
3. Follow explicit user references and requested character above inherited visual defaults,
   while preserving accessibility and functional correctness.
4. Write an intention and visual-direction brief before a new page or material redesign.
5. Compare three structurally different composition concepts. Rearranging the same
   title/cards/table skeleton does not count.
6. Select every visible interaction by semantics, then select its variant by hierarchy,
   frequency, risk, density, and context. A default variant is a choice, not an absence of
   choice.
7. Use compound interaction patterns when the task requires them. Do not reduce rich
   workflows to a title, filters, table, and buttons by habit.
8. Preserve local symmetry among true peers. Use asymmetry to express hierarchy, not as
   unexplained drift.
9. Allow quiet, dense, tactile, editorial, playful, media-led, layered, or technical visual
   systems when product evidence supports them. Do not make quiet minimalism the universal
   fallback.
10. Differentiate routes by their primary object and decision. A shared shell must not make
    every page the same header/control-band/table template.
11. Never present a self-awarded score, fabricated metric, invented status, or mock audit as
    proof of quality. Validate with rendered and behavioral evidence.
12. Run static audits as lead generators, confirm findings in rendered context, and test the
    design against unrelated scenarios before calling the method general.
13. Treat the inherited typeface and weight distribution as visual decisions. Preserve
    them only when their character, metrics, available weights, and product fit survive a
    representative rendered comparison.
14. Make every visible container earn its boundary. Nest surfaces only when the child adds
    a distinct operational, informational, perceptual, expressive, or experiential role;
    otherwise flatten the boundary and express structure with alignment and spacing.
15. Treat the canonical component palette as an exact component contract, not a default
    product palette. Preserve, repair, or create the host color system from evidence.
16. Choose visual media from the reader's question and available evidence. Do not turn
    prose into decorative cards, nodes, connectors, charts, or diagrams merely to create
    visual interest.

## Resolve instruction precedence

When requirements conflict:

1. Explicit user requirements and supplied references
2. Accessibility, semantics, safety, and functional correctness
3. Exact component or brand contract explicitly requested
4. Genuine established brand decisions supported by repeated evidence
5. Product, task, content, and data needs
6. Existing visual defaults
7. This skill's fallback guidance

Repository architecture has high implementation precedence. Repository visual style does
not. Record meaningful conflicts instead of silently inheriting or replacing them.

## Choose an operating mode

| User intent | Mode | Action |
| --- | --- | --- |
| Create, implement, redesign, refine, fix | Build/refine | Inspect, challenge, compose, implement, verify |
| Match bundled components exactly | Exact component | Copy canonical source; adapt integration seams only |
| Review layout, visual style, components, or UX | UI audit | Report evidence and corrections; do not edit |
| Find useful motion opportunities | Motion discovery | Return 5–7 at most plus rejected candidates |
| Improve motion across a codebase | Motion audit | Prioritized audit and executable plans |
| Review a motion implementation | Motion review | Apply standards strictly |
| Name an effect | Vocabulary | Name, distinguish, and provide prompt-ready wording |

For mixed requests, use this order: static audit/refinement, component conformance,
responsive/accessibility, motion, final evidence review.

## Start with reconnaissance and visual challenge

Inspect only what is needed to establish:

- framework, routing, styling, package manager, tokens, primitives, icons, fonts, and motion;
- shell, page families, breakpoints, density, layout and interaction patterns;
- tests, lint/build commands, browser or screenshot tooling, and user-owned changes;
- repeated visual decisions and whether they are product-specific or generic defaults.

Run `node scripts/scan-ui.mjs <repo>` when useful. For visual risk leads run:

```bash
node scripts/audit-ui.mjs <repo>
node scripts/audit-component-use.mjs <repo>
node scripts/audit-spacing.mjs <repo>
node scripts/audit-color.mjs <repo>
```

Treat output as prompts for inspection, never as automatic defects.

Create a host-style decision:

```text
Preserve:
Question:
Reject:
Reason:
```

Preserve real identity, established user expectations, and sound primitives. Question
slop such as generic bento grids, floating mockups, glows, or interchangeable dashboards.
Also question anti-slop clichés such as giant grotesk headlines, tiny uppercase mono
eyebrows, off-white/black/cobalt palettes, measurement marks, ruled ledgers, sparse
editorial split sections, enormous unused regions, and solid full-width CTA bands. Read
`references/visual-direction.md`.

## Route to the minimum references

- Any page, redesign, or visual review: `visual-direction.md`,
  `composition-grammar.md`, `layout-composition.md`, and `distinctiveness.md`.
- Spacing, rails, density, containers: `spatial-system.md`.
- Visual tokens and character: `design-foundations.md`.
- Palette selection, theming, color roles, and data visualization: `color-systems.md`.
- Component choice: `component-selection.md`; use `recommend-component.mjs` and
  `extract-component-variants.mjs`.
- Canonical integration: `component-contracts.md` and `component-catalog.md`.
- Rich task patterns: `compound-patterns.md`.
- Peer geometry and visual balance: `symmetry-balance.md`.
- Product applications: `product-patterns.md`.
- Marketing and business pages: `marketing-patterns.md`.
- Diagrams, charts, product evidence, and illustration: `information-graphics.md`.
- Responsive behavior and accessibility: `responsive-accessibility.md`.
- Motion naming: `motion-language.md`.
- Motion implementation/review: `motion-standards.md`.
- Audits: `audit-playbook.md`.
- Deliverables: `output-contracts.md`.
- Cross-domain regression cases: `evaluation.md`.
- Non-React adaptation: `platform-adapters.md`.

Do not load every reference by default.

## Write the evidence and visual-direction briefs

For a new page or material redesign, record:

```text
User and repeated task:
Decision this view supports:
Primary objects:
Costly mistake:
Content/data source and trust:
Primary action:
What can be deferred:

Product truth and governing idea:
Audience state and desired feeling:
Topology and focal anchor:
Density:
Symmetry:
Surface and depth, including containment tree:
Typography, including typeface decision and weight budget:
Color ownership and host mode — preserve, repair, or create:
Base family, accent, contrast, modes, semantic states, and chart behavior:
Evidence carrier and content burden:
Visual vocabulary and deliberate rule breaks:
Interaction richness:
Reference traits to carry:
Host patterns to preserve/question/reject:
```

Do not use adjectives such as “clean,” “modern,” “premium,” or “minimal” as sufficient
direction. Tie each choice to the audience, object, task, identity, content, or reference.

## Compare structural composition concepts

Produce three terse concepts for the same evidence. Each must differ in at least four:

- topology;
- focal anchor and first scan;
- navigation/work-surface relationship;
- density and information grouping;
- symmetry model;
- surface/depth model;
- media strategy;
- compound interaction pattern;
- narrow-screen transformation.

Examples of different concepts are database canvas, split-pane inspector, grouped issue
board, masonry knowledge space, narrative demo, or record workspace. “Cards above table”
versus “table above cards” is not a structural difference.

Reject two concepts with task- and content-based reasons. Choose one because it improves a
decision or interaction, not because it looks less familiar. Read
`references/composition-grammar.md`.

## Choose visual media before styling

Classify each material visual as one of:

- product evidence — a real interface, output, demonstration, or annotated artifact;
- data visualization — values, comparisons, distributions, trends, or correlations;
- explanatory diagram — sequence, hierarchy, causality, architecture, or responsibility;
- illustration — identity, atmosphere, emotion, or metaphor.

Use a graphic only when spatial or visual encoding helps the reader compare, trace, locate,
recognize, or understand a relationship. For data visualizations and explanatory diagrams,
write the reader question, takeaway, entities, relationships, direction or order, values or
states, and reason spatial arrangement matters before drawing. Produce a monochrome
semantic skeleton before applying the visual direction.

Prefer real product evidence when the claim is about product behavior. Keep illustration
when it has an explicit expressive or experiential responsibility, but never present it as
proof or let it imply data or relationships that do not exist. Reject diagram-shaped
decoration whose labels, connectors, positions, colors, or shapes encode nothing
recoverable. Read `references/information-graphics.md`.

## Select components and variants before hand-writing UI

For every visible interactive need:

1. Record intent, application, count, content, scope, frequency, importance, risk, space,
   responsive behavior, and host availability.
2. Prefer a sound repository-native primitive.
3. If the host lacks one and the target is React-capable, prefer the bundled canonical
   component over a hand-written substitute.
4. Compare close candidates when semantics are ambiguous.
5. Choose the component, then separately choose its variant.
6. Inspect real variant axes with
   `node scripts/extract-component-variants.mjs <component...>`.
7. Render the complete interaction and state matrix in context.

Use `node scripts/recommend-component.mjs --list-intents` to discover intents. The tool
returns a shortlist, variant guidance, and conflicts; it does not make the final decision.

For rare, principal marketing or milestone actions, Fancy Button must be considered and
recorded as chosen or rejected. Do not use it repeatedly or in dense product UI. Navigation
still uses a real link contract.

Never hand-write a generic button, select, dropdown, tabs, dialog, status badge, or other
covered primitive merely because it is faster. A visually sound host primitive takes
precedence; otherwise use the canonical kit or document why it cannot satisfy the need.

## Use canonical components exactly

Canonical React source lives in `assets/component-kit/`. Exactness covers semantics, DOM
where behavior depends on it, geometry, type, color roles, borders, radii, shadows, icons,
states, focus, variants, and transitions.

Workflow:

1. Map the public name through `component-catalog.md` and the manifest.
2. Resolve files with `node scripts/component-deps.mjs <component...> --markdown`.
3. Copy only required source, hooks, utilities, tokens, and external packages.
4. Adapt imports, client directives, routing links, and host composition only.
5. Preserve public props and variants unless the user requests an API change.
6. Render every meaningful state and width.
7. Disclose any necessary deviation and its visible consequence.

Do not imitate canonical components with ad hoc markup. For non-React hosts, port the full
semantic and behavioral contract. A page layout is not canonical unless its source exists.

## Compose rich product interfaces

Choose topology from the object and task: canvas, database, board, timeline, document,
gallery, masonry collection, split pane, record workspace, or justified hybrid.

Use compound patterns when they reduce task steps or preserve context:

- tokenized filter builder;
- command menu;
- grouped or nested work list;
- object peek/inspector;
- record-property grid;
- inline editing;
- selection and bulk-action bar;
- contextual menu;
- board, gallery, or masonry collection;
- split-pane list/detail;
- media-led cards with real content.

A table requires a comparison, selection, sort/filter, action, and responsive model. A
title plus table is not inherently a complete page. Across sibling routes, vary topology
when their primary objects and decisions differ. Read `product-patterns.md` and
`compound-patterns.md`.

## Compose marketing pages from the argument

Familiar patterns are allowed when evidence justifies them. A centered hero is not
automatically slop; a centered hero with generic copy, two generic CTAs, a floating mockup,
and fabricated proof is.

- Organize claims around real product behavior and buyer objections.
- Put legible product evidence or a real demonstration near major claims.
- Allocate explanation across copy, product evidence, interaction, familiar conventions,
  and links; do not make prose carry information a clearer visual can carry.
- Do not display mock quality scores, audit panels, fake usage, status, customer logos,
  testimonials, or performance metrics as proof.
- Give the principal conversion action an explicit component and variant decision.
- Consider expressive canonical variants for rare hero or final conversion actions.
- Use media, illustration, diagrams, or product crops only in their declared role:
  evidence, explanation, or expression.
- Let sections change topology as the argument changes.

Read `marketing-patterns.md`.

## Enforce symmetry and balance

Peer components must share applicable geometry: height, padding, label baseline, icon
placement, radius family, state treatment, and action alignment. Paired regions must share
an explicit alignment contract. Repeated cards must expose the same metadata slots or
declare intentional variation.

Use asymmetry for hierarchy, narrative, or content shape. Never let it arise from accidental
wrapping, arbitrary offsets, inconsistent variants, or different component internals.
Check short, long, empty, and translated content. Read `symmetry-balance.md`.

## Add motion only when it earns its place

Motion must provide feedback, continuity, state explanation, direct manipulation, or rare
delight. Frequency governs intensity. Most UI transitions finish within 300 ms. Use exact
properties, causal origins, interruption-safe behavior, and a reduced-motion equivalent.
Never use motion to create interest in a structurally flat page.

## Build/refine workflow

1. Establish purpose, user, task, objects, content source, constraints, product truth, and
   governing idea.
2. Inspect architecture, design system, representative routes, and rendered screens.
3. Audit the host visual style; preserve, question, or reject repeated patterns.
4. Compare the current typeface with at least one credible alternative when its intent or
   fit is unclear. Render representative title, body, control, numeric, and stress text.
5. Write intention, evidence, and visual-direction briefs, including typeface and
   color-system decisions, a weight budget, visual vocabulary, content burden, and
   containment tree.
6. When creating or materially repairing a palette, render achromatic, warm-neutral, and
   cool-neutral candidates in the same representative screen. Record why two lose.
7. Compare three structurally different composition concepts and reject two.
8. Classify each planned material visual. For any diagram or data visualization, complete
   the semantic skeleton and reject it if text, a table, or real product evidence is clearer.
9. Choose topology, rails, spacing ownership, density, surface model, responsive
   transformations, and symmetry contracts.
10. Identify compound patterns that preserve context or reduce steps.
11. Select a component and variant for every visible interaction.
12. Implement largest regions first, then states and local polish.
13. Render narrow, medium, and wide views with long, sparse, empty, loading, error, and
    permission states.
14. Run static audits and manually confirm candidates.
15. Perform a responsibility pass: outline material copy, media, surfaces, effects, and
    graphics; name each operational, informational, perceptual, expressive, or experiential
    role; compare alternatives where roles duplicate or conflict.
16. Perform typography, content-economy, and symmetry passes. In ordinary product regions,
    regular-weight text should normally outnumber semibold/bold text.
17. Add only justified motion.
18. Verify semantics, keyboard, focus, contrast, zoom, overflow, and reduced motion.
19. Run lint, type, unit, build, and relevant visual checks.
20. Report evidence, commands, viewports, states, deviations, and risks.

## Audit workflow

Audits are read-only unless implementation is separately requested.

1. State scope, routes, states, viewports, and evidence limitations.
2. Inspect source and rendered output.
3. Challenge both ordinary slop and anti-slop accumulation.
4. Audit governing idea, decision responsibility, content burden, visual-media choice,
   topology, focal point, useful-space allocation, route differentiation, compound
   interaction opportunities, component/variant choices, symmetry, states, and responsive
   transformations.
5. Run static lead generators and confirm each reported item.
6. Report evidence → user consequence → correction → verification.
7. Rank by blocker, high, medium, and polish. Do not assign severity from taste alone.

## Evidence-backed definition of done

A build is done only when the following are demonstrated, not self-scored:

- screenshots or rendered inspection at relevant narrow, medium, and wide widths;
- a documented visual direction and host-style preserve/question/reject decision;
- a governing idea, visual vocabulary, and responsibility for material copy, media,
  effects, and graphics;
- a documented preserve/repair/create color decision, rendered candidate comparison when
  the neutral system changed, and distinct accent, action, selection, focus, state, and
  chart roles;
- a rendered typeface decision, explicit weight hierarchy, and no synthetic or
  indiscriminate bold;
- three structural concepts and task-based rejection of two;
- a route-specific topology and material product-specific decisions;
- component and variant records for visible interactions, including expressive CTA
  consideration when applicable;
- complete compound interactions and state behavior;
- a containment tree in which every visible nested boundary has a distinct role;
- a declared visual mode for material graphics, with a semantic skeleton for diagrams and
  data visualizations and no diagram-shaped decoration presented as explanation;
- no accidental peer asymmetry or unexplained empty region;
- credible content and proof;
- keyboard, focus, semantics, contrast, zoom, overflow, and reduced motion checks;
- relevant lint, type, test, build, and audit commands pass or are disclosed;
- blind evaluation cases are reviewed when changing the skill itself.

Never place an internal score in the shipped interface as evidence that the interface is
good. An audit is done only when its findings are observable, prioritized, and actionable.
