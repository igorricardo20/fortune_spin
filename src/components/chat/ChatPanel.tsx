import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import ChatMessage from './ChatMessage';
import ChatRoomSelector from './ChatRoomSelector';

const ChatPanel: React.FC = () => {
  const { messages, currentRoomId, sendMessage, rooms } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentRoom = rooms.find(room => room.id === currentRoomId);

  // Always scroll to bottom on new messages, but only auto-scroll if user is near the bottom
  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;
    // Always scroll to bottom if a new message arrives
    if (isNearBottom || messages[currentRoomId]?.length === 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages[currentRoomId]?.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-700 p-3 flex items-center justify-between">
        <h3 className="font-medium text-lg text-white">
          {currentRoom ? currentRoom.name : 'Chat'}
        </h3>
        <ChatRoomSelector />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages[currentRoomId] && messages[currentRoomId].length > 0 ? (
          messages[currentRoomId].map(message => (
            <ChatMessage key={message.id} message={message} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;