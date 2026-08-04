import styles from '../../styles/Auth.module.css';

type FormStatusProps = {
  message?: string;
  className?: string;
};

export function FormStatus({ message, className = '' }: FormStatusProps) {
  if (!message) return null;

  return (
    <p className={`${styles.formStatus} ${className}`.trim()} role="status">
      {message}
    </p>
  );
}
