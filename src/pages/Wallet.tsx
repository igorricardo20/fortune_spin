import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowDownLeft, ArrowUpRight, Wallet as WalletIcon, Coins } from 'lucide-react';
import { useBalance } from '../context/BalanceContext';
import { useAuth } from '../context/AuthContext';
import { PaymentMethod } from '../types';
import TransactionList from '../components/ui/TransactionList';

const Wallet: React.FC = () => {
  const { transactions, deposit, withdraw, getTransactions, isLoading, error } = useBalance();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState<number>(100);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  
  useEffect(() => {
    getTransactions();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'deposit') {
      await deposit(amount, paymentMethod);
    } else {
      await withdraw(amount, paymentMethod);
    }
    
    // Reset form
    setAmount(100);
  };
  
  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Wallet</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-600 rounded-lg mr-4">
                <WalletIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Account Balance</h2>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${user?.balance.toFixed(2) || '0.00'}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('deposit')}
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1"
              >
                <ArrowDownLeft className="h-4 w-4 mr-1" />
                Deposit
              </button>
              <button 
                onClick={() => setActiveTab('withdraw')}
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1"
              >
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Withdraw
              </button>
            </div>
          </div>
        </div>
        
        {/* Deposit/Withdraw Form */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-700 px-4 py-3 flex border-b border-gray-600">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'deposit'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'withdraw'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Withdraw
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-1">
                {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'} Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  min="10"
                  max={activeTab === 'withdraw' ? user?.balance || 0 : 10000}
                  step="10"
                  className="block w-full pl-8 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">USD</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod(PaymentMethod.CREDIT_CARD)}
                  className={`flex items-center justify-center px-4 py-3 rounded-md transition-colors ${
                    paymentMethod === PaymentMethod.CREDIT_CARD
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod(PaymentMethod.E_WALLET)}
                  className={`flex items-center justify-center px-4 py-3 rounded-md transition-colors ${
                    paymentMethod === PaymentMethod.E_WALLET
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Coins className="h-5 w-5 mr-2" />
                  <span>E-Wallet</span>
                </button>
              </div>
            </div>
            
            {/* Quick Amounts */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Quick Select Amount
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 200, 500, 1000, 2000].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    disabled={activeTab === 'withdraw' && user && value > user.balance}
                    className={`py-2 px-3 rounded-md text-center transition-colors ${
                      amount === value
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    } ${activeTab === 'withdraw' && user && value > user.balance ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    ${value}
                  </button>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading || (activeTab === 'withdraw' && user && amount > user.balance)}
              className={`w-full py-3 rounded-md font-bold text-center transition-colors ${
                isLoading
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : activeTab === 'deposit'
                    ? 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white'
                    : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white'
              } ${activeTab === 'withdraw' && user && amount > user.balance ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>
                  {activeTab === 'deposit' ? 'Deposit Now' : 'Withdraw Now'}
                </span>
              )}
            </button>
          </form>
        </div>
        
        {/* Promotional Card */}
        <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">VIP Program</h3>
            <p className="text-white/80 mb-4">
              Join our VIP program and unlock exclusive benefits, bonuses, and personalized service.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="bg-white h-2 w-2 rounded-full mt-1.5 mr-2"></span>
                <span className="text-white/90">Higher withdrawal limits</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white h-2 w-2 rounded-full mt-1.5 mr-2"></span>
                <span className="text-white/90">Special promotional offers</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white h-2 w-2 rounded-full mt-1.5 mr-2"></span>
                <span className="text-white/90">Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white h-2 w-2 rounded-full mt-1.5 mr-2"></span>
                <span className="text-white/90">Cashback on losses</span>
              </li>
            </ul>
            <button className="w-full bg-white hover:bg-gray-100 text-purple-900 font-medium py-3 px-4 rounded-md transition-colors">
              Upgrade to VIP
            </button>
          </div>
        </div>
      </div>
      
      {/* Transaction History */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Transaction History</h2>
        <TransactionList transactions={transactions} />
      </div>
      
      {/* Payment Methods Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-gray-700 rounded-md mr-3">
              <CreditCard className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="font-medium text-white">Credit Card</h3>
          </div>
          <p className="text-sm text-gray-400">Instant deposits with Visa, Mastercard, and American Express.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-gray-700 rounded-md mr-3">
              <Coins className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="font-medium text-white">E-Wallet</h3>
          </div>
          <p className="text-sm text-gray-400">Fast and secure transactions with PayPal, Skrill, and Neteller.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-gray-700 rounded-md mr-3">
              <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-medium text-white">Bank Transfer</h3>
          </div>
          <p className="text-sm text-gray-400">Direct bank transfers for larger transaction amounts.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-gray-700 rounded-md mr-3">
              <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
            </div>
            <h3 className="font-medium text-white">Cryptocurrency</h3>
          </div>
          <p className="text-sm text-gray-400">Deposit and withdraw using Bitcoin, Ethereum, and other cryptocurrencies.</p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;