import styled from 'styled-components';
import Link from 'next/link';

export const PageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  transition: background 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const HeaderText = styled.div`
  min-width: 0;
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 1.875rem;
  }
`;

export const PageSubtitle = styled.p`
  margin: 0.25rem 0 0;
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
`;
