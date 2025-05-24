import React from 'react';
import { PieChart, BarChart2, BarChart, BrainCircuit } from 'lucide-react';

const PersonalityPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Ma Personnalité</h1>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-center mb-4">
          <BrainCircuit className="w-6 h-6 text-purple-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">Profil Cognitif</h2>
        </div>
        <p className="text-gray-300 mb-6">
          Cette section utilise l'IA pour analyser vos données d'apprentissage et vos objectifs afin de générer un profil cognitif unique. Plus vous ajoutez de contenu à votre cerveau digital, plus cette analyse sera précise.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <PieChart className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Type de personnalité</h3>
            </div>
            <div className="flex justify-center items-center h-40 border border-gray-600 rounded-lg">
              <p className="text-gray-400 text-center">Ajoutez plus de données pour débloquer cette analyse</p>
            </div>
            <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Passer un test
            </button>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <BarChart2 className="w-5 h-5 text-green-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Points forts</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Analyse</span>
                  <span className="text-gray-400">65%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Créativité</span>
                  <span className="text-gray-400">45%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Organisation</span>
                  <span className="text-gray-400">80%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <BarChart className="w-6 h-6 text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">Statistiques d'apprentissage</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Apprentissages</p>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Objectifs</p>
            <p className="text-2xl font-bold text-white">2</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Complétés</p>
            <p className="text-2xl font-bold text-white">1</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">En cours</p>
            <p className="text-2xl font-bold text-white">4</p>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-5">
          <h3 className="text-lg font-medium text-white mb-4">Centres d'intérêt</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              Self-improvement
            </span>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Langues
            </span>
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
              Technologie
            </span>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
              Fitness
            </span>
            <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm">
              + Ajouter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityPage;