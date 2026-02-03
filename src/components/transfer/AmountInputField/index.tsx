import type { AmountInputFieldProps } from '@/interfaces/transfer.interfaces';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { ErrorMessage } from '@/components/ErrorMessage';
import { formatCurrencyInput, parseNumber } from '@/utils/formatters';
import { FormGroup } from './styles';

export const AmountInputField: React.FC<AmountInputFieldProps> = ({
  control,
  errors,
  amountValue,
  userBalance,
}) => {
  return (
    <FormGroup>
      <Label htmlFor="amount">Valor (R$)</Label>
      <Controller
        name="amount"
        control={control}
        render={({ field }) => {
          return (
            <Input
              id="amount"
              type="text"
              placeholder="R$ 0,00"
              hasError={!!errors.amount || (!!amountValue && amountValue > userBalance)}
              value={formatCurrencyInput(field.value ? Math.round(field.value * 100).toString() : '')}
              onChange={(e) => {
                const parsed = parseNumber(e.target.value);
                field.onChange(parsed);
              }}
              onBlur={field.onBlur}
            />
          );
        }}
      />
      {errors.amount && (
        <ErrorMessage>{errors.amount.message}</ErrorMessage>
      )}
      {amountValue > 0 && amountValue > userBalance && (
        <ErrorMessage>Saldo disponível insuficiente.</ErrorMessage>
      )}
    </FormGroup>
  );
};

