import { useState, useEffect } from 'react';
import { DoctorAPI } from '../services/doctorAPI';
import { useAuth } from './useAuth';
import type { WalletTransaction, WithdrawRequest } from '../types/api';

interface WalletStats {
  currentBalance: number;
  totalEarnings: number;
  pendingWithdrawals: number;
  monthlyEarnings: number;
}

export const useWallet = () => {
  const { token, doctor } = useAuth();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>([]);
  const [walletStats, setWalletStats] = useState<WalletStats>({
    currentBalance: 0,
    totalEarnings: 0,
    pendingWithdrawals: 0,
    monthlyEarnings: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (doctor) {
      // Set wallet stats from doctor profile
      setWalletStats({
        currentBalance: doctor.wallet_balance || 0,
        totalEarnings: doctor.wallet_balance || 0,
        pendingWithdrawals: 0,
        monthlyEarnings: 3200
      });
    }
  }, [doctor]);

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
      
      // For now, use sample data while API is being tested
      const sampleTransactions: WalletTransaction[] = [
        {
          id: 1,
          user_id: 1,
          doctor_id: 1,
          transaction_type: 'credit',
          amount: 150,
          description: 'Session payment from Sarah Johnson',
          status: 'completed',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          user_id: 1,
          doctor_id: 1,
          transaction_type: 'credit',
          amount: 200,
          description: 'Session payment from Michael Chen',
          status: 'completed',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          user_id: 1,
          doctor_id: 1,
          transaction_type: 'debit',
          amount: 500,
          description: 'Withdrawal to bank account',
          status: 'completed',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          updated_at: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      
      setTransactions(sampleTransactions);
      
    } catch (err) {
      console.error('Wallet statement error:', err);
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
    // This would fetch earning history from the API
    // For now, it's handled by fetchWalletStatement
  };

  const submitWithdrawRequest = async (amount: number, bankDetails: string) => {
    if (!token) throw new Error('No authentication token');
    
    try {
      setIsLoading(true);
      
      // For now, simulate the request
      const newRequest: WithdrawRequest = {
        id: Date.now(),
        doctor_id: doctor?.id || 1,
        amount: amount,
        bank_account_details: bankDetails,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setWithdrawRequests(prev => [newRequest, ...prev]);
      
      // Update balance
      setWalletStats(prev => ({
        ...prev,
        currentBalance: prev.currentBalance - amount,
        pendingWithdrawals: prev.pendingWithdrawals + amount
      }));
      
    } catch (err) {
      console.error('Withdraw request error:', err);
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
      // Sample payout history
      const sampleRequests: WithdrawRequest[] = [
        {
          id: 1,
          doctor_id: doctor?.id || 1,
          amount: 500,
          bank_account_details: 'Bank of America - ****1234',
          status: 'approved',
          processed_at: new Date(Date.now() - 86400000).toISOString(),
          created_at: new Date(Date.now() - 172800000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      
      setWithdrawRequests(sampleRequests);
      
    } catch (err) {
      console.error('Payout history error:', err);
    }
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
