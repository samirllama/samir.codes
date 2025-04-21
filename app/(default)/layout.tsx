import "aos/dist/aos.css";
import Header from "@/components/ui/header";
import SwipeHeader from "../../components/ui/swipe-header";
import Footer from "@/components/ui/footer";
import Animate from "@/components/animate";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Animate />

      <SwipeHeader />

      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
