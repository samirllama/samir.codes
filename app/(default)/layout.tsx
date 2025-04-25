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
      <Header />

      <main className="grow" style={{ opacity: 1 }}>
        <div className="pt-[65px] lg:pt-[70px]">{children}</div>
      </main>
      <Footer />
    </>
  );
}
