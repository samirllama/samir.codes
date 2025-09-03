"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Animations } from "@/lib/animations";
import styles from "./Hero.module.css";

import avatar from "@/public/profile.jpeg";

const Hero = () => {
  useEffect(() => {
    Animations.initIntroAnimation();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroText}>
          <h3 className="hero-text">Software Engineer in Chicago</h3>
          <p className={`hero-text ${styles.subtitle}`}>
            Crafting accessible, functional web experiences
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.backdrop}></div>
          <div className={styles.avatarWrap}>
            <Image
              src={avatar}
              alt="Portrait of Samir Lama"
              fill
              priority
              placeholder="blur"
              quality={90}
              sizes="(max-width: 968px) 220px, 300px"
              className={styles.avatar}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
