import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { useSession } from '../../lib/authClient';
import styles from '../../styles/Auth.module.css';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className={styles.authPage}>
        <p className={styles.formStatus} role="status">
          Loading your account…
        </p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
