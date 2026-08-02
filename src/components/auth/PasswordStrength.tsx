import { PASSWORD_RULES, evaluatePassword } from '../../utils/password';
import styles from '../../styles/Auth.module.css';

type PasswordStrengthProps = {
  password: string;
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = evaluatePassword(password);

  return (
    <div className={styles.passwordStrength} aria-live="polite">
      <div className={styles.strengthHeading}>
        <span>Password strength</span>
        <strong data-level={strength.level}>{strength.label}</strong>
      </div>

      <div className={styles.strengthBar} aria-hidden="true">
        {[1, 2, 3, 4].map((segment) => (
          <span
            className={segment <= strength.level ? styles.strengthSegmentActive : styles.strengthSegment}
            data-segment={segment}
            key={segment}
          />
        ))}
      </div>

      <ul className={styles.passwordCriteria} aria-label="Password requirements">
        {PASSWORD_RULES.map((rule) => {
          const isMet = strength.results[rule.key];

          return (
            <li className={isMet ? styles.criterionMet : ''} key={rule.key}>
              <span aria-hidden="true">{isMet ? '✓' : '○'}</span>
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
