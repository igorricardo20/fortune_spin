import React, { useMemo } from 'react';
import { useBalance } from '../../context/BalanceContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const BalanceChart: React.FC = () => {
  const { transactions } = useBalance();

  // Build balance over time from transactions
  const data = useMemo(() => {
    let balance = 0;
    // Sort by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return sorted.map((tx) => {
      if (tx.type === 'deposit' || tx.type === 'win') {
        balance += tx.amount;
      } else if (tx.type === 'withdrawal' || tx.type === 'bet') {
        balance -= tx.amount;
      }
      return {
        date: new Date(tx.createdAt).toLocaleDateString(),
        balance: Math.max(balance, 0),
      };
    });
  }, [transactions]);

  if (!data.length) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Balance Over Time</h2>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBalanceGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: '#d1d5db', fontSize: 12 }} />
          <YAxis tick={{ fill: '#d1d5db', fontSize: 12 }} />
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: '#fff' }} />
          <Area type="monotone" dataKey="balance" stroke="#22c55e" strokeWidth={4} fillOpacity={1} fill="url(#colorBalanceGreen)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
