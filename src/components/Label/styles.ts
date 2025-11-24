import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

