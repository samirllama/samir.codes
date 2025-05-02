// app/work/layout.tsx

import { cn } from "@/lib/utils";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorPlain = "bg-hdr-gradient";

  return (
    <div
      className={cn([
        "box-border block w-full mx-auto",
        `${colorPlain} bg-fixed`,
        "pt-0 pb-16",
        `md:px-8 px-6`,
        "lg:max-w-[70em]",
        // "font-mona-neon",
      ])}
    >
      {children}
    </div>
  );
}
