# Product and business application patterns

Use for dashboards, admin panels, SaaS products, internal tools, settings, data interfaces,
operations consoles, and transactional business pages.

## Contents

1. Product principles
2. Shells and navigation
3. Dashboards
4. Lists and tables
5. Forms and settings
6. Workflows and detail views
7. Feedback and system state
8. Product anti-patterns
9. Completion checklist

## 1. Product principles

- Optimize for task completion and repeated use.
- Keep frequent actions fast and visually quiet.
- Make scope, status, and consequence explicit.
- Put controls near the content they affect.
- Use density intentionally; do not equate whitespace with quality.
- Preserve context across navigation and updates.
- Design for empty, partial, delayed, stale, failed, and high-volume data.

## 2. Shells and navigation

A robust shell establishes:

- organization or workspace context;
- primary navigation;
- page identity;
- global search or command access when warranted;
- account and utility controls;
- content viewport and responsive behavior.

Sidebar guidance:

- 224–280 px is a common starting width;
- group destinations by user mental model, not engineering module;
- clearly distinguish current item, hovered item, and expanded parent;
- keep utility and account items separated from primary work;
- collapse only when the resulting icon rail remains understandable;
- on narrow screens, move to a drawer and preserve current context.

Header guidance:

- avoid duplicating navigation already present in the sidebar;
- keep persistent global actions few;
- page-level actions belong with the page title, not necessarily in the global header;
- make workspace switching explicit and safe.

## 3. Dashboards

Start with the decisions the dashboard supports. A dashboard is not a collection of
unrelated charts.

Recommended hierarchy:

1. scope and time range;
2. current health or outcome;
3. exceptions and urgent actions;
4. drivers and trends;
5. detailed records.

Metrics:

- pair value with label, period, unit, and comparison;
- show whether a change is good or bad, not merely up or down;
- align numerical baselines;
- avoid colored arrows without explanatory context;
- use sparklines only when the trend informs a decision.
- do not default to a row of metric cards; use an inline rail, ledger, table summary,
  exception banner, or annotated chart when it better preserves comparison and context;
- never show an invented delta, health score, or live value as though it were sourced.

Charts:

- choose the chart for the question;
- provide direct labels or a clear legend;
- do not rely on hover for essential values;
- keep gridlines and decoration quiet;
- expose empty, loading, error, and no-permission states;
- provide a table or accessible summary for critical data.
- state the question the chart answers and the decision or action it changes;
- remove the chart if it exists only to make the interface appear data-rich.

Layout:

- give the most decision-relevant region the most span;
- avoid four equal cards when one metric is clearly primary;
- align chart and table edges;
- keep filters in one predictable control band;
- preserve a stable skeleton during loading.
- do not append activity, weather, conditions, or system-health panels merely to balance
  the grid;
- integrate source, timestamp, timezone, and stale state where the data is consumed.

Before keeping any dashboard region, answer:

```text
What decision does this region support?
What source makes it trustworthy?
What changes when its value changes?
Where does the user act?
```

If those answers are absent, defer or remove the region.

## 4. Lists and tables

Before building a table, define:

- primary object and row identity;
- comparison columns;
- sort and filter model;
- selection model;
- row-level and bulk actions;
- pagination or virtualization;
- narrow-screen strategy.

Table rules:

- left-align text, right-align comparable numbers;
- keep units consistent;
- put the strongest identifier first;
- keep row actions discoverable but quiet;
- make sortable headers explicit;
- use sticky headers only when the body warrants it;
- preserve selection while paging only if scope is unambiguous;
- confirm destructive bulk actions with exact counts;
- avoid truncating the only meaningful identifier;
- distinguish zero, missing, unknown, and not applicable.

Responsive options:

- prioritize columns;
- allow controlled horizontal scroll;
- move secondary detail into disclosure;
- use record cards only if scan and comparison remain effective.

## 5. Forms and settings

Structure forms by user decision, not database schema.

- use a visible label for every field;
- put format guidance before submission;
- show validation near the field and summarize when necessary;
- preserve user input after failure;
- mark optional fields rather than marking every required field;
- use the correct native input semantics and autocomplete;
- place units and prefixes without obscuring the value;
- keep destructive settings in a separated danger region;
- explain autosave, saved, unsaved, and conflict states.

Action placement:

- put the primary submit at the end of the decision sequence;
- use sticky actions only for genuinely long forms;
- keep cancel lower emphasis and predictable;
- avoid disabled submit as the sole validation explanation.

Settings:

- provide a scannable category structure;
- use switches only for immediate binary settings;
- use checkboxes when several selections form one submission;
- show downstream impact before consequential changes.

## 6. Workflows and detail views

Detail page:

- identify object, status, and high-value actions first;
- surface key facts before activity history;
- use tabs only for stable peer sections;
- keep destructive and rare actions in an overflow or separated region;
- preserve a return path to the originating list and filters.

Multi-step workflow:

- use steps only when order matters;
- show current, completed, and remaining progress;
- save partial work when failure or duration warrants it;
- permit review before irreversible submission;
- communicate what happens next.

Command menu:

- use when a broad action or navigation vocabulary benefits power users;
- include keyboard access and clear grouping;
- do not hide the only path to a core action inside it.

## 7. Feedback and system state

Choose feedback by persistence and scope:

- inline message: local and persistent;
- banner: page or system scope;
- toast: transient success or low-risk notice;
- notification: richer, possibly actionable event;
- modal: blocked decision or high-consequence confirmation.

Loading:

- use optimistic updates only when reversibility and failure handling are sound;
- preserve dimensions with skeletons for structural content;
- use progress for measurable operations;
- allow cancellation when operations are long and cancelable.

Errors:

- say what failed, what remains safe, and what the user can do;
- preserve context and input;
- include a retry only when it can work;
- log technical detail without making the user parse it.

## 8. Product anti-patterns

- equal card grids for unequal information;
- dashboards without a decision model;
- icon-only navigation without stable labels;
- filters far from affected data;
- menus that hide the primary action;
- dense tables inside oversized decorative cards;
- tiny low-contrast metadata everywhere;
- hover-only actions on touch-relevant screens;
- full-screen modals for lightweight decisions;
- animation on high-frequency rows and controls;
- stale data without last-updated context.
- decorative “live” dots without a freshness and failure model;
- chart-plus-activity-plus-equal-KPI compositions selected before the decision model;
- fake precision, deltas, users, incidents, or events used to make a mockup feel complete.

## 9. Completion checklist

For multi-tenant products additionally verify:

- tenant or workspace identity remains persistently visible;
- switching scope is deliberate and announces unsaved or destructive consequences;
- filters, cache keys, queries, URLs, and background updates remain tenant-scoped;
- cross-tenant deep links revalidate both identity and permission;
- stale data from the previous scope is never presented as current;
- permission-denied and partial-access states are designed;
- consequential confirmations name the affected tenant and object count.

- [ ] User and primary task are explicit
- [ ] Scope and status remain visible
- [ ] Navigation reflects user mental models
- [ ] Dashboard supports specific decisions
- [ ] Tables have selection, action, and responsive models
- [ ] Forms preserve input and explain errors
- [ ] Empty/loading/error/stale states are complete
- [ ] Frequent actions remain fast and quiet
- [ ] Narrow-screen transformations preserve priority
- [ ] Keyboard and focus behavior match visual order
