import styles from './EmailVerifiedBadge.module.css';

type EmailVerifiedBadgeProps = {
  verified: boolean;
};

export function EmailVerifiedBadge({ verified }: EmailVerifiedBadgeProps) {
  return (
    <span className={`${styles.badge} ${verified ? styles.badgeVerified : styles.badgeUnverified}`}>
      {verified ? 'Email verified' : 'Email not verified'}
    </span>
  );
}
