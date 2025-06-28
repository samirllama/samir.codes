# Task: Develop Visually Stunning Work Experience Timeline

**Date:** 2025-06-27
**Author:** Name
**Status:** Draft

## 1. Objective

The primary objective of this task is to design and implement a **visually appealing, modern, and absolutely beautiful interactive timeline** to showcase my work experience. The timeline should be a standout feature, aligning perfectly with the application's minimalist black and white aesthetic. It must be highly engaging and easy to navigate, providing a clear overview of my professional journey.

## 2. Context & Dependencies

This timeline feature will be integrated into our existing Next.js 15 App Router project.

- **Existing Project Stack:**

- **Framework:** Next.js 15.3.0-canary.29 (App Router)
    - **Styling:** Tailwind CSS with a custom theme (`tailwind.config.ts`).
    - **Animation Libraries:** `@gsap/react`, `gsap`, `@react-three/fiber`, `@react-three/drei` are available for subtle, high-impact animations if deemed appropriate and performant.
    - **Icon Library:** `lucide-react` is available for icons.

- **Aesthetic Theme - CRITICAL:**

- The application's theme is strictly **black as the primary background/base color**, with **white used exclusively for all fonts, outlines, borders, subtle highlights, and interactive elements.**
    - **NO other colors** should be introduced unless explicitly for a very subtle, almost subliminal accent, like a very dark grey line if absolutely necessary, but white is always preferred for contrast.
    - The design should feel **modern, clean, spacious, and premium.** Think elegant, not cluttered.

- **Visual Reference (Optional but Recommended):**

- If a screenshot is provided, it will be located at: `/public/images/timeline-example-ui.png`.
    - **If a screenshot is provided, prioritize its visual style heavily while adhering to the black/white constraint.**

- **Data Source:** Work experience data will be stored as an in-memory array of objects within a TypeScript file.

- **Placement & Routing:** The timeline will reside on a new dedicated page, e.g., `/app/experience/page.tsx`. Implement clear navigation pathways **to and from** this page, ensuring smooth user flow.

## 3. Requirements (Phased Approach Recommended)

### Phase 1: Frontend (Core UI Layout & Styling) & Routing

- **New Page:** Create `app/experience/page.tsx` as a Server Component.
- **Data Import:** Import the `experience` data array directly into `app/experience/page.tsx`.
- **Core Timeline Structure:** Implement the basic layout for the timeline. Consider a clean, vertical design similar to the analyzed example, where each experience entry is clearly delineated with a date, company, title, and the single-sentence description.
- **Strict Theme Application:** Apply the black background and white text/border/outline theme rigorously using **only Tailwind CSS classes**.
    - Ensure good contrast and readability for all text.
    - Use rounded corners where aesthetically pleasing.
    - Maintain sufficient padding and margins for a spacious feel.
- **Responsiveness:** Ensure the core layout is fully responsive, looking great on mobile, tablet, and desktop viewports.
- **Routing Implementation:**
  - Ensure the `app/experience` route is correctly configured.
  - Implement clear navigation links (e.g., in a header or footer) that lead **to** `/experience`.
  - Implement a clear way to navigate **from** the `/experience` page back to other main parts of your application (e.g., a "Home" link or "Back" button). Use Next.js `Link` component for client-side transitions.

### Phase 2: Visual Enhancements & Interactivity

- **Modern UI Elements:** Incorporate modern UI elements like subtle separators, elegant vertical lines, and indicators for timeline points (e.g., small circles) that visually connect each experience.
- **Subtle Animations:** Integrate **minimal, elegant animations** using CSS transitions or GSAP for:
    - Entry fade-ins as they scroll into view.
    - Subtle hover effects on individual experience cards.
    - Smooth transitions for any interactive elements.
    - **Avoid heavy, distracting 3D or complex animations unless they are extremely performant and add significant value within the black/white theme.**
- **"Technologies Used" Display:** The technologies will be directly integrated into the `description` field as part of the concise sentence, as per our decided structure. No separate display is needed for this field.

### Phase 3: Testing & Refinement

- **Data Display Accuracy:** Verify all experience data is displayed correctly and completely, adhering to the concise single-sentence format.
- **Visual Consistency:** Thoroughly review the UI for strict adherence to the black/white theme and overall visual appeal across different screen sizes, ensuring the timeline's "flow" is elegant and readable.
- **Animation Smoothness:** Test animations for performance and smoothness on various devices.
- **Responsiveness:** Confirm optimal viewing and usability on all devices.
- **Accessibility:** Ensure basic accessibility considerations for navigation and readability.
- **Routing Functionality:** Verify navigation to and from the experience page works seamlessly.

### Phase 4: Deployment Considerations

- **Performance on Edge:** Ensure rendering for the timeline is optimized for Vercel's edge environment. (No database dependencies mean less complexity here).

## 4. Expected Output / Deliverables

- **New Data File:** `app/data/experience.ts` with the TypeScript type/interface and the array of your experience data.
- **New Page Component:** `app/experience/page.tsx` (Server Component) with the full timeline UI, displaying content in the "Role/Title at Company/Project - Brief Company/Project Description, Key Technologies/Stack/Tools" format.
- **Styling:** All styling to be applied via Tailwind CSS classes within the components.
- **Explanation:** A clear explanation of the code, design choices, and how to interact with the new feature.
- **If screenshot provided:** Code that implements the visual style of the screenshot within the black/white theme.
- **Routing Implementation:** Updates to relevant layout/navigation components for routing to/from `/experience`.

## 5. Constraints & Preferences

- **Aesthetics First:** The "beautiful, modern, absolutely beautiful" black and white aesthetic is paramount. Prioritize design quality.
- **Tailwind CSS Only:** All styling must be done using Tailwind CSS classes. Avoid custom CSS files unless absolutely necessary for specific, highly complex effects.
- **Minimalist & Clean:** Favor simplicity and clarity in design over complexity.
- **Performance:** All animations and visual effects must be smooth and not negatively impact page load or rendering performance.
- **Server Components where possible:** Maximize use of Server Components for initial rendering efficiency. Use `use client` only where interactivity is strictly necessary.
- **`lucide-react` for Icons:** If any icons are needed, use `lucide-react`.

---

**My Role (for Gemini):**
You are an expert Next.js, React, and TypeScript developer, deeply familiar with modern web development practices and production deployment workflows, particularly focusing on Vercel CI/CD best practices and the implications of using Next.js canary versions.

For this task, you will also act as a **professional UI/UX designer and front-end developer, specifically skilled in creating highly visually appealing, modern, and elegant interfaces with a strict black and white color palette.** Always provide secure, performant, and scalable solutions that adhere to the enterprise-grade best practices outlined in the `GENERAL` section. When assisting with this project, prioritize advice that aligns with the described architecture (Next.js 15 App Router, in-memory data) AND the goal of establishing a robust, automated deployment pipeline, while maintaining the _absolute highest visual standards_ for the timeline feature, including flawless routing.
