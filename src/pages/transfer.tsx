import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@/hooks/useUser';
import { transferSchema } from '@/lib/validations';
import type { TransferFormData } from '@/interfaces/validations.types';
import { formatCurrencyWithDecimals, formatCurrencyInput, parseNumber, formatCurrency } from '@/utils/formatters';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Label } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import { UserHeader } from '@/components/UserHeader';
import { Modal } from '@/components/Modal';
import {
  Container,
  FormCard,
  Title,
  Form,
  FormGroup,
  ButtonGroup,
  Wrapper,
} from '@/styles/pages/form.styles';


export default function Transfer() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { transfer, transferLoading, transferError } = useWallet();
  const { usersList, usersListLoading, userId, user, userLoading } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const availableUsers = useMemo(
    () => usersList.filter((u) => u.user_id !== userId),
    [usersList, userId]
  );
  const userBalance = useMemo(() => user?.balance ?? 0, [user?.balance]);
  const [showBalance, setShowBalance] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transferData, setTransferData] = useState<TransferFormData | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  });

  const amountValue = watch('amount');
  const toUserIdValue = watch('toUserId');

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

  const onSubmit = async (data: TransferFormData) => {
    setError(null);
    setSuccess(null);

    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    if (!data.toUserId) {
      setError('Selecione um usuário destinatário');
      return;
    }

    if (!data.amount || data.amount <= 0) {
      setError('Digite um valor válido');
      return;
    }

    if (data.amount > userBalance) {
      setError('Saldo insuficiente para realizar a transferência');
      return;
    }

    setTransferData(data);
    setShowConfirmModal(true);
  };

  const handleConfirmTransfer = async () => {
    if (!transferData) return;

    setError(null);
    setSuccess(null);

    try {
      transfer(transferData, {
        onSuccess: (response) => {
          setSuccess(
            `Transferência realizada com sucesso! Novo saldo: R$ ${response.balance.toFixed(2)}`
          );
          setShowConfirmModal(false);
          setTransferData(null);
          reset();
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        },
        onError: (err: any) => {
          setError(
            err.response?.data?.message || 'Erro ao realizar transferência'
          );
          setShowConfirmModal(false);
        },
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar transferência');
      setShowConfirmModal(false);
    }
  };

  const handleCancelTransfer = () => {
    setShowConfirmModal(false);
    setTransferData(null);
  };

  const getRecipientName = useCallback(() => {
    if (!transferData?.toUserId) return '';
    const recipient = availableUsers.find(u => u.user_id === transferData.toUserId);
    return recipient?.name || '';
  }, [transferData?.toUserId, availableUsers]);

  return (
    <Container>
      <UserHeader showLogout={false} />
      <Wrapper>
        <FormCard>
          <Title>Transferir</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Label style={{ margin: 0 }}>Saldo Disponível</Label>
                <button
                  type="button"
                  onClick={() => setShowBalance(!showBalance)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#666',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#333'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showBalance ? (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {userLoading ? (
                <p style={{ margin: 0, color: '#666' }}>Carregando...</p>
              ) : (
                <p style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 600,
                  color: userBalance < 0 ? '#e74c3c' : userBalance > 0 ? '#27ae60' : '#666'
                }}>
                  {showBalance ? formatCurrency(userBalance) : '••••••'}
                </p>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="toUserId">Usuário Destinatário</Label>
              {usersListLoading ? (
                <Input
                  id="toUserId"
                  type="text"
                  placeholder="Carregando usuários..."
                  disabled
                />
              ) : availableUsers.length === 0 ? (
                <Input
                  id="toUserId"
                  type="text"
                  placeholder="Nenhum usuário disponível"
                  disabled
                />
              ) : (
                <Controller
                  name="toUserId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="toUserId"
                      hasError={!!errors.toUserId}
                      {...field}
                    >
                      <option value="">Selecione um usuário</option>
                      {availableUsers.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              )}
              {errors.toUserId && (
                <ErrorMessage>{errors.toUserId.message}</ErrorMessage>
              )}
            </FormGroup>

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
                      hasError={!!errors.amount || (!!amountValue && amountValue > userBalance)}
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
              {amountValue && amountValue > userBalance && (
                <ErrorMessage>Saldo disponível insuficiente.</ErrorMessage>
              )}
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {transferError && (
              <ErrorMessage>
                {(transferError as any)?.response?.data?.message ||
                  'Erro ao realizar transferência'}
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
                disabled={transferLoading || !toUserIdValue || !amountValue || amountValue <= 0}
                variant="success"
              >
                Transferir
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>
      </Wrapper>

      <Modal
        isOpen={showConfirmModal}
        onClose={handleCancelTransfer}
        title="Confirmar Transferência"
        footer={
          <>
            <Button variant="outline" onClick={handleCancelTransfer}>
              Cancelar
            </Button>
            <Button
              variant="success"
              onClick={handleConfirmTransfer}
              disabled={transferLoading}
            >
              {transferLoading ? 'Processando...' : 'Confirmar'}
            </Button>
          </>
        }
      >
        <div>
          <p>Confirme os dados da transferência:</p>
          {transferData && (
            <div style={{ marginTop: '16px' }}>
              <p>
                <strong>Destinatário:</strong> {getRecipientName()}
              </p>
              <p>
                <strong>Valor:</strong> {formatCurrencyWithDecimals(transferData.amount)}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </Container>
  );
}

