import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class Animations {
    static initIntroAnimation() {
        const tl = gsap.timeline();

        // Set initial
        gsap.set(".hero-logo", { opacity: 0, y: 30 });
        gsap.set(".hero-text", { opacity: 0, y: 20 });
        gsap.set(".nav-item", { opacity: 0, x: -20 });
        gsap.set(".section", { opacity: 0, y: 50 });

        // Intro sequence
        tl.to(".hero-logo", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
        })
            .to(
                ".hero-text",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.3"
            )
            .to(
                ".nav-item",
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.4"
            )
            .to(
                ".section",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                },
                "-=0.2"
            );

        return tl;
    }

    static initScrollAnimations() {
        // About section
        gsap.fromTo(
            ".about-content",
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                    end: "bottom 20%",
                },
            }
        );

        // Projects staggered reveal
        gsap.fromTo(
            ".project-card",
            {
                opacity: 0,
                x: -30,
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 80%",
                },
            }
        );

        // Blog teaser with parallax
        gsap.fromTo(
            ".blog-teaser-bg",
            {
                y: -50,
            },
            {
                y: 50,
                scrollTrigger: {
                    trigger: ".blog-teaser",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            ".blog-card",
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: ".blog-cards",
                    start: "top 85%",
                },
            }
        );
    }

    static initPostAnimations() {
        gsap.fromTo(
            ".post-hero",
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            }
        );

        gsap.fromTo(
            ".post-content > *",
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".post-content",
                    start: "top 90%",
                },
            }
        );
    }

    static pageTransition() {
        return gsap.fromTo(
            "main",
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
            }
        );
    }
}
