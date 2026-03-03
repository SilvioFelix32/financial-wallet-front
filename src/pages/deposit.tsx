import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@/hooks/useUser';
import { depositSchema } from '@/lib/validations';
import type { DepositFormData } from '@/interfaces/validations.types';
import { formatCurrency, formatCurrencyInput, parseNumber } from '@/utils/formatters';
import { Button } from '@/components/Button';
import { Label } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import { DashboardLayout } from '@/components/AppSidebar';
import {
  PageSection,
  PageHeader,
  BackLink,
  HeaderText,
  PageTitle,
  PageSubtitle,
  ContentWrapper,
  BalanceCard,
  BalanceCardContent,
  BalanceLabel,
  BalanceValue,
  BalanceToggle,
  DepositFormCard,
  FormCardHeader,
  FormCardTitle,
  FormCardDescription,
  Form,
  FormGroup,
  AmountInputWrapper,
  CurrencyPrefix,
  AmountInput,
  QuickAmountsLabel,
  QuickAmountsGrid,
  QuickAmountButton,
  FormActions,
} from '@/styles/pages/deposit.styles';

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000, 2000];

const IconArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const IconArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
  </svg>
);

const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function Deposit() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { user, userLoading } = useUser();
  const { deposit, depositLoading, depositError } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const balance = user?.balance ?? 0;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
  });

  if (authLoading || userLoading) {
    return (
      <DashboardLayout>
        <PageSection>
          <ContentWrapper>Carregando...</ContentWrapper>
        </PageSection>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated) {
    router.replace('/');
    return null;
  }

  const onSubmit = async (data: DepositFormData) => {
    setError(null);
    setSuccess(null);
    try {
      deposit(data, {
        onSuccess: (response) => {
          setSuccess(`Depósito realizado com sucesso! Novo saldo: ${formatCurrency(response.balance)}`);
          reset();
          setTimeout(() => router.push('/dashboard'), 2000);
        },
        onError: (err: { response?: { data?: { message?: string } } }) => {
          setError(err?.response?.data?.message || 'Erro ao realizar depósito');
        },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao realizar depósito');
    }
  };

  const handleQuickAmount = (value: number) => {
    setValue('amount', value, { shouldValidate: true });
  };

  return (
    <DashboardLayout>
      <PageSection>
        <PageHeader>
          <BackLink href="/dashboard" aria-label="Voltar ao dashboard">
            <IconArrowLeft />
          </BackLink>
          <HeaderText>
            <PageTitle>Depositar</PageTitle>
            <PageSubtitle>Adicione saldo à sua carteira</PageSubtitle>
          </HeaderText>
        </PageHeader>

        <ContentWrapper>
          <BalanceCard>
            <BalanceCardContent>
              <div>
                <BalanceLabel>Saldo Atual</BalanceLabel>
                <BalanceValue>
                  {balanceVisible ? formatCurrency(balance) : '••••••'}
                </BalanceValue>
              </div>
              <BalanceToggle
                type="button"
                onClick={() => setBalanceVisible((v) => !v)}
                aria-label={balanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
              >
                {balanceVisible ? <IconEye /> : <IconEyeOff />}
              </BalanceToggle>
            </BalanceCardContent>
          </BalanceCard>

          <DepositFormCard>
            <FormCardHeader>
              <FormCardTitle>
                <IconArrowDown />
                Novo Depósito
              </FormCardTitle>
              <FormCardDescription>
                Informe o valor que deseja depositar
              </FormCardDescription>
            </FormCardHeader>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label htmlFor="amount">Valor (R$)</Label>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => {
                    const displayValue =
                      field.value != null && field.value > 0
                        ? formatCurrencyInput(Math.round(field.value * 100).toString()).replace(/^R\$\s?/, '')
                        : '';
                    return (
                      <AmountInputWrapper>
                        <CurrencyPrefix>R$</CurrencyPrefix>
                        <AmountInput
                          id="amount"
                          type="text"
                          inputMode="decimal"
                          placeholder="0,00"
                          $hasError={!!errors.amount}
                          value={displayValue}
                          onChange={(e) => {
                            const parsed = parseNumber(e.target.value);
                            field.onChange(parsed);
                          }}
                          onBlur={field.onBlur}
                        />
                      </AmountInputWrapper>
                    );
                  }}
                />
                {errors.amount && (
                  <ErrorMessage>{errors.amount.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <QuickAmountsLabel>Valores rápidos</QuickAmountsLabel>
                <QuickAmountsGrid>
                  {QUICK_AMOUNTS.map((val) => (
                    <QuickAmountButton
                      key={val}
                      type="button"
                      onClick={() => handleQuickAmount(val)}
                    >
                      {formatCurrency(val)}
                    </QuickAmountButton>
                  ))}
                </QuickAmountsGrid>
              </FormGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}
              {depositError && (
                <ErrorMessage>
                  {(depositError as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                    'Erro ao realizar depósito'}
                </ErrorMessage>
              )}
              {success && <SuccessMessage>{success}</SuccessMessage>}

              <FormActions>
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  size="lg"
                  onClick={() => router.push('/dashboard')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  disabled={depositLoading}
                  variant="success"
                >
                  {depositLoading ? 'Depositando...' : 'Depositar'}
                </Button>
              </FormActions>
            </Form>
          </DepositFormCard>
        </ContentWrapper>
      </PageSection>
    </DashboardLayout>
  );
}
