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

const IconLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

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
            <IconLogout />
          </Button>
        </HeaderActions>
      )}
    </HeaderContainer>
  );
};
