import React, { useState } from 'react';
import { BrainSection } from '../types';
import { Brain, Book, Target, User, Sparkles } from 'lucide-react';

interface BrainZone {
  id: BrainSection;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: {
    top: string;
    left: string;
  };
  color: string;
}

interface BrainVisualizationProps {
  onZoneClick: (zone: BrainSection) => void;
}

const BrainVisualization: React.FC<BrainVisualizationProps> = ({ onZoneClick }) => {
  const [hoveredZone, setHoveredZone] = useState<BrainSection | null>(null);

  const brainZones: BrainZone[] = [
    {
      id: 'learning',
      title: 'Apprentissages',
      description: 'Organisez vos livres, vidéos, et formations',
      icon: <Book className="h-6 w-6" />,
      position: { top: '25%', left: '30%' },
      color: 'bg-blue-500',
    },
    {
      id: 'goals',
      title: 'Objectifs',
      description: 'Suivez vos objectifs et habitudes',
      icon: <Target className="h-6 w-6" />,
      position: { top: '40%', left: '65%' },
      color: 'bg-green-500',
    },
    {
      id: 'personality',
      title: 'Personnalité',
      description: 'Découvrez votre profil cognitif',
      icon: <Sparkles className="h-6 w-6" />,
      position: { top: '60%', left: '35%' },
      color: 'bg-purple-500',
    },
    {
      id: 'profile',
      title: 'Profil',
      description: 'Gérez vos préférences',
      icon: <User className="h-6 w-6" />,
      position: { top: '70%', left: '60%' },
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 opacity-15 bg-gradient-radial from-blue-400 to-transparent z-0"></div>
      
      {/* Brain Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <Brain className="w-[400px] h-[400px] text-gray-700 opacity-10" />
      </div>
      
      {/* Interactive Zones */}
      {brainZones.map((zone) => (
        <div
          key={zone.id}
          className={`absolute cursor-pointer transform transition-all duration-300 ease-in-out ${
            hoveredZone === zone.id ? 'scale-110 z-20' : 'z-10'
          }`}
          style={{ top: zone.position.top, left: zone.position.left }}
          onMouseEnter={() => setHoveredZone(zone.id)}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={() => onZoneClick(zone.id)}
        >
          <div className={`relative p-2 rounded-full ${zone.color} shadow-lg`}>
            {zone.icon}
            
            {/* Info Tooltip */}
            <div 
              className={`absolute left-full ml-2 w-48 p-3 rounded-lg bg-gray-800 text-white shadow-xl transition-opacity duration-300 ${
                hoveredZone === zone.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <h3 className="font-bold text-sm">{zone.title}</h3>
              <p className="text-xs text-gray-300 mt-1">{zone.description}</p>
            </div>
            
            {/* Pulse Animation */}
            <span className={`absolute inset-0 rounded-full ${zone.color} opacity-75 animate-ping`}></span>
          </div>
        </div>
      ))}
      
      {/* Central Brain Label */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
        <h2 className="text-3xl font-bold tracking-tight">BRAIN</h2>
        <p className="text-gray-400 text-sm">Votre cerveau digital</p>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center max-w-md z-10">
        <p className="text-sm text-gray-400">Cliquez sur une zone pour explorer</p>
      </div>
    </div>
  );
};

export default BrainVisualization;