import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PublicPageShell } from '../../components/layout/PublicPageShell';
import { chooseLearningPath, fetchDashboard, type LearningPath } from '../../lib/dashboardClient';
import styles from '../../styles/LearningPaths.module.css';

const PATHS: Array<{ key: LearningPath; title: string; description: string; points: string[] }> = [
  {
    key: 'GUIDED',
    title: 'Guided Build-Along',
    description:
      'Choose an approved basic website project and build it one manageable step at a time while completing the program.',
    points: [
      'Apply each chapter to a growing website',
      'Use your own development and AI accounts',
      'Finish with practical testing, recovery, and deployment experience',
    ],
  },
  {
    key: 'COURSEWORK',
    title: 'Coursework-Only',
    description:
      'Learn through written lessons, examples, exercises, corrections, and understanding checks without publishing the guided website.',
    points: [
      'Complete the same core Website Foundations lessons',
      'Practice with realistic plans, file maps, and defect scenarios',
      'Prove your judgment through cumulative coursework evidence',
    ],
  },
];

export function LearningPathsPage() {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savingPath, setSavingPath] = useState<LearningPath | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchDashboard()
      .then((data) => setCurrentPath(data.learningPath))
      .catch(() => setStatus('Could not load your current path.'))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleChoose(path: LearningPath) {
    setSavingPath(path);
    setStatus('');
    try {
      await chooseLearningPath(path);
      setCurrentPath(path);
    } catch {
      setStatus('Could not save your learning path. Try again.');
    } finally {
      setSavingPath(null);
    }
  }

  return (
    <PublicPageShell>
      <div className={styles.page}>
        <p className={styles.eyebrow}>Website Foundations</p>
        <h1>Choose your learning path</h1>
        <p className={styles.subtitle}>
          Both paths teach the same process. You can change your choice later.
        </p>

        {isLoading ? (
          <p className={styles.status} role="status">
            Loading…
          </p>
        ) : (
          <div className={styles.pathsGrid}>
            {PATHS.map((path) => {
              const isCurrent = currentPath === path.key;
              return (
                <article className={`${styles.pathCard} ${isCurrent ? styles.pathCardSelected : ''}`} key={path.key}>
                  {isCurrent ? <span className={styles.currentBadge}>Your current path</span> : null}
                  <h2>{path.title}</h2>
                  <p>{path.description}</p>
                  <ul>
                    {path.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={styles.chooseButton}
                    disabled={isCurrent || savingPath !== null}
                    onClick={() => handleChoose(path.key)}
                  >
                    {isCurrent ? 'Selected' : savingPath === path.key ? 'Saving…' : 'Choose this path'}
                  </button>
                </article>
              );
            })}
          </div>
        )}

        {status ? (
          <p className={styles.status} role="status">
            {status}
          </p>
        ) : null}

        {currentPath ? (
          <button type="button" className={styles.backLink} onClick={() => navigate('/dashboard')}>
            ← Back to dashboard
          </button>
        ) : null}
      </div>
    </PublicPageShell>
  );
}
