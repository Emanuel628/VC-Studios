import type { InputHTMLAttributes } from 'react';
import styles from '../../styles/Auth.module.css';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function FormField({ id, label, error, hint, className = '', ...inputProps }: FormFieldProps) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const fieldClasses = [styles.input, error ? styles.inputError : '', className].filter(Boolean).join(' ');

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={fieldClasses}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        {...inputProps}
      />
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
