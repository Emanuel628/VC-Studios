import { Link } from 'react-router';
import { EmailVerifiedBadge } from '../../components/account/EmailVerifiedBadge';
import { PublicPageShell } from '../../components/layout/PublicPageShell';
import { useSession } from '../../lib/authClient';
import styles from '../../styles/Dashboard.module.css';

// Structure preview only, from the approved module map (docs/website-foundations-high-level-module-map.md).
// No chapters or lessons exist yet, and no progress is tracked yet - see README §9.7 and §14.2 on honest completion
// and progress claims.
const modules = [
  { title: 'Program Orientation, Path Selection, and the First Plan Entry', checkpoint: null },
  { title: 'Planning Before Prompting', checkpoint: 'Plan or blueprint approval' },
  { title: 'Tool Selection and Directing AI With Control', checkpoint: null },
  { title: 'Architecture and the Shared Foundation', checkpoint: 'Architecture or file-map checkpoint' },
  { title: 'Building Pages With Purpose', checkpoint: null },
  { title: 'Responsive, Accessible, and Working', checkpoint: null },
  { title: 'Testing, Defects, and Recovery', checkpoint: null },
  { title: 'Publishing the Website', checkpoint: null },
  { title: 'Structured Explanation and Final Completion Review', checkpoint: 'Final completion review' },
];

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
            <span className={styles.eyebrow}>Structure preview</span>
            <h2 id="dashboard-program-title">Website Foundations</h2>
            <p>
              The module map is approved. Chapters and lessons are still being written, so this list previews the
              program's structure - it is not your live progress yet.
            </p>
            <ol className={styles.moduleList}>
              {modules.map((module, index) => (
                <li key={module.title}>
                  <span className={styles.moduleNumber}>{index + 1}</span>
                  <div>
                    <p className={styles.moduleTitle}>{module.title}</p>
                    {module.checkpoint ? (
                      <span className={styles.checkpointBadge}>Checkpoint: {module.checkpoint}</span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </PublicPageShell>
  );
}
