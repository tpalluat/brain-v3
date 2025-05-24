import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  User as UserIcon, Settings, Share2, LogOut, Moon, Sun
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, updateUserPreferences } = useApp();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Mon Profil</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <div 
                className="h-24 w-24 rounded-full bg-cover bg-center border-4 border-blue-500"
                style={{ backgroundImage: `url(${user.avatar})` }}
              ></div>
              <h2 className="text-xl font-bold text-white mt-4">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              
              <button className="mt-6 w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors">
                <UserIcon className="w-4 h-4 mr-2" />
                Modifier le profil
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="space-y-2">
                <button className="w-full py-2 px-3 text-left text-gray-300 hover:bg-gray-700 rounded-lg flex items-center transition-colors">
                  <Settings className="w-4 h-4 mr-3" />
                  Paramètres
                </button>
                <button className="w-full py-2 px-3 text-left text-gray-300 hover:bg-gray-700 rounded-lg flex items-center transition-colors">
                  <Share2 className="w-4 h-4 mr-3" />
                  Partager mon cerveau
                </button>
                <button className="w-full py-2 px-3 text-left text-red-400 hover:bg-gray-700 rounded-lg flex items-center transition-colors">
                  <LogOut className="w-4 h-4 mr-3" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preferences */}
        <div className="md:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Préférences</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Apparence</h3>
                <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    {user.preferences.theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-blue-400 mr-3" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-400 mr-3" />
                    )}
                    <div>
                      <p className="text-white">Thème</p>
                      <p className="text-sm text-gray-400">
                        {user.preferences.theme === 'dark' ? 'Mode sombre' : 'Mode clair'}
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      name="theme"
                      id="theme"
                      checked={user.preferences.theme === 'dark'}
                      onChange={() => 
                        updateUserPreferences({ 
                          theme: user.preferences.theme === 'dark' ? 'light' : 'dark' 
                        })
                      }
                      className="sr-only"
                    />
                    <label
                      htmlFor="theme"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        user.preferences.theme === 'dark' ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                          user.preferences.theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Confidentialité</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div>
                      <p className="text-white">Profil public</p>
                      <p className="text-sm text-gray-400">
                        Permettre aux autres utilisateurs de voir votre profil
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        name="publicProfile"
                        id="publicProfile"
                        checked={user.preferences.publicProfile}
                        onChange={() => 
                          updateUserPreferences({ 
                            publicProfile: !user.preferences.publicProfile 
                          })
                        }
                        className="sr-only"
                      />
                      <label
                        htmlFor="publicProfile"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                          user.preferences.publicProfile ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                            user.preferences.publicProfile ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div>
                      <p className="text-white">Apprentissages visibles</p>
                      <p className="text-sm text-gray-400">
                        Partager vos apprentissages publiquement
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        name="learningVisible"
                        id="learningVisible"
                        checked={user.preferences.visibleSections.learning}
                        onChange={() => 
                          updateUserPreferences({ 
                            visibleSections: {
                              ...user.preferences.visibleSections,
                              learning: !user.preferences.visibleSections.learning
                            }
                          })
                        }
                        className="sr-only"
                      />
                      <label
                        htmlFor="learningVisible"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                          user.preferences.visibleSections.learning ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                            user.preferences.visibleSections.learning ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div>
                      <p className="text-white">Objectifs visibles</p>
                      <p className="text-sm text-gray-400">
                        Partager vos objectifs publiquement
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        name="goalsVisible"
                        id="goalsVisible"
                        checked={user.preferences.visibleSections.goals}
                        onChange={() => 
                          updateUserPreferences({ 
                            visibleSections: {
                              ...user.preferences.visibleSections,
                              goals: !user.preferences.visibleSections.goals
                            }
                          })
                        }
                        className="sr-only"
                      />
                      <label
                        htmlFor="goalsVisible"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                          user.preferences.visibleSections.goals ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                            user.preferences.visibleSections.goals ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Statistiques du compte</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Date d'inscription</p>
                <p className="text-lg font-medium text-white">22 Mai 2025</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Dernière connexion</p>
                <p className="text-lg font-medium text-white">Aujourd'hui</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Contenu créé</p>
                <p className="text-lg font-medium text-white">5 éléments</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Niveau</p>
                <p className="text-lg font-medium text-white">Débutant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;