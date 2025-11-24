export interface DepositRequest {
  amount: number;
}

export interface DepositResponse {
  message: string;
  balance: number;
}

export interface TransferRequest {
  toUserId: string;
  amount: number;
}

export interface TransferResponse {
  message: string;
  balance: number;
}

export interface RevertRequest {
  transactionId: string;
}

export interface RevertResponse {
  message: string;
  balance: number;
}

export interface BalanceResponse {
  balance: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  referenceTransactionId: string | null;
  createdAt: string;
  senderId?: string;
  senderName?: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}

