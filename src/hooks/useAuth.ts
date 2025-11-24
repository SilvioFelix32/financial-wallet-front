import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { removeCookie } from '@/utils/cookies';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const hasValidSession = await authService.checkAuthSession();
      if (hasValidSession) {
        await authService.refreshSession();
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);

        const userData = await authService.getUserDataFromToken();
        if (userData) {
          try {
            await userService.createOrSync({
              user_id: userData.user_id,
              name: userData.name,
              email: userData.email,
            });
          } catch (syncError) {
          }
        }
      } else {
        setUser(null);
        removeCookie('cognito_access_token');
        removeCookie('cognito_id_token');
      }
    } catch (error) {
      setUser(null);
      removeCookie('cognito_access_token');
      removeCookie('cognito_id_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const hasValidSession = await authService.checkAuthSession();
      if (hasValidSession) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);

        const userData = await authService.getUserDataFromToken();
        if (userData) {
          try {
            await userService.createOrSync({
              user_id: userData.user_id,
              name: userData.name,
              email: userData.email,
            });
          } catch (syncError) {
          }
        }

        return { success: true };
      }

      const result = await authService.signIn({ email, password });
      if (result.isSignedIn) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        return { success: true };
      }
      return {
        success: false,
        error: 'Login não completado',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro ao fazer login',
      };
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
      router.push('/auth/signIn');
    } catch (error) {
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};

