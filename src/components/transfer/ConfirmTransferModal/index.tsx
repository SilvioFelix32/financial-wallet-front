import type { ConfirmTransferModalProps } from '@/interfaces/transfer.interfaces';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { formatCurrencyWithDecimals } from '@/utils/formatters';

export const ConfirmTransferModal: React.FC<ConfirmTransferModalProps> = ({
  isOpen,
  transferData,
  availableUsers,
  loading,
  onConfirm,
  onCancel,
}) => {
  const getRecipientName = () => {
    if (!transferData?.toUserId) return '';
    const recipient = availableUsers.find(u => u.user_id === transferData.toUserId);
    return recipient?.name || '';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Confirmar Transferência"
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Confirmar'}
          </Button>
        </>
      }
    >
      <div>
        <p>Confirme os dados da transferência:</p>
        {transferData && (
          <div style={{ marginTop: '16px' }}>
            <p>
              <strong>Destinatário:</strong> {getRecipientName()}
            </p>
            <p>
              <strong>Valor:</strong> {formatCurrencyWithDecimals(transferData.amount)}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

