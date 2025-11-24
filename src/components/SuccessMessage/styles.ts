import styled from 'styled-components';

export const StyledSuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.small};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

