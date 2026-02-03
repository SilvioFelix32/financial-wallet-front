import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

