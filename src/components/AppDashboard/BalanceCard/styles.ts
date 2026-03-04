import styled from 'styled-components';

export const BalanceCardWrapper = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.palette?.light?.primary ?? theme.colors.primary};
  color: ${({ theme }) => theme.palette?.light?.primaryForeground ?? '#fff'};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
`;

export const BalanceCardContent = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

export const BalanceTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BalanceLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  margin: 0;
  opacity: 0.85;
`;

export const BalanceValue = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  opacity: 0.85;
  flex-shrink: 0;
  &:hover {
    opacity: 1;
  }
`;

export const BalanceActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

export const BalanceActionLink = styled.a<{ $primary?: boolean }>`
  flex: 1;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.75rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  transition: opacity 0.2s;
  cursor: pointer;
  border: none;
  font-family: inherit;
  box-sizing: border-box;
  @media (min-width: 1024px) {
    padding: 0.75rem 1rem;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.typography.body};
  }
  ${({ $primary, theme }) =>
    $primary
      ? `
    background: ${theme.palette?.light?.primaryForeground ?? '#fff'};
    color: ${theme.palette?.light?.primary ?? theme.colors.primary};
    &:hover { opacity: 0.9; }
  `
      : `
    background: transparent;
    color: ${theme.palette?.light?.primaryForeground ?? '#fff'};
    border: 1px solid rgba(255,255,255,0.3);
    &:hover { background: rgba(255,255,255,0.1); }
  `}
`;
