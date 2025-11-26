import styled from 'styled-components';
import { Card } from '@/components/Card';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const FormCard = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  height: 450px;
  width: 100%;
`;

export const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormHeader = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.md};
  flex: 1;
  justify-content: space-between;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

export const LinkContainer = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.small};
`;

export const StyledLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

