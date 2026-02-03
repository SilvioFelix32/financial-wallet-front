import type { Transaction } from '@/interfaces/wallet.interfaces';

export const getTransactionTypeLabel = (transaction: Transaction, currentUserId: string | null): string => {
  const type = transaction.type.toUpperCase();
  
  if (type === 'TRANSFER' || type === 'transfer') {
    if (transaction.senderId && transaction.senderId !== currentUserId && transaction.senderName) {
      return `Transferência recebida de ${transaction.senderName}`;
    }
    if (transaction.recipientId && transaction.recipientName) {
      return `Transferência para ${transaction.recipientName}`;
    }
    return 'Transferência';
  }
  
  const types: Record<string, string> = {
    DEPOSIT: 'Depósito',
    deposit: 'Depósito',
    REVERSAL: 'Transferência revertida',
    reversal: 'Transferência revertida',
  };
  return types[type] || type;
};

export const isReceivedTransfer = (transaction: Transaction, userId: string | null): boolean => {
  return (
    (transaction.type.toUpperCase() === 'TRANSFER' || transaction.type.toUpperCase() === 'transfer') &&
    Boolean(transaction.senderId && transaction.senderId !== userId && transaction.senderName)
  );
};

export const isDeposit = (transaction: Transaction): boolean => {
  const type = transaction.type.toUpperCase();
  return type === 'DEPOSIT' || type === 'deposit';
};

export const isReversal = (transaction: Transaction): boolean => {
  const type = transaction.type.toUpperCase();
  return type === 'REVERSAL' || type === 'REVERT';
};

export const calculateTransactionType = (
  transaction: Transaction,
  userId: string | null
): { isIncome: boolean; isOutcome: boolean } => {
  const receivedTransfer = isReceivedTransfer(transaction, userId);
  const deposit = isDeposit(transaction);
  
  const isIncome = Boolean(receivedTransfer || (deposit && transaction.amount > 0));
  const isOutcome = Boolean(!isIncome && transaction.amount < 0);
  
  return { isIncome, isOutcome };
};

export const getRevertedTransactionIds = (transactions: Transaction[]): Set<string> => {
  const ids = new Set<string>();
  transactions.forEach((t) => {
    const type = t.type.toUpperCase();
    if ((type === 'REVERSAL' || type === 'REVERT') && t.referenceTransactionId) {
      ids.add(t.referenceTransactionId);
    }
  });
  return ids;
};

