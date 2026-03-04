import styled from 'styled-components';

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
