'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './nav.module.css';

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/playbook', label: 'Playbook' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        Samir.
      </div>
      <div className={styles.links}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${pathname === href ? styles.activeLink : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
