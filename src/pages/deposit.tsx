import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { depositSchema } from '@/lib/validations';
import type { DepositFormData } from '@/interfaces/validations.types';
import { formatCurrencyInput, parseNumber } from '@/utils/formatters';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import { UserHeader } from '@/components/UserHeader';
import {
  Container,
  Wrapper,
  FormCard,
  Title,
  Form,
  FormGroup,
  ButtonGroup,
} from '@/styles/pages/form.styles';


export default function Deposit() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { deposit, depositLoading, depositError } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
  });

  if (authLoading) {
    return (
      <Container>
        <Wrapper>
          <FormCard>Carregando...</FormCard>
        </Wrapper>
      </Container>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth/signIn');
    return null;
  }

  const onSubmit = async (data: DepositFormData) => {
    setError(null);
    setSuccess(null);

    try {
      deposit(data, {
        onSuccess: (response) => {
          setSuccess(
            `Depósito realizado com sucesso! Novo saldo: R$ ${response.balance.toFixed(2)}`
          );
          reset();
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        },
        onError: (err: any) => {
          setError(
            err.response?.data?.message || 'Erro ao realizar depósito'
          );
        },
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar depósito');
    }
  };

  return (
    <Container>
      <UserHeader showLogout={false} />
      <Wrapper>
        <FormCard>
          <Title>Depositar</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="amount">Valor (R$)</Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      id="amount"
                      type="text"
                      placeholder="R$ 0,00"
                      hasError={!!errors.amount}
                      value={formatCurrencyInput(field.value ? (field.value * 100).toString() : '')}
                      onChange={(e) => {
                        const parsed = parseNumber(e.target.value);
                        field.onChange(parsed);
                      }}
                      onBlur={field.onBlur}
                    />
                  );
                }}
              />
              {errors.amount && (
                <ErrorMessage>{errors.amount.message}</ErrorMessage>
              )}
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {depositError && (
              <ErrorMessage>
                {(depositError as any)?.response?.data?.message ||
                  'Erro ao realizar depósito'}
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
                disabled={depositLoading}
                variant="primary"
              >
                {depositLoading ? 'Processando...' : 'Depositar'}
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>
      </Wrapper>
    </Container>
  );
}

