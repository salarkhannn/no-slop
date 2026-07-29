---
name: no-slop
description: Design, build, refine, or review distinctive web interfaces with product-specific composition, content-driven page geometry, deliberate semantic component and variant selection, disciplined spacing ownership, hierarchy, responsive behavior, accessible interaction, exact canonical components, and purposeful motion. Use for dashboards, admin tools, SaaS and data-heavy product UI, business pages, marketing sites, component work, visual QA, generic or AI-patterned UI remediation, animation naming or discovery, motion audits, and implementation reviews in an existing or new frontend codebase.
---

# No Slop

Build interfaces that are calm, legible, coherent, and exact. Treat layout, components,
interaction, and motion as one system, but solve them in that order.

## Core mandate

1. Make the static interface excellent before adding motion.
2. Preserve the host codebase's framework, architecture, package manager, and conventions.
3. Use the bundled canonical component implementation when exact matching is requested.
4. Choose components by interaction semantics and variants by hierarchy; never stop at the
   first plausible primitive or its default variant.
5. Select contained, fluid, mixed-rail, or edge-to-edge geometry from content needs; never
   apply a centered max-width wrapper or generous page inset by reflex.
6. Give every visible distance one owner and keep spacing, type, color, radius, elevation,
   icon, and motion decisions tokenized.
7. Prefer hierarchy and alignment over decoration.
8. Make every interaction keyboard-operable, focus-visible, responsive, and reduced-motion safe.
9. Implement only when the user asks to build or change. Keep audits and reviews read-only.
10. Do not ship statistical-average composition. Every page needs a product-specific thesis.

## Resolve instruction precedence

Use this order when requirements conflict:

1. Explicit user requirements and supplied references
2. Accessibility, semantics, and functional correctness
3. Explicit exact-component contract
4. Existing repository architecture and design system
5. Product identity and content needs
6. Platform conventions
7. Defaults in this skill

State any meaningful conflict. Do not silently redesign an exact component or silently
replace an established repository primitive.

## Choose an operating mode

| User intent | Mode | Action |
| --- | --- | --- |
| Create, implement, redesign, refine, fix | Build/refine | Inspect, plan, implement, verify |
| Match the canonical component set exactly | Exact component | Copy the asset implementation, then adapt only integration seams |
| Review layout, spacing, hierarchy, symmetry | Layout audit | Report evidence and fixes; do not edit |
| Find places that could benefit from motion | Motion discovery | Return at most 5–7 ranked opportunities plus rejected candidates |
| Improve motion across a codebase | Motion audit | Produce a prioritized audit and self-contained implementation plans |
| Review a motion diff or implementation | Motion review | Apply the standards strictly; approval is earned |
| “What is the animation called?” | Vocabulary | Name the effect, distinguish close alternatives, give prompt-ready wording |

If a request spans modes, perform them in this order: layout audit or static refinement,
component conformance, responsive/accessibility verification, motion, final review.

## Start every codebase task with reconnaissance

Inspect only what is needed to establish:

- framework, renderer, routing, styling approach, and package manager;
- existing tokens, primitives, component library, icons, fonts, and motion library;
- page shell, breakpoints, density, and repeated layout patterns;
- relevant tests, lint/build commands, and browser or screenshot tooling;
- user-owned worktree changes that must be preserved.

Run `node scripts/scan-ui.mjs <repo>` for a quick read-only inventory when Node is
available. Treat its findings as leads, not proof. Read `references/platform-adapters.md`
before changing a non-React or non-utility-CSS codebase.

Do not introduce a second styling system or motion dependency merely because it is
familiar. Reuse the host stack unless the requested result cannot be achieved cleanly.

## Route to the minimum needed references

- Read `references/design-foundations.md` for tokens, typography, color, depth, icons,
  density, and visual voice.
