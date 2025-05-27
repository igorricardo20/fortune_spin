import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-8">Page Not Found</h2>
        <p className="text-gray-300 text-lg mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;