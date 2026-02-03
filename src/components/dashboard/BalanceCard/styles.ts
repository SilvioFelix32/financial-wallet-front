import styled from 'styled-components';
import { Card } from '@/components/Card';

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

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

