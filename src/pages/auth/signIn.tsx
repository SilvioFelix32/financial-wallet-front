import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { signInSchema } from '@/lib/validations';
import type { SignInFormData } from '@/interfaces/validations.types';
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
import { getCookie } from '@/utils/cookies';
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

export default function SignIn() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      let attempts = 0;
      const maxAttempts = 3;
      
      const checkAndRedirect = () => {
        attempts++;
        const hasCookie = getCookie('cognito_access_token');
        if (hasCookie) {
          const redirect = router.query.redirect as string || '/dashboard';
          window.location.href = redirect;
        } else if (attempts < maxAttempts) {
          setTimeout(checkAndRedirect, 200);
        }
      };
      checkAndRedirect();
    }
  }, [isAuthenticated, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setError(null);
    setSuccess(null);

    if (isAuthenticated) {
      const redirect = router.query.redirect as string;
      router.push(redirect || '/dashboard');
      return;
    }

    try {
      const result = await login(data.email, data.password);

      if (!result.success) {
        setError(result.error || 'Erro ao fazer login');
        return;
      }

      setSuccess('Login realizado com sucesso!');
      
      const redirect = router.query.redirect as string || '/dashboard';
      await router.replace(redirect);
    } catch (error: any) {
      setError(error.message || 'Erro ao fazer login');
    }
  };

  if (loading) {
    return (
      <Container>
        <FormCard>
          <Title>Carregando...</Title>
        </FormCard>
      </Container>
    );
  }

  if (isAuthenticated) {
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
          <Title>Entrar</Title>
        </FormHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFields>
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

            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                hasError={!!errors.password}
                {...register('password')}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
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
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>

            <LinkContainer>
              <Link href="/auth/forgot-password">
                <StyledLink>Esqueceu sua senha?</StyledLink>
              </Link>
            </LinkContainer>

            <LinkContainer>
              Não tem uma conta?{' '}
              <Link href="/auth/signUp">
                <StyledLink>Cadastre-se</StyledLink>
              </Link>
            </LinkContainer>
          </FormActions>
        </Form>
      </FormCard>
    </Container>
  );
}

