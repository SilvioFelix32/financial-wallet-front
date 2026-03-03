import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/Card';
import { DashboardLayout } from '@/components/AppSidebar';
import { BalanceCardComponent } from '@/components/dashboard/BalanceCard';
import { UsersCard } from '@/components/dashboard/UsersCard';
import { TransactionsList } from '@/components/dashboard/TransactionsList';
import { RevertModal } from '@/components/dashboard/RevertModal';
import type { Transaction } from '@/interfaces/wallet.interfaces';
import {
  Container,
  ContentSection,
  ContentGrid,
  GridCol2,
  GridCol3,
} from '@/components/dashboard/styles';
import { UserHeader } from '@/components/UserHeader';

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const {
    transactions,
    transactionsLoading,
    transactionsHasMore,
    transactionsFetchingMore,
    transactionsLoadMore,
    revert,
    revertLoading,
  } = useWallet();
  const { user, userLoading, usersList, usersListLoading, userId } = useUser();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showRevertModal, setShowRevertModal] = useState(false);

  const userBalance = useMemo(() => user?.balance ?? 0, [user?.balance]);
  const availableUsers = useMemo(
    () => usersList.filter((u) => u.user_id !== userId),
    [usersList, userId]
  );

  const handleRevertClick = useCallback((transaction: Transaction) => {
    const type = transaction.type.toUpperCase();
    if (type === 'REVERSAL' || type === 'REVERT') return;
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
          const err = error as { response?: { data?: { message?: string } } };
          const message = err?.response?.data?.message || (error instanceof Error ? error.message : 'Erro ao reverter transação');
          alert(message);
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
      <DashboardLayout>
        <Container>
          <Card>Carregando...</Card>
        </Container>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated && !authLoading) {
    router.replace('/');
    return null;
  }

  return (
    <DashboardLayout>
      <ContentSection>
        <UserHeader />
        <BalanceCardComponent balance={userBalance} loading={userLoading} />

        <ContentGrid>
          <GridCol2>
            <UsersCard users={availableUsers} loading={usersListLoading} />
          </GridCol2>
          <GridCol3>
            <TransactionsList
              transactions={transactions}
              loading={transactionsLoading}
              userId={userId}
              revertLoading={revertLoading}
              onRevertClick={handleRevertClick}
              hasMore={transactionsHasMore}
              isFetchingMore={transactionsFetchingMore}
              onLoadMore={() => {
                void transactionsLoadMore();
              }}
            />
          </GridCol3>
        </ContentGrid>
      </ContentSection>

      <RevertModal
        isOpen={showRevertModal}
        transaction={selectedTransaction}
        userId={userId}
        loading={revertLoading}
        onConfirm={handleConfirmRevert}
        onCancel={handleCancelRevert}
      />
    </DashboardLayout>
  );
}
