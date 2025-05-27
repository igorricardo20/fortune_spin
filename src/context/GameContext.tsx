import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Game, GameType, Bet } from '../types';

interface GameState {
  games: Game[];
  featuredGames: Game[];
  popularGames: Game[];
  newGames: Game[];
  recentBets: Bet[];
  currentGame: Game | null;
  isLoading: boolean;
  error: string | null;
}

interface GameContextType extends GameState {
  loadGames: () => Promise<void>;
  loadGameById: (id: string) => Promise<void>;
  placeBet: (gameId: string, amount: number) => Promise<boolean>;
  getRecentBets: () => Promise<void>;
}

// Mock game data
const mockGames: Game[] = [
  {
    id: '1',
    name: 'Fortune Tiger',
    type: GameType.SPECIAL,
    thumbnail: 'https://www.uai.com.br/apostas/static/wp/imagem-fortune-tiger.webp', // Tiger themed
    description: 'The popular Fortune Tiger game with exciting bonus features!',
    minBet: 1,
    maxBet: 100,
    popularity: 95,
    isNew: false,
    isHot: true
  },
  {
    id: '2',
    name: 'Golden Slots',
    type: GameType.SLOT,
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=compress&w=600&q=80', // Slot machine
    description: 'Classic slot machine with multiple paylines and free spins.',
    minBet: 0.5,
    maxBet: 50,
    popularity: 85,
    isNew: false,
    isHot: false
  },
  {
    id: '3',
    name: 'Royal Blackjack',
    type: GameType.CARD,
    thumbnail: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=compress&w=600&q=80', // Blackjack cards
    description: 'Play against the dealer in this classic card game.',
    minBet: 5,
    maxBet: 200,
    popularity: 80,
    isNew: false,
    isHot: false
  },
  {
    id: '4',
    name: 'European Roulette',
    type: GameType.TABLE,
    thumbnail: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=compress&w=600&q=80', // Roulette wheel
    description: 'The classic roulette game with European rules.',
    minBet: 1,
    maxBet: 500,
    popularity: 75,
    isNew: false,
    isHot: false
  },
  {
    id: '5',
    name: 'Live Dealer Poker',
    type: GameType.LIVE,
    thumbnail: 'https://www.egt.com/wp-content/uploads/2023/07/how-do-casinos-make-money-on-poker.jpeg', // Poker table
    description: 'Play poker with live dealers and other players in real-time.',
    minBet: 10,
    maxBet: 1000,
    popularity: 90,
    isNew: true,
    isHot: true
  },
  {
    id: '6',
    name: 'Mega Jackpot',
    type: GameType.SLOT,
    thumbnail: 'https://static.vecteezy.com/system/resources/previews/036/179/221/non_2x/jackpot-banner-with-falling-gold-coins-and-confetti-casino-or-lottery-advertising-prize-in-gambling-game-vector.jpg', // Jackpot slot
    description: 'Progressive jackpot slot with massive payouts!',
    minBet: 2,
    maxBet: 100,
    popularity: 88,
    isNew: true,
    isHot: false
  }
];

const initialState: GameState = {
  games: [],
  featuredGames: [],
  popularGames: [],
  newGames: [],
  recentBets: [],
  currentGame: null,
  isLoading: false,
  error: null
};

type GameAction =
  | { type: 'LOAD_GAMES_SUCCESS'; payload: Game[] }
  | { type: 'LOAD_GAME_BY_ID_SUCCESS'; payload: Game }
  | { type: 'PLACE_BET_SUCCESS'; payload: Bet }
  | { type: 'GET_RECENT_BETS_SUCCESS'; payload: Bet[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'LOAD_GAMES_SUCCESS':
      return {
        ...state,
        games: action.payload,
        featuredGames: action.payload.filter(game => game.isHot || game.isNew).slice(0, 3),
        popularGames: [...action.payload].sort((a, b) => b.popularity - a.popularity).slice(0, 4),
        newGames: action.payload.filter(game => game.isNew),
        isLoading: false,
        error: null
      };
    case 'LOAD_GAME_BY_ID_SUCCESS':
      return {
        ...state,
        currentGame: action.payload,
        isLoading: false,
        error: null
      };
    case 'PLACE_BET_SUCCESS':
      return {
        ...state,
        recentBets: [action.payload, ...state.recentBets],
        isLoading: false,
        error: null
      };
    case 'GET_RECENT_BETS_SUCCESS':
      return {
        ...state,
        recentBets: action.payload,
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

const GameContext = createContext<GameContextType>({
  ...initialState,
  loadGames: async () => {},
  loadGameById: async () => {},
  placeBet: async () => false,
  getRecentBets: async () => {}
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load games when the provider mounts
  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'LOAD_GAMES_SUCCESS', payload: mockGames });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load games'
      });
    }
  };

  const loadGameById = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const game = mockGames.find(g => g.id === id);
      
      if (game) {
        dispatch({ type: 'LOAD_GAME_BY_ID_SUCCESS', payload: game });
      } else {
        throw new Error('Game not found');
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load game'
      });
    }
  };

  const placeBet = async (gameId: string, amount: number): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call and game outcome calculation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Random outcome (win or loss)
      const isWin = Math.random() > 0.6; // 40% chance to win
      const winMultiplier = isWin ? (Math.random() * 3 + 1) : 0; // Random multiplier between 1 and 4
      const winAmount = amount * winMultiplier;
      
      const bet: Bet = {
        id: Math.random().toString(36).substring(2, 9),
        userId: 'user123', // In a real app, this would be the current user's ID
        gameId,
        amount,
        outcome: isWin ? 'win' : 'loss',
        winAmount,
        createdAt: new Date().toISOString()
      };
      
      dispatch({ type: 'PLACE_BET_SUCCESS', payload: bet });
      
      return isWin;
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to place bet'
      });
      return false;
    }
  };

  const getRecentBets = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock recent bets
      const mockBets: Bet[] = [
        {
          id: '1',
          userId: 'user123',
          gameId: '1',
          amount: 20,
          outcome: 'win',
          winAmount: 60,
          createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        },
        {
          id: '2',
          userId: 'user123',
          gameId: '3',
          amount: 50,
          outcome: 'loss',
          winAmount: 0,
          createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
        },
        {
          id: '3',
          userId: 'user123',
          gameId: '2',
          amount: 10,
          outcome: 'win',
          winAmount: 25,
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        }
      ];
      
      dispatch({ type: 'GET_RECENT_BETS_SUCCESS', payload: mockBets });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to get recent bets'
      });
    }
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        loadGames,
        loadGameById,
        placeBet,
        getRecentBets
      }}
    >
      {children}
    </GameContext.Provider>
  );
};