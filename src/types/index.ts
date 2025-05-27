// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  avatar?: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Game related types
export interface Game {
  id: string;
  name: string;
  type: GameType;
  thumbnail: string;
  description: string;
  minBet: number;
  maxBet: number;
  popularity: number;
  isNew: boolean;
  isHot: boolean;
}

export enum GameType {
  SLOT = 'slot',
  TABLE = 'table',
  CARD = 'card',
  LIVE = 'live',
  SPECIAL = 'special'
}

export interface Bet {
  id: string;
  userId: string;
  gameId: string;
  amount: number;
  outcome: 'win' | 'loss' | 'pending';
  winAmount: number;
  createdAt: string;
}

// Chat related types
export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  message: string;
  timestamp: string;
  roomId: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'general' | 'game' | 'vip';
  gameId?: string;
}

// Payment related types
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  status: 'pending' | 'completed' | 'failed';
  method: PaymentMethod;
  createdAt: string;
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  E_WALLET = 'e_wallet',
  CRYPTO = 'crypto'
}

// Theme related types
export interface ThemeSettings {
  mode: 'dark' | 'light';
  primaryColor: string;
  accentColor: string;
}

// Support related types
export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}