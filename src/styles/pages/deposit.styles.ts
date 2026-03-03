import styled from 'styled-components';
import Link from 'next/link';
import { Card } from '@/components/Card';

export const PageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  transition: background 0.2s;
  flex-shrink: 0;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const HeaderText = styled.div`
  min-width: 0;
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  @media (min-width: 1024px) {
    font-size: 1.875rem;
  }
`;

export const PageSubtitle = styled.p`
  margin: 0.25rem 0 0;
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
`;

export const BalanceCard = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.primarySoft};
  border: none;
  margin-bottom: 1.5rem;
`;

export const BalanceCardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  gap: 0.75rem;
`;

export const BalanceLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const BalanceValue = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0.25rem 0 0;
`;

export const BalanceToggle = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const DepositFormCard = styled(Card)`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const FormCardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormCardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  & svg {
    color: ${({ theme }) => theme.colors.success};
  }
`;

export const FormCardDescription = styled.p`
  margin: 0.25rem 0 0;
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AmountInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const CurrencyPrefix = styled.span`
  position: absolute;
  left: 1rem;
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

export const AmountInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 1.125rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.surface};
  transition: all 0.2s;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.errorSoft : theme.colors.primarySoft};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`;

export const QuickAmountsLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const QuickAmountsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const QuickAmountButton = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    border-color: ${({ theme }) => theme.colors.borderDark};
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;
