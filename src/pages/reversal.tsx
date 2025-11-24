import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { revertSchema } from '@/lib/validations';
import type { RevertFormData } from '@/interfaces/validations.types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import { UserHeader } from '@/components/UserHeader';
import {
  Container,
  FormCard,
  Title,
  Form,
  FormGroup,
  ButtonGroup,
} from '@/styles/pages/form.styles';

export default function Reversal() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { revert, revertLoading, revertError } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RevertFormData>({
    resolver: zodResolver(revertSchema),
  });

  if (authLoading) {
    return (
      <Container>
        <FormCard>Carregando...</FormCard>
      </Container>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth/signIn');
    return null;
  }

  const onSubmit = async (data: RevertFormData) => {
    setError(null);
    setSuccess(null);

    try {
      revert(data, {
        onSuccess: (response) => {
          setSuccess(
            `Transação revertida com sucesso! Novo saldo: R$ ${response.balance.toFixed(2)}`
          );
          reset();
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        },
        onError: (err: any) => {
          setError(
            err.response?.data?.message || 'Erro ao reverter transação'
          );
        },
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao reverter transação');
    }
  };

  return (
    <Container>
      <UserHeader showLogout={false} />
      <FormCard>
        <Title>Reverter Transação</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="transactionId">ID da Transação</Label>
            <Input
              id="transactionId"
              type="text"
              placeholder="123e4567-e89b-12d3-a456-426614174000"
              hasError={!!errors.transactionId}
              {...register('transactionId')}
            />
            {errors.transactionId && (
              <ErrorMessage>{errors.transactionId.message}</ErrorMessage>
            )}
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {revertError && (
            <ErrorMessage>
              {(revertError as any)?.response?.data?.message ||
                'Erro ao reverter transação'}
            </ErrorMessage>
          )}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <ButtonGroup>
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => router.push('/dashboard')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              fullWidth
              disabled={revertLoading}
              variant="danger"
            >
              {revertLoading ? 'Processando...' : 'Reverter'}
            </Button>
          </ButtonGroup>
        </Form>
      </FormCard>
    </Container>
  );
}

