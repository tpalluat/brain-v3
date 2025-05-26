import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Brain, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PersonalityResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  if (!analysis) {
    return <Navigate to="/personality-test" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 rounded-xl p-8 md:p-12">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/app')}
              className="mr-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400" />
            </button>
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-purple-500 mr-3" />
              <h1 className="text-2xl font-bold text-white">Votre profil psychologique</h1>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-700/50 rounded-lg p-6 mb-8">
              <p className="text-gray-300 italic">
                "Basé sur vos réponses, l'IA a généré cette analyse personnalisée de votre profil."
              </p>
            </div>

            <div className="space-y-4 text-gray-300">
              {analysis.split('\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <button
              onClick={() => navigate('/app')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Retourner à mon cerveau digital
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}