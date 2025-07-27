# Samir.Codes - Personal Portfolio & Playbook

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsamirllama%2Fsamir.codes)

Welcome to the codebase for my personal website, portfolio, and digital garden, live at [samir.codes](https://samir.codes). This project is a showcase of my skills in modern web development, a space for sharing technical insights, and a playground for creative coding.

## ✨ Features

*   **Modern Frontend Stack:** Built with Next.js 15 (App Router), React 19, and TypeScript.
*   **Interactive & Animated UI:** Engaging user experience with GSAP, Framer Motion, and custom hooks for animations and interactivity.
*   **Content-as-Code with MDX:** Blog posts and articles are managed as local MDX files. This approach leverages Next.js file-system based routing with dynamic segments. Content is server-rendered on the fly using `next-mdx-remote/rsc` for optimal performance and a seamless content management workflow directly within the codebase.
*   **Database & ORM:** Utilizes a PostgreSQL database with Drizzle ORM for type-safe database access.
*   **Authentication:** Secure user authentication flow implemented with Next.js Server Actions and middleware.
*   **Styling:** Styled with Tailwind CSS, featuring a dark mode theme implemented with `next-themes`.
*   **Code Quality:** Maintained with ESLint and Prettier to ensure clean and consistent code.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Content:** [MDX](https://mdxjs.com/) with `next-mdx-remote`
- **Animation:** [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [pnpm](https://pnpm.io/installation)
- A PostgreSQL database instance.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/samirllama/samir.codes.git
    cd samir.codes
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    - Copy the example environment file:
      ```bash
      cp .env.example .env.local
      ```
    - Fill in the required values in `.env.local`, including your `DATABASE_URL` and `SESSION_SECRET`.

4.  **Run database migrations:**
    ```bash
    pnpm drizzle:generate
    pnpm drizzle:push
    ```
    *(Note: You may need to add these scripts to your `package.json` if they don't exist)*

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

The project follows the Next.js App Router conventions. The content for the blog is managed directly within the `app` directory using MDX files.

### App Directory
```
app/
├───layout.tsx
├───metadata.ts
├───(auth)/
│   └── ... (authentication routes)
├───(default)/
│   ├───layout.tsx
│   ├───page.tsx
│   └───posts/
│       ├── page.tsx         # Lists all posts
│       ├── [slug]/          # Dynamic route for a single post
│       │   └── page.tsx     # Renders the MDX content
│       ├── my-first-post/
│       │   └── page.mdx     # The actual MDX file
│       └── my-new-article/
│           └── page.mdx     # Another MDX file
└── ... (other directories)
```

### Content Workflow

-   **Routing**: The blog uses a dynamic segment `[slug]` to create routes for each post (e.g., `/posts/my-first-post`).
-   **Content Files**: Each blog post is a `page.mdx` file located in a folder named after its slug (e.g., `app/(default)/posts/my-first-post/page.mdx`).
-   **Rendering**: The `app/(default)/posts/[slug]/page.tsx` component reads the corresponding `.mdx` file, compiles it on the server using `next-mdx-remote/rsc`, and renders the content. This allows for server-side rendering of MDX content, including the use of React components within your markdown.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
