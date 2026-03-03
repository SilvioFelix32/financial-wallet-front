import styled from 'styled-components';
import Link from 'next/link';

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.palette?.light?.background ?? theme.colors.background};
`;

const headerBg = ({ theme }: { theme: { palette?: { light?: { primary?: string } }; colors?: { primary?: string } } }) =>
  theme.palette?.light?.primary ?? theme.colors?.primary ?? '#133C62';

export const Sidebar = styled.aside<{ $open?: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 16rem;
  background: ${headerBg};
  color: ${({ theme }) => theme.palette?.light?.primaryForeground ?? '#fff'};
  z-index: 50;
  transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
  transition: transform 0.25s ease;
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
`;

export const SidebarLogoBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
`;

export const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.palette?.light?.primaryForeground ?? '#fff'};
  color: ${({ theme }) => theme.palette?.light?.primary ?? theme.colors.primary};
  font-weight: 700;
  font-size: 0.875rem;
`;

export const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const Nav = styled.nav`
  flex: 1;
  padding: 0 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.palette?.light?.primaryForeground ?? '#fff'};
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
  background: ${({ $active, theme }) =>
    $active ? 'rgba(255,255,255,0.15)' : 'transparent'};
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const SidebarFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const UserAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserEmail = styled.p`
  font-size: 0.75rem;
  margin: 0;
  opacity: 0.85;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.85;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 1;
  }
`;

export const MobileHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: ${headerBg};
  color: ${({ theme }) => theme.palette?.light?.primaryForeground ?? '#fff'};
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobileLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SidebarOverlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 40;
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

export const MainInner = styled.div`
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`;
