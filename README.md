# Samir.Codes - Personal Portfolio & Digital Garden

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Welcome to the codebase for my personal website, portfolio, and digital garden, hosted at [samir.codes](https://samir.codes) (replace with your actual domain if different). This project serves as a showcase of my work, a place to share technical insights, and an exploration of modern web development technologies.

## ✨ Features

- **Portfolio Showcase:** Sections detailing professional experience and key projects.
- **Digital Garden / Blog:** Content managed via MDX, featuring articles, notes, and code snippets under `/playbook`.
- **Interactive Elements:** Engaging UI elements including custom animations (`aos`, CSS keyframes), dynamic text effects (`TypingEffect`), particle backgrounds (`Particles`), and 3D visuals (`@react-three/fiber`).
- **Syntax Highlighting:** Beautiful code blocks in MDX content using `rehype-pretty-code`.
- **Theming:** Dark mode support implemented with `next-themes` and CSS variables.
- **Responsive Design:** Optimized for various screen sizes using Tailwind CSS.
- **Authentication (Optional):** Basic sign-in/sign-up flow using Next.js Server Actions (currently placeholder UI, but backend logic exists).

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15.3.0-canary.29) with App Router
- **UI Library:** [React](https://react.dev/) (v19)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.4.1) with CSS Variables for theming
  - Plugins: `@tailwindcss/typography`, `@tailwindcss/forms`, `@tailwindcss/aspect-ratio`, `@tailwindcss/container-queries`
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Content:** [MDX](https://mdxjs.com/) with `remark-gfm` and `rehype-pretty-code`
- **State Management:** React Hooks, `next-themes`
- **Backend Logic:** Next.js Server Actions
- **Validation:** [Zod](https://zod.dev/)
- **Deployment:** [Vercel](https://vercel.com/) (Assumed)
- **Package Manager:** [pnpm](https://pnpm.io/) (v8.15.3)

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/installation) (v8.15.3 or compatible)
- Access to a PostgreSQL database instance.

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/samir.codes.git # Replace with your repo URL
   cd samir.codes
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   - Copy the example environment file:

     ```bash
     cp .env.example .env.local
     ```

   - Fill in the required values in `.env.local`:
     - `DATABASE_URL`: Your PostgreSQL connection string (e.g., `postgresql://user:password@host:port/database`).
     - `SESSION_SECRET`: A strong, random secret key for session management (generate one using `openssl rand -base64 32` or similar).
     - _(Add any other required variables here)_

4. **Database Migrations (Using Drizzle Kit):**

   - _(Ensure you have `drizzle-kit` installed as a dev dependency)_
   - Generate migration files based on schema changes:

     ```bash
     pnpm drizzle:generate # You might need to add this script to package.json
     # Example script: "drizzle:generate": "drizzle-kit generate:pg"
     ```

   - Apply migrations to your database:

     ```bash
     pnpm drizzle:push # You might need to add this script to package.json
     # Example script: "drizzle:push": "drizzle-kit push:pg"
     ```

   - _Note: Adjust script names based on your `package.json`._

5. **Run the development server:**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Creates a production build.
- `pnpm start`: Starts the production server (requires `pnpm build` first).
- `pnpm lint`: Runs ESLint checks.
- `pnpm test`: Runs tests using Vitest (if tests are configured).
- _(Add Drizzle migration scripts here if you added them)_

## 📁 Project Structure

The project uses the Next.js App Router convention:

- `.`: Configuration files (`next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, etc.).
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

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fsamir.codes) <!-- Replace with your actual repo URL -->

Remember to configure the necessary environment variables in your Vercel project settings.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/samir.codes/issues). Please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
