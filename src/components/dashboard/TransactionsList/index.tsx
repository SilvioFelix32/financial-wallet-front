import { useState, useMemo } from 'react';
import type { TransactionsListProps } from '@/interfaces/dashboard.interfaces';
import {
  TransactionsCard,
  TransactionsHeader,
  TransactionsTitle,
  ExpandIcon,
  TransactionList,
  EmptyState,
} from './styles';
import { TransactionItem } from '../TransactionItem';
import { getRevertedTransactionIds } from '../utils';

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  loading = false,
  userId,
  revertLoading,
  onRevertClick,
}) => {
  const [showTransactions, setShowTransactions] = useState(true);
  
  const revertedTransactionIds = useMemo(
    () => getRevertedTransactionIds(transactions),
    [transactions]
  );

  return (
    <TransactionsCard>
      <TransactionsHeader
        type="button"
        onClick={() => setShowTransactions(!showTransactions)}
        aria-expanded={showTransactions}
      >
        <TransactionsTitle>Transações Recentes</TransactionsTitle>
        <ExpandIcon $expanded={showTransactions}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </ExpandIcon>
      </TransactionsHeader>
      {loading ? (
        <EmptyState>Carregando transações...</EmptyState>
      ) : transactions.length === 0 ? (
        <EmptyState>Nenhuma transação encontrada</EmptyState>
      ) : (
        <TransactionList $expanded={showTransactions}>
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              userId={userId}
              revertedTransactionIds={revertedTransactionIds}
              revertLoading={revertLoading}
              onRevertClick={onRevertClick}
            />
          ))}
        </TransactionList>
      )}
    </TransactionsCard>
  );
};

