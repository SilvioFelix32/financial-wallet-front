import styled from 'styled-components';

export type ButtonProps = {
  variant?: 'primary' | 'success' | 'danger' | 'text' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
};

export const StyledButton = styled.button<{
  $variant?: 'primary' | 'success' | 'danger' | 'text' | 'outline';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}>`
  padding: ${({ theme, $size }) => {
    switch ($size) {
      case 'sm':
        return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'lg':
        return `${theme.spacing.md} ${theme.spacing.lg}`;
      default:
        return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme, $size }) => {
    switch ($size) {
      case 'sm':
        return theme.typography.small;
      case 'lg':
        return theme.typography.h3;
      default:
        return theme.typography.body;
    }
  }};
  border: none;
  font-weight: 500;
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background: ${theme.colors.success};
          color: #fff;
          &:hover:not(:disabled) {
            background: ${theme.colors.successHover};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: #fff;
          &:hover:not(:disabled) {
            background: ${theme.colors.errorHover};
          }
        `;
      case 'text':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            background: ${theme.colors.primarySoft};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          border: 1px solid ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            background: ${theme.colors.primarySoft};
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: #fff;
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
          }
        `;
    }
  }}

  &:disabled {
    cursor: not-allowed;
  }
`;