- Read `references/layout-composition.md` for any page, section, dashboard, or layout audit.
- Read `references/spatial-system.md` for any page or section composition, spacing or
  density change, container or max-width decision, dashboard, table, chart, page shell,
  breakpoint, or spatial audit. Use `scripts/audit-spacing.mjs` as a source-level lead
  generator and `assets/spatial-rules.json` for the fallback scale and decision vocabulary.
- Read `references/distinctiveness.md` for every page, section, dashboard, marketing
  surface, redesign, or visual critique. Skip it only for isolated component work and
  pure animation vocabulary.
- Read `references/component-contracts.md` before adding, changing, or matching components.
- Read `references/component-selection.md` whenever choosing a component or variant. Use
  `scripts/recommend-component.mjs` for ambiguous choices and
  `scripts/extract-component-variants.mjs` before relying on a default variant.
- Read `references/component-catalog.md` when selecting canonical components, building a
  component gallery, or translating a public component name to its source asset.
- Read `references/product-patterns.md` for dashboards, admin, SaaS, tables, settings,
  workflows, and business applications.
- Read `references/marketing-patterns.md` for landing, company, product, pricing, and
  conversion pages.
- Read `references/responsive-accessibility.md` for responsive behavior, forms, overlays,
  keyboard interaction, and final verification.
- Read `references/motion-language.md` to identify or describe an effect.
- In Vocabulary mode, also read `references/motion-standards.md` only when the user asks
  for implementation values, physics, or accessibility behavior.
- Read `references/motion-standards.md` before proposing, implementing, or reviewing motion.
- Read `references/audit-playbook.md` for read-only audits and scoring.
- Read `references/output-contracts.md` for plan, audit, review, and handoff formats.

Do not load all references by default.

## Apply the static quality gate

Before motion, confirm:

- one dominant purpose and primary action per view;
- a readable title → context → action → content hierarchy;
- a content-based contained, fluid, mixed-rail, or edge-to-edge model for every major region;
- a concrete reason for every page inset, maximum width, and breakout;
- consistent container, grid, and alignment lines;
- spacing that expresses relationship, has one owner, and uses shared tokens;
- balanced visual mass without forced mirroring;
- clear grouping, section boundaries, and scan paths;
- restrained surfaces, borders, radii, shadows, and color roles;
- the most semantically precise available component and a hierarchy-appropriate variant,
  not merely the first plausible component or its default;
- no card, pill, icon-tile, gradient, glass, or equal-grid monoculture;
- credible data and content without fabricated proof, metrics, or live status;
- at least three composition decisions specific to this product and task;
- complete empty, loading, error, disabled, focus, selected, and destructive states;
- sensible behavior at narrow, medium, wide, zoomed, and content-stress conditions.

If any item fails, fix it before adding delight. Read `references/layout-composition.md`
for exact checks.

## Decide the spatial system before styling

For a new page, major section, dashboard, or material layout change:

1. Calculate the usable region after persistent navigation, panes, and safe areas.
2. Complete the compact spatial brief in `references/spatial-system.md`.
3. Classify each major region as prose, form, list, table, visualization, canvas, or mixed.
4. Compare the leading macro model with at least one close alternative.
5. Select contained, fluid, mixed-rail, or edge-to-edge by width payoff and failure risk.
6. Define the page, reading, work, and full-bleed rails that are actually needed.
7. Assign outer inset, surface padding, sibling gap, and exceptional offset ownership.
8. Map relationship roles to host tokens; preserve exact component internals.
9. Render narrow and extra-wide views. Inspect effective insets and useful width, not only
   the CSS values.

Do not force unlike regions through one wrapper. A constrained title can share a page with
a fluid ledger or chart. Generous whitespace, centered content, asymmetry, negative margins,
and full-bleed regions are permitted only when their content or interaction benefit can be
named.

## Select components before rendering them

Exactness does not guarantee appropriateness. Unless the user explicitly names a component,
classify the need before opening component source:

1. Record intent, immediate versus submitted application, option or action count, content
   complexity, scope, frequency, importance, reversibility, space, and responsive behavior.
