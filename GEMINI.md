# Project Context: Personal Portfolio & Authentication System

## I. Project Overview

This project is a personal portfolio website (`samir.codes`) built with Next.js 15 and the App Router. It serves as a professional showcase, a blog/digital garden for technical articles (MDX-based), and a playground for modern web development concepts.

A key feature is a complete, token-based authentication system using Next.js Server Actions, Drizzle ORM with a PostgreSQL database, and JWTs for session management.

---

## II. Core Technology & Architecture

- **Framework**: Next.js 15.3.0-canary.29 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (managed via Neon)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS with a custom theme and CSS variables.
- **Authentication**:
  - **Strategy**: JWT-based stateless sessions.
  - **Library**: `jose` for JWT creation and verification.
  - **Storage**: JWT stored in a secure, `httpOnly` cookie (`auth_token`).
  - **Password Hashing**: `bcryptjs`.
- **API Layer**: Next.js Server Actions for all backend logic (sign-in, sign-up, sign-out).
- **Rate Limiting**: Implemented with `@upstash/ratelimit` on server actions to prevent abuse.
- **Content**: MDX for blog posts and articles, with syntax highlighting via `rehype-pretty-code`.
- **Deployment**: Vercel

---

## III. Authentication Flow & Logic

The authentication system is designed to be secure and efficient, leveraging Next.js features.

1. **Sign-up / Sign-in Pages (`app/(auth)/...`)**:

   - These are Client Components (`'use client'`) that use forms.
   - Form submissions trigger the `signUp` or `signIn` Server Actions.
   - The UI state (e.g., pending status, error messages) is managed by the `useFormState` and `useFormStatus` hooks.

2. **Server Actions (`app/actions/auth.ts`)**:

   - **`signIn`**:
     - Validates input using Zod.
     - Performs IP-based rate limiting.
     - Fetches the user from the database via `lib/dal.ts`.
     - Verifies the password hash.
     - On success, calls `createSession` to generate a JWT and set the `auth_token` cookie.
     - Returns a success/error state to the client-side form.
   - **`signUp`**:
     - Similar flow to `signIn` (validation, rate limiting).
     - Checks if a user with the email already exists.
     - Hashes the password and creates a new user in the database.
     - Creates a session for the new user.
   - **`signOut`**:
     - Deletes the `auth_token` cookie via `deleteSession`.
     - Redirects the user to the `/signin` page.

3. **Session Management (`lib/session.ts`)**:

   - **`createSession(userId)`**: Generates a JWT containing the `userId` and sets it in a secure `httpOnly` cookie.
   - **`deleteSession()`**: Clears the `auth_token` cookie.
   - **`verifyJWT(token)`**: Performs a **stateless, cryptographic verification** of the JWT signature using the `jose` library. It does **not** require a database connection.
   - **`getSession()`**: A cached server-side function that reads the cookie, verifies the JWT, and returns the session payload (e.g., `{ userId }`).

4. **Middleware (`middleware.ts`)**:\

   - **Role**: Acts as the primary gatekeeper for routes. It runs on the Edge.
   - **Logic**:
     - It intercepts incoming requests for pages.
     - It checks for the `auth_token` cookie and uses the stateless `verifyJWT` function to check for a valid session.
     - **Redirects**:
       - Unauthenticated users trying to access protected routes (e.g., `/playground`) are sent to `/signin`.
       - Authenticated users trying to access `/signin` or `/signup` are sent to `/playground`.
   - **Configuration (`config.matcher`)**: The middleware is configured to run only on page routes, specifically excluding static assets (`/assets`, `_next/static`, etc.). This was a **critical fix** to prevent it from running on image/font requests, which was causing crashes due to environment variable resolution issues on the Edge.

5. **Protected Routes & Data Fetching (`app/playground/page.tsx`, `lib/dal.ts`)**:
   - Pages that require authentication are Server Components.
   - They use the `getCurrentUser()` function from `lib/dal.ts`.
   - `getCurrentUser` is a cached function that first calls `getSession()` to get the user ID from the cookie, and _then_ performs a database query to fetch the full user object. This ensures database access only happens in the Node.js environment, not on the Edge.

---

## IV. Project Structure

- **`app/`**: Main application code.
  - `(auth)/`: Route group for sign-in/sign-up pages.
  - `(default)/`: Route group for the main public-facing pages.
  - `actions/`: Server Actions (`auth.ts`).
  - `playground/`: A protected route example.
- **`db/`**: Drizzle ORM schema (`schema.ts`) and connection setup.
- **`lib/`**: Core logic.
  - `dal.ts`: Data Access Layer (database queries).
  - `session.ts`: Session and JWT management.
  - `auth-server.ts`: Server-side auth utilities (password hashing).
- **`middleware.ts`**: Edge middleware for route protection.
- **`content/`**: MDX files for the blog/playbook.
- **Configuration**: `next.config.ts`, `tailwind.config.ts`, `drizzle.config.ts`.

---

## V. Developer's Guide: Modifying Core Features

