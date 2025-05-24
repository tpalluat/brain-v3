/*
  # Create profiles table and personality tests

  1. New Tables
    - `profiles`: Stores user profile information
      - `id` (uuid, foreign key to auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `gender` (text)
      - `email` (text)
      - `phone` (text)
      - `birthdate` (date)
      - `created_at` (timestamp)
    
    - `personality_tests`: Stores user personality test results
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `responses` (jsonb)
      - `analysis` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  email TEXT NOT NULL,
  phone TEXT,
  birthdate DATE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Personality Tests Table
CREATE TABLE IF NOT EXISTS personality_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  responses JSONB NOT NULL,
  analysis TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE personality_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own personality tests"
  ON personality_tests
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS personality_tests_user_id_idx ON personality_tests(user_id);