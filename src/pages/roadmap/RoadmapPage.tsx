import { PublicPageShell } from '../../components/layout/PublicPageShell';
import { WEBSITE_FOUNDATIONS_MODULES } from '../../lib/moduleMap';
import styles from '../../styles/Roadmap.module.css';

export function RoadmapPage() {
  return (
    <PublicPageShell>
      <div className={styles.page}>
        <p className={styles.eyebrow}>Website Foundations</p>
        <h1>Program roadmap</h1>
        <p className={styles.subtitle}>
          The module map is approved. Chapters and lessons are still being written, so this is the program's
          structure, not a lesson-by-lesson syllabus yet.
        </p>

        <ol className={styles.moduleList}>
          {WEBSITE_FOUNDATIONS_MODULES.map((module, index) => (
            <li key={module.title} className={styles.module}>
              <span className={styles.moduleNumber}>{index + 1}</span>
              <div>
                <p className={styles.moduleTitle}>{module.title}</p>
                {module.checkpoint ? <span className={styles.checkpointBadge}>Checkpoint: {module.checkpoint}</span> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </PublicPageShell>
  );
}
