Directory Structure (Optimized for your needs):

Copy
/my-website
├── app/
│   ├── (home)/
│   │   └── page.tsx         # Landing page
│   ├── about/
│   │   └── page.tsx         # Experience/About me
│   ├── projects/
│   │   └── page.tsx         # Projects showcase
│   ├── posts/
│   │   ├── page.tsx         # Posts list
│   │   └── [postId]/
│   │       └── page.tsx     # Dynamic post page
│   ├── layout.tsx           # Root layout
│   └── head.tsx             # Global meta tags
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── sections/            # Page sections
│   └── icons/               # Custom SVG icons
├── content/
│   └── posts/               # MDX blog posts
├── public/
│   ├── images/              # Optimized images
│   └── assets/              # PDFs, other downloads
├── styles/
│   └── globals.css          # Global Tailwind imports
├── next.config.js           # MDX config
└── package.json
Core Code Samples:

Dynamic Post Page (app/posts/[postId]/page.tsx):

```typescript
interface PostParams {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PostParams) {
  const post = await getPost(params.postId);

  return (
    <article className="prose mx-auto">
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <PostContent content={post.content} />
    </article>
  );
}
```

Project Card Component (components/sections/ProjectCard.tsx):

```typescript
export default function ProjectCard({
  title,
  description,
  techStack,
  demoUrl,
}: Project) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span key={tech} className="badge badge-outline">
            {tech}
          </span>
        ))}
      </div>
      <Link href={demoUrl} className="btn btn-primary">
        Live Demo
      </Link>
    </div>
  );
}
```

Recommended README Structure (Killer Showcase):

# [Your Name] - Portfolio & Technical Blog 🚀

[![CI/CD](https://github.com/yourusername/yourportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/yourportfolio/actions)
[![Next.js](https://img.shields.io/badge/Next.js-13.5-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)](https://www.typescriptlang.org/)

✨ **Professional portfolio** showcasing engineering expertise with modern web practices
📝 **Technical blog** featuring in-depth articles on full-stack development
🎯 **Performance-first** approach with Lighthouse score of 100

## 🚀 Features

- Dynamic blog system with MDX content
- Responsive UI with CSS animations
- SEO optimization with dynamic meta tags
- CI/CD pipeline with GitHub Actions
- Interactive project showcases with code samples
- Dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **Content**: MDX with Contentlayer
- **Testing**: Jest + React Testing Library
- **Monitoring**: Vercel Analytics

## 📦 Installation

```bash
git clone https://github.com/yourusername/yourportfolio.git
cd yourportfolio
pnpm install
pnpm dev
🌐 Deployment
Vercel (Recommended):
Deploy with Vercel

Static Export:

bash
Copy
pnpm build && pnpm export
🖼️ Screenshots
Light Mode	Dark Mode
Light	Dark
🤝 Contributing
PRs welcome! Please follow:

Conventional commits

Type-safe patterns

Mobile-first approach

📄 License
MIT © [Your Name]

5. **Pro Tips**:
- Add `next-themes` for dark mode support
- Use `contentlayer` for MDX processing
- Implement `next-mdx-remote` for dynamic content
- Add GitHub Actions for automated testing
- Include loading states with Suspense boundaries
- Use `next/image` for optimized images
- Implement `rehype-prism-plus` for code highlighting


5. MDX Content Structure:

```json
/content
  /posts
    /getting-started-with-nextjs
      index.mdx
    /advanced-animations-with-gsap
      index.mdx
Example post (content/posts/getting-started-with-nextjs/index.mdx):
```

---

title: "Getting Started with Next.js 15"
date: 2024-03-20
summary: "A comprehensive guide to building modern web applications with Next.js"
tags:
   - nextjs
  - web development
   - tutorial
---

```ts
import { Callout } from '@/components/mdx/Callout'
```

## Introduction to Next.js Features
```ts
<Callout type="info">
  Next.js 15 introduces major performance improvements with Turbopack!
</Callout>

export const featured = true
```

6. Create MDX Components (components/mdx/Callout.tsx):
```tsx

export function Callout({ type = 'info', children }: {
  type?: 'info' | 'warning' | 'success',
  children: React.ReactNode
}) {
  return (
    <div className={`p-4 rounded-lg border-l-4 ${
      type === 'info' ? 'border-blue-400 bg-blue-50' :
      type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
      'border-green-400 bg-green-50'
    }`}>
      {children}
    </div>
  )
}
```

7. Blog Listing Page (app/posts/page.tsx)


#### Configure Next.js to Use MDX

**Modify the next.config.js to support MDX:**

```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'], // Support MDX along with TypeScript
});
```

This configuration ensures that files with .mdx or .md extensions are treated as pages and processed correctly.

3. Create an MDX Page
    Add a sample MDX file to your pages directory, for example, `src/pages/algorithm.mdx`:

## Understanding Algorithms

Algorithms are step-by-step instructions used to solve specific problems. Here's a simple algorithm for finding the largest number in an array:

```javascript
function findMax(arr) {
  return Math.max(...arr);
}
<InfoBox> MDX allows you to use custom React components within your Markdown! </InfoBox>
```

---

### 4. **Use Custom React Components in MDX**

Enhance the MDX content by defining custom components. For example, create a reusable component called `InfoBox` in `src/components/InfoBox.tsx`:

```tsx
const InfoBox = ({ children }) => {
  return (
    <div style={{
      padding: '1rem',
      margin: '1rem 0',
      backgroundColor: '#f0f8ff',
      borderLeft: '4px solid #0070f3'
    }}>
      {children}
    </div>
  );
};
export default InfoBox;
```

Then, define custom components in src/pages/_app.tsx to make them available globally:

```tsx
import { MDXProvider } from '@mdx-js/react';
import InfoBox from '../components/InfoBox';

const components = {
  InfoBox,
};

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
```

1. Add Syntax Highlighting
For better code presentation in the MDX files, use a library like prism-react-renderer:

```bash
npm install prism-react-renderer
```

Create a syntax highlighting component, e.g., src/components/CodeBlock.tsx:

```tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = ({ className, children }) => {
  const language = className?.replace('language-', '') || '';
  return (
    <SyntaxHighlighter language={language} style={okaidia}>
      {children}
    </SyntaxHighlighter>
  );
};
export default CodeBlock;
```

Then, include it in your MDXProvider:

```tsx
import CodeBlock from '../components/CodeBlock';

const components = {
  InfoBox,
  code: CodeBlock,
};
```

1. Organizing Content
For scalability, we can create a content folder in the src directory to store all `.mdx` files, e.g.:

```json
src/
├── content/
│   ├── algorithms.mdx
│   ├── data-structures.mdx
│   └── math-theories.mdx
```

Then dynamically render these content files using Next.js’s dynamic routes or APIs.
