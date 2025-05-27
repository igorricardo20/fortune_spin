import React from 'react';

const SlotGame = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Slot Machine</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Slot machine display will be implemented here */}
          <div className="bg-gray-100 p-8 rounded-lg w-full max-w-2xl">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-white rounded-lg shadow-inner flex items-center justify-center text-4xl font-bold"
                >
                  ?
                </div>
              ))}
            </div>
            
            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <button 
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                onClick={() => {
                  // Spin logic will be implemented here
                  console.log('Spin!');
                }}
              >
                SPIN
              </button>
            </div>
          </div>

          {/* Bet controls */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">-</button>
            <span className="text-xl font-semibold">Bet: 1.00</span>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotGame;