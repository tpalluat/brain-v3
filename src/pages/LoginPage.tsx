import React from 'react';
import { Brain } from 'lucide-react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Connexion à BRAIN
          </h1>
          <p className="text-gray-400">
            Accédez à votre cerveau digital
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}