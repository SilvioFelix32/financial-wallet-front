import api from './api.service';
import type {
  DepositRequest,
  DepositResponse,
  TransferRequest,
  TransferResponse,
  RevertRequest,
  RevertResponse,
  BalanceResponse,
  TransactionsResponse,
} from '@/interfaces/wallet.interfaces';

const BASE_URL = '/wallet';

export const walletService = {
  async deposit(data: DepositRequest): Promise<DepositResponse> {
    const response = await api.post<DepositResponse>(`${BASE_URL}/deposit`, data);
    return response.data;
  },

  async transfer(data: TransferRequest): Promise<TransferResponse> {
    const response = await api.post<TransferResponse>(`${BASE_URL}/transfer`, data);
    return response.data;
  },

  async revert(data: RevertRequest): Promise<RevertResponse> {
    const response = await api.post<RevertResponse>(`${BASE_URL}/revert`, data);
    return response.data;
  },

  async getBalance(): Promise<BalanceResponse> {
    const response = await api.get<BalanceResponse>(`${BASE_URL}/balance`);
    return response.data;
  },

  async getTransactions(
    page: number = 1,
    limit: number = 10
  ): Promise<TransactionsResponse> {
    const response = await api.get<TransactionsResponse>(`${BASE_URL}/transactions`, {
      params: { page, limit },
    });
    return response.data;
  },
};

