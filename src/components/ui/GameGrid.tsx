import React from 'react';
import GameCard from './GameCard';
import { Game } from '../../types';

interface GameGridProps {
  games: Game[];
  title?: string;
  subtitle?: string;
}

const GameGrid: React.FC<GameGridProps> = ({ games, title, subtitle }) => {
  if (games.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-400">No games available.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {title && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;