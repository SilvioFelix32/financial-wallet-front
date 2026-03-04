import { formatCurrency } from '@/utils/formatters';
import { FormGroup } from '@/components/AppTransfer/TransferForm/styles';
import {
  QuickAmountsLabel,
  QuickAmountsGrid,
  QuickAmountButton,
} from './styles';

const QUICK_AMOUNTS = [25, 50, 100, 200, 500, 1000];

type QuickAmountsProps = {
  onSelectAmount: (value: number) => void;
};

export const QuickAmounts: React.FC<QuickAmountsProps> = ({ onSelectAmount }) => (
  <FormGroup>
    <QuickAmountsLabel>Valores rápidos</QuickAmountsLabel>
    <QuickAmountsGrid>
      {QUICK_AMOUNTS.map((val) => (
        <QuickAmountButton
          key={val}
          type="button"
          onClick={() => onSelectAmount(val)}
        >
          {formatCurrency(val)}
        </QuickAmountButton>
      ))}
    </QuickAmountsGrid>
  </FormGroup>
);
