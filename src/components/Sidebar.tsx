import React from 'react';
import { Book, Target, Sparkles, User, Settings } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { BrainSection } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { setActiveSection } = useApp();
  
  const handleNavigation = (section: BrainSection) => {
    setActiveSection(section);
    onClose();
  };

  const navItems = [
    { id: 'learning' as BrainSection, label: 'Apprentissages', icon: <Book className="w-5 h-5" /> },
    { id: 'goals' as BrainSection, label: 'Objectifs', icon: <Target className="w-5 h-5" /> },
    { id: 'personality' as BrainSection, label: 'Personnalité', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'profile' as BrainSection, label: 'Profil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-900 border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 h-16 flex items-center border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Navigation</h2>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200">
            <Settings className="w-5 h-5 mr-3" />
            <span>Paramètres</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;