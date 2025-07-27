# Guide with GSAP

## React Animation Guide with GSAP

This guide provides essential tips and techniques for integrating GSAP animations into your React applications, leveraging the powerful `useGSAP` hook.

---

### 1\. The `useGSAP` Hook for Simplified Animations

The `useGSAP` hook is the recommended way to manage GSAP animations within React components. It simplifies animation logic and automatically handles cleanup.

- **Purpose**: It acts as a specialized replacement for React's `useEffect` or `useLayoutEffect`, specifically tailored for GSAP.
- **Key Benefits**:
  - **Automatic Cleanup**: No manual intervention is needed to revert or kill GSAP instances (tweens, timelines, ScrollTriggers, Draggables, SplitText) when the component unmounts. This prevents memory leaks and unexpected animation behavior.
  - **SSR Compatibility**: Safe to use in Server-Side Rendering (SSR) environments.
  - **Animation Scoping**: Easily confine animations to specific DOM elements within a component's container, preventing unintended global effects.
  - **State Reactivity**: Allows animations to react and re-run based on changes in component props or state, offering dynamic control.

**Basic Usage Example**:

```javascript
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function MyAnimatedComponent() {
  useGSAP(() => {
    // All GSAP animation code here will be automatically cleaned up
    gsap.to(".my-element", { rotation: 360, duration: 1 });
  });

  return <div className="my-element">Animate Me!</div>;
}
```

---

### 2\. Scoping Animations within a Component

When using class selectors (e.g., `.box`), GSAP might inadvertently target elements across your entire application if not properly scoped. The `useGSAP` hook provides a solution to this.

- **Problem**: Without scoping, `gsap.to(".box", ...)` could animate _all_ elements with the class `box` on the page, even those in other components.
- **Solution**: Provide a `ref` to a container element within your component using the `scope` property in the `useGSAP` configuration. This limits GSAP's targeting to elements only _inside_ that container.

**Usage with `scope`**:

```javascript
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function ProductDisplay() {
  const container = useRef(); // Create a ref for the container

  useGSAP(
    () => {
      // This animation will only affect '.product-item' elements inside 'container.current'
      gsap.to(".product-item", { x: 50, stagger: 0.1, duration: 0.5 });
    },
    { scope: container }
  ); // Pass the ref here

  return (
    <div ref={container} style={{ overflow: "hidden" }}>
      <div className="product-item">Product A</div>
      <div className="product-item">Product B</div>
      <div className="product-item">Product C</div>
    </div>
  );
}
```

This is especially useful for layouts with multiple similar elements, like lists or grids, where managing individual refs for each item would be impractical, such as when applying staggers.

---

### 3\. Reacting to State Changes with Dependencies

Just like React's `useEffect`, `useGSAP` allows you to control when your animation logic re-runs by specifying a dependency array.

- **Default**: If no dependencies are provided (an empty array `[]` is implicitly used or can be explicitly passed), the animation code runs only once after the initial render.
- **Dynamic Animations**: Include props or state variables in the `dependencies` array within the `useGSAP` config object. The animation will re-synchronize and re-run whenever these dependencies change.

**Example with Dependencies**:

```javascript
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

function ProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      // The animation will update whenever 'progress' changes
      gsap.to(".progress-bar", { width: `${progress}%`, duration: 0.5 });
    },
    { dependencies: [progress] }
  ); // Animation re-runs when 'progress' state changes

  return (
    <div>
      <div
        className="progress-bar"
        style={{ height: "20px", backgroundColor: "blue", width: "0%" }}
      ></div>
      <button onClick={() => setProgress(Math.min(100, progress + 10))}>
        Increase Progress
      </button>
      <button onClick={() => setProgress(Math.max(0, progress - 10))}>
        Decrease Progress
      </button>
    </div>
  );
}
```

---

### 4\. `revertOnUpdate` for Animation Reset

By default, when `useGSAP` re-runs due to dependency changes, existing GSAP animations continue from their current state. If you want animations to completely reset to their original state before re-running, use `revertOnUpdate`.

- **Default Behavior**: Tweens and timelines retain their current positions, only reverting to the original state when the component unmounts.
- **`revertOnUpdate: true`**: Setting this in the `useGSAP` config ensures that the animation context is fully reverted (elements reset to their initial CSS values) before the new animation runs after a dependency change.

**Usage of `revertOnUpdate`**:

```javascript
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

function ResettableAnimation() {
  const [toggle, setToggle] = useState(false);

  useGSAP(
    () => {
      gsap.to(".target-element", {
        x: toggle ? 200 : 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { dependencies: [toggle], revertOnUpdate: true }
  ); // Animation resets before each toggle

  return (
    <div>
      <div
        className="target-element"
        style={{ width: "50px", height: "50px", backgroundColor: "red" }}
      ></div>
      <button onClick={() => setToggle(!toggle)}>Toggle Animation</button>
    </div>
  );
}
```

