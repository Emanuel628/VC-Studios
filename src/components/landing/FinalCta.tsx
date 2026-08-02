import { PrimaryLink } from './PrimaryLink';
import styles from '../../styles/Landing.module.css';

export function FinalCta() {
  return (
    <section className={`${styles.page} ${styles.finalCta}`} id="start" aria-labelledby="final-cta-title">
      <p className={styles.sectionEyebrow}>Begin with a clear first step</p>
      <h2 id="final-cta-title">Learn the process. Choose whether to build alongside it.</h2>
      <p>
        Start with the course introduction, understand what will be expected, and select the learning path that fits you.
      </p>
      <PrimaryLink href="#learning-paths">Begin the course</PrimaryLink>
    </section>
  );
}
