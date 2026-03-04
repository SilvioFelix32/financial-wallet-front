import type { User } from '@/interfaces/user.interfaces';
import {
  UsersCardWrapper,
  UsersCardHeader,
  UsersCardTitle,
  UsersList,
  UserListItem,
  UserAvatar,
  UserInfo,
  UserName,
  UserEmail,
  EmptyState,
} from './styles';

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'inherit', opacity: 0.7 }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export interface UsersCardProps {
  users: User[];
  loading?: boolean;
}

export const UsersCard: React.FC<UsersCardProps> = ({ users, loading = false }) => {
  return (
    <UsersCardWrapper>
      <UsersCardHeader>
        <IconUser />
        <UsersCardTitle>Usuários Disponíveis</UsersCardTitle>
      </UsersCardHeader>
      {loading ? (
        <EmptyState>Carregando usuários...</EmptyState>
      ) : users.length === 0 ? (
        <EmptyState>Nenhum usuário disponível.</EmptyState>
      ) : (
        <UsersList role="list">
          {users.map((user) => (
            <UserListItem key={user.user_id}>
              <UserAvatar>{user.name.slice(0, 2).toUpperCase()}</UserAvatar>
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserInfo>
            </UserListItem>
          ))}
        </UsersList>
      )}
    </UsersCardWrapper>
  );
};
