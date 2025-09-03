"use client";

import { FaGithub, FaLinkedin, FaMastodon } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import styles from "./Footer.module.css";
import { TrackedLink } from "@/features/analytics/components/tracked-link";

const socialLinks = [
  {
    href: "mailto:samirllama@gmail.com",
    label: "Email",
    icon: <MdEmail className={styles.socialIcon} />,
  },
  {
    href: "https://github.com/samirllama",
    label: "GitHub",
    icon: <FaGithub className={styles.socialIcon} />,
  },
  {
    href: "https://linkedin.com/in/samirlama-dev",
    label: "LinkedIn",
    icon: <FaLinkedin className={styles.socialIcon} />,
  },
  {
    href: "https://x.com/Baki_cakes",
    label: "X",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.socialIconX}
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    href: "https://mastodon.social/@samirdev",
    label: "Mastodon",
    icon: <FaMastodon className={styles.socialIcon} />,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Have a project in mind?</h2>
        <span className={styles.talk}>Let&apos;s connect.</span>
        <nav className={styles.socialsNav}>
          {socialLinks.map(({ href, label, icon }) => (
            <TrackedLink
              key={href}
              href={href}
              location="Footer Socials"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${label} profile`}
              className={styles.socialLink}
            >
              {icon}
            </TrackedLink>
          ))}
        </nav>

        <div className={styles.bottomBar}>
          <p>
            &copy; {new Date().getFullYear()} Samir.codes. All rights reserved.
          </p>
          <p>Crafted with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
