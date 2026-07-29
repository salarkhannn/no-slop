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
10. Distinctiveness score
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

Set a treatment budget before local polish:

- use no more than two main surface treatments in one view;
- create a card only when it adds grouping, interaction, clipping, contrast, or elevation;
- use at most one equal-card row, and only for genuinely peer objects;
- do not nest more than one card boundary;
- use pills only for tags, statuses, compact selection, or short categorical filters;
- use tinted icon containers only when color or shape encodes a stable category;
- use gradients, glass, glow, blur, and decorative grids only when a supplied reference,
  established identity, or functional visualization requires them;
- define two or three radius tiers tied to component scale; do not apply one radius
  everywhere;
- reserve strong shadow and saturated color for hierarchy, state, or interaction;
- let whitespace, rules, typography, and alignment group content before adding a box.

Budgets are constraints, not targets. Zero gradients and zero shadows may be correct.

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
2. Remove one unnecessary boundary at a time.
3. Remove decorative icons that do not encode information or improve recognition.
4. Remove duplicated labels and repeated summaries.
5. Consolidate equal-priority regions that are not truly peers.
6. Reduce visual effects by roughly one quarter, then reassess hierarchy.
7. Check the interface in grayscale and with brand marks hidden.
8. Re-run the static, responsive, accessibility, and state gates.

Do not remove useful affordances, focus indicators, status semantics, or error context in
the name of minimalism.

## 10. Distinctiveness score

Score each item 0, 1, or 2:

- product specificity;
- composition follows the decision model;
- surface and decoration restraint;
- content and data credibility;
- recognizable visual or structural identity;
- realistic states and content stress.

Interpretation:

- 11–12: deliberate and product-specific;
- 9–10: usable, but revise the weakest category;
- 6–8: generic drift; perform the subtractive and composition passes;
- below 6: return to the evidence brief.

No zero is allowed at handoff. A fabricated data or proof item is an automatic failure.

Finish by naming three product-specific decisions. If the reasons are merely “modern,”
“clean,” “premium,” “balanced,” or “best practice,” the view has not passed.

## 11. Exceptions and exact-component work

Canonical components should remain exact. Do not mutate a button, table, dialog, or
control merely to make it more distinctive. Apply this reference to page composition,
content, density, and the selection of components around those canonical assets.

An established repository design system may intentionally use cards, pills, Inter, or a
particular radius. Preserve it, then prevent unnecessary repetition and use product
structure to create identity.
