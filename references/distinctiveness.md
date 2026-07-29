# Product-specific composition

Use this reference for every page, section, dashboard, marketing surface, redesign, or
visual critique. Its purpose is not novelty. Its purpose is to prevent a plausible but
interchangeable interface assembled from statistical defaults.

## Contents

1. The accumulation test
2. Common generic-output patterns
3. Evidence brief
4. Composition divergence
5. Treatment budget
6. Dashboard rules
7. Marketing rules
8. Content and state credibility
9. Subtractive review
10. Evidence review
11. Exceptions and exact-component work

## 1. The accumulation test

Familiar patterns are often useful. A card, a sidebar, a sans-serif face, or a line chart
is not a defect by itself. Generic drift appears when several unexamined defaults
accumulate and none are justified by the product.

Use these thresholds during review:

- one isolated pattern: note it only if it harms the task;
- three related patterns: treat as generic drift and revise the composition;
- five or more patterns across categories: return to the evidence brief and redesign;
- any fabricated proof, status, or data: fix regardless of count.

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
Proof available:
Largest objection:
Conversion:
```

## 4. Composition divergence

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

The chosen composition must contain at least three decisions that would not transfer
unchanged to an unrelated product. Examples include object-specific grouping, domain
units, a workflow-driven control band, a risk-specific comparison, or data freshness
integrated at the point of use.

## 5. Treatment budget

Set a contextual treatment budget before local polish:

- list the surface, depth, radius, color, media, and decorative treatments the direction
  actually needs;
- create containment when it adds grouping, interaction, clipping, contrast, or elevation;
- record the containment tree for the dominant object; parent and child boundaries must
  name different jobs;
- keep peer surfaces coherent while allowing hierarchical surfaces to differ;
- use pills, icon containers, gradients, glass, glow, blur, grids, strong shadow, and
  saturated color only when their role can be named;
- avoid nested boundaries that do not add a new interaction or grouping level;
- define a small radius and depth system appropriate to the chosen character;
- do not impose an arbitrary maximum number of cards or treatments when the content model
  genuinely requires them;
- do not flatten a rich reference into rules and whitespace merely to appear restrained.

The budget is an explanation of roles, not a minimalism quota.

## 6. Dashboard rules

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

## 7. Marketing rules

Do not treat hero, logo strip, three features, testimonials, pricing, FAQ, and final CTA
as a mandatory sequence.

- Include a section only when it advances the argument or resolves an objection.
- Let available proof determine the sequence.
- Use concrete product behavior, screenshots, examples, or sourced outcomes instead of
  generic illustration.
- Avoid a dashboard mockup that is too small or implausible to communicate anything.
- Do not invent customer quotes, company logos, usage numbers, or performance claims.
- Vary section density because the argument changes, not to alternate background colors.
- Hide the brand mark during review. If the page could represent any competitor without
  structural changes, revise it.

## 8. Content and state credibility

- Label fixtures and generated examples as sample data.
- Never imply real-time status unless the implementation has a real source and freshness
  model.
- Use believable variation: long names, zeros, missing values, partial permissions, and
  uneven item counts.
- Distinguish zero, unknown, unavailable, stale, and not applicable.
- Remove any metric whose source, comparison period, or user consequence cannot be named.
- Remove any panel whose absence would not change understanding or action.

## 9. Subtractive review

After the first complete pass:

1. Outline every surface.
2. Name each boundary's grouping, interaction, clipping, scroll, contrast, or elevation
   role; remove one unnecessary parent or child boundary at a time.
3. Remove decorative icons that do not encode information or improve recognition.
4. Remove duplicated labels and repeated summaries.
5. Consolidate equal-priority regions that are not truly peers.
6. Reduce visual effects by roughly one quarter, then reassess hierarchy.
7. Check the interface in grayscale and with brand marks hidden.
8. Re-run the static, responsive, accessibility, and state gates.

Do not remove useful affordances, focus indicators, status semantics, or error context in
the name of minimalism.

## 10. Evidence review

Do not self-award a numerical distinctiveness score. Record observable evidence:

- three decisions that would not transfer unchanged to another product;
- the topology and task reason;
- host patterns preserved, questioned, and rejected;
- ordinary-slop and anti-slop signals found and resolved;
- component and variant choices that changed the experience;
- realistic content, system states, and stress cases;
- rendered narrow, medium, and wide comparisons.

A fabricated data or proof item is an automatic failure. If the reasons are merely
“modern,” “clean,” “premium,” “balanced,” or “best practice,” revise the direction.

## 11. Exceptions and exact-component work

Canonical components should remain exact. Do not mutate a button, table, dialog, or
control merely to make it more distinctive. Apply this reference to page composition,
content, density, and the selection of components around those canonical assets.

An established repository may intentionally use cards, pills, Inter, or a particular
radius. Preserve decisions that are deliberate and sound. Question them when accumulation
creates ordinary slop, anti-slop, weak affordance, or conflict with explicit references.
