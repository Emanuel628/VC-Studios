import { Link } from 'react-router';
import { EmailVerifiedBadge } from '../../components/account/EmailVerifiedBadge';
import { PublicPageShell } from '../../components/layout/PublicPageShell';
import { useSession } from '../../lib/authClient';
import styles from '../../styles/Dashboard.module.css';

export function DashboardPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const { user } = session;

  return (
    <PublicPageShell>
      <div className={`${styles.page} ${styles.main}`}>
        <h1>Welcome back, {user.firstName}.</h1>
        <p className={styles.subtitle}>
          This is where your Website Foundations progress will live. The program is still being built, so there
          is not much here yet — but your account and plan will carry forward once it opens.
        </p>

        <div className={styles.cardGrid}>
          <section className={styles.card} aria-labelledby="dashboard-account-title">
            <h2 id="dashboard-account-title">Your account</h2>
            <p>{user.email}</p>
            <dl className={styles.row}>
              <dt>Name</dt>
              <dd>
                {user.firstName} {user.lastName}
              </dd>
            </dl>
            <div>
              <EmailVerifiedBadge verified={user.emailVerified} />
            </div>
            <Link className={styles.cardLink} to="/account">
              Manage account settings →
            </Link>
          </section>

          <section className={styles.card} aria-labelledby="dashboard-path-title">
            <h2 id="dashboard-path-title">Learning path</h2>
            <p>
              You will be able to choose Guided Build-Along or Coursework-Only here once Website Foundations
              opens. Both paths teach the same process.
            </p>
          </section>

          <section className={`${styles.card} ${styles.comingSoon}`} aria-labelledby="dashboard-program-title">
            <span className={styles.eyebrow}>Coming soon</span>
            <h2 id="dashboard-program-title">Website Foundations</h2>
            <p>
              The module map and lessons are still being planned and built. Once they are ready, your chapters,
              Build Plan, and progress will appear here.
            </p>
          </section>
        </div>
      </div>
    </PublicPageShell>
  );
}
