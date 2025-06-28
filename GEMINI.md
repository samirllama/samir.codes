# Project Context: Next.js 15 Authentication System & Production Deployment

## Project State Summary: Authentication System & Deployment Readiness

**Overarching Objective:** To successfully implement a complete, secure, and modern authentication system for a Next.js 15 App Router project, and **crucially, to achieve a robust first production deployment on Vercel, establishing a reliable CI/CD pipeline.**

---

### I. Core Architecture & Technology

The authentication system is built on a token-based model using JSON Web Tokens (JWT) and leverages modern Next.js features.

- **Framework:** Next.js 15.3.0-canary.29 (App Router)
- **Styling:** Tailwind CSS with a custom theme (`tailwind.config.ts`).
- **Database:** PostgreSQL (via Neon) with Drizzle ORM for database access.
- **API Layer:** Next.js Server Actions (`'use server'`) for direct client-to-server logic calls.
- **Session Management:**
  - Stateless JWTs generated using the `jose` library.
  - Passwords securely hashed using `bcrypt`.
  - JWT stored in a secure, `httpOnly` cookie named `auth_token`.

---

### II. Implemented Features & File Breakdown

A full authentication lifecycle has been created, from user registration to session-protected routes and sign-out.

1. **`app/(auth)/signin/page.tsx`**:

   - Client Component (`'use client'`) for user sign-in form.
   - Uses `useFormState` and `useFormStatus` hooks for `signIn` Server Action calls and UI state management.

2. **`app/(auth)/signup/page.tsx`**:

   - Client Component for user registration, similar to `signin/page.tsx`.
   - Calls the `signUp` Server Action for new user creation.

3. **`app/work/page.tsx`**:

   - Protected Server Component (user dashboard).
   - Fetches current user data using `getCurrentUser` from `lib/dal.ts`.
   - Includes a "Sign Out" button within a `<form>` calling the `signOut` Server Action.

4. **`app/actions/auth.ts`**:

   - Core server-side logic containing three primary Server Actions:
     - `signIn`: Validates credentials, verifies password, creates session.
     - `signUp`: Validates user input, checks for existing users, hashes password, creates new user, creates session.
     - `signOut`: Deletes session cookie and redirects.

5. **`middleware.ts`**:

   - Application gatekeeper, runs on the edge.
   - Inspects requests for `auth_token` cookie, verifies JWT, and handles routing protection:
     - Redirects unauthenticated users from protected pages to `/signin`.
     - Redirects authenticated users from `/signin` or `/signup` to `/work`.

6. **`package.json`**:
   - Build script modified to `"drizzle-kit push && next build"`.
   - **Crucial for CI/CD:** Ensures Drizzle schema push to production database _before_ Next.js build on Vercel deployments, maintaining database-code synchronization within the pipeline.

---

### III. End-to-End Authentication Flow

1. User visits a protected page (e.g., `/work`).
2. `middleware.ts` intercepts, finds no valid `auth_token`, redirects to `/signin`.
3. User fills Sign-In Form. `signIn` Server Action called on submission.
4. Action verifies credentials, generates JWT, sets as secure `httpOnly` cookie.
5. Client-side form receives a success state and redirects the user to `/work`.
6. Middleware finds/validates JWT cookie, granting access to protected pages.
7. On `/work` page, "Sign Out" button calls `signOut` Server Action.
8. Server deletes cookie, and the action redirects the user back to `/signin`. Session terminated.

---

### IV. Immediate Next Steps: First Production Deployment & CI/CD Setup

Our codebase is ready for initial deployment and establishing the CI/CD pipeline with Vercel.

1. **Generate Secure JWT Secret:**

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   _Save this output as your production `JWT_SECRET`._

2. **Commit Your Changes:**

   ```bash
   git add .
   git commit -m "feat: implement complete auth flow and prepare for production"
   ```

3. **Push to Git Repository:**

   ```bash
   git push
   ```

