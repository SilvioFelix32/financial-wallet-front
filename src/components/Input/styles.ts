import styled from 'styled-components';

export type InputProps = {
  hasError?: boolean;
};

export const StyledInput = styled.input<InputProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.body};
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.colors.surface};

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, hasError }) =>
        hasError ? theme.colors.errorSoft : theme.colors.primarySoft};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`;

