import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const questions = [
  {
    id: 1,
    question: "Décris un défi récent que tu as surmonté et comment tu t'y es pris.",
    placeholder: "Par exemple : un projet difficile, un apprentissage complexe...",
  },
  {
    id: 2,
    question: "Que valorises-tu le plus chez les autres et pourquoi ?",
    placeholder: "Les qualités que tu apprécies particulièrement...",
  },
  {
    id: 3,
    question: "Comment préfères-tu apprendre de nouvelles choses ?",
    placeholder: "Tes méthodes d'apprentissage favorites...",
  },
  {
    id: 4,
    question: "Quel est ton environnement de travail idéal ?",
    placeholder: "Décris l'ambiance, le contexte qui te permet d'être le plus productif...",
  },
  {
    id: 5,
    question: "Quels sont tes objectifs personnels pour les prochaines années ?",
    placeholder: "Tes aspirations, ce que tu souhaites accomplir...",
  },
];

export default function PersonalityTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const analyzePersonality = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Format responses for the API
      const formattedResponses = questions.map(q => ({
        id: q.id,
        question: q.question,
        answer: answers[q.id],
      }));

      // Call the Edge Function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-personality`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responses: formattedResponses }),
        }
      );

      if (!response.ok) throw new Error('Failed to analyze personality');
      
      const { analysis } = await response.json();

      // Store in Supabase
      const { error: dbError } = await supabase
        .from('personality_tests')
        .insert([
          {
            user_id: user.id,
            responses: answers,
            gpt_analysis: analysis,
          }
        ]);

      if (dbError) throw dbError;
      
      // Navigate to results
      navigate('/personality-result', { state: { analysis } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      analyzePersonality();
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Brain className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Test de personnalité IA
          </h1>
          <p className="text-gray-400">
            Réponds sincèrement aux questions suivantes pour obtenir une analyse personnalisée de ton profil
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion + 1}/{questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full">
            <div
              className="h-1 bg-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              {currentQuestionData.question}
            </h2>
            <textarea
              value={answers[currentQuestionData.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={currentQuestionData.placeholder}
              className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            ></textarea>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <button
            onClick={nextQuestion}
            disabled={loading || !answers[currentQuestionData.id]}
            className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center ${
              loading || !answers[currentQuestionData.id]
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                Analyse en cours...
              </>
            ) : currentQuestion < questions.length - 1 ? (
              'Question suivante'
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Obtenir mon analyse
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}