import {
  PageHeader,
  BackLink,
  HeaderText,
  PageTitle,
  PageSubtitle,
} from '@/components/AppTransfer/styles';
import { IconArrowLeft } from '../icons';

export const TransferHeader: React.FC = () => (
  <PageHeader>
    <BackLink href="/dashboard" aria-label="Voltar ao dashboard">
      <IconArrowLeft />
    </BackLink>
    <HeaderText>
      <PageTitle>Transferir</PageTitle>
      <PageSubtitle>Envie dinheiro para outro usuário</PageSubtitle>
    </HeaderText>
  </PageHeader>
);
