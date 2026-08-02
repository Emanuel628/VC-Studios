import styles from '../../styles/Landing.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.page} ${styles.footerInner}`}>
        <a className={styles.brand} href="#top">Platinum VC Studios</a>

        <nav className={styles.legalLinks} aria-label="Legal">
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
}
