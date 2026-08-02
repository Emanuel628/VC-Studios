import styles from '../../styles/Landing.module.css';

type CourseStepIconProps = {
  type: 'plan' | 'direct' | 'build';
};

export function CourseStepIcon({ type }: CourseStepIconProps) {
  if (type === 'plan') {
    return (
      <svg className={styles.stepIcon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 5.5h13.5L26 10v16.5H8z" />
        <path d="M21.5 5.5V10H26M12 15h10M12 20h7" />
      </svg>
    );
  }

  if (type === 'direct') {
    return (
      <svg className={styles.stepIcon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 8.5h20v13H14l-5.5 4v-4H6z" />
        <path d="M11 13h10M11 17h7" />
      </svg>
    );
  }

  return (
    <svg className={styles.stepIcon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M7 16.5l5 5L25 8.5" />
      <path d="M25 16v9H7V7h11" />
    </svg>
  );
}
