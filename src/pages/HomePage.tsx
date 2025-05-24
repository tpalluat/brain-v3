import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Brain className="h-16 w-16 text-blue-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">
          Bienvenue sur BRAIN
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Votre cerveau digital personnel
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/signup')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            S'inscrire
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}