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

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
`;

export const GreetingSection = styled.div`
  margin-bottom: 0.25rem;
`;

export const GreetingTitle = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  word-break: break-word;
  @media (min-width: 1024px) {
    font-size: 1.875rem;
  }
`;

export const GreetingSubtitle = styled.p`
  margin: 0.25rem 0 0;
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  word-break: break-word;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const GridCol2 = styled.div`
  min-width: 0;
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`;

export const GridCol3 = styled.div`
  min-width: 0;
  @media (min-width: 1024px) {
    grid-column: span 3;
  }
`;

