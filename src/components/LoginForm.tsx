import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = "L'email est requis";
    if (!formData.password) newErrors.password = 'Le mot de passe est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    const toastId = toast.loading('Connexion en cours...');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('Email ou mot de passe incorrect');
        }
        throw signInError;
      }

      toast.success('Connexion réussie !', { id: toastId });
      navigate('/app');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error(message, { id: toastId });
      setErrors(prev => ({ ...prev, submit: message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-600'
          }`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? 'border-red-500' : 'border-gray-600'
          }`}
          required
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {errors.submit && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
          loading
            ? 'bg-blue-600/50 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
            Connexion...
          </span>
        ) : (
          'Se connecter'
        )}
      </button>

      <p className="text-center text-gray-400 text-sm">
        Pas encore de compte ?{' '}
        <Link to="/signup" className="text-blue-400 hover:text-blue-300">
          S'inscrire
        </Link>
      </p>
    </form>
  );
}