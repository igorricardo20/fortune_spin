import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { ChatMessage, ChatRoom } from '../types';
import { useAuth } from './AuthContext';

interface ChatState {
  messages: Record<string, ChatMessage[]>;
  rooms: ChatRoom[];
  currentRoomId: string;
  isLoading: boolean;
  error: string | null;
}

interface ChatContextType extends ChatState {
  sendMessage: (message: string) => void;
  joinRoom: (roomId: string) => void;
  getRooms: () => Promise<void>;
}

// Mock chat rooms
const mockRooms: ChatRoom[] = [
  {
    id: 'general',
    name: 'General Chat',
    type: 'general'
  },
  {
    id: 'vip',
    name: 'VIP Lounge',
    type: 'vip'
  },
  {
    id: 'game-slots',
    name: 'Slots Chat',
    type: 'game',
    gameId: '2'
  },
  {
    id: 'game-fortune-tiger',
    name: 'Fortune Tiger Chat',
    type: 'game',
    gameId: '1'
  }
];

// Mock messages for each room
const generateMockMessages = (roomId: string): ChatMessage[] => {
  const usernames = ['Player1', 'LuckyGamer', 'BetMaster', 'SlotKing', 'CasinoQueen'];
  const messages = [
    'Just won big on Fortune Tiger!',
    'Anyone having luck with the slots today?',
    'This game is on fire! 🔥',
    'What\'s the minimum bet for blackjack?',
    'The live dealers are really professional.',
    'Has anyone tried the new poker room?',
    'I\'m on a winning streak!',
    'Good luck everyone!',
    'What\'s your favorite game here?',
    'The chat feature is so cool, nice to meet you all!'
  ];
  
  return Array(10).fill(null).map((_, index) => ({
    id: `${roomId}-${index}`,
    userId: `user-${index % 5}`,
    username: usernames[index % 5],
    avatar: `https://i.pravatar.cc/150?u=${index}`,
    message: messages[index],
    timestamp: new Date(Date.now() - (index * 180000)).toISOString(), // messages every 3 minutes
    roomId
  }));
};

const initialState: ChatState = {
  messages: {},
  rooms: [],
  currentRoomId: 'general',
  isLoading: false,
  error: null
};

type ChatAction =
  | { type: 'LOAD_ROOMS_SUCCESS'; payload: ChatRoom[] }
  | { type: 'LOAD_MESSAGES_SUCCESS'; payload: { roomId: string; messages: ChatMessage[] } }
  | { type: 'SEND_MESSAGE_SUCCESS'; payload: ChatMessage }
  | { type: 'JOIN_ROOM'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'LOAD_ROOMS_SUCCESS':
      return {
        ...state,
        rooms: action.payload,
        isLoading: false,
        error: null
      };
    case 'LOAD_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: action.payload.messages
        },
        isLoading: false,
        error: null
      };
    case 'SEND_MESSAGE_SUCCESS':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            action.payload,
            ...(state.messages[action.payload.roomId] || [])
          ]
        },
        isLoading: false,
        error: null
      };
    case 'JOIN_ROOM':
      return {
        ...state,
        currentRoomId: action.payload
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

const ChatContext = createContext<ChatContextType>({
  ...initialState,
  sendMessage: () => {},
  joinRoom: () => {},
  getRooms: async () => {}
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { user } = useAuth();
  
  // In a real app, this would be a WebSocket connection
  const wsRef = useRef<any>(null);
  
  // Load chat rooms when the provider mounts
  useEffect(() => {
    getRooms();
  }, []);
  
  // Load messages for the current room whenever it changes
  useEffect(() => {
    if (state.currentRoomId) {
      loadMessagesForRoom(state.currentRoomId);
    }
  }, [state.currentRoomId]);
  
  // Simulate receiving new messages every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of a new message
        const randomUser = Math.floor(Math.random() * 5);
        const randomMessageIndex = Math.floor(Math.random() * 10);
        const mockMessages = [
          'Just hit a big win!',
          'This game is so addictive',
          'Anyone else having good luck today?',
          'The new bonus feature is awesome',
          'I love this casino!',
          'What games are hot right now?',
          'Just deposited, time to play',
          'The graphics on these games are amazing',
          'Good luck everyone!',
          'Has anyone tried the new slots?'
        ];
        
        const newMessage: ChatMessage = {
          id: `auto-${Date.now()}`,
          userId: `user-${randomUser}`,
          username: ['Player1', 'LuckyGamer', 'BetMaster', 'SlotKing', 'CasinoQueen'][randomUser],
          avatar: `https://i.pravatar.cc/150?u=${randomUser}`,
          message: mockMessages[randomMessageIndex],
          timestamp: new Date().toISOString(),
          roomId: state.currentRoomId
        };
        
        dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: newMessage });
      }
    }, 15000); // Every 15 seconds
    
    return () => clearInterval(interval);
  }, [state.currentRoomId]);

  const getRooms = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      dispatch({ type: 'LOAD_ROOMS_SUCCESS', payload: mockRooms });
      
      // Load messages for the default room
      loadMessagesForRoom('general');
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load chat rooms'
      });
    }
  };

  const loadMessagesForRoom = async (roomId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate mock messages for this room
      const mockMessages = generateMockMessages(roomId);
      
      dispatch({ 
        type: 'LOAD_MESSAGES_SUCCESS', 
        payload: { roomId, messages: mockMessages }
      });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load messages'
      });
    }
  };

  const sendMessage = (message: string) => {
    if (!user || !message.trim()) return;
    
    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      roomId: state.currentRoomId
    };
    
    // In a real app, we'd send this to the server via WebSocket
    dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: newMessage });
  };

  const joinRoom = (roomId: string) => {
    dispatch({ type: 'JOIN_ROOM', payload: roomId });
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        sendMessage,
        joinRoom,
        getRooms
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};