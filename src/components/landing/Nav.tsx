import { Link } from 'react-router';
import { authClient, useSession } from '../../lib/authClient';
import { PrimaryLink } from './PrimaryLink';
import styles from '../../styles/Landing.module.css';

export function Nav() {
  const { data: session } = useSession();

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

        {session?.user ? (
          <div className={styles.accountLinks}>
            <Link to="/dashboard">Welcome, {session.user.firstName}</Link>
            <button type="button" className={styles.secondaryLink} onClick={() => authClient.signOut()}>
              Log out
            </button>
          </div>
        ) : (
          <div className={styles.accountLinks}>
            <Link to="/login" className={styles.secondaryLink}>
              Log in
            </Link>
            <PrimaryLink href="/register">Start learning</PrimaryLink>
          </div>
        )}
      </div>
    </header>
  );
}
