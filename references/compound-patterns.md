# Compound interaction patterns

Use when a task needs multiple coordinated primitives. A compound pattern is a behavior
contract, not a decorative card.

## Filter or query builder

Use for multi-property, multi-value filtering or saved views. Combine field token, operator,
value editor, remove action, keyboard navigation, clear-all, and result count. On narrow
screens move editing into a sheet without hiding active conditions.

Avoid a row of unrelated selects when users need to understand the query as a whole.

## Command menu

Use for broad navigation or action vocabularies, especially with keyboard users. Provide
search, grouping, shortcuts, recent items where credible, disabled reasons, focus return,
and an empty result state. Do not hide the only path to a core action inside it.

## Grouped or nested work list

Use when hierarchy, status, dependency, or parent/child relationships matter. Provide
expand/collapse, group totals, stable indentation, selection, keyboard movement, and clear
row actions. Avoid flattening meaningful relationships into one generic table.

## Object peek or inspector

Use when users scan a collection and repeatedly inspect details. Preserve list context,
selection, next/previous navigation, loading, dirty-state handling, focus, and a path to the
full record.

## Record-property grid

Use for a primary object with typed properties. Support semantic field types, inline edit,
validation, unknown/empty states, history or provenance where needed, and responsive
reflow. Do not render every property as identical label/value text if some are actionable.

## Inline editing

Use for frequent, low-risk edits with clear save behavior. Preserve width, show focus and
validation, support Escape/cancel and Enter/save where appropriate, and prevent accidental
submission. Use an explicit form for consequential or multi-field decisions.

## Selection and bulk-action bar

Use when actions affect multiple records. Show exact selection count and scope, select-all
semantics, reversible versus destructive actions, progress, partial failure, and selection
persistence. The bar should appear causally and not shift essential content unexpectedly.

## Contextual menu

Use for secondary actions on an object. Pair a real menu with its trigger; order by
frequency and risk, separate destructive actions, support keyboard navigation, collision,
dismissal, and focus return. Keep frequent primary actions visible.

## Board, gallery, or masonry collection

Use a board for workflow state, a gallery for visual comparison, and masonry for
heterogeneous media or knowledge. Preserve object identity, filters, selection, actions,
loading, and responsive rules. Do not use these merely to avoid a table.

## Split-pane list/detail

Use when repeated triage or comparison benefits from persistent context. Coordinate active
row state, pane sizing, deep links, keyboard traversal, loading, error, and narrow-screen
staging.

## Media-led card

Use when imagery or artifact preview is part of the decision. Define aspect ratio, crop,
fallback, metadata, state, actions, and content stress. Do not add generic stock imagery to
make a flat layout look rich.

## Selection rule

For every compound pattern record:

```text
Task reduced:
Context preserved:
Child primitives:
Keyboard model:
State and failure model:
Narrow-screen transformation:
Why a simpler primitive is insufficient:
```