This section provides guidance on how to modify and extend the application's key features. The architecture is designed to be modular, so changes are often localized to specific files.

### 1. How to Modify the Database Schema

- **File to Edit**: `db/schema.ts`
- **Process**:
  1. **Change the Schema**: Add, remove, or modify tables and columns in `db/schema.ts` using Drizzle ORM's syntax.
  2. **Generate Migrations**: Run `pnpm db:generate` to create a new SQL migration file based on your changes.
  3. **Apply Migrations**: Run `pnpm db:push` to apply the changes to your local development database.
- **Example**: To add a `name` field to the `users` table, you would add `name: text('name')` to the `users` table definition in `db/schema.ts` and then run the migration commands.

### 2. How to Add a New Server Action or API Endpoint

- **File to Edit**: `app/actions/auth.ts` (for auth-related actions) or create a new file in `app/actions/` for other features.
- **Process**:
  1. **Define the Action**: Create an `async` function and mark it with `'use server'` at the top of the file.
  2. **Input Validation**: Use Zod to define a schema for the expected input and validate the `formData` or arguments.
  3. **Business Logic**: Implement the core logic of the action (e.g., interacting with the database via `lib/dal.ts`).
  4. **Return Value**: Return a JSON object that the client-side form can use to update its state.
- **Example**: To create an action to update a user's profile, you would create `updateProfile` in a new `app/actions/user.ts` file, define a Zod schema for the profile data, and then call a new function in `lib/dal.ts` to update the user in the database.

### 3. How to Change Authentication Logic

- **Changing Sign-in/Sign-up Logic**: Modify the `signIn` and `signUp` functions in `app/actions/auth.ts`. This is where you would add logic for things like two-factor authentication or social logins.
- **Changing Session Duration**: Modify the `JWT_EXPIRATION` constant in `lib/session.ts`.
- **Changing Password Hashing**: The password hashing logic is in `lib/auth-server.ts`. You can adjust the `hashPassword` and `verifyPassword` functions there.
- **Adding Protected Routes**: To protect a new route, simply ensure it is **not** in the `PUBLIC_PATHS` array in `middleware.ts`. The middleware will automatically handle the redirection for unauthenticated users.

### 4. How to Add a New Database Query

- **File to Edit**: `lib/dal.ts` (Data Access Layer)
- **Process**:
  1. **Create a Function**: Define a new `async` function for your query (e.g., `getPostBySlug(slug: string)`).
  2. **Use Drizzle**: Use the `db` object (the Drizzle instance) to build and execute your query.
  3. **Cache if Necessary**: For queries that are called frequently, wrap your function in `cache()` from `react` to memoize the results and reduce database load.
- **Where to Use**: These functions should be called from Server Components (for fetching data to render) or Server Actions (for mutations and business logic).

---

### VI. Recent Issue & Resolution: Middleware Crashing on Static Assets

**Problem:** The application was crashing with a `DATABASE_URL is not set` error when loading pages, because the middleware was incorrectly running on requests for static assets (images, fonts).

**Root Cause:** The `middleware.ts` `config.matcher` was too broad. It was intercepting every request, including those for files in `/public/assets`. While the middleware's `verifyJWT` function is stateless, its execution on asset requests triggered a part of the Next.js lifecycle on the Edge that requires server-side environment variables, which were not available, causing the crash.

**Solution:** The `matcher` in `middleware.ts` was updated to explicitly exclude the `/assets/` path, in addition to other static paths like `_next/static` and `_next/image`. This ensures the middleware only runs on actual page routes, completely resolving the issue.

**Status:** Fixed and validated.

---

## VII. Flows & Findings

This section documents specific discoveries and detailed explanations of application flows and features as they are investigated.

### 1. General Authentication Data Flow

This provides a high-level overview of the authentication process.

- **Core Concepts**

  - **Stateless Authentication:** The application uses JSON Web Tokens (JWTs). The server does not store session information; all necessary data is in the JWT itself.
  - **`httpOnly` Cookie:** The JWT is stored in a secure `httpOnly` cookie named `auth_token`, preventing client-side script access and mitigating XSS risks.
  - **Middleware (`middleware.ts`):** Acts as a gatekeeper for all routes, running on the server before any page is rendered to check for a valid JWT and perform redirects.
  - **Server Actions (`app/actions/auth.ts`):** Secure, server-side functions that handle all authentication logic (sign-in, sign-up, sign-out) and are called directly from client components.

- **Key Scenarios**
  - **Sign-In:** A user submits credentials, a Server Action validates them, and `createSession` generates a JWT and sets it in the `auth_token` cookie.
  - **Sign-Up:** Similar to sign-in, but a new user is created in the database before the session is created.
  - **Protected Route Access:** The middleware intercepts the request, verifies the JWT from the cookie, and either allows access or redirects to the sign-in page.

### 2. Finding: Protected Route Access Logic

This details the specific step-by-step process that occurs when a user attempts to access a protected route like `/playground`.

