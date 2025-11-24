import {
  signUp,
  signIn,
  signOut,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  fetchUserAttributes,
  fetchAuthSession,
} from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import type {
  SignUpParams,
  SignInParams,
  ConfirmSignUpParams,
  ForgotPasswordParams,
  ConfirmForgotPasswordParams,
} from '@/interfaces/auth.interfaces';
import { userService } from './user.service';
import { awsConfig } from '@/aws/aws-config';
import { setCookie, removeCookie, getCookie } from '@/utils/cookies';

Amplify.configure(awsConfig);

const decodeJwt = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const authService = {
  async signUp({ email, password, name }: SignUpParams) {
    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });
      return result;
    } catch (error: any) {
      throw new Error('Erro ao criar conta: ' + error.message);
    }
  },

  async signIn({ email, password }: SignInParams) {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
        options: {
          authFlowType: 'USER_SRP_AUTH',
        },
      });

      if (!isSignedIn) {
        return { isSignedIn, nextStep };
      }

      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session.tokens?.accessToken || !session.tokens?.idToken) {
        throw new Error('Erro ao obter tokens de autenticação');
      }

      const accessToken = session.tokens.accessToken.toString();
      const idToken = session.tokens.idToken.toString();

      setCookie('cognito_access_token', accessToken, 7);
      setCookie('cognito_id_token', idToken, 7);

      const decodedToken = decodeJwt(idToken);
      const user_id = decodedToken.sub as string;
      const userName = decodedToken.name as string || email;

      if (!user_id) {
        throw new Error('Erro ao obter ID do usuário do token');
      }

      const user = await userService.createOrSync({
        user_id,
        name: userName,
        email,
      });

      if (!user || !user.user_id) {
        throw new Error('Erro ao criar ou sincronizar usuário no banco de dados');
      }

      return { isSignedIn, nextStep };
    } catch (error: any) {
      removeCookie('cognito_access_token');
      removeCookie('cognito_id_token');
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  },

  async signOut(): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        const idToken = getCookie('cognito_id_token');
        if (idToken) {
          try {
            const decodedToken = decodeJwt(idToken);
            const user_id = decodedToken.sub as string;
            if (user_id) {
              removeCookie(`user_synced_${user_id}`);
            }
          } catch (error) {
          }
        }
      }

      await signOut();
      removeCookie('cognito_access_token');
      removeCookie('cognito_id_token');
    } catch (error: any) {
      throw new Error('Erro ao fazer logout: ' + error.message);
    }
  },

  async getUserAttributes() {
    try {
      const attributes = await fetchUserAttributes();
      return attributes;
    } catch (error: any) {
      throw new Error('Erro ao obter atributos do usuário: ' + error.message);
    }
  },

  async getCurrentUser() {
    try {
      const attributes = await fetchUserAttributes();
      return attributes;
    } catch (error) {
      return null;
    }
  },

  async getUserDataFromToken() {
    try {
      const idToken = getCookie('cognito_id_token');
      if (!idToken) {
        return null;
      }

      const decodedToken = decodeJwt(idToken);
      if (!decodedToken) {
        return null;
      }

      const user_id = decodedToken.sub as string;
      const email = decodedToken.email as string;
      const userName = decodedToken.name as string || email;

      if (!user_id || !email) {
        return null;
      }

      return {
        user_id,
        email,
        name: userName,
      };
    } catch (error) {
      return null;
    }
  },

  async fetchUserSession() {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      return session.tokens;
    } catch (error: any) {
      throw new Error('Erro ao obter a sessão do usuário: ' + error.message);
    }
  },

  async refreshSession() {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      if (session.tokens?.accessToken) {
        const accessToken = session.tokens.accessToken.toString();
        setCookie('cognito_access_token', accessToken, 7);
      }
      if (session.tokens?.idToken) {
        const idToken = session.tokens.idToken.toString();
        setCookie('cognito_id_token', idToken, 7);
      }
      return session.tokens;
    } catch (error: any) {
      throw new Error('Erro ao atualizar a sessão do usuário: ' + error.message);
    }
  },

  async getAccessToken(): Promise<string | null> {
    try {
      const session = await fetchAuthSession({ forceRefresh: false });
      return session.tokens?.accessToken?.toString() || null;
    } catch (error) {
      return null;
    }
  },

  async confirmSignUp({ email, confirmationCode }: ConfirmSignUpParams) {
    try {
      const result = await confirmSignUp({
        username: email,
        confirmationCode,
      });

      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session.tokens?.accessToken || !session.tokens?.idToken) {
        throw new Error('Erro ao obter tokens de autenticação');
      }

      const accessToken = session.tokens.accessToken.toString();
      const idToken = session.tokens.idToken.toString();

      setCookie('cognito_access_token', accessToken, 7);
      setCookie('cognito_id_token', idToken, 7);

      const decodedToken = decodeJwt(idToken);
      const user_id = decodedToken.sub as string;
      const userName = decodedToken.name as string || email;

      if (!user_id) {
        throw new Error('Erro ao obter ID do usuário do token');
      }

      const user = await userService.createOrSync({
        user_id,
        name: userName,
        email,
      });

      if (!user || !user.user_id) {
        throw new Error('Erro ao criar ou sincronizar usuário no banco de dados');
      }

      return result;
    } catch (error: any) {
      removeCookie('cognito_access_token');
      removeCookie('cognito_id_token');
      throw new Error('Erro ao confirmar cadastro: ' + error.message);
    }
  },

  async forgotPassword({ email }: ForgotPasswordParams) {
    try {
      const result = await resetPassword({
        username: email,
      });
      return result;
    } catch (error: any) {
      throw new Error('Erro ao solicitar redefinição de senha: ' + error.message);
    }
  },

  async confirmForgotPassword({
    email,
    confirmationCode,
    newPassword,
  }: ConfirmForgotPasswordParams) {
    try {
      const result = await confirmResetPassword({
        username: email,
        confirmationCode,
        newPassword,
      });
      return result;
    } catch (error: any) {
      throw new Error('Erro ao confirmar redefinição de senha: ' + error.message);
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!getCookie('cognito_access_token');
  },

  async checkAuthSession(): Promise<boolean> {
    try {
      const session = await fetchAuthSession({ forceRefresh: false });
      return !!session.tokens?.accessToken;
    } catch (error) {
      return false;
    }
  },
};
