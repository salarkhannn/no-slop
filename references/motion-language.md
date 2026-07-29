# Motion language

Use this reference when a user describes an effect vaguely, when naming motion in a plan,
or when translating intent into implementation-ready vocabulary.

## Contents

1. Reverse lookup
2. Entrances and exits
3. Movement and continuity
4. Gestures and physics
5. Feedback and state
6. Scroll and layout
7. Prompt-ready descriptions

## 1. Reverse lookup

When an interaction has multiple phases, name the primary perceived effect first and list
supporting mechanics. For example, a dragged sheet may combine direct manipulation,
elastic constraint, rubber-banding, velocity projection, snap points, and spring settle.
Do not force the whole interaction into one label.

| User description | Likely term | Distinguish from |
| --- | --- | --- |
| “It appears and grows a little” | Pop in | Zoom, which changes scale more substantially |
| “It fades while moving upward” | Fade up / slide-fade | Pure slide or pure fade |
| “Items appear one after another” | Stagger | Delay, which may affect one element |
| “The button squishes when clicked” | Press compression | Bounce, which happens after or around movement |
| “The panel comes from the edge” | Drawer / slide-over | Sheet, often gesture-driven and modal |
| “The menu grows from the button” | Transform-origin reveal | Centered scale |
| “The clicked card becomes the detail page” | Shared-element transition | Crossfade between separate elements |
| “The highlight glides under tabs” | Animated indicator / shared layout | Crossfade of text color |
| “The number rolls to the next value” | Odometer / rolling number | Count-up from zero |
| “The list moves out of the way” | Layout animation | Manual position tween |
| “It follows the cursor with a delay” | Cursor lag / magnetic follow | Pointer parallax |
| “It stretches past the edge and snaps back” | Rubber-banding | Overscroll glow |
| “The drag continues after release” | Momentum / inertial motion | Simple duration-based slide |
| “It lands with a soft bounce” | Spring settle | Elastic easing, which is a preset curve |
| “It can be grabbed while still moving” | Interruptible animation | Cancel-and-restart transition |
| “The image moves slower than the page” | Parallax | Sticky positioning |
| “The shape changes into another shape” | Morph | Crossfade |
| “Text appears as if typed” | Typewriter | Character stagger |
| “A shine passes over loading content” | Shimmer | Skeleton, the placeholder structure itself |
| “Content enters only when scrolled into view” | Scroll reveal | Scroll-linked animation |
| “Movement is tied exactly to scroll position” | Scroll-driven / scrubbed animation | Triggered reveal |
| “The background softly changes between states” | Crossfade / color tween | Dissolve, usually image-oriented |
| “The old page moves out while the new one moves in” | Push transition | Shared-element transition |
| “It flips like a card” | 3D card flip | Rotate-in |
| “The notification briefly shakes” | Shake / nudge | Wiggle, usually repeated and playful |
| “A circle expands from the click point” | Radial reveal | Ripple, which is brief feedback |
| “The cursor creates a wave on click” | Ripple | Radial page reveal |
| “The sidebar items cascade in” | Cascading stagger | Identical simultaneous fade |
| “The element snaps between allowed positions” | Snap points / snapping | Spring settle |
| “The sheet resists being pulled too far” | Elastic drag constraint | Rubber-banding at a scroll boundary |

## 2. Entrances and exits

Use precise compound names:

- fade in / fade out;
- fade up, fade down, fade left, fade right;
- slide in / slide out;
- pop in / pop out;
- scale-fade;
- clip reveal;
- mask reveal;
- wipe;
- blur-in / blur-out;
- crossfade;
- dissolve;
- cascade or stagger.

State direction and origin:

```text
“Popover scale-fades from the trigger's top-right corner.”
“Dialog fades and rises 8 px from the viewport center.”
“Rows enter with a 24 ms stagger after the container appears.”
```

Avoid saying only “smooth animation.”

## 3. Movement and continuity

Terms:

- shared-element transition: one perceived object continues across views;
- shared-layout animation: a persistent indicator or item moves between layouts;
- FLIP animation: First, Last, Invert, Play technique for layout change;
- crossfade: opacity handoff between old and new states;
- push: outgoing and incoming surfaces move in the same direction;
- cover: incoming surface moves over stationary outgoing content;
- reveal: outgoing surface moves to expose stationary content;
- matched geometry: position, size, radius, and sometimes color interpolate;
- transform-origin reveal: scale or clip begins at the causal control;
- container transform: compact surface expands into a richer destination.

Use continuity when it helps the user understand where content came from or went.

## 4. Gestures and physics

Terms:

- direct manipulation: content tracks the pointer or finger;
- drag constraint: movement is bounded;
- elastic constraint: resistance increases beyond the bound;
- rubber-banding: overscroll stretches and returns;
- momentum / inertia: release velocity projects continued movement;
- velocity projection: estimate destination from current position and velocity;
- snap point: allowed resting position;
- spring: physically parameterized settle;
- damping: resistance that reduces oscillation;
- stiffness: strength pulling toward the target;
- mass: inertia of the animated object;
- overshoot: passes target before settling;
- critical damping: fastest settle without overshoot;
- interruptibility: new input takes control mid-animation;
- velocity inheritance: new animation starts with current or gesture velocity.

Gesture motion must remain reversible during manipulation and predictable at release.

## 5. Feedback and state

Terms:

- press compression;
- hover lift;
- focus transition;
- selection indicator;
- toggle thumb travel;
- progress interpolation;
- success check draw;
- attention nudge;
- shake on invalid action;
- optimistic transition;
- skeleton;
- shimmer;
- indeterminate progress;
- odometer;
- count-up;
- icon morph;
- check-to-close morph;
- microinteraction.

Choose feedback proportional to frequency and consequence. A high-frequency toolbar button
usually needs immediate press feedback, not a celebratory bounce.

## 6. Scroll and layout

Terms:

- scroll reveal: animation triggers at an intersection threshold;
- scroll-driven animation: progress is linked to scroll;
- scrub: animation playhead follows scroll position;
- parallax: layers move at different scroll rates;
- sticky scene: one region pins while content or visuals change;
- scroll snap: scroll settles at discrete positions;
- layout animation: siblings interpolate after size or order change;
- auto-height transition: disclosure animates between measured content heights;
- view transition: browser or framework transition between DOM states or routes;
- reflow transition: layout change visually interpolates instead of jumping.

Avoid scroll-linked essential content when reduced motion is requested or when it harms
reading control.

## 7. Prompt-ready descriptions

Use this formula:

```text
[element] + [named effect] + [origin/direction] + [timing] + [easing/physics]
+ [interaction condition] + [reduced-motion behavior]
```

Examples:

```text
Scale-fade the menu from the trigger edge over 180 ms with an ease-out curve.
On close, fade and retract over 140 ms. Under reduced motion, keep only a 100 ms fade.
```

```text
Make the sheet directly follow the drag, add elastic resistance beyond its top snap point,
project release velocity, and settle to the nearest snap point with an interruptible spring.
```

```text
Use a shared-layout indicator for the active tab. Animate transform over 220 ms with
ease-in-out; crossfade the label color. Disable travel under reduced motion.
```
