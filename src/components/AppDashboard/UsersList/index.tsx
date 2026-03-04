import { useState } from 'react';
import type { UsersListProps } from '@/interfaces/dashboard.interfaces';
import {
  UsersListCard,
  UsersListHeader,
  UsersListTitle,
  ExpandIcon,
  UsersList as StyledUsersList,
  UserListItem,
  UserName,
  UserEmail,
  EmptyState,
} from './styles';

export const UsersListComponent: React.FC<UsersListProps> = ({ users, loading = false }) => {
  const [showUsersList, setShowUsersList] = useState(false);

  if (users.length === 0) {
    return null;
  }

  return (
    <UsersListCard>
      <UsersListHeader
        type="button"
        onClick={() => setShowUsersList(!showUsersList)}
        aria-expanded={showUsersList}
      >
        <UsersListTitle>Usuários Disponíveis para Transferência</UsersListTitle>
        <ExpandIcon $expanded={showUsersList}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </ExpandIcon>
      </UsersListHeader>
      {loading ? (
        <EmptyState>Carregando usuários...</EmptyState>
      ) : (
        <StyledUsersList $expanded={showUsersList}>
          {users.map((u) => (
            <UserListItem key={u.user_id}>
              <div>
                <UserName>{u.name}</UserName>
                <UserEmail>{u.email}</UserEmail>
              </div>
            </UserListItem>
          ))}
        </StyledUsersList>
      )}
    </UsersListCard>
  );
};

