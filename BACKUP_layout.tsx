// app/playbook/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Samir's Playbook",
    default: "Playbook",
  },
  description:
    "Engineering Playbook with insights on web development, security, and technology",
};

// This layout now simply renders its children.
// The overall site structure (header/footer/main padding) comes from app/(default)/layout.tsx
// The specific two-column layout for articles comes from ArticleLayout used within the .mdx files.
export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // Render children directly
}
