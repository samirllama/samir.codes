"use client";

import { usePathname } from "next/navigation";
import styles from "./AppHeader.module.css";
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import NameLogo from "./NameLogo";

interface AppHeaderProps {
  toggleAction: () => void;
  isMenuOpen: boolean;
}

const AppHeader = () => {
  const pathname = usePathname();

  const navItems = [
    // { href: "/", label: "Home" },
    // { href: "/blog", label: "Blog" },
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Work" },
    { href: "/#projects", label: "Projects" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.glass}>
        <TrackedLink
          href="/"
          location="Header Logo"
          className={styles.logo}
          aria-label="Navigate to homepage"
        >
          <NameLogo />
        </TrackedLink>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <li key={item.href} className="nav-item">
                <TrackedLink
                  href={item.href}
                  className={`${styles.navLink} ${
                    pathname === item.href ? styles.active : ""
                  }`}
                >
                  {item.label}
                </TrackedLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
