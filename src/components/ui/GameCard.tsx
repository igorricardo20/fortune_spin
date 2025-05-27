import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, featured = false }) => {
  const navigate = useNavigate();
  
  // Determine game route based on the game name
  const getGameRoute = () => {
    if (game.name === 'Fortune Tiger') return '/games/fortune-tiger';
    if (game.name.toLowerCase().includes('blackjack')) return '/games/blackjack';
    if (game.name.toLowerCase().includes('roulette')) return '/games/roulette';
    if (game.type === 'slot') return '/games/slots';
    return `/games/${game.id}`;
  };

  const handlePlayClick = () => {
    navigate(getGameRoute());
  };

  return (
    <div 
      className={`relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105 ${
        featured ? 'aspect-[16/9]' : 'aspect-[3/4]'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={game.thumbnail} 
          alt={game.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
      </div>
      
      {/* Game Labels */}
      <div className="absolute top-2 left-2 flex space-x-2">
        {game.isNew && (
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
        {game.isHot && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <Star className="h-3 w-3 mr-1" fill="currentColor" /> HOT
          </span>
        )}
      </div>
      
      {/* Game Details */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-lg mb-1">{game.name}</h3>
        {featured && (
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{game.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="text-gray-300 text-xs">
            <span className="text-amber-400 font-medium">${game.minBet}</span> min bet
          </div>
          <button 
            onClick={handlePlayClick}
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-2 px-4 rounded-md flex items-center transition-colors"
          >
            <Play className="h-4 w-4 mr-1" fill="currentColor" />
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;