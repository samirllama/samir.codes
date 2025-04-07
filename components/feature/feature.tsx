import Image from "next/image";
import Highlighter, { HighlighterItem } from "../highlight/highlighter";
import Img04 from "@/public/assets/img-4.png";
import styles from "./feature.module.css";

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.featureBox}>
        <div className={styles.contentWrapper}>
          {/* Section header */}
          <div className={styles.header}>
            <h2 className={styles.h2}>More than a login box</h2>
            <p className={styles.description}>
              There are many variations available, but the majority have
              suffered alteration in some form, by injected humour, or
              randomized words which don&apos;t look even slightly believable.
            </p>
          </div>

          <div className={styles.imageContainer}>
            <div data-aos="fade-down">
              <Highlighter className="group">
                <HighlighterItem>
                  <div className={styles.imageWrapper}>
                    {/* Radial gradient */}
                    <div className={styles.radialGradient} aria-hidden="true">
                      <div className={styles.gradientCircle} />
                    </div>
                    <Image
                      src={Img04}
                      width={768}
                      height={400}
                      alt="Feature 04"
                    />
                  </div>
                </HighlighterItem>
              </Highlighter>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
