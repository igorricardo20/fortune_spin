import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useGame } from '../context/GameContext';
import GameGrid from '../components/ui/GameGrid';
import FeaturedGames from '../components/ui/FeaturedGames';
import { GameType } from '../types';

const Casino: React.FC = () => {
  const { games, featuredGames, newGames, popularGames } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<GameType[]>([]);
  const [filteredGames, setFilteredGames] = useState(games);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter games based on search and type
  useEffect(() => {
    let result = games;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(game => game.name.toLowerCase().includes(query));
    }
    
    // Apply type filter
    if (selectedTypes.length > 0) {
      result = result.filter(game => selectedTypes.includes(game.type));
    }
    
    setFilteredGames(result);
  }, [games, searchQuery, selectedTypes]);

  // Toggle game type filter
  const toggleTypeFilter = (type: GameType) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Casino Games</h1>
        <p className="text-gray-400 mt-2">Explore our wide selection of games</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-gray-700 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            
            {(searchQuery || selectedTypes.length > 0) && (
              <button 
                onClick={clearFilters}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* Filter options */}
        {isFilterOpen && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => toggleTypeFilter(GameType.SLOT)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTypes.includes(GameType.SLOT)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Slots
            </button>
            <button
              onClick={() => toggleTypeFilter(GameType.CARD)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTypes.includes(GameType.CARD)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Card Games
            </button>
            <button
              onClick={() => toggleTypeFilter(GameType.TABLE)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTypes.includes(GameType.TABLE)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Table Games
            </button>
            <button
              onClick={() => toggleTypeFilter(GameType.LIVE)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTypes.includes(GameType.LIVE)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Live Casino
            </button>
            <button
              onClick={() => toggleTypeFilter(GameType.SPECIAL)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTypes.includes(GameType.SPECIAL)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Special Games
            </button>
          </div>
        )}
      </div>
      
      {/* Featured Games */}
      {!searchQuery && selectedTypes.length === 0 && featuredGames.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-white">Featured Games</h2>
          <FeaturedGames games={featuredGames} />
        </>
      )}
      
      {/* Game Grids */}
      {searchQuery || selectedTypes.length > 0 ? (
        <GameGrid 
          games={filteredGames} 
          title="Search Results" 
          subtitle={`Found ${filteredGames.length} games`} 
        />
      ) : (
        <>
          {popularGames.length > 0 && (
            <GameGrid 
              games={popularGames} 
              title="Popular Games" 
              subtitle="Most played games right now" 
            />
          )}
          
          {newGames.length > 0 && (
            <GameGrid 
              games={newGames} 
              title="New Games" 
              subtitle="Latest additions to our collection" 
            />
          )}
          
          <GameGrid 
            games={games.filter(game => game.type === GameType.SLOT).slice(0, 5)} 
            title="Slots" 
            subtitle="Classic and video slots with exciting features" 
          />
          
          <GameGrid 
            games={games.filter(game => game.type === GameType.TABLE || game.type === GameType.CARD).slice(0, 5)} 
            title="Table Games" 
            subtitle="Classic casino table and card games" 
          />
        </>
      )}
      
      {/* No Results */}
      {searchQuery && filteredGames.length === 0 && (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400">No games found matching your search.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 text-purple-500 hover:text-purple-400"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Casino;