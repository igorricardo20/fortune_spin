import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import { BalanceProvider } from './context/BalanceContext';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Casino from './pages/Casino';
import SlotGame from './pages/games/SlotGame';
import FortuneTiger from './pages/games/FortuneTiger';
import BlackjackGame from './pages/games/BlackjackGame';
import RouletteGame from './pages/games/RouletteGame';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Support from './pages/Support';
import AdminDashboard from './pages/admin/AdminDashboard';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BalanceProvider>
          <GameProvider>
            <ChatProvider>
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard\" replace />} />
                    <Route 
                      path="dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="casino" 
                      element={
                        <ProtectedRoute>
                          <Casino />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="games/slots" 
                      element={
                        <ProtectedRoute>
                          <SlotGame />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="games/fortune-tiger" 
                      element={
                        <ProtectedRoute>
                          <FortuneTiger />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="games/blackjack" 
                      element={
                        <ProtectedRoute>
                          <BlackjackGame />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="games/roulette" 
                      element={
                        <ProtectedRoute>
                          <RouletteGame />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="profile" 
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="wallet" 
                      element={
                        <ProtectedRoute>
                          <Wallet />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="support" 
                      element={
                        <ProtectedRoute>
                          <Support />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="admin/*" 
                      element={
                        <ProtectedRoute adminOnly>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Router>
            </ChatProvider>
          </GameProvider>
        </BalanceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;