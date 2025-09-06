import styles from "./About.module.css";

const About = () => {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React/Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "AWS",
    "Azure",
    "Docker",
    "GraphQL",
    "DataDog",
    "Terraform",
  ];

  return (
    <section id="about" className={`section about-section ${styles.about}`}>
      <div className={styles.aboutContent}>
        <div className="about-content">
          <div className={styles.aboutText}>
            <p>
              Hi, I&apos;m <span className={styles.accent}>Samir</span>  —  a
              software engineer and a tech enthusiast. I build high-performance
              web applications that scale.
            </p>
            <p>
              My journey started with a curiosity about how websites work, which
              evolved into a deep love for crafting solutions that make
              people&apos;s lives easier. I specialize in modern web
              technologies and enjoy the challenge of turning complex problems
              into simple, elegant solutions.{" "}
              <a
                href="#experience"
                className={`${styles.viewWorkLink} ${styles.accent}`}
              >
                View My Work
              </a>
            </p>

            <p>
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open source projects, or sharing my
              knowledge through{" "}
              <a
                href="/blog"
                className={`${styles.viewWorkLink} ${styles.accent}`}
              >
                writing
              </a>
              .
            </p>
          </div>

          <div className={styles.skills}>
            <h3>Technologies I Work With</h3>
            <div className={styles.skillGrid}>
              {skills.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
