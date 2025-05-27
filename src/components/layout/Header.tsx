import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle, Sun, Moon, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleChat: () => void;
  isChatOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleChat, isChatOpen }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {isAuthenticated && (
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
          )}
          <Link to="/" className="flex items-center space-x-2 ml-2 lg:ml-0">
            <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Fortune<span className="text-amber-500">Spin</span></h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
          >
            <span className="sr-only">Toggle theme</span>
            {theme.mode === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          {isAuthenticated && (
            <>
              <button 
                onClick={toggleChat}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              >
                <span className="sr-only">Toggle chat</span>
                {isChatOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <MessageCircle className="h-5 w-5" />
                )}
              </button>
              
              <div className="relative">
                <div className="flex items-center space-x-2">
                  {user?.balance !== undefined && (
                    <div className="bg-gray-700 px-3 py-1 rounded-full text-amber-500 font-semibold text-sm">
                      ${user.balance.toFixed(2)}
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Link 
                      to="/profile"
                      className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user?.username} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-300 hidden md:block">
                        {user?.username}
                      </span>
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {!isAuthenticated && (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;