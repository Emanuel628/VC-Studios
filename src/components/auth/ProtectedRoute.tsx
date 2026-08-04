import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { useSession } from '../../lib/authClient';
import { FormStatus } from './FormStatus';
import styles from '../../styles/Auth.module.css';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className={styles.authPage}>
        <FormStatus message="Loading your account…" />
      </div>
    );
  }

  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
