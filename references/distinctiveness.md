# Product-specific composition and intention

Use this reference for every page, section, dashboard, marketing surface, redesign, or
visual critique. Its purpose is not novelty. Its purpose is to prevent a plausible but
interchangeable interface assembled from statistical defaults.

## Contents

1. The accumulation inquiry
2. Common generic-output patterns
3. Evidence brief
4. Intentionality review
5. Composition divergence
6. Visual grammar
7. Dashboard rules
8. Marketing rules
9. Content and state credibility
10. Comparative review
11. Contrastive examples
12. Evidence review
13. Exceptions and exact-component work

## 1. The accumulation inquiry

Familiar patterns are often useful. A card, a sidebar, a sans-serif face, or a line chart
is not a defect by itself. Generic drift appears when several unexamined defaults
accumulate and none are justified by the product.

Use counts only to locate repetition:

- note an isolated pattern only when it harms the task, hierarchy, credibility, identity,
  or supplied direction;
- inspect related repetition in rendered context and compare at least one viable
  alternative;
- revisit the governing idea when patterns accumulate across categories, but do not
  redesign from counts alone;
- fix fabricated proof, status, or data regardless of count.

Do not make an interface strange merely to make it different. Preserve learned
conventions for navigation, controls, semantics, and accessibility. Put product identity
into information structure, composition, density, content, and a few deliberate visual
decisions.

## 2. Common generic-output patterns

### Statistical-average composition

- centered headline, short subcopy, two calls to action, and a floating product mockup;
- three equal features, three testimonials, three pricing plans, then a repeated CTA;
- a row of four KPI cards followed by a large chart and a narrow “needs attention” rail;
- chart, activity feed, weather or conditions, and recent-events panels added as filler;
- every section using the same width, padding, card treatment, and vertical gap;
- forced symmetry even when the information has unequal priority.
- diagram-shaped layouts made from letter tiles, colorful paths, satellite cards, and
  central destination boxes when the positions and connectors encode no recoverable
  relationship.

### Treatment monoculture

- every region becoming a bordered, rounded card;
- rounded containers nested inside more rounded containers;
- the same medium radius, one-pixel border, and soft shadow on every surface;
- pills used for navigation, actions, metadata, filters, and decoration;
- every list item beginning with an icon inside a tinted rounded square;
- blue, violet, teal, or green used as a generic technology signal;
- gradients, glows, blurred orbs, glass surfaces, or grid backgrounds without a product
  reason;
- decorative status dots or “live” indicators that do not communicate verified state.

### Generic typography and copy

- the repository default or Inter used without an intentional type hierarchy;
- oversized heavy headlines whose content does not justify their visual weight;
- uppercase tracked eyebrows above most headings;
- vague claims such as “transform your workflow,” “unlock insights,” “seamless,”
  “all-in-one,” or “next-generation”;
- redundant label, description, hint, and caption text;
- explanatory prose added only to occupy a layout or restate what media already shows;
- invented metrics, testimonials, logos, users, activity, or operational status.

### Motion theater

- reveal-on-scroll applied to every section;
- repeated hover lift, bounce, wiggle, or glow;
- continuous floating decoration or animated gradients;
- staggered card entrances that add delay but no relationship;
- motion that hides weak hierarchy or makes frequent controls feel performative.

### Implementation tells

- a new spacing value for every local problem;
- identical `gap`, radius, shadow, and padding values across unrelated regions;
- repeated component markup with only icon and copy changed;
- placeholder-perfect content with no long labels, missing values, errors, or permissions;
- generic icon sets standing in for a real information model;
- a polished happy path without empty, loading, stale, offline, or failed states.

### Anti-slop monoculture

- oversized grotesk headings paired with tiny tracked uppercase mono labels;
- off-white, black, cobalt, and a single dark inversion section used as a complete identity;
- rulers, section numbers, coordinates, crop marks, and measurement labels as decoration;
- sparse editorial split sections repeated regardless of the content;
- ledgers and thin horizontal rules substituted for richer interaction;
- huge empty regions defended as “breathing room” without a focus or reading benefit;
- full-width solid CTA bands and dark utility footers;
- subtraction used to remove useful depth, imagery, affordance, or compound interaction.