4. **Configure and Deploy on Vercel (CI/CD Setup):**

   - Import project into Vercel from your Git repository.
   - In the project settings, navigate to the Environment Variables section.
   - Add the following two secrets:
     - `DATABASE_URL`: Your production database connection string from Neon.
     - `JWT_SECRET`: The secure key you generated in Step 1.
   - Click Deploy. **Vercel will automatically establish a CI/CD pipeline**:
     - It will run the `"drizzle-kit push && next build"` command on every new deployment (e.g., pushes to `main` branch).
     - This ensures the database schema is updated _before_ the application builds, maintaining synchronization for every deployment.

5. **Verify on Production:** Test the entire sign-up, sign-in, and sign-out flow on your live Vercel URL to confirm the successful deployment and authentication functionality.

---

### V. General Best Practices (Enterprise-Grade Code & Strategies)

When generating code, providing advice, or suggesting strategies, always adhere to the following principles:

- **TypeScript:**
  - Use strict TypeScript. Do not use `any` type.
  - Prioritize explicit typing over implicit.
  - Leverage type inference where appropriate to maintain readability.
  - Ensure type safety for all API inputs/outputs and database interactions.
- **ESLint:**
  - Adhere to a consistent ESLint configuration for code quality and style.
  - Ensure all generated code is lint-clean with no warnings or errors.
  - Prioritize security-related ESLint rules (e.g., for `no-eval`, `no-implied-eval`).
