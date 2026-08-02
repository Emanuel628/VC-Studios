import { useState, type InputHTMLAttributes } from 'react';
import styles from '../../styles/Auth.module.css';

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function PasswordField({ id, label, error, hint, ...inputProps }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.passwordInputWrap}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          type={isVisible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
          {...inputProps}
        />
        <button
          className={styles.passwordToggle}
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          aria-label={`${isVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error ? (
        <p className={styles.fieldError} id={`${id}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className={styles.fieldHint} id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
