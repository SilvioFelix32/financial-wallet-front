import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.palette?.light?.primary ?? theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  width: 100%;
  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const UserName = styled.h2`
  font-size: ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.palette?.light?.primaryForeground ?? '#fff'};
  margin: 0;
  font-weight: 600;
`;

export const UserEmail = styled.p`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.palette?.light?.primaryForeground ?? '#fff'};
  margin: 0;
  opacity: 0.9;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;

  svg {
    color: ${({ theme }) => theme.palette?.light?.primaryForeground ?? '#fff'};
  }

  &:hover {
    svg {
      color: ${({ theme }) => theme.palette?.light?.primary ?? theme.colors.primary};
    }
  }
`;
