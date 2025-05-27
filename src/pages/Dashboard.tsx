import React, { useEffect } from 'react';
import { TrendingUp, Users, Wallet, Calendar, DollarSign } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useBalance } from '../context/BalanceContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/ui/StatCard';
import FeaturedGames from '../components/ui/FeaturedGames';
import GameGrid from '../components/ui/GameGrid';
import TransactionList from '../components/ui/TransactionList';
import BetHistoryList from '../components/ui/BetHistoryList';

const Dashboard: React.FC = () => {
  const { 
    featuredGames, 
    popularGames, 
    recentBets, 
    getRecentBets 
  } = useGame();
  
  const { transactions, getTransactions } = useBalance();
  const { user } = useAuth();

  useEffect(() => {
    // Load user data
    getRecentBets();
    getTransactions();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.username || 'Player'}</h1>
        <p className="text-gray-400 mt-2">Here's an overview of your gaming activity</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Account Balance" 
          value={`$${user?.balance.toFixed(2) || '0.00'}`} 
          icon={<Wallet className="h-5 w-5 text-white" />}
          color="purple"
        />
        <StatCard 
          title="Total Winnings" 
          value="$1,250.00" 
          icon={<DollarSign className="h-5 w-5 text-white" />}
          trend="up"
          trendValue="+15% this week"
          color="green"
        />
        <StatCard 
          title="Games Played" 
          value="28" 
          icon={<TrendingUp className="h-5 w-5 text-white" />}
          color="blue"
        />
        <StatCard 
          title="Days Active" 
          value="15" 
          icon={<Calendar className="h-5 w-5 text-white" />}
          color="amber"
        />
      </div>
      
      {/* Featured Games Carousel */}
      {featuredGames.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Featured Games</h2>
          <FeaturedGames games={featuredGames} />
        </div>
      )}
      
      {/* Two Column Layout for Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Recent Transactions</h2>
          <TransactionList transactions={transactions} limit={5} />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Bet History</h2>
          <BetHistoryList bets={recentBets} limit={5} />
        </div>
      </div>
      
      {/* Popular Games */}
      {popularGames.length > 0 && (
        <GameGrid 
          games={popularGames} 
          title="Popular Games" 
          subtitle="Most played games on the platform"
        />
      )}
      
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-amber-700 rounded-lg p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">Invite Your Friends</h3>
            <p className="text-white/80 mt-1">Get $10 bonus for each friend who signs up and makes a deposit!</p>
          </div>
          <button className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-2 px-6 rounded-md transition-colors">
            Share Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;