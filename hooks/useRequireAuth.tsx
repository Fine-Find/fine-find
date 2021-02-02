import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {useAuth} from "./useAuth";
export const useRequireAuth = () => {
    const auth = useAuth();
    const router = useRouter();
    console.log("useRequireAuth:", auth)
    useEffect(() => {
        if (!auth.user) {
            router.push('/login');
        }
    }, [auth, router]);

    return auth;
};