2. Retrieve the relevant family from `assets/component-selection.json`. Do not scan the
   catalog top-to-bottom and accept the first match.
3. For an ambiguous decision, compare the leading candidate with at least one close
   alternative. Disqualify semantic or behavioral mismatches before judging appearance.
4. Choose the component, then separately choose its variant.
5. Inspect actual variant axes with
   `node scripts/extract-component-variants.mjs <component...>`.
6. Render the decision in context and run the selection review in
   `references/component-selection.md`.

Use `node scripts/recommend-component.mjs --list-intents` to discover supported intents.
The recommender is a shortlist aid, not an automatic final decision. Keep the compact
selection record internal unless the user asks for rationale.

## Use canonical components exactly

The canonical React source lives in:

```text
assets/component-kit/
├── manifest.json
├── dependencies.json
├── tokens/globals.css
└── react/
    ├── components/ui/
    ├── hooks/
    └── utils/
```

“Exact” includes DOM structure, dimensions, padding, gaps, typography, color roles,
radii, borders, shadows, icon size and placement, state styling, focus treatment,
variants, and transition behavior. It does not mean preserving an incompatible import
alias or framework wrapper.

Exactness applies only to bundled component and token assets. Page shells, charts,
dashboard arrangements, marketing sections, and templates are newly composed unless a
matching canonical asset is present. Never describe a new page composition as canonical.

For exact component work:

1. If the user did not name the component, complete the selection pass above.
2. Locate the public component in `references/component-catalog.md`, then confirm its
   source mapping in `assets/component-kit/manifest.json`.
3. Run `node scripts/component-deps.mjs <component...> --markdown` to resolve the exact
   local files and external packages, then copy that dependency set.
4. Install only the external packages actually imported by the selected files.
5. Install or merge `assets/component-kit/tokens/globals.css` without weakening existing
   app-wide styles.
6. Load Inter with the repository's font mechanism, preserving the canonical type metrics.
7. Adapt path aliases, module directives, routing links, and host composition only.
8. Preserve the public prop and variant contract unless the user requests an API change.
9. Render every meaningful state and compare it at representative viewport widths.
10. Record any necessary deviation with the reason and visible consequence.

For React hosts and standalone React-capable demos, render the copied component source.
Do not manually recreate its markup or CSS. A plain-HTML imitation is not exact, even when
the default screenshot looks close. Bundle the canonical React source into a self-contained
artifact when a single HTML file is required.

Component catalogs and showcase pages must use the 49 public component names from
`references/component-catalog.md`. Keep helper assets internal. Render overlays, menus,
selects, tooltips, notifications, and toasts with their real primitives and verify their
open behavior; a static drawing of an overlay does not satisfy exactness.

For Vue, Svelte, Solid, native CSS, or another stack, port the contract rather than the
React syntax. Preserve semantics and rendered output. Read
`references/platform-adapters.md`.

Never invent a “close enough” substitute when the requested canonical asset exists.
If behavioral parity for focus, keyboard, portals, or collision handling cannot be
verified, disclose the gap instead of claiming exactness.

## Compose pages deliberately

Choose the page branch from the user's goal:

- Product UI: dense but calm, task-first, strong shell, explicit filters, trustworthy data,
  clear selection and bulk actions. Read `references/product-patterns.md`.
- Business/marketing: narrative rhythm, proof near claims, controlled section contrast,
  conversion hierarchy, and real content shapes. Read `references/marketing-patterns.md`.

Avoid statistical-average layouts: the default marketing sequence, the four-card KPI
strip, the chart-plus-activity dashboard, nested rounded panels, icon tiles for every
item, decorative live status, and identical spacing or treatment across unrelated
regions. One familiar pattern is not a defect; an unjustified accumulation is. Use
content priority to determine composition and run the workflow in
`references/distinctiveness.md`.

Do not use one centered max-width container as a universal composition. Constrain readable
or focused regions, let width-hungry task regions use available space, and use mixed rails
when the same page contains both. Calculate side insets from the remaining main region
after navigation and panes rather than from the raw viewport.

