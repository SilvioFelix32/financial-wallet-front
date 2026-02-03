import styled from 'styled-components';
import { Card } from '@/components/Card';

export const TransactionsCard = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const TransactionsHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
`;

export const TransactionsTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

type ExpandIconProps = {
  $expanded: boolean;
};

export const ExpandIcon = styled.span<ExpandIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

type TransactionListProps = {
  $expanded?: boolean;
};

export const TransactionList = styled.div<TransactionListProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
  max-height: ${({ $expanded }) => ($expanded ? '2000px' : '0')};
  margin-top: ${({ $expanded, theme }) => ($expanded ? theme.spacing.md : '0')};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transition: max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1), 
              margin-top 0.5s ease, 
              opacity 0.4s ease;
`;

export const EmptyState = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.lg};
`;

