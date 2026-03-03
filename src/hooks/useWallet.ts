import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
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

  const transactionsQuery = useInfiniteQuery({
    queryKey: ['wallet', 'transactions'],
    queryFn: ({ pageParam }) => walletService.getTransactions((pageParam as number) ?? 1, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.page;
      const totalPages = lastPage.pagination.totalPages;
      if (currentPage < totalPages) return currentPage + 1;
      return undefined;
    },
    refetchOnWindowFocus: true,
  });

  const transactions = useMemo(
    () => transactionsQuery.data?.pages.flatMap((p) => p.transactions) ?? [],
    [transactionsQuery.data]
  );

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
    transactions,
    transactionsLoading: transactionsQuery.isLoading,
    transactionsError: transactionsQuery.error,
    transactionsHasMore: Boolean(transactionsQuery.hasNextPage),
    transactionsFetchingMore: transactionsQuery.isFetchingNextPage,
    transactionsLoadMore: transactionsQuery.fetchNextPage,
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

