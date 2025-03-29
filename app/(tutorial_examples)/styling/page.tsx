import UIButton from "@/components/tutorial_examples/UI/Button";
import type { Route } from "next";

export default function StylingExamplePage() {
  const goTo: Route = "/";
  return (
    <>
      <UIButton url={goTo}>
        I&apos;m a UI button, that will open the homepage
      </UIButton>
    </>
  );
}
