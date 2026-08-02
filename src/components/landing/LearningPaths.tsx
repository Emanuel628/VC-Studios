import styles from '../../styles/Landing.module.css';

export function LearningPaths() {
  return (
    <section className={`${styles.page} ${styles.section}`} id="learning-paths" aria-labelledby="paths-title">
      <div className={styles.sectionIntro}>
        <p className={styles.sectionEyebrow}>Choose how you want to participate</p>
        <h2 id="paths-title">Two valid learning paths</h2>
        <p>
          Both paths teach the same process. Building alongside the course is available, but it is not required to learn the material.
        </p>
      </div>

      <div className={styles.pathsGrid}>
        <article className={styles.pathCard}>
          <span className={styles.pathNumber}>01</span>
          <h3>Guided Build-Along</h3>
          <p>
            Choose a simple website or software project and build it one manageable step at a time while completing the course.
          </p>
          <ul>
            <li>Apply each chapter to a growing project</li>
            <li>Use your own development and AI accounts</li>
            <li>Finish with practical build and deployment experience</li>
          </ul>
        </article>

        <article className={styles.pathCard}>
          <span className={styles.pathNumber}>02</span>
          <h3>Coursework-Only</h3>
          <p>
            Learn through written lessons, examples, exercises, and understanding checks without building the guided project right now.
          </p>
          <ul>
            <li>Complete the same core lessons</li>
            <li>Practice with real decisions and scenarios</li>
            <li>Begin a guided project later without restarting</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
