import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

export const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const depositSchema = z.object({
  amount: z
    .number()
    .positive('Valor deve ser positivo')
    .min(0.01, 'Valor mínimo é R$ 0,01')
    .max(1000000, 'Valor máximo é R$ 1.000.000,00'),
});

export const transferSchema = z.object({
  toUserId: z.string().uuid('ID do usuário inválido'),
  amount: z
    .number()
    .positive('Valor deve ser positivo')
    .min(0.01, 'Valor mínimo é R$ 0,01')
    .max(1000000, 'Valor máximo é R$ 1.000.000,00'),
});

export const revertSchema = z.object({
  transactionId: z.string().uuid('ID da transação inválido'),
});

export const confirmSignUpSchema = z.object({
  email: z.string().email('Email inválido'),
  confirmationCode: z.string().min(6, 'Código deve ter 6 caracteres').max(6, 'Código deve ter 6 caracteres'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export const confirmForgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
  confirmationCode: z.string().min(6, 'Código deve ter 6 caracteres').max(6, 'Código deve ter 6 caracteres'),
  newPassword: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    ),
});
