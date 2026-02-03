import { useState } from 'react';
import { BalanceCard, BalanceLabel, BalanceValue, ToggleButton } from './styles';
import { formatCurrency } from '@/utils/formatters';

interface BalanceCardProps {
  balance: number;
  loading?: boolean;
}

export const BalanceCardComponent: React.FC<BalanceCardProps> = ({ balance, loading = false }) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <BalanceCard>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <BalanceLabel style={{ margin: 0 }}>Saldo Atual</BalanceLabel>
        <ToggleButton
          type="button"
          onClick={() => setShowBalance(!showBalance)}
          aria-label={showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {showBalance ? (
              <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </>
            ) : (
              <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </>
            )}
          </svg>
        </ToggleButton>
      </div>
      {loading ? (
        <BalanceValue>Carregando...</BalanceValue>
      ) : (
        <BalanceValue 
          $negative={balance < 0} 
          $positive={balance > 0}
        >
          {showBalance ? formatCurrency(balance) : '••••••'}
        </BalanceValue>
      )}
    </BalanceCard>
  );
};

