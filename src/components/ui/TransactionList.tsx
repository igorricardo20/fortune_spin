import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction, PaymentMethod } from '../../types';

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, limit }) => {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

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

  // Get an icon and color based on transaction type
  const getTransactionDetails = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'deposit':
        return {
          icon: <ArrowDownLeft className="h-4 w-4" />,
          color: 'text-green-500 bg-green-500/20',
          sign: '+'
        };
      case 'withdrawal':
        return {
          icon: <ArrowUpRight className="h-4 w-4" />,
          color: 'text-red-500 bg-red-500/20',
          sign: '-'
        };
      case 'bet':
        return {
          icon: <ArrowUpRight className="h-4 w-4" />,
          color: 'text-red-500 bg-red-500/20',
          sign: '-'
        };
      case 'win':
        return {
          icon: <ArrowDownLeft className="h-4 w-4" />,
          color: 'text-green-500 bg-green-500/20',
          sign: '+'
        };
      default:
        return {
          icon: null,
          color: 'text-gray-500 bg-gray-500/20',
          sign: ''
        };
    }
  };

  // Get a human-readable label for payment methods
  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return 'Credit Card';
      case PaymentMethod.BANK_TRANSFER:
        return 'Bank Transfer';
      case PaymentMethod.E_WALLET:
        return 'E-Wallet';
      case PaymentMethod.CRYPTO:
        return 'Cryptocurrency';
      default:
        return 'Unknown';
    }
  };

  if (displayTransactions.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="space-y-3">
          {displayTransactions.map((transaction) => {
            const { icon, color, sign } = getTransactionDetails(transaction);
            
            return (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${color}`}>
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white capitalize">
                      {transaction.type}
                    </h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>{getPaymentMethodLabel(transaction.method)}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDate(transaction.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className={transaction.type === 'win' || transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}>
                  <span className="font-medium">{sign}${transaction.amount.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;