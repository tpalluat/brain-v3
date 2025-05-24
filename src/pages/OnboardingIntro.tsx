import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Book, Target, BarChart as ChartBar, Lock } from 'lucide-react';

const steps = [
  {
    title: "Votre cerveau digital personnel",
    description: "BRAIN est votre espace personnel pour organiser vos connaissances, suivre vos objectifs et analyser votre progression.",
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  {
    title: "Apprentissage intelligent",
    description: "Enregistrez vos lectures, vidéos et formations. L'IA génère automatiquement des résumés et des connexions entre vos apprentissages.",
    icon: Book,
    color: "text-green-500",
    bgColor: "bg-green-500/20",
  },
  {
    title: "Objectifs et progression",
    description: "Définissez vos objectifs et suivez votre progression. BRAIN vous aide à décomposer vos grands objectifs en étapes réalisables.",
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
  },
  {
    title: "Analyses personnalisées",
    description: "Découvrez vos patterns d'apprentissage, vos forces et vos axes d'amélioration grâce à l'analyse de vos données.",
    icon: ChartBar,
    color: "text-amber-500",
    bgColor: "bg-amber-500/20",
  },
  {
    title: "Confidentialité garantie",
    description: "Vous gardez le contrôle total de vos données. Choisissez ce que vous souhaitez partager et ce qui reste privé.",
    icon: Lock,
    color: "text-red-500",
    bgColor: "bg-red-500/20",
  },
];

export default function OnboardingIntro() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/personality-test');
    }
  };

  const Step = steps[currentStep];
  const StepIcon = Step.icon;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1 bg-gray-800 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 md:p-12 text-center">
          <div className={`mx-auto w-16 h-16 ${Step.bgColor} rounded-full flex items-center justify-center mb-6`}>
            <StepIcon className={`w-8 h-8 ${Step.color}`} />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {Step.title}
          </h2>
          
          <p className="text-gray-400 text-lg mb-8">
            {Step.description}
          </p>

          <button
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {currentStep < steps.length - 1 ? 'Continuer' : 'Commencer le test de personnalité'}
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-blue-500 w-4' : 'bg-gray-700'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}