Audit the host codebase for these signals as rigorously as ordinary AI slop. Established
repetition is evidence of prevalence, not necessarily quality.

## 3. Evidence brief

Before composing a new page or materially redesigning one, write:

```text
User:
Repeated task:
Decision this view supports:
Primary objects:
Most costly mistake:
Data or content source:
Freshness and trust requirements:
Primary action:
What may be deferred:
```

If these answers are unknown, make the minimum explicit assumptions and label mock data.
Do not fill uncertainty with decorative panels.

For marketing surfaces also record:

```text
Audience:
Specific promise:
Desired feeling:
Governing idea:
Proof available:
Evidence carrier and content burden:
Visual vocabulary:
Largest objection:
Conversion:
```

## 4. Intentionality review

Review only material, repeated, or high-salience decisions. Small implementation details
do not need a written defense.

Name one or more responsibilities:

- operational — action, navigation, state, or feedback;
- informational — hierarchy, context, explanation, or proof;
- perceptual — grouping, focus, continuity, or rhythm;
- expressive — identity, voice, emotion, or metaphor;
- experiential — atmosphere, pacing, delight, or world-building.

Then ask:

1. What is this decision responsible for?
2. Why is this form appropriate for that responsibility?
3. How does it connect to the governing idea and visual vocabulary?
4. What becomes weaker if it is removed or replaced?
5. Does it compete with a more important decision?

“It looks good” is not enough. A coherent expressive or experiential role is valid even
when it does not change task completion. The goal is low arbitrariness, not low complexity.

## 5. Composition divergence

For a new page or major redesign, produce three terse, text-only composition candidates
before styling. Each candidate must organize the same evidence differently.

Example for an operations dashboard:

```text
A — exception queue first; compact totals in the queue header; trend below
B — site table first; health and freshness embedded in column headers; exceptions pinned
C — dominant production timeline; incidents placed directly on the timeline; records below
```

Reject two candidates with a task-based reason. Choose the one that best supports the
decision, not the one that looks most familiar.

Skip this exercise for isolated component fixes and trivial copy or token changes.

The chosen composition must contain material decisions that would not transfer unchanged
to an unrelated product. Examples include object-specific grouping, domain units, a
workflow-driven control band, a risk-specific comparison, or data freshness integrated at
the point of use.

## 6. Visual grammar

Define a visual grammar before local polish:

- list the surface, depth, radius, color, media, icon, and decorative treatments that
  belong to the governing idea;
- create containment when it adds an operational, informational, perceptual, expressive,
  or experiential role;
- record the containment tree for the dominant object; parent and child boundaries must
  name different jobs;
- keep peer surfaces coherent while allowing hierarchical surfaces to differ;
- use pills, icon containers, gradients, glass, glow, blur, grids, strong shadow, and
  saturated color when their responsibility and relationship to the grammar can be named;
- avoid nested boundaries whose responsibilities duplicate each other;
- define a coherent radius and depth system appropriate to the chosen character;
- allow dense or maximal compositions when many elements share a narrow, intelligible
  vocabulary;
- do not impose arbitrary limits on cards, treatments, text, or effects;
- do not flatten a rich reference into rules and whitespace merely to appear restrained;
- do not copy a reference's surface style when its underlying product reason does not
  transfer.

## 7. Dashboard rules

A dashboard must support a named decision. It is not a showcase of chart components.

- Lead with exceptions, throughput, finance, capacity, compliance, or another real
  decision model.
- Do not default to a four-card KPI strip. Consider an inline metric rail, ledger, table
  summary, exception banner, annotated chart, or values embedded beside the affected
  object.
- Give the primary metric more span only when it changes the user's next action.
- Every chart must answer a stated question and connect to a decision, record, or action.
- Do not add an activity feed unless users audit or act on that history.
- Do not add weather, conditions, a map, or “system health” merely to fill a secondary
  column.
- Show source, scope, timestamp, timezone, freshness, stale state, and failure behavior
  where users rely on live data.
- Use color directionally only when “good,” “bad,” and “neutral” are defined for that
  metric.
- Prefer a decisive work surface over a mosaic of equally decorated summaries.

## 8. Marketing rules

Do not treat hero, logo strip, three features, testimonials, pricing, FAQ, and final CTA
as a mandatory sequence.

