import styles from '../../styles/Landing.module.css';

export function LessonPreview() {
  return (
    <div className={styles.lessonPreview} aria-label="Preview of a Platinum VC Studios lesson">
      <div className={styles.previewTopbar}>
        <div>
          <span className={styles.previewEyebrow}>Chapter 1</span>
          <span className={styles.previewSeparator} aria-hidden="true">·</span>
          <span>Introduction</span>
        </div>
        <span>Lesson preview</span>
      </div>

      <div className={styles.previewBody}>
        <p className={styles.previewKicker}>How the program builds</p>
        <h2>Each lesson strengthens what you already learned.</h2>
        <p>
          You will learn one clear idea, see it in practice, and use it before moving to the next chapter.
        </p>

        <div className={styles.audioPreview} aria-label="Optional audio preview">
          <span className={styles.playIcon} aria-hidden="true">▶</span>
          <span>
            <strong>Optional audio</strong>
            <small>Listen or continue reading</small>
          </span>
          <span className={styles.audioDuration}>2 min</span>
        </div>

        <div className={styles.guidedStep}>
          <span className={styles.guidedLabel}>Guided build step</span>
          <p>Choose the approved basic website project you want to build as Website Foundations progresses.</p>
        </div>

        <div className={styles.previewProgress} aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
