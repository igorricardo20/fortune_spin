import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatPanel from '../chat/ChatPanel';
import MobileNav from './MobileNav';
import { useAuth } from '../../context/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleChat={toggleChat}
        isChatOpen={chatOpen}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0 bg-gray-800">
          <Sidebar />
        </div>
        
        {/* Mobile Sidebar */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={toggleSidebar}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 z-50 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
        
        {/* Desktop Chat Panel */}
        {isAuthenticated && (
          <div className={`hidden lg:block w-80 bg-gray-800 border-l border-gray-700 overflow-hidden`}>
            <ChatPanel />
          </div>
        )}
        
        {/* Mobile Chat Panel */}
        {isAuthenticated && isMobile && chatOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={toggleChat}></div>
            <div className="fixed inset-y-0 right-0 w-full sm:w-80 bg-gray-800 z-50 overflow-y-auto">
              <ChatPanel />
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && isAuthenticated && (
        <MobileNav toggleChat={toggleChat} />
      )}
    </div>
  );
};

export default Layout;