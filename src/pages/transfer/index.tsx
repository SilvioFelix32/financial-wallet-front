import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@/hooks/useUser';
import { transferSchema } from '@/lib/validations';
import type { TransferFormData } from '@/interfaces/validations.types';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import { UserHeader } from '@/components/UserHeader';
import { BalanceDisplay } from '@/components/transfer/BalanceDisplay';
import { RecipientSelectField } from '@/components/transfer/RecipientSelectField';
import { AmountInputField } from '@/components/transfer/AmountInputField';
import { ConfirmTransferModal } from '@/components/transfer/ConfirmTransferModal';
import {
  Container,
  FormCard,
  Title,
  Form,
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transferData, setTransferData] = useState<TransferFormData | null>(null);

  const availableUsers = useMemo(
    () => usersList.filter((u) => u.user_id !== userId),
    [usersList, userId]
  );
  const userBalance = useMemo(() => user?.balance ?? 0, [user?.balance]);

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

  const onSubmit = async (data: TransferFormData) => {
    setError(null);
    setSuccess(null);

    if (!data.toUserId || data.toUserId.trim() === '') {
      setError('Selecione um usuário destinatário');
      return;
    }

    const isValid = await trigger();
    if (!isValid) {
      const toUserIdError = errors.toUserId;
      if (toUserIdError) {
        setError(toUserIdError.message || 'ID do usuário inválido');
      }
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

  const handleConfirmTransfer = useCallback(async () => {
    if (!transferData) return;
    setError(null);
    setSuccess(null);
    transfer(transferData, {
      onSuccess: (response) => {
        setSuccess(`Transferência realizada com sucesso! Novo saldo: R$ ${response.balance.toFixed(2)}`);
        setShowConfirmModal(false);
        setTransferData(null);
        reset();
        setTimeout(() => router.push('/dashboard'), 2000);
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Erro ao realizar transferência');
        setShowConfirmModal(false);
      },
    });
  }, [transferData, transfer, reset, router]);

  const handleCancelTransfer = useCallback(() => {
    setShowConfirmModal(false);
    setTransferData(null);
  }, []);

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

  return (
    <Container>
      <UserHeader showLogout={false} />
      <Wrapper>
        <FormCard>
          <Title>Transferir</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <BalanceDisplay balance={userBalance} loading={userLoading} />

            <RecipientSelectField
              control={control}
              errors={errors}
              availableUsers={availableUsers}
              loading={usersListLoading}
            />

            <AmountInputField
              control={control}
              errors={errors}
              amountValue={amountValue}
              userBalance={userBalance}
            />

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

      <ConfirmTransferModal
        isOpen={showConfirmModal}
        transferData={transferData}
        availableUsers={availableUsers}
        loading={transferLoading}
        onConfirm={handleConfirmTransfer}
        onCancel={handleCancelTransfer}
      />
    </Container>
  );
}

