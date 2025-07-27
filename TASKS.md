# Authentication System Implementation Tasks

This file outlines the tasks required to implement the authentication system as detailed in the `design.md` and `requirements.md` documents.

## Phase 1: Core Setup and User Registration

-   [x] **Task 1.1: Install Dependency:** Install `next-auth@beta`.
-   [x] **Task 1.2: Update Database Schema:**
    -   [x] Modify the `users` table in `db/schema.ts` to include `password`, `emailVerified`, and `role` fields.
    -   [x] Create the `password_reset_tokens` table in `db/schema.ts`.
-   [x] **Task 1.3: Configure Next-Auth:**
    -   [x] Create `auth.ts` to configure `next-auth` with the `CredentialsProvider`.
    -   [x] Create the `[...nextauth]` route handler in `app/api/auth/[...nextauth]/route.ts`.
-   [x] **Task 1.4: Implement Sign-Up Form:**
    -   [x] Create the `SignUpForm.tsx` component.
    -   [x] Create the sign-up page at `app/(auth)/signup/page.tsx`.
-   [x] **Task 1.5: Implement Sign-Up Server Action:**
    -   [x] Create a server action to handle the sign-up logic.
    -   [x] Include Zod validation for the sign-up form data.
    -   [x] Use `bcryptjs` to hash the password.
    -   [x] Use Drizzle ORM to create the user in the database.

## Phase 2: User Login and Session Management

-   [x] **Task 2.1: Implement Sign-In Form:**
    -   [x] Create the `SignInForm.tsx` component.
    -   [x] Create the sign-in page at `app/(auth)/signin/page.tsx`.
-   [x] **Task 2.2: Implement Sign-In Logic:**
    -   [x] Use the `signIn` function from `next-auth/react` in the `SignInForm.tsx` component.
    -   [x] Implement the `authorize` callback in `auth.ts` to validate user credentials.
-   [x] **Task 2.3: Implement Session Management:**
    -   [x] Update `middleware.ts` to protect routes using `next-auth` middleware.
    -   [x] Create a component to display the user's session status and a logout button.

## Phase 3: Password Reset

-   [x] **Task 3.1: Implement Forgot Password Form:**
    -   [x] Create the `ForgotPasswordForm.tsx` component.
    -   [x] Create the forgot password page.
-   [x] **Task 3.2: Implement Forgot Password Server Action:**
    -   [x] Create a server action to handle the forgot password logic.
    -   [x] Generate a password reset token.
    -   [x] Store the hashed token in the database.
    -   [x] (Placeholder) Log the email that would be sent.
-   [x] **Task 3.3: Implement Reset Password Form:**
    -   [x] Create the `ResetPasswordForm.tsx` component.
    -   [x] Create the reset password page.
-   [x] **Task 3.4: Implement Reset Password Server Action:**
    -   [x] Create a server action to handle the reset password logic.
    -   [x] Validate the reset token.
    -   [x] Update the user's password in the database.

## Phase 4: Final Touches

-   [x] **Task 4.1: UI/UX Refinements:**
    -   [x] Ensure all forms and pages are styled consistently with the rest of the application.
    -   [x] Add loading states and toast notifications for all actions.
-   [ ] **Task 4.2: Security Hardening:**
    -   [ ] Implement rate limiting on all relevant server actions.
    -   [ ] Review and configure security headers in `next.config.ts`.
-   [ ] **Task 4.3: Testing:**
    -   [ ] Write unit tests for all server actions and validation schemas.
    -   [ ] Write integration tests for the authentication flows.