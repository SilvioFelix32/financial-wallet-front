import { useState } from 'react';
import { formatCurrency } from '@/utils/formatters';
import {
  BalanceCard,
  BalanceCardContent,
  BalanceLabel,
  BalanceValue,
  BalanceToggle,
} from './styles';
import { IconEye, IconEyeOff } from '../icons';

type TransferBalanceCardProps = {
  balance: number;
  loading?: boolean;
};

export const TransferBalanceCard: React.FC<TransferBalanceCardProps> = ({
  balance,
  loading = false,
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <BalanceCard>
      <BalanceCardContent>
        <div>
          <BalanceLabel>Saldo Disponível</BalanceLabel>
          <BalanceValue>
            {loading ? 'Carregando...' : visible ? formatCurrency(balance) : '••••••'}
          </BalanceValue>
        </div>
        <BalanceToggle
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar saldo' : 'Mostrar saldo'}
          disabled={loading}
        >
          {visible ? <IconEye /> : <IconEyeOff />}
        </BalanceToggle>
      </BalanceCardContent>
    </BalanceCard>
  );
};
