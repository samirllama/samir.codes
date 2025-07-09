
import { cn } from "@/lib/utils";
import Footer from "@/components/ui/footer";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={cn([
          "grow min-h-screen",
          "bg-hdr-gradient",
          "[background-attachment:fixed]",
        ])}
        className="opacity-100"
      >
        

        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
