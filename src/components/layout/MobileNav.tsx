import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Wallet, MessageCircle, User } from 'lucide-react';

interface MobileNavProps {
  toggleChat: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ toggleChat }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-10">
      <div className="flex justify-around">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-2 px-4 ${
              isActive ? 'text-purple-500' : 'text-gray-400 hover:text-white'
            }`
          }
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        <NavLink 
          to="/casino" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-2 px-4 ${
              isActive ? 'text-purple-500' : 'text-gray-400 hover:text-white'
            }`
          }
        >
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Casino</span>
        </NavLink>
        
        <NavLink 
          to="/wallet" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-2 px-4 ${
              isActive ? 'text-purple-500' : 'text-gray-400 hover:text-white'
            }`
          }
        >
          <Wallet className="h-6 w-6" />
          <span className="text-xs mt-1">Wallet</span>
        </NavLink>
        
        <button
          onClick={toggleChat}
          className="flex flex-col items-center justify-center py-2 px-4 text-gray-400 hover:text-white"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Chat</span>
        </button>
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-2 px-4 ${
              isActive ? 'text-purple-500' : 'text-gray-400 hover:text-white'
            }`
          }
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNav;