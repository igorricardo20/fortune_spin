import React, { createContext, useContext, useReducer } from 'react';
import { useAuth } from './AuthContext';
import { Transaction, PaymentMethod } from '../types';

interface BalanceState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

interface BalanceContextType extends BalanceState {
  deposit: (amount: number, method: PaymentMethod) => Promise<void>;
  withdraw: (amount: number, method: PaymentMethod) => Promise<void>;
  updateBalance: (amount: number, type: 'bet' | 'win') => void;
  getTransactions: () => Promise<void>;
}

const initialState: BalanceState = {
  transactions: [],
  isLoading: false,
  error: null
};

type BalanceAction =
  | { type: 'DEPOSIT_SUCCESS'; payload: Transaction }
  | { type: 'WITHDRAW_SUCCESS'; payload: Transaction }
  | { type: 'UPDATE_BALANCE'; payload: Transaction }
  | { type: 'GET_TRANSACTIONS_SUCCESS'; payload: Transaction[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const balanceReducer = (state: BalanceState, action: BalanceAction): BalanceState => {
  switch (action.type) {
    case 'DEPOSIT_SUCCESS':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        isLoading: false,
        error: null
      };
    case 'WITHDRAW_SUCCESS':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        isLoading: false,
        error: null
      };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        isLoading: false,
        error: null
      };
    case 'GET_TRANSACTIONS_SUCCESS':
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

const BalanceContext = createContext<BalanceContextType>({
  ...initialState,
  deposit: async () => {},
  withdraw: async () => {},
  updateBalance: () => {},
  getTransactions: async () => {}
});

export const useBalance = () => useContext(BalanceContext);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(balanceReducer, initialState);
  const { user, updateProfile } = useAuth();

  const deposit = async (amount: number, method: PaymentMethod) => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new transaction
      const transaction: Transaction = {
        id: Math.random().toString(36).substring(2, 9),
        userId: user.id,
        amount,
        type: 'deposit',
        status: 'completed',
        method,
        createdAt: new Date().toISOString()
      };
      
      // Update user balance
      updateProfile({ balance: user.balance + amount });
      
      dispatch({ type: 'DEPOSIT_SUCCESS', payload: transaction });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Deposit failed'
      });
    }
  };

  const withdraw = async (amount: number, method: PaymentMethod) => {
    if (!user || user.balance < amount) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Insufficient balance for withdrawal'
      });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new transaction
      const transaction: Transaction = {
        id: Math.random().toString(36).substring(2, 9),
        userId: user.id,
        amount,
        type: 'withdrawal',
        status: 'completed',
        method,
        createdAt: new Date().toISOString()
      };
      
      // Update user balance
      updateProfile({ balance: user.balance - amount });
      
      dispatch({ type: 'WITHDRAW_SUCCESS', payload: transaction });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Withdrawal failed'
      });
    }
  };

  const updateBalance = (amount: number, type: 'bet' | 'win') => {
    if (!user) return;

    const transaction: Transaction = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      amount,
      type: type === 'bet' ? 'bet' : 'win',
      status: 'completed',
      method: PaymentMethod.E_WALLET, // Default method for bets/wins
      createdAt: new Date().toISOString()
    };

    // Update user balance
    if (type === 'bet') {
      updateProfile({ balance: user.balance - amount });
    } else {
      updateProfile({ balance: user.balance + amount });
    }

    dispatch({ type: 'UPDATE_BALANCE', payload: transaction });
  };

  const getTransactions = async () => {
    if (!user) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll generate some mock transactions
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          userId: user.id,
          amount: 500,
          type: 'deposit',
          status: 'completed',
          method: PaymentMethod.CREDIT_CARD,
          createdAt: new Date(Date.now() - 86400000 * 10).toISOString() // 10 days ago
        },
        {
          id: '2',
          userId: user.id,
          amount: 200,
          type: 'bet',
          status: 'completed',
          method: PaymentMethod.E_WALLET,
          createdAt: new Date(Date.now() - 86400000 * 9).toISOString() // 9 days ago
        },
        {
          id: '3',
          userId: user.id,
          amount: 300,
          type: 'win',
          status: 'completed',
          method: PaymentMethod.E_WALLET,
          createdAt: new Date(Date.now() - 86400000 * 8).toISOString() // 8 days ago
        },
        {
          id: '4',
          userId: user.id,
          amount: 100,
          type: 'bet',
          status: 'completed',
          method: PaymentMethod.E_WALLET,
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString() // 7 days ago
        },
        {
          id: '5',
          userId: user.id,
          amount: 150,
          type: 'win',
          status: 'completed',
          method: PaymentMethod.E_WALLET,
          createdAt: new Date(Date.now() - 86400000 * 6).toISOString() // 6 days ago
        },
        {
          id: '6',
          userId: user.id,
          amount: 50,
          type: 'withdrawal',
          status: 'completed',
          method: PaymentMethod.BANK_TRANSFER,
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
        },
        {
          id: '7',
          userId: user.id,
          amount: 400,
          type: 'deposit',
          status: 'completed',
          method: PaymentMethod.CREDIT_CARD,
          createdAt: new Date(Date.now() - 86400000 * 4).toISOString() // 4 days ago
        },
        {
          id: '8',
          userId: user.id,
          amount: 120,
          type: 'bet',
          status: 'completed',
          method: PaymentMethod.E_WALLET,
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString() // 3 days ago
        },
        {
          id: '9',
          userId: user.id,
          amount: 180,
          type: 'win',
          status: 'completed',
          method: PaymentMethod.E_WALLET,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
        },
        {
          id: '10',
          userId: user.id,
          amount: 60,
          type: 'bet',
          status: 'completed',
          method: PaymentMethod.E_WALLET,
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: '11',
          userId: user.id,
          amount: 250,
          type: 'win',
          status: 'completed',
          method: PaymentMethod.E_WALLET,
          createdAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
        }
      ];
      
      dispatch({ type: 'GET_TRANSACTIONS_SUCCESS', payload: mockTransactions });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to get transactions'
      });
    }
  };

  return (
    <BalanceContext.Provider
      value={{
        ...state,
        deposit,
        withdraw,
        updateBalance,
        getTransactions
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};