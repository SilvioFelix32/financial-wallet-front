import type { Transaction } from '@/interfaces/wallet.interfaces';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getTransactionTypeLabel } from '../utils';

interface RevertModalProps {
  isOpen: boolean;
  transaction: Transaction | null;
  userId: string | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RevertModal: React.FC<RevertModalProps> = ({
  isOpen,
  transaction,
  userId,
  loading,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Confirmar Reversão"
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Revertendo...' : 'Confirmar Reversão'}
          </Button>
        </>
      }
    >
      <p>
        Tem certeza que deseja reverter esta transação?
      </p>
      {transaction && (
        <div style={{ marginTop: '16px' }}>
          <p>
            <strong>Tipo:</strong> {getTransactionTypeLabel(transaction, userId)}
          </p>
          <p>
            <strong>Valor:</strong>{' '}
            {formatCurrency(transaction.amount)}
          </p>
          <p>
            <strong>Data:</strong> {formatDate(transaction.createdAt)}
          </p>
        </div>
      )}
    </Modal>
  );
};

