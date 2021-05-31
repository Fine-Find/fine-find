import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthEmission } from '../types/AuthEmission';
import { useAuth } from './useAuth';

export const useRequireAuth = (): AuthEmission => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth.user && auth.isInitialized && router.isReady) {
      router.push('/login');
    }
  }, [auth, router]);

  return auth;
};
