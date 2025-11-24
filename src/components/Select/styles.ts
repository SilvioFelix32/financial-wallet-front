import styled from 'styled-components';

export type SelectProps = {
  hasError?: boolean;
};

export const StyledSelect = styled.select<SelectProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.body};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    cursor: not-allowed;
    opacity: 0.6;
  }

  option {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

