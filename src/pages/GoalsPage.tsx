import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  ChevronDown, ChevronUp, Plus, X, Calendar, ArrowUpRight, 
  Calendar as CalendarIcon, Target, Sparkles 
} from 'lucide-react';
import { Goal } from '../types';
import { suggestSubGoals } from '../data/mockData';

const GoalsPage: React.FC = () => {
  const { goals, addGoal, updateGoalProgress } = useApp();
  const [expandedGoals, setExpandedGoals] = useState<string[]>([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    timeframe: 'monthly' as Goal['timeframe'],
    status: 'not-started' as Goal['status'],
    progress: 0,
  });
  const [showingSuggestions, setShowingSuggestions] = useState(false);
  const [suggestedGoals, setSuggestedGoals] = useState<Goal[]>([]);

  const toggleExpand = (goalId: string) => {
    setExpandedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId) 
        : [...prev, goalId]
    );
  };

  const handleAddGoal = () => {
    if (!newGoal.title) return;
    
    addGoal({
      title: newGoal.title,
      description: newGoal.description,
      timeframe: newGoal.timeframe,
      status: 'not-started',
      progress: 0,
    });
    
    setNewGoal({
      title: '',
      description: '',
      timeframe: 'monthly',
      status: 'not-started',
      progress: 0,
    });
    setIsAddingGoal(false);
  };

  const handleShowSuggestions = (goalTitle: string) => {
    const suggestions = suggestSubGoals(goalTitle);
    setSuggestedGoals(suggestions);
    setShowingSuggestions(true);
  };

  const getTimeframeLabel = (timeframe: Goal['timeframe']) => {
    switch (timeframe) {
      case 'long-term': return 'Long terme';
      case 'yearly': return 'Annuel';
      case 'monthly': return 'Mensuel';
      case 'weekly': return 'Hebdomadaire';
      case 'daily': return 'Journalier';
    }
  };

  const getTimeframeIcon = (timeframe: Goal['timeframe']) => {
    switch (timeframe) {
      case 'long-term': return <ArrowUpRight className="w-4 h-4" />;
      case 'yearly': return <Calendar className="w-4 h-4" />;
      case 'monthly': return <CalendarIcon className="w-4 h-4" />;
      case 'weekly': return <CalendarIcon className="w-4 h-4" />;
      case 'daily': return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const renderGoal = (goal: Goal, level: number = 0) => {
    const isExpanded = expandedGoals.includes(goal.id);
    
    return (
      <div key={goal.id} className={`mb-4 ${level > 0 ? 'ml-6' : ''}`}>
        <div className={`bg-gray-800 rounded-xl overflow-hidden`}>
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-blue-500/20 text-blue-400`}>
                  <Target className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    goal.timeframe === 'long-term' ? 'bg-purple-500/20 text-purple-400' :
                    goal.timeframe === 'yearly' ? 'bg-blue-500/20 text-blue-400' :
                    goal.timeframe === 'monthly' ? 'bg-green-500/20 text-green-400' :
                    goal.timeframe === 'weekly' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {getTimeframeIcon(goal.timeframe)}
                    <span className="ml-1">{getTimeframeLabel(goal.timeframe)}</span>
                  </span>
                </div>
              </div>
              {goal.subGoals.length > 0 && (
                <button 
                  onClick={() => toggleExpand(goal.id)}
                  className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{goal.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{goal.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progression</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                goal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                goal.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {goal.status === 'completed' ? 'Terminé' : 
                 goal.status === 'in-progress' ? 'En cours' : 
                 'Non démarré'}
              </span>
              
              <div className="flex space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                  className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                {goal.subGoals.length === 0 && (
                  <button
                    onClick={() => handleShowSuggestions(goal.title)}
                    className="p-1 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                    title="Obtenir des suggestions"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {isExpanded && goal.subGoals.length > 0 && (
            <div className="border-t border-gray-700 p-4">
              <div className="space-y-4">
                {goal.subGoals.map(subGoal => renderGoal(subGoal, level + 1))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Mes Objectifs</h1>
        <button
          onClick={() => setIsAddingGoal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </button>
      </div>
      
      {/* Goals List */}
      <div className="space-y-6">
        {goals.map(goal => renderGoal(goal))}
      </div>
      
      {/* Add Goal Modal */}
      {isAddingGoal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setIsAddingGoal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-6">Ajouter un objectif</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Titre de l'objectif"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                <textarea
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
                  placeholder="Description de l'objectif"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Période</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewGoal({ ...newGoal, timeframe: 'long-term' })}
                    className={`flex items-center justify-center p-2 rounded-lg text-sm ${
                      newGoal.timeframe === 'long-term' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    Long terme
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGoal({ ...newGoal, timeframe: 'yearly' })}
                    className={`flex items-center justify-center p-2 rounded-lg text-sm ${
                      newGoal.timeframe === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Annuel
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGoal({ ...newGoal, timeframe: 'monthly' })}
                    className={`flex items-center justify-center p-2 rounded-lg text-sm ${
                      newGoal.timeframe === 'monthly' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Mensuel
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGoal({ ...newGoal, timeframe: 'weekly' })}
                    className={`flex items-center justify-center p-2 rounded-lg text-sm ${
                      newGoal.timeframe === 'weekly' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Hebdomadaire
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddGoal}
                disabled={!newGoal.title}
                className={`w-full py-3 rounded-lg text-white font-medium mt-2 ${
                  newGoal.title ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Suggestions Modal */}
      {showingSuggestions && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowingSuggestions(false)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center mb-6">
              <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
              <h2 className="text-xl font-bold text-white">Suggestions d'objectifs</h2>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              L'IA vous suggère ces sous-objectifs pour vous aider à atteindre votre but.
            </p>
            
            <div className="space-y-3 mb-6">
              {suggestedGoals.map((goal, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-1">{goal.title}</h3>
                  <p className="text-gray-400 text-sm">{goal.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">{getTimeframeLabel(goal.timeframe)}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowingSuggestions(false)}
              className="w-full py-3 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;