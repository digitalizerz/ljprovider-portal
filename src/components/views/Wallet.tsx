import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import MetricCard from '../MetricCard';

const Wallet: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const walletStats = {
    currentBalance: 2450.75,
    monthlyEarnings: 3200.00,
    pendingPayouts: 450.00,
    totalEarnings: 28750.50
  };

  const transactions = [
    {
      id: 1,
      type: 'earning',
      description: 'Session with Sarah Johnson',
      amount: 150.00,
      date: '2024-12-20',
      status: 'completed'
    },
    {
      id: 2,
      type: 'payout',
      description: 'Bank Transfer',
      amount: -800.00,
      date: '2024-12-19',
      status: 'completed'
    },
    {
      id: 3,
      type: 'earning',
      description: 'Session with Michael Chen',
      amount: 150.00,
      date: '2024-12-18',
      status: 'completed'
    },
    {
      id: 4,
      type: 'earning',
      description: 'Session with Emma Davis',
      amount: 150.00,
      date: '2024-12-17',
      status: 'pending'
    }
  ];

  const earningsData = [
    { month: 'Jul', amount: 2800 },
    { month: 'Aug', amount: 3200 },
    { month: 'Sep', amount: 2950 },
    { month: 'Oct', amount: 3400 },
    { month: 'Nov', amount: 3100 },
    { month: 'Dec', amount: 3200 },
  ];

  return (
    <div className="p-6 space-y-6">
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
          value={`$${walletStats.currentBalance.toLocaleString()}`}
          change="+$450 this week"
          changeType="positive"
          icon={DollarSign}
          color="blue"
        />
        <MetricCard
          title="Monthly Earnings"
          value={`$${walletStats.monthlyEarnings.toLocaleString()}`}
          change="+12% from last month"
          changeType="positive"
          icon={TrendingUp}
          color="emerald"
        />
        <MetricCard
          title="Pending Payouts"
          value={`$${walletStats.pendingPayouts.toLocaleString()}`}
          change="3 sessions pending"
          changeType="neutral"
          icon={Calendar}
          color="amber"
        />
        <MetricCard
          title="Total Earnings"
          value={`$${walletStats.totalEarnings.toLocaleString()}`}
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
            <button className="w-full glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300 text-left">
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
                  transaction.type === 'earning' ? 'bg-emerald-100' : 'bg-blue-100'
                }`}>
                  {transaction.type === 'earning' ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-shadow-light">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.amount > 0 ? 'text-emerald-600' : 'text-blue-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
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
    </div>
  );
};

export default Wallet;