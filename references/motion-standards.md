# Motion standards

Use before proposing, implementing, auditing, or reviewing interface motion.

## Contents

1. Decision filter
2. Frequency and intensity
3. Timing and curves
4. Springs and gestures
5. Spatial consistency
6. Implementation quality
7. Reduced motion
8. Pattern specifications
9. Review checklist

## 1. Decision filter

Motion is justified only when it provides at least one:

- feedback: acknowledge input;
- spatial consistency: explain origin, destination, or relationship;
- state indication: clarify what changed;
- continuity: prevent a jarring reflow or replacement;
- explanation: demonstrate sequence or mechanism;
- rare delight: reward a meaningful, infrequent moment.

Reject it when:

- the interface is already visually busy;
- the action is extremely frequent;
- motion delays access to information or control;
- it compensates for weak hierarchy;
- the movement lacks a causal origin;
- a static state change communicates equally well;
- it would make interruption or reversal confusing.

## 2. Frequency and intensity

| Frequency | Treatment |
| --- | --- |
| 100+ times/day | none or near-instant feedback |
| tens/day | subtle, small distance, fast |
| occasional | standard entrance or layout transition |
| rare | more expressive spring, stagger, or celebration |

Do not apply the same intensity to a toolbar button and an onboarding milestone.

## 3. Timing and curves

Starting ranges:

| Pattern | Duration |
| --- | --- |
| press response | 100–160 ms |
| tooltip | 125–200 ms |
| dropdown or popover | 150–250 ms |
| tab indicator | 180–260 ms |
| disclosure | 180–300 ms |
| modal or drawer | 200–500 ms |
| route/shared element | 250–500 ms |

Most ordinary UI should complete within 300 ms. Larger travel or heavier surfaces may need
more time, but must remain responsive.

Preferred curves:

```css
/* enter or respond */
cubic-bezier(0.23, 1, 0.32, 1)

/* move between visible states */
cubic-bezier(0.77, 0, 0.175, 1)

/* drawer or sheet */
cubic-bezier(0.32, 0.72, 0, 1)
```

Rules:

- ease-out for entrances and direct feedback;
- ease-in-out for visible point-to-point movement;
- a faster exit than entrance is usually appropriate;
- avoid default `ease-in` for ordinary UI;
- avoid bouncy curves on frequent or serious actions;
- never use one blanket duration for every component.

## 4. Springs and gestures

Use a spring when:

- a gesture supplies position or velocity;
- a target can change during motion;
- interruption is likely;
- natural settling is more important than exact duration.

Use CSS or WAAPI when:

- start and end are predetermined;
- the effect is a simple opacity or transform transition;
- exact duration coordination matters;
- no gesture velocity is involved.

For gesture-driven motion:

1. respond on pointer-down;
2. track the pointer directly;
3. constrain movement;
4. apply resistance beyond a bound;
5. project release position from velocity;
6. select a destination or snap point;
7. inherit velocity into an interruptible spring;
8. permit reversal without waiting.

Do not restart a moving object from zero velocity after interruption.

## 5. Spatial consistency

The animation origin must match the cause:

- popover/menu: trigger edge or corner;
- select: selected row or trigger;
- modal: viewport center unless launched from a spatial object;
- drawer: attached viewport edge;
- inline disclosure: the disclosure boundary;
- tab indicator: previous selected tab;
- card-to-detail: the card's geometry;
- toast: notification region edge.

Maintain perceived object identity when practical. Avoid animating a surface from an
unrelated screen edge.

## 6. Implementation quality

Prefer:

- `transform` and `opacity`;
- compositor-friendly filters only when measured;
- `will-change` briefly or for a known repeated interaction;
- explicit transition properties;
- stable layout boxes;
- measured auto-height or supported layout animation;
- cancellation and cleanup;
- deterministic tests for state and end condition.

Avoid:

```css
transition: all;
transform: scale(0);
```

Also avoid:

- animating large blur regions continuously;
- width/height animation on many nodes;
- layout reads and writes interleaved per frame;
- timers as the source of interaction truth;
- entrance animation before content layout stabilizes;
- stagger across long or frequently updated lists.

For popovers, start near `scale(.96–.98)`, not zero. Distance should usually be 4–12 px for
compact UI.

## 7. Reduced motion

Reduced motion is a gentler equivalent, not necessarily no feedback.

Under `prefers-reduced-motion: reduce`:

- remove travel, parallax, zoom, rotation, and repeated pulsing;
- replace spatial transitions with a brief fade or immediate change;
- stop autoplay and continuous decorative motion;
- keep progress and critical state feedback understandable;
- preserve direct manipulation only to the degree needed for control;
- do not hide content behind animation completion.

Test the actual preference, not only the CSS syntax.

## 8. Pattern specifications

### Button press

- begin on pointer-down;
- 100–140 ms;
- scale no lower than roughly `.97` for an ordinary button;
- retain visible focus;
- avoid bounce on release.

### Tooltip

- small fade, optional 2–4 px travel;
- 125–180 ms;
- no large scale;
- remain stable while pointer moves between trigger and content.

### Dropdown or popover

- 150–220 ms enter, slightly faster exit;
- opacity plus `.96–.98` scale or 4–8 px travel;
- origin at trigger;
- collision-aware placement;
- reduced motion uses fade only.

### Modal

- overlay fades;
- content fades and rises or scales subtly;
- 220–320 ms typical;
- origin at viewport center;
- initial and return focus remain correct.

### Drawer or sheet

- attached edge remains spatially stable;
- 250–450 ms depending on travel;
- use drawer curve or interruptible spring;
- backdrop timing supports, not precedes, the surface;
- gesture dismissal inherits velocity.

### Accordion or disclosure

- animate measured height and opacity or use layout animation;
- 180–260 ms;
- chevron rotation follows the same state;
- content remains accessible when animation is disabled.

### Tab indicator

- shared-layout movement from prior tab;
- 180–240 ms ease-in-out;
- label color may crossfade;
- content transition is subtle and preserves focus.

### Toast

- enter from notification-region edge with short fade/slide;
- stack changes animate layout;
- user can pause dismissal where needed;
- exit should not cause a jarring stack jump.

## 9. Review checklist

- [ ] Every animation has a stated purpose
- [ ] Intensity matches frequency and consequence
- [ ] Input feedback begins immediately
- [ ] Origin matches cause
- [ ] Duration is appropriate to distance and scale
- [ ] Curve matches enter, move, or gesture
- [ ] Animation is interruptible when interaction is interruptible
- [ ] No `transition: all`, `scale(0)`, or unjustified layout animation
- [ ] Layout remains stable
- [ ] Reduced-motion behavior is complete
- [ ] Keyboard and focus behavior remain correct
- [ ] Performance is acceptable on representative hardware

