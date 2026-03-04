import styled from 'styled-components';
import { Card } from '@/components/Card';

export const TransferFormCard = styled(Card)`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const FormCardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormCardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  & svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FormCardDescription = styled.p`
  margin: 0.25rem 0 0;
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;
