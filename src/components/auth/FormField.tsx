import type { InputHTMLAttributes } from 'react';
import { FieldMessage, getFieldDescriptionId } from './FieldMessage';
import styles from '../../styles/Auth.module.css';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function FormField({ id, label, error, hint, className = '', ...inputProps }: FormFieldProps) {
  const fieldClasses = [styles.input, error ? styles.inputError : '', className].filter(Boolean).join(' ');

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={fieldClasses}
        aria-invalid={Boolean(error)}
        aria-describedby={getFieldDescriptionId(id, error, hint)}
        {...inputProps}
      />
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
}
