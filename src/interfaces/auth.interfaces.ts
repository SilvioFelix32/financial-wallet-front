export interface SignUpParams {
  email: string;
  password: string;
  name: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface ConfirmSignUpParams {
  email: string;
  confirmationCode: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ConfirmForgotPasswordParams {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

export interface AuthUser {
  sub: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  checked: boolean;
}

export interface AuthStoreState extends AuthState {
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setChecked: (checked: boolean) => void;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}
