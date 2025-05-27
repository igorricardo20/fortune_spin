import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatPanel from '../chat/ChatPanel';
import MobileNav from './MobileNav';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, User, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
        setChatOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (isMobile && chatOpen) setChatOpen(false);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (isMobile && sidebarOpen) setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-screen h-screen min-h-0 min-w-0 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-100 font-sans">
      <div className="flex flex-col h-full w-full min-h-0 min-w-0">
        {/* Sticky Header always on top */}
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleChat={toggleChat}
          isChatOpen={chatOpen}
        />
        <div className="flex flex-1 min-h-0 min-w-0 w-full h-full">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex w-64 flex-shrink-0 bg-gray-800 h-full">
            <Sidebar />
          </aside>
          {/* Main content - prevent overlap with chat by adding margin on the right */}
          <main className="flex-1 min-w-0 flex flex-col h-full lg:mr-96">
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="container mx-auto px-4 py-6">
                <Outlet />
              </div>
            </div>
          </main>
          {/* Desktop Chat Panel (wider, top menu items in a single row) */}
          {isAuthenticated && (
            <aside className="hidden lg:flex flex-col w-96 bg-gray-800 border-l border-gray-700 h-full fixed right-0 top-0 z-30">
              {/* Improved Chat top bar layout */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-gray-700 bg-gray-800 shadow-sm">
                {/* Left: User avatar and name */}
                <Link 
                  to="/profile"
                  className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md transition-colors min-w-0"
                >
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user?.username} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-gray-300" />
                    )}
                  </div>
                  <span className="text-base font-medium text-gray-100 truncate max-w-[100px]">{user?.username}</span>
                </Link>
                {/* Center: Balance */}
                {user?.balance !== undefined && (
                  <div className="bg-gray-700 px-4 py-1 rounded-full text-amber-400 font-semibold text-base flex items-center shadow-inner">
                    <span className="mr-1">$</span>{user.balance.toFixed(2)}
                  </div>
                )}
                {/* Right: Theme and logout */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors"
                  >
                    <span className="sr-only">Toggle theme</span>
                    {theme?.mode === 'dark' ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto h-full">
                <ChatPanel />
              </div>
            </aside>
          )}
          {/* Mobile Sidebar */}
          {isMobile && (
            <div className={`fixed inset-0 z-40 lg:hidden` + (sidebarOpen ? '' : ' pointer-events-none')}> 
              <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity duration-300` + (sidebarOpen ? ' opacity-100' : ' opacity-0')} onClick={toggleSidebar}></div>
              <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 z-50 overflow-y-auto transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar />
              </div>
            </div>
          )}
          {/* Mobile Chat Panel (slides in, header always above) */}
          {isAuthenticated && isMobile && chatOpen && (
            <div className="fixed inset-0 z-40 lg:hidden flex flex-col">
              <div className="h-16 w-full flex-shrink-0" />
              <div className="flex-1 flex flex-col">
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={toggleChat}></div>
                <div className="fixed top-16 right-0 w-full sm:w-80 h-[calc(100vh-4rem)] bg-gray-800 z-50 overflow-y-auto">
                  <ChatPanel />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Mobile Navigation */}
        {isMobile && isAuthenticated && (
          <MobileNav toggleChat={toggleChat} />
        )}
      </div>
    </div>
  );
};

export default Layout;