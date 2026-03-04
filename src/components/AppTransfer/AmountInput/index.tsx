import type { FieldErrors } from 'react-hook-form';
import type { TransferFormData } from '@/interfaces/validations.types';
import { Label } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { formatCurrencyInput, parseNumber } from '@/utils/formatters';
import { FormGroup } from '@/components/AppTransfer/TransferForm/styles';
import {
  AmountInputWrapper,
  CurrencyPrefix,
  AmountInput,
} from './styles';

type AmountInputProps = {
  amountValue: number;
  userBalance: number;
  errors: FieldErrors<TransferFormData>;
  onAmountChange: (value: number) => void;
  onBlur: () => void;
};

export const AmountInputComponent: React.FC<AmountInputProps> = ({
  amountValue,
  userBalance,
  errors,
  onAmountChange,
  onBlur,
}) => {
  const hasError = !!errors.amount || (!!amountValue && amountValue > userBalance);
  const displayValue =
    amountValue != null && amountValue > 0
      ? formatCurrencyInput(Math.round(amountValue * 100).toString()).replace(/^R\$\s?/, '')
      : '';

  return (
    <FormGroup>
      <Label htmlFor="amount">Valor (R$)</Label>
      <AmountInputWrapper>
        <CurrencyPrefix>R$</CurrencyPrefix>
        <AmountInput
          id="amount"
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          $hasError={hasError}
          value={displayValue}
          onChange={(e) => {
            const parsed = parseNumber(e.target.value);
            onAmountChange(parsed);
          }}
          onBlur={onBlur}
        />
      </AmountInputWrapper>
      {errors.amount ? <ErrorMessage>{errors.amount.message}</ErrorMessage> : null}
      {amountValue > 0 && amountValue > userBalance ? (
        <ErrorMessage>Saldo disponível insuficiente.</ErrorMessage>
      ) : null}
    </FormGroup>
  );
};