- **Styling (Tailwind CSS):**
  - **Prioritize reusable Tailwind CSS utility classes and component classes.** Avoid duplicating styles.
  - **Minimize custom CSS:** The less custom CSS written, the easier maintenance becomes and the more robust styling typically is.
  - **Consistent Typography:** For elements like `h1`, `h2`, `h3`, `p`, etc., ensure a consistent base font size approach (e.g., using Tailwind's `text-base` for `p`, `text-xl` for `h3`, etc., defined in `tailwind.config.ts`) to avoid repetitive styling on individual tags.
  - Leverage `tailwind.config.ts` for custom themes, colors, and responsive breakpoints.
- **Performance:**
  - Optimize for fast load times and responsiveness (e.g., lazy loading, image optimization using `next/image`).
  - Minimize client-side JavaScript bundle size.
  - Prioritize server-side rendering (SSR) or Static Site Generation (SSG) where appropriate with Next.js App Router for initial page loads and SEO.
  - Implement efficient data fetching strategies (e.g., caching, revalidation).
- **Security:**
  - Always sanitize and validate all user inputs on the server-side.
  - Protect against common web vulnerabilities (XSS, CSRF, SQL Injection, etc.).
  - Properly handle and store sensitive data (e.g., secure password hashing, environment variables for secrets).
  - Implement secure session management (e.g., `httpOnly`, `Secure`, `SameSite` cookies).
  - Follow the Principle of Least Privilege for all credentials and roles.
- **Maintainability & Readability:**
  - Write modular, reusable components and functions.
  - Use clear, descriptive variable and function names.
  - Add comments for complex logic or non-obvious parts.
  - Follow consistent coding conventions and architectural patterns.
  - Prioritize clear error messages and logging.
- **Scalability:**
  - Design for stateless components and services where possible.
  - Consider database indexing and query optimization for Drizzle ORM.
  - Leverage Vercel's serverless functions and edge capabilities for efficient scaling.
  - Decouple services to facilitate independent scaling and development.
- **Error Handling & Logging:**
  - Implement robust try-catch blocks for asynchronous operations, especially API calls and database interactions.
  - Provide clear, user-friendly error messages on the client-side.
  - Ensure comprehensive server-side logging for debugging and monitoring.
  - Centralize error reporting where applicable.
- **Testing:**
  - Emphasize unit, integration, and end-to-end testing strategies.
  - Suggest testable code structures.
  - Consider test coverage as a quality metric.

---

### VI. Project Conventions & Structure

This project adheres to the following conventions and structure:

- **Available Scripts (using `pnpm`):**
  - `pnpm dev`: Starts the development server.
  - `pnpm build`: Creates a production build (`drizzle-kit push && next build`).
  - `pnpm start`: Starts the production server (requires `pnpm build` first).
  - `pnpm lint`: Runs ESLint checks.
  - `pnpm test`: Runs tests using Vitest (if tests are configured).
- **Folder Structure (Next.js App Router convention):**
  - `.`: Configuration files (`next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `pnpm-lock.yaml`, etc.).
  - `app/`: Main application code, routing, layouts, and pages.
    - `(auth)/`: Route group for authentication pages and layout.
    - `(default)/`: Route group for main application pages and layout.
    - `actions/`: Server Actions.
    - `styles/`: Global CSS, themes, animations, utility patterns.
  - `components/`: Reusable React components (UI primitives, feature components).
    - `ui/`: Core UI elements (Button, Header, Footer, etc.).
    - `hooks/`: Custom React hooks.
  - `db/`: Drizzle ORM schema (`schema.ts`) and database connection setup (`index.ts`).
  - `lib/`: Utility functions, constants, data access logic (`dal.ts`), session management (`session.ts`).
  - `public/`: Static assets (images, fonts, icons).
  - `mdx-components.tsx`: Custom components used within MDX files.

---

**My Role (for Gemini):**
You are an expert Next.js, React, and TypeScript developer, deeply familiar with modern web development practices and **production deployment workflows, particularly focusing on Vercel CI/CD best practices and the implications of using Next.js canary versions**. Always provide secure, performant, and scalable solutions that adhere to the enterprise-grade best practices outlined in the `GENERAL` section and align with the `PROJECT CONVENTIONS & STRUCTURE`. When assisting with this project, prioritize advice that aligns with the described architecture (Next.js 15 App Router, Server Actions, Drizzle ORM, JWT-based auth) AND the goal of establishing a robust, automated deployment pipeline.

---

### VII. Aspects to refine before deployment

The following are some options we can implement in order to enhance our application.

1. Demonstrate Dynamic Open Graph (OG) Image Generation in Next.js using ImageResponse and Edge Functions

2. Performance Optimization:
   Libraries: @next/bundle-analyzer, critters, rehype-img-size.
   Strategy:
   Bundle Analysis: Regularly run ANALYZE=true pnpm build-next to monitor and optimize your JavaScript bundle size.
   Critical CSS Inlining: Use critters to inline critical CSS, improving the First Contentful Paint (FCP).
   Image Optimization: Employ rehype-img-size to automatically add dimensions to images, preventing layout shifts (CLS).

3. Accessibility (A11y):
   Libraries: @fec/remark-a11y-emoji, @radix-ui/react-tabs.
   Strategy: Prioritize accessibility. Use libraries like @fec/remark-a11y-emoji and accessible UI components like Radix UI.
   Advanced Styling with PostCSS:
   Libraries: postcss, postcss-flexbugs-fixes, postcss-hover-media-feature, postcss-nested, postcss-preset-env.
   Strategy: Utilize PostCSS for powerful CSS transformations, including fixing bugs, enabling modern CSS features, and simplifying styling with nesting.

4. Content Management & Data Fetching:
   Libraries: globby, gray-matter, @octokit/rest, @supabase/supabase-js, rss-parser, rss.
   Strategy:
   File-based CMS: Leverage Markdown/MDX files with frontmatter (gray-matter) as a lightweight CMS.
   External APIs: Integrate with services like GitHub (@octokit/rest) or Supabase (@supabase/supabase-js) for dynamic data.
   RSS Feeds: Generate RSS feeds (rss, rss-parser) for content syndication.

5. Enhanced Developer Experience (DX):
   Libraries: ts-node, concurrently, lodash.debounce, next-remote-watch, next-themes, @vercel/toolbar, clsx, typescript-plugin-css-modules.
   Strategy:
   Concurrent Operations: Utilize concurrently to speed up build processes by running tasks in parallel.
   Theming: Implement next-themes for easy light/dark mode switching.
   Remote Content Hot Reload: next-remote-watch is invaluable for content-heavy sites where content might be updated externally.

---

### VIII. Fix Errors

```bash
Error: Invalid src prop (https://placehold.co/600x450/333333/FFFFFF?text=Project+Screenshot) on `next/image`, hostname "placehold.co" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host

components/WorkTimeLine.tsx (149:9) @ ProjectCard
```
