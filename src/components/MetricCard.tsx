import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'purple' | 'amber' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color 
}) => {
  const colorClasses = {
    blue: 'bg-lovejoy-100 text-lovejoy-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-gold-100 text-gold-600',
    red: 'bg-red-100 text-red-600',
  };

  const changeClasses = {
    positive: 'text-emerald-600 bg-emerald-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-500 bg-gray-50',
  };

  return (
    <div className="metric-card text-shadow-light">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change !== '--' && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${changeClasses[changeType]}`}>
            {changeType === 'positive' && <TrendingUp className="w-3 h-3 mr-1" />}
            {changeType === 'negative' && <TrendingDown className="w-3 h-3 mr-1" />}
            {change}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl text-display text-gray-800 mb-1">{value}</h3>
        <p className="text-caption text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;