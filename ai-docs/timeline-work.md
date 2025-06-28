# Task: Develop Visually Stunning Work Experience Timeline

**Date:** 2025-06-27
**Author:** Your Name
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

### Phase 0: Data Definition & Initial Planning

- **Data Structure Definition (TypeScript):** Define a TypeScript `interface` or `type` for an `ExperienceEntry`. Each entry should include:
    - `id`: Unique identifier (string or number).
    - `company`: Company name (string).
    - `title`: Job title (string, e.g., "Senior Software Engineer").
    - `startDate`: String representing start date (e.g., "June 2022").
    - `endDate`: String representing end date (or "Present").
    - `description`: Concise project/role description (string, 1-2 sentences), e.g., "Engineered high-impact operational platforms for supply chain, delivering $5M in annual efficiencies...". This is no longer a single-sentence "combined" field.
    - `technologies`: Array of strings, listing key technologies/skills used (e.g., `['React', 'D3.js', 'AWS']`). This will be used for the tags.
    - `projectScreenshotUrl`: Optional string, URL to a project screenshot image (e.g., `/images/bp-platform-screenshot.png`). This will be used in the left column of the right-side content.
    - `projectLiveUrl`: Optional string, URL to a live project or case study (e.g., `https://example.com/project-bp`). This will be used for the "View Project" button.
- **In-Memory Data Array:** Create a TypeScript file (e.g., `app/data/experience.ts`) that exports a `const` array of `ExperienceEntry` objects, populated with your actual work experience data in the refined, detailed format we agreed upon (including the new `description`, `technologies`, `projectScreenshotUrl`, and `projectLiveUrl` fields).

### Phase 1: Frontend (Core UI Layout & Styling) & Routing

- **New Page:** Create `app/experience/page.tsx` as a Server Component.
- **Data Import:** Import the `experience` data array directly into `app/experience/page.tsx`.
- **Core Timeline Structure:** Implement the core layout for the timeline, following this precise structure for each entry:
  - A **central vertical white line** with **white circular dots** marking each experience.
  - To the **LEFT of the vertical line**, display the `startDate` - `endDate` (Date Range) and the `title`. (Role) in white text. This section should be visually concise and left-aligned relative to the vertical line.
  - To the **RIGHT of the vertical line**, implement a **two-column layout of equal height** for each experience entry:
    - **First Column (left on the right side):** Display the `projectScreenshotUrl` as an image. This image should be styled to fit within its column, potentially with a subtle white border or shadow, maintaining the black/white aesthetic. If `projectScreenshotUrl` is not provided for an entry, handle gracefully (e.g., show a placeholder or adjust column width if possible).
    - **Second Column (right on the right side):** This column should be structured in rows:
      - **Row 1:** A prominent white `company` or derived project title (if explicitly provided as a separate field, otherwise use company/title).
      - **Row 2:** Small, white, rounded tags for each item in the `technologies` array.
      - **Row 3:** The `description` (1-2 sentences) in white text.
      - **Row 4:** A subtle "View Project" button in white, which links to `projectLiveUrl` if provided. If `projectLiveUrl` is not provided, the button should not be displayed.
- **Strict Theme Application:** Apply the black background and white text/border/outline theme rigorously using **only Tailwind CSS classes**.
    - Ensure good contrast and readability for all text.
    - Use rounded corners where aesthetically pleasing.
    - Maintain sufficient padding and margins for a spacious feel, especially around the two-column layout on the right.
- **Responsiveness:** Ensure the core layout is fully responsive, looking great on mobile, tablet, and desktop viewports. The two-column layout on the right should gracefully collapse or adjust on smaller screens (e.g., stack vertically).
- **Routing Implementation:**
  - Ensure the `app/experience` route is correctly configured.
  - Implement clear navigation links (e.g., in a header or footer) that lead **to** `/experience`.
  - Implement a clear way to navigate **from** the `/experience` page back to other main parts of your application (e.g., a "Home" link or "Back" button). Use Next.js `Link` component for client-side transitions.

### Phase 2: Visual Enhancements & Interactivity

- **Modern UI Elements:** Incorporate modern UI elements like subtle separators, elegant vertical lines, and indicators for timeline points (e.g., small circles) that visually connect each experience. Ensure consistent application of the black/white theme.
- **Subtle Animations:** Integrate **minimal, elegant animations** using CSS transitions or GSAP for:
    - Entry fade-ins as they scroll into view.
    - Subtle hover effects on individual experience cards or the "View Project" button.
    - Smooth transitions for any interactive elements.
    - **Avoid heavy, distracting 3D or complex animations unless they are extremely performant and add significant value within the black/white theme.**
- **Image Styling:** Ensure project screenshots are styled cleanly within their designated column, potentially with object-fit: cover, and subtle white borders or shadows if appropriate for the aesthetic.

### Phase 3: Testing & Refinement

- **Data Display Accuracy:** Verify all experience data is displayed correctly and completely, adhering to the specified layout, including images, tags, descriptions, and buttons.
- **Visual Consistency:** Thoroughly review the UI for strict adherence to the black/white theme and overall visual appeal across different screen sizes, ensuring the timeline's "flow" is elegant and readable. Pay close attention to the equal height columns on the right.
- **Animation Smoothness:** Test animations for performance and smoothness on various devices.
- **Responsiveness:** Confirm optimal viewing and usability on all devices, especially how the two-column layout adapts.
- **Accessibility:** Ensure basic accessibility considerations for navigation, readability, and interactive elements.
- **Routing Functionality:** Verify navigation to and from the experience page works seamlessly.

### Phase 4: Deployment Considerations

- **Performance on Edge:** Ensure rendering for the timeline is optimized for Vercel's edge environment.

## 4. Expected Output / Deliverables

- **New Data File:** `app/data/experience.ts` with the TypeScript type/interface (`ExperienceEntry`) and the `const` array of your experience data, including the new `description`, `technologies`, `projectScreenshotUrl`, and `projectLiveUrl` fields populated with the refined content.
- **New Page Component:** `app/experience/page.tsx` (Server Component) with the full timeline UI, implementing the precise left-right layout for each entry as detailed in Phase 1, and using the imported data.
- **Styling:** All styling to be applied via Tailwind CSS classes within the components.
- **Explanation:** A clear explanation of the code, design choices, and how to interact with the new feature.
- **If screenshot provided:** Code that implements the visual style of the screenshot within the black/white theme.
- **Routing Implementation:** Updates to relevant layout/navigation components for routing to/from `/experience` using Next.js `Link`.

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
