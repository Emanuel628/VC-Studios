import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSession } from './authClient';

// Navigate once the shared session store actually reflects the new session, rather than
// right after the API call resolves - the store can update a beat later, and ProtectedRoute
// would otherwise see a stale "no session" and bounce straight back to /login.
export function useRedirectWhenSignedIn(to: string) {
  const navigate = useNavigate();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      navigate(to, { replace: true });
    }
  }, [session, navigate, to]);
}
