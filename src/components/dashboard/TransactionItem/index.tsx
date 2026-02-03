import type { TransactionItemProps } from '@/interfaces/dashboard.interfaces';
import { Button } from '@/components/Button';
import {
  TransactionItem as StyledTransactionItem,
  TransactionInfo,
  TransactionType,
  TransactionDate,
  TransactionAmount,
  TransactionActions,
} from './styles';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getTransactionTypeLabel, calculateTransactionType, isReversal, isDeposit, isReceivedTransfer } from '../utils';

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  userId,
  revertedTransactionIds,
  revertLoading,
  onRevertClick,
}) => {
  const { isIncome, isOutcome } = calculateTransactionType(transaction, userId);
  const receivedTransfer = isReceivedTransfer(transaction, userId);
  const canRevert = 
    !isReversal(transaction) &&
    !isDeposit(transaction) &&
    !revertedTransactionIds.has(transaction.id) &&
    !receivedTransfer;

  return (
    <StyledTransactionItem>
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
          $negative={isOutcome} 
          $positive={isIncome}
        >
          {transaction.amount > 0 ? '+' : ''}
          {formatCurrency(transaction.amount)}
        </TransactionAmount>
        {canRevert && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRevertClick(transaction)}
            disabled={revertLoading}
          >
            Reverter
          </Button>
        )}
      </TransactionActions>
    </StyledTransactionItem>
  );
};

