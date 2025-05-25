import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useUserProfile } from '../hooks/useUserProfile';
import toast from 'react-hot-toast';

export default function SignUpForm() {
  const navigate = useNavigate();
  const { createProfile } = useUserProfile();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'other' as 'male' | 'female' | 'other',
    email: '',
    phone: '',
    birthdate: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
    if (!formData.email) newErrors.email = "L'email est requis";
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (!formData.birthdate) newErrors.birthdate = 'La date de naissance est requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    const toastId = toast.loading('Création de votre compte...');

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          throw new Error('Cet email est déjà associé à un compte');
        }
        throw authError;
      }

      if (!authData.user) throw new Error('Erreur lors de la création du compte');

      // 2. Create profile
      const { error: profileError } = await createProfile({
        id: authData.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        birthdate: formData.birthdate,
      });

      if (profileError) throw profileError;

      toast.success('Compte créé avec succès !', { id: toastId });
      navigate('/onboarding');
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
            Prénom
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-600'
            }`}
            required
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
            Nom
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-600'
            }`}
            required
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Genre
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, gender: 'male' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              formData.gender === 'male'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Homme
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, gender: 'female' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              formData.gender === 'female'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Femme
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, gender: 'other' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              formData.gender === 'other'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Autre
          </button>
        </div>
      </div>

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
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Téléphone
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-300 mb-2">
          Date de naissance
        </label>
        <input
          id="birthdate"
          type="date"
          value={formData.birthdate}
          onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.birthdate ? 'border-red-500' : 'border-gray-600'
          }`}
          required
        />
        {errors.birthdate && (
          <p className="mt-1 text-sm text-red-500">{errors.birthdate}</p>
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
          minLength={6}
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
            Création du compte...
          </span>
        ) : (
          "S'inscrire"
        )}
      </button>

      <p className="text-center text-gray-400 text-sm">
        Déjà inscrit ?{' '}
        <Link to="/login" className="text-blue-400 hover:text-blue-300">
          Se connecter
        </Link>
      </p>
    </form>
  );
}