- **Step 1: Request Hits the Middleware**

  - Before Next.js renders any page component, the incoming request is intercepted by the function in `middleware.ts`. The `config` at the bottom of the file ensures it runs on almost every page request.

- **Step 2: Middleware Inspects the Request**

  - The middleware function inspects the `request` object to get the `pathname` (e.g., `/playground`) and to look for the `auth_token` cookie.

- **Step 3: The "Is Authenticated?" Check**
  - **If the user is NOT logged in:**
    - The `auth_token` cookie will not be found.
    - The `isAuthenticated` variable remains `false`.
    - The code checks if the path is in the `PUBLIC_PATHS` array. `/playground` is not.
    - Because the user is unauthenticated and the route is not public, the middleware redirects the browser to the `/signin` page. The protected page component is never executed.
  - **If the user IS logged in:**
    - The `auth_token` cookie is found, and its JWT value is passed to `verifyJWT()` from `lib/session.ts`.
    - `verifyJWT()` uses the `jose` library and the `JWT_SECRET` to validate the token's signature and expiration.
    - If the token is valid, `verifyJWT()` returns the payload (containing the `userId`), and the `isAuthenticated` variable is set to `true`.
    - The middleware then calls `NextResponse.next()`, allowing the request to proceed. Next.js then renders the requested `PlaygroundPage` component.

---

### 3. Finding: Simplification of Main Landing Page

This details the removal of the `/work` page and the integration of its content into the main landing page.

- **Step 1: Removal of `/work` page**

  - The `app/(default)/work` directory was removed from the project.

- **Step 2: Integration of `WorkExperienceTimeline`**

  - The `WorkExperienceTimeline` component was moved to the main `app/(default)/page.tsx` file.

- **Step 3: Removal of References**

  - All references to the `/work` page were removed from the project, including from the sign-in and sign-up pages, the navigation menu, and the middleware.

---

### 4. Finding: Analysis of the original intent behind `AppLoader` component and overall layout

The core idea was to create a visually engaging loading experience before the main content of the website becomes fully visible and
interactive. This is a common pattern for single-page applications or websites with rich initial content.

1. Initial State (Loading):

   - The AppLoader component (represented by the `<div class="fixed inset-0 z-10 h-screen overflow-hidden" style="pointer-events:
auto;"></div>`) was intended to be the only visible element on page load.
   - It would occupy the entire viewport (fixed inset-0 h-screen) and have a high z-index (z-10) to overlay all other content.
   - The overflow-hidden class suggests that any content within this loader would be clipped if it exceeded the viewport, which is
     typical for full-screen animations.
   - The pointer-events: auto; style indicates that this loader was meant to capture all mouse events, preventing interaction with
     the underlying content while it was active.

2. Loading Animation:

   - The AppLoader would run its animation logic (e.g., displaying a logo, progress bar, or other visual effects). This animation
     would give the user feedback that the page is loading and prevent them from seeing a partially loaded or unstyled page.

3. Transition to Ready State:

   - Once the AppLoader completed its animation and the main content was ready, the loader was supposed to become invisible and
     non-interactive.
   - This transition would involve changing its styling (e.g., opacity: 0, display: none, or visibility: hidden) and potentially
     disabling pointer-events to allow interaction with the underlying content.
   - The is-ready class on the main div (`<div class="web-app text-15fx is-ready">`) suggests a mechanism to signal that the
     application is ready, which would then trigger the hiding of the loader and the display of the main content.

4. Main Content Display:
   - After the AppLoader was hidden, the main content elements, specifically the `<div class="header-container">` (header), <main
     class="relative min-h:100vh scroll-content"> (main content area), and <footer>, would become visible and interactive.
   - The `<div class="app-menu fixed inset-x-0 top-0 h-screen transform menu-slide-transition-custom z-[9] overflow-hidden -translate-y-full pointer-events-none invisible"></div>` appears to be a separate component, likely a full-screen navigation
     menu that slides in/out. Its initial state (-translate-y-full pointer-events-none invisible) indicates it's hidden by default
     and only becomes visible when activated (e.g., by clicking a menu icon). Its z-index of z-[9] is slightly lower than the
     AppLoader's z-10, meaning the loader would always be on top of the menu during the initial load.

**Summary of the Underlying Concept:**

The underlying concept is a "preloader" or "splash screen" pattern. The goal is to:

- Enhance User Experience: Provide a smooth and engaging visual experience during initial page load, rather than a blank screen or a
  jumbled layout.
- Mask Loading Time: Hide the complexities of asset loading, data fetching, and component rendering from the user until everything is
  ready.
- Control Initial View: Ensure that the user sees a polished, animated introduction before interacting with the full application.

The current broken state suggests that the mechanism responsible for hiding the AppLoader and revealing the main content is not
functioning as intended. This could be due to issues with:

- The animation completion callback.
- The state management that controls the visibility of the loader.
- CSS transitions or JavaScript logic that manipulates the loader's display, opacity, or visibility properties.
- The is-ready class not being applied or detected correctly.

---

### 5. Finding to be continiued

---
