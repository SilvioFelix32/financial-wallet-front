import {
  PageContainer,
  LeftPanel,
  BrandHeader,
  LogoIcon,
  LogoText,
  BrandContent,
  BrandTitle,
  BrandSubtitle,
  BrandFooter,
  RightPanel,
  RightContent,
  MobileLogo,
  MobileLogoIcon,
  MobileLogoText,
} from '@/styles/pages/index.styles';
import { LoginCard } from './auth/signIn';

export default function Home() {
  return (
    <PageContainer>
      <LeftPanel>
        <BrandHeader>
          <LogoIcon>FW</LogoIcon>
          <LogoText>FinWallet</LogoText>
        </BrandHeader>

        <BrandContent>
          <BrandTitle>Sua carteira digital, simples e segura.</BrandTitle>
          <BrandSubtitle>
            Gerencie seu dinheiro, faça transferências e acompanhe suas transações de qualquer lugar.
          </BrandSubtitle>
        </BrandContent>

        <BrandFooter>FinWallet - Carteira Financeira Digital</BrandFooter>
      </LeftPanel>

      <RightPanel>
        <RightContent>
          <MobileLogo>
            <MobileLogoIcon>FW</MobileLogoIcon>
            <MobileLogoText>FinWallet</MobileLogoText>
          </MobileLogo>

            <LoginCard />
        </RightContent>
      </RightPanel>
    </PageContainer>
  );
}

