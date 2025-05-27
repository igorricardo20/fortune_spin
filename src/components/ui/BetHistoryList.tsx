import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Bet } from '../../types';

interface BetHistoryListProps {
  bets: Bet[];
  limit?: number;
}

const BetHistoryList: React.FC<BetHistoryListProps> = ({ bets, limit }) => {
  const displayBets = limit ? bets.slice(0, limit) : bets;

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get icon and style based on bet outcome
  const getBetOutcomeDetails = (outcome: string) => {
    switch (outcome) {
      case 'win':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          badgeClass: 'bg-green-500/20 text-green-500',
          textClass: 'text-green-500'
        };
      case 'loss':
        return {
          icon: <XCircle className="h-4 w-4" />,
          badgeClass: 'bg-red-500/20 text-red-500',
          textClass: 'text-red-500'
        };
      case 'pending':
        return {
          icon: <Clock className="h-4 w-4" />,
          badgeClass: 'bg-amber-500/20 text-amber-500',
          textClass: 'text-amber-500'
        };
      default:
        return {
          icon: null,
          badgeClass: 'bg-gray-500/20 text-gray-500',
          textClass: 'text-gray-500'
        };
    }
  };

  if (displayBets.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400">No bet history yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="space-y-3">
          {displayBets.map((bet) => {
            const { icon, badgeClass, textClass } = getBetOutcomeDetails(bet.outcome);
            
            return (
              <div 
                key={bet.id} 
                className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${badgeClass}`}>
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      Game #{bet.gameId}
                    </h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>Bet: ${bet.amount.toFixed(2)}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDate(bet.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`text-sm font-medium capitalize ${badgeClass} px-2 py-0.5 rounded`}>
                    {bet.outcome}
                  </div>
                  {bet.outcome === 'win' && (
                    <div className={textClass}>
                      <span className="font-medium">+${bet.winAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BetHistoryList;