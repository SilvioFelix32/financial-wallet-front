import type { Transaction } from './wallet.interfaces';
import type { User } from './user.interfaces';

export interface BalanceCardProps {
  balance: number;
  loading?: boolean;
}

export interface UsersListProps {
  users: User[];
  loading?: boolean;
}

export interface TransactionsListProps {
  transactions: Transaction[];
  loading?: boolean;
  userId: string | null;
  revertLoading: boolean;
  onRevertClick: (transaction: Transaction) => void;
}

export interface TransactionItemProps {
  transaction: Transaction;
  userId: string | null;
  revertedTransactionIds: Set<string>;
  revertLoading: boolean;
  onRevertClick: (transaction: Transaction) => void;
}

export interface RevertModalProps {
  isOpen: boolean;
  transaction: Transaction | null;
  userId: string | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

