import React from 'react';
import { Brain } from 'lucide-react';
import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenue dans BRAIN
          </h1>
          <p className="text-gray-400">
            Créez votre cerveau digital personnel et commencez à organiser vos apprentissages
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}