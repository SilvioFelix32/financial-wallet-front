import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { UserHeader } from '@/components/UserHeader';
import { Modal } from '@/components/Modal';
import Link from 'next/link';
import type { Transaction } from '@/interfaces/wallet.interfaces';
import { formatCurrency, formatDate } from '@/utils/formatters';
import {
  Container,
  Title,
  BalanceCard,
  BalanceLabel,
  BalanceValue,
  ActionsGrid,
  TransactionsCard,
  TransactionsTitle,
  TransactionList,
  TransactionItem,
  TransactionInfo,
  TransactionType,
  TransactionDate,
  TransactionAmount,
  EmptyState,
  UsersListCard,
  UsersListTitle,
  UsersList,
  UserListItem,
  UserName,
  UserEmail,
  TransactionActions,
} from '@/styles/pages/dashboard.styles';

const getTransactionTypeLabel = (transaction: Transaction, currentUserId: string | null) => {
  const type = transaction.type.toUpperCase();
  
  if (type === 'TRANSFER' || type === 'transfer') {
    if (transaction.senderId && transaction.senderId !== currentUserId && transaction.senderName) {
      return `Transferência recebida de ${transaction.senderName}`;
    }
    return 'Transferência';
  }
  
  const types: Record<string, string> = {
    DEPOSIT: 'Depósito',
    deposit: 'Depósito',
    REVERSAL: 'Reversão',
    reversal: 'Reversão',
  };
  return types[type] || type;
};

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, user: authUser } = useAuth();
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
  const [showBalance, setShowBalance] = useState(false);

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

  return (
    <Container>
      <UserHeader />
      <Title>Dashboard</Title>

      <BalanceCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <BalanceLabel style={{ margin: 0 }}>Saldo Atual</BalanceLabel>
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
          <BalanceValue>Carregando...</BalanceValue>
        ) : (
          <BalanceValue 
            $negative={userBalance < 0} 
            $positive={userBalance > 0}
          >
            {showBalance ? formatCurrency(userBalance) : '••••••'}
          </BalanceValue>
        )}
      </BalanceCard>

      <ActionsGrid>
        <Link href="/deposit">
          <Button fullWidth variant="primary" size="lg">
            Depositar
          </Button>
        </Link>
        <Link href="/transfer">
          <Button fullWidth variant="success" size="lg">
            Transferir
          </Button>
        </Link>
      </ActionsGrid>

      {availableUsers.length > 0 && (
        <UsersListCard>
          <UsersListTitle>Usuários Disponíveis para Transferência</UsersListTitle>
          {usersListLoading ? (
            <EmptyState>Carregando usuários...</EmptyState>
          ) : (
            <UsersList>
              {availableUsers.map((u) => (
                <UserListItem key={u.user_id}>
                  <div>
                    <UserName>{u.name}</UserName>
                    <UserEmail>{u.email}</UserEmail>
                  </div>
                </UserListItem>
              ))}
            </UsersList>
          )}
        </UsersListCard>
      )}

      <TransactionsCard>
        <TransactionsTitle>Transações Recentes</TransactionsTitle>
        {transactionsLoading ? (
          <EmptyState>Carregando transações...</EmptyState>
        ) : transactions.length === 0 ? (
          <EmptyState>Nenhuma transação encontrada</EmptyState>
        ) : (
          <TransactionList>
            {transactions.map((transaction) => {
              const isReceivedTransfer = 
                (transaction.type.toUpperCase() === 'TRANSFER' || transaction.type.toUpperCase() === 'transfer') &&
                transaction.senderId &&
                transaction.senderId !== userId &&
                transaction.senderName;
              
              const isDeposit = 
                transaction.type.toUpperCase() === 'DEPOSIT' || 
                transaction.type.toUpperCase() === 'deposit';
              
              const isIncome = Boolean(isReceivedTransfer || (isDeposit && transaction.amount > 0));
              const isOutcome = Boolean(!isIncome && transaction.amount < 0);
              const isPositiveAmount = Boolean(!isReceivedTransfer && isIncome);
              
              return (
                <TransactionItem key={transaction.id}>
                  <TransactionInfo>
                    <TransactionType>
                      {getTransactionTypeLabel(transaction, userId)}
                    </TransactionType>
                    <TransactionDate>
                      {formatDate(transaction.createdAt)}
                    </TransactionDate>
                  </TransactionInfo>
                  <TransactionActions>
                    <TransactionAmount 
                      negative={isOutcome} 
                      positive={isIncome}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {formatCurrency(transaction.amount)}
                    </TransactionAmount>
                    {transaction.type.toUpperCase() !== 'REVERSAL' && 
                     transaction.type.toUpperCase() !== 'REVERT' &&
                     transaction.type.toUpperCase() !== 'DEPOSIT' &&
                     transaction.type.toUpperCase() !== 'deposit' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevertClick(transaction)}
                        disabled={revertLoading}
                      >
                        Reverter
                      </Button>
                    )}
                  </TransactionActions>
                </TransactionItem>
              );
            })}
          </TransactionList>
        )}
      </TransactionsCard>

      <Modal
        isOpen={showRevertModal}
        onClose={handleCancelRevert}
        title="Confirmar Reversão"
        footer={
          <>
            <Button variant="outline" onClick={handleCancelRevert}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmRevert}
              disabled={revertLoading}
            >
              {revertLoading ? 'Revertendo...' : 'Confirmar Reversão'}
            </Button>
          </>
        }
      >
        <p>
          Tem certeza que deseja reverter esta transação?
        </p>
        {selectedTransaction && (
          <div style={{ marginTop: '16px' }}>
            <p>
              <strong>Tipo:</strong> {getTransactionTypeLabel(selectedTransaction, userId)}
            </p>
            <p>
              <strong>Valor:</strong>{' '}
              {formatCurrency(selectedTransaction.amount)}
            </p>
            <p>
              <strong>Data:</strong> {formatDate(selectedTransaction.createdAt)}
            </p>
          </div>
        )}
      </Modal>
    </Container>
  );
}

