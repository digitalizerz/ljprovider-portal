import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import MetricCard from '../MetricCard';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { formatCurrency, formatDate } from '../../utils/formatters';

const Wallet: React.FC = () => {
  const { doctor } = useAuth();
  const { 
    transactions, 
    withdrawRequests, 
    walletStats, 
    isLoading, 
    error,
    fetchWalletStatement,
    fetchEarningHistory,
    submitWithdrawRequest,
    fetchPayoutHistory
  } = useWallet();
  
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankDetails, setBankDetails] = useState('');

  useEffect(() => {
    fetchWalletStatement();
    fetchEarningHistory();
    fetchPayoutHistory();
  }, []);

  const handleWithdrawRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitWithdrawRequest(parseFloat(withdrawAmount), bankDetails);
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      setBankDetails('');
      alert('Withdraw request submitted successfully!');
    } catch (error) {
      alert('Failed to submit withdraw request. Please try again.');
    }
  };

  const earningsData = [
    { month: 'Jul', amount: 2800 },
    { month: 'Aug', amount: 3200 },
    { month: 'Sep', amount: 2950 },
    { month: 'Oct', amount: 3400 },
    { month: 'Nov', amount: 3100 },
    { month: 'Dec', amount: 3200 },
  ];

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {error && (
        <ErrorMessage message={error} className="mb-6" />
      )}
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-display text-gray-800 mb-2 text-shadow">Wallet & Earnings</h1>
        <p className="text-body text-gray-600 text-shadow-light">
          Track your earnings, manage payouts, and view financial analytics
        </p>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Current Balance"
          value={formatCurrency(walletStats.currentBalance)}
          change="+$450 this week"
          changeType="positive"
          icon={DollarSign}
          color="blue"
        />
        <MetricCard
          title="Monthly Earnings"
          value={formatCurrency(walletStats.totalEarnings)}
          change="+12% from last month"
          changeType="positive"
          icon={TrendingUp}
          color="emerald"
        />
        <MetricCard
          title="Pending Payouts"
          value={formatCurrency(walletStats.pendingWithdrawals)}
          change="3 sessions pending"
          changeType="neutral"
          icon={Calendar}
          color="amber"
        />
        <MetricCard
          title="Total Earnings"
          value={formatCurrency(walletStats.totalEarnings)}
          change="+25% this year"
          changeType="positive"
          icon={CreditCard}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="xl:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 text-shadow">Earnings Overview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPeriod === 'week'
                    ? 'glass-button bg-lovejoy-500/20 text-lovejoy-800 shadow-md border border-lovejoy-300'
                    : 'glass-button text-gray-600 hover:bg-white/20'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPeriod === 'month'
                    ? 'glass-button bg-lovejoy-500/20 text-lovejoy-800 shadow-md border border-lovejoy-300'
                    : 'glass-button text-gray-600 hover:bg-white/20'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setSelectedPeriod('year')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPeriod === 'year'
                    ? 'glass-button bg-lovejoy-500/20 text-lovejoy-800 shadow-md border border-lovejoy-300'
                    : 'glass-button text-gray-600 hover:bg-white/20'
                }`}
              >
                Year
              </button>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="space-y-4">
            {earningsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-12">{item.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-white/30 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-lovejoy-400/80 to-lovejoy-500/80 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(item.amount / 3400) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-800 w-20 text-right">
                  ${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 text-shadow">Quick Actions</h3>
          <div className="space-y-4">
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="w-full glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300 text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Request Payout</p>
                  <p className="text-sm text-gray-600">Transfer to bank account</p>
                </div>
              </div>
            </button>

            <button className="w-full glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Payment Settings</p>
                  <p className="text-sm text-gray-600">Manage bank details</p>
                </div>
              </div>
            </button>

            <button className="w-full glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Download Report</p>
                  <p className="text-sm text-gray-600">Export earnings data</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 text-shadow">Recent Transactions</h3>
          <button className="text-sm text-lovejoy-600 hover:text-lovejoy-800 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between glass-button rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.transaction_type === 'credit' ? 'bg-emerald-100' : 'bg-blue-100'
                }`}>
                  {transaction.transaction_type === 'credit' ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-shadow-light">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{formatDate(transaction.created_at)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.transaction_type === 'credit' ? 'text-emerald-600' : 'text-blue-600'
                }`}>
                  {transaction.transaction_type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className={`text-sm ${
                  transaction.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Request Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Request Payout</h3>
            <form onSubmit={handleWithdrawRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (Available: {formatCurrency(walletStats.currentBalance)})
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  min="10"
                  max={walletStats.currentBalance}
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Details</label>
                <textarea
                  value={bankDetails}
                  onChange={(e) => setBankDetails(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Bank Name, Account Number, Routing Number, etc."
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
