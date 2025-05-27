import { Link } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <Frown className="w-20 h-20 text-amber-500 animate-bounce" />
        </div>
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-amber-500 mb-4 drop-shadow-lg">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-6">Oops! Page Not Found</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.<br />
          Please check the URL or return to the homepage.
        </p>
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:from-purple-700 hover:to-amber-600 transition-all font-semibold text-lg"
        >
          <Home className="w-5 h-5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;