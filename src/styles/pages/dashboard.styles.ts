import styled from 'styled-components';
import { Card } from '@/components/Card';

export const Container = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const BalanceCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const BalanceLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

type BalanceValueProps = {
  $negative?: boolean;
  $positive?: boolean;
};

export const BalanceValue = styled.h2<BalanceValueProps>`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme, $negative, $positive }) => {
    if ($negative) return theme.colors.error;
    if ($positive) return theme.colors.success;
    return theme.colors.textPrimary;
  }};
`;

export const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

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

export const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const TransactionInfo = styled.div`
  flex: 1;
`;

export const TransactionType = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

type TransactionDateProps = {
  $positive?: boolean;
  $negative?: boolean;
};

export const TransactionDate = styled.p<TransactionDateProps>`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme, $positive, $negative }) => {
    if ($positive) return theme.colors.success;
    if ($negative) return theme.colors.error;
    return theme.colors.textSecondary;
  }};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

type TransactionAmountProps = {
  negative?: boolean;
  positive?: boolean;
};

export const TransactionAmount = styled.span<TransactionAmountProps>`
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme, negative, positive }) => {
    if (negative) return theme.colors.error;
    if (positive) return theme.colors.success;
    return theme.colors.success;
  }};
`;

export const EmptyState = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const UsersListCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const UsersListHeader = styled.button`
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

export const UsersListTitle = styled.h3`
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

type UsersListProps = {
  $expanded?: boolean;
};

export const UsersList = styled.div<UsersListProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
  max-height: ${({ $expanded }) => ($expanded ? '500px' : '0')};
  margin-top: ${({ $expanded, theme }) => ($expanded ? theme.spacing.md : '0')};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transition: max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1), 
              margin-top 0.5s ease, 
              opacity 0.4s ease;
`;

export const UserListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const UserName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const UserEmail = styled.div`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TransactionActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

