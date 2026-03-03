import styled from 'styled-components';
import { Card } from '@/components/Card';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.palette.light.background};
`;

export const LeftPanel = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    padding: 3rem;
    background: ${({ theme }) => theme.palette.light.primary};
    color: ${({ theme }) => theme.palette.light.primaryForeground};
  }
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.palette.light.primaryForeground}33;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const BrandContent = styled.div`
  width: 100%;
`;

export const BrandTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const BrandSubtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.palette.light.primaryForeground};
  opacity: 0.7;
  max-width: 420px;
`;

export const BrandFooter = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.light.primaryForeground};
  opacity: 0.7;
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: ${({ theme }) => theme.palette.light.background};
`;

export const RightContent = styled.div`
  width: 100%;
  max-width: 380px;
`;

export const MobileLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobileLogoIcon = styled(LogoIcon)`
  background: ${({ theme }) => theme.palette.light.primary};
  color: ${({ theme }) => theme.palette.light.primaryForeground};
`;

export const MobileLogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const LoginCard = styled(Card)`
  border-radius: ${({ theme }) => theme.palette.light.radius};
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.15);
  border: 1px solid ${({ theme }) => theme.palette.light.border};
  background: ${({ theme }) => theme.palette.light.card};
  width: 400px;
  height: 450px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

export const CardHeader = styled.header`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const CardDescription = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const FieldHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const HelperLink = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.light.primary};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PasswordFieldWrapper = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

export const SubmitWrapper = styled.div`
  margin-top: 0.5rem;
`;

export const FooterText = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FooterLink = styled.button`
  border: none;
  padding: 0;
  margin-left: 0.25rem;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.light.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