This is useful for animations that should always start from a clean slate when their driving data changes.

---

### 5\. Ensuring Context-Safe Animations for Event Handlers

Animations triggered by event handlers (e.g., a click event) that are defined _outside_ the main `useGSAP` callback or its initial execution context will _not_ be automatically managed by `useGSAP`. This can lead to memory leaks or unmanaged animations.

`useGSAP` provides two ways to make such animations "context-safe."

**Solution 1: Using `contextSafe` within `useGSAP` Callback**
The `contextSafe` function can be accessed as the second argument of the `useGSAP` callback. Wrap any GSAP calls within event handler functions using `contextSafe`.

```javascript
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function ClickAnimation() {
  const buttonRef = useRef();

  useGSAP((context, contextSafe) => {
    // This initial animation is context-safe by default
    gsap.fromTo(".fade-in-text", { opacity: 0 }, { opacity: 1, duration: 1 });

    // Define a click handler that's context-safe
    const handleClick = contextSafe(() => {
      gsap.to(".click-target", {
        scale: 1.2,
        rotation: 180,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    });

    // Attach event listener imperatively
    const currentButton = buttonRef.current;
    if (currentButton) {
      currentButton.addEventListener("click", handleClick);
    }

    // Cleanup function for the event listener (important!)
    return () => {
      if (currentButton) {
        currentButton.removeEventListener("click", handleClick);
      }
    };
  });

  return (
    <div>
      <h2 className="fade-in-text">Welcome!</h2>
      <div
        className="click-target"
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "green",
          cursor: "pointer",
        }}
      >
        Click Me
      </div>
      <button ref={buttonRef}>Imperative Button</button>
    </div>
  );
}
```

**Solution 2: Accessing `contextSafe` from the Returned Object**
If you prefer to define your event handlers outside the `useGSAP` callback (e.g., as separate functions or directly in JSX), you can destructure `contextSafe` from the object returned by `useGSAP`.

```javascript
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function DynamicSquare() {
  const container = useRef();
  // Get contextSafe from the returned object, and optionally pass a scope
  const { contextSafe } = useGSAP({ scope: container });

  // Define a context-safe function to be called from JSX
  const animateSquare = contextSafe((eventTarget) => {
    gsap.to(eventTarget, { x: 100, duration: 0.5, ease: "power1.out" });
  });

  return (
    <div ref={container} style={{ padding: "20px", border: "1px solid gray" }}>
      <div
        className="draggable-square"
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "purple",
          cursor: "grab",
        }}
        onClick={(e) => animateSquare(e.currentTarget)} // Use e.currentTarget to ensure it's the element with the handler
      >
        Drag Me
      </div>
    </div>
  );
}
```

You can also pass a `scope` argument directly to the `contextSafe` function when calling it this way, providing granular control over selectors within your event-triggered animations.

---

### 6\. Cleaning Up Event Listeners (Crucial for Performance)

While `useGSAP` automatically cleans up GSAP instances, it does _not_ automatically remove custom event listeners you might add (e.g., using `addEventListener`).

- **Importance**: Failing to remove event listeners can lead to memory leaks and unexpected behavior, especially in single-page applications where components are frequently mounted and unmounted.
- **Method**: `useGSAP` returns a cleanup function, similar to `useEffect`. Use this function to remove any event listeners you imperatively added within the hook.

**Example of Event Listener Cleanup**:

```javascript
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function InteractiveComponent() {
  const interactiveElementRef = useRef();

  useGSAP((context, contextSafe) => {
    const element = interactiveElementRef.current;
    if (!element) return;

    const hoverAnimation = contextSafe(() => {
      gsap.to(element, { scale: 1.1, duration: 0.2, overwrite: true });
    });

    const leaveAnimation = contextSafe(() => {
      gsap.to(element, { scale: 1, duration: 0.2, overwrite: true });
    });

    element.addEventListener("mouseenter", hoverAnimation);
    element.addEventListener("mouseleave", leaveAnimation);

    // This cleanup function runs when the component unmounts or dependencies change
    return () => {
      element.removeEventListener("mouseenter", hoverAnimation);
      element.removeEventListener("mouseleave", leaveAnimation);
    };
  });

  return (
    <div
      ref={interactiveElementRef}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "orange",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontWeight: "bold",
        color: "white",
      }}
    >
      Hover Me
    </div>
  );
}
```

---

By following these tips and techniques, you can effectively implement powerful and performant animations in your React projects using GSAP and its `useGSAP` hook.

For more details on `useGSAP`, you can refer to the video: [YouTube Video Link](https://youtu.be/l0aI8Ecumy8?si=rj8OkFX_6Q6zbcjT)
http://googleusercontent.com/youtube_content/2
