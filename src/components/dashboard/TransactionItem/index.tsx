import type { TransactionItemProps } from '@/interfaces/dashboard.interfaces';
import type { Transaction } from '@/interfaces/wallet.interfaces';
import {
  TransactionItemRow,
  IconWrapper,
  TransactionInfo,
  TransactionDescription,
  Badge,
  TransactionDate,
  TransactionRight,
  TransactionAmount,
  RevertButton,
} from './styles';
import { formatCurrency, formatDate } from '@/utils/formatters';
import {
  getTransactionTypeLabel,
  getTypeBadgeLabel,
  calculateTransactionType,
  isReversal,
  isDeposit,
  isReceivedTransfer,
} from '../../../utils/dashboard-utils';

const IconArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
  </svg>
);

const IconArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="M5 12l7 7 7-7" />
  </svg>
);

const IconRotate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const IconUndo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10h10a5 5 0 0 1 5 5v2" />
    <path d="m3 10 4-4" />
    <path d="M3 6v4" />
  </svg>
);

type IconVariant = 'income' | 'outcome' | 'reversal' | 'neutral';

function getIconAndVariant(
  transaction: Transaction,
  userId: string | null
): { icon: React.ReactNode; variant: IconVariant } {
  const t = transaction.type.toUpperCase();
  if (t === 'REVERSAL' || t === 'REVERT') {
    return { icon: <IconRotate />, variant: 'reversal' };
  }
  const receivedTransfer = isReceivedTransfer(transaction, userId);
  if (receivedTransfer) {
    return { icon: <IconArrowDown />, variant: 'income' };
  }
  if (t === 'TRANSFER' && transaction.recipientId) {
    return { icon: <IconArrowUp />, variant: 'outcome' };
  }
  const { isIncome } = calculateTransactionType(transaction, userId);
  if (isIncome) {
    return { icon: <IconArrowDown />, variant: 'income' };
  }
  return { icon: <IconArrowUp />, variant: 'outcome' };
}

function getBadgeVariant(badgeLabel: string): 'success' | 'error' | 'neutral' {
  if (badgeLabel === 'Recebida' || badgeLabel === 'Depósito') return 'success';
  if (badgeLabel === 'Reversão') return 'error';
  return 'neutral';
}

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

  const description = getTransactionTypeLabel(transaction, userId);
  const badgeLabel = getTypeBadgeLabel(transaction, userId);
  const { icon, variant } = getIconAndVariant(transaction, userId);

  return (
    <TransactionItemRow>
      <IconWrapper $variant={variant}>{icon}</IconWrapper>
      <TransactionInfo>
        <TransactionDescription>
          {description}
          <Badge $variant={getBadgeVariant(badgeLabel)}>{badgeLabel}</Badge>
        </TransactionDescription>
        <TransactionDate>{formatDate(transaction.createdAt)}</TransactionDate>
      </TransactionInfo>
      <TransactionRight>
        <TransactionAmount $positive={isIncome} $negative={isOutcome}>
          {transaction.amount > 0 ? '+' : ''}
          {formatCurrency(transaction.amount)}
        </TransactionAmount>
        {canRevert && (
          <RevertButton
            type="button"
            onClick={() => onRevertClick(transaction)}
            disabled={revertLoading}
            aria-label="Reverter transação"
          >
            <IconUndo />
          </RevertButton>
        )}
      </TransactionRight>
    </TransactionItemRow>
  );
};
