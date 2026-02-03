import styled from 'styled-components';

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

export const TransactionDate = styled.p`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

type TransactionAmountProps = {
  $negative?: boolean;
  $positive?: boolean;
};

export const TransactionAmount = styled.span<TransactionAmountProps>`
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme, $negative, $positive }) => {
    if ($negative) return theme.colors.error;
    if ($positive) return theme.colors.success;
    return theme.colors.success;
  }};
`;

export const TransactionActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

