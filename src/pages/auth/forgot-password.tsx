import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@/services/auth.service';
import { forgotPasswordSchema } from '@/lib/validations';
import type { ForgotPasswordFormData } from '@/interfaces/validations.types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import Link from 'next/link';
import {
  Container,
  FormCard,
  Title,
  Form,
  FormGroup,
  LinkContainer,
  StyledLink,
} from '@/styles/pages/auth.styles';

export default function ForgotPassword() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);
    setSuccess(null);

    try {
      await authService.forgotPassword({
        email: data.email,
      });
      setSuccess('Código de redefinição enviado! Verifique seu email.');
      setTimeout(() => {
        router.push({
          pathname: '/auth/confirm-forgot-password',
          query: { email: data.email },
        });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao solicitar redefinição de senha');
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Esqueci minha senha</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              hasError={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            variant="primary"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Código'}
          </Button>

          <LinkContainer>
            <Link href="/auth/signIn">
              <StyledLink>Voltar para login</StyledLink>
            </Link>
          </LinkContainer>
        </Form>
      </FormCard>
    </Container>
  );
}

