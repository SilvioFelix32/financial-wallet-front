import styled from 'styled-components';
import { Card } from '@/components/Card';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Content = styled(Card)`
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

