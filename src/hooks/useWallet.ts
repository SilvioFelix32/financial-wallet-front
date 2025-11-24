import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletService } from '@/services/wallet.service';
import type {
  DepositRequest,
  TransferRequest,
  RevertRequest,
} from '@/interfaces/wallet.interfaces';

export const useWallet = () => {
  const queryClient = useQueryClient();

  const balanceQuery = useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: () => walletService.getBalance(),
    refetchOnWindowFocus: true,
  });

  const transactionsQuery = useQuery({
    queryKey: ['wallet', 'transactions'],
    queryFn: () => walletService.getTransactions(1, 10),
    refetchOnWindowFocus: true,
  });

  const depositMutation = useMutation({
    mutationFn: (data: DepositRequest) => walletService.deposit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });

  const transferMutation = useMutation({
    mutationFn: (data: TransferRequest) => walletService.transfer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });

  const revertMutation = useMutation({
    mutationFn: (data: RevertRequest) => walletService.revert(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });

  return {
    balance: balanceQuery.data?.balance ?? 0,
    balanceLoading: balanceQuery.isLoading,
    balanceError: balanceQuery.error,
    transactions: transactionsQuery.data?.transactions ?? [],
    transactionsLoading: transactionsQuery.isLoading,
    transactionsError: transactionsQuery.error,
    deposit: depositMutation.mutate,
    depositLoading: depositMutation.isPending,
    depositError: depositMutation.error,
    transfer: transferMutation.mutate,
    transferLoading: transferMutation.isPending,
    transferError: transferMutation.error,
    revert: revertMutation.mutate,
    revertLoading: revertMutation.isPending,
    revertError: revertMutation.error,
  };
};

