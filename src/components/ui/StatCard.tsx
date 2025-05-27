import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'purple' | 'blue' | 'green' | 'amber' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  color = 'purple' 
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-500 to-blue-700';
      case 'green':
        return 'from-green-500 to-green-700';
      case 'amber':
        return 'from-amber-500 to-amber-700';
      case 'red':
        return 'from-red-500 to-red-700';
      default:
        return 'from-purple-500 to-purple-700';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg\" className="h-4 w-4 text-green-500\" fill="none\" viewBox="0 0 24 24\" stroke="currentColor">
          <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    if (trend === 'down') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    return null;
  };

  const getTrendColorClass = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              {getTrendIcon()}
              <span className={`text-xs ${getTrendColorClass()} ml-1`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        <div className={`p-3 bg-gradient-to-br ${getColorClass()} rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;