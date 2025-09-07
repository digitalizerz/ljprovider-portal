import { useState, useEffect } from 'react';
import { DoctorAPI } from '../services/doctorAPI';
import { useAuth } from './useAuth';
import type { WalletTransaction, WithdrawRequest, PaginatedResponse } from '../types/api';

export const useWallet = () => {
  const { token, doctor } = useAuth();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletStatement = async (filters?: {
    page?: number;
    limit?: number;
    from_date?: string;
    to_date?: string;
  }) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await DoctorAPI.fetchDoctorWalletStatement(filters || {}, token);
      
      if (response.success) {
        setTransactions(response.data.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wallet statement');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEarningHistory = async (filters?: {
    page?: number;
    limit?: number;
    from_date?: string;
    to_date?: string;
  }) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await DoctorAPI.fetchDoctorEarningHistory(filters || {}, token);
      
      if (response.success) {
        setTransactions(response.data.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch earning history');
    } finally {
      setIsLoading(false);
    }
  };

  const submitWithdrawRequest = async (amount: number, bankDetails: string) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await DoctorAPI.submitDoctorWithdrawRequest({
        amount,
        bank_account_details: bankDetails
      }, token);
      
      if (response.success) {
        // Refresh withdraw requests
        await fetchPayoutHistory();
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit withdraw request');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPayoutHistory = async (filters?: {
    page?: number;
    limit?: number;
  }) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await DoctorAPI.fetchDoctorPayoutHistory(filters || {}, token);
      
      if (response.success) {
        setWithdrawRequests(response.data.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payout history');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate wallet stats
  const walletStats = {
    currentBalance: doctor?.wallet_balance || 0,
    totalEarnings: transactions
      .filter(t => t.transaction_type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0),
    totalWithdrawn: transactions
      .filter(t => t.transaction_type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0),
    pendingWithdrawals: withdrawRequests
      .filter(r => r.status === 'pending')
      .reduce((sum, r) => sum + r.amount, 0),
  };

  return {
    transactions,
    withdrawRequests,
    walletStats,
    isLoading,
    error,
    fetchWalletStatement,
    fetchEarningHistory,
    submitWithdrawRequest,
    fetchPayoutHistory,
  };
};