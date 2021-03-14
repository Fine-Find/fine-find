import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from './useAuth';

export const useRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();
  // eslint-disable-next-line no-console
  console.log('useRequireAuth:', auth);
  useEffect(() => {
    if (!auth.user) {
      router.push('/login');
    }
  }, [auth, router]);

  return auth;
};
