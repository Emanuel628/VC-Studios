import { CourseStepIcon } from './CourseStepIcon';
import styles from '../../styles/Landing.module.css';

const steps = [
  {
    icon: 'plan' as const,
    title: 'Plan carefully before prompting',
    description: 'Define the problem, intended user, first version, and pages before asking AI to build.',
  },
  {
    icon: 'direct' as const,
    title: 'Direct AI with clear control',
    description: 'Work on one page or feature at a time, state what must remain unchanged, and reject unnecessary complexity.',
  },
  {
    icon: 'build' as const,
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
              <CourseStepIcon type={step.icon} />
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
