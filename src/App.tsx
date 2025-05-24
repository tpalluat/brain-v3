import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BrainVisualization from './components/BrainVisualization';
import LearningPage from './pages/LearningPage';
import GoalsPage from './pages/GoalsPage';
import PersonalityPage from './pages/PersonalityPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OnboardingIntro from './pages/OnboardingIntro';
import PersonalityTest from './pages/PersonalityTest';
import { useApp } from './contexts/AppContext';
import { BrainSection } from './types';
import { supabase } from './lib/supabase';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Main App Content Component
const AppContent: React.FC = () => {
  const { activeSection, setActiveSection } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleZoneClick = (zone: BrainSection) => {
    setActiveSection(zone);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-20 pb-10 px-4">
        {!activeSection ? (
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Bienvenue dans votre cerveau digital</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Organisez vos apprentissages, suivez vos objectifs, et analysez votre profil cognitif avec l'aide de l'IA.
              </p>
            </div>
            
            <BrainVisualization onZoneClick={handleZoneClick} />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div onClick={() => setActiveSection('learning')} className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition-colors">
                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 w-fit mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Apprentissages</h2>
                <p className="text-gray-400">Gérez vos livres, vidéos, et formations avec des résumés IA.</p>
              </div>
              
              <div onClick={() => setActiveSection('goals')} className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition-colors">
                <div className="p-3 rounded-full bg-green-500/20 text-green-400 w-fit mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Objectifs</h2>
                <p className="text-gray-400">Définissez et suivez vos objectifs à court et long terme.</p>
              </div>
              
              <div onClick={() => setActiveSection('personality')} className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition-colors">
                <div className="p-3 rounded-full bg-purple-500/20 text-purple-400 w-fit mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Personnalité</h2>
                <p className="text-gray-400">Découvrez votre profil cognitif basé sur vos données.</p>
              </div>
              
              <div onClick={() => setActiveSection('profile')} className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition-colors">
                <div className="p-3 rounded-full bg-amber-500/20 text-amber-400 w-fit mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Profil</h2>
                <p className="text-gray-400">Gérez vos paramètres et préférences personnelles.</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {activeSection === 'learning' && <LearningPage />}
            {activeSection === 'goals' && <GoalsPage />}
            {activeSection === 'personality' && <PersonalityPage />}
            {activeSection === 'profile' && <ProfilePage />}
          </div>
        )}
      </main>
    </div>
  );
};

// Root App Component with Provider
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/app" replace /> : <HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingIntro /></ProtectedRoute>} />
            <Route path="/personality-test" element={<ProtectedRoute><PersonalityTest /></ProtectedRoute>} />
            <Route path="/app" element={<ProtectedRoute><AppContent /></ProtectedRoute>} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

export default App