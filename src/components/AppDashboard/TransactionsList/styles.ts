import styled from 'styled-components';
import { Card } from '@/components/Card';

export const TransactionsCard = styled(Card)`
  width: 100%;
  min-width: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
`;

export const TransactionsHeader = styled.div`
  padding: 0.75rem 1rem 0;
  @media (min-width: 1024px) {
    padding: 1rem 1.5rem 0;
  }
`;

export const TransactionsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TransactionsBody = styled.div<{ $scrollable: boolean }>`
  --tx-row-height: 3.75rem;

  @media (min-width: 1024px) {
    --tx-row-height: 4.5rem;
  }

  ${({ $scrollable }) =>
    $scrollable
      ? `
    max-height: calc(var(--tx-row-height) * 10);
    overflow-y: auto;
    overscroll-behavior: contain;
  `
      : `
    max-height: none;
    overflow: visible;
  `}
`;

export const TransactionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 1.5rem;
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
