import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GameCard from './GameCard';
import { Game } from '../../types';

interface FeaturedGamesProps {
  games: Game[];
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ games }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === games.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? games.length - 1 : prevIndex - 1));
  };

  if (games.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-8 overflow-hidden rounded-lg shadow-xl">
      <div className="absolute inset-0 z-10 flex items-center justify-between p-4">
        <button
          onClick={prevSlide}
          className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 focus:outline-none"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 focus:outline-none"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {games.map((game) => (
          <div key={game.id} className="w-full flex-shrink-0">
            <GameCard game={game} featured={true} />
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedGames;