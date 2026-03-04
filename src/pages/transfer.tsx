'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@/hooks/useUser';
import type { TransferFormData } from '@/interfaces/validations.types';
import { DashboardLayout } from '@/components/AppSidebar';
import { ConfirmTransferModal } from '@/components/transfer/ConfirmTransferModal';
import { formatCurrency } from '@/utils/formatters';
import { TransferContent } from '@/components/AppTransfer';
import { ContentWrapper, PageSection } from '@/components/AppTransfer/styles';

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

  const handleConfirmTransfer = useCallback(async () => {
    if (!transferData) return;
    setError(null);
    setSuccess(null);
    transfer(transferData, {
      onSuccess: (response) => {
        setSuccess(
          `Transferência realizada com sucesso! Novo saldo: ${formatCurrency(
            response.balance
          )}`
        );
        setShowConfirmModal(false);
        setTransferData(null);
        setTimeout(() => router.push('/dashboard'), 2000);
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Erro ao realizar transferência');
        setShowConfirmModal(false);
      },
    });
  }, [transferData, transfer, router]);

  const handleCancelTransfer = useCallback(() => {
    setShowConfirmModal(false);
    setTransferData(null);
  }, []);

  if (authLoading) {
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

  return (
    <DashboardLayout>
      <TransferContent
        userBalance={userBalance}
        userLoading={userLoading}
        usersLoading={usersListLoading}
        availableUsers={availableUsers}
        transferLoading={transferLoading}
        transferError={transferError}
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
        onCancel={() => router.push('/dashboard')}
        onRequestConfirm={(data) => {
          setTransferData(data);
          setShowConfirmModal(true);
        }}
      />

      <ConfirmTransferModal
        isOpen={showConfirmModal}
        transferData={transferData}
        availableUsers={availableUsers}
        loading={transferLoading}
        onConfirm={handleConfirmTransfer}
        onCancel={handleCancelTransfer}
      />
    </DashboardLayout>
  );
}

