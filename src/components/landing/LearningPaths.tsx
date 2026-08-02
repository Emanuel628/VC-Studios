import styles from '../../styles/Landing.module.css';

export function LearningPaths() {
  return (
    <section className={`${styles.page} ${styles.section}`} id="learning-paths" aria-labelledby="paths-title">
      <div className={styles.sectionIntro}>
        <p className={styles.sectionEyebrow}>Choose how you want to participate</p>
        <h2 id="paths-title">Two valid learning paths</h2>
        <p>
          Both paths teach the Website Foundations process. Building alongside the program is available, but it is not required to learn the material.
        </p>
      </div>

      <div className={styles.pathsGrid}>
        <article className={styles.pathCard}>
          <span className={styles.pathNumber}>01</span>
          <h3>Guided Build-Along</h3>
          <p>
            Choose an approved basic website project and build it one manageable step at a time while completing the program.
          </p>
          <ul>
            <li>Apply each chapter to a growing website</li>
            <li>Use your own development and AI accounts</li>
            <li>Finish with practical testing, recovery, and deployment experience</li>
          </ul>
        </article>

        <article className={styles.pathCard}>
          <span className={styles.pathNumber}>02</span>
          <h3>Coursework-Only</h3>
          <p>
            Learn through written lessons, examples, exercises, corrections, and understanding checks without publishing the guided website.
          </p>
          <ul>
            <li>Complete the same core Website Foundations lessons</li>
            <li>Practice with realistic plans, file maps, and defect scenarios</li>
            <li>Prove your judgment through cumulative coursework evidence</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
