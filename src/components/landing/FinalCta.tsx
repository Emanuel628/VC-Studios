import { PrimaryLink } from './PrimaryLink';
import styles from '../../styles/Landing.module.css';

export function FinalCta() {
  return (
    <section className={`${styles.page} ${styles.finalCta}`} id="start" aria-labelledby="final-cta-title">
      <p className={styles.sectionEyebrow}>Begin with a clear first step</p>
      <h2 id="final-cta-title">Learn how to finish and publish a website you understand.</h2>
      <p>
        Start Website Foundations, see what completion requires, and choose whether you want to build alongside the program.
      </p>
      <PrimaryLink href="/register">Begin Website Foundations</PrimaryLink>
    </section>
  );
}
