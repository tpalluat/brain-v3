import React from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { user, activeSection, setActiveSection } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-40 border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Back Button */}
        <div className="flex items-center">
          {activeSection ? (
            <button 
              onClick={() => setActiveSection(null)}
              className="mr-3 p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Retour à l'accueil"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
            </button>
          ) : (
            <button 
              onClick={toggleSidebar}
              className="md:hidden mr-3 p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label={isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isSidebarOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </button>
          )}
          
          <div onClick={() => setActiveSection(null)} className="flex items-center cursor-pointer">
            <Brain className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">BRAIN</span>
          </div>
        </div>
        
        {/* Current Section Title */}
        {activeSection && (
          <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-medium">
            {activeSection === 'learning' && 'Apprentissages'}
            {activeSection === 'goals' && 'Objectifs'}
            {activeSection === 'personality' && 'Personnalité'}
            {activeSection === 'profile' && 'Profil'}
          </div>
        )}
        
        {/* User Profile */}
        <div className="flex items-center">
          <div className="mr-2 text-right hidden sm:block">
            <p className="text-white text-sm font-medium">{user.name}</p>
            <p className="text-gray-400 text-xs">{user.email}</p>
          </div>
          <div 
            onClick={() => setActiveSection('profile')}
            className="h-10 w-10 rounded-full bg-cover bg-center cursor-pointer border-2 border-blue-500"
            style={{ backgroundImage: `url(${user.avatar})` }}
            title="Profil"
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;