# Task: [Clear and Concise Task Title - e.g., Implement User Profile Page]

**Date:** [Current Date - e.g., 2025-06-27]
**Author:** [Your Name/Alias]
**Status:** [Draft/In Progress/Review/Complete]

## 1. Objective

[Clearly state the primary goal of this task. What are we trying to achieve? What problem are we solving? Be specific.]
_Example: Implement a user profile page where authenticated users can view and update their basic information (name, email)._
_Example: Fix the bug where unauthenticated users are briefly shown the protected '/work' page before redirection._

## 2. Context & Dependencies

[Provide any specific context relevant to *this specific task* that might not be in the general `GEMINI.md` or needs emphasis. Mention relevant existing files, components, or API endpoints that will be affected or used.]

- **Relevant Files/Components:**
  - `app/work/page.tsx` (where the profile link will reside)
  - `app/actions/user.ts` (new server actions for profile updates)
  - `lib/dal.ts` (existing Drizzle ORM functions for user data)
  - `app/api/auth/[...nextauth]/route.ts` (if using NextAuth.js, or relevant auth context if using our current JWT setup)
- **Existing UI/UX:** [Describe existing UI elements, or attach a screenshot reference.]
- **Database Schema:** [Mention any existing tables or fields relevant to this task.]
  - _Example: Users table already has 'id', 'email', 'name' fields._
- **External Services/APIs:** [If this task involves new or existing external APIs.]

## 3. Requirements (Phased Approach Recommended)

[Break down the task into logical, actionable phases. This is crucial for iterative refinement. Clearly define what needs to be done in each phase.]

### Phase 0: Planning & Setup

- [What initial setup or planning is needed before coding begins? E.g., "Outline the new database schema changes." or "Identify affected components."]
  - _Example: Define the new `profiles` table schema in `db/schema.ts` (if different from users table)._

### Phase 1: Core Implementation

- [Detail the primary coding work for this phase.]
  - _Example: Create `app/profile/page.tsx` (a client component) with a form to display and edit user name/email._
  - _Example: Implement `getUserProfile` and `updateUserProfile` Server Actions in `app/actions/user.ts` to interact with Drizzle ORM._
  - _Example: Create corresponding Drizzle ORM queries in `lib/dal.ts`._

### Phase 2: Integration & UI

- [How does this integrate with the rest of the application? UI/UX considerations.]
  - _Example: Add a "Profile" link to the user dashboard (`app/work/page.tsx`)._
  - _Example: Implement loading states and error handling for the profile form using `useFormStatus` and `useFormState`._
  - _Example: Apply Tailwind CSS styling consistent with the existing custom theme._

### Phase 3: Testing & Validation

- [What specific tests need to be performed to validate this feature?]
  - _Example: Verify users can view their profile data correctly._
  - _Example: Verify users can update their name/email, and changes persist in the database._
  - _Example: Test validation for invalid input (e.g., empty name, invalid email format)._
  - _Example: Ensure only authenticated users can access `/profile`._

### Phase 4: Deployment Considerations

- [Any specific deployment steps or considerations for this task?]
  - _Example: Confirm Drizzle schema push will automatically run on Vercel deployment if schema changed._
  - _Example: Any new environment variables needed?_

## 4. Expected Output / Deliverables

[What exactly do you expect Gemini to provide? Code snippets, file modifications, explanations, plans?]

- _Example: Updated code for `app/profile/page.tsx`._
- _Example: New file `app/actions/user.ts`._
- _Example: Modifications to `lib/dal.ts`._
- _Example: Plan for database migration (if needed)._
- _Example: Explanation of proposed changes._

## 5. Constraints & Preferences

[Any specific limitations, preferred libraries, or coding styles beyond what's in `GEMINI.md` for *this task*.]

- _Example: Use `zod` for all form input validation._
- _Example: Prefer `nanoid` for ID generation if new IDs are needed._
- _Example: Ensure all form submissions use `server actions` with `useFormState`._

---

### How to Use This Template:

1.  **Create a New File:** For each new task, create a new Markdown file (e.g., `tasks/my-new-feature.md`) within your project.
2.  **Fill in the Sections:** Populate the template with all the specific details for your current task. The more thoroughly you fill it out, the better Gemini's understanding will be.
3.  **Feed to Gemini:** When ready, open your Gemini CLI and copy the entire content of this new task file. Paste it into the Gemini CLI prompt.
4.  **Initiate the Conversation:** Start the interaction with a clear request, like: "Please analyze the following task document and let me know your proposed plan for implementing Phase 1."

By consistently using a template like this, you ensure you provide Gemini with a rich, structured context for every task, leading to more efficient and higher-quality AI assistance for your enterprise-grade Next.js development.
