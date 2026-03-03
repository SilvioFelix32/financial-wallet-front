import styled from 'styled-components';
import { Card } from '@/components/Card';

export const UsersCardWrapper = styled(Card)`
  width: 100%;
  min-width: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
`;

export const UsersCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0 1rem;
`;

export const UsersCardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const UsersList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const UserListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const UserAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

export const UserName = styled.p`
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserEmail = styled.p`
  font-size: 0.75rem;
  margin: 0.25rem 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EmptyState = styled.p`
  text-align: center;
  padding: 1.5rem;
  margin: 0;
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
