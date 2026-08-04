import { Link } from 'react-router';
import { PublicPageShell } from '../../components/layout/PublicPageShell';
import styles from '../../styles/Resources.module.css';

// Only real, currently-existing destinations. No invented guides, templates, or
// comparison charts - those come later, once there's real chapter content to attach
// them to (README §22.3: parallel work must not invent unapproved content).
const RESOURCES = [
  {
    title: 'Program Roadmap',
    description: 'The approved module map and where the three review checkpoints happen.',
    to: '/roadmap',
  },
  {
    title: 'Learning Paths',
    description: 'Compare Guided Build-Along and Coursework-Only, or change your choice.',
    to: '/learning-paths',
  },
  {
    title: 'How Website Foundations Works',
    description: 'The public overview of the process this program teaches.',
    to: '/#how-it-works',
  },
  {
    title: 'Terms & Conditions',
    description: 'The current terms for using Platinum VC Studios.',
    to: '/terms',
  },
  {
    title: 'Privacy Policy',
    description: 'What information is collected today, and what is planned.',
    to: '/privacy',
  },
];

export function ResourcesPage() {
  return (
    <PublicPageShell>
      <div className={styles.page}>
        <p className={styles.eyebrow}>Website Foundations</p>
        <h1>Resources</h1>
        <p className={styles.subtitle}>
          Lesson-specific guides and templates will appear here once chapters are written. For now, this links to
          what's actually available today.
        </p>

        <ul className={styles.resourceList}>
          {RESOURCES.map((resource) => (
            <li key={resource.title}>
              <Link to={resource.to} className={styles.resourceCard}>
                <span className={styles.resourceTitle}>{resource.title}</span>
                <span className={styles.resourceDescription}>{resource.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PublicPageShell>
  );
}
