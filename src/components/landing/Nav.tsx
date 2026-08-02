import { PrimaryLink } from './PrimaryLink';
import styles from '../../styles/Landing.module.css';

export function Nav() {
  return (
    <header className={styles.siteHeader}>
      <div className={`${styles.page} ${styles.navInner}`}>
        <a className={styles.brand} href="#top" aria-label="Platinum VC Studios home">
          Platinum VC Studios
        </a>

        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#learning-paths">Learning paths</a>
          <a href="#about-course">About the course</a>
        </nav>

        <PrimaryLink href="#learning-paths">Start learning</PrimaryLink>
      </div>
    </header>
  );
}
