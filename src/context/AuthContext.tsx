import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '../types';

// Mock initial user data for demo purposes
const mockUser: User = {
  id: '1',
  username: 'player123',
  email: 'player@example.com',
  balance: 1000,
  avatar: 'https://i.pravatar.cc/150?u=player123',
  isAdmin: false,
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: Partial<User>) => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });

      // For demo purposes, we'll check if there's a stored user in localStorage
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        // In a real app, we'd validate the token with the backend
        dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(storedUser) });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // This would be an API call in a real application
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll use the mock user
      localStorage.setItem('user', JSON.stringify(mockUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed'
      });
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // This would be an API call in a real application
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Creating a new user based on the mock user
      const newUser = {
        ...mockUser,
        username,
        email,
        id: Math.random().toString(36).substring(2, 9)
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ 
        type: 'REGISTER_FAILURE', 
        payload: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_PROFILE', payload: userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};