import styled from 'styled-components';

export const TransactionItemRow = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  transition: background 0.15s;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  min-width: 0;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
  @media (min-width: 1024px) {
    gap: 1rem;
    padding: 1rem 1.5rem;
  }
`;

export const IconWrapper = styled.div<{ $variant: 'income' | 'outcome' | 'reversal' | 'neutral' }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  ${({ theme, $variant }) => {
    if ($variant === 'income') return `background: ${theme.colors.successSoft}; color: ${theme.colors.success};`;
    if ($variant === 'outcome') return `background: ${theme.colors.errorSoft}; color: ${theme.colors.error};`;
    if ($variant === 'reversal') return `background: ${theme.colors.warningSoft}; color: ${theme.colors.warning};`;
    return `background: ${theme.colors.surfaceAlt}; color: ${theme.colors.textSecondary};`;
  }}
`;

export const TransactionInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TransactionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Badge = styled.span<{ $variant?: 'success' | 'error' | 'neutral' }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
  ${({ theme, $variant }) => {
    if ($variant === 'success') return `background: ${theme.colors.successSoft}; color: ${theme.colors.success};`;
    if ($variant === 'error') return `background: ${theme.colors.errorSoft}; color: ${theme.colors.error};`;
    return `background: ${theme.colors.surfaceAlt}; color: ${theme.colors.textSecondary};`;
  }}
`;

export const TransactionDate = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.25rem 0 0;
`;

export const TransactionRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

export const TransactionAmount = styled.span<{ $negative?: boolean; $positive?: boolean }>`
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 600;
  tabular-nums: true;
  ${({ theme, $negative, $positive }) => {
    if ($positive) return `color: ${theme.colors.success};`;
    if ($negative) return `color: ${theme.colors.error};`;
    return `color: ${theme.colors.textPrimary};`;
  }}
`;

export const RevertButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
