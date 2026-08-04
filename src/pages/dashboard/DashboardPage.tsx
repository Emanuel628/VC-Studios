import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PublicPageShell } from '../../components/layout/PublicPageShell';
import { fetchDashboard, type DashboardData } from '../../lib/dashboardClient';
import { useSession } from '../../lib/authClient';
import styles from '../../styles/Dashboard.module.css';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  const dayDiff = Math.floor((Date.now() - date.getTime()) / 86_400_000);

  if (dayDiff <= 0) return 'Today';
  if (dayDiff === 1) return 'Yesterday';
  return `${dayDiff} days ago`;
}

const PATH_LABELS: Record<string, string> = {
  GUIDED: 'Guided Build-Along',
  COURSEWORK: 'Coursework-Only',
};

export function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch(() => setError('Could not load your dashboard. Try refreshing the page.'));
  }, []);

  if (!session?.user) {
    return null;
  }

  const { user } = session;
  const progressPercent = data ? Math.round((data.checkpoints.passed / data.checkpoints.total) * 100) : 0;
  const ringOffset = CIRCUMFERENCE - (CIRCUMFERENCE * progressPercent) / 100;

  return (
    <PublicPageShell>
      <div className={styles.page}>
        {error ? (
          <p className={styles.errorStatus} role="alert">
            {error}
          </p>
        ) : null}

        <section className={styles.hero} aria-labelledby="dashboard-welcome-title">
          <div className={styles.heroMain}>
            <h1 id="dashboard-welcome-title">
              <span className={styles.heroEyebrow}>Welcome back,</span> {user.firstName} 👋
            </h1>
            <p className={styles.heroSubtitle}>Let's keep building. You're making progress.</p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to="/roadmap">
                Continue Learning →
              </Link>
              <Link className={styles.secondaryButton} to="/roadmap">
                View Roadmap
              </Link>
            </div>
          </div>

          <div className={styles.heroProgress}>
            <svg className={styles.progressRing} viewBox="0 0 120 120" aria-hidden="true">
              <circle className={styles.progressRingTrack} cx="60" cy="60" r={RADIUS} />
              <circle
                className={styles.progressRingValue}
                cx="60"
                cy="60"
                r={RADIUS}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={ringOffset}
              />
            </svg>
            <div className={styles.progressRingLabel}>
              <span className={styles.progressPercent}>{progressPercent}%</span>
            </div>
            <p className={styles.progressCaption}>Overall Progress</p>
            <p className={styles.progressSubcaption}>Website Foundations</p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>{data?.streak ?? 0}</strong>
              <span>Day Streak</span>
            </div>
            <div className={styles.heroStat}>
              <strong>{data?.points ?? 0}</strong>
              <span>Points Earned</span>
            </div>
            <div className={styles.heroStat}>
              <strong>
                {data?.checkpoints.passed ?? 0} / {data?.checkpoints.total ?? 3}
              </strong>
              <span>Checkpoints Passed</span>
            </div>
          </div>
        </section>

        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.quickActions}>
          <Link className={styles.quickAction} to="/roadmap">
            <h3>Continue Learning</h3>
            <p>See the program roadmap and pick up from here.</p>
          </Link>
          <Link className={styles.quickAction} to="/learning-paths">
            <h3>Choose Learning Path</h3>
            <p>Guided Build-Along or Coursework-Only.</p>
          </Link>
          <Link className={styles.quickAction} to="/roadmap">
            <h3>View Roadmap</h3>
            <p>See the full program structure and checkpoints.</p>
          </Link>
          <a className={styles.quickAction} href="#rewards">
            <h3>Earn Rewards</h3>
            <p>See what you've earned and what's next.</p>
          </a>
        </div>

        <div className={styles.twoColumn}>
          <section className={styles.card} aria-labelledby="current-path-title">
            <div className={styles.currentPathHeader}>
              <h2 id="current-path-title">Your Current Path</h2>
              {data?.learningPath ? (
                <span className={styles.pathBadge}>{PATH_LABELS[data.learningPath]}</span>
              ) : null}
            </div>

            {data?.learningPath ? (
              <>
                <p className={styles.subtitle}>Website Foundations</p>
                <p>Build professional websites with AI guidance and structured learning.</p>
              </>
            ) : (
              <p>
                You haven't chosen a path yet.{' '}
                <Link to="/learning-paths">Choose Guided Build-Along or Coursework-Only</Link> to get started.
              </p>
            )}

            <Link className={styles.cardLink} to="/roadmap">
              See the program roadmap →
            </Link>
          </section>

          <section className={styles.card} aria-labelledby="rewards-title" id="rewards">
            <h2 id="rewards-title">Rewards &amp; Progress</h2>
            <ul className={styles.badgeList}>
              {data?.badges.map((badge) => (
                <li key={badge.key} className={badge.earned ? styles.badgeEarned : styles.badgeLocked}>
                  <span className={styles.badgeStatus} aria-hidden="true">
                    {badge.earned ? '✓' : '○'}
                  </span>
                  <div>
                    <p className={styles.badgeLabel}>{badge.label}</p>
                    <p className={styles.badgeDescription}>{badge.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.card} aria-labelledby="activity-title">
          <h2 id="activity-title">Recent Activity</h2>
          {data && data.recentActivity.length > 0 ? (
            <ul className={styles.activityList}>
              {data.recentActivity.map((event, index) => (
                <li key={index}>
                  <span>{event.message}</span>
                  <span className={styles.activityDate}>{formatRelativeDate(event.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.subtitle}>No activity yet.</p>
          )}
        </section>
      </div>
    </PublicPageShell>
  );
}
