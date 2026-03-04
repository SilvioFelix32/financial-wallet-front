import { useMemo, useCallback } from 'react';
import type { TransactionsListProps } from '@/interfaces/dashboard.interfaces';
import {
  TransactionsCard,
  TransactionsHeader,
  TransactionsTitle,
  TransactionsBody,
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
  hasMore = false,
  isFetchingMore = false,
  onLoadMore,
}) => {
  const revertedTransactionIds = useMemo(
    () => getRevertedTransactionIds(transactions),
    [transactions]
  );

  const isScrollable = transactions.length > 10 || hasMore;

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!onLoadMore || !hasMore || isFetchingMore) return;
      const el = e.currentTarget;
      const thresholdPx = 160;
      const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - thresholdPx;
      if (reachedBottom) onLoadMore();
    },
    [onLoadMore, hasMore, isFetchingMore]
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
        <TransactionsBody $scrollable={isScrollable} onScroll={handleScroll}>
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
          {isFetchingMore ? (
            <EmptyState>Carregando mais...</EmptyState>
          ) : null}
        </TransactionsBody>
      )}
    </TransactionsCard>
  );
};
