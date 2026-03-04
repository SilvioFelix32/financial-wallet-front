import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@/interfaces/user.interfaces';
import type { TransferFormData } from '@/interfaces/validations.types';
import { transferSchema } from '@/lib/validations';
import { Label } from '@/components/Label';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuccessMessage } from '@/components/SuccessMessage';
import {
  TransferFormCard,
  FormCardHeader,
  FormCardTitle,
  FormCardDescription,
  Form,
  FormGroup,
  FormActions,
} from './styles';
import { RecipientDropdown } from '../RecipientDropdown';
import { AmountInputComponent } from '../AmountInput';
import { QuickAmounts } from '../QuickAmounts';
import { IconArrowUpFromLine } from '../icons';

type TransferFormProps = {
  userBalance: number;
  usersLoading: boolean;
  availableUsers: User[];
  transferLoading: boolean;
  error: string | null;
  success: string | null;
  transferApiMessage: string | null;
  onCancel: () => void;
  onRequestConfirm: (data: TransferFormData) => void;
  setError: (value: string | null) => void;
  setSuccess: (value: string | null) => void;
};

export const TransferForm: React.FC<TransferFormProps> = ({
  userBalance,
  usersLoading,
  availableUsers,
  transferLoading,
  error,
  success,
  transferApiMessage,
  onCancel,
  onRequestConfirm,
  setError,
  setSuccess,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: { toUserId: '', amount: 0 },
  });

  const amountValue = watch('amount');
  const toUserIdValue = watch('toUserId');

  const selectedRecipient = useMemo(
    () => availableUsers.find((u) => u.user_id === toUserIdValue) || null,
    [availableUsers, toUserIdValue]
  );

  const handleSubmitForm = async (data: TransferFormData) => {
    setError(null);
    setSuccess(null);

    if (!data.toUserId || data.toUserId.trim() === '') {
      setError('Selecione um usuário destinatário');
      return;
    }

    const isValid = await trigger();
    if (!isValid) return;

    if (!data.amount || data.amount <= 0) {
      setError('Digite um valor válido');
      return;
    }

    if (data.amount > userBalance) {
      setError('Saldo insuficiente para realizar a transferência');
      return;
    }

    onRequestConfirm(data);
  };

  const isSubmitDisabled =
    transferLoading ||
    usersLoading ||
    !toUserIdValue ||
    !amountValue ||
    amountValue <= 0 ||
    !selectedRecipient;

  return (
    <TransferFormCard>
      <FormCardHeader>
        <FormCardTitle>
          <IconArrowUpFromLine />
          Nova Transferência
        </FormCardTitle>
        <FormCardDescription>
          Selecione o destinatário e informe o valor
        </FormCardDescription>
      </FormCardHeader>

      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormGroup>
          <Label htmlFor="toUserId">Destinatário</Label>
          <RecipientDropdown
            availableUsers={availableUsers}
            selectedUserId={toUserIdValue}
            errors={errors}
            loading={usersLoading}
            onSelect={async (id) => {
              setValue('toUserId', id, { shouldValidate: true });
              await trigger('toUserId');
            }}
          />
        </FormGroup>

        <AmountInputComponent
          amountValue={amountValue}
          userBalance={userBalance}
          errors={errors}
          onAmountChange={(val) => setValue('amount', val, { shouldValidate: true })}
          onBlur={() => trigger('amount')}
        />

        <QuickAmounts onSelectAmount={(val) => setValue('amount', val, { shouldValidate: true })} />

        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        {transferApiMessage ? <ErrorMessage>{transferApiMessage}</ErrorMessage> : null}
        {success ? <SuccessMessage>{success}</SuccessMessage> : null}

        <FormActions>
          <Button type="button" variant="outline" fullWidth size="lg" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={isSubmitDisabled}
            variant="success"
          >
            {transferLoading ? 'Transferindo...' : 'Transferir'}
          </Button>
        </FormActions>
      </Form>
    </TransferFormCard>
  );
};
