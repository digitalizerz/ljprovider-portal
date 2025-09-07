import React from 'react';

interface ChartCardProps {
  title: string;
  data: any[];
  type: 'line' | 'bar';
  dataKey: string;
  prefix?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, data, type, dataKey, prefix = '' }) => {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  
  return (
    <div className="text-shadow-light">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 text-shadow">{title}</h3>
      
      <div className="space-y-4">
        {data.slice(-6).map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-caption text-gray-600 w-24">{item.period}</span>
            <div className="flex-1 mx-4">
              <div className="bg-white/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400/80 to-blue-500/80 h-2 rounded-full transition-all duration-500"
                  style={{ width: maxValue > 0 ? `${(item[dataKey] / maxValue) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
            <span className="text-caption font-semibold text-gray-800 w-16 text-right">
              {prefix}{item[dataKey]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartCard;