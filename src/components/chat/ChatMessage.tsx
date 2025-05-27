import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuth();
  const isCurrentUser = user?.id === message.userId;

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-xs md:max-w-sm ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-600">
            {message.avatar ? (
              <img src={message.avatar} alt={message.username} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                {message.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        
        <div className={`mx-2 ${isCurrentUser ? 'text-right' : ''}`}>
          <div className="flex items-baseline space-x-1">
            <span className="font-medium text-xs text-purple-400">{message.username}</span>
            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          </div>
          <div className={`mt-1 text-sm px-3 py-2 rounded-lg ${
            isCurrentUser 
              ? 'bg-purple-700 text-white'
              : 'bg-gray-700 text-gray-200'
          }`}>
            {message.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;