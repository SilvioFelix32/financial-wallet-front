import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@/services/auth.service';
import { confirmForgotPasswordSchema } from '@/lib/validations';
import type { ConfirmForgotPasswordFormData } from '@/interfaces/validations.types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import dynamic from 'next/dynamic';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);
import Link from 'next/link';
import {
  Container,
  FormCard,
  PlayerWrapper,
  FormHeader,
  Title,
  Form,
  FormFields,
  FormGroup,
  FormActions,
  LinkContainer,
  StyledLink,
} from '@/styles/pages/auth.styles';

export default function ConfirmForgotPassword() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const queryEmail = router.query.email as string;
    if (queryEmail) {
      setEmail(queryEmail);
    } else {
      router.push('/auth/forgot-password');
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ConfirmForgotPasswordFormData>({
    resolver: zodResolver(confirmForgotPasswordSchema),
    defaultValues: {
      email: email,
    },
  });

  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  }, [email, setValue]);

  const onSubmit = async (data: ConfirmForgotPasswordFormData) => {
    setError(null);
    setSuccess(null);

    try {
      await authService.confirmForgotPassword({
        email: data.email,
        confirmationCode: data.confirmationCode,
        newPassword: data.newPassword,
      });
      setSuccess('Senha redefinida com sucesso! Redirecionando para login...');
      setTimeout(() => {
        router.push('/auth/signIn');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir senha');
    }
  };

  if (!email) {
    return null;
  }

  return (
    <Container>
      <FormCard>
        <PlayerWrapper>
          <Player
            autoplay
            loop
            src="https://lottie.host/44abdd4b-e3d8-4602-983b-a3cb64e11e6c/HqjtspK3un.json"
            style={{ height: "120px", width: "120px" }}
          />
        </PlayerWrapper>
        <FormHeader>
          <Title>Redefinir Senha</Title>
        </FormHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFields>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                hasError={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmationCode">Código de Confirmação</Label>
              <Input
                id="confirmationCode"
                type="text"
                placeholder="000000"
                maxLength={6}
                hasError={!!errors.confirmationCode}
                {...register('confirmationCode')}
              />
              {errors.confirmationCode && (
                <ErrorMessage>{errors.confirmationCode.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                hasError={!!errors.newPassword}
                {...register('newPassword')}
              />
              {errors.newPassword && (
                <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
              )}
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
          </FormFields>

          <FormActions>
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="primary"
            >
              {isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>

            <LinkContainer>
              <Link href="/auth/signIn">
                <StyledLink>Voltar para login</StyledLink>
              </Link>
            </LinkContainer>
          </FormActions>
        </Form>
      </FormCard>
    </Container>
  );
}

