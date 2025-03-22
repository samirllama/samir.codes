// components/mdx/Callout.tsx

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "success";
}

const calloutStyles = {
  info: "bg-blue-50 border-blue-500 text-blue-900",
  warning: "bg-yellow-50 border-yellow-500 text-yellow-900",
  success: "bg-green-50 border-green-500 text-green-900",
};

export function Callout({ children, type = "info" }: CalloutProps) {
  const style = calloutStyles[type] || calloutStyles.info;

  return (
    <div className={`p-4 border-l-4 rounded-r ${style} my-6`}>{children}</div>
  );
}
