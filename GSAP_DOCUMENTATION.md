# GSAP Animation Best Practices for React & Next.js

This guide provides best practices and examples for using the GreenSock Animation Platform (GSAP) in modern React and Next.js projects.

## 1. Core Concepts & Best Practices

### Installation

For any modern web project, especially with React/Next.js, you should install GSAP and its React-specific package through a package manager like pnpm, npm or yarn.

```bash
pnpm install gsap @gsap/react
```

The `@gsap/react` package is crucial as it provides the `useGSAP()` hook, which is the recommended way to use GSAP in a React environment.

### The `useGSAP()` Hook: The Modern Standard

Forget `useEffect` and `useLayoutEffect` for your animations. The `useGSAP()` hook is a purpose-built tool that simplifies animation management significantly.

**Why `useGSAP()` is Better:**

- **Automatic Cleanup:** Any GSAP animations, ScrollTriggers, Draggables, or SplitText instances created inside the hook are automatically killed and reverted when the component unmounts. This prevents memory leaks and unexpected behavior when components are removed from the DOM.
- **Powerful Scoping:** You can (and should) provide a `scope` to the hook. This limits all GSAP selector text (e.g., `gsap.to(".box", ...)` to only find elements _within_ that scope. This is the most critical best practice for component-based frameworks.
- **Flexible Dependency Management:** The hook can re-run your animation code whenever state or props change, just like `useEffect`. You can also set `revertOnUpdate: true` to automatically clean up the previous animations before the new ones are created.

### Best Practice: Always Scope Your Animations

To prevent animations in one component from accidentally targeting elements in another, **always** provide a `scope` to your `useGSAP` hook. The easiest way is to assign a `useRef` to your component's top-level element.

```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Registering plugins is a good practice to do once, e.g., in your layout file.
gsap.registerPlugin(useGSAP);

function MyComponent() {
  const container = useRef(null);

  useGSAP(
    () => {
      // This selector only finds .box elements that are descendants of the container
      gsap.from(".box", { opacity: 0, y: 50, stagger: 0.1 });
    },
    { scope: container }
  ); // <-- The magic happens here!

  return (
    <div ref={container}>
      <div className="box">Box 1</div>
      <div className="box">Box 2</div>
      <div className="box">Box 3</div>
    </div>
  );
}
```

### Responding to State and Prop Changes

To create dynamic animations that react to application state, use the `dependencies` array in the `useGSAP` config object.

```jsx
function Mover({ position }) {
  // position could be a prop like "left" or "right"
  const boxRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(boxRef.current, {
        x: position === "left" ? 0 : 300,
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
    { dependencies: [position], revertOnUpdate: true }
  ); // Re-runs when position changes

  return <div className="box" ref={boxRef}></div>;
}
```

Setting `revertOnUpdate: true` is useful here to ensure the old animation is reverted before the new one is created, preventing conflicting tweens.

### Safely Animating in Event Handlers with `contextSafe()`

What if you need to trigger an animation from an event handler, like a button click? The animation is created _after_ the `useGSAP` hook has already run. If you're not careful, this animation won't be cleaned up.

The solution is `contextSafe()`. It wraps your event handler function, ensuring any GSAP animations created inside it are properly registered with the `useGSAP` context for automatic cleanup.

```jsx
function InteractiveButton() {
  const container = useRef(null);

  // Destructure contextSafe from the hook's return value
  const { contextSafe } = useGSAP({ scope: container });

  const onButtonClick = contextSafe(() => {
    gsap.to(".icon", {
      rotation: "+=360",
      duration: 0.5,
    });
  });

  return (
    <div ref={container}>
      <button onClick={onButtonClick}>
        <span className="icon">🔄</span>
        Click Me
      </button>
    </div>
  );
}
```

## 2. Advanced GSAP Features

## 2.1 Specific Animation Examples & Demos

### Parallax Effects with ScrollTrigger

Parallax effects create a sense of depth by moving background elements at a slower rate than foreground elements as the user scrolls. GSAP's ScrollTrigger plugin is essential for building these effects, as it allows you to link animations to scroll progress.

**Examples and Demos:**

- **Simple Parallax Effect:** Use `gsap.to()` with `ScrollTrigger` to animate the `yPercent` property of elements.
- **Background Image Parallax:** Animate `backgroundPosition` of elements to create a parallax effect on background images.
- **Multilayer Parallax:** Involve multiple layers moving at different speeds for a richer sense of three-dimensional depth.
- **Parallax Image Waterfall:** Smaller images move faster than larger ones for a dynamic visual.
- **Parallax with Horizontal Scroll:** Combine horizontal scrolling with parallax for unique user experiences.

**Guides and Tips:**

- **GSAP and ScrollTrigger Setup:** Link the GSAP JavaScript file and the ScrollTrigger plugin in your HTML.
- **Linking Animations to Scroll:** Use `ScrollTrigger` to define when an animation starts and ends based on scroll position. Key properties include `trigger`, `start`, `end`, and `scrub`.
- **`scrub: true`:** Links the animation directly to the scrollbar for smooth, synchronized progress.
- **CamelCasing CSS Properties:** When animating CSS properties with GSAP, camelCase hyphenated properties (e.g., `background-position` becomes `backgroundPosition`).
- **Responsive Parallax:** Consider using `ScrollTrigger.matchMedia` to adjust or disable animations for different screen resolutions.
- **Performance:** Optimize images (e.g., PNGs with transparent backgrounds for layering) for optimal performance.

### SVG Morphing with MorphSVGPlugin

SVG morphing involves smoothly transitioning one SVG shape into another. GSAP's MorphSVGPlugin is specifically designed for this purpose, allowing for intricate shape transformations with minimal code.

**Examples and Demos:**

- **Basic Shape Morphing:** Morph any SVG path into another, even if the number of points is different.
- **Sequencing Morphs:** Sequence multiple morphs to create complex animations where a shape transforms through several different forms.
- **Interactive Morphing:** Create interactive elements where a shape morphs on hover or click.
- **UI Effects:** Use morphing SVGs for animating transitions between UI elements, dynamic loading animations, or enhancing logo animations.

**Guides and Tips:**

- **MorphSVGPlugin:** This plugin handles the complex calculations required to smoothly interpolate between different SVG path data.
- **Defining Shapes:** Define the starting and ending shapes by referencing their IDs or elements.
- **`morphSVG` Property:** Use the `morphSVG` property in your `gsap.to()` tween to specify the target shape.
- **`shapeIndex`:** For complex morphs, `shapeIndex` can control how points are mapped between the start and end paths, affecting the in-between state of the animation. Useful for closed paths.
- **`type: "rotational"`:** Can produce more natural-looking morphs by using rotation and length data for interpolation, avoiding "kinks" in the animation.
- **Converting Primitives:** MorphSVGPlugin can automatically convert SVG primitive shapes (like `<circle>`, `<rect>`, `<ellipse>`) into path data for morphing.
- **Optimization:** Ensure your SVG paths are well-formed for smooth transitions. The plugin automatically handles adding points and converting to cubic beziers for seamless morphing.
- **Integration with ScrollTrigger:** Morphing effects can also be triggered by scroll events using ScrollTrigger.

### Timelines (`gsap.timeline()`): Sequencing Like a Pro

When you have more than one animation that needs to run in a specific order, a **timeline** is the perfect tool. It acts as a container for your tweens, giving you precise control over their timing and execution.

**Key Timeline Concepts:**

- **Sequencing:** By default, tweens added to a timeline play one after another.
- **Position Parameter:** The third parameter of `tl.to()` is the position parameter. It lets you control the timing of your tweens relative to others.
  - `"<"`: Start at the same time as the previous animation.
  - `">"`: Start at the end of the previous animation (the default).
  - `"-=0.5"`: Overlap with the previous animation by 0.5 seconds.
  - `"+=1"`: Start 1 second after the previous animation ends.

```jsx
useGSAP(
  () => {
    const tl = gsap.timeline({
      repeat: -1, // loop indefinitely
      repeatDelay: 1, // 1-second pause between loops
      yoyo: true, // reverse direction on each repeat
    });

    tl.to(".box-1", {
      x: 400,
      rotation: 360,
      duration: 1,
      ease: "power1.inOut",
    })
      .to(
        ".box-2",
        { x: 400, scale: 0.8, duration: 1, ease: "power1.inOut" },
        "<"
      ) // Starts at the same time as the first tween
      .to(".box-3", { y: -100, duration: 0.5, ease: "bounce.out" }, "-=0.5"); // Overlaps the end of the previous tween
  },
  { scope: container }
);
```

### ScrollTrigger: Animating on Scroll

ScrollTrigger is a powerhouse plugin for creating scroll-based animations. It links animations to the viewport's scroll position.

**Core ScrollTrigger Properties:**

- `trigger`: The element that triggers the animation.
- `start` / `end`: Defines the start and end points of the scroll animation (e.g., `"top center"`, `"bottom 80%"`).
- `scrub`: Smoothly links the animation's progress to the scrollbar's position. Can be a boolean (`true`) or a number for a delayed catch-up effect.
- `markers`: Displays visual markers for the start and end points during development. (Remove in production!)
- `toggleActions`: Defines actions to take when the trigger enters/leaves the viewport (e.g., `"play pause resume reset"`).

```jsx
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Inside your component...
useGSAP(
  () => {
    gsap.to(".panel", {
      scrollTrigger: {
        trigger: ".trigger-element",
        start: "top center",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
        markers: true, // For development only
        pin: true, // Pins the trigger element while the animation is active
      },
      xPercent: 100,
      ease: "none",
    });
  },
  { scope: container }
);
```

### Flip Plugin: Animating Layout Changes

The Flip plugin is your go-to for seamlessly animating changes in the DOM, like an element moving from one list to another, or a card expanding into a modal. It calculates the difference in position, size, and rotation and animates it smoothly.

**The Flip Workflow:**

1.  **Get State:** Use `Flip.getState(elements)` to record the initial state (position, size) of the elements you want to animate.
2.  **Make DOM Changes:** Immediately after getting the state, make your changes to the DOM. This could be changing a class, moving an element in the React tree, or changing CSS that affects layout.
3.  **Animate:** Call `Flip.from(state, { ... })` to animate the elements from their _previous_ state to their _new_ state.

```jsx
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef(null);

  const toggleFlip = () => {
    const state = Flip.getState(".box, .box-container", {
      props: "borderRadius",
    });

    setIsFlipped(!isFlipped);

    Flip.from(state, {
      duration: 0.8,
      ease: "power1.inOut",
      stagger: 0.1,
      // You can also animate other things, like nested elements
      absolute: true, // Use absolute positioning for the flip
    });
  };

  return (
    <div
      ref={containerRef}
      className={isFlipped ? "flipped-layout" : "initial-layout"}
    >
      <div className="box-container">
        <div className="box"></div>
      </div>
      <button onClick={toggleFlip}>Flip!</button>
    </div>
  );
}
```

## 3. Performance & Optimization

- **Animate Transforms and Opacity:** For the smoothest animations, prioritize animating `transform` properties (`x`, `y`, `scale`, `rotation`) and `opacity`. These are the most performant because they can be offloaded to the GPU and don't trigger expensive browser layout recalculations or repaints.

- **Avoid Layout-Thrashing Properties:** Try to avoid animating properties that affect the layout of the page, such as `width`, `height`, `top`, `left`, `margin`, or `padding`. Animating these can be janky, especially on less powerful devices.

- **Use `gsap.quickSetter()` for Frequent Updates:** If you need to update a property very frequently (e.g., based on mouse movement), `gsap.quickSetter()` is much more performant than creating a new tween on every update.

```jsx
// Inefficient: creates a new tween on every mouse move
document.addEventListener("mousemove", (e) => {
  gsap.to(".follower", { x: e.x, y: e.y, duration: 0.3 });
});

// Efficient: creates setter functions once and calls them rapidly
const xSet = gsap.quickSetter(".follower", "x", "px");
const ySet = gsap.quickSetter(".follower", "y", "px");

document.addEventListener("mousemove", (e) => {
  xSet(e.x);
  ySet(e.y);
});
```

## 4. Server-Side Rendering (SSR) & Next.js

GSAP is a client-side library that manipulates the DOM. When working with a framework like Next.js that uses SSR, you must ensure your GSAP code only runs in the browser.

- **`"use client"` is Your Friend:** In the Next.js App Router, any component that uses GSAP (or any other client-side-only library) **must** be a Client Component. You achieve this by placing the `"use client";` directive at the very top of the file.

- **`useGSAP` Handles the Rest:** The good news is that the `useGSAP` hook is built on top of `useLayoutEffect` (which falls back to `useEffect` on the server). This means the hook itself is SSR-safe, and the animation code inside it will not run on the server, preventing errors.

By following these best practices, you can create complex, performant, and maintainable animations in your React and Next.js applications.

## Bounce and Stagger Effects

This section provides a summary of how to create bounce and stagger animation effects using the GSAP library, with a focus on SVG elements.

### Bounce Effect

The bounce effect simulates the natural motion of a bouncing object.

#### Basic Bounce

For a simple bounce effect, use the `bounce.out` ease in your GSAP tween.

```javascript
gsap.to(".element", {
  rotation: 360,
  duration: 2,
  ease: "bounce.out"
});
```

#### Custom Bounce

For more control over the bounce, create a custom bounce ease using `CustomBounce.create()`. This lets you adjust the bounce's strength and squashiness.

```javascript
CustomBounce.create("myBounce", {
  strength: 0.6,
  squash: 3,
  squashID: "myBounce-squash",
});

gsap.from(".element", {
  duration: 2,
  y: -200,
  ease: "myBounce"
});
```

You can also use a condensed string format for bounce eases:

```javascript
// Simple bounce
gsap.to(".element", { ease: "bounce(0.5)" });

// Advanced bounce
gsap.to(".element", { ease: "bounce({strength:0.5, endAtStart:true})" });
```

### Stagger Effect for SVG

The stagger effect is used to animate a sequence of elements with a delay between each animation. This is particularly useful for SVG letters drawn with paths.

#### Simple Stagger

Use the `stagger` property to create a simple delay between animations.

```javascript
gsap.to('.box', {
  y: 100,
  stagger: 0.1 // 0.1 seconds between each animation
});
```

#### Advanced Stagger

For more complex staggering, use a stagger object with additional properties.

```javascript
gsap.to('.box', {
  y: 100,
  stagger: {
    each: 0.1,
    from: 'center',
    grid: 'auto',
    ease: 'power2.inOut',
    repeat: -1
  }
});
```

#### Staggering SVG Stroke Animations

The `DrawSVGPlugin` is ideal for animating the strokes of SVG paths. Combine it with the `stagger` property to create a sequential drawing effect.

```javascript
// Animate all elements with the "draw-me" class
gsap.from(".draw-me", {
  duration: 1,
  stagger: 0.1,
  drawSVG: 0
});
```

#### Timeline Control for SVG Animations

For precise control over your SVG animations, use a GSAP timeline.

```javascript
var tl = gsap.timeline();
tl.from(".draw-me", {
  duration: 2,
  drawSVG: 0
}, 0.1);

// Control the timeline
tl.pause();
tl.play();
tl.reverse();
tl.seek(0.5);
```