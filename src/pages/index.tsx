import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);
import {
  Container,
  Content,
  Title,
  Subtitle,
  ButtonGroup,
  PlayerWrapper,
  HeroSection,
} from '@/styles/pages/index.styles';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <Container>
        <Content>
          <Title>Carregando...</Title>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <PlayerWrapper>
          <Player
            autoplay
            loop
            src="https://lottie.host/44abdd4b-e3d8-4602-983b-a3cb64e11e6c/HqjtspK3un.json"
            style={{ height: "120px", width: "120px" }}
          />
        </PlayerWrapper>
        <HeroSection>
          <Title>Carteira Financeira</Title>
          <Subtitle>Gerencie suas finanças de forma simples e segura</Subtitle>
          <ButtonGroup>
            <Button
              fullWidth
              onClick={() => router.push('/auth/signIn')}
              variant="primary"
            >
              Entrar
            </Button>
            <Button
              fullWidth
              onClick={() => router.push('/auth/signUp')}
              variant="outline"
            >
              Criar Conta
            </Button>
          </ButtonGroup>
        </HeroSection>
      </Content>
    </Container>
  );
}

