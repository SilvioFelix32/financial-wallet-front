import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutWrapper,
  Sidebar,
  SidebarLogo,
  SidebarLogoBrand,
  LogoIcon,
  LogoText,
  Nav,
  NavLink,
  SidebarFooter,
  UserAvatar,
  UserDetails,
  UserName,
  UserEmail,
  LogoutButton,
  MobileHeader,
  MobileLogo,
  MenuButton,
  SidebarOverlay,
  Main,
  MainInner,
} from './styles';

const IconDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const IconArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
  </svg>
);

const IconArrowUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="M5 12l7 7 7-7" />
  </svg>
);

const IconLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function MobileSidebarContent({
  onClose,
  isDashboard,
  isDeposit,
  isTransfer,
  displayName,
  initials,
  userEmail,
  onLogout,
}: {
  onClose: () => void;
  isDashboard: boolean;
  isDeposit: boolean;
  isTransfer: boolean;
  displayName: string;
  initials: string;
  userEmail: string | undefined;
  onLogout: () => void;
}) {
  return (
    <>
      <SidebarLogo>
        <SidebarLogoBrand>
          <LogoIcon>FW</LogoIcon>
          <LogoText>FinWallet</LogoText>
        </SidebarLogoBrand>
        <MenuButton type="button" onClick={onClose} aria-label="Fechar menu">
          <IconClose />
        </MenuButton>
      </SidebarLogo>
      <Nav>
        <NavLink href="/dashboard" $active={isDashboard} onClick={onClose}>
          <IconDashboard />
          Dashboard
        </NavLink>
        <NavLink href="/deposit" $active={isDeposit} onClick={onClose}>
          <IconArrowDown />
          Depositar
        </NavLink>
        <NavLink href="/transfer" $active={isTransfer} onClick={onClose}>
          <IconArrowUp />
          Transferir
        </NavLink>
      </Nav>
      <SidebarFooter>
        <UserAvatar>{initials}</UserAvatar>
        <UserDetails>
          <UserName>{displayName}</UserName>
          {userEmail && <UserEmail>{userEmail}</UserEmail>}
        </UserDetails>
        <LogoutButton type="button" onClick={onLogout} aria-label="Sair">
          <IconLogout />
        </LogoutButton>
      </SidebarFooter>
    </>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const pathname = router.pathname;
  const isDashboard = pathname === '/dashboard' || pathname === '/';
  const isDeposit = pathname === '/deposit';
  const isTransfer = pathname === '/transfer';
  const displayName = user?.name || user?.email || 'Usuário';
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <LayoutWrapper>
      <MobileHeader>
        <MobileLogo>
          <LogoIcon>FW</LogoIcon>
          <LogoText>FinWallet</LogoText>
        </MobileLogo>
        <MenuButton type="button" onClick={() => setMenuOpen(true)} aria-label="Menu">
          <IconMenu />
        </MenuButton>
      </MobileHeader>

      <SidebarOverlay $open={menuOpen} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <Sidebar $open={menuOpen}>
        <MobileSidebarContent
          onClose={() => setMenuOpen(false)}
          isDashboard={isDashboard}
          isDeposit={isDeposit}
          isTransfer={isTransfer}
          displayName={displayName}
          initials={initials}
          userEmail={user?.email}
          onLogout={handleLogout}
        />
      </Sidebar>

      <Main>
        <MainInner>{children}</MainInner>
      </Main>
    </LayoutWrapper>
  );
}
