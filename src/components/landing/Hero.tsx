import { LessonPreview } from './LessonPreview';
import { PrimaryLink } from './PrimaryLink';
import styles from '../../styles/Landing.module.css';

export function Hero() {
  return (
    <section className={`${styles.page} ${styles.hero}`} id="top" aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <h1 id="hero-title">
          Turn your <span>website idea</span> into a professional, published website with AI — without becoming a traditional programmer.
        </h1>

        <p className={styles.heroClarifier}>VC means Vibe Code.</p>
        <p className={styles.heroDescription}>
          Learn how to plan a website, guide AI through the build, organize the project, test your work, and publish it.
        </p>

        <div className={styles.heroActions}>
          <PrimaryLink href="/register">Begin Website Foundations</PrimaryLink>
          <a className={styles.secondaryLink} href="#learning-paths">
            See the two learning paths <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <LessonPreview />
    </section>
  );
}