- Include a section only when it advances the argument or resolves an objection.
- Let available proof determine the sequence.
- Use concrete product behavior, screenshots, examples, or sourced outcomes for proof.
- Use illustration for identity, atmosphere, emotion, or metaphor when that role is
  explicit; never present it as product or quantitative evidence.
- Allocate explanation across copy, product evidence, diagrams, interaction, and links.
  Do not add prose when another medium already carries the same information.
- Avoid a dashboard mockup that is too small or implausible to communicate anything.
- Do not invent customer quotes, company logos, usage numbers, or performance claims.
- Vary section density because the argument changes, not to alternate background colors.
- Hide the brand mark during review. If the page could represent any competitor without
  structural changes, revise it.

## 9. Content and state credibility

- Label fixtures and generated examples as sample data.
- Never imply real-time status unless the implementation has a real source and freshness
  model.
- Use believable variation: long names, zeros, missing values, partial permissions, and
  uneven item counts.
- Distinguish zero, unknown, unavailable, stale, and not applicable.
- Remove any metric whose source, comparison period, or user consequence cannot be named.
- Remove any panel, copy block, graphic, or effect that does not materially strengthen
  clarity, proof, hierarchy, recognition, identity, pacing, emotion, or interaction.

## 10. Comparative review

After the first complete pass:

1. Outline every surface.
2. Name each boundary's operational, informational, perceptual, expressive, or experiential
   role; compare with one redundant boundary removed.
3. Remove icons that encode nothing and contribute neither recognition nor identity.
4. Remove duplicated labels and repeated summaries.
5. Consolidate equal-priority regions that are not truly peers.
6. Compare a quieter and a more expressive treatment for contested regions. Keep the
   version whose clarity, character, and consequence best fit the governing idea.
7. Check the interface in grayscale and with brand marks hidden.
8. Re-run the static, responsive, accessibility, and state gates.

Do not remove useful affordances, focus indicators, status semantics, or error context in
the name of minimalism. Do not preserve arbitrary decoration in the name of expressiveness.

## 11. Contrastive examples

Use these as reasoning examples, not style recipes.

| Pattern | Arbitrary use | Intentional use |
| --- | --- | --- |
| Shadow or offset border | Applied to every card to simulate polish | Explains elevation, overlap, selection, or a coherent physical metaphor |
| Eyebrow or overline | Generic category phrase above every heading | Supplies sequence, scope, provenance, or a recurring editorial voice |
| Letter or number tile | Invented identifier attached to every item | Real identity fallback, durable object token, or identifier used elsewhere |
| Glow | Generic technology atmosphere | Focus, active state, emitted light, or part of a coherent environmental system |
| Extra copy | Restates the heading or fills empty space | Resolves an objection, supplies proof, changes voice, or controls pacing |
| Dense composition | Mixes unrelated gradients, glass, cards, and ornament | Uses many elements from one narrow visual vocabulary |
| Diagram | Places prose in boxes joined by decorative curves | Encodes named entities, relationships, direction, order, values, or state |
| Quiet composition | Removes depth and evidence to appear restrained | Concentrates attention because product media, hierarchy, or interaction carries the work |

## 12. Evidence review

Do not self-award a numerical distinctiveness score. Record observable evidence:

- three decisions that would not transfer unchanged to another product;
- the governing idea, visual vocabulary, and responsibilities of material decisions;
- how copy, evidence, diagrams, interaction, and illustration divide the explanatory load;
- the topology and task reason;
- host patterns preserved, questioned, and rejected;
- ordinary-slop and anti-slop signals found and resolved;
- component and variant choices that changed the experience;
- realistic content, system states, and stress cases;
- rendered narrow, medium, and wide comparisons.

A fabricated data or proof item is an automatic failure. If the reasons are merely
“modern,” “clean,” “premium,” “balanced,” or “best practice,” revise the direction.

## 13. Exceptions and exact-component work

Canonical components should remain exact. Do not mutate a button, table, dialog, or
control merely to make it more distinctive. Apply this reference to page composition,
content, density, and the selection of components around those canonical assets.

An established repository may intentionally use cards, pills, Inter, or a particular
radius. Preserve decisions that are deliberate and sound. Question them when accumulation
creates ordinary slop, anti-slop, weak affordance, or conflict with explicit references.
