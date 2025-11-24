import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import {
  Container,
  Content,
  Title,
  ButtonGroup,
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
        <Title>Carteira Financeira</Title>
        <p style={{ marginBottom: '24px', color: '#4D4D4D' }}>
          Gerencie suas finanças de forma simples e segura
        </p>
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
      </Content>
    </Container>
  );
}

