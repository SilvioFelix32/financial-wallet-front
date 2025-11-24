import type { z } from 'zod';
import type {
  signUpSchema,
  signInSchema,
  depositSchema,
  transferSchema,
  revertSchema,
  confirmSignUpSchema,
  forgotPasswordSchema,
  confirmForgotPasswordSchema,
} from '@/lib/validations';

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type DepositFormData = z.infer<typeof depositSchema>;
export type TransferFormData = z.infer<typeof transferSchema>;
export type RevertFormData = z.infer<typeof revertSchema>;
export type ConfirmSignUpFormData = z.infer<typeof confirmSignUpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ConfirmForgotPasswordFormData = z.infer<typeof confirmForgotPasswordSchema>;

