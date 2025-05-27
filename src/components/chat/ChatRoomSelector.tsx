import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const ChatRoomSelector: React.FC = () => {
  const { rooms, currentRoomId, joinRoom } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentRoom = rooms.find(room => room.id === currentRoomId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRoomChange = (roomId: string) => {
    joinRoom(roomId);
    setIsOpen(false);
  };

  // Group rooms by type
  const groupedRooms = {
    general: rooms.filter(room => room.type === 'general'),
    game: rooms.filter(room => room.type === 'game'),
    vip: rooms.filter(room => room.type === 'vip')
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 text-gray-300 hover:text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium truncate max-w-[120px]">
          {currentRoom?.name || 'Select Room'}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
          {Object.entries(groupedRooms).map(([type, roomList]) => 
            roomList.length > 0 && (
              <div key={type} className="px-1 py-1">
                <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase">
                  {type === 'general' ? 'General' : type === 'game' ? 'Game Rooms' : 'VIP'}
                </div>
                {roomList.map(room => (
                  <button
                    key={room.id}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                      room.id === currentRoomId
                        ? 'bg-purple-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => handleRoomChange(room.id)}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ChatRoomSelector;