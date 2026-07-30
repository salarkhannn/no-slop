# Information graphics and visual evidence

Use when a page may benefit from product media, data visualization, an explanatory diagram,
or expressive illustration. Choose the medium from the reader's question before choosing
its style.

## Contents

1. Classify the visual
2. Test the opportunity
3. Build a semantic skeleton
4. Match the visual grammar
5. Prefer evidence for product claims
6. Reject diagram-shaped decoration
7. Apply visual direction
8. Make the result accessible and responsive
9. Decision-trace examples

## 1. Classify the visual

Choose one primary mode:

| Mode | Carries | Appropriate evidence |
| --- | --- | --- |
| Product evidence | What the product is or does | Real UI, output, demonstration, annotated screenshot |
| Data visualization | Quantities and patterns | Sourced values with scope, units, and state |
| Explanatory diagram | Relationships and structure | Named entities, edges, order, ownership, or causality |
| Illustration | Identity and experience | Brand world, atmosphere, emotion, metaphor |

A visual may combine modes only when each remains truthful. A screenshot with annotations
can be both evidence and explanation. An illustration is not proof merely because it looks
technical, and a collection of boxes and connectors is not a diagram unless those marks
encode recoverable relationships.

## 2. Test the opportunity

Use a graphic when the reader needs to:

- compare values, options, or states;
- trace a sequence, dependency, or flow;
- understand hierarchy, ownership, or architecture;
- see change, distribution, or correlation;
- locate something spatially;
- recognize a real interface, artifact, or output.

Do not create a graphic merely to balance a section, fill quiet space, avoid writing
specific copy, or make a claim feel more substantial. If the reader only needs one
sentence, write the sentence. If the claim concerns product behavior, prefer product
evidence. If the goal is mood or identity, declare illustration and judge it by the visual
direction rather than pretending it explains a workflow.

## 3. Build a semantic skeleton

Before styling a data visualization or explanatory diagram, record:

```text
Reader question:
Takeaway:
Entities:
Relationships:
Direction or order:
Values, units, or states:
Why spatial arrangement matters:
Chosen visual grammar:
Text or table alternative:
```

Create a monochrome wireframe from this record. Every position, connector, direction,
shape, size, and color channel must have a declared responsibility. Labels may identify
entities or relationships; they must not turn the graphic into prose arranged in boxes.

An upstream problem cannot be repaired with polish. If the entities or relationships are
unclear, return to the content model instead of adding curves, color, glow, or more nodes.

## 4. Match the visual grammar

| Reader task | Prefer | Avoid |
| --- | --- | --- |
| Compare named items | Table, bars, dot plot, small multiples | Scattered cards with arbitrary position |
| Follow ordered steps | Step flow, timeline, state diagram | Unnumbered decorative connectors |
| See responsibility | Swimlanes, grouped process | Color-coded curves without ownership labels |
| Understand hierarchy | Tree, indented outline, nested structure | Radial layout when depth is not encoded |
| Understand dependencies | Directed graph with labeled edges | Node-link diagram when topology is trivial |
| Follow quantities through stages | Sankey or alluvial with proportional width | Equal-width ribbons implying false magnitude |
| Inspect change over time | Line, area, interval, timeline | Decorative waves without axes or values |
| Understand product behavior | Demo, annotated screenshot, real output | Abstract capability diagram as proof |
| Establish identity or atmosphere | Illustration, collage, expressive media | Pseudo-data or pseudo-workflow styling |

Use a network only when the network itself matters. Use a chart only when real values
exist. Prefer common, direct encodings for explanatory work; position and length usually
support comparison better than area, curvature, or hue. Use color as a stable categorical,
ordered, or state channel, not to make every item look different.

## 5. Prefer evidence for product claims

Allocate explanatory burden across:

- concise copy for the promise, constraint, or takeaway;
- product evidence for behavior and credibility;
- diagrams for relationships that cannot be seen directly in the product;
- data visualizations for sourced quantitative claims;
- illustration for identity, atmosphere, and emotional character;
- interaction or motion when state change is the thing being explained;
- links or disclosure for depth needed by only part of the audience.

Do not ask prose to explain what a legible demonstration can show. Do not ask an abstract
diagram to prove what only a real product artifact can prove. Keep proof close to its claim.

## 6. Reject diagram-shaped decoration

Apply these tests:

- **Retrieval:** Can the reader answer a relationship or value question faster from the
  graphic than from its caption?
- **Substitution:** Would ordinary cards preserve all information? If so, the spatial
  encoding is not working.
- **Integrity:** Do connectors, widths, positions, colors, and shapes correspond to real
  relationships, values, categories, or states?
- **Redundancy:** Does the graphic reveal something beyond repeating its surrounding prose?
- **Identity:** Are initials, numbers, or icons real identifiers, or placeholders added to
  make nodes look designed?
- **Scale:** Does the graphic remain useful when labels grow, items are missing, or the
  viewport narrows?

Reject unlabeled curves, decorative legends, giant destination shapes, central cards with
satellite text boxes, and letter tiles when their geometry suggests meaning that the
content does not support. Keep the same treatments when they truthfully encode a
relationship or belong to a declared expressive world.

## 7. Apply visual direction

Style only after the semantic skeleton works:

- map the graphic into the product's type, color, depth, and motion language;
- keep node types and edge types internally consistent;
- let hierarchy determine emphasis rather than coloring every route;
- make maximalism coherent through a narrow vocabulary, not unrelated effects;
- preserve familiar anchors while allowing expressive composition;
- use motion only when it reveals sequence, transition, causality, or manipulation.

Visual richness is not a failure. Semantic emptiness and arbitrary visual channels are.

## 8. Make the result accessible and responsive

- State the intended takeaway in adjacent text.
- Provide a table or structured text equivalent for meaningful data.
- Do not rely on hue alone; add labels, patterns, shapes, position, or line styles.
- Give SVGs an accessible name and description, or hide decorative illustrations.
- Keep essential meaning available without hover or animation.
- Define how labels, legends, annotations, and interactions transform at narrow widths.
- Prefer a simpler small-screen grammar over shrinking an unreadable desktop diagram.

## 9. Decision-trace examples

```text
Context: Four specialists receive the same brief and return proposals for approval.
Reader question: What does each specialist contribute before the decision?
Decision: Use four compact lanes with named inputs and outputs feeding an approval queue.
Reject: Four colored splines from initial tiles to a large “decide” box; the curves add no
recoverable relationship beyond convergence.
Changes if: The only relevant information is proposal count by specialist; use a table or
bar comparison instead.
```

```text
Context: A broad product has many capabilities but one main promise.
Reader question: What can it do, and where can I learn more?
Decision: Use one concise claim and legible product evidence per capability, with links for
depth. Let navigation disclose the full catalog.
Reject: A dense abstract diagram that tries to symbolize every capability at once.
Changes if: Understanding dependencies between capabilities is the actual buyer objection;
use a labeled architecture diagram.
```

```text
Context: A playful product has a strong supplied visual world.
Reader question: What kind of experience is this?
Decision: Use expressive illustration or media consistently across the page and keep its
role explicit.
Reject: Forcing every decorative artifact to encode a task or removing it because it is not
operational.
Changes if: The same visual is placed beside a performance claim; add sourced evidence and
do not let the illustration carry the claim.
```
