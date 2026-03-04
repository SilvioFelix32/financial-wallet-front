import Link from 'next/link';
import { Button } from '@/components/Button';
import { ActionsGrid } from './styles';

export const ActionsGridComponent: React.FC = () => {
  return (
    <ActionsGrid>
      <Link href="/deposit">
        <Button fullWidth variant="primary" size="lg">
          Depositar
        </Button>
      </Link>
      <Link href="/transfer">
        <Button fullWidth variant="success" size="lg">
          Transferir
        </Button>
      </Link>
    </ActionsGrid>
  );
};

