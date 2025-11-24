import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@/services/auth.service';
import { confirmSignUpSchema } from '@/lib/validations';
import type { ConfirmSignUpFormData } from '@/interfaces/validations.types';
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

export default function ConfirmSignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const queryEmail = router.query.email as string;
    if (queryEmail) {
      setEmail(queryEmail);
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ConfirmSignUpFormData>({
    resolver: zodResolver(confirmSignUpSchema),
    defaultValues: {
      email: email,
    },
  });

  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  }, [email, setValue]);

  const onSubmit = async (data: ConfirmSignUpFormData) => {
    setError(null);
    setSuccess(null);

    try {
      await authService.confirmSignUp({
        email: data.email,
        confirmationCode: data.confirmationCode,
      });
      setSuccess('Conta confirmada com sucesso! Redirecionando para login...');
      setTimeout(() => {
        router.push('/auth/signIn');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao confirmar conta');
    }
  };

  if (!email) {
    return null;
  }

  return (
    <Container>
      <FormCard>
        <Title>Confirmar Cadastro</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
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

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            variant="primary"
          >
            {isSubmitting ? 'Confirmando...' : 'Confirmar'}
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

