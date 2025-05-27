import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Wallet, Trophy, Users, HelpCircle, Settings, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Casino', path: '/casino', icon: <Grid size={20} /> },
    { name: 'Wallet', path: '/wallet', icon: <Wallet size={20} /> },
    { name: 'Tournaments', path: '/tournaments', icon: <Trophy size={20} /> },
    { name: 'Support', path: '/support', icon: <HelpCircle size={20} /> },
    { name: 'Settings', path: '/profile', icon: <Settings size={20} /> },
  ];
  
  const adminNavItems = [
    { name: 'Admin Panel', path: '/admin', icon: <ShieldAlert size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
  ];

  return (
    <div className="h-full py-4">
      <div className="px-4 mb-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Main Menu
        </h2>
        <nav className="mt-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-800 to-purple-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="mr-3 text-gray-400">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {user?.isAdmin && (
        <div className="px-4 mt-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Admin
          </h2>
          <nav className="mt-3 space-y-1">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-red-800 to-red-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
      
      <div className="px-4 mt-8">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Popular Games
        </h2>
        <nav className="mt-3 space-y-1">
          <NavLink
            to="/games/fortune-tiger"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <span className="mr-3 flex-shrink-0 h-5 w-5 bg-amber-600 rounded-sm"></span>
            Fortune Tiger
          </NavLink>
          <NavLink
            to="/games/slots"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <span className="mr-3 flex-shrink-0 h-5 w-5 bg-blue-600 rounded-sm"></span>
            Slots
          </NavLink>
          <NavLink
            to="/games/blackjack"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <span className="mr-3 flex-shrink-0 h-5 w-5 bg-green-600 rounded-sm"></span>
            Blackjack
          </NavLink>
          <NavLink
            to="/games/roulette"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <span className="mr-3 flex-shrink-0 h-5 w-5 bg-red-600 rounded-sm"></span>
            Roulette
          </NavLink>
        </nav>
      </div>
      
      <div className="px-4 mt-8">
        <div className="bg-gray-700 rounded-lg p-4 shadow-inner">
          <h3 className="text-sm font-medium text-white">Deposit Bonus</h3>
          <p className="text-xs text-gray-300 mt-1">Get 100% bonus on your first deposit up to $500!</p>
          <button className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium py-2 px-4 rounded-md text-sm transition-colors">
            Deposit Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;