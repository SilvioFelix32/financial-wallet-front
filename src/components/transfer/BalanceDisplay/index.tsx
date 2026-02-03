import { useState } from 'react';
import type { BalanceDisplayProps } from '@/interfaces/transfer.interfaces';
import { Label } from '@/components/Label';
import { FormGroup } from './styles';
import { formatCurrency } from '@/utils/formatters';

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance, loading = false }) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <FormGroup>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <Label style={{ margin: 0 }}>Saldo Disponível</Label>
        <button
          type="button"
          onClick={() => setShowBalance(!showBalance)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            color: '#666',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#333'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
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
        </button>
      </div>
      {loading ? (
        <p style={{ margin: 0, color: '#666' }}>Carregando...</p>
      ) : (
        <p style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: 600,
          color: balance < 0 ? '#e74c3c' : balance > 0 ? '#27ae60' : '#666'
        }}>
          {showBalance ? formatCurrency(balance) : '••••••'}
        </p>
      )}
    </FormGroup>
  );
};

