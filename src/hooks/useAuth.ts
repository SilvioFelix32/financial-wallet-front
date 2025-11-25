import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { removeCookie } from '@/utils/cookies';
import type { AuthUser, AuthState, LoginResult } from '@/interfaces/auth.interfaces';

const globalAuthState: AuthState = {
  user: null,
  loading: true,
  checked: false,
};

const listeners = new Set<(state: AuthState) => void>();
let checkPromise: Promise<void> | null = null;

const updateGlobalState = (updates: Partial<AuthState>) => {
  Object.assign(globalAuthState, updates);
  listeners.forEach((listener) => listener({ ...globalAuthState }));
};

const syncUserToDatabase = async (userData: { user_id: string; name: string; email: string }) => {
  try {
    await userService.createOrSync(userData);
  } catch (error) {
    console.error('Erro ao sincronizar usuário:', error);
  }
};

const createUserAttributes = (userData: { user_id: string; email: string; name: string }): AuthUser => ({
  sub: userData.user_id,
  email: userData.email,
  name: userData.name,
});

const clearAuthState = () => {
  updateGlobalState({
    user: null,
    loading: false,
    checked: true,
  });
  removeCookie('cognito_access_token');
  removeCookie('cognito_id_token');
};

const checkAuth = async (): Promise<void> => {
  if (globalAuthState.checked) {
    return;
  }

  if (checkPromise) {
    await checkPromise;
    return;
  }

  checkPromise = (async () => {
    try {
      updateGlobalState({ loading: true });

      if (!authService.isAuthenticated()) {
        clearAuthState();
        return;
      }

      const userData = await authService.getUserDataFromToken();
      if (userData) {
        const userAttributes = createUserAttributes(userData);
        updateGlobalState({
          user: userAttributes,
          loading: false,
          checked: true,
        });
        await syncUserToDatabase(userData);
        return;
      }

      const hasValidSession = await authService.checkAuthSession();
      if (hasValidSession) {
        const currentUser = await authService.getCurrentUser();
        updateGlobalState({
          user: currentUser as AuthUser,
          loading: false,
          checked: true,
        });
      } else {
        clearAuthState();
      }
    } catch (error) {
      clearAuthState();
    } finally {
      checkPromise = null;
    }
  })();

  await checkPromise;
};

export const useAuth = () => {
  const [localState, setLocalState] = useState<AuthState>({ ...globalAuthState });
  const router = useRouter();

  useEffect(() => {
    const listener = (state: AuthState) => {
      setLocalState({ ...state });
    };

    listeners.add(listener);
    setLocalState({ ...globalAuthState });

    if (!globalAuthState.checked) {
      checkAuth();
    }

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getUserDataFromToken();
        if (userData) {
          const userAttributes = createUserAttributes(userData);
          updateGlobalState({
            user: userAttributes,
            checked: true,
          });
          await syncUserToDatabase(userData);
        }
        return { success: true };
      }

      const result = await authService.signIn({ email, password });
      if (result.isSignedIn) {
        const userData = await authService.getUserDataFromToken();
        if (userData) {
          const userAttributes = createUserAttributes(userData);
          updateGlobalState({
            user: userAttributes,
            checked: true,
          });
        }
        return { success: true };
      }

      return {
        success: false,
        error: 'Login não completado',
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.signOut();
      updateGlobalState({
        user: null,
        checked: false,
      });
      router.push('/auth/signIn');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }, [router]);

  return {
    user: localState.user,
    loading: localState.loading,
    login,
    logout,
    isAuthenticated: !!localState.user,
  };
};

