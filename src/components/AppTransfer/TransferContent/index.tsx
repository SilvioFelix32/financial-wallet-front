import type { User } from '@/interfaces/user.interfaces';
import type { TransferFormData } from '@/interfaces/validations.types';
import { PageSection, ContentWrapper } from '@/components/AppTransfer/styles';
import { TransferHeader } from '../TransferHeader';
import { TransferBalanceCard } from '../TransferBalanceCard';
import { TransferForm } from '../TransferForm';

type TransferContentProps = {
  userBalance: number;
  userLoading: boolean;
  usersLoading: boolean;
  availableUsers: User[];
  transferLoading: boolean;
  transferError: unknown;
  error: string | null;
  success: string | null;
  onCancel: () => void;
  onRequestConfirm: (data: TransferFormData) => void;
  setError: (value: string | null) => void;
  setSuccess: (value: string | null) => void;
};

export const TransferContent: React.FC<TransferContentProps> = ({
  userBalance,
  userLoading,
  usersLoading,
  availableUsers,
  transferLoading,
  transferError,
  error,
  success,
  onCancel,
  onRequestConfirm,
  setError,
  setSuccess,
}) => {
  const transferApiMessage =
    (transferError as { response?: { data?: { message?: string } } })?.response?.data?.message ||
    null;

  return (
    <PageSection>
      <TransferHeader />
      <ContentWrapper>
        <TransferBalanceCard balance={userBalance} loading={userLoading} />
        <TransferForm
          userBalance={userBalance}
          usersLoading={usersLoading}
          availableUsers={availableUsers}
          transferLoading={transferLoading}
          error={error}
          success={success}
          transferApiMessage={transferApiMessage}
          onCancel={onCancel}
          onRequestConfirm={onRequestConfirm}
          setError={setError}
          setSuccess={setSuccess}
        />
      </ContentWrapper>
    </PageSection>
  );
};
