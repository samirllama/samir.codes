"use client";

// components/contact-cta/ContactCta.tsx
// Closing beat: the conversion panel. The narrative has made the case (build ->
// proof -> experience); this is where the reader acts. The portrait
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

const EMAIL = "samirlama.dev@proton.me";

export const ContactCta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>LET&apos;S CONNECT</p>
        <h2 className={styles.heading} data-reveal-heading>
          Have an idea worth building?
        </h2>
        <p className={styles.lede}>
          Whether it&apos;s AI systems, modern web applications, or solving difficult engineering
          problems, I&apos;d love to hear what you&apos;re working on.
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
              Tell me what you&apos;re building. I&apos;d love to hear about it.
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
                Let&apos;s build something →
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
                  href="https://github.com/yakyetilabs"
                  location="Contact CTA"
                  external
                  className={styles.secondary}
                  ariaLabel="See my code on GitHub"
                >
                  <FaGithub aria-hidden="true" />
                  GitHub
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
