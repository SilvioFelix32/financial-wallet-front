import type { Control, FieldErrors } from 'react-hook-form';
import type { TransferFormData } from './validations.types';
import type { User } from './user.interfaces';

export interface BalanceDisplayProps {
  balance: number;
  loading?: boolean;
}

export interface RecipientSelectFieldProps {
  control: Control<TransferFormData>;
  errors: FieldErrors<TransferFormData>;
  availableUsers: User[];
  loading?: boolean;
}

export interface AmountInputFieldProps {
  control: Control<TransferFormData>;
  errors: FieldErrors<TransferFormData>;
  amountValue: number;
  userBalance: number;
}

export interface ConfirmTransferModalProps {
  isOpen: boolean;
  transferData: TransferFormData | null;
  availableUsers: User[];
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

