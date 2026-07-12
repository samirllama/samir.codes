import styles from "./Footer.module.css";

// The conversion CTA + socials now live in the ContactCta beat (id="contact")
// at the end of the homepage narrative. The footer is just the sign-off chrome:
// copyright + colophon, shared across (default) routes.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottomBar}>
        <p>
          &copy; {new Date().getFullYear()} Samir.codes. All rights reserved.
        </p>
        <p>Crafted with Next.js</p>
      </div>
    </footer>
  );
}
