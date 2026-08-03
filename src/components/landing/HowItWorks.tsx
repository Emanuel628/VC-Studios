import styles from '../../styles/Landing.module.css';

const steps = [
  {
    icon: (
      <svg className={styles.stepIcon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 5.5h13.5L26 10v16.5H8z" />
        <path d="M21.5 5.5V10H26M12 15h10M12 20h7" />
      </svg>
    ),
    title: 'Plan carefully before prompting',
    description: 'Define the problem, intended user, first version, and pages before asking AI to build.',
  },
  {
    icon: (
      <svg className={styles.stepIcon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 8.5h20v13H14l-5.5 4v-4H6z" />
        <path d="M11 13h10M11 17h7" />
      </svg>
    ),
    title: 'Direct AI with clear control',
    description: 'Work on one page or feature at a time, state what must remain unchanged, and reject unnecessary complexity.',
  },
  {
    icon: (
      <svg className={styles.stepIcon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M7 16.5l5 5L25 8.5" />
        <path d="M25 16v9H7V7h11" />
      </svg>
    ),
    title: 'Build, test, and save one piece at a time',
    description: 'Check the work, correct problems, save a stable version, and carry it into the next chapter.',
  },
];

export function HowItWorks() {
  return (
    <section className={`${styles.page} ${styles.section}`} id="how-it-works" aria-labelledby="how-title">
      <div className={styles.sectionIntro}>
        <p className={styles.sectionEyebrow}>A clear, repeatable process</p>
        <h2 id="how-title">How the course works</h2>
      </div>

      <div className={styles.stepsGrid}>
        {steps.map((step, index) => (
          <article className={styles.step} key={step.title}>
            <div className={styles.stepHeadingRow}>
              {step.icon}
              <span className={styles.stepNumber}>0{index + 1}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
