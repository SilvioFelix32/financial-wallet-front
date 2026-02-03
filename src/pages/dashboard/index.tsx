import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/Card';
import { UserHeader } from '@/components/UserHeader';
import { BalanceCardComponent } from '@/components/dashboard/BalanceCard';
import { ActionsGridComponent } from '@/components/dashboard/ActionsGrid';
import { UsersListComponent } from '@/components/dashboard/UsersList';
import { TransactionsList } from '@/components/dashboard/TransactionsList';
import { RevertModal } from '@/components/dashboard/RevertModal';
import type { Transaction } from '@/interfaces/wallet.interfaces';
import { Container, Title } from '@/components/dashboard/styles';

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const {
    transactions,
    transactionsLoading,
    revert,
    revertLoading,
  } = useWallet();
  const {
    user,
    userLoading,
    usersList,
    usersListLoading,
    userId,
  } = useUser();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showRevertModal, setShowRevertModal] = useState(false);

  const userBalance = useMemo(() => user?.balance ?? 0, [user?.balance]);
  const availableUsers = useMemo(
    () => usersList.filter((u) => u.user_id !== userId),
    [usersList, userId]
  );

  const handleRevertClick = useCallback((transaction: Transaction) => {
    const type = transaction.type.toUpperCase();
    if (type === 'REVERSAL' || type === 'REVERT') {
      return;
    }
    setSelectedTransaction(transaction);
    setShowRevertModal(true);
  }, []);

  const handleConfirmRevert = useCallback(() => {
    if (!selectedTransaction) return;

    revert(
      { transactionId: selectedTransaction.id },
      {
        onSuccess: () => {
          setShowRevertModal(false);
          setSelectedTransaction(null);
        },
        onError: (error: unknown) => {
          const errorMessage = error instanceof Error 
            ? error.message 
            : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erro ao reverter transação';
          alert(errorMessage);
        },
      }
    );
  }, [selectedTransaction, revert]);

  const handleCancelRevert = useCallback(() => {
    setShowRevertModal(false);
    setSelectedTransaction(null);
  }, []);

  if (authLoading || userLoading) {
    return (
      <Container>
        <Card>Carregando...</Card>
      </Container>
    );
  }

  if (!isAuthenticated && !authLoading) {
    router.replace('/auth/signIn');
    return null;
  }

  return (
    <Container>
      <UserHeader />
      <Title>Dashboard</Title>

      <BalanceCardComponent balance={userBalance} loading={userLoading} />
      <ActionsGridComponent />

      {availableUsers.length > 0 && (
        <UsersListComponent users={availableUsers} loading={usersListLoading} />
      )}

      <TransactionsList
        transactions={transactions}
        loading={transactionsLoading}
        userId={userId}
        revertLoading={revertLoading}
        onRevertClick={handleRevertClick}
      />

      <RevertModal
        isOpen={showRevertModal}
        transaction={selectedTransaction}
        userId={userId}
        loading={revertLoading}
        onConfirm={handleConfirmRevert}
        onCancel={handleCancelRevert}
      />
    </Container>
  );
}

