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

export interface LoginResult {
  success: boolean;
  error?: string;
}
