import styled from 'styled-components';

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
