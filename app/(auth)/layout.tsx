
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
        style={{ opacity: 1 }}
      >
        

        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
