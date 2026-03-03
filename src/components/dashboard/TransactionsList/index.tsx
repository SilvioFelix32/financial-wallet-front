import { useMemo } from 'react';
import type { TransactionsListProps } from '@/interfaces/dashboard.interfaces';
import {
  TransactionsCard,
  TransactionsHeader,
  TransactionsTitle,
  TransactionList,
  EmptyState,
} from './styles';
import { TransactionItem } from '../TransactionItem';
import { getRevertedTransactionIds } from '../../../utils/dashboard-utils';

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  loading = false,
  userId,
  revertLoading,
  onRevertClick,
}) => {
  const revertedTransactionIds = useMemo(
    () => getRevertedTransactionIds(transactions),
    [transactions]
  );

  return (
    <TransactionsCard>
      <TransactionsHeader>
        <TransactionsTitle>Transações Recentes</TransactionsTitle>
      </TransactionsHeader>
      {loading ? (
        <EmptyState>Carregando transações...</EmptyState>
      ) : transactions.length === 0 ? (
        <EmptyState>Nenhuma transação encontrada.</EmptyState>
      ) : (
        <TransactionList role="list">
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
