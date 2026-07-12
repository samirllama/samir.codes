"use client";

// components/contact-cta/ContactCta.tsx
// Closing beat: the conversion panel. The narrative has made the case (build ->
// approach -> proof -> experience); this is where the reader acts. The portrait
// relocated here from the hero (lazy, below the fold) so a face lands next to
// the ask. HUD vocabulary - glow + target-lock brackets - matches the work
// cards. Reveal choreography comes from the shared hook; SSR markup is final.
import { useRef } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import styles from "./ContactCta.module.css";

const EMAIL = "samirllama@gmail.com";

export const ContactCta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Let&apos;s build</p>
        <h2 className={styles.heading} data-reveal-heading>
          Building an agent that has to be right?
        </h2>
        <p className={styles.lede}>
          If you&apos;re putting a model somewhere it has to be correct - pricing,
          compliance, anything a customer sees - I build the guards, the human
          approval step, and the audit trail that make it safe to ship.
        </p>

        <div className={styles.panel} data-reveal>
          <span className={styles.glow} aria-hidden="true" />
          <span className={`${styles.bracket} ${styles.bracketTl}`} aria-hidden="true" />
          <span className={`${styles.bracket} ${styles.bracketTr}`} aria-hidden="true" />
          <span className={`${styles.bracket} ${styles.bracketBl}`} aria-hidden="true" />
          <span className={`${styles.bracket} ${styles.bracketBr}`} aria-hidden="true" />

          <div className={styles.portraitFrame}>
            <Image
              className={styles.portrait}
              src="/assets/profile-pic.webp"
              alt="Samir Lama"
              width={400}
              height={400}
              sizes="(max-width: 640px) 128px, 168px"
            />
          </div>

          <div className={styles.panelBody}>
            <p className={styles.panelLede}>
              Send a line about what you&apos;re building. I read every message.
            </p>
            <div className={styles.actions}>
              <TrackedLink
                href={`mailto:${EMAIL}`}
                location="Contact CTA"
                external
                className={styles.primary}
                ariaLabel={`Email ${EMAIL}`}
              >
                <MdEmail aria-hidden="true" className={styles.primaryIcon} />
                Start a conversation
              </TrackedLink>

              <div className={styles.secondaryRow}>
                <TrackedLink
                  href="https://linkedin.com/in/samirlama-dev"
                  location="Contact CTA"
                  external
                  className={styles.secondary}
                  ariaLabel="Connect on LinkedIn"
                >
                  <FaLinkedin aria-hidden="true" />
                  LinkedIn
                </TrackedLink>
                <TrackedLink
                  href="https://github.com/samirllama"
                  location="Contact CTA"
                  external
                  className={styles.secondary}
                  ariaLabel="See my code on GitHub"
                >
                  <FaGithub aria-hidden="true" />
                  GitHub
                </TrackedLink>
              </div>

              <TrackedLink
                href="/blog"
                location="Contact CTA"
                className={styles.logLink}
              >
                Read the engineering log
                <span aria-hidden="true" className={styles.arrow}>
                  {" "}
                  &rarr;
                </span>
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
