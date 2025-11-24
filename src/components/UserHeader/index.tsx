import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import {
  HeaderContainer,
  UserInfo,
  UserName,
  UserEmail,
  HeaderActions,
} from './styles';

interface UserHeaderProps {
  showLogout?: boolean;
}

export const UserHeader = ({ showLogout = true }: UserHeaderProps) => {
  const { user, logout } = useAuth();

  const userName = user?.name || user?.email || 'Usuário';
  const userEmail = user?.email || '';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <HeaderContainer>
      <UserInfo>
        <UserName>Olá, {userName}</UserName>
        {userEmail && <UserEmail>{userEmail}</UserEmail>}
      </UserInfo>
      {showLogout && (
        <HeaderActions>
          <Button variant="text" onClick={handleLogout}>
            Sair
          </Button>
        </HeaderActions>
      )}
    </HeaderContainer>
  );
};

