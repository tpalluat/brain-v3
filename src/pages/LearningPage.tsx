import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Book, Film, Video, GraduationCap, Plus, X, Check } from 'lucide-react';
import { LearningItem } from '../types';
import { generateAISummary } from '../data/mockData';

const LearningPage: React.FC = () => {
  const { learningItems, addLearningItem, toggleLearningItemCompleted } = useApp();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    type: 'book' as LearningItem['type'],
    title: '',
    description: '',
    tags: '',
  });
  const [detailLevel, setDetailLevel] = useState<'concise' | 'detailed'>('concise');
  const [filter, setFilter] = useState<LearningItem['type'] | 'all'>('all');

  const handleAddItem = () => {
    if (!newItem.title) return;
    
    addLearningItem({
      type: newItem.type,
      title: newItem.title,
      description: newItem.description,
      tags: newItem.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      summary: generateAISummary(newItem.description, detailLevel),
      completed: false,
      aiGenerated: true,
    });
    
    setNewItem({
      type: 'book',
      title: '',
      description: '',
      tags: '',
    });
    setIsAddingItem(false);
  };

  const filteredItems = filter === 'all' 
    ? learningItems 
    : learningItems.filter(item => item.type === filter);

  const getTypeIcon = (type: LearningItem['type']) => {
    switch (type) {
      case 'book': return <Book className="w-5 h-5" />;
      case 'movie': return <Film className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'course': return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Mes Apprentissages</h1>
        <button
          onClick={() => setIsAddingItem(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setFilter('book')}
          className={`px-3 py-1 rounded-full text-sm flex items-center ${
            filter === 'book' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Book className="w-3 h-3 mr-1" /> Livres
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`px-3 py-1 rounded-full text-sm flex items-center ${
            filter === 'video' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Video className="w-3 h-3 mr-1" /> Vidéos
        </button>
        <button
          onClick={() => setFilter('movie')}
          className={`px-3 py-1 rounded-full text-sm flex items-center ${
            filter === 'movie' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Film className="w-3 h-3 mr-1" /> Films/Séries
        </button>
        <button
          onClick={() => setFilter('course')}
          className={`px-3 py-1 rounded-full text-sm flex items-center ${
            filter === 'course' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <GraduationCap className="w-3 h-3 mr-1" /> Formations
        </button>
      </div>
      
      {/* Learning Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className={`bg-gray-800 rounded-xl overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02] ${
              item.completed ? 'border-l-4 border-green-500' : ''
            }`}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${
                  item.type === 'book' ? 'bg-blue-500/20 text-blue-400' :
                  item.type === 'video' ? 'bg-red-500/20 text-red-400' :
                  item.type === 'movie' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {getTypeIcon(item.type)}
                </div>
                <button 
                  onClick={() => toggleLearningItemCompleted(item.id)}
                  className={`p-2 rounded-full ${
                    item.completed 
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                  title={item.completed ? "Marquer comme non terminé" : "Marquer comme terminé"}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{item.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-1">Résumé IA</h4>
                <p className="text-gray-400 text-sm">{item.summary.substring(0, 120)}...</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Item Modal */}
      {isAddingItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setIsAddingItem(false)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-6">Ajouter un apprentissage</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewItem({ ...newItem, type: 'book' })}
                    className={`flex items-center justify-center p-3 rounded-lg ${
                      newItem.type === 'book' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Book className="w-5 h-5 mr-2" />
                    Livre
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItem({ ...newItem, type: 'video' })}
                    className={`flex items-center justify-center p-3 rounded-lg ${
                      newItem.type === 'video' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Vidéo
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItem({ ...newItem, type: 'movie' })}
                    className={`flex items-center justify-center p-3 rounded-lg ${
                      newItem.type === 'movie' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Film className="w-5 h-5 mr-2" />
                    Film/Série
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItem({ ...newItem, type: 'course' })}
                    className={`flex items-center justify-center p-3 rounded-lg ${
                      newItem.type === 'course' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Formation
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Titre de l'apprentissage"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                <textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
                  placeholder="Description de l'apprentissage"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-gray-300 text-sm font-medium mb-2">Tags (séparés par des virgules)</label>
                <input
                  type="text"
                  id="tags"
                  value={newItem.tags}
                  onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ex: développement, tech, éducation"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Niveau de détail du résumé IA</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setDetailLevel('concise')}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      detailLevel === 'concise' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Concis
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetailLevel('detailed')}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      detailLevel === 'detailed' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Détaillé
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddItem}
                disabled={!newItem.title}
                className={`w-full py-3 rounded-lg text-white font-medium mt-2 ${
                  newItem.title ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage;