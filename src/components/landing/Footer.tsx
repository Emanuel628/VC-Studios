import styles from '../../styles/Landing.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.page} ${styles.footerInner}`}>
        <div>
          <a className={styles.brand} href="#top">Platinum VC Studios</a>
          <p>VC means Vibe Code.</p>
        </div>

        <nav className={styles.footerLinks} aria-label="Footer navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#learning-paths">Learning paths</a>
          <a href="#about-course">About the course</a>
        </nav>

        <p className={styles.privacyNote}>
          We will never ask for your external account passwords, private API keys, or recovery codes.
        </p>
      </div>
    </footer>
  );
}
