import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  birthdate: string;
  created_at: string;
}

export function useUserProfile(userId?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('An error occurred') };
    }
  };

  const createProfile = async (newProfile: Omit<Profile, 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([newProfile]);

      if (error) throw error;
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('An error occurred') };
    }
  };

  return { profile, loading, error, updateProfile, createProfile };
}