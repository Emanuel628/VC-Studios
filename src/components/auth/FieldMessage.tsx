import styles from '../../styles/Auth.module.css';

export function getFieldDescriptionId(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

type FieldMessageProps = {
  id: string;
  error?: string;
  hint?: string;
};

export function FieldMessage({ id, error, hint }: FieldMessageProps) {
  if (error) {
    return (
      <p className={styles.fieldError} id={`${id}-error`}>
        {error}
      </p>
    );
  }

  if (hint) {
    return (
      <p className={styles.fieldHint} id={`${id}-hint`}>
        {hint}
      </p>
    );
  }

  return null;
}