## Add motion only when it earns its place

Motion must provide feedback, preserve spatial continuity, reveal state, explain change,
or occasionally add delight. Reject animation that merely announces that animation exists.

Frequency governs intensity:

- 100+ times per day: no animation or near-instant feedback.
- Tens of times per day: subtle and fast.
- Occasional: standard transition.
- Rare or milestone: expressive motion may be appropriate.

Default constraints:

- pointer-down feedback begins immediately;
- most UI transitions complete within 300 ms;
- use ease-out for entrances, ease-in-out for movement, and springs for gesture-driven
  or interruptible motion;
- menus and popovers originate from their trigger; dialogs originate from the viewport;
- animate `transform` and `opacity` where possible;
- never use `transition: all`, `scale(0)`, or default `ease-in` for ordinary UI;
- preserve continuity when interrupted and inherit gesture velocity;
- provide a gentler reduced-motion equivalent.

Read `references/motion-standards.md` for values and `references/motion-language.md`
for names.

## Build and refine workflow

1. Restate the interface purpose, primary user, primary task, and constraints.
2. Inspect the host system and relevant screens.
3. Write the evidence brief from `references/distinctiveness.md`.
4. Write a compact content and interaction hierarchy before styling.
5. For a new page or major redesign, compare three text-only compositions and select one
   for a task-based reason.
6. Complete the spatial brief; select macro models, rails, inset owners, density,
   responsive transformations, tokens, and a surface treatment budget.
7. Compose the largest regions before local component polish.
8. Run the component selection pass for each ambiguous interaction and inspect the chosen
   source-derived variants.
9. Use canonical or repository primitives; complete all interaction states.
10. Run `node scripts/audit-spacing.mjs <repo>`, then run the static quality,
    distinctiveness, and spatial gates. Confirm static candidates in rendered context.
11. Perform a subtractive pass, removing unnecessary boundaries, icons, labels, and effects.
12. Add only justified motion.
13. Verify semantics, keyboard, focus, contrast, reduced motion, overflow, zoom, and content
   stress.
14. Run relevant lint, type, unit, build, and visual checks.
15. Report what changed, what was verified, and any deviations or remaining risks.

For high-fidelity work, take screenshots at narrow, medium, and wide widths. Compare
geometry before color: container edges, baselines, component dimensions, gaps, wrapping,
and visual mass.

## Audit and review workflow

Audits are read-only unless the user separately requests implementation.

1. Establish the reviewed surface and evidence.
2. Inspect representative routes, components, states, and viewport widths.
3. Run `node scripts/audit-ui.mjs <repo>` and
   `node scripts/audit-spacing.mjs <repo>` if useful.
4. Inspect effective outer insets, width use, rails, and ancestor spacing at narrow and
   extra-wide viewports.
5. Inventory generic-output signals and judge their accumulation in rendered context.
6. Separate observed defects from inferred risks.
7. Rank by impact: blocker, high, medium, polish.
8. Cite files and lines when reviewing source.
9. Give a concrete correction, not a taste-only complaint.
10. Keep motion discovery to 5–7 opportunities and show at least 3 rejected candidates.
11. Use `references/audit-playbook.md` and the appropriate format in
   `references/output-contracts.md`.

## Definition of done

A build is done only when:

- the primary task is obvious;
- the layout passes the static quality gate;
- the spatial brief and spatial quality gate pass, with no unexplained page inset,
  maximum width, doubled spacing owner, or trapped width-hungry region;
- the distinctiveness score is at least 9/12 with no zero and three product-specific
  decisions can be named;
- selected components meet their contract;
- states and responsive transformations are complete;
- keyboard, focus, semantics, contrast, and reduced motion are verified;
- purposeful motion does not mask layout or interaction defects;
- relevant checks pass, or failures are explicitly reported.

An audit is done only when findings are evidence-backed, prioritized, and directly
actionable.
