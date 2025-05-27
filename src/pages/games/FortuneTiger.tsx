import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Zap, Award, DollarSign, RotateCcw } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useBalance } from '../../context/BalanceContext';
import { useAuth } from '../../context/AuthContext';

const FortuneTiger: React.FC = () => {
  const { placeBet } = useGame();
  const { updateBalance } = useBalance();
  const { user } = useAuth();
  
  const [betAmount, setBetAmount] = useState(5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'loss' | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [reels, setReels] = useState([0, 0, 0]);
  const [showPaytable, setShowPaytable] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  
  const symbols = [
    '/tiger.png', // Using placeholders - in a real app, these would be actual image paths
    '/coin.png',
    '/gem.png',
    '/bonus.png',
    '/wild.png',
  ];
  
  // Simulate symbols by using colored blocks
  const symbolColors = [
    'bg-amber-500', // Tiger (amber)
    'bg-yellow-400', // Coin (yellow)
    'bg-blue-500',   // Gem (blue)
    'bg-purple-500', // Bonus (purple)
    'bg-red-500',    // Wild (red)
  ];

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus();
    }
  }, []);

  const handleBetChange = (amount: number) => {
    if (!isSpinning) {
      setBetAmount(Math.max(1, Math.min(100, amount)));
    }
  };

  const handleSpin = async () => {
    if (isSpinning || !user) return;
    
    if (user.balance < betAmount) {
      alert('Insufficient balance to place this bet.');
      return;
    }
    
    setIsSpinning(true);
    setGameResult(null);
    
    // Update UI immediately to show the bet is placed
    updateBalance(betAmount, 'bet');
    
    // Animate the reels
    const spinDuration = 2000; // 2 seconds
    const intervals = [10, 15, 20]; // Different speeds for each reel
    const finalReels: number[] = [];
    
    // Start spinning animation
    const spinAnimations = [0, 1, 2].map((reelIndex) => {
      return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          setReels(prevReels => {
            const newReels = [...prevReels];
            newReels[reelIndex] = Math.floor(Math.random() * symbols.length);
            return newReels;
          });
        }, intervals[reelIndex]);
        
        // Stop each reel after a staggered delay
        setTimeout(() => {
          clearInterval(interval);
          
          // Determine the final symbol for this reel
          const finalSymbol = Math.floor(Math.random() * symbols.length);
          finalReels[reelIndex] = finalSymbol;
          
          setReels(prevReels => {
            const newReels = [...prevReels];
            newReels[reelIndex] = finalSymbol;
            return newReels;
          });
          
          resolve();
        }, spinDuration + (reelIndex * 300)); // Stagger the stopping of reels
      });
    });
    
    // Wait for all animations to complete
    await Promise.all(spinAnimations);
    
    // Determine game outcome using our backend logic
    const isWin = await placeBet('1', betAmount); // '1' is the Fortune Tiger game ID
    
    // In a real game, we would calculate the win based on the symbols that landed
    // For this demo, we'll use a random multiplier
    let multiplier = 0;
    
    if (isWin) {
      // Check if all symbols are the same (big win)
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        multiplier = 5; // 5x bet for three of a kind
      } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
        multiplier = 2; // 2x bet for two of a kind
      } else {
        multiplier = 1.5; // 1.5x bet for other winning combinations
      }
      
      const win = betAmount * multiplier;
      setWinAmount(win);
      setGameResult('win');
      
      // Update balance with win
      updateBalance(win, 'win');
    } else {
      setWinAmount(0);
      setGameResult('loss');
    }
    
    setIsSpinning(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSpin();
    }
  };

  return (
    <div 
      ref={gameRef}
      tabIndex={0} 
      onKeyDown={handleKeyDown}
      className="flex flex-col h-full focus:outline-none"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Game Panel */}
        <div className="flex-1 bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-800 to-amber-600 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Fortune Tiger</h1>
            <button
              onClick={() => setShowPaytable(!showPaytable)}
              className="text-white hover:text-amber-200 flex items-center"
            >
              <Award className="h-5 w-5 mr-1" />
              <span>Paytable</span>
            </button>
          </div>
          
          {/* Paytable */}
          {showPaytable && (
            <div className="bg-gray-900 p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Paytable</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className={`h-6 w-6 ${symbolColors[0]} rounded`}></div>
                    <div className={`h-6 w-6 ${symbolColors[0]} rounded`}></div>
                    <div className={`h-6 w-6 ${symbolColors[0]} rounded`}></div>
                  </div>
                  <span className="ml-3 text-white">5x your bet</span>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className={`h-6 w-6 ${symbolColors[1]} rounded`}></div>
                    <div className={`h-6 w-6 ${symbolColors[1]} rounded`}></div>
                    <div className={`h-6 w-6 ${symbolColors[1]} rounded`}></div>
                  </div>
                  <span className="ml-3 text-white">4x your bet</span>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className={`h-6 w-6 ${symbolColors[0]} rounded`}></div>
                    <div className={`h-6 w-6 ${symbolColors[0]} rounded`}></div>
                    <div className={`h-6 w-6 any rounded bg-gray-600`}></div>
                  </div>
                  <span className="ml-3 text-white">2x your bet</span>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className={`h-6 w-6 ${symbolColors[4]} rounded`}></div>
                    <div className={`h-6 w-6 any rounded bg-gray-600`}></div>
                    <div className={`h-6 w-6 any rounded bg-gray-600`}></div>
                  </div>
                  <span className="ml-3 text-white">1.5x your bet</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Game Display */}
          <div className="p-6">
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-gray-400 text-sm">Bet Amount</span>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => handleBetChange(betAmount - 1)}
                      disabled={isSpinning || betAmount <= 1}
                      className="bg-gray-700 hover:bg-gray-600 text-white rounded-l-md p-2 disabled:opacity-50"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </button>
                    <div className="bg-gray-700 px-4 py-2 text-white font-medium">
                      ${betAmount.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleBetChange(betAmount + 1)}
                      disabled={isSpinning || betAmount >= 100 || (user && betAmount >= user.balance)}
                      className="bg-gray-700 hover:bg-gray-600 text-white rounded-r-md p-2 disabled:opacity-50"
                    >
                      <ChevronUp className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Balance</span>
                  <div className="text-white font-medium mt-1">${user?.balance.toFixed(2) || '0.00'}</div>
                </div>
              </div>
              
              {/* Reels */}
              <div className="grid grid-cols-3 gap-2 bg-gray-800 p-4 rounded-lg mb-4">
                {reels.map((symbolIndex, index) => (
                  <div
                    key={index}
                    className={`aspect-square flex items-center justify-center rounded-md border-2 border-amber-500 ${symbolColors[symbolIndex]} ${
                      isSpinning ? 'animate-pulse' : ''
                    }`}
                  >
                    <span className="text-4xl">
                      {/* In a real app, this would be an image */}
                      {/* <img src={symbols[symbolIndex]} alt="Symbol" /> */}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Game Result */}
              {gameResult && (
                <div className={`text-center p-3 rounded-md mb-4 ${
                  gameResult === 'win' 
                    ? 'bg-green-900 text-green-300'
                    : 'bg-red-900 text-red-300'
                }`}>
                  {gameResult === 'win' ? (
                    <div className="flex items-center justify-center">
                      <Award className="h-5 w-5 mr-2" />
                      <span>You won ${winAmount.toFixed(2)}!</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      <span>Better luck next time!</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Spin Button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning || (user && user.balance < betAmount)}
                className={`w-full py-3 rounded-md font-bold text-center transition-colors ${
                  isSpinning
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white'
                }`}
              >
                {isSpinning ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    <span>Spinning...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Zap className="h-5 w-5 mr-2" />
                    <span>Spin</span>
                  </div>
                )}
              </button>
            </div>
            
            <div className="text-gray-400 text-sm text-center">
              <p>Press Space or Enter to spin. Good luck!</p>
            </div>
          </div>
        </div>
        
        {/* Side Panel */}
        <div className="lg:w-80 bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-800 to-amber-600 p-4">
            <h2 className="text-xl font-bold text-white">Game Info</h2>
          </div>
          
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-2">About Fortune Tiger</h3>
              <p className="text-gray-400 text-sm">
                Fortune Tiger is an exciting slot game inspired by Asian mythology. 
                Match symbols across the reels to win big! The Tiger symbol is the most valuable, 
                and matching three of them gives you 5x your bet.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-2">Features</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-start">
                  <span className="bg-amber-500 h-2 w-2 rounded-full mt-1.5 mr-2"></span>
                  <span>Tiger symbols pay the highest rewards</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500 h-2 w-2 rounded-full mt-1.5 mr-2"></span>
                  <span>Wild symbols substitute for any other symbol</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500 h-2 w-2 rounded-full mt-1.5 mr-2"></span>
                  <span>Bonus symbols trigger free spins</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500 h-2 w-2 rounded-full mt-1.5 mr-2"></span>
                  <span>Match 3 of any symbol for bigger wins</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Quick Bets</h3>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 25, 50, 75, 100].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleBetChange(amount)}
                    disabled={isSpinning || (user && amount > user.balance)}
                    className={`py-2 rounded-md text-center transition-colors ${
                      betAmount === amount
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    } ${isSpinning || (user && amount > user.balance) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortuneTiger;