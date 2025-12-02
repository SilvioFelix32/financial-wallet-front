import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { removeCookie } from '@/utils/cookies';
import type { AuthUser, LoginResult, AuthStoreState } from '@/interfaces/auth.interfaces';

const createUserAttributes = (userData: {
  user_id: string;
  email: string;
  name: string;
}): AuthUser => ({
  sub: userData.user_id,
  email: userData.email,
  name: userData.name,
});

const syncUserToDatabase = async (userData: {
  user_id: string;
  name: string;
  email: string;
}) => {
  try {
    await userService.createOrSync(userData);
  } catch (error) {
    console.error('Erro ao sincronizar usuário:', error);
  }
};

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  loading: true,
  checked: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setChecked: (checked) => set({ checked }),

  checkAuth: async () => {
    const { checked } = get();
    if (checked) {
      return;
    }

    set({ loading: true });

    try {
      if (!authService.isAuthenticated()) {
        set({
          user: null,
          loading: false,
          checked: true,
        });
        removeCookie('cognito_access_token');
        removeCookie('cognito_id_token');
        return;
      }

      const userData = await authService.getUserDataFromToken();
      if (userData) {
        const userAttributes = createUserAttributes(userData);
        set({
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
        set({
          user: currentUser as AuthUser,
          loading: false,
          checked: true,
        });
      } else {
        set({
          user: null,
          loading: false,
          checked: true,
        });
        removeCookie('cognito_access_token');
        removeCookie('cognito_id_token');
      }
    } catch (error) {
      set({
        user: null,
        loading: false,
        checked: true,
      });
      removeCookie('cognito_access_token');
      removeCookie('cognito_id_token');
    }
  },

  login: async (email: string, password: string): Promise<LoginResult> => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getUserDataFromToken();
        if (userData) {
          const userAttributes = createUserAttributes(userData);
          set({
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
          set({
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
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao fazer login';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  logout: async () => {
    try {
      await authService.signOut();
      set({
        user: null,
        checked: false,
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },
}));

