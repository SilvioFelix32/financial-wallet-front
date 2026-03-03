import { useState } from 'react';
import Link from 'next/link';
import type { BalanceCardProps } from '@/interfaces/dashboard.interfaces';
import {
  BalanceCardWrapper,
  BalanceCardContent,
  BalanceTop,
  BalanceLabel,
  BalanceValue,
  ToggleButton,
  BalanceActions,
  BalanceActionLink,
} from './styles';
import { formatCurrency } from '@/utils/formatters';

const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
  </svg>
);

const IconArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="M5 12l7 7 7-7" />
  </svg>
);

export const BalanceCardComponent: React.FC<BalanceCardProps> = ({ balance, loading = false }) => {
  const [visible, setVisible] = useState(true);

  return (
    <BalanceCardWrapper>
      <BalanceCardContent>
        <BalanceTop>
          <div>
            <BalanceLabel>Saldo Disponível</BalanceLabel>
            {loading ? (
              <BalanceValue>Carregando...</BalanceValue>
            ) : (
              <BalanceValue>{visible ? formatCurrency(balance) : '••••••'}</BalanceValue>
            )}
          </div>
          <ToggleButton
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar saldo' : 'Mostrar saldo'}
          >
            {visible ? <IconEye /> : <IconEyeOff />}
          </ToggleButton>
        </BalanceTop>
        <BalanceActions>
          <Link href="/deposit" passHref legacyBehavior>
            <BalanceActionLink $primary>
              <IconArrowDown />
              Depositar
            </BalanceActionLink>
          </Link>
          <Link href="/transfer" passHref legacyBehavior>
            <BalanceActionLink>
              <IconArrowUp />
              Transferir
            </BalanceActionLink>
          </Link>
        </BalanceActions>
      </BalanceCardContent>
    </BalanceCardWrapper>
  );
};
