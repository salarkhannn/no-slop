# Output contracts

Use the shortest format that still lets another person verify or execute the work.

## Contents

1. Build or refinement handoff
2. Implementation plan
3. Layout or UI audit
4. Cross-domain UI audit
5. Motion discovery
6. Motion audit
7. Motion review
8. Vocabulary answer

## Build or refinement handoff

```markdown
Outcome
- What is now true

Changed
- `path:line` — meaningful change

Verified
- Commands, routes, narrow/extra-wide geometry, states, keyboard, reduced motion

Deviations or risks
- Any canonical difference, untested condition, or external blocker
```

For a new page or material redesign, include the visual direction, host-style
preserve/question/reject decision, chosen structural concept, rejected concepts, compound
patterns, component/variant records, symmetry contract, and rendered evidence. Keep them
compact but verifiable.

Lead with the outcome. Do not narrate every edit.

## Implementation plan

```markdown
Goal
Context and constraints

1. [Step]
   - Files/symbols
   - Exact behavior and values
   - Accessibility/responsive/motion details
   - Acceptance criteria

Verification
- Commands
- Routes/viewports/states
```

Make each step self-contained enough for another agent to implement without rediscovering
the design intent.

## Layout or UI audit

```markdown
Scope
Evidence and limitations

Findings
1. [Severity] Short title — `path:line` or route/state/viewport
   - Evidence:
   - User consequence:
   - Correction:
   - Verify:

Static evidence
- Criterion — route/viewport/state observation and verification

Spatial decision
- Model and rails:
- Effective insets and width use:
- Ownership or token drift:
- Verified alternatives:

Strengths worth preserving
- Specific, evidenced quality
```

Order findings by severity and impact, not by file order.

## Cross-domain UI audit

Use when one audit spans layout, hierarchy, accessibility, components, responsive behavior,
and motion.

```markdown
Scope
Rendered/source evidence and limitations

Findings
1. [Severity · Domain] Title — route/state/viewport and `path:line`
   - Evidence:
   - User consequence:
   - Correction:
   - Verify:

Static evidence
- Each layout criterion, with unrendered items marked unverified

Motion inventory
- Existing mechanisms, preference handling, systemic risks

Accessibility verification
- Semantics, keyboard, focus, contrast, forms, overlays, zoom

Strengths worth preserving
Limitations and untested states
```

Tag each finding with `Layout`, `Hierarchy`, `Component`, `Responsive`, `Accessibility`,
or `Motion`, but keep one severity-ordered list so cross-domain blockers are not buried.

## Motion discovery

```markdown
Accepted opportunities
1. [Priority] Element — named effect
   - Purpose and frequency:
   - Trigger and origin:
   - Properties, distance, duration, easing/spring:
   - Reduced motion:
   - Acceptance:

Rejected candidates
- Element — reason motion would not help
```

Return no more than 5–7 accepted opportunities and at least 3 rejected candidates.

## Motion audit

```markdown
Executive summary
Inventory

Prioritized findings
1. [Severity] Title — `path:line`
   - Current:
   - Why it matters:
   - Standard:

Implementation plans
### Plan: [Outcome]
- Files/symbols:
- Steps with exact values:
- Reduced motion:
- Interaction/accessibility:
- Tests:
```

## Motion review

```markdown
Verdict: approve | request changes

Must fix
1. `path:line` — defect, consequence, exact correction

Suggestions
- Optional polish

Standards confirmed
- Purpose, frequency, origin, timing, interruption, reduced motion, focus, performance
```

If no material issue exists, say so directly and list residual testing risk.

## Vocabulary answer

```markdown
The effect is **[term]**.

It differs from **[near term]** because [one precise distinction].

Prompt it as: “[implementation-ready description].”
```
