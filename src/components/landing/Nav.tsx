import { Link } from 'react-router';
import { NotificationBell } from '../nav/NotificationBell';
import { UserMenu } from '../nav/UserMenu';
import { useSession } from '../../lib/authClient';
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

        {session?.user ? (
          <>
            <nav className={styles.navLinks} aria-label="Primary navigation">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/learning-paths">Learning Paths</Link>
              <Link to="/roadmap">Roadmap</Link>
              <span className={styles.navLinkDisabled} aria-disabled="true">
                Resources
              </span>
              <span className={styles.navLinkDisabled} aria-disabled="true">
                Community
              </span>
            </nav>

            <div className={styles.accountLinks}>
              <NotificationBell />
              <UserMenu firstName={session.user.firstName} />
            </div>
          </>
        ) : (
          <>
            <nav className={styles.navLinks} aria-label="Primary navigation">
              <a href="#how-it-works">How it works</a>
              <a href="#learning-paths">Learning paths</a>
              <a href="#about-course">About the course</a>
            </nav>

            <div className={styles.accountLinks}>
              <Link to="/login" className={styles.secondaryLink}>
                Log in
              </Link>
              <PrimaryLink href="/register">Start learning</PrimaryLink>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
