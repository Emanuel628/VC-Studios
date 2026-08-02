import { LessonPreview } from './LessonPreview';
import { PrimaryLink } from './PrimaryLink';
import styles from '../../styles/Landing.module.css';

export function Hero() {
  return (
    <section className={`${styles.page} ${styles.hero}`} id="top" aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <h1 id="hero-title">
          Turn your <span>application idea</span> into a working product with AI — without becoming a traditional programmer.
        </h1>

        <p className={styles.heroClarifier}>VC means Vibe Code.</p>
        <p className={styles.heroDescription}>
          Learn how to plan an application, guide AI through the build, test your work, and bring it to launch.
        </p>

        <div className={styles.heroActions}>
          <PrimaryLink href="#learning-paths">Begin the course</PrimaryLink>
          <a className={styles.secondaryLink} href="#learning-paths">
            See the two learning paths <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <LessonPreview />
    </section>
  );
}
