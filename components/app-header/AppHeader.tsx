"use client";

import { usePathname } from "next/navigation";
import styles from "./AppHeader.module.css";
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import NameLogo from "./NameLogo";
import ThemeToggle from "@/components/ThemeToggle";

const AppHeader = () => {
  const pathname = usePathname();

  const navItems = [
    // The left side rail is the desktop section nav; this header nav is the
    // only nav on mobile (rails are display:none there), so it stays to two
    // items that fit 375px without clipping.
    { href: "/#work", label: "Work" },
    { href: "/#experience", label: "Experience" },
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
            {navItems.map((item) => (
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
        <ThemeToggle />
      </div>
    </header>
  );
};

export default AppHeader;
