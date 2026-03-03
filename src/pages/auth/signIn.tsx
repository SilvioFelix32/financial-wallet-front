import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import { signInSchema } from '@/lib/validations';
import type { SignInFormData } from '@/interfaces/validations.types';
import {
  LoginCard as LoginCardContainer,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  FieldGroup,
  FieldHeader,
  HelperLink,
  PasswordFieldWrapper,
  PasswordToggle,
  SubmitWrapper,
  FooterText,
  FooterLink,
} from '@/styles/pages/index.styles';
import { PlayerWrapper } from '@/styles/pages/auth.styles';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

export const LoginCard = () => {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

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
      router.push('/dashboard');
      return;
    }

    try {
      const result = await login(data.email, data.password);

      if (!result.success) {
        setError(result.error || 'Erro ao fazer login');
        return;
      }

      setSuccess('Login realizado com sucesso!');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    }
  };

  if (loading) {
    return null;
  }

  return (
    <LoginCardContainer>
      <PlayerWrapper>
        <Player
          autoplay
          loop
          src="https://lottie.host/44abdd4b-e3d8-4602-983b-a3cb64e11e6c/HqjtspK3un.json"
          style={{ height: '120px', width: '120px' }}
        />
      </PlayerWrapper>

      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Acesse sua carteira digital</CardDescription>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              hasError={!!errors.email}
              autoComplete="email"
              style={{ height: '36px' }}
              {...register('email')}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FieldGroup>

          <FieldGroup>
            <FieldHeader>
              <Label htmlFor="password">Senha</Label>
              <Link href="/auth/forgot-password" passHref legacyBehavior>
                <HelperLink as="a">Esqueceu sua senha?</HelperLink>
              </Link>
            </FieldHeader>
            <PasswordFieldWrapper>
              <Input
                id="password"
                style={{ height: '36px' }}
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                hasError={!!errors.password}
                autoComplete="current-password"
                {...register('password')}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </PasswordToggle>
            </PasswordFieldWrapper>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FieldGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <SubmitWrapper>
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="primary"
              style={{ height: '36px' }}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </SubmitWrapper>

          <FooterText>
            Não tem uma conta?
            <Link href="/auth/signUp" passHref legacyBehavior>
              <FooterLink as="a">Cadastre-se</FooterLink>
            </Link>
          </FooterText>
        </form>
      </CardBody>
    </LoginCardContainer>
  );
};

export default LoginCard;

