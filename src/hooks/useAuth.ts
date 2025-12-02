import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const router = useRouter();
  const { user, loading, checked, checkAuth, login: storeLogin, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    if (!checked) {
      checkAuth();
    }
  }, [checked, checkAuth]);

  const login = async (email: string, password: string) => {
    return await storeLogin(email, password);
  };

  const logout = async () => {
    await storeLogout();
    router.push('/auth/signIn');
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};

