import type { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router';
import styles from '../../styles/Auth.module.css';

type AuthPageShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
  supportingContent?: ReactNode;
  compact?: boolean;
}>;

export function AuthPageShell({
  eyebrow,
  title,
  description,
  supportingContent,
  compact = false,
  children,
}: AuthPageShellProps) {
  return (
    <div className={styles.authPage}>
      <header className={styles.authHeader}>
        <Link className={styles.brand} to="/">
          Platinum VC Studios
        </Link>
        <Link className={styles.backLink} to="/">
          Back to home
        </Link>
      </header>

      <main className={`${styles.authMain} ${compact ? styles.authMainCompact : ''}`}>
        <section className={styles.authIntro} aria-labelledby="auth-page-title">
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id="auth-page-title">{title}</h1>
          <p className={styles.introText}>{description}</p>
          {supportingContent ? <div className={styles.supportingContent}>{supportingContent}</div> : null}
        </section>

        <section className={styles.formPanel}>{children}</section>
      </main>
    </div>
  );
}
