import Link from "next/link";
import { Suspense } from "react";
import Button from "@/components/ui/Button";
import DashboardButton from "@/components/DashboardButton";
import Logo from "./logo"
import styles from "./ui.module.css"

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/notes", label: "Notes" },
  { href: "/playbook", label: "Playbook" },
  { href: "/today-i-learned", label: "TIL" },
];

export default function Header() {
  return (
    <header className={styles.header}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div  className={styles.header__inner}>
        {/* Site branding */}
        <div className="flex-1">
          <Logo />
        </div>

        {/* Desktop navigation */}
        <nav className="md:flex md:grow">
          {/* Desktop menu links */}
          <ul className={styles.nav}>
            {LINKS.map((link) => (
              <li key={link.label} className="navItem">
                <Link
                  className={styles.navItem}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign in links */}
        <div className="hidden flex items-center gap-4">
          <Suspense
            fallback={
              <div className="flex items-center space-x-4">
                <Link href="/signin">
                  <Button variant="outline">Sign in</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            }
          >
            <DashboardButton />
          </Suspense>
        </div>
      </div>
      </div>
    </header>
  );
}
