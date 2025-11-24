import styled from 'styled-components';

export const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.small